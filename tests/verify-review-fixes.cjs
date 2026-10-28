/* Regression checks for backup, concurrent progress, scene ownership and visible back navigation. */
const { chromium } = require('./helpers/browser.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const output = require('./helpers/paths.cjs').output;
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio'] });
  const results = [];
  async function test(name, fn) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [];
    context.on('page', p => p.on('pageerror', e => errors.push(e.message)));
    page.on('pageerror', e => errors.push(e.message));
    try {
      await page.goto('http://localhost:8080/');
      await fn(page, context);
      assert.deepEqual(errors, [], 'browser errors');
      results.push({ name, passed: true });
    } catch (error) {
      results.push({ name, passed: false, error: error.message });
    } finally { await context.close(); }
  }

  await test('backup round trip includes all current phonics words and legacy records', async p => {
    await p.evaluate(() => { BearHub.show('foundation'); BearFeatures.openPhonics('word-cat'); });
    await p.locator('[data-phonics-answer]').last().click();
    const result = await p.evaluate(async () => {
      for (const w of BEAR_FOUNDATIONS.words) BearLearning.record('phonics:' + w.id, 'practiced');
      for (const id of ['cat', 'hat', 'sun']) BearLearning.record('phonics:' + id, 'practiced');
      const backup = JSON.stringify(BearProfiles.export()), rows = BearProfiles.inspect(backup);
      const count = await BearProfiles.import(backup), restored = BearProfiles.export().children.at(-1);
      const bad = JSON.parse(backup); bad.children[0].learning.items['phonics:word-not-real'] = { wrong: 1 };
      let rejectsUnknown = false; try { BearProfiles.inspect(JSON.stringify(bad)); } catch { rejectsUnknown = true; }
      return { expectedUnits: BEAR_FOUNDATIONS.words.length+3, units: Object.keys(rows[0].learning.items).filter(id => id.startsWith('phonics:')).length,
        count, restored: restored.learning, original: rows[0].learning, rejectsUnknown };
    });
    assert.equal(result.units, result.expectedUnits); assert.equal(result.count, 1);
    assert.deepEqual(result.restored, result.original); assert.equal(result.rejectsUnknown, true);
  });

  await test('two pages preserve learning, settings, reading, clear and backup', async (a, c) => {
    const b = await c.newPage(); await b.goto('http://localhost:8080/');
    await a.evaluate(() => { BearHub.show('foundation'); BearFoundation.openUnit('word-apple'); });
    await a.locator('#foundation-practiced').click();
    await b.evaluate(() => BearLearning.settings({ chinese: false }));
    assert.equal(await a.evaluate(() => BearLearning.get().items['word-apple']?.practiced), 1);
    assert.equal(await b.evaluate(() => BearLearning.get().items['word-apple']?.practiced), 1);
    // Concurrent callers must add both events, rather than overwrite a shared snapshot.
    await Promise.all([a, b].map(p => p.evaluate(() => {
      for (let i = 0; i < 20; i++) BearLearning.record('word-apple', 'practiced');
    })));
    await a.evaluate(() => {
      BearLearning.task('learn'); BearLearning.award('phonics');
      BearLearning.reading(BEAR_BOOKS[0].id, { page: 1, heard: [0], answer: false });
    });
    await b.evaluate(() => {
      BearLearning.settings({ speed: 'slow', speedChosen: true });
      BearLearning.reading(BEAR_BOOKS[0].id, { page: 2, heard: [1], answer: false });
    });
    await a.reload();
    const state = await a.evaluate(() => BearLearning.get());
    assert.equal(state.items['word-apple'].practiced, 41);
    assert.equal(state.settings.chinese, false); assert.equal(state.settings.speed, 'slow');
    assert.ok(Object.values(state.days).some(day => day.done.includes('learn')));
    assert.ok(state.awards.includes('phonics'));
    assert.deepEqual(Object.values(state.reading)[0].heard.sort(), [0, 1]);
    assert.equal(await b.evaluate(() => BearProfiles.export().children[0].learning.items['word-apple'].practiced), 41);
    await a.evaluate(() => BearLearning.clear());
    await b.evaluate(() => BearLearning.settings({ chinese: false }));
    assert.equal(await b.evaluate(() => BearLearning.get().items['word-apple']), undefined);
    await a.reload();
    assert.equal(await a.evaluate(() => BearLearning.get().items['word-apple']), undefined);
  });

  await test('existing snapshots migrate once and retain records, settings and child isolation', async p => {
    const legacy = await p.evaluate(() => {
      const saved=structuredClone(BearLearning.get());
      saved.items['word-apple']={heard:2,practiced:7,wrong:1,last:Date.now(),due:Date.now()+86400000};
      saved.items['phonics:cat']={practiced:1,last:Date.now()};
      saved.awards=['voice'];saved.placed=['rug'];saved.settings={mode:'little',chinese:false,speed:'slow',speedChosen:true};
      const key=BearProfiles.storageKey('bear-learning-v1');
      for(const name of Object.keys(localStorage))if(name.startsWith(key))localStorage.removeItem(name);
      localStorage.setItem(key,JSON.stringify(saved));return saved;
    });
    await p.reload();
    assert.deepEqual(await p.evaluate(() => BearLearning.get()),{...legacy,settings:{planMinutes:10,readerMode:'follow',voice:'child',voiceChosen:false,textSize:'standard',...legacy.settings}});
    await p.evaluate(async () => {
      // HTTP origins may lack randomUUID even when browser storage works.
      Object.defineProperty(crypto,'randomUUID',{value:undefined,configurable:true});
      BearLearning.record('word-apple','practiced');
      await BearProfiles.add('另一个孩子');
    });
    const backup=await p.evaluate(() => BearProfiles.export());
    assert.equal(backup.children[0].learning.items['word-apple'].practiced,8);
    assert.equal(backup.children[0].learning.items['word-apple'].heard,2);
    assert.deepEqual(backup.children[1].learning.items,{});
    await p.reload();
    assert.equal(await p.evaluate(() => BearLearning.get().items['word-apple'].practiced),8);
  });

  await test('changing challenge keeps all five simulation stations consistent', async p => {
    await p.locator('[data-child-nav=explore]').click();
    await p.locator('[data-explore-section=simulation]').click();
    await p.locator('[data-simulation-scope=all]').click();
    await p.locator('#start-simulation').click();
    const categories = [];
    for (let station = 0; station < 5; station++) {
      const old = await p.locator('#scene').getAttribute('data-scene');
      await p.locator('[data-level="3"]').click();
      const id = await p.locator('#scene').getAttribute('data-scene');
      assert.notEqual(id, old);
      const game = await p.evaluate(id => LITTLE_BEAR_SCENES[id], id);
      categories.push(game.categoryId);
      assert.ok((await p.locator('.simulation-bar h2').innerText()).includes(game.catalogTitle));
      for (let i = 0; i < 3; i++) await p.locator('#practice-button').click();
      assert.equal(await p.locator('.simulation-dots').getAttribute('aria-label'), `已完成 ${station + 1} 个场景`);
      if (station === 0) {
        await p.locator('[data-level="2"]').click();
        assert.equal(await p.locator('.simulation-dots').getAttribute('aria-label'), '已完成 0 个场景');
        for (let i = 0; i < 3; i++) await p.locator('#practice-button').click();
      }
      await p.locator('#continue-button').click();
    }
    assert.equal(new Set(categories).size, 5);
    assert.match(await p.locator('.simulation-intro h2').innerText(), /完成/);
    assert.equal(await p.locator('.simulation-recap span').count(), 5);
  });

  await test('daily exchange completes after changing challenge without mislabelling practice', async p => {
    await p.locator('#daily-overview').click();
    const original = await p.evaluate(() => BearLearning.plan().scene);
    await p.locator('[data-task=exchange]').click(); await p.locator('[data-level="3"]').click();
    const actual = await p.locator('#scene').getAttribute('data-scene'); assert.notEqual(actual, original);
    for (let i = 0; i < 3; i++) await p.locator('#practice-button').click();
    assert.equal(await p.evaluate(id => BearLearning.get().items['scene:' + id].practiced, actual), 3);
    await p.locator('#continue-button').click();
    assert.ok(await p.evaluate(() => BearLearning.plan().done.includes('exchange')));
    assert.match(await p.locator('[data-task=exchange]').innerText(), /今天已完成/);
  });

  await test('back control remains visible and returns to the actual parent at four widths', async p => {
    for (const width of [320, 390, 768, 1440]) {
      await p.setViewportSize({ width, height: 900 });
      await p.locator('[data-child-nav=explore]').click();
      await p.locator('[data-explore-feature=themes]').click();
      const visibleBack = async () => {
        const box = await p.locator('#page-back').boundingBox();
        assert.ok(box && box.y >= 0 && box.y + box.height <= 900, `back outside viewport at ${width}: ${JSON.stringify(box)}`);
        assert.ok(box.x >= 0 && box.x + box.width <= width);
        assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}`);
      };
      await visibleBack(); await p.screenshot({ path: `${output}/back-themes-${width}.png` });
      await p.locator('[data-topic]').first().click(); await visibleBack();
      await p.locator('#theme-book').click(); await visibleBack();
      await p.screenshot({ path: `${output}/back-reader-${width}.png` });
      await p.locator('#page-back').click(); assert.equal(await p.locator('#theme-book').count(), 1);
      await p.locator('#page-back').click(); assert.ok(await p.locator('[data-topic]').count());
      await p.locator('#page-back').click(); assert.ok(await p.locator('[data-explore-section]').count());
      assert.equal(await p.locator('#page-back').isVisible(), false);
    }
  });
  await browser.close();
  fs.writeFileSync(`${output}/regression-results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  if (results.some(result => !result.passed)) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });

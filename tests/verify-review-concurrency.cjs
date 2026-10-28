// Real two-page regressions: delayed evidence, stale daily sessions and shared caches.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('./helpers/browser.cjs');
const { output } = require('./helpers/paths.cjs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio'] });
  const results = [];
  async function test(name, run, offline = false) {
    const context = await browser.newContext(offline ? {} : { serviceWorkers: 'block' });
    try {
      const a = await context.newPage(), b = await context.newPage();
      await a.goto('http://localhost:8080/');
      await b.goto('http://localhost:8080/');
      await run(a, b, context);
      results.push({ name, passed: true });
      console.log('PASS ' + name);
    } catch (error) {
      results.push({ name, passed: false, error: error.stack });
      console.error('FAIL ' + name + ': ' + error.message);
    } finally { await context.close(); }
  }
  try {
    for (const compact of [false, true]) {
      await test('delayed transfer evidence survives other words/contexts; compact=' + compact, async (a, b) => {
        await a.evaluate(() => {
          const set = Storage.prototype.setItem;
          window.restoreWrites = () => { Storage.prototype.setItem = set; };
          Storage.prototype.setItem = function (key, value) {
            if (key.includes(':op:')) throw new DOMException('Full', 'QuotaExceededError');
            return set.call(this, key, value);
          };
          BearLearning.record('word-apple', 'selected');
          BearGrowth.transfer('word-apple', true, 'review');
        });
        await b.evaluate(async compact => {
          BearLearning.record('word-banana', 'selected');
          BearGrowth.transfer('word-banana', true, 'game-bag');
          BearGrowth.transfer('word-apple', false, 'game-bag');
          if (compact) await BearLearning.compact();
        }, compact);
        await a.evaluate(() => { restoreWrites(); BearLearning.settings({ chinese: false }); });
        for (const page of [a, b]) {
          await page.reload();
          const state = await page.evaluate(() => BearLearning.get());
          assert.equal(state.items['word-apple'].selected, 1);
          assert.equal(state.items['word-banana'].selected, 1);
          assert.deepEqual(state.growth.practice.transfers['word-apple'].map(x => [x.context, x.correct]), [['review', true], ['game-bag', false]]);
          assert.equal(state.growth.practice.transfers['word-banana'][0].context, 'game-bag');
        }
      });
    }
    await test('old word quiz cannot complete a newly selected daily plan', async (a, b) => {
      const old = await a.evaluate(() => { BearFeatures.open('today'); return structuredClone(BearLearning.plan()); });
      await a.locator('[data-task=learn]').click();
      const changed = await b.evaluate(old => {
        const theme = BEAR_LEARNING_THEMES.find(t => t.id !== old.theme && BearCurriculum.words(t.id).slice(0, 3).every(w => !old.learn.includes(w.id)));
        return structuredClone(BearLearning.choosePlan(theme.id, 10));
      }, old);
      for (const id of old.learn) {
        await a.locator('#quiz-test').click();
        await a.getByRole('button', { name: '没听清 / 暂时无法播放，跳过且不计错', exact: true }).click();
        await a.locator('#quiz-next').click();
      }
      assert.equal(await a.locator('#quiz-return').count(), 1);
      const result = await a.evaluate(() => ({ plan: BearLearning.plan(), items: BearLearning.get().items }));
      assert.equal(result.plan.theme, changed.theme);
      assert.equal(result.plan.done.includes('learn'), false);
      assert.equal(changed.learn.some(id => result.items[id]), false);
    });
    await test('recent pools merge by exercise, and newer evidence wins within one context', async (a, b) => {
      await a.evaluate(() => {
        const set = Storage.prototype.setItem;
        window.restoreWrites = () => { Storage.prototype.setItem = set; };
        Storage.prototype.setItem = function (key, value) {
          if (key.includes(':op:')) throw new DOMException('Full', 'QuotaExceededError');
          return set.call(this, key, value);
        };
        BearGrowth.rotate(BEAR_FOUNDATIONS.words, 'game-bag', 3);
        BearGrowth.transfer('word-apple', true, 'review');
      });
      await b.evaluate(async () => {
        BearGrowth.rotate(BEAR_FOUNDATIONS.words, 'game-basket', 3);
        BearGrowth.transfer('word-apple', false, 'review');
        await BearLearning.compact();
      });
      await a.evaluate(() => { restoreWrites(); BearLearning.settings({ chinese: false }); });
      const p = await a.evaluate(() => BearLearning.get().growth.practice);
      assert.equal(p.recent['game-bag'].length, 3);
      assert.equal(p.recent['game-basket'].length, 3);
      assert.equal(p.transfers['word-apple'].length, 1);
      assert.equal(p.transfers['word-apple'][0].correct, false);
      await a.evaluate(() => BearProfiles.inspect(BearProfiles.backupText()));
    });
    await test('daily context survives refresh, rejects reselection and keeps valid completion', async (a) => {
      await a.evaluate(() => BearFeatures.open('today'));
      await a.locator('[data-task=learn]').click();
      await a.reload();
      for (let i = 0; i < 3; i++) {
        await a.locator('#quiz-test').click();
        await a.getByRole('button', { name: '没听清 / 暂时无法播放，跳过且不计错', exact: true }).click();
        await a.locator('#quiz-next').click();
      }
      assert.equal(await a.evaluate(() => BearLearning.plan().done.includes('learn')), true);
      const result = await a.evaluate(async () => {
        const context = BearLearning.taskContext(), theme = BearLearning.plan().theme;
        BearLearning.choosePlan(theme, 10);
        BearLearning.task('learn', context);
        const stale = BearLearning.plan().done.includes('learn');
        BearLearning.task('review', null);
        const missing = BearLearning.plan().done.includes('review');
        const valid = BearLearning.taskContext();
        BearLearning.task('review', { ...valid, date: '2000-01-01' });
        const previousDay = BearLearning.plan().done.includes('review');
        BearLearning.task('review', valid);
        await BearLearning.compact();
        BearProfiles.inspect(BearProfiles.backupText());
        return { stale, missing, previousDay, valid: BearLearning.plan().done.includes('review') };
      });
      assert.deepEqual(result, { stale: false, missing: false, previousDay: false, valid: true });
    });
    for (const changed of [false, true]) await test('restored mixed daily review checks its original plan; changed=' + changed, async (a, b) => {
      const saved = await a.evaluate(() => {
        BearLearning.record('word-cat', 'selected');
        BearFeatures.open('today');
        document.querySelector('[data-task=review]').click();
        return BearLearningTools.reviewCheckpoint();
      });
      // Rebuild the saved completed view, as navigation/refresh restoration does.
      if (changed) await b.evaluate(() => BearLearning.choosePlan('park', 10));
      await a.evaluate(saved => {
        BearLearningTools.restoreReview(document.getElementById('features-panel'), { ...saved, index: saved.ids.length });
      }, saved);
      await a.locator('#mixed-done').click();
      assert.equal(await a.evaluate(() => BearLearning.plan().done.includes('review')), !changed);
    });
    await test('a delayed task completion cannot cross a compacted plan change', async (a, b) => {
      await a.evaluate(() => {
        const context = BearLearning.taskContext(), set = Storage.prototype.setItem;
        window.restoreWrites = () => { Storage.prototype.setItem = set; };
        Storage.prototype.setItem = function (key, value) {
          if (key.includes(':op:')) throw new DOMException('Full', 'QuotaExceededError');
          return set.call(this, key, value);
        };
        BearLearning.task('learn', context);
      });
      await b.evaluate(async () => { BearLearning.choosePlan('park', 10); await BearLearning.compact(); });
      await a.evaluate(() => { restoreWrites(); BearLearning.settings({ chinese: false }); });
      await a.reload();
      assert.deepEqual(await a.evaluate(() => BearLearning.plan().done), []);
    });
    await test('removing another pack cannot delete media from an in-flight download', async (a, b) => {
      await a.evaluate(() => BearOffline.ready);
      await b.evaluate(() => BearOffline.download('park'));
      await a.evaluate(() => {
        const put = Cache.prototype.put;
        const hold = new Promise(resolve => { window.releaseMarker = resolve; });
        Cache.prototype.put = async function (key, value) {
          if ((typeof key === 'string' ? key : key.url).includes('/__offline_theme__/breakfast')) {
            window.markerWaiting = true;
            await hold;
          }
          return put.call(this, key, value);
        };
        window.downloadFinished = BearOffline.download('breakfast');
      });
      await a.waitForFunction(() => window.markerWaiting, null, { timeout: 60000 });
      await b.evaluate(() => { window.removalFinished = BearOffline.remove('park'); });
      // Releasing the marker lets the queued removal proceed after the download.
      await a.evaluate(() => releaseMarker());
      await a.evaluate(() => downloadFinished);
      await b.evaluate(() => removalFinished);
      assert.equal(await a.evaluate(() => BearOffline.verify('breakfast')), true);
      assert.equal(await b.evaluate(async () => (await BearOffline.status()).some(x => x.id === 'park')), false);
    }, true);
    await test('a lost media write cannot publish a successful offline marker', async (a) => {
      const result = await a.evaluate(async () => {
        await BearOffline.ready;
        const pack = await BearOffline.bundle('breakfast'), put = Cache.prototype.put;
        const first = new URL(pack.files[0], location.href).href;
        const last = new URL(pack.files.at(-1), location.href).href;
        Cache.prototype.put = async function (key, value) {
          const result = await put.call(this, key, value);
          if ((typeof key === 'string' ? key : key.url) === last) {
            await (await caches.open('bear-themes-1.0.1')).delete(first);
          }
          return result;
        };
        let error;
        try { await BearOffline.download('breakfast'); } catch (e) { error = e.message; }
        finally { Cache.prototype.put = put; }
        return { error, valid: await BearOffline.verify('breakfast'), incomplete: (await BearOffline.status()).find(x => x.id === 'breakfast')?.incomplete };
      });
      assert.match(result.error, /离线包未完整保存/);
      assert.equal(result.valid, false);
      assert.equal(result.incomplete, true);
    }, true);
    await test('unsupported cross-page locking refuses cache mutation explicitly', async (a) => {
      const result = await a.evaluate(async () => {
        await BearOffline.ready;
        Object.defineProperty(navigator, 'locks', { value: undefined, configurable: true });
        const errors = [];
        for (const run of [() => BearOffline.download('breakfast'), () => BearOffline.remove('park')]) {
          try { await run(); } catch (error) { errors.push(error.message); }
        }
        return errors;
      });
      assert.equal(result.length, 2);
      assert.ok(result.every(x => x.includes('不支持安全管理离线包')));
    }, true);
  } finally {
    await browser.close();
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, 'review-concurrency.json'), JSON.stringify(results, null, 2));
  }
  assert.equal(results.filter(x => !x.passed).length, 0, 'Review concurrency regressions failed');
})().catch(error => { console.error(error); process.exitCode = 1; });

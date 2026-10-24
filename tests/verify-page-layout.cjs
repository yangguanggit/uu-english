// Isolated browser profiles: layout changes must preserve navigation, media and saved evidence.
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('./helpers/browser.cjs');
const { output } = require('./helpers/paths.cjs');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio'] });
  try {
    for (const width of [320, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, serviceWorkers: 'block' });
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto('http://localhost:8080/');
      const shot = async name => {
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${name}/${width}`);
        await page.screenshot({ path: path.join(output, `layout-${name}-${width}.png`) });
      };
      await shot('today');
      assert.match(await page.locator('#today-next-label').innerText(), /下一步/);
      assert.equal(await page.locator('.trail-steps>span').count(), await page.evaluate(() => BearLearning.required(BearLearning.plan()).length));
      const artFits = await page.locator('.adventure-cover').evaluate(el => {
        const box = el.getBoundingClientRect();
        return [...el.querySelectorAll('.concept-picture')].every(e => e.getBoundingClientRect().bottom <= box.bottom + 1);
      });
      assert.equal(artFits, true, 'theme artwork must not overlap the title');
      await page.locator('[data-child-nav=explore]').click();
      assert.equal(await page.locator('.explore-main button').count(), 3);
      assert.equal(await page.locator('.explore-tools button').count(), 5);
      await shot('explore');
      await page.locator('[data-explore-section=foundation]').click();
      const drawer = page.locator('#foundation-library-dialog');
      assert.equal(await drawer.isVisible(), width >= 768);
      if (width < 768) {
        await page.locator('#foundation-library-open').click();
        assert.equal(await drawer.evaluate(el => el.matches(':modal')), true);
      }
      await page.locator('[data-unit=letter-B]').click();
      assert.equal(await page.evaluate(() => BearFoundation.checkpoint().unitId), 'letter-B');
      assert.equal(await drawer.isVisible(), width >= 768);
      await page.locator('#unit-next').click();
      assert.equal(await page.evaluate(() => BearFoundation.checkpoint().unitId), 'letter-C');
      await page.locator('#unit-prev').click();
      assert.equal(await page.evaluate(() => BearFoundation.checkpoint().unitId), 'letter-B');
      if (width < 768) {
        await page.locator('#foundation-library-open').click();await page.keyboard.press('Escape');
        assert.equal(await drawer.isVisible(), false);
        assert.equal(await page.locator('#foundation-library-open').evaluate(el => el === document.activeElement), true);
      } else {
        assert.ok((await drawer.boundingBox()).x < (await page.locator('#foundation-player').boundingBox()).x);
      }
      await page.locator('[data-foundation-tab=words]').click();
      await page.evaluate(() => BearFoundation.openUnit('word-grandmother'));
      if(width<768)await page.locator('#foundation-library-open').click();
      const wordWidths=await page.locator('.foundation-unit-grid.words .foundation-unit').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().width));
      assert.ok(wordWidths.length>0&&wordWidths.every(w=>w>=64),`word cards readable at ${width}px: ${wordWidths}`);
      const wordLabels = await page.locator('.foundation-unit-grid.words .foundation-unit strong').evaluateAll(nodes => nodes.map(el => {
        const range = document.createRange();range.selectNodeContents(el);
        const card = el.closest('button').getBoundingClientRect();
        return { text:el.textContent, lines:range.getClientRects().length,
          fits:[...range.getClientRects()].every(r => r.left >= card.left && r.right <= card.right) };
      }));
      for (const word of ['grandmother', 'grandfather']) {
        const label = wordLabels.find(row => row.text === word);
        assert.ok(label && label.lines === 1 && label.fits, `${word} stays complete inside its card at ${width}px`);
      }
      await shot('foundation-library');
      await page.locator('[data-unit=word-grandfather]').click();
      assert.equal(await page.evaluate(() => BearFoundation.checkpoint().unitId), 'word-grandfather');
      assert.equal(await drawer.isVisible(), width >= 768);
      await shot('foundation');
      await page.locator('#foundation-player').evaluate(el => window.scrollTo(0, el.offsetTop + 100));
      const sticky = await page.locator('.page-categories').boundingBox();
      const header = await page.locator('.site-header').boundingBox();
      assert.ok(Math.abs(sticky.y - (header.y + header.height)) < 2, 'categories stay directly below fixed header');
      await page.evaluate(() => { BearHub.show('scenes');window.scrollTo(0,0); });
      assert.equal(await page.locator('.scene-task-list [data-game]').count(), 5);
      await shot('scenes');
      const game = await page.locator('.scene-overview [data-resume-game]').getAttribute('data-resume-game');
      await page.locator('.scene-overview [data-resume-game]').click();
      assert.equal(await page.locator('#scene').getAttribute('data-scene'), game);
      await page.evaluate(() => {
        BearLearning.settings({readerMode:'independent'});
        BearLearning.reading(BEAR_BOOKS[0].id,{page:1,heard:[0]});
        BearLearning.reading(BEAR_BOOKS[1].id,{page:2,heard:[0,1]});
        BearLearning.visit('book:'+BEAR_BOOKS[1].id);
      });
      await page.locator('[data-child-nav=books]').click();
      assert.equal(await page.locator('.book-shelf [data-book]').count(), 10);
      await shot('books');
      await page.locator('.continue-reading').click();
      assert.match(await page.locator('.story-top>span').innerText(), /^3\s*\//);
      assert.equal(await page.locator('.story-top>strong').innerText(),await page.evaluate(()=>BEAR_BOOKS[1].title));
      await page.locator('.reader-info summary').click();
      assert.equal(await page.locator('.reader-info').evaluate(el=>el.open),true);
      await page.locator('#page-back').click();
      await page.evaluate(() => BearFeatures.openParents('profiles'));
      const nums=(await page.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);
      await page.locator('#parent-gate-answer').fill(String(nums[0]+nums[1]));
      await page.locator('#parent-gate-form button[type=submit]').click();
      await page.locator('[data-parent-open=playback]').click();
      await shot('parent-playback');
      assert.ok((await page.locator('#playback-voice-button').boundingBox()).y < (await page.locator('#playback-speed-button').boundingBox()).y);
      await page.locator('.setting-help summary').click();
      assert.equal(await page.locator('#playback-voice-note').isVisible(), true);
      await page.locator('#playback-speed-button').click();await page.locator('.select-option[data-value=slow]').click();
      assert.equal(await page.evaluate(()=>BearLearning.get().settings.speed),'slow');
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${width}px: six pages, drawer/focus, sticky categories, media controls, scene entry, reading resume and parent preferences`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error);process.exitCode=1; });

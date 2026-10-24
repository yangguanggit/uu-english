// Regressions at the real multi-page UI and browser Cache Storage boundaries.
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
    const errors = [];
    context.on('page', page => page.on('pageerror', e => errors.push(e.message)));
    try {
      const a = await context.newPage(), b = await context.newPage();
      await a.goto('http://localhost:8080/');
      await b.goto('http://localhost:8080/');
      await run(a, b);
      assert.deepEqual(errors, []);
      results.push({ name, passed: true });
      console.log('PASS ' + name);
    } catch (error) {
      results.push({ name, passed: false, error: error.stack });
      console.error('FAIL ' + name + ': ' + error.message);
    } finally { await context.close(); }
  }
  async function library(page, filter = 'all') {
    await page.evaluate(filter => BearFeatures.openLibrary({ query: 'apple', filter }), filter);
  }
  async function parents(page) {
    await page.evaluate(() => BearFeatures.openParents('offline'));
    if (await page.locator('#parent-gate').evaluate(e => e.open)) {
      const n = (await page.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);
      await page.locator('#parent-gate-answer').fill(String(n[0] + n[1]));
      await page.locator('#parent-gate-form button[type=submit]').click();
    }
    await page.waitForFunction(() => document.querySelectorAll('#offline-list [data-download]').length === 50);
    await page.locator('[data-parent-open=downloads]').click();
  }
  try {
    await test('audio and favorite evidence preserve foundation card nodes and keyboard focus', async (a) => {
      await a.setViewportSize({ width: 1440, height: 950 });
      const result = await a.evaluate(() => {
        BearHub.show('foundation'); BearFoundation.openTab('words');
        const grid = document.getElementById('foundation-unit-grid'), card = grid.firstElementChild, id = card.dataset.unit;
        card.focus();
        BearLearning.record(id, 'heard');
        BearLearning.favorite(id, true);
        const stable = card.isConnected && document.activeElement === card;
        BearLearning.record(id, 'practiced', { foundation: true });
        return { stable, marked: grid.querySelector(`[data-unit="${id}"]`).textContent.includes('✓') };
      });
      assert.deepEqual(result, { stable: true, marked: true });
    });
    await test('a stale 收藏 button adds rather than cancels another page’s favorite', async (a, b) => {
      await library(a); await library(b);
      await a.locator('[data-favorite=word-apple]').click();
      // Simulate a click queued from the old rendered view before notification.
      await b.evaluate(() => document.querySelector('[data-favorite=word-apple]').setAttribute('aria-pressed', 'false'));
      assert.equal(await b.locator('[data-favorite=word-apple]').getAttribute('aria-pressed'), 'false');
      await b.locator('[data-favorite=word-apple]').click();
      assert.deepEqual(await b.evaluate(() => BearLearning.get().favorites), ['word-apple']);
    });
    await test('other-page changes refresh buttons and the 我的收藏 result list', async (a, b) => {
      await library(a); await library(b);
      await a.locator('[data-favorite=word-apple]').click();
      await b.waitForFunction(() => document.querySelector('[data-favorite=word-apple]').getAttribute('aria-pressed') === 'true', null, { timeout: 2000 });
      await library(b, 'favorites');
      await a.locator('[data-favorite=word-apple]').click();
      await b.waitForFunction(() => !document.querySelector('[data-favorite=word-apple]'), null, { timeout: 2000 });
      await a.evaluate(() => { BearLearning.favorite('scene:breakfast', true); BearLearning.favorite('book:' + BEAR_BOOKS[0].id, true); });
      const favorites = await a.evaluate(() => BearLearning.get().favorites);
      assert.equal(favorites.length, 2);
      await a.evaluate(() => BearProfiles.inspect(BearProfiles.backupText()));
    });
    await test('delayed favorite intents cannot override newer compacted removal', async (a, b) => {
      await a.evaluate(() => {
        const set = Storage.prototype.setItem;
        window.restoreWrites = () => { Storage.prototype.setItem = set; };
        Storage.prototype.setItem = function (key, value) {
          if (key.includes(':op:')) throw new DOMException('Full', 'QuotaExceededError');
          return set.call(this, key, value);
        };
        BearLearning.favorite('word-apple', true);
      });
      await b.evaluate(async () => { BearLearning.favorite('word-apple', false); BearLearning.favorite('word-cat', true); await BearLearning.compact(); });
      await a.evaluate(() => { restoreWrites(); BearLearning.settings({ chinese: false }); });
      await a.reload();
      assert.deepEqual(await a.evaluate(() => BearLearning.get().favorites), ['word-cat']);
    });
    await test('quota failure remains visible and the UI can remove all partial media', async (a) => {
      const result = await a.evaluate(async () => {
        await BearOffline.ready;
        const put = Cache.prototype.put; let count = 0;
        Cache.prototype.put = function (key, value) {
          if ((typeof key === 'string' ? key : key.url).includes('/audio/') && ++count === 12) throw new DOMException('Full', 'QuotaExceededError');
          return put.call(this, key, value);
        };
        let error;
        try { await BearOffline.download('breakfast'); } catch (e) { error = e.message; }
        finally { Cache.prototype.put = put; }
        return { error, rows: await BearOffline.status(), valid: await BearOffline.verify('breakfast') };
      });
      assert.equal(result.error, 'Full'); assert.equal(result.valid, false);
      assert.equal(result.rows[0]?.incomplete, true);
      await a.reload();
      assert.equal(await a.evaluate(async () => (await BearOffline.status())[0]?.incomplete), true);
      await parents(a);
      assert.match(await a.locator('[data-theme-title]').filter({ has: a.locator('[data-download=breakfast]') }).innerText(), /未完成/);
      await a.locator('[data-offline-remove=breakfast]').click();
      await a.waitForFunction(() => !document.querySelector('[data-offline-remove=breakfast]'));
      assert.deepEqual(await a.evaluate(async () => ({ rows: await BearOffline.status(), media: (await (await caches.open('bear-themes-1.0.0')).keys()).filter(k => new URL(k.url).pathname.includes('/audio/')).length, blobs: (await (await caches.open('bear-media-sha256-v1')).keys()).length })), { rows: [], media: 0, blobs: 0 });
    }, true);
    await test('failed updates retain completed metadata; retry succeeds without damaging another pack', async (a) => {
      await a.evaluate(() => BearOffline.download('breakfast'));
      await a.evaluate(() => BearOffline.download('park'));
      const before = await a.evaluate(async () => JSON.stringify((await BearOffline.status()).find(x => x.id === 'breakfast')));
      const after = await a.evaluate(async () => {
        const put = Cache.prototype.put;
        Cache.prototype.put = function (key, value) {
          if ((typeof key === 'string' ? key : key.url) === new URL('./', location.href).href) throw Error('Interrupted shell update');
          return put.call(this, key, value);
        };
        let error;
        try { await BearOffline.download('breakfast'); } catch (e) { error = e.message; }
        finally { Cache.prototype.put = put; }
        return { error, row: JSON.stringify((await BearOffline.status()).find(x => x.id === 'breakfast')), valid: await BearOffline.verify('breakfast') };
      });
      assert.equal(after.error, 'Interrupted shell update'); assert.equal(after.row, before); assert.equal(after.valid, true);
      await a.evaluate(() => BearOffline.download('breakfast'));
      assert.equal(await a.evaluate(() => BearOffline.verify('breakfast')), true);
      await a.evaluate(() => BearOffline.remove('breakfast'));
      assert.equal(await a.evaluate(() => BearOffline.verify('park')), true);
      assert.equal(await a.evaluate(async () => (await (await caches.open('bear-themes-1.0.0')).keys()).some(k => k.url.includes('/__offline_pending__/'))), false);
    }, true);
    await test('failed deletion retains a retryable package and never deletes other package media', async (a) => {
      await a.evaluate(() => BearOffline.download('breakfast'));
      await a.evaluate(() => BearOffline.download('park'));
      const result = await a.evaluate(async () => {
        const remove = Cache.prototype.delete;
        Cache.prototype.delete = function (key, options) {
          if ((typeof key === 'string' ? key : key.url).includes('/audio/')) throw Error('Delete denied');
          return remove.call(this, key, options);
        };
        let error;
        try { await BearOffline.remove('breakfast'); } catch (e) { error = e.message; }
        finally { Cache.prototype.delete = remove; }
        return { error, visible: (await BearOffline.status()).some(x => x.id === 'breakfast') };
      });
      assert.deepEqual(result, { error: 'Delete denied', visible: true });
      await a.evaluate(() => BearOffline.remove('breakfast'));
      assert.equal(await a.evaluate(() => BearOffline.verify('park')), true);
    }, true);
    await test('storage UI reclaims legacy untracked media after reload without deleting progress', async (a) => {
      await a.evaluate(async () => {
        await BearOffline.ready;
        const cache = await caches.open('bear-themes-1.0.0'), file = (await BearOffline.bundle('breakfast')).files[0];
        await cache.put(new URL(file, location.href), new Response('legacy orphan'));
        BearLearning.record('word-cat', 'practiced');
      });
      await a.reload();
      await parents(a);
      await a.locator('#page-back').click();
      await a.locator('[data-parent-open=storage]').click();
      await a.locator('#cleanup-offline-media').click();
      await a.waitForFunction(() => document.querySelector('#offline-cleanup-status').textContent.includes('已清理未被主题引用'));
      assert.equal(await a.evaluate(async () => (await (await caches.open('bear-themes-1.0.0')).keys()).filter(k => k.url.includes('/audio/')).length), 0);
      assert.equal(await a.evaluate(() => BearLearning.get().items['word-cat'].practiced), 1);
    }, true);
  } finally {
    await browser.close();
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, 'favorite-offline-recovery.json'), JSON.stringify(results, null, 2));
  }
  assert.equal(results.filter(x => !x.passed).length, 0, 'Favorite/offline recovery regressions failed');
})().catch(error => { console.error(error); process.exitCode = 1; });

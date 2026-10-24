// Isolated browser storage only; synthetic old offline cache, no real child profiles.
const assert = require('node:assert/strict');
const http = require('node:http');
const { chromium } = require('./helpers/browser.cjs');
const origin = 'http://localhost:8080';

(async () => {
  const attacker = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.end('<!doctype html><title>Frame boundary test</title><body></body>');
  });
  await new Promise(resolve => attacker.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio'] });
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      const response = await page.goto(origin + '/');
      assert.equal(response.headers()['content-security-policy'], "frame-ancestors 'self'");
      assert.equal(response.headers()['x-frame-options'], 'SAMEORIGIN');
      await page.waitForFunction(() => window.BearProfiles && navigator.serviceWorker.controller);
      await page.evaluate(() => new Promise(resolve => {
        const iframe = document.createElement('iframe');
        iframe.id = 'same-origin-probe';
        iframe.onload = resolve;
        iframe.src = '/?security-frame=same';
        document.body.append(iframe);
      }));
      assert.equal(await page.locator('#same-origin-probe').evaluate(el => Boolean(el.contentWindow.BearProfiles)), true);
      console.log('PASS online security headers and same-origin iframe');

      const parent = await context.newPage();
      await parent.goto('http://localhost:' + attacker.address().port + '/');
      const embed = async () => {
        await parent.evaluate(src => new Promise(resolve => {
          document.querySelector('iframe')?.remove();
          const iframe = document.createElement('iframe');
          iframe.onload = resolve;
          iframe.src = src;
          document.body.append(iframe);
        }), origin + '/?security-frame=cross');
        const frames = parent.frames().filter(frame => frame !== parent.mainFrame());
        const initialized = await Promise.all(frames.map(frame => frame.evaluate(() => Boolean(window.BearProfiles || window.__offlineSecurityProbe)).catch(() => false)));
        assert.ok(initialized.every(value => !value), 'A cross-origin iframe executed the app');
      };
      await embed();
      console.log('PASS browser blocks cross-origin online iframe');

      await page.locator('#same-origin-probe').evaluate(el => el.remove());
      await page.evaluate(async () => {
        const cache = await caches.open('bear-shell-1.0.0');
        await cache.put(new URL('./', location.href).href, new Response(
          '<!doctype html><title>Old offline shell</title><script>window.__offlineSecurityProbe=true</script>',
          { headers: { 'Content-Type': 'text/html' } },
        ));
      });
      await context.setOffline(true);
      const offline = await page.reload();
      await page.waitForFunction(() => window.__offlineSecurityProbe === true);
      assert.ok(offline.headers()['content-security-policy'].includes("frame-ancestors 'self'"));
      assert.equal(offline.headers()['x-frame-options'], 'SAMEORIGIN');
      await embed();
      console.log('PASS old offline cache gains frame headers and cross-origin iframe is blocked');
    } finally {
      await context.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => attacker.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

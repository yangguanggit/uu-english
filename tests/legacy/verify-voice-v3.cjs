const { chromium } = require('../helpers/browser.cjs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--use-fake-device-for-media-stream'] });
  try {
    const context = await browser.newContext({ permissions: ['microphone'], reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => {
      // Only the unavailable recognition service is simulated. Recording and playback are real.
      window.SpeechRecognition = class {
        start() { setTimeout(() => this.onerror?.({ error: 'network' }), 30); }
        abort() {}
      };
    });
    await page.goto('http://localhost:8080/?lesson=breakfast&v=1.0.0');
    await page.locator('[data-food="milk"]').click();
    await page.locator('#continue-button').click();
    await page.locator('#record-button').click();
    await page.locator('#allow-speech').click();
    await page.waitForTimeout(700);
    assert.equal(await page.locator('#record-button').getAttribute('data-state'), 'listening', 'Recognition failure must not reset active microphone capture.');
    assert.match(await page.locator('#mic-status').innerText(), /录音仍在继续/);
    await page.locator('#record-button').click();
    await page.locator('#recording-preview').waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.getElementById('recording-preview').readyState >= 2);
    assert.equal(await page.locator('#record-button').getAttribute('data-state'), 'ready');
    assert.match(await page.locator('#mic-status').innerText(), /未验证/);
    assert.equal(await page.locator('#continue-button').isVisible(), false);
    await page.locator('#use-recording-button').click();
    assert.match(await page.locator('#feedback').innerText(), /录音练习/);

    // A native browser permission denial must leave an error state and a clear retry action.
    const denied = await browser.newContext({ reducedMotion: 'reduce' });
    const deniedPage = await denied.newPage();
    const cdp = await denied.newCDPSession(deniedPage);
    const { targetInfo } = await cdp.send('Target.getTargetInfo');
    await cdp.send('Browser.setPermission', { permission: { name: 'microphone' }, setting: 'denied', origin: 'http://localhost:8080', browserContextId: targetInfo.browserContextId });
    await deniedPage.goto('http://localhost:8080/?lesson=breakfast');
    await deniedPage.locator('[data-food="milk"]').click();
    await deniedPage.locator('#continue-button').click();
    await deniedPage.locator('#record-button').click();
    await deniedPage.locator('#allow-speech').click();
    await deniedPage.locator('#record-button[data-state="error"]').waitFor();
    assert.match(await deniedPage.locator('#mic-status').innerText(), /权限/);
    assert.match(await deniedPage.locator('#record-button').innerText(), /重新请求/);

    // Permission dialogs can hide a webview: preserve the request, then stop real
    // capture cleanly if the page is hidden after recording has actually started.
    const pending = await context.newPage();
    await pending.addInitScript(() => {
      const nativeCapture = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = (...args) => new Promise((resolve, reject) => {
        window.__grantPendingCapture = () => nativeCapture(...args).then((stream) => { window.__capturedStream = stream; resolve(stream); }, reject);
      });
    });
    await pending.goto('http://localhost:8080/?lesson=breakfast');
    await pending.locator('[data-food="milk"]').click();
    await pending.locator('#continue-button').click();
    await pending.locator('#record-button').click();
    await pending.locator('#allow-speech').click();
    await pending.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    assert.equal(await pending.locator('#record-button').getAttribute('data-state'), 'requesting');
    await pending.evaluate(() => window.__grantPendingCapture());
    await pending.locator('#record-button[data-state="listening"]').waitFor();
    await pending.waitForTimeout(350);
    await pending.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    await pending.locator('#record-button[data-state="ready"]').waitFor();
    assert.equal(await pending.evaluate(() => window.__capturedStream.getTracks().every((track) => track.readyState === 'ended')), true);

    // Check actual media time advances, not just an immediately fired fake callback.
    await page.locator('#listen-button').click();
    await page.waitForFunction(() => { const audio = document.getElementById('lesson-audio'); return audio && !audio.paused && audio.currentTime > 0.15; });
    const response = await page.request.get('http://localhost:8080/__health');
    assert.equal((await response.json()).build, '1.0.0');
    assert.match(response.headers()['cache-control'], /no-store/);
    assert.deepEqual(errors, []);
    console.log('PASS: actual microphone capture and recording blob, recognition-service failure preserves capture, native permission denial retains retry state, permission-sheet visibility, background capture cleanup, recorded/practiced distinction, real audio playhead, uncached current build. Output muted.');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });

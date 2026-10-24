// Verifies actual HTML audio delivery/playback events; does not measure speaker output quality.
const { chromium } = require('../helpers/browser.cjs');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--use-fake-device-for-media-stream'] });
  try {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.addInitScript(() => {
      window.__audioEvents = [];
      window.__syntheticSpeechCalls = 0;
      const nativeSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
      window.speechSynthesis.speak = (utterance) => { window.__syntheticSpeechCalls++; nativeSpeak(utterance); };
      for (const name of ['playing', 'ended', 'error', 'pause']) {
        document.addEventListener(name, (event) => {
          if (event.target instanceof HTMLMediaElement) window.__audioEvents.push({ event: name, src: event.target.currentSrc || event.target.src });
        }, true);
      }
    });
    await page.goto('http://localhost:8080/?lesson=breakfast');
    await page.locator('#listen-button').click();
    await page.waitForFunction(() => window.__audioEvents.some((event) => event.event === 'playing' && event.src.endsWith('/audio/adult/find-milk.wav')), null, { timeout: 5000 });
    assert.equal(await page.evaluate(() => window.__syntheticSpeechCalls), 0, 'Lesson must not choose a device-dependent voice.');
    await page.locator('[data-food="milk"]').click();
    await page.locator('#continue-button').click();
    await page.locator('#bubble-speak').click();
    await page.waitForFunction(() => window.__audioEvents.some((event) => event.event === 'playing' && event.src.endsWith('/audio/adult/milk-please.wav')));
    await page.locator('#slow-speak').click();
    await page.waitForFunction(() => window.__audioEvents.some((event) => event.event === 'playing' && event.src.endsWith('/audio/adult/milk-please-slow.wav')));
    await page.locator('#record-button').click();
    await page.locator('#skip-speech').click();
    await page.waitForFunction(() => window.__audioEvents.some((event) => event.event === 'ended' && event.src.endsWith('/audio/adult/milk-please-slow.wav')), null, { timeout: 10000 });
    // A missing audio asset must leave visible, persistent feedback instead of a silent failure.
    await page.route('**/audio/adult/milk-please.wav', (route) => route.fulfill({ status: 404, body: 'Not found' }));
    await page.locator('#bubble-speak').click();
    await page.locator('#audio-status.error').waitFor();
    assert.match(await page.locator('#audio-status').innerText(), /播放失败/);
    assert.equal(await page.locator('#listen-button').getAttribute('aria-busy'), 'false');
    assert.deepEqual(pageErrors, []);
    console.log('PASS: actual WAV playback, fixed source, separate slow source, dialog-close regression, persistent missing-file error, no runtime errors. Browser output is muted.');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error.message); process.exitCode = 1; });

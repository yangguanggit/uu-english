const {output:verificationOutput}=require('../helpers/paths.cjs');
// Local browser verification. Does not validate real microphone recognition quality.
const { chromium } = require('../helpers/browser.cjs');
const assert = require('node:assert/strict');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--use-fake-device-for-media-stream'] });
  const errors = [];
  async function pageWith(mode, viewport = { width: 1440, height: 1100 }) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce', permissions: ['microphone'] });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(({ mode }) => {
      // Recognition is mocked here; lesson audio uses actual local WAV files.
      // The browser output is muted. Real microphone quality is not asserted.
      if (mode === 'unavailable') {
        Object.defineProperty(navigator.mediaDevices, 'getUserMedia', { value: undefined });
        window.SpeechRecognition = undefined;
        window.webkitSpeechRecognition = undefined;
      } else {
        window.SpeechRecognition = class {
          start() {
            setTimeout(() => {
              if (mode === 'denied') this.onerror?.({ error: 'not-allowed' });
              else this.onresult?.({ results: [[{ transcript: 'Milk, please.' }]] });
            }, 30);
          }
          abort() {}
        };
      }
    }, { mode });
    await page.goto('http://localhost:8080/?lesson=breakfast');
    return { context, page };
  }

  try {
    const { page, context } = await pageWith('unavailable');
    await page.screenshot({ path: path.join(verificationOutput, 'desktop-preview.png'), fullPage: true });
    await page.locator('[data-food="apple"]').click();
    assert.match(await page.locator('#feedback').innerText(), /milk/);
    assert.equal(await page.locator('#progress-count').innerText(), '0/3');
    assert.equal(await page.locator('#continue-button').isVisible(), false);
    await page.locator('#listen-button').click();
    await page.locator('[data-food="milk"]').click();
    assert.equal(await page.locator('#progress-count').innerText(), '1/3');
    assert.equal(await page.locator('#served-milk').getAttribute('visibility'), 'visible');
    await page.locator('#continue-button').click();
    assert.equal(await page.locator('#record-button').isDisabled(), true);
    await page.locator('#practice-button').click();
    assert.match(await page.locator('#feedback').innerText(), /没有验证语音/);
    await page.locator('#continue-button').click();
    await page.locator('[data-food="apple"]').click();
    assert.equal(await page.locator('#progress-count').innerText(), '2/3');
    await page.locator('#continue-button').click();
    assert.equal(await page.locator('#progress-count').innerText(), '3/3');
    await page.locator('#info-dialog').waitFor({ state: 'visible' });
    assert.match(await page.locator('#dialog-content').innerText(), /未验证实际语音/);
    assert.match(await page.locator('#dialog-content').innerText(), /未验证自主口语输出/);
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('little-bear-breakfast-v1')).length), 1);
    await page.locator('#restart-adventure').click();
    assert.equal(await page.locator('#progress-count').innerText(), '0/3');
    assert.equal(await page.locator('#served-food').getAttribute('visibility'), 'hidden');
    await page.reload();
    await page.locator('.desktop-nav [data-nav="growth"]').click();
    assert.match(await page.locator('#dialog-content').innerText(), /1 次小冒险/);
    await page.locator('#close-dialog').click();
    await page.locator('#parent-button').click();
    await page.locator('#clear-records').click();
    await page.locator('#confirm-clear').click();
    assert.equal(await page.evaluate(() => localStorage.getItem('little-bear-breakfast-v1')), null);
    await page.locator('#close-dialog').click();
    await page.locator('#sound-toggle').click();
    assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'), 'false');
    await page.locator('#sound-toggle').click();
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Overflow at width ${width}`);
    }
    await context.close();

    const mobile = await pageWith('unavailable', { width: 390, height: 844 });
    await mobile.page.screenshot({ path: path.join(verificationOutput, 'mobile-preview.png'), fullPage: true });
    await mobile.page.screenshot({ path: path.join(verificationOutput, 'mobile-first-screen.png') });
    await mobile.context.close();

    for (const mode of ['recognized', 'denied']) {
      const { page, context } = await pageWith(mode, { width: 390, height: 844 });
      await page.locator('[data-food="milk"]').click();
      await page.locator('#continue-button').click();
      await page.locator('#record-button').click();
      await page.locator('#allow-speech').click();
      if (mode === 'denied') {
        await page.locator('#mic-status').filter({ hasText: '录音仍在继续' }).waitFor();
        assert.equal(await page.locator('#record-button').getAttribute('data-state'), 'listening');
        assert.equal(await page.locator('#continue-button').isVisible(), false);
        await page.locator('#practice-button').click();
      } else {
        await page.getByText('识别到了 “Milk, please.” 中的目标词！这是表达练习，不是发音评分。').waitFor();
      }
      await page.locator('#continue-button').click();
      await page.locator('[data-food="bread"]').click();
      await page.locator('#continue-button').click();
      assert.match(await page.locator('#dialog-content').innerText(), mode === 'denied' ? /未验证实际语音/ : /识别到了本课目标词/);
      if (mode === 'recognized') await page.screenshot({ path: path.join(verificationOutput, 'completion-preview.png') });
      await context.close();
    }
    assert.deepEqual(errors, []);
    console.log('PASS: complete flow, incorrect food, speech fallback, mocked recognition success/denial, honest reports, restart, persistence, deletion, sound toggle, 320/390/768/1024/1440px overflow checks.');
    console.log('Real microphone, child speech accuracy, and physical iOS/Android devices are not covered.');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });

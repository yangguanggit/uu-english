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
      await page.locator('#learning-text-size-button').click();
      await page.locator('.select-option[data-value=extra]').click();
      assert.equal(await page.evaluate(()=>BearLearning.get().settings.textSize),'extra');
      assert.equal(await page.locator('body').getAttribute('data-learning-text-size'),'extra');
      await page.reload();
      assert.equal(await page.evaluate(()=>BearLearning.get().settings.textSize),'extra');
      if(await page.locator('#parent-gate').evaluate(el=>el.open))await page.locator('#parent-gate-cancel').click();
      await page.evaluate(()=>BearHub.show('foundation'));
      await page.evaluate(()=>BearFoundation.openUnit('word-grandfather'));
      const size=()=>page.locator('.foundation-hero h2').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
      const enlarged=await size();
      const action=await page.locator('#unit-next').evaluate(el=>({font:parseFloat(getComputedStyle(el).fontSize),height:el.getBoundingClientRect().height}));
      assert.equal(action.font,16);assert.ok(action.height>=44);
      await shot('foundation-large');
      await page.evaluate(()=>BearLearning.settings({textSize:'standard'}));
      assert.ok(Math.abs(enlarged/await size()-1.3)<0.01,'learning text responds to saved size');
      await page.evaluate(()=>BearLearning.settings({textSize:'extra'}));
      const backup=await page.evaluate(()=>{
        const text=BearProfiles.backupText();BearProfiles.inspect(text);return JSON.parse(text);
      });
      assert.equal(backup.children[0].learning.settings.textSize,'extra');
      await page.locator('[data-child-nav=books]').click();
      await page.locator('.book-shelf [data-book]').first().click();
      await shot('story-large');
      await page.evaluate(()=>BearHub.show('scenes'));
      await page.locator('.scene-overview [data-resume-game]').click();
      await shot('scene-large');
      await page.evaluate(()=>{
        BearLesson.open('park',false,1,true);
        document.querySelector(`[data-food="${LITTLE_BEAR_SCENES.park.listen.target}"]`).click();
        document.querySelector('#continue-button').click();
        document.querySelector('#practice-button').click();
        document.querySelector('#continue-button').click();
      });
      for(const textSize of ['standard','extra']){
        await page.evaluate(textSize=>BearLearning.settings({textSize}),textSize);
        const geometry=await page.locator('#scene').evaluate(el=>{
          const art=el.querySelector('.kitchen').getBoundingClientRect(),layer=el.querySelector('.scene-hotspots').getBoundingClientRect();
          return {art:{x:art.x,y:art.y,width:art.width,height:art.height},layer:{x:layer.x,y:layer.y,width:layer.width,height:layer.height},centres:[...el.querySelectorAll('.scene-hotspot')].map(b=>{const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})};
        });
        assert.ok(geometry.centres.length>0,'park exposes actual hotspots');
        for(const key of ['x','y','width','height'])assert.ok(Math.abs(geometry.art[key]-geometry.layer[key])<1,`hotspot frame matches illustration ${key}/${width}/${textSize}`);
        for(const c of geometry.centres)assert.ok(c.x>=geometry.art.x&&c.x<=geometry.art.x+geometry.art.width&&c.y>=geometry.art.y&&c.y<=geometry.art.y+geometry.art.height,'hotspots stay on the picture');
      }
      await page.locator('[data-spot=tree]').click();
      assert.equal(await page.locator('[data-spot=tree]').evaluate(el=>el.classList.contains('found')),true);
      await shot('hotspot-large');
      const checkLearningSize=async (selectors,headingSelector='.feature-heading h2')=>{
        const sizes=async()=>Promise.all(selectors.map(selector=>page.locator(selector).first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize))));
        await page.evaluate(()=>BearLearning.settings({textSize:'standard'}));const original=await sizes();
        const heading=await page.locator(headingSelector).first().evaluate(el=>getComputedStyle(el).fontSize);
        for(const [setting,ratio] of [['large',1.15],['extra',1.3]]){
          await page.evaluate(setting=>BearLearning.settings({textSize:setting}),setting);const enlarged=await sizes();
          enlarged.forEach((size,i)=>assert.ok(Math.abs(size/original[i]-ratio)<.01,selectors[i]+' scales '+ratio));
          assert.equal(await page.locator(headingSelector).first().evaluate(el=>getComputedStyle(el).fontSize),heading,'page heading stays fixed');
        }
      };
      await page.evaluate(()=>BearRoleplay.open(Object.keys(BEAR_SCENE_BRANCHES)[0]));
      await checkLearningSize(['.lab-card h3[lang=en]','.lab-card h3[lang=en]+p','#role-partner h3','#role-partner h3+p']);
      await shot('role-large');
      await page.evaluate(()=>BearSentenceBlocks.open());
      await checkLearningSize(['#sentence-meaning','#sentence-answer','.lab-card h3']);
      await shot('sentence-large');
      await page.evaluate(()=>BearFeatures.openPhonics('word-cat'));
      await checkLearningSize(['.phonics-word-hero h2','.phonics-word-hero .word-ipa','.phonics-word-hero>p']);
      assert.equal(await page.locator('.phonics-word-hero>p').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),20.8,'Chinese meaning enlarges with the word');
      assert.equal(await page.locator('#phonics-zh').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),16,'pronunciation control stays fixed');
      await page.locator('.phonics-word-hero').scrollIntoViewIfNeeded();
      await shot('phonics-large');
      await page.evaluate(()=>{
        BearLearning.settings({readerMode:'independent'});
        const book=BEAR_BOOKS.find(b=>b.id==='milk');
        BearLearning.reading(book.id,{page:book.pages.length-1});
        BearFeatures.openBook(book.id);
      });
      await page.locator('.story-activity summary').filter({hasText:'故事排排队'}).click();
      await page.locator('.story-activity summary').filter({hasText:'📚'}).click();
      await checkLearningSize(['.book-question h3','[data-book-answer]','[data-story-order]','[data-story-order] .translation','#story-order-progress','.story-activity blockquote'],'.story-top>strong');
      await page.locator('.book-question').scrollIntoViewIfNeeded();
      await shot('story-question-large');
      assert.equal(await page.locator('.discuss-done').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),16,'discussion acknowledgment stays fixed');
      assert.equal(await page.locator('#book-next').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)),16,'page navigation stays fixed');
      await page.evaluate(()=>{
        const book=BEAR_BOOKS.find(b=>b.id==='milk');
        BearLearning.reading(book.id,{page:BearGrowth.readingTasks(book).page});
        BearFeatures.openBook(book.id);
      });
      await checkLearningSize(['[data-story-spot]','.reading-interaction>p'],'.story-top>strong');
      await page.evaluate(()=>{
        const book=BEAR_BOOKS.find(b=>b.id==='milk');
        BearLearning.reading(book.id,{page:book.pages.findIndex(p=>p[3].length>0)});
        BearFeatures.openBook(book.id);
      });
      await checkLearningSize(['[data-story-word]'],'.story-top>strong');
      const newChild=await page.evaluate(async()=>await BearProfiles.add('字号验证'));
      await Promise.all([page.waitForNavigation(),page.evaluate(id=>BearProfiles.switchTo(id),newChild)]);
      assert.equal(await page.evaluate(()=>BearLearning.get().settings.textSize),'standard','new child keeps its own size');
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${width}px: six pages, drawer/focus, sticky categories, media controls, scene entry, reading resume and parent preferences`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error);process.exitCode=1; });

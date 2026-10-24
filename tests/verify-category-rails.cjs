const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('./helpers/browser.cjs');
const {output}=require('./helpers/paths.cjs');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
  try{
    const context=await browser.newContext({hasTouch:true,viewport:{width:390,height:844},serviceWorkers:'block'});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://localhost:8080/');
    const cdp=await context.newCDPSession(page);
    async function swipe(selector,direction=-1,vertical=false){
      const surface=page.locator(selector);await surface.scrollIntoViewIfNeeded();
      const box=await surface.boundingBox(),headerBottom=await surface.evaluate(el=>Math.max(document.querySelector('.site-header').getBoundingClientRect().bottom,...(el.closest('.page-categories,.reader-modes')?[]:[...document.querySelectorAll('.page-categories,.reader-modes')].filter(e=>e.getClientRects().length).map(e=>e.getBoundingClientRect().bottom)))),x=box.x+box.width/2,y=Math.max(headerBottom+28,Math.min(box.y+Math.min(box.height/2,45),page.viewportSize().height-120));
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
      for(let i=1;i<=5;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+(vertical?0:direction*90*i/5),y:y+(vertical?70*i/5:0)}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    }
    async function rail(selector){
      const layout=await page.locator(selector).evaluate(nav=>({rows:new Set([...nav.children].map(b=>Math.round(b.getBoundingClientRect().top))).size,wrap:getComputedStyle(nav).flexWrap,overflow:nav.scrollWidth>nav.clientWidth,selected:[...nav.children].find(b=>b.matches('[aria-pressed=true]'))?.textContent}));
      assert.equal(layout.rows,1);assert.equal(layout.wrap,'nowrap');return layout;
    }
    await page.locator('[data-child-nav=explore]').click();
    assert.equal(await page.locator('[data-explore-feature=sentence-blocks]').count(),0);
    await page.locator('[data-explore-section=foundation]').click();
    const order=['letters','phonemes','phonics','words','sentences'];
    assert.deepEqual(await page.locator('#foundation-panel [data-foundation-tab]').evaluateAll(bs=>bs.map(b=>b.dataset.foundationTab)),order);
    await rail('#foundation-panel .foundation-tabs');
    await swipe('#foundation-panel .foundation-tabs');
    assert.equal(await page.locator('#foundation-panel [data-foundation-tab=phonemes]').getAttribute('aria-pressed'),'true');
    await swipe('#foundation-panel .foundation-tabs');
    await page.locator('#phonics-workshop').waitFor();
    assert.deepEqual(await page.locator('[data-phonics-tab]').evaluateAll(bs=>bs.map(b=>b.dataset.phonicsTab)),order);
    await swipe('.phonics-foundation-nav');
    assert.equal(await page.locator('#foundation-panel [data-foundation-tab=words]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-word-theme]').count(),40);
    await rail('#word-themes');
    const firstTheme=await page.locator('[data-word-theme][aria-pressed=true]').getAttribute('data-word-theme');
    await swipe('#word-themes');
    assert.notEqual(await page.locator('[data-word-theme][aria-pressed=true]').getAttribute('data-word-theme'),firstTheme);
    await swipe('#foundation-panel .foundation-tabs');
    await page.locator('.lab-card').waitFor();
    await rail('#features-panel .foundation-tabs');await rail('.lab-patterns');
    await swipe('.lab-patterns');
    assert.equal(await page.locator('[data-pattern=see]').getAttribute('aria-pressed'),'true');
    await swipe('#features-panel .foundation-tabs',1);
    assert.equal(await page.locator('#foundation-panel [data-foundation-tab=words]').getAttribute('aria-pressed'),'true');
    // Content gestures target the deepest active category and never fall through at an edge.
    await page.evaluate(()=>BearHub.show('foundation'));await page.locator('[data-foundation-tab=letters]:visible').click();
    await swipe('#foundation-player',1);await swipe('#foundation-player',-1,true);
    assert.equal(await page.locator('[data-foundation-tab=letters]:visible').getAttribute('aria-pressed'),'true');
    await page.locator('#foundation-library-open').click();await page.locator('[data-unit="letter-B"]').click();
    assert.equal(await page.evaluate(()=>BearFoundation.checkpoint().unitId),'letter-B');
    await swipe('#foundation-player');
    assert.equal(await page.locator('[data-foundation-tab=phonemes]:visible').getAttribute('aria-pressed'),'true');
    await swipe('#foundation-player');await page.locator('#phonics-workshop').waitFor();
    await page.locator('[data-course-stage="0"]').click();await swipe('#phonics-workshop');
    assert.equal(await page.evaluate(()=>BearPhonics.checkpoint().stage),1);
    assert.equal(await page.locator('.foundation-tabs:visible [aria-current=page]').getAttribute('data-rail-key'),'phonics');
    await swipe('#phonics-workshop',1);assert.equal(await page.evaluate(()=>BearPhonics.checkpoint().stage),0);
    await swipe('#phonics-workshop',1);assert.equal(await page.evaluate(()=>BearPhonics.checkpoint().stage),0);
    await page.locator('[data-phonics-tab=words]').click();
    const themeBefore=await page.locator('[data-word-theme][aria-pressed=true]').getAttribute('data-word-theme');
    await swipe('#foundation-player');
    assert.notEqual(await page.locator('[data-word-theme][aria-pressed=true]').getAttribute('data-word-theme'),themeBefore);
    assert.equal(await page.locator('[data-foundation-tab=words]:visible').getAttribute('aria-pressed'),'true');
    await swipe('#foundation-player',1);
    assert.equal(await page.locator('[data-word-theme][aria-pressed=true]').getAttribute('data-word-theme'),themeBefore);
    await page.locator('[data-foundation-tab=sentences]:visible').click();await page.locator('[data-pattern=request]').click();
    await swipe('.lab-card');assert.equal(await page.locator('[data-pattern=see]').getAttribute('aria-pressed'),'true');
    await swipe('.lab-card',1);assert.equal(await page.locator('[data-pattern=request]').getAttribute('aria-pressed'),'true');
    await swipe('.lab-card',1);assert.equal(await page.locator('[data-pattern=request]').getAttribute('aria-pressed'),'true');
    await page.locator('[data-child-nav=books]').click();
    const levelBefore=await page.locator('[data-book-level][aria-pressed=true]').getAttribute('data-book-level');
    await swipe('.reading-level-section');
    assert.notEqual(await page.locator('[data-book-level][aria-pressed=true]').getAttribute('data-book-level'),levelBefore);
    await page.evaluate(()=>{BearLearning.settings({readerMode:'independent'});BearFeatures.openBook(BEAR_BOOKS[0].id);});
    const pageBefore=await page.locator('.story-top>span').innerText();await swipe('.story-page');
    assert.notEqual(await page.locator('.story-top>span').innerText(),pageBefore);
    assert.equal(await page.evaluate(()=>BearLearning.get().settings.readerMode),'independent');
    await swipe('.reader-modes',1);assert.equal(await page.evaluate(()=>BearLearning.get().settings.readerMode),'follow');
    await swipe('.story-top',1);assert.equal(await page.evaluate(()=>BearLearning.get().settings.readerMode),'listen');
    await page.evaluate(()=>BearHub.show('simulation'));await swipe('.simulation-intro h2');
    assert.equal(await page.locator('[data-simulation-scope=today]').getAttribute('aria-pressed'),'true');
    await swipe('.simulation-intro h2');assert.equal(await page.locator('[data-simulation-scope=all]').getAttribute('aria-pressed'),'true');
    await page.evaluate(()=>{BearHub.show('scenes');BearLesson.open('breakfast',false,1);});await swipe('.lesson-heading');
    assert.equal(await page.evaluate(()=>BearLesson.checkpoint().level),2);
    await swipe('.lesson-heading',1);assert.equal(await page.evaluate(()=>BearLesson.checkpoint().level),1);
    await page.evaluate(()=>BearFeatures.openParents('profiles','playback'));
    if(await page.locator('#parent-gate').evaluate(e=>e.open)){
      const nums=(await page.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);
      await page.locator('#parent-gate-answer').fill(String(nums[0]+nums[1]));await page.locator('#parent-gate-form button[type=submit]').click();
    }
    if(!await page.locator('button[data-child-mode=explorer]').isVisible())await page.locator('[data-parent-open=playback]').click();
    await swipe('#parent-playback-setting>p:first-child',1);
    assert.equal(await page.evaluate(()=>BearLearning.get().settings.mode),'little');
    await swipe('#parent-playback-setting>p:first-child');assert.equal(await page.evaluate(()=>BearLearning.get().settings.mode),'explorer');
    await page.locator('#return-child').click();
    console.log('PASS deepest content swipes: foundation, word themes, phonics stages, sentences, reading levels, simulation scopes, challenges and parent settings');

    await page.locator('[data-child-nav=explore]').click();await page.locator('[data-explore-section=scenes]').click();
    const groups=await page.evaluate(()=>BEAR_CATEGORY_SECTIONS);
    assert.equal(await page.locator('[data-scene-group]').count(),groups.length);
    const seen=[];
    for(let i=0;i<groups.length;i++){
      await page.locator(`[data-scene-group="${i}"]`).click();
      const ids=await page.locator('[data-category]').evaluateAll(bs=>bs.map(b=>b.dataset.category));
      assert.deepEqual(ids,groups[i].ids);seen.push(...ids);
      await rail('#scene-groups');await rail('#category-grid');
    }
    assert.equal(new Set(seen).size,50);
    await page.locator('[data-scene-group="0"]').click();
    const categoryIds=groups[0].ids;
    await swipe('#category-grid');
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),categoryIds[1]);
    await swipe('#game-select');
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),categoryIds[2]);
    assert.equal(await page.locator('#lesson-workspace').isVisible(),false);
    await swipe('#category-grid',1);
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),categoryIds[1]);
    await swipe('#category-grid',-1,true);
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),categoryIds[1]);
    // A subcategory cannot swipe past its group. The primary rail moves between groups.
    await page.locator(`[data-category="${categoryIds.at(-1)}"]`).click();await swipe('#category-grid');
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),categoryIds.at(-1));
    await swipe('#scene-groups');
    assert.equal(await page.locator('[data-scene-group="1"]').getAttribute('aria-pressed'),'true');
    await page.locator(`[data-category="${groups[1].ids.at(-1)}"]`).click();
    await page.reload();
    assert.equal(await page.locator('[data-scene-group="1"]').getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),groups[1].ids.at(-1));
    for(const width of [320,768,1440]){
      await page.setViewportSize({width,height:950});await rail('#scene-groups');await rail('#category-grid');
      const sizes=await page.evaluate(()=>['#scene-groups button','#category-grid button'].map(s=>{const b=document.querySelector(s),c=getComputedStyle(b);return {font:parseFloat(c.fontSize),height:b.getBoundingClientRect().height,radius:c.borderRadius};}));
      assert.ok(sizes[0].font>sizes[1].font);assert.ok(sizes[0].height>=sizes[1].height);assert.ok(sizes.every(s=>s.height>=44));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      await page.screenshot({path:path.join(output,'scene-rail-'+width+'.png'),fullPage:true});
      await page.evaluate(()=>BearHub.show('foundation'));await rail('#foundation-panel .foundation-tabs');
      await page.screenshot({path:path.join(output,'foundation-rail-'+width+'.png'),fullPage:true});
      await page.evaluate(()=>BearHub.show('scenes'));
    }
    // Counts describe actual child resources, rather than a stage's old sequence number.
    await page.evaluate(()=>BearHub.show('foundation'));await page.locator('[data-foundation-tab=words]:visible').click();
    assert.deepEqual(await page.locator('[data-word-theme]').evaluateAll(buttons=>buttons.filter(b=>{const t=BEAR_FOUNDATIONS.themes.find(t=>t.id===b.dataset.wordTheme),n=BEAR_FOUNDATIONS.words.filter(w=>w.theme===t.id).length;return b.textContent!==t.emoji+' '+t.title+(n===1?'':' · '+n);}).map(b=>b.textContent)),[]);
    await page.locator('[data-foundation-tab=sentences]:visible').click();
    assert.deepEqual(await page.locator('[data-pattern]').evaluateAll(buttons=>buttons.filter(b=>{const p=BEAR_SENTENCE_PATTERNS.find(p=>p.id===b.dataset.pattern);return b.textContent!==p.title+(p.examples.length===1?'':' · '+p.examples.length);}).map(b=>b.textContent)),[]);
    await page.locator('[data-foundation-tab=phonics]:visible').click();
    assert.deepEqual(await page.locator('[data-course-stage]').evaluateAll(buttons=>buttons.filter(b=>{const u=BEAR_PHONICS_COURSE[Number(b.dataset.courseStage)];return b.textContent!==u.title.replace(/^\d+\s*·\s*/,'')+(u.words.length===1?'':' · '+u.words.length);}).map(b=>b.textContent)),[]);
    await page.evaluate(()=>BearFeatures.openBooks());
    assert.deepEqual(await page.locator('[data-book-level]').evaluateAll(buttons=>buttons.filter(b=>{const g=BEAR_READING_LEVELS.find(g=>g.id===b.dataset.bookLevel),n=BEAR_BOOKS.filter(book=>book.level===g.id).length;return b.textContent!==g.id+' '+g.title+(n===1?'':' · '+n);}).map(b=>b.textContent)),[]);
    await page.evaluate(()=>BearHub.show('scenes'));
    for(const group of await page.locator('[data-scene-group]').evaluateAll(bs=>bs.map(b=>b.dataset.sceneGroup))){await page.locator(`[data-scene-group="${group}"]`).click();assert.deepEqual(await page.locator('[data-category]').evaluateAll(buttons=>buttons.filter(b=>{const c=BEAR_CATEGORIES.find(c=>c.id===b.dataset.category);return b.textContent!==c.emoji+' '+c.title+(c.games.length===1?'':' · '+c.games.length);}).map(b=>b.textContent)),[]);}
    assert.equal(await page.evaluate(()=>BearCategoryRail.label('单项分类',1)),'单项分类');
    assert.deepEqual(errors,[]);console.log('PASS exact category counts, no stage sequence prefixes, single-item omission; 50 scene categories, content gestures, vertical scroll, refresh and 3 responsive widths');
    await context.close();
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

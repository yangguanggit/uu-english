// Real touch input distinguishes menu scrolling from content category changes.
const assert=require('node:assert/strict');
const {chromium}=require('./helpers/browser.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
try{const context=await browser.newContext({hasTouch:true,viewport:{width:390,height:900},serviceWorkers:'block'}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.BEAR_TEST_URL||'http://localhost:8080/');const cdp=await context.newCDPSession(page);
async function drag(selector,dx=-110){const el=page.locator(selector);await el.scrollIntoViewIfNeeded();const b=await el.boundingBox(),top=await el.evaluate(n=>n.closest('.page-categories')?0:Math.max(document.querySelector('.site-header').getBoundingClientRect().bottom,...[...document.querySelectorAll('.page-categories')].filter(e=>e.getClientRects().length).map(e=>e.getBoundingClientRect().bottom)));const x=b.x+b.width*.65,y=Math.max(top+28,b.y+Math.min(25,b.height/2));await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/8,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
await page.evaluate(()=>BearHub.show('foundation'));await page.locator('[data-foundation-tab=words]').click();
const active=()=>page.locator('#word-themes [aria-pressed=true]').getAttribute('data-word-theme'),before=await active();
await page.locator('#word-themes').evaluate(n=>n.scrollLeft=0);await drag('#word-themes');
assert.equal(await active(),before,'dragging a menu must not select another category');
assert.ok(await page.locator('#word-themes').evaluate(n=>n.scrollLeft)>20,'dragging a menu scrolls only that rail');
await drag('#foundation-player');assert.notEqual(await active(),before,'content swipe changes its deepest category');
await page.locator('#foundation-panel .foundation-tabs').evaluate(n=>n.scrollLeft=0);await drag('#foundation-panel .foundation-tabs');assert.equal(await page.locator('[data-foundation-tab=words]:visible').getAttribute('aria-pressed'),'true');
await page.locator('[data-foundation-tab=phonics]:visible').click();const stage=await page.evaluate(()=>BearPhonics.checkpoint().stage);await drag('.course-stages');assert.equal(await page.evaluate(()=>BearPhonics.checkpoint().stage),stage);await drag('#phonics-workshop');assert.equal(await page.evaluate(()=>BearPhonics.checkpoint().stage),stage+1);
await page.evaluate(()=>BearHub.show('scenes'));const category=await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category');await drag('#category-grid');assert.equal(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),category);await drag('#game-select');assert.notEqual(await page.locator('[data-category][aria-pressed=true]').getAttribute('data-category'),category);
async function unchanged(selector){const selected=()=>page.locator(selector+' [aria-pressed=true],'+selector+' [aria-selected=true]').allTextContents(),before=await selected();await drag(selector);assert.deepEqual(await selected(),before,selector+' drag must only scroll');}
await page.evaluate(()=>BearFeatures.open('phonics'));await unchanged('.phonics-foundation-nav');await unchanged('.phonics-course .feature-tabs');await unchanged('.course-stages');
await page.locator('[data-phonics-tab=sentences]').click();await unchanged('.lab-patterns');await unchanged('#features-panel .foundation-tabs');
await page.evaluate(()=>BearFeatures.openBooks());await unchanged('.book-levels');await page.evaluate(()=>BearFeatures.openBook(BEAR_BOOKS[0].id));await unchanged('.reader-modes');
await page.evaluate(()=>BearHub.show('simulation'));await unchanged('.simulation-scopes');
await page.evaluate(()=>{BearHub.show('scenes');BearLesson.open('breakfast');});await unchanged('#lesson-workspace .feature-tabs');
await page.evaluate(()=>BearFeatures.openParents('profiles','playback'));const nums=(await page.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);await page.locator('#parent-gate-answer').fill(String(nums[0]+nums[1]));await page.locator('#parent-gate-form button[type=submit]').click();if(!await page.locator('[data-parent-detail=playback] .feature-tabs').isVisible())await page.locator('[data-parent-open=playback]').click();await unchanged('[data-parent-detail=playback] .feature-tabs');
await page.locator('#return-child').click();await page.evaluate(()=>BearFeatures.open('spelling-games'));await unchanged('.spelling-modes');await unchanged('.spelling-kinds');
// Desktop dragging must scroll a rail without synthesizing a tab click, too.
await page.evaluate(()=>BearHub.show('foundation'));await page.locator('[data-foundation-tab=words]').click();const menu=page.locator('#word-themes');await menu.scrollIntoViewIfNeeded();await menu.evaluate(n=>n.scrollLeft=0);const b=await menu.boundingBox(),selection=await active();await page.mouse.move(b.x+b.width*.7,b.y+25);await page.mouse.down();await page.mouse.move(b.x+b.width*.3,b.y+25,{steps:8});await page.mouse.up();assert.equal(await active(),selection);assert.ok(await menu.evaluate(n=>n.scrollLeft)>20);
assert.deepEqual(errors,[]);console.log('PASS menu touch scrolling never changes selection; content switches deepest word, phonics and scene categories');await context.close();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

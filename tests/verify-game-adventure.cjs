const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});try{
 const context=await browser.newContext({viewport:{width:390,height:950}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.BEAR_TEST_URL||'http://localhost:8080/');await page.evaluate(()=>BearFeatures.open('spelling-games'));
 assert.equal(await page.locator('[data-game-buddy]').count(),3);await page.locator('[data-game-buddy=cat]').click();await page.reload();assert.equal(await page.locator('[data-game-buddy=cat]').getAttribute('aria-pressed'),'true');
 await page.locator('[data-spelling-mode=bingo]').click();await page.locator('#spelling-start').click();
 const snap=()=>page.evaluate(()=>BearFeatures.spellingCheckpoint().game);
 assert.equal((await snap()).cheer.buddy,'cat');
 assert.equal(await page.evaluate(()=>{const arena=document.createElement('div'),row=BearSpellingGames.targets('words','').find(row=>row.id==='word-big');const game={done:false,matches:[],position:4,chestOrder:[0]};BearSpellingBoards.bingo({arena,game,rows:[row],goal:1,onPick(){}});const bingo=arena.querySelectorAll('svg.word-art').length===1&&!arena.textContent.includes('<svg');BearSpellingBoards.treasure({arena,game,choices:[row],onMove(){},onPick(){}});return bingo&&arena.querySelectorAll('svg.word-art').length===1&&!arena.textContent.includes('<svg');}),true);
 const beforeMessage=await page.locator('[data-buddy-message]').innerText();await page.locator('[data-buddy-wave]').click();assert.notEqual(await page.locator('[data-buddy-message]').innerText(),beforeMessage);
 async function request(){return page.evaluate(()=>{const play=BearLesson.playFiles;let label;BearLesson.playFiles=files=>{label=files[0].label;};document.querySelector('#spelling-listen').click();BearLesson.playFiles=play;return BearSpellingGames.targets('words','').find(row=>row.text===label).id;});}
 let hits=0;
 for(let question=0;question<5;question++){
  if(question===1){const id=await request(),wrong=await page.locator('[data-bingo-id]').evaluateAll((buttons,id)=>buttons.find(b=>b.dataset.bingoId!==id).dataset.bingoId,id);await page.locator(`[data-bingo-id="${wrong}"]`).click();assert.equal((await snap()).cheer.streak,0);assert.equal((await snap()).cheer.sparks,1);}
  for(let pick=0;pick<3;pick++){const id=await request();await page.locator(`[data-bingo-id="${id}"]`).click();hits++;const state=await snap();assert.equal(state.cheer.streak,question===0?hits:hits-3);}
  assert.equal((await snap()).done,true);
  assert.equal(await page.locator('.adventure-route .is-collected').count(),question+1);
  if(question===0){assert.equal((await snap()).cheer.sparks,1);const old=await snap();await page.reload();assert.deepEqual((await snap()).cheer,old.cheer);}
  await page.locator('#spelling-next').click();
 }
 assert.equal((await snap()).cheer.sparks,5);assert.equal((await snap()).cheer.best,12);
 assert.equal(await page.locator('.adventure-badge').isVisible(),true);assert.equal(await page.locator('[data-recap-id]').count(),5);
 const recap=await page.evaluate(()=>{const play=BearLesson.playFiles;let files;BearLesson.playFiles=value=>files=value;document.querySelector('[data-recap-id]').click();BearLesson.playFiles=play;return files;});assert.equal(recap.length,2);
 await page.reload();assert.equal((await snap()).cheer.sparks,5);assert.match(await page.locator('.adventure-badge').innerText(),/已收集 1 枚/);
 for(const width of [320,768,1440]){await page.setViewportSize({width,height:950});
  let base;
  for(const [size,scale] of [['standard',1],['large',1.15],['extra',1.3]]){
   await page.evaluate(size=>BearLearning.settings({textSize:size}),size);
   const fonts=await page.locator('.spelling-recap>button').first().evaluate(el=>[el.querySelector('strong'),el.querySelector('span:not(:first-child)'),el.querySelector('span:first-child')].map(node=>parseFloat(getComputedStyle(node).fontSize)));
   if(!base)base=fonts;
   assert.ok(Math.abs(fonts[0]-base[0]*scale)<.05);assert.ok(Math.abs(fonts[1]-base[1]*scale)<.05);assert.equal(fonts[2],base[2]);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  }
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.join(output,`adventure-result-${width}.png`),fullPage:true});}
 await page.locator('#spelling-home').click();await page.locator('#spelling-start').click();
 // Old session snapshots have no cosmetic fields; keep their actual puzzle state.
 const legacy=await page.evaluate(()=>{const saved=BearFeatures.spellingCheckpoint();delete saved.game.cheer;delete saved.buddy;const ids=saved.game.ids;BearFeatures.restoreSpelling(saved);return {ids,restored:BearFeatures.spellingCheckpoint().game};});assert.deepEqual(legacy.restored.ids,legacy.ids);assert.equal(legacy.restored.cheer.buddy,'bear');
 for(const width of [320,768,1440]){await page.setViewportSize({width,height:950});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.locator('#spelling-board').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`adventure-board-${width}.png`)});}
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.adventure-friend>button').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
 assert.equal(await page.evaluate(()=>BearGameAdventure.valid({buddy:'bad',streak:0,best:0,sparks:0})),false);
 assert.deepEqual(errors,[]);await context.close();console.log('PASS buddies, themed missions, single-count combos, retained stars after wrong moves, refresh, badge/recap audio, legacy snapshot and three responsive widths');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

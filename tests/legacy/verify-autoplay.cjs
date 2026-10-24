// Real media events; muted output does not evaluate pronunciation quality.
const {chromium}=require('../helpers/browser.cjs');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.playEvents=[];window.audioElements=[];document.addEventListener('playing',e=>{if(e.target.id==='lesson-audio'){playEvents.push(e.target.src.split('/').at(-1));audioElements.push(e.target)}},true)});
 await page.goto('http://localhost:8080/');assert.equal((await (await page.request.get('http://localhost:8080/__health')).json()).build,'1.0.0');
 assert.equal(await page.locator('#lesson-audio').count(),0,'Home must not autoplay before user interaction');
 await page.evaluate(()=>BearHub.show('foundation'));
 const data=await page.evaluate(()=>BEAR_FOUNDATIONS);
 for(const tab of ['letters','phonemes']){
  await page.locator(`[data-foundation-tab=${tab}]`).click();
  for(const unit of data[tab]){await reset();await page.locator(`[data-unit="${unit.id}"]`).click();await played(unit.audio+'.'+(unit.extension||'wav'));}
 }
 console.log('PASS: all 26 letters and 24 phonemes play on card selection');
 await page.locator('[data-foundation-tab=words]').click();await page.locator('[data-word-theme=food]').click();
 for(const id of ['word-apple','word-milk','word-bread']){
  await reset();await page.locator(`[data-unit=${id}]`).click();const u=data.words.find(w=>w.id===id);
  const y=await page.locator('.foundation-layout').evaluate(e=>e.getBoundingClientRect().y);
  await played(u.audio+'.wav');await played(u.zhAudio+'.wav');
  assert.deepEqual(await page.evaluate(()=>playEvents),[u.audio+'.wav',u.zhAudio+'.wav']);
  assert.equal(await page.evaluate(()=>audioElements[0]===audioElements[1]),true,'English/Chinese must reuse the unlocked media element');
  await page.waitForFunction(()=>!document.querySelector('#lesson-audio'));
  assert.equal(await page.locator('.foundation-layout').evaluate(e=>e.getBoundingClientRect().y),y,'Playback status cannot shift content');
 }
 await reset();await page.locator('[data-unit=word-milk]').click();await played('foundation-word-milk.wav');await page.locator('[data-foundation-tab=letters]').click();await page.waitForTimeout(2200);assert.ok(!(await page.evaluate(()=>playEvents)).includes('foundation-zh-milk.wav'),'Switch must cancel pending Chinese');
 console.log('PASS: English → Chinese in order, same media element, no layout jump, old queue cancelled on switch');
 const route=await page.evaluate(()=>LITTLE_BEAR_ROUTE),scenes=await page.evaluate(()=>LITTLE_BEAR_SCENES);
 const manifest=JSON.parse(require('node:fs').readFileSync(require('node:path').join(require('../helpers/paths.cjs').root,'audio/metadata/learning-manifest.json')));
 const byFile=Object.fromEntries(manifest.map(r=>[r.file,r.text]));
 await page.locator('.mobile-nav [data-child-nav=explore]').click();await page.locator('[data-explore-section=scenes]').click();
 for(const id of route){
  await reset();await page.evaluate(id=>BearLesson.open(id),id);await playingText(scenes[id].listen.en);
  await reset();await page.locator(`#food-grid [data-food="${scenes[id].listen.target}"]`).click();await page.locator('#continue-button').click();await playingText(scenes[id].speech.en);
 }
 console.log('PASS: all 165 game entries and 165 listening → speaking step transitions autoplay the expected sentence');
 await page.locator('.mobile-nav [data-child-nav=explore]').click();await page.locator('[data-explore-section=simulation]').click();await page.locator('[data-simulation-scope=all]').click();await reset();await page.locator('#start-simulation').click();
 for(let station=0;station<5;station++){
  const id=await page.locator('#scene').getAttribute('data-scene');
  for(let turn=0;turn<3;turn++){
   await playingText(scenes[id].dialogue[turn].npc);await reset();await page.locator('#practice-button').click();
  }
  await page.locator('#continue-button').click();
 }
 console.log('PASS: 5 simulation scene entries and all 15 dialogue turns autoplay the expected partner sentence');
 // Verify browser-denied playback and recovery through the retained manual button.
 await page.locator('.mobile-nav [data-child-nav=explore]').click();await page.locator('[data-explore-section=foundation]').click();await page.locator('[data-foundation-tab=words]').click();await page.locator('[data-word-theme=food]').click();await reset();
 await page.evaluate(()=>{window.nativeMediaPlay=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('blocked','NotAllowedError'))}});
 await page.locator('[data-unit=word-milk]').click();await page.locator('#toast.visible').filter({hasText:'浏览器暂未允许'}).waitFor();
 assert.equal(await page.locator('#lesson-audio').count(),0);
 await page.evaluate(()=>{HTMLMediaElement.prototype.play=nativeMediaPlay});await page.locator('#foundation-listen').click();await played('foundation-word-milk.wav');await played('foundation-zh-milk.wav');
 await page.locator('#sound-toggle').click();await reset();await page.locator('[data-unit=word-apple]').click();await page.waitForTimeout(200);assert.deepEqual(await page.evaluate(()=>playEvents),[]);
 assert.deepEqual(errors,[]);console.log('PASS: autoplay denial is visible, manual replay recovers both languages, mute is respected; no runtime errors');
 async function reset(){await page.evaluate(()=>{BearLesson.pause();playEvents=[];audioElements=[]})}
 async function played(file){await page.waitForFunction(file=>playEvents.includes(file),file,{timeout:7000})}
 async function playingText(text){await page.waitForFunction(()=>document.querySelector('#lesson-audio')?.currentTime>.01);const file=(await page.locator('#lesson-audio').getAttribute('src')).split('/').at(-1);assert.equal(byFile[file],text,file);}
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

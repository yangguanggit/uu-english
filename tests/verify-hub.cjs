const {output:verificationOutput}=require('./helpers/paths.cjs');
// Real Chrome, local media playback, fake microphone source. No real child speech grading.
const {chromium}=require('./helpers/browser.cjs');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio','--use-fake-device-for-media-stream']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',permissions:['microphone']});const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.SpeechRecognition=class{start(){setTimeout(()=>this.onerror?.({error:'network'}),30)}abort(){}};const real=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=async c=>{const stream=await real(c);(window.testStreams??=[]).push(stream);return stream}});
  await page.goto('http://localhost:8080/?v=1.0.1');
  // This suite checks adult media playback and logical-to-physical routing; child defaults and routing have dedicated suites.
  await page.evaluate(()=>{BearLearning.settings({voice:'adult'});BearHub.show('foundation');});
  assert.equal(await page.locator('#foundation-unit-grid button').count(),26);
  const categories=await page.evaluate(()=>window.BEAR_CATEGORIES),route=await page.evaluate(()=>window.LITTLE_BEAR_ROUTE),scenes=await page.evaluate(()=>window.LITTLE_BEAR_SCENES);
  assert.equal(categories.length,50);assert.equal(new Set(route).size,250);assert.deepEqual(route,categories.flatMap(c=>c.games));categories.forEach(c=>assert.equal(c.games.length,5));
  await page.locator('[data-unit=letter-Z]').click();await page.locator('#foundation-listen').click();await playing(/foundation-letter-Z-v4.wav/);
  await page.locator('#foundation-record').click();await page.locator('#allow-speech').click();await page.waitForFunction(()=>document.querySelector('#foundation-record').dataset.state==='listening');
  await page.waitForTimeout(550);assert.equal(await page.locator('#foundation-record').getAttribute('data-state'),'listening');
  await page.locator('#foundation-record').click();await page.locator('#foundation-recording').waitFor({state:'visible'});await page.waitForFunction(()=>document.querySelector('#foundation-recording').readyState>=2);
  assert.ok(await page.evaluate(async()=> (await (await fetch(document.querySelector('#foundation-recording').src)).blob()).size>0));
  await page.locator('#foundation-save-recording').click();assert.match(await page.locator('#foundation-feedback').innerText(),/录音练习/);
  await page.locator('[data-foundation-tab=phonemes]').click();assert.equal(await page.locator('[data-unit]').count(),24);await page.locator('#foundation-listen').click();await playing(/osu-english-0069-v1.wav/);assert.match(await page.locator('#playback-status').innerText(),/音标/);
  await page.locator('#foundation-example').click();await playing(new RegExp(await page.evaluate(()=>BearVoices.resolve('phoneme-example-see.wav','adult').file)));
  assert.equal(await page.evaluate(async()=>{const ctx=new AudioContext();try{for(const u of BEAR_FOUNDATIONS.phonemes){const response=await fetch('audio/'+BearVoices.resolve(u.audio+'.'+(u.extension||'wav')).file);if(!response.ok)throw Error(u.audio);const buffer=await ctx.decodeAudioData(await response.arrayBuffer());if(buffer.duration<=0)throw Error(u.audio+' empty')}return BEAR_FOUNDATIONS.phonemes.length}finally{await ctx.close()}}),24);
  await page.locator('[data-foundation-tab=words]').click();assert.equal(await page.locator('[data-word-theme]').count(),40);
  for(const theme of await page.locator('[data-word-theme]').evaluateAll(bs=>bs.map(b=>b.dataset.wordTheme))){await page.locator(`[data-word-theme="${theme}"]`).click();assert.equal(await page.locator('[data-unit]').count(),await page.evaluate(theme=>BEAR_FOUNDATIONS.words.filter(w=>w.theme===theme).length,theme));assert.ok(await page.locator('.foundation-picture').evaluate(e=>e.textContent.trim().length>0||Boolean(e.querySelector('svg.word-art path,svg.word-art rect,svg.word-art circle'))))}
  await page.locator('#foundation-practiced').click();assert.match(await page.locator('#foundation-feedback').innerText(),/自行跟读/);
  await page.evaluate(()=>BearHub.show('scenes'));
  async function category(id){const group=await page.evaluate(id=>BEAR_CATEGORY_SECTIONS.findIndex(g=>g.ids.includes(id)),id);await page.locator(`[data-scene-group="${group}"]`).click();await page.locator(`[data-category="${id}"]`).click();}
  for(const cat of categories){await category(cat.id);assert.deepEqual(await page.locator('[data-game]').evaluateAll(bs=>bs.map(b=>b.dataset.game)),cat.games)}
  await category('zoo');await page.locator('[data-game=zoo-kind]').click();assert.equal(await page.locator('#scene').getAttribute('data-scene'),'zoo-kind');await page.locator('#page-back').click();assert.equal(await page.locator('[data-category=zoo]').getAttribute('aria-pressed'),'true');
  await page.evaluate(()=>BearLesson.open('breakfast'));
  for(let i=0;i<route.length;i++){
   const id=route[i],game=scenes[id],next=route[(i+1)%route.length],cat=categories.find(c=>c.id===game.categoryId);
   assert.equal(await page.locator('#scene').getAttribute('data-scene'),id);
   assert.deepEqual(await page.locator('#scene-switcher button').evaluateAll(bs=>bs.map(b=>b.dataset.sceneButton)),cat.games);
   assert.equal(await page.locator('#next-scenes button').getAttribute('data-scene-button'),next);
   await page.evaluate(({game})=>{
    const click=s=>{const e=document.querySelector(s);if(!e||e.hidden||e.disabled)throw Error('Unavailable '+s);e.click()};
    click(`#food-grid [data-food="${game.options.find(o=>o.id!==game.listen.target).id}"]`);
    if(!document.querySelector('#continue-button').hidden)throw Error('Wrong selection passed');
    click(`#food-grid [data-food="${game.listen.target}"]`);click('#continue-button');click('#practice-button');click('#continue-button');
    const f=game.final;
    if(f.kind==='dialogue')for(let turn=0;turn<3;turn++)click('#practice-button');
    else if(f.kind==='choice')click('#food-grid [data-food="apple"]');
    else if(f.kind==='hotspot')click(`[data-spot="${f.answer}"]`);
    else if(f.kind==='sorter')for(const bin of f.bins){click(`#sorter-area [data-food="${bin.object}"]`);click(`[data-bin="${bin.id}"]`)}
    else if(f.kind==='sequence')for(const task of f.sequence)click(`#food-grid [data-food="${task.id}"]`);
    else if(f.kind==='counter')for(let n=0;n<f.target;n++)click('#counter-plus');
    click('#continue-button');
    if(f.kind!=='dialogue'){
     if(!BearLesson.checkpoint().state.branchStarted)throw Error('Missing branch after original mechanic '+game.id);
     for(let turn=0;turn<3;turn++)click('#practice-button');click('#continue-button');
    }
   },{game});
   assert.equal(await page.locator('#info-dialog').isVisible(),true,id+' completion');
   assert.ok((await page.locator('#next-scene-action').innerText()).includes(scenes[next].title));
   await page.locator('#next-scene-action').click();
  }
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem(BearProfiles.storageKey('little-bear-breakfast-v1'))).length),30,'Summaries capped at 30');
  assert.equal(await page.locator('#route-completed').innerText(),'本类已完成 5 / 5 关');
  console.log('PASS: 250 games including original mechanics, category order and all next transitions');
  await page.evaluate(()=>BearHub.show('simulation'));await page.locator('[data-simulation-scope=all]').click();await page.locator('#start-simulation').click();const simCategories=[];
  for(let station=0;station<5;station++){
   const id=await page.locator('#scene').getAttribute('data-scene');simCategories.push(scenes[id].categoryId);
   assert.equal(await page.locator('#scene-picker').isVisible(),false);assert.equal(await page.locator('.next-adventure').isVisible(),false);
   for(let turn=0;turn<3;turn++){
    const resolved=await page.evaluate(()=>BearGrowth.dialogue(LITTLE_BEAR_SCENES[BearLesson.checkpoint().id],BearLesson.checkpoint().state)[BearLesson.checkpoint().state.dialogueIndex]);
    assert.equal(await page.locator('.dialogue-partner strong').innerText(),resolved.npc);
    assert.equal(await page.locator('.phrase-card>strong').innerText(),resolved.answer);
    if(station===0&&turn===0){await page.locator('.dialogue-partner button').click();await playing();await page.locator('#slow-speak').click();await playing()}
    await page.locator('#practice-button').click();
   }
   await page.locator('#continue-button').click();
  }
  assert.equal(new Set(simCategories).size,5);assert.match(await page.locator('#simulation-panel').innerText(),/15 轮/);assert.equal(await page.locator('.simulation-recap span').count(),5);
  await page.locator('#restart-simulation').click();assert.equal(await page.locator('#lesson-workspace').isVisible(),true);await page.locator('#page-back').click();assert.equal(await page.locator('#start-simulation').isVisible(),true);
  // Active capture is released when switching learning mode.
  await page.evaluate(()=>BearHub.show('foundation'));await page.locator('#foundation-record').click();await page.waitForFunction(()=>document.querySelector('#foundation-record').dataset.state==='listening');await page.evaluate(()=>BearHub.show('scenes'));assert.equal(await page.evaluate(()=>testStreams.every(s=>s.getTracks().every(t=>t.readyState==='ended'))),true);
  // Responsive validation of all entry points and active dialogue.
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   for(const section of ['foundation','scenes','simulation']){
    await page.evaluate(s=>BearHub.show(s),section);await overflow(section,width);
    if(width===390||width===1440)await page.screenshot({path:path.join(verificationOutput,`hub-${section}-${width}.png`),fullPage:true});
   }
   await page.locator('#start-simulation').click();await overflow('active simulation',width);
   if(width===390||width===1440)await page.screenshot({path:path.join(verificationOutput,`hub-dialogue-${width}.png`),fullPage:true});
   for(const tab of ['letters','phonemes','words']){await page.evaluate(()=>BearHub.show('foundation'));await page.locator(`[data-foundation-tab="${tab}"]`).click();await overflow(tab,width)}
  }
  assert.deepEqual(errors,[]);console.log('PASS: foundations/media/recording, 5 different simulation categories/15 rounds, cleanup, 320–1440px layouts; no browser errors');
  async function playing(pattern){await page.waitForFunction(()=>document.querySelector('#lesson-audio')?.currentTime>.02);if(pattern)assert.match(await page.locator('#lesson-audio').getAttribute('src'),pattern)}
  async function overflow(name,width){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${name} overflows ${width}px`)}
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});

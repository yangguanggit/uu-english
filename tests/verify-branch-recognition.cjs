// Canonical speech match chooses the actual semantic path; no raw transcript is stored.
const assert=require('node:assert/strict');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio','--use-fake-device-for-media-stream']});
 const context=await browser.newContext({permissions:['microphone'],serviceWorkers:'block',viewport:{width:390,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.addInitScript(()=>{window.SpeechRecognition=class{start(){window.__recognizer=this;}abort(){}};});await page.goto('http://localhost:8080/');
  await page.evaluate(()=>{BearHub.show('simulation');BearLesson.open('clinic-tummy',true,2,true);});
  await page.locator('#record-button').click();await page.locator('#allow-speech').click();await page.waitForFunction(()=>document.getElementById('record-button').dataset.state==='listening');
  const previousCount=await page.evaluate(()=>BearLearningTools.week().counts.independent||0);
  const expected=await page.evaluate(()=>{
   const branch=BearGrowth.branches['clinic-tummy'].paths[1];
   window.__recognizer.onresult({results:[[{transcript:branch.choices[1].toUpperCase()}]]});
   return {reply:branch.choices[1],npc:branch.npc};
  });
  assert.equal(await page.locator('.dialogue-partner strong').innerText(),expected.npc);
  assert.equal(await page.evaluate(()=>BearLearningTools.week().counts.independent),previousCount+1,'One recognized exchange is one activity');
  assert.deepEqual(await page.evaluate(()=>BearLesson.checkpoint().state.replyHistory),[expected.reply]);
  await page.reload();assert.equal(await page.locator('.dialogue-partner strong').innerText(),expected.npc);
  await page.evaluate(()=>{BearHub.show('scenes');BearLesson.open('breakfast',false,1,true);document.querySelector('#food-grid [data-food=milk]').click();document.getElementById('continue-button').click();});
  await page.locator('#record-button').click();if(await page.locator('#allow-speech').isVisible())await page.locator('#allow-speech').click();await page.waitForFunction(()=>document.getElementById('record-button').dataset.state==='listening');
  await page.evaluate(()=>window.__recognizer.onresult({results:[[{transcript:'Milk, please.'}]]}));
  assert.equal(await page.evaluate(()=>BearLesson.checkpoint().state.speech),'recognized','Ordinary speech uses ordinary phrase, not branch choices');
  // Branches in the original mini-game resume after refresh without requiring it to be repeated.
  await page.locator('#continue-button').click();await page.locator('#food-grid [data-food=apple]').click();await page.locator('#continue-button').click();
  assert.equal(await page.evaluate(()=>BearLesson.checkpoint().state.branchStarted),true);
  await page.getByRole('button',{name:'Water, please.',exact:true}).click();await page.locator('#practice-button').click();await page.reload();
  assert.equal(await page.locator('.dialogue-partner strong').innerText(),'Here is your water.');
  assert.equal(await page.evaluate(()=>BearLesson.checkpoint().state.branchStarted),true);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});await page.evaluate(()=>{BearHub.show('simulation');BearLesson.open('flower-shop-5',true,1,true);});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`branch overflow ${width}`);
   if(width===390||width===1440)await page.screenshot({path:path.join(output,`scene-branches-${width}.png`),fullPage:true});
  }
  const offline=await page.evaluate(async()=>{
   const missing=[],scenes=new Set();
   for(const theme of BEAR_LEARNING_THEMES){
    const pack=await BearOffline.bundle(theme.id),files=new Set(pack.files),category=BEAR_CATEGORIES.find(c=>c.games.includes(theme.scene));
    if(category?.games.length!==5)missing.push(theme.id+': category');
    for(const id of category?.games||[]){scenes.add(id);for(const file of BearGrowth.sceneFiles(id))for(const voice of BearVoices.list().filter(p=>p.ready)){
     const resolved='audio/'+BearVoices.resolve(file,voice.id).file;if(!files.has(resolved))missing.push(theme.id+': '+id+': '+resolved);
    }}
   }return {missing,scenes:scenes.size,expected:new Set(BEAR_LEARNING_THEMES.flatMap(t=>BEAR_CATEGORIES.find(c=>c.games.includes(t.scene))?.games||[])).size};
  });assert.deepEqual(offline.missing,[]);assert.equal(offline.scenes,offline.expected);
  assert.deepEqual(errors,[]);console.log('PASS direct speech selects the second branch, canonical-only history, normal speech, game branch reload, all 50 offline theme associations and 320–1440px layouts');
 }finally{await context.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

// Actual installed child MP3/WAV decoding, bilingual queues, speed and offline delivery.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {root,output}=require('./helpers/paths.cjs'),{chromium}=require('./helpers/browser.cjs');
const packs=require('../scripts/voice-pack.cjs').validateRegistry();
assert.equal(packs.find(p=>p.id==='child')?.ready,true,'Import a reviewed child pack before running this check');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.addInitScript(()=>{window.__events=[];document.addEventListener('playing',e=>{if(e.target.id==='lesson-audio')window.__events.push({file:new URL(e.target.currentSrc).pathname.split('/audio/').at(-1),voice:e.target.dataset.voice,rate:e.target.playbackRate});},true);});
  await page.goto('http://localhost:8080/');
  const decoded=await page.evaluate(async()=>{
   const pack=BEAR_VOICE_PACKS.find(p=>p.id==='child'),files=[...new Set(Object.values(pack.clips).map(c=>c.file))],ctx=new AudioContext(),failures=[];let next=0,count=0;
   try{await Promise.all(Array.from({length:4},async()=>{while(next<files.length){const file=files[next++];try{const response=await fetch('audio/'+file);if(!response.ok)throw Error('HTTP '+response.status);const buffer=await ctx.decodeAudioData(await response.arrayBuffer());if(!buffer.length||!Number.isFinite(buffer.duration)||buffer.duration<.08)throw Error('Invalid decoded duration');count++;}catch(e){failures.push({file,error:e.message});}}}));}finally{await ctx.close();}
   return {count,total:files.length,failures};
  });
  assert.equal(decoded.count,decoded.total);assert.deepEqual(decoded.failures,[]);
  console.log(`PASS native browser decoding: ${decoded.count} installed child recordings`);
  await page.evaluate(()=>{const button=document.createElement('button');button.id='test-voice-play';button.textContent='播放测试';button.style.cssText='position:fixed;top:150px;left:20px;z-index:99999';document.body.append(button);button.onclick=()=>{const w=BEAR_FOUNDATIONS.words.find(w=>w.text==='milk');BearLesson.playFiles([{file:w.audio+'.wav',label:w.text},{file:w.zhAudio+'.wav',label:w.zh}]);};});
  for(const [speed,rate] of [['slow',.5],['medium',.75],['normal',1]]){
   await page.evaluate(speed=>{BearLesson.pause();BearLearning.settings({voice:'child',speed,speedChosen:true});window.__events=[];},speed);
   await page.locator('#test-voice-play').click();
   await page.waitForFunction(()=>window.__events.length===2,null,{timeout:15000});
   const result=await page.evaluate(()=>({events:window.__events,word:BEAR_FOUNDATIONS.words.find(w=>w.text==='milk'),heard:BearLearning.get().items['word-milk']?.heard}));
   const pack=packs.find(p=>p.id==='child');
   assert.deepEqual(result.events.map(e=>e.file),[pack.clips[result.word.audio+'.wav'].file,pack.clips[result.word.zhAudio+'.wav'].file]);
   for(const event of result.events){assert.equal(event.voice,'child');assert.equal(event.rate,rate);}
   assert.ok(result.heard>=1,'logical learning IDs survive voice mapping');
  }
  await page.evaluate(()=>{BearLesson.pause();BearLearning.settings({speed:'medium',speedChosen:true});});
  // Real package download and Worker range responses, without network access afterwards.
  await page.evaluate(async()=>{await BearOffline.ready;await BearOffline.download('breakfast');});
  await context.setOffline(true);
  await page.reload();
  assert.equal(await page.evaluate(()=>BearVoices.current()),'child');
  await page.evaluate(()=>{window.__events=[];const button=document.createElement('button');button.id='offline-voice-play';button.textContent='离线播放';button.style.cssText='position:fixed;top:150px;left:20px;z-index:99999';document.body.append(button);button.onclick=()=>{const w=BEAR_FOUNDATIONS.words.find(w=>w.text==='milk');BearLesson.playFiles([{file:w.audio+'.wav',label:w.text},{file:w.zhAudio+'.wav',label:w.zh}]);};});
  await page.locator('#offline-voice-play').click();await page.waitForFunction(()=>window.__events.length===2,null,{timeout:15000});
  assert.ok((await page.evaluate(()=>window.__events)).every(e=>e.voice==='child'&&e.file.startsWith('child/')));
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'installed-child-audio.json'),JSON.stringify({passed:true,decoded,speeds:[.5,.75,1],bilingual:true,offlineReload:true,phonemes:'shared original recordings'},null,2));
  console.log('PASS real child recordings: English/Chinese, 3 speeds, logical learning IDs, offline package and offline reload');
 }finally{await context.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

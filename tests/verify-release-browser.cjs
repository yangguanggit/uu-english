// Run against the production release, preferably through the supplied Nginx vhost.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {root,output}=require('./helpers/paths.cjs'),{chromium}=require('./helpers/browser.cjs');
const base=process.env.BEAR_RELEASE_URL||'http://localhost:5181/';
const rows=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json')));
const child=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/child-voice-manifest.json')));
const expected=Object.fromEntries([...rows.map(row=>[row.asset,row.seconds]),...child.recordings.map(row=>[row.file,row.seconds])]);
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 const context=await browser.newContext(),page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 try{
  await page.goto(base);
  const decoded=await page.evaluate(async expected=>{
   const catalog=await (await fetch('offline-assets.json')).json(),files=Object.keys(catalog.audio),ctx=new AudioContext(),failures=[];let next=0,count=0;
   try{await Promise.all(Array.from({length:4},async()=>{while(next<files.length){const file=files[next++];try{
    const response=await fetch('audio/'+file);if(!response.ok)throw Error('HTTP '+response.status);
    if(file.endsWith('.mp3')&&!response.headers.get('content-type')?.startsWith('audio/mpeg'))throw Error('Wrong MP3 MIME');
    const buffer=await ctx.decodeAudioData(await response.arrayBuffer());
    if(buffer.duration<.08||!Number.isFinite(buffer.duration))throw Error('Invalid duration');
    if(file.endsWith('.mp3')&&Number.isFinite(expected[file])&&Math.abs(buffer.duration-expected[file])>.05)throw Error('Duration changed: '+buffer.duration+' / '+expected[file]);
    let peak=0;const samples=buffer.getChannelData(0);for(let i=0;i<samples.length;i++)peak=Math.max(peak,Math.abs(samples[i]));if(peak<.005)throw Error('Silent audio');
    count++;
   }catch(error){failures.push({file,error:error.message});}}}));}finally{await ctx.close();}
   return {count,total:files.length,failures};
  },expected);
  fs.writeFileSync(path.join(output,'release-decode.json'),JSON.stringify(decoded,null,2));
  assert.deepEqual(decoded.failures,[]);assert.equal(decoded.count,decoded.total);
  console.log(`PASS production browser decode: ${decoded.count} files, non-silence, MIME and source duration`);
  await page.evaluate(()=>{
   window.__plays=[];document.addEventListener('playing',event=>{if(event.target.id==='lesson-audio')window.__plays.push({src:event.target.currentSrc,rate:event.target.playbackRate});},true);
   const button=document.createElement('button');button.id='release-play';button.textContent='测试';button.style.cssText='position:fixed;top:150px;left:20px;z-index:99999';document.body.append(button);
   button.onclick=()=>{window.__plays=[];const w=BEAR_FOUNDATIONS.words.find(w=>w.text==='milk');BearLesson.playFiles([{file:w.audio+'.wav',label:w.text},{file:w.zhAudio+'.wav',label:w.zh}]);};
  });
  for(const voice of ['adult','child'])for(const [speed,rate] of [['slow',.5],['medium',.75],['normal',1]]){
   await page.evaluate(({voice,speed})=>{BearLesson.pause();BearLearning.settings({voice,speed,speedChosen:true});},{voice,speed});
   await page.locator('#release-play').click();await page.waitForFunction(()=>window.__plays.length===2,null,{timeout:15000});
   const plays=await page.evaluate(()=>window.__plays);for(const play of plays){assert.equal(play.rate,rate);assert.ok(play.src.includes('/audio/'+voice+'/'));assert.ok(play.src.endsWith('.mp3'));}
  }
  await page.evaluate(async()=>{BearLesson.pause();await BearOffline.ready;await BearOffline.download('breakfast');});
  await context.setOffline(true);await page.reload();
  const range=await page.evaluate(async()=>{
   const logical=BEAR_FOUNDATIONS.words.find(w=>w.text==='milk').audio+'.wav';
   const file=BearVoices.resolve(logical,'child').file,r=await fetch('audio/'+file,{headers:{Range:'bytes=0-99'}});
   return {status:r.status,type:r.headers.get('content-type'),bytes:(await r.arrayBuffer()).byteLength,verified:await BearOffline.verify('breakfast')};
  });
  assert.deepEqual(range,{status:206,type:'audio/mpeg',bytes:100,verified:true});
  await page.evaluate(()=>{const button=document.createElement('button');button.id='release-offline';button.textContent='播放';button.style.cssText='position:fixed;top:150px;left:20px;z-index:99999';document.body.append(button);window.__offlinePlayed=false;document.addEventListener('playing',()=>window.__offlinePlayed=true,true);button.onclick=()=>{const w=BEAR_FOUNDATIONS.words.find(w=>w.text==='milk');BearLesson.playFiles([{file:w.audio+'.wav',label:w.text}]);};});
  await page.locator('#release-offline').click();await page.waitForFunction(()=>window.__offlinePlayed);
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'release-browser.json'),JSON.stringify({passed:true,base,decoded:decoded.count,voices:['adult','child'],rates:[.5,.75,1],range,offlineReload:true},null,2));
  console.log('PASS production playback: both voices, English/Chinese, 3 rates, offline reload/package validation and MP3 Range MIME');
 }finally{await context.close();await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

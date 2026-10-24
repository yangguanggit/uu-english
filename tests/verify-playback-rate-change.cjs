// Actual two-tab settings synchronization must not truncate a slowed-down sentence.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{root,output}=require('./helpers/paths.cjs');
const row=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json'),'utf8')).find(r=>r.file==='catalog-beach-shade-7.wav');
assert.ok(row);
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),settings=await context.newPage(),errors=[];
 for(const p of [page,settings])p.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://localhost:8080/');
  await page.evaluate(()=>BearLearning.settings({voice:'child',speed:'normal',speedChosen:true}));
  await settings.goto('http://localhost:8080/');
  await settings.evaluate(()=>BearFeatures.openParents('profiles'));
  const nums=(await settings.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);
  await settings.locator('#parent-gate-answer').fill(String(nums[0]+nums[1]));
  await settings.locator('#parent-gate-form button[type=submit]').click();
  await settings.locator('[data-parent-open=playback]').click();
  await settings.locator('#playback-speed-button').waitFor();
  await page.evaluate(row=>{
   window.__ended=[];window.__complete=false;
   document.addEventListener('ended',e=>{if(e.target.id==='lesson-audio')window.__ended.push(new URL(e.target.currentSrc).pathname.split('/audio/').at(-1));},true);
   addEventListener('bear:audio-ended',()=>window.__complete=true);
   const button=document.createElement('button');button.id='rate-test-play';button.textContent='播放长句';button.style.cssText='position:fixed;top:150px;left:20px;z-index:99999';document.body.append(button);
   button.onclick=()=>BearLesson.playFiles([{file:row.file,label:row.text},{file:'foundation-word-milk.wav',label:'milk'}]);
  },row);
  await page.locator('#rate-test-play').click();
  await page.waitForFunction(()=>document.getElementById('lesson-audio')?.currentTime>.1);
  await settings.locator('#playback-speed-button').click();
  await settings.locator('.select-option[data-value="slow"]').click();
  await page.waitForFunction(()=>document.getElementById('lesson-audio')?.playbackRate===.5);
  await page.waitForFunction(()=>window.__complete||document.querySelector('#audio-status.error')?.textContent,null,{timeout:35000});
  const result=await page.evaluate(()=>({complete:window.__complete,ended:window.__ended,error:document.querySelector('#audio-status.error')?.textContent||''}));
  assert.equal(result.error,'','slowing down must not trigger the old timeout');
  assert.equal(result.complete,true,'the full queue must finish naturally');
  const pack=require('../scripts/voice-pack.cjs').readPacks().find(p=>p.id==='child');
  assert.deepEqual(result.ended,[pack.clips[row.file].file,pack.clips['foundation-word-milk.wav'].file]);
  assert.deepEqual(errors,[]);
  fs.writeFileSync(path.join(output,'playback-rate-change.json'),JSON.stringify({passed:true,crossTab:true,rates:[1,.5],naturalEnds:result.ended.length},null,2));
  console.log('PASS real two-tab fast→slow change: full long sentence and following word end naturally');
 }finally{await context.close();await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

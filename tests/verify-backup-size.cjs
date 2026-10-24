// Use the real download and restore UI with a valid UTF-8 backup larger than 5 MB.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']}),contexts=[];
 const errors=[];let bytes;
 async function open(){const c=await browser.newContext({serviceWorkers:'block',acceptDownloads:true});contexts.push(c);const p=await c.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:8080/');return p;}
 async function backupPage(p){await p.evaluate(()=>BearFeatures.openParents('profiles','backup'));const n=(await p.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);await p.locator('#parent-gate-answer').fill(String(n[0]+n[1]));await p.locator('#parent-gate-form button[type=submit]').click();await p.locator('[data-parent-open=backup]').click();}
 try{
  const source=await open();
  await source.evaluate(()=>{
   const s=structuredClone(BearLearning.get()),resources=[...BEAR_FOUNDATIONS.words.map(w=>({resource:w.id,page:null})),...LITTLE_BEAR_ROUTE.map(id=>({resource:'scene:'+id,page:null})),...BEAR_BOOKS.flatMap(b=>Array.from({length:3},(_,page)=>({resource:'book:'+b.id,page})))];
   s.growth.reviews=resources.flatMap(r=>BearContentReview.aspects.map(type=>({...r,type,status:'pending',note:'审'.repeat(300),time:Date.now(),revision:'00000000'}))).slice(0,5000);
   const key=BearProfiles.storageKey('bear-learning-v1');for(const k of Object.keys(localStorage))if(k===key||k.startsWith(key+':'))localStorage.removeItem(k);localStorage.setItem(key+':base',JSON.stringify(s));
  });
  await backupPage(source);
  const downloaded=source.waitForEvent('download');downloaded.catch(()=>{});await source.locator('#export-backup').click();
  const file=await downloaded,buffer=fs.readFileSync(await file.path());bytes=buffer.length;
  assert.ok(bytes>5e6,`fixture must reproduce old UI rejection: ${bytes}`);
  assert.equal(JSON.parse(buffer.toString()).children[0].learning.growth.reviews.length,5000);
  const target=await open();await backupPage(target);
  await target.locator('#import-backup').setInputFiles({name:'progress.json',mimeType:'application/json',buffer});
  await target.locator('#restore-preview').waitFor({state:'visible'});
  assert.match(await target.locator('#restore-description').innerText(),/恢复 1 个/);
  await target.locator('#confirm-restore').click();
  await target.waitForFunction(()=>BearProfiles.list().length===2);
  assert.equal(await target.evaluate(()=>BearProfiles.export().children.at(-1).learning.growth.reviews.length),5000);
  const limits=await target.evaluate(async ()=>{
   const max=BearProfiles.backupLimitBytes,result={};
   BearProfiles.checkBackupSize(max);result.boundary=true;
   try{BearProfiles.checkBackupSize(max+1);}catch(e){result.bytes=e.message;}
   try{BearProfiles.inspect('审'.repeat(Math.floor(max/3)+1));}catch(e){result.utf8=e.message;}
   const before=localStorage.getItem('bear-profiles-v1');try{await BearProfiles.import('{"invalid":true}');}catch{result.unchanged=before===localStorage.getItem('bear-profiles-v1');}
   return result;
  });
  assert.deepEqual(limits,{boundary:true,bytes:'备份文件超过 64 MiB',utf8:'备份文件超过 64 MiB',unchanged:true});
  // Reject oversized files before reading their contents, using the same shared limit.
  await target.evaluate(async()=>{
   window.backupWasRead=false;
   const input=document.getElementById('import-backup'),file={size:BearProfiles.backupLimitBytes+1,text:async()=>{window.backupWasRead=true;throw Error('must not read');}};
   await input.onchange({target:{files:[file],value:'oversize.json'}});
  });
  assert.equal(await target.evaluate(()=>window.backupWasRead),false);
  assert.match(await target.locator('#family-status').innerText(),/64 MiB/);
  assert.equal(await target.locator('#restore-preview').isVisible(),false);
  assert.deepEqual(errors,[]);
  console.log(`PASS backup: ${bytes} UTF-8 bytes downloaded and restored; shared 64 MiB limit, byte boundary and invalid-file protection`);
 }finally{for(const c of contexts)await c.close();await browser.close();fs.writeFileSync(path.join(output,'backup-size.json'),JSON.stringify({bytes,errors},null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});

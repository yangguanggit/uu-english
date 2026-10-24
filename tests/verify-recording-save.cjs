// Virtual microphone only: one completed recording produces at most one saved activity.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio','--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream']}),results=[];
 try{
  for(const kind of ['foundation','book']){
   const context=await browser.newContext({serviceWorkers:'block',permissions:['microphone'],viewport:{width:390,height:900}}),page=await context.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   try{
    await page.goto('http://localhost:8080/');
    await page.evaluate(kind=>{BearLearning.settings({readerMode:'independent'});if(kind==='book'){BearFeatures.open('books');BearFeatures.openBook('milk');}else{BearHub.show('foundation');BearFoundation.openUnit('word-cat');}},kind);
    const record=kind==='book'?'#book-record':'#foundation-record',save=kind==='book'?'#book-save':'#foundation-save-recording',audio=kind==='book'?'#book-recording':'#foundation-recording',id=kind==='book'?'book:milk':'word-cat';
    const counts=()=>page.evaluate(id=>({item:BearLearning.get().items[id]?.recorded||0,week:BearLearningTools.week().counts.recorded||0}),id);
    const forceSave=()=>page.evaluate(s=>{const b=document.querySelector(s);for(let i=0;i<3;i++)b.onclick();},save);
    async function start(){
     await page.locator(record).click();
     if(await page.locator('#allow-speech').isVisible())await page.locator('#allow-speech').click();
     await page.waitForFunction(s=>document.querySelector(s).textContent.includes('结束'),record);
    }
    async function finish(){await page.waitForTimeout(350);await page.locator(record).click();await page.locator(save).waitFor({state:'visible'});assert.equal(await page.locator(save).isEnabled(),true);}
    async function cleared(){
     assert.equal(await page.locator(save).isHidden(),true);
     assert.equal(await page.locator(audio).isHidden(),true);
     assert.equal(await page.locator(audio).getAttribute('src'),null);
    }
    // Hidden/disabled UI and direct handlers must both reject premature/repeated saves.
    await forceSave();assert.deepEqual(await counts(),{item:0,week:0});
    await start();await cleared();await forceSave();assert.deepEqual(await counts(),{item:0,week:0});await finish();
    await page.locator(save).click();assert.deepEqual(await counts(),{item:1,week:1});assert.equal(await page.locator(save).isDisabled(),true);
    await forceSave();assert.deepEqual(await counts(),{item:1,week:1});
    await start();await cleared();await forceSave();assert.deepEqual(await counts(),{item:1,week:1});await finish();await page.locator(save).click();
    await forceSave();assert.deepEqual(await counts(),{item:2,week:2});
    for(const width of [320,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:path.join(output,`recording-${kind}-${width}.png`),fullPage:true});}
    // Listening to the lesson cancels a pending recording and clears the revoked Blob URL.
    await start();await finish();await page.locator(kind==='book'?'#book-listen':'#foundation-listen').click();await cleared();await forceSave();assert.deepEqual(await counts(),{item:2,week:2});
    // A denied retry cannot reuse the previous completed, unsaved recording.
    await start();await finish();
    await page.evaluate(()=>{window.__originalGetUserMedia=navigator.mediaDevices.getUserMedia;navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('Test denied','NotAllowedError');};});
    await page.locator(record).click();await page.waitForFunction(s=>document.querySelector(s).textContent.includes('未获得麦克风权限'),kind==='book'?'#book-mic-status':'#foundation-mic-status');await cleared();await forceSave();assert.deepEqual(await counts(),{item:2,week:2});
    await page.evaluate(()=>{navigator.mediaDevices.getUserMedia=window.__originalGetUserMedia;});
    await start();await finish();
    if(kind==='book')await page.locator('#book-next').click();else{if(await page.locator('#foundation-library-open').isVisible())await page.locator('#foundation-library-open').click();await page.locator('[data-unit="word-dog"]').click();}
    await cleared();await forceSave();assert.deepEqual(await counts(),{item:2,week:2});
    await page.reload();assert.deepEqual(await counts(),{item:2,week:2});
    await page.evaluate(()=>BearProfiles.inspect(JSON.stringify(BearProfiles.export())));
    assert.deepEqual(errors,[]);results.push({kind,passed:true,recordings:2,widths:[320,768,1440]});console.log('PASS '+kind+': repeat save, new take, cancellation, denied retry, navigation, reload and backup');
   }finally{await context.close();}
  }
 }finally{await browser.close();fs.writeFileSync(path.join(output,'recording-save-results.json'),JSON.stringify(results,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});

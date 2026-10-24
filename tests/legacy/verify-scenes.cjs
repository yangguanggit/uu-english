const {output:verificationOutput}=require('../helpers/paths.cjs');
// Real local audio and fake microphone input. No physical-device/child-speech assertion.
const { chromium } = require('../helpers/browser.cjs');
const assert = require('node:assert/strict');
const path = require('node:path');
(async () => {
 const browser = await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio','--use-fake-device-for-media-stream']});
 const errors=[];
 try {
  const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce',permissions:['microphone']});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.SpeechRecognition=class{constructor(){window.testRecognition=this;} start(){this.onstart?.();} abort(){} };});
  await page.goto('http://localhost:8080/?lesson=breakfast&v=1.0.0');
  assert.equal(await page.locator('#scene-switcher button').count(),5);
  const ids=['breakfast','park','wardrobe','toys','animals'];
  const targets=['milk','bird','red-hat','ball','rabbit'];
  for(let i=0;i<ids.length;i++){
   const id=ids[i];await page.evaluate(id=>BearLesson.open(id),id);
   assert.equal(await page.locator('#progress-count').innerText(),'0/3');
   const other=await page.locator('#food-grid button').evaluateAll((els,target)=>els.find(el=>el.dataset.food!==target).dataset.food,targets[i]);
   await page.locator(`#food-grid [data-food="${other}"]`).click();
   assert.equal(await page.locator('#continue-button').isVisible(),false);
   await page.locator('#listen-button').click();
   await page.waitForFunction(()=>document.querySelector('#lesson-audio')?.currentTime>0.05);
   const src=await page.locator('#lesson-audio').getAttribute('src');
   if(i) assert.equal(src.includes('find-milk'),false);
   await page.locator(`#food-grid [data-food="${targets[i]}"]`).click();
   await page.locator('#continue-button').click();
   const phrase=await page.locator('.phrase-card > strong').innerText();
   await page.locator('#slow-speak').click();
   await page.waitForFunction(()=>document.querySelector('#lesson-audio')?.currentTime>0.05);
   assert.match(await page.locator('#lesson-audio').getAttribute('src'),/-slow.wav/);
   if(id==='park'){
    await page.locator('#record-button').click();await page.locator('#allow-speech').click();
    await page.waitForFunction(()=>document.querySelector('#record-button').dataset.state==='listening');
    await page.evaluate(()=>window.testRecognition.onresult({results:[[{transcript:'Milk please'}]]}));
    assert.equal(await page.locator('#progress-count').innerText(),'1/3');
    await page.evaluate(()=>window.testRecognition.onresult({results:[[{transcript:'Under the tree'}]]}));
    await page.waitForFunction(()=>document.querySelector('#progress-count').textContent==='2/3');
   }else await page.locator('#practice-button').click();
   await page.locator('#continue-button').click();
   if(id==='breakfast')await page.locator('[data-food="apple"]').click();
   if(id==='park'){
    await page.locator('[data-spot="bench"]').click();assert.equal(await page.locator('#continue-button').isVisible(),false);
    await page.screenshot({path:path.join(verificationOutput,'park-preview.png'),fullPage:true});
    await page.locator('[data-spot="tree"]').click();assert.equal(await page.locator('#treasure').getAttribute('visibility'),'visible');
   }
   if(id==='wardrobe'||id==='animals'){
    const wrong=id==='wardrobe'?'coat':'milk';const first=id==='wardrobe'?'red-hat':'carrot';const second=id==='wardrobe'?'shoes':'banana';
    await page.locator(`[data-food="${wrong}"]`).click();assert.equal(await page.locator('#continue-button').isVisible(),false);
    await page.locator(`[data-food="${first}"]`).click();assert.equal(await page.locator('#continue-button').isVisible(),false);
    await page.evaluate(()=>BearLesson.open('breakfast'));
    await page.evaluate(id=>BearLesson.open(id),id);
    assert.equal(await page.locator('#progress-count').innerText(),'2/3');
    assert.match(await page.locator('#bubble-english').innerText(),id==='wardrobe'?/shoes/:/banana/);
    await page.locator(`[data-food="${second}"]`).click();
   }
   if(id==='toys'){
    await page.locator('[data-food="ball"]').click();await page.locator('[data-bin="blue"]').click();
    assert.equal(await page.locator('#continue-button').isVisible(),false);
    await page.locator('[data-bin="red"]').click();assert.equal(await page.locator('#sorted-ball').getAttribute('visibility'),'visible');
    await page.locator('[data-food="car"]').dragTo(page.locator('[data-bin="blue"]'));
    assert.equal(await page.locator('#sorted-car').getAttribute('visibility'),'visible');
   }
   assert.equal(await page.locator('#continue-button').isVisible(),true);
   if(i>1)await page.screenshot({path:path.join(verificationOutput,`${id}-preview.png`),fullPage:true});
   await page.locator('#continue-button').click();
   await page.locator('#info-dialog').waitFor({state:'visible'});
   assert.match(await page.locator('#dialog-content').innerText(),new RegExp(phrase.replace(/[.?]/g,'')));
   const records=await page.evaluate(()=>JSON.parse(localStorage.getItem('little-bear-breakfast-v1')));
   assert.equal(records.length,i+1);assert.equal(records.at(-1).sceneId,id);
   assert.equal(records.at(-1).speech,id==='park'?'recognized':'practiced');
   await page.locator('#finish-close').click();
   assert.match(await page.locator(`#scene-switcher [data-scene-button="${id}"]`).innerText(),/3\/3/);
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:844});
   for(const id of ids){
    await page.evaluate(id=>BearLesson.open(id),id);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${id} overflow ${width}`);
    if(width===390)await page.screenshot({path:path.join(verificationOutput,`${id}-mobile-preview.png`),fullPage:true});
   }
  }
  await page.reload();await page.locator('.desktop-nav [data-nav="growth"]').click();
  assert.match(await page.locator('#dialog-content').innerText(),/5 次小冒险/);
  assert.equal(await page.locator('.growth-scenes strong').evaluateAll(els=>els.filter(el=>el.textContent==='1 次').length===5 && els.filter(el=>el.textContent==='0 次').length===90),true);
  await page.locator('#close-dialog').click();
  await page.evaluate(()=>BearLesson.open('animals'));
  await page.locator('#parent-button').click();await page.locator('#parent-demo').click();
  await page.waitForFunction(()=>document.querySelector('#lesson-audio')?.currentTime>0.05);
  assert.match(await page.locator('#lesson-audio').getAttribute('src'),/animals-parent/);
  assert.deepEqual(errors,[]);
  console.log('PASS: all 5 scenes complete, wrong choices blocked, hotspot treasure, sequential tasks/resume, tap and native drag sorting, scene-specific normal/slow/parent audio, genuine microphone capture with scene-specific mocked recognition, per-scene history, 25 responsive overflow checks. Output muted.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

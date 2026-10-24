// Isolated browser profiles and virtual time; never change actual child data.
const assert=require('node:assert/strict');
const {chromium}=require('./helpers/browser.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});try{
 for(const width of [390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:950},serviceWorkers:'block'}),page=await context.newPage();
  try{
   await page.clock.install();await page.goto('http://localhost:8080/');
   await page.evaluate(()=>{BearHub.show('foundation');BearLearning.settings({restMinutes:5});document.dispatchEvent(new Event('pointerdown'));});
   const seconds=()=>page.evaluate(()=>BearLearning.get().growth.sessions[BearLearning.today()]?.seconds||0);
   await page.clock.runFor(20000);const first=await seconds();assert.ok(first>=15,`${width}: foundation time`);
   await page.evaluate(()=>{const d=document.createElement('dialog');d.id='test-blocking-dialog';document.body.append(d);d.showModal();});
   await page.clock.runFor(20000);assert.equal(await seconds(),first,`${width}: modal pauses time`);
   await page.evaluate(()=>{document.getElementById('test-blocking-dialog').remove();BearLearning.settings({readerMode:'independent'});BearFeatures.openBooks();BearFeatures.openBook(BEAR_BOOKS[0].id);document.dispatchEvent(new Event('pointerdown'));});
   await page.clock.runFor(20000);const after=await seconds();assert.ok(after>=first+15,`${width}: reading counts despite hidden library`);
   await page.evaluate(()=>BearLearning.growth('growthSession',{seconds:300}));assert.equal(await page.locator('#learning-rest').count(),0);
   await page.evaluate(()=>BearGrowth.boundary());assert.equal(await page.locator('#learning-rest').evaluate(d=>d.matches(':modal')),true);
   await page.evaluate(()=>BearGrowth.boundary());assert.equal(await page.locator('#learning-rest').count(),1);
   await page.locator('#rest-later').click();assert.equal(await page.locator('#learning-rest').count(),0);
   console.log(`PASS ${width}px: foundation/reading time, modal pause, hidden nonmodal library, boundary-only rest and no duplicate reminder`);
  }finally{await context.close();}
 }
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1});

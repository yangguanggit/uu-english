// Offline readiness must wait for the replacement worker, even with an old controller.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
(async()=>{
  let changed,finishUpdate,settled=false;
  const worker={state:'installing',addEventListener(name,fn){changed=fn;},removeEventListener(){}};
  const registration={active:{state:'activated'},installing:worker,update:()=>new Promise(resolve=>finishUpdate=resolve)};
  const context={location:{origin:'https://example.test'},isSecureContext:true,setTimeout,clearTimeout,
    navigator:{serviceWorker:{register:async()=>registration,ready:Promise.resolve(),controller:{}}},window:{}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../src/shared/storage/offline.js'),'utf8'),context);
  const ready=context.window.BearOffline.ready.then(()=>settled=true);
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(settled,false,'an existing controller must not bypass the update check');
  finishUpdate();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(settled,false,'an installing worker must finish activation');
  worker.state='activated';changed();await ready;
  assert.equal(settled,true);
  console.log('PASS offline readiness waits for replacement worker activation');
})().catch(error=>{console.error(error);process.exitCode=1;});

// Exercise the real build/generator in a disposable miniature project.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawnSync}=require('node:child_process'),{root}=require('./helpers/paths.cjs');
const fixture=fs.mkdtempSync(path.join(os.tmpdir(),'english-build-security-'));
const put=(file,text)=>{const p=path.join(fixture,file);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,text);};
const run=()=>spawnSync(process.execPath,['scripts/build.cjs'],{cwd:fixture,encoding:'utf8'});
try{
 for(const file of ['build.cjs','generate-offline.cjs','runtime-files.cjs','audio-layout.cjs'])put('scripts/'+file,fs.readFileSync(path.join(root,'scripts',file)));
 // Audio registry semantics are covered separately; this fixture tests packaging boundaries.
 put('scripts/voice-pack.cjs','exports.validateRegistry=()=>[];');
 put('package.json','{"version":"1.0.0"}');put('index.html','<meta name="app-revision" content=""><script src="src/main.js?v=1.0.0"></script>');
 for(const file of ['sw.js','src/main.js','docs/WORD-IPA-CREDITS.txt','docs/PHONICS-CREDITS.md','audio/metadata/CHILD-VOICE-CREDITS.txt','audio/metadata/PHONEME-CREDITS.txt'])put(file,'fixture');
 put('audio/adult/scenes/valid.wav','fixture-audio');put('audio/internal-notes.txt','non-sensitive canary');put('audio/nested/private.txt','canary');
 let result=run();assert.equal(result.status,0,result.stderr);
 assert.equal(fs.readFileSync(path.join(fixture,'dist/audio/adult/scenes/valid.wav'),'utf8'),'fixture-audio');
 for(const file of ['audio/internal-notes.txt','audio/nested'])assert.equal(fs.existsSync(path.join(fixture,'dist',file)),false);
 assert.ok(fs.existsSync(path.join(fixture,'dist/audio/metadata/PHONEME-CREDITS.txt')));
 const marker=fs.readFileSync(path.join(fixture,'dist/.build.json'));
 const tree=dir=>Object.fromEntries(fs.readdirSync(dir,{recursive:true}).filter(f=>fs.statSync(path.join(dir,f)).isFile()).map(f=>[f,fs.readFileSync(path.join(dir,f)).toString('hex')]));
 const originalRelease=tree(path.join(fixture,'dist'));
 put('fail-publish.cjs',`const fs=require('fs'),path=require('path'),rename=fs.renameSync;fs.renameSync=function(a,b){const mode=process.env.UU_FAIL_STAGE,save=a===path.join(__dirname,'dist'),publish=b===path.join(__dirname,'dist')&&!a.endsWith('-previous'),restore=b===path.join(__dirname,'dist')&&a.endsWith('-previous');if(mode==='save'&&save||mode==='publish'&&publish||mode==='restore'&&(publish||restore))throw Error('injected '+mode+' failure');return rename(a,b);};`);
 for(const mode of ['save','publish','restore']){
  result=spawnSync(process.execPath,['-r','./fail-publish.cjs','scripts/build.cjs'],{cwd:fixture,encoding:'utf8',env:{...process.env,UU_FAIL_STAGE:mode}});
  assert.notEqual(result.status,0);assert.match(result.stderr,/injected/);
  if(mode==='restore'){
   const backups=fs.readdirSync(fixture).filter(f=>f.startsWith('.dist-build-')&&f.endsWith('-previous'));
   assert.equal(backups.length,1,'failed restore must keep the previous release recoverable');
   assert.deepEqual(tree(path.join(fixture,backups[0])),originalRelease);
   fs.renameSync(path.join(fixture,backups[0]),path.join(fixture,'dist'));
  }
  assert.deepEqual(tree(path.join(fixture,'dist')),originalRelease,'publication failure must preserve all prior release bytes');
  assert.equal(fs.readdirSync(fixture).filter(f=>f.startsWith('.dist-build-')).length,0);
 }
 result=run();assert.equal(result.status,0,result.stderr);assert.equal(fs.readdirSync(fixture).filter(f=>f.startsWith('.dist-build-')).length,0,'successful publication removes its backup');
 // Source ownership/modes and a private umask must not leak into public output.
 put('restrictive-umask.cjs','process.umask(0o077);');
 fs.chmodSync(path.join(fixture,'src/main.js'),0o600);
 result=spawnSync(process.execPath,['-r','./restrictive-umask.cjs','scripts/build.cjs'],{cwd:fixture,encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);
 const release=path.join(fixture,'dist');
 for(const file of ['',...fs.readdirSync(release,{recursive:true})]){
  const stat=fs.statSync(path.join(release,file));
  assert.equal(stat.mode&0o777,stat.isDirectory()?0o755:0o644,'public release permissions: '+file);
 }
 assert.equal(fs.statSync(path.join(fixture,'src/main.js')).mode&0o777,0o600,'source permissions unchanged');
 put('fail-chmod.cjs',"require('fs').chmodSync=()=>{throw Error('injected permission failure');};");
 result=spawnSync(process.execPath,['-r','./fail-chmod.cjs','scripts/build.cjs'],{cwd:fixture,encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/injected permission/);
 assert.deepEqual(tree(release),originalRelease,'permission failure must preserve the prior release');
 assert.equal(fs.readdirSync(fixture).filter(f=>f.startsWith('.dist-build-')).length,0);
 // Writable generator outputs must not follow links, even when the target
 // contents look valid. Test both the standalone generator and the build.
 const outside=path.join(fixture,'outside');fs.mkdirSync(outside);
 for(const file of ['index.html','offline-assets.json'])for(const dangling of [false,true]){
  const original=fs.readFileSync(path.join(fixture,file)),target=path.join(outside,file);
  if(!dangling)fs.writeFileSync(target,original);else if(fs.existsSync(target))fs.unlinkSync(target);
  fs.unlinkSync(path.join(fixture,file));fs.symlinkSync(target,path.join(fixture,file));
  for(const command of ['scripts/generate-offline.cjs','scripts/build.cjs']){
   result=spawnSync(process.execPath,[command],{cwd:fixture,encoding:'utf8'});
   assert.notEqual(result.status,0,command+' must reject linked '+file);assert.match(result.stderr,/without links/);
   if(dangling)assert.equal(fs.existsSync(target),false);else assert.deepEqual(fs.readFileSync(target),original);
   assert.deepEqual(fs.readFileSync(path.join(fixture,'dist/.build.json')),marker);
  }
  fs.unlinkSync(path.join(fixture,file));fs.writeFileSync(path.join(fixture,file),original);
 }
 // An arbitrary marker must never authorize recursive removal of user files.
 fs.writeFileSync(path.join(fixture,'dist/.build.json'),'{}');
 put('dist/keep.txt','user data');result=run();assert.notEqual(result.status,0);assert.match(result.stderr,/recognized build marker/);assert.equal(fs.readFileSync(path.join(fixture,'dist/keep.txt'),'utf8'),'user data');
 fs.writeFileSync(path.join(fixture,'dist/.build.json'),marker);fs.unlinkSync(path.join(fixture,'dist/keep.txt'));
 for(const name of ['linked-notes.txt','linked-media.wav','adult/scenes/linked-media.wav']){
  fs.symlinkSync(path.join(fixture,'audio/internal-notes.txt'),path.join(fixture,'audio',name));result=run();assert.notEqual(result.status,0);assert.match(result.stderr,/links are not allowed/);assert.deepEqual(fs.readFileSync(path.join(fixture,'dist/.build.json')),marker);fs.unlinkSync(path.join(fixture,'audio',name));
 }
 fs.renameSync(path.join(fixture,'audio'),path.join(fixture,'source-audio'));fs.symlinkSync(path.join(fixture,'source-audio'),path.join(fixture,'audio'),'dir');result=run();assert.notEqual(result.status,0);assert.match(result.stderr,/must not be a link|without links/);fs.unlinkSync(path.join(fixture,'audio'));fs.renameSync(path.join(fixture,'source-audio'),path.join(fixture,'audio'));
 fs.renameSync(path.join(fixture,'src'),path.join(fixture,'source-src'));fs.symlinkSync(path.join(fixture,'source-src'),path.join(fixture,'src'),'dir');result=run();assert.notEqual(result.status,0);assert.match(result.stderr,/without links/);assert.deepEqual(fs.readFileSync(path.join(fixture,'dist/.build.json')),marker);
 console.log('PASS actual build excludes unlisted files, retains media/credits, rejects linked inputs/outputs and unowned dist, preserving outside files and prior releases');
}finally{fs.rmSync(fixture,{recursive:true,force:true});}

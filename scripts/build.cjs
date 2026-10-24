// Produce a deployment directory from the exact runtime dependencies in index.html.
const fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist');
if(process.argv.length>2)throw Error('Usage: node scripts/build.cjs (audio is already encoded)');
const {regularFile,audioFiles}=require('./runtime-files.cjs');
// Validate ownership before generating files or touching an existing release.
try{
 const stat=fs.lstatSync(dist);
 if(stat.isSymbolicLink()||!stat.isDirectory())throw Error('dist must be a directory without links');
 const marker=JSON.parse(fs.readFileSync(regularFile(root,'dist/.build.json'),'utf8'));
 if(marker.generatedBy!=='scripts/build.cjs')throw Error('dist has no recognized build marker');
}catch(error){if(error.code!=='ENOENT')throw error;else if(fs.existsSync(dist))throw Error('dist exists without a build marker; move it aside before building');}
for(const file of ['sw.js','docs/WORD-IPA-CREDITS.txt','docs/PHONICS-CREDITS.md','audio/metadata/CHILD-VOICE-CREDITS.txt','audio/metadata/PHONEME-CREDITS.txt'])regularFile(root,file);
audioFiles(root);
require('./voice-pack.cjs').validateRegistry();
execFileSync(process.execPath,[path.join(__dirname,'generate-offline.cjs')],{stdio:'inherit'});
const manifest=JSON.parse(fs.readFileSync(path.join(root,'offline-assets.json'),'utf8'));
const files=new Set(['index.html','sw.js','offline-assets.json','docs/WORD-IPA-CREDITS.txt','docs/PHONICS-CREDITS.md',...manifest.shell.filter(f=>f!=='./').map(f=>f.split('?')[0])]);
for(const file of Object.keys(manifest.audio))files.add('audio/'+file);
// Ship attribution, but not source manifests, notes or unrelated files.
for(const file of ['audio/metadata/CHILD-VOICE-CREDITS.txt','audio/metadata/PHONEME-CREDITS.txt'])files.add(file);
for(const file of files)regularFile(root,file);
const staging=fs.mkdtempSync(path.join(root,'.dist-build-'));
let saved=false;
try{
  for(const file of files){const target=path.join(staging,file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(regularFile(root,file),target);}
  fs.writeFileSync(path.join(staging,'.build.json'),JSON.stringify({build:manifest.build,generatedBy:'scripts/build.cjs',runtimeFiles:[...files].filter(file=>!file.startsWith('audio/')).length,audioFiles:Object.keys(manifest.audio).length,audioEncoding:'pre-encoded'},null,2)+'\n');
  // A different Nginx UID must be able to traverse/read the public release,
  // even when the build user has a restrictive umask or source file modes.
  function publicModes(directory){
    for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
      const target=path.join(directory,entry.name);
      if(entry.isDirectory())publicModes(target);else fs.chmodSync(target,0o644);
    }
    fs.chmodSync(directory,0o755);
  }
  publicModes(staging);
  // Keep the previous release until publication succeeds; never delete it first.
  // Its temporary home is outside staging, which is renamed into dist below.
  const backup=staging+'-previous';
  if(fs.existsSync(dist)){fs.renameSync(dist,backup);saved=true;}
  try{fs.renameSync(staging,dist);}
  catch(error){
    if(saved){try{fs.renameSync(backup,dist);saved=false;}catch(restore){throw new AggregateError([error,restore],'Publication failed; previous release preserved at '+backup);}}
    throw error;
  }
  if(saved){fs.rmSync(backup,{recursive:true});saved=false;}
  console.log(`Deployment ready: ${dist} (${manifest.build})`);
}finally{if(fs.existsSync(staging))fs.rmSync(staging,{recursive:true});}

// Rebuild after changing shell assets or audio. No third-party dependencies.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
function generate(root,version=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version){
const {regularFile,audioFiles}=require('./runtime-files.cjs');
const html=fs.readFileSync(regularFile(root,'index.html'),'utf8');
// Both outputs are writable only as regular project files. lstat also catches
// dangling links, which existsSync would mistake for a missing output.
try{fs.lstatSync(path.join(root,'offline-assets.json'));regularFile(root,'offline-assets.json');}catch(error){if(error.code!=='ENOENT')throw error;}
const shell=['./','offline-assets.json',...Array.from(html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css)(?:\?[^"<>]*)?)"/g),m=>m[1])];
if(!/^\d+\.\d+\.\d+$/.test(version))throw Error('package.json must use a semantic version');
for(const ref of shell.slice(2)){
 if(new URL(ref,'https://build.invalid/').searchParams.get('v')!==version)throw Error('Runtime resource version does not match package.json: '+ref);
 regularFile(root,ref.split('?')[0]);
}
const audio=Object.fromEntries(audioFiles(root).map(f=>[f,fs.statSync(regularFile(root,'audio/'+f)).size]));
const hashes=Object.fromEntries(Object.keys(audio).map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'audio',f))).digest('hex')]));
const revisionFiles=shell.filter(f=>f!=='offline-assets.json').map(f=>[f,fs.readFileSync(path.join(root,f==='./'?'index.html':f.split('?')[0]),'utf8').replace(/<meta name="app-revision" content="[^"]*">/,'')]);
const revision=crypto.createHash('sha256').update(JSON.stringify(revisionFiles)).update(JSON.stringify(hashes)).digest('hex');
const indexPath=path.join(root,'index.html'),source=fs.readFileSync(indexPath,'utf8');
fs.writeFileSync(indexPath,source.replace(/<meta name="app-revision" content="[^"]*">/,`<meta name="app-revision" content="${revision}">`));
const shellHashes=Object.fromEntries(shell.filter(f=>f!=='offline-assets.json').map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f==='./'?'index.html':f.split('?')[0]))).digest('hex')]));
fs.writeFileSync(path.join(root,'offline-assets.json'),JSON.stringify({build:version,revision,shellHashes,shell,audio,hashes}));
console.log(`${shell.length} shell files; ${Object.keys(audio).length} audio assets`);
return {build:version,revision,shellHashes,shell,audio,hashes};
}
module.exports=generate;
if(require.main===module)generate(path.resolve(__dirname,'..'));

const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {root}=require('./helpers/paths.cjs');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const references=[...html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css)(?:\?[^"<>]*)?)"/g)].map(m=>m[1]);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'offline-assets.json'),'utf8'));
const content={};content.window=content;vm.createContext(content);
for(const file of ['data/themes/learning-themes.js','data/reading/books-data.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),content);
for(const theme of content.BEAR_LEARNING_THEMES){
 assert.doesNotMatch(theme.title,/^[的和]/,'Incomplete theme title: '+theme.id);
 const book=content.BEAR_BOOKS.find(book=>book.id===theme.book);
 if(book?.title.startsWith('UU ')&&/^[的和]/.test(book.title.slice(3))&&book.title.slice(3)===theme.title.replace(/^UU /,''))assert.equal(theme.title,book.title,'Keep the role name in linked theme titles');
}
assert.deepEqual(manifest.shell,['./','offline-assets.json',...references]);
const {version}=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
assert.match(version,/^\d+\.\d+\.\d+$/);
assert.equal(manifest.build,version);
for(const ref of references)assert.equal(new URL(ref,'https://test.invalid/').searchParams.get('v'),version,ref);
for(const file of ['sw.js','src/shared/storage/offline.js','scripts/serve.py']){const source=fs.readFileSync(path.join(root,file),'utf8');assert.equal(source.match(/BUILD\s*=\s*['"]([^'"]+)['"]/)[1],version,file);}
assert.ok(html.includes('UU说英语'));
assert.ok(!html.includes('小熊开口说'));
assert.ok(!html.includes('宝贝开口说'));
assert.ok(html.includes('UU ENGLISH'));
assert.ok(html.includes('class="build-label">'+version));
for(const ref of references){const file=ref.split('?')[0];assert.ok(fs.statSync(path.join(root,file)).isFile(),ref);if(file.endsWith('.js'))new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});}
assert.ok(references.findIndex(p=>p.includes('parent/space.js'))<references.findIndex(p=>p.includes('child/app.js')));
assert.match(fs.readFileSync(path.join(root,'src/shared/storage/offline.js'),'utf8'),/register\('sw.js',\{scope:'\.\/'\}\)/);
assert.equal(fs.existsSync(path.join(root,'app.js')),false,'Old flat entry must not shadow moved modules');
const dist=path.join(root,'dist');
if(fs.existsSync(dist)){
  for(const name of ['index.html','sw.js','offline-assets.json',...references.map(f=>f.split('?')[0])])assert.deepEqual(fs.readFileSync(path.join(dist,name)),fs.readFileSync(path.join(root,name)),name);
  for(const name of ['tests','scripts','README.md','.diagnostics','server.log','docs/CHANGELOG.md'])assert.equal(fs.existsSync(path.join(dist,name)),false,name);
  const release=JSON.parse(fs.readFileSync(path.join(dist,'offline-assets.json')));
  assert.deepEqual(release.shell,manifest.shell);assert.equal(release.build,version);
  for(const [file,bytes] of Object.entries(release.audio))assert.equal(fs.statSync(path.join(dist,'audio',file)).size,bytes,file);
  require('./verify-release.cjs');
}
console.log(`PASS ${references.length} runtime references, module order, root worker scope${fs.existsSync(dist)?', deployment contents and '+Object.keys(manifest.audio).length+' audio assets':''}`);

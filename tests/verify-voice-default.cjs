// Settings migration uses the event journal to distinguish old defaults from choices.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const storageSource=name=>fs.readFileSync(require('node:path').join(__dirname,'../src/shared/storage',name+'.js'),'utf8');
const source=storageSource('learning-state'),profiles=storageSource('profiles');
function load(saved,events=[]){
 const key='bear-child:test:bear-learning-v1',store=new Map();
 store.set('bear-profiles-v1',JSON.stringify({version:1,active:'test',children:[{id:'test',name:'测试档案'}]}));
 if(saved)store.set(key,JSON.stringify(saved));
 for(const e of events)store.set(key+':op:'+e.id,JSON.stringify(e));
 const storage={get length(){return store.size;},key:i=>[...store.keys()][i],getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)};
 // Match the browser Storage object's enumerable data keys, not mock method names.
 const localStorage=new Proxy(storage,{ownKeys:()=>[...store.keys()],getOwnPropertyDescriptor:(target,key)=>store.has(key)?{value:store.get(key),enumerable:true,configurable:true}:Reflect.getOwnPropertyDescriptor(target,key)});
 const window={BEAR_FOUNDATIONS:{letters:[],phonemes:[],words:[]},addEventListener(){},dispatchEvent(){}};
 const context={window,localStorage,document:{body:{dataset:{},classList:{toggle(){}}}},structuredClone,CustomEvent:class{}};
 // Use the real profiles seam so changes to storage helpers cannot stale a mock.
 vm.runInNewContext(profiles,context);
 vm.runInNewContext(source,context);
 assert.equal(window.BearLearning.persistent(),true,'snapshot loading must not fail silently');
 return window.BearLearning;
}
const old={version:1,foundation:{},settings:{voice:'adult',speed:'medium'}};
assert.equal(load().get().settings.voice,'child','fresh profile defaults to child');
assert.equal(load(old).get().settings.voice,'child','untouched old adult default migrates');
const event={id:'0001760000000000-choice',action:'settings',args:{change:{voice:'adult'}},now:1760000000000,date:'2025-10-09'};
const selected=load(old,[event]);
assert.equal(selected.get().settings.voice,'adult','old journal choice is preserved');
assert.equal(selected.get().settings.voiceChosen,true);
assert.equal(load({...old,settings:{...old.settings,voiceChosen:true}}).get().settings.voice,'adult');
const learning=load();learning.settings({voice:'adult'});
assert.equal(learning.get().settings.voiceChosen,true);
assert.equal(learning.get().settings.voice,'adult');
learning.settings({speed:'slow',speedChosen:true});
assert.equal(learning.get().settings.voice,'adult','unrelated settings do not reset voice');
assert.equal(load({...old,settings:{...old.settings,voice:'future-voice'}}).get().settings.voice,'future-voice');
console.log('PASS child default, old default migration, explicit adult and future voice preservation');

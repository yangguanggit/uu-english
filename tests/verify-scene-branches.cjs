// Static content and audio closure for every authored path. No browser child records are read.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {root}=require('./helpers/paths.cjs');
const c={BearLearning:{get:()=>({growth:{}})}};c.window=c;vm.createContext(c);
for(const file of ['data/scenes/content-extra.js','data/scenes/scenes.js','data/scenes/scenes-extra.js','src/child/modules/scenes/catalog.js','data/foundation/foundation-data.js','data/scenes/reply-variants.js','data/scenes/branch-dialogues.js','data/scenes/reply-audio.js','src/shared/learning/growth.js','src/shared/learning/progression.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);
const G=c.BearGrowth,manifest=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json'))),rows=new Map(manifest.map(row=>[row.file,row])),packs=require('../scripts/voice-pack.cjs').validateRegistry(),child=packs.find(p=>p.id==='child');
const distinct=xs=>new Set(xs.map(G.normalize)).size;
assert.equal(c.LITTLE_BEAR_ROUTE.length,250);assert.equal(Object.keys(G.branches).length,250);
const utterances=new Set(),texts=new Set();let paths=0,turns=0;
for(const id of c.LITTLE_BEAR_ROUTE){
 const s=c.LITTLE_BEAR_SCENES[id],b=G.branches[id];assert.equal(b.paths.length,2,id);assert.equal(new Set(b.paths.map(p=>p.result)).size,2,id+' distinct consequences');
 assert.ok(b.question&&b.zh,id+' question');
 for(const text of [s.speech.en,...s.dialogue.map(t=>t.answer)]){utterances.add(text);assert.ok(distinct(G.replies(text))>=2,id+' missing original equivalent '+text);}
 for(const p of b.paths){
  const first=G.dialogue(s,{replyHistory:[],dialogueIndex:0})[0];
  for(const choice of G.replies(p.pick)){
   assert.ok(first.accepted.includes(choice),id+' first turn accepts '+choice);
   const state={replyHistory:[choice],dialogueIndex:1},resolved=G.dialogue(s,state);assert.equal(resolved.length,3,id);
   assert.equal(resolved[1].npc,p.npc,id+' equivalent must select intended path');assert.equal(G.outcome(s,state),p.result,id);
   assert.equal(G.replyMeaning(s,{...state,dialogueIndex:0,selectedReply:choice}),p.zh,id+' choice meaning');
   assert.equal(resolved[2].npc,p.end,id+' final partner line');
  }
  for(const t of G.dialogue(s,{replyHistory:[p.pick]})){
   assert.ok(t.npc&&t.npcZh&&t.answer&&t.zh,id+' complete bilingual exchange');assert.ok(distinct(t.accepted)>=2,id+' missing turn equivalent');assert.ok(t.accepted.includes(t.answer),id);turns++;
  }paths++;
 }
 const files=new Set(G.sceneFiles(id));
 for(const text of G.sceneTexts(id)){
  texts.add(text);const stem=c.BEAR_EXTRA_AUDIO[text];assert.ok(stem,id+' missing exact text '+text);const logical=stem+'.wav';
  assert.ok(files.has(logical),id+' offline missing '+text);assert.ok(rows.has(logical),id+' missing adult manifest '+text);
  assert.equal(rows.get(logical).text,text,id+' text/audio mismatch');
  for(const file of [rows.get(logical)?.asset,child.clips[logical]?.file])assert.ok(file&&fs.statSync(path.join(root,'audio',file)).size>44,id+' missing audio '+text);
 }
}
assert.equal(paths,500);assert.equal(turns,1500);
console.log(`PASS 250 scenes, ${paths} semantic paths, ${turns} exchanges, ${utterances.size} original utterances with alternatives, ${texts.size} exact texts in both voices and offline lists`);

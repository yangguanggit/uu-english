/* Shared learning evidence, bounded replies and backup validation. No speech transcripts. */
(() => {
  'use strict';
  const L=BearLearning,D=BEAR_FOUNDATIONS;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=text=>String(text).toLowerCase().replace(/[’]/g,"'").replace(/\bit's\b/g,'it is').replace(/\bi'm\b/g,'i am').replace(/\blet's\b/g,'let us').replace(/\bthat's\b/g,'that is').replace(/[^a-z0-9]+/g,' ').trim();
  function replies(phrase){
    const variants=[phrase,...(BEAR_REPLY_VARIANTS.utterances?.[phrase]||[])],text=phrase.replace(/[.!?]+$/,'');
    // Authored request variants preserve the intended object, quantity and action.
    const requestObjects=BEAR_REPLY_VARIANTS.requests;
    const polite=/^(.+), please$/i.exec(text),noun=polite?.[1].toLowerCase().replace(/^yes[.,] /,'');
    if(noun&&requestObjects[noun])variants.push(`Can I have ${requestObjects[noun]}, please?`);
    if(noun==='help me')variants.push('Can you help me, please?');
    if(noun==='badminton')variants.push('I would like to play badminton.');
    if(noun==='the big wheel')variants.push('I would like to ride the big wheel.');
    if(noun==='the little train')variants.push('I would like to ride the little train.');
    if(noun==='to the park'||noun==='to the zoo')variants.push('I would like to go '+noun+'.');
    if(noun==='line one')variants.push('Line one, thank you.');
    const simple=BEAR_REPLY_VARIANTS.phrases;
    if(simple[text])variants.push(simple[text]);
    if(/^It is /i.test(text))variants.push(text.replace(/^It is /i,"It's ")+'.');
    if(/^I am /i.test(text))variants.push(text.replace(/^I am /i,"I'm ")+'.');
    if(/^Let us /i.test(text))variants.push(text.replace(/^Let us /i,"Let's ")+'!');
    if(/^I can see /i.test(text))variants.push(text.replace(/^I can see /i,'I see ')+'.');
    if(/^Where is (.+)$/i.test(text))variants.push('Can you tell me where '+text.slice(9)+' is?');
    if(/^(Under|In|On|Behind|Next to|Beside) (the|my|this) /i.test(text))variants.push('It is '+text[0].toLowerCase()+text.slice(1)+'.');
    if(/^(A|An|My) (?:[a-z]+ ){0,2}[a-z]+$/i.test(text)&&D.words.some(w=>text.toLowerCase().endsWith(' '+w.text)))variants.push((/^My (eyes|ears|hands|feet|shoes|socks|jeans|gloves)$/i.test(text)?'Those are ':'That is ')+text[0].toLowerCase()+text.slice(1)+'.');
    return [...new Set(variants)];
  }
  function evidence(x={}){
    if(x.independent>0&&x.streak>0)return {rank:3,label:'无提示表达记录'};
    if((x.recognized||0)+(x.practiced||0)+(x.recorded||0)>0)return {rank:2,label:'开口练习过'};
    if(x.selected>0&&x.streak>0)return {rank:1,label:'无提示选对过'};
    return {rank:0,label:x.heard?'听过示范':'继续巩固'};
  }
  function familiar(id){const x=L.get().items[id];return !!x&&x.streak>0&&((x.selected||0)+(x.independent||0)>0);}
  function readingTasks(book){
    const preferred=Math.min(2,book.pages.length-2);const page=[preferred,...book.pages.map((_,i)=>i).filter(i=>i>0&&i<book.pages.length-1)].find(i=>book.pages[i][3].some(t=>D.words.some(w=>w.text===t)))??preferred,p=book.pages[page];
    const w=p[3].map(t=>D.words.find(w=>w.text===t)).find(Boolean);
    const absent=D.words.filter(x=>x.id!==w?.id&&!p[3].includes(x.text)&&!normalize(p[1]).split(' ').includes(x.text.toLowerCase()));
    const choices=w?[w,...absent.filter(x=>x.theme===w.theme),...absent].filter((x,i,a)=>a.findIndex(y=>y.id===x.id)===i).slice(0,3):[];
    const preferredIndices=[0,Math.floor(book.pages.length/2),book.pages.length-1,...book.pages.map((_,i)=>i)];const indices=[];for(const i of preferredIndices){if(!indices.some(j=>book.pages[j][1]===book.pages[i][1]))indices.push(i);if(indices.length===3)break;}indices.sort((a,b)=>a-b);
    return {page,word:w,choices,indices};
  }
  const resourceValid=key=>typeof key==='string'&&([...D.words,...D.letters,...D.phonemes].some(x=>x.id===key)||key.startsWith('scene:')&&Object.hasOwn(LITTLE_BEAR_SCENES,key.slice(6))||key.startsWith('book:')&&BEAR_BOOKS.some(b=>b.id===key.slice(5))||key.startsWith('sentence:')&&(window.BEAR_SENTENCE_PATTERNS||[]).some(p=>p.id===key.slice(9))||key.startsWith('phonics:')&&D.words.some(w=>w.id===key.slice(8)));
  const object=x=>!!x&&typeof x==='object'&&!Array.isArray(x),integer=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
  function validAssessment(a){return object(a)&&integer(a.words,4)&&integer(a.sounds,2)&&integer(a.sentences,2)&&BEAR_LEARNING_THEMES.some(t=>t.id===a.theme)&&BEAR_READING_LEVELS.some(l=>l.id===a.level)&&BEAR_PHONICS_COURSE.some(c=>c.id===a.stage)&&Number.isFinite(a.time)&&a.time>=0;}
  function validate(g){
    if(g===undefined)return true;
    if(!object(g)||!Array.isArray(g.issues)||g.issues.length>100||!object(g.sessions)||!object(g.games))return false;
    if(g.assessment!==null&&(!validAssessment(g.assessment)||g.assessment.incomplete!==undefined&&typeof g.assessment.incomplete!=='boolean'))return false;
    if(g.draft!==null&&(!object(g.draft)||!Array.isArray(g.draft.answers)||g.draft.answers.length>8||g.draft.answers.some((x,i)=>!object(x)||typeof x.correct!=='boolean'||x.kind!==(i<4?'words':i<6?'sounds':'sentences'))))return false;
    if(g.draft?.seed!==undefined&&(!Number.isInteger(g.draft.seed)||g.draft.seed<1||g.draft.seed>2147483646))return false;
    if(g.draft?.answers.some(a=>a.skipped!==undefined&&typeof a.skipped!=='boolean'))return false;
    if(g.issues.some(x=>!object(x)||typeof x.id!=='string'||x.id.length>80||!window.BearGrowth.resourceValid(x.resource)||!['audio','chinese','ipa','art','other'].includes(x.type)||typeof x.note!=='string'||x.note.length>300||!Number.isFinite(x.time)||x.time<0||x.page!==null&&(!integer(x.page,5)||!x.resource.startsWith('book:'))))return false;
    if(Object.entries(g.sessions).some(([date,v])=>!/^\d{4}-\d{2}-\d{2}$/.test(date)||!object(v)||!integer(v.seconds,86400)||!integer(v.restAt,v.seconds)))return false;
    if(g.gameDrafts!==undefined&&(!object(g.gameDrafts)||Object.entries(g.gameDrafts).some(([key,v])=>!['basket','bag','order'].includes(key)||!object(v)||!Array.isArray(v.ids)||v.ids.length!==3||new Set(v.ids).size!==3||v.ids.some(id=>!D.words.some(w=>w.id===id))||!integer(v.index,3)||!integer(v.correct,v.index)||typeof v.wrong!=='boolean')))return false;
    if(Object.entries(g.games).some(([key,v])=>!['basket','bag','order'].includes(key)||!object(v)||!integer(v.correct,3)||!integer(v.total,3)||v.total!==3||!Number.isFinite(v.time)||v.time<0))return false;
    return true;
  }
  function issue(resource,page,type,note){
    if(!window.BearGrowth.resourceValid(resource)||!['audio','chinese','ipa','art','other'].includes(type))throw Error('请选择有效的内容和问题类型');
    note=String(note||'').trim();if(note.length>300)throw Error('说明最多 300 字');
    const value={id:globalThis.crypto?.randomUUID?.()||'issue-'+Date.now()+'-'+Math.random().toString(36).slice(2),resource,page:resource.startsWith('book:')&&integer(page,5)?page:null,type,note,time:Date.now()};
    L.growth('growthIssue',{value});return value;
  }
  window.BearGrowth={esc,normalize,replies,evidence,familiar,readingTasks,resourceValid,validate,issue};
})();

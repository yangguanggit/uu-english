/* Game difficulty is a local complexity ordering, not a reading/CEFR assessment. */
(() => {
  'use strict';
  const modes=['puzzle','moles','blocks','match','memory','treasure','balloons','bingo','train','detective'];
  const levels=[
    {name:'萌芽岛',icon:'🌱',questions:5,pairs:2,choices:3,bingo:3},
    {name:'声音谷',icon:'🌼',questions:6,pairs:3,choices:4,bingo:6},
    {name:'拼读湾',icon:'⛵',questions:8,pairs:4,choices:5,bingo:9},
    {name:'表达城',icon:'🏰',questions:10,pairs:5,choices:6,bingo:9},
    {name:'探险峰',icon:'⛰️',questions:12,pairs:6,choices:6,bingo:9},
    {name:'彩虹桥',icon:'🌈',questions:14,pairs:6,choices:6,bingo:9},
    {name:'星光林',icon:'🌟',questions:16,pairs:6,choices:6,bingo:9},
    {name:'智慧塔',icon:'🗼',questions:18,pairs:6,choices:6,bingo:9},
    {name:'勇气港',icon:'🚢',questions:20,pairs:6,choices:6,bingo:9},
    {name:'梦想星',icon:'🚀',questions:22,pairs:6,choices:6,bingo:9},
  ];
  const validLevel=level=>Number.isInteger(level)&&level>=0&&level<levels.length;
  const key=(mode,kind,group)=>JSON.stringify([mode,kind,group]);
  function validKey(value){
    let parts;try{parts=JSON.parse(value);}catch{return false;}
    if(!Array.isArray(parts)||parts.length!==3)return false;
    const [mode,kind,group]=parts;
    return key(mode,kind,group)===value&&modes.includes(mode)&&['words','sentences'].includes(kind)&&typeof group==='string'&&(!group||(kind==='words'?BEAR_FOUNDATIONS.themes:BEAR_SENTENCE_PATTERNS).some(row=>row.id===group));
  }
  function validateProgress(value){
    return !!value&&typeof value==='object'&&!Array.isArray(value)&&Object.entries(value).every(([id,done])=>validKey(id)&&Array.isArray(done)&&done.length<=levels.length&&done.every((level,index)=>validLevel(level)&&level===index));
  }
  function score(row,kind){
    const words=row.text.match(/[a-z]+(?:['’-][a-z]+)*/gi)||[];
    if(kind==='sentences')return words.length*4+row.chunks.length*2+row.text.length/100;
    const mapping=BEAR_PHONICS_DATA.find(item=>item.id===row.id);
    return row.chunks.length*4+(mapping?.parts.filter(part=>part.special).length||0)*2+row.text.length/10;
  }
  const cache=new WeakMap();
  function pool(rows,kind,level){
    if(!validLevel(level))return [];
    let ranked=cache.get(rows);if(!ranked){ranked=[...rows].sort((a,b)=>score(a,kind)-score(b,kind)||a.id.localeCompare(b.id));cache.set(rows,ranked);}
    const widthAt=index=>Math.min(ranked.length,Math.max(levels[index].questions,Math.ceil(ranked.length/levels.length)));
    // Growing question counts must not bring easier targets back into a later stage.
    // Small categories may run out of targets; the caller displays the actual count.
    let start=0;
    for(let index=0;index<=level;index++)start=Math.max(start,Math.floor((ranked.length-widthAt(index))*index/(levels.length-1)));
    const width=widthAt(level);
    return ranked.slice(start,start+width);
  }
  window.BearGameLevels={levels,modes,key,validKey,validLevel,validateProgress,score,pool};
})();

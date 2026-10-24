/* Explicit semantic art references shared by topics, covers and story pages. */
(() => {
  const words=BEAR_FOUNDATIONS.words,esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const artLabels={'flower pot':'花盆','soil garden':'泥土','swimming cap':'泳帽','cat-in box':'猫在盒子里','bell-in box':'铃铛在盒子里'};
  function render(entries,{className='',layout=''}={}){
    const labels=entries.map(entry=>{const spec=typeof entry==='string'?{word:entry}:entry,w=words.find(w=>w.text===spec.word);if(!w)throw Error('Missing illustration word: '+spec.word);const variant=spec.variant?words.find(w=>w.text===spec.variant)?.zh||({soil:'土壤中的',water:'装水的',night:'夜晚的'}[spec.variant]||spec.variant):'';const key=spec.variant?spec.variant+' '+spec.word:spec.word;return `${spec.count||''}${artLabels[key]||variant+w.zh}`;});
    return `<div class="semantic-art ${className}" data-layout="${layout}" role="img" aria-label="${esc(labels.join('、'))}">${entries.map(entry=>{const spec=typeof entry==='string'?{word:entry}:entry,w=words.find(w=>w.text===spec.word),key=spec.variant?spec.variant+' '+spec.word:spec.word,picture=spec.variant?BearArtwork.render(key,null):w.picture;if(!picture)throw Error('Missing literal art: '+key);return `<span class="concept-group" data-concept="${esc(spec.word)}" data-variant="${esc(spec.variant||'')}" data-count="${spec.count||1}" aria-hidden="true">${Array.from({length:spec.count||1},()=>`<span class="concept-picture">${picture}</span>`).join('')}</span>`;}).join('')}</div>`;
  }
  window.BearVisuals={render};
})();

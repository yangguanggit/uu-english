(() => {
  const rates={slow:.5,medium:.75,normal:1};
  function apply(audio){
    const selected=window.BearLearning.get().settings.speed||'medium';
    // Existing manual slow clips were synthesized at 115 instead of 155 wpm.
    const base=Number(audio.dataset.baseRate)||(/-slow\.wav(?:$|\?)/.test(audio.src)?115/155:1);
    audio.preservesPitch=true;audio.playbackRate=Math.min(base,rates[selected]||1)/base;
  }
  window.BearPlayback={apply,mount(root){root.append(voiceLabel,label);const help=document.createElement('details');help.className='setting-help';help.innerHTML='<summary>音色与音标示范说明</summary>';help.append(voiceNote);root.append(help);}};
  const label=document.createElement('label');label.className='speed-control';label.innerHTML='语速 <select id="playback-speed" aria-label="示范语速"><option value="slow">慢速 · 0.50×</option><option value="medium">正常 · 0.75×</option><option value="normal">快速 · 1.00×</option></select>';
  const store=document.createElement('div');store.hidden=true;store.id='parent-controls-store';document.body.append(store);store.append(label);
  const select=label.querySelector('select');select.value=BearLearning.get().settings.speed||'medium';
  const voiceLabel=document.createElement('label');voiceLabel.className='speed-control voice-control';
  const title=document.createElement('span');title.textContent='音色';
  const voiceSelect=document.createElement('select');voiceSelect.id='playback-voice';voiceSelect.setAttribute('aria-label','示范音色');voiceSelect.setAttribute('aria-describedby','playback-voice-note');
  for(const pack of BearVoices.list()){const option=document.createElement('option');option.value=pack.id;option.textContent=pack.label+(pack.ready?'':' · 待接入');option.disabled=!pack.ready;voiceSelect.append(option);}
  voiceLabel.append(title,voiceSelect);store.append(voiceLabel);
  const voiceNote=document.createElement('p');voiceNote.id='playback-voice-note';voiceNote.className='voice-note';store.append(voiceNote);
  function refreshVoice(){voiceSelect.value=BearVoices.current();voiceNote.textContent=BearVoices.note();window.BearSelect?.refresh(voiceSelect);}
  voiceSelect.onchange=()=>{if(!BearVoices.list().some(p=>p.id===voiceSelect.value&&p.ready)){refreshVoice();return;}window.BearLesson?.pause();BearLearning.settings({voice:voiceSelect.value});};
  refreshVoice();window.BearSelect?.mountAll(voiceLabel);
  window.BearSelect?.mountAll(label);
  select.onchange=()=>{BearLearning.settings({speed:select.value,speedChosen:true});};
  let activeVoice=BearVoices.current();
  window.addEventListener('bear:progress',()=>{const voice=BearVoices.current();if(voice!==activeVoice){activeVoice=voice;window.BearLesson?.pause();}refreshVoice();select.value=BearLearning.get().settings.speed||'medium';const audio=document.getElementById('lesson-audio');if(audio)apply(audio);window.BearSelect?.refresh(select);});
})();

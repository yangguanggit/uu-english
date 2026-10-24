/* A shared keyboard/touch picker; native selects remain the form value source. */
(() => {
  const mounted=new WeakMap();let active=null,sequence=0;
  function name(select){
    const referenced=(select.getAttribute('aria-labelledby')||'').split(/\s+/).map(id=>document.getElementById(id)?.textContent.trim()).filter(Boolean).join(' ');
    if(referenced)return referenced;
    if(select.getAttribute('aria-label')?.trim())return select.getAttribute('aria-label').trim();
    const labels=[...(select.labels||[])].map(label=>{const copy=label.cloneNode(true);copy.querySelectorAll('.select-control,select,input,textarea,button').forEach(node=>node.remove());return copy.textContent.trim();}).filter(Boolean).join(' ');
    return labels||'选择选项';
  }
  function close(focus=false){if(!active)return;const current=active;active=null;current.popup.remove();current.button.setAttribute('aria-expanded','false');current.button.removeAttribute('aria-activedescendant');if(focus&&current.button.isConnected)current.button.focus();}
  function refresh(select){const control=mounted.get(select);if(!control)return;const text=select.selectedOptions[0]?.textContent||'请选择';control.value.textContent=text;control.button.disabled=select.disabled;control.button.setAttribute('aria-label',`${name(select)}：${text}`);}
  function position(){if(!active)return;const r=active.button.getBoundingClientRect(),popup=active.popup;const width=Math.min(Math.max(r.width,active.select.id==='playback-speed'?116:210),innerWidth-24);popup.style.width=width+'px';popup.style.maxHeight=Math.min(320,innerHeight-24)+'px';const height=popup.getBoundingClientRect().height;popup.style.left=Math.max(12,Math.min(r.right-width,innerWidth-width-12))+'px';popup.style.top=Math.max(12,Math.min(r.bottom+8+height<=innerHeight-12?r.bottom+8:r.top-height-8,innerHeight-height-12))+'px';}
  function open(control){close();const {select,button}=control,popup=document.createElement('div');popup.id=`select-options-${++sequence}`;popup.className='select-options';popup.setAttribute('role','listbox');popup.setAttribute('aria-label',name(select));
    active={...control,popup,index:Math.max(0,select.selectedIndex)};button.setAttribute('aria-controls',popup.id);button.setAttribute('aria-expanded','true');
    [...select.options].forEach((option,i)=>{const row=document.createElement('button');row.type='button';row.id=popup.id+'-'+i;row.tabIndex=-1;row.className='select-option';row.dataset.value=option.value;row.setAttribute('role','option');row.setAttribute('aria-selected',String(option.selected));row.disabled=option.disabled;const label=document.createElement('span');label.textContent=option.textContent;const tick=document.createElement('span');tick.className='select-check';tick.textContent=option.selected?'✓':'';tick.setAttribute('aria-hidden','true');row.append(label,tick);row.onclick=()=>choose(i);popup.append(row);});document.body.append(popup);position();highlight(active.index);
  }
  function highlight(index){if(!active)return;active.index=index;[...active.popup.children].forEach((row,i)=>row.classList.toggle('focused',i===index));const row=active.popup.children[index];if(row){active.button.setAttribute('aria-activedescendant',row.id);row.scrollIntoView({block:'nearest'});}}
  function choose(index){if(!active)return;const {select,button}=active;if(select.options[index]?.disabled)return;select.selectedIndex=index;close();refresh(select);button.focus();select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));}
  function mount(select){if(mounted.has(select))return;const wrapper=document.createElement('span');wrapper.className='select-control';select.before(wrapper);wrapper.append(select);select.classList.add('select-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');const button=document.createElement('button');button.type='button';button.id=select.id+'-button';button.className='select-trigger';button.setAttribute('role','combobox');button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');const value=document.createElement('span');value.className='select-value';const arrow=document.createElement('span');arrow.className='select-arrow';arrow.setAttribute('aria-hidden','true');button.append(value,arrow);wrapper.append(button);const control={select,button,value};mounted.set(select,control);refresh(select);
    button.onclick=()=>active?.select===select?close():open(control);select.addEventListener('change',()=>refresh(select));button.onkeydown=e=>{
      if(e.key==='Escape'){if(active?.select===select){e.preventDefault();close(true);}return;}
      if(e.key==='Tab'){close();return;}
      if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();if(active?.select!==select){open(control);if(e.key==='ArrowDown'||e.key==='ArrowUp')return;}let index=e.key==='Home'?0:e.key==='End'?select.options.length-1:Math.max(0,Math.min(select.options.length-1,active.index+(e.key==='ArrowDown'?1:-1)));highlight(index);}
      else if(e.key==='Enter'||e.key===' '){e.preventDefault();if(active?.select===select)choose(active.index);else open(control);}
    };
  }
  window.BearSelect={refresh,mountAll(root=document){root.querySelectorAll('select').forEach(mount);},close};
  document.addEventListener('pointerdown',e=>{if(active&&!active.popup.contains(e.target)&&!active.button.contains(e.target))close();});window.addEventListener('resize',position);document.addEventListener('scroll',position,true);
  new MutationObserver(records=>{if(active&&!active.select.isConnected)close();for(const record of records){if(record.type==='attributes'&&record.target.matches('select'))refresh(record.target);for(const node of record.addedNodes){if(node.nodeType!==1)continue;if(node.matches('select'))mount(node);node.querySelectorAll('select').forEach(mount);}}}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled']});
  window.BearSelect.mountAll();window.addEventListener('pagehide',()=>close());
})();

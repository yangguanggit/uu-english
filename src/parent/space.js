/* Parent dashboards and secondary pages share the app's guarded navigation. */
(() => {
  window.BearParentSpace={create({root,heading}){
    const $=id=>document.getElementById(id),L=window.BearLearning,S=window.LITTLE_BEAR_SCENES;
    const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const pages={updates:['profiles','版本与使用检查'],assessment:['profiles','学习起点与休息'],quality:['profiles','内容审校与纠错'],report:['practice','详细成长记录'],weak:['practice','待巩固内容'],familyGame:['practice','本周亲子小游戏'],plan:['profiles','学习计划'],playback:['profiles','发音与显示'],children:['profiles','孩子档案'],backup:['profiles','备份与恢复'],downloads:['offline','主题包管理'],storage:['offline','存储与空间']};
    let parentTab=new URLSearchParams(location.search).get('tab')||'practice',parentDetail=null,parentScene=null,parentQueue=[];
    const menu=items=>`<div class="parent-menu">${items.map(([id,title,desc])=>`<button data-parent-open="${id}"><span><strong>${title}</strong><small>${desc}</small></span><b aria-hidden="true">›</b></button>`).join('')}</div>`;
    function pickParentSentence(){
      if(!parentQueue.length||parentQueue.every(id=>S[id].speech.en===S[parentScene]?.speech.en)){parentQueue=[...window.LITTLE_BEAR_ROUTE];for(let i=parentQueue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[parentQueue[i],parentQueue[j]]=[parentQueue[j],parentQueue[i]];}}
      const different=parentQueue.findIndex(id=>S[id].speech.en!==S[parentScene]?.speech.en);
      parentScene=parentQueue.splice(different<0?0:different,1)[0];
    }
    function renderParents(){
      if(!parentScene)pickParentSentence();
      const state=L.get(),s=S[parentScene],w=BearLearningTools.week(),values=Object.values(state.items),total=k=>values.reduce((n,x)=>n+(x[k]||0),0),key=`${L.today()}:${s.id}`;
      root.innerHTML=heading('🌱','家长空间','一起陪练、查看成长，管理孩子的学习。')+`
        <div data-parent-home="practice" class="parent-dashboard">
          <section class="feature-card parent-practice" data-practice-scene="${s.id}"><small>随机场景陪练 · ${s.categoryTitle} · ${s.catalogTitle}</small><h3>${s.parent.title}</h3><p>${s.parent.tip}</p><blockquote lang="en-US">${esc(s.speech.en)}</blockquote><p class="translation">${esc(s.speech.zh)}</p><div class="parent-sentence-actions"><button id="parent-demo" class="continue-button">♫ 听这句英文</button><button id="parent-next-sentence" class="text-button">换一句 ↻</button></div><button id="parent-done" class="text-button" ${state.parentDone.includes(key)?'disabled':''}>${state.parentDone.includes(key)?'✓ 今天已完成这张陪练卡':'我们线下练习过了，记下来 →'}</button><details class="parent-more"><summary>了解如何陪练</summary><p>先示范一次，再给孩子选择和等待的时间。回应意思即可，不打断逐字纠音。</p></details></section>
          <section class="feature-card"><h3>最近七天</h3><p>${w.start} 至 ${w.end}</p><div class="weekly-summary"><span>练习 ${w.active} 天</span><span>接触 ${w.ids.length} 项内容</span><span>${w.weak.length} 项待巩固</span></div>${menu([['report','详细成长记录','按日活动与累计练习证据'],['weak','待巩固内容',w.weak.length?'看看哪些内容可以再练一练':'从今天的主题开始'],['familyGame','本周亲子小游戏','把英语带到生活里']])}</section>
        </div>
        <section data-parent-detail="report" class="parent-report">${BearLearningTools.weeklyMarkup()}<div class="evidence-grid">${[['heard','听过示范'],['selected','选择正确'],['practiced','自行跟读'],['recorded','录音练习'],['recognized','提示后识别目标词'],['independent','无提示识别目标词']].map(([k,t])=>`<div><strong>${total(k)}</strong><span>${t} · 次</span></div>`).join('')}</div><details class="parent-more"><summary>了解这些记录</summary><p>这些是本机练习证据，不代表掌握率或发音质量。无提示识别仅限隐藏答案且未播放示范时，浏览器识别到目标词；不等于独立会话。${L.persistent()?'记录只在当前浏览器保存。':'当前浏览器无法持久保存记录，刷新后可能丢失。'}</p></details></section>
        <section data-parent-detail="weak" class="feature-card"><h3>待巩固内容</h3></section>
        <section data-parent-detail="familyGame" class="feature-card"><h3>本周亲子小游戏</h3></section>
        <section data-parent-detail="playback" class="feature-card"><h3 class="visually-hidden">发音与显示</h3><div id="parent-playback-setting" class="parent-playback-setting"><p>音色与语速按当前孩子保存，可随时调整</p></div><h4 class="setting-section-title">学习界面</h4><div class="feature-tabs" data-tab-level="secondary"><button data-child-mode="little" data-rail-key="little" aria-pressed="${state.settings.mode==='little'}">看图启蒙 · 大图大按钮</button><button data-child-mode="explorer" data-rail-key="explorer" aria-pressed="${state.settings.mode==='explorer'}">自主探索 · 英文与音标</button></div><label class="learning-text-setting">学习文字大小<select id="learning-text-size" aria-label="学习文字大小">${[['standard','标准'],['large','大字'],['extra','特大字']].map(([value,label])=>`<option value="${value}" ${state.settings.textSize===value?'selected':''}>${label}</option>`).join('')}</select></label><p class="learning-text-note">只调整单词、释义、故事和练习文字；导航与按钮保持清楚易点。按当前孩子保存。</p><label class="chinese-setting"><input id="show-chinese" type="checkbox" ${state.settings.chinese?'checked':''}> 默认展开中文</label></section>
        <div data-parent-home="profiles" class="parent-settings-menu">${menu([['plan','学习计划','选择主题与每天学习时长'],['playback','发音与显示','音色、语速、界面与中文显示'],['children','孩子档案','新增、改名或删除孩子档案'],['backup','备份与恢复','导出进度，换设备时恢复']])}</div>`;
      // Keep the existing report content and action, but give each task its own page.
      const report=root.querySelector('.weekly-report'),subheads=[...report.querySelectorAll('h4')];
      for(const [index,id] of ['weak','familyGame'].entries()){
        const target=root.querySelector(`[data-parent-detail="${id}"]`),h=subheads[index];
        let node=h.nextElementSibling;
        while(node&&node.tagName!=='H4'&&!node.classList.contains('report-note')){const next=node.nextElementSibling;target.append(node);node=next;}
        h.remove();
      }
      window.BearFamily.mount(root);
      const backup=root.querySelector('[data-parent-detail="backup"]'),clear=document.createElement('details');clear.className='parent-more parent-danger';
      clear.innerHTML='<summary>清除此孩子的学习记录…</summary><p>清除当前孩子的进度、任务与奖励，并恢复学习偏好默认值。其他孩子与共享离线包保留。</p><button id="clear-learning" class="text-button">清除学习记录…</button><div id="clear-confirm" hidden><p>此操作无法撤回，建议先导出备份。</p><button id="confirm-clear" class="danger-button">确认清除</button><button id="cancel-clear" class="text-button">保留记录</button><p id="clear-error" role="alert"></p></div>';backup.append(clear);
      BearGrowth.mountParent(root);
      mountParentTabs();
      window.BearPlayback.mount($('parent-playback-setting'));
      $('weekly-review').onclick=()=>{const weak=BearLearningTools.week().weak;if(!weak.length){BearFeatures.open('today');return;}BearFeatures.open('review');BearLearningTools.mixedReview(root,weak.map(BearLearningTools.reviewItem),()=>BearFeatures.open('review'));};
      $('parent-demo').onclick=()=>window.BearLesson.play(s.speech.en);
      $('parent-next-sentence').onclick=()=>{window.BearLesson.pause();pickParentSentence();renderParents();$('parent-next-sentence').focus({preventScroll:true});};
      $('parent-done').onclick=()=>{L.parentDone(s.id);renderParents();};
      BearCategoryRail.mount(root.querySelector('[data-parent-detail=playback] .feature-tabs'),{selector:'[data-child-mode]',active:state.settings.mode,surfaces:[root.querySelector('[data-parent-detail=playback]')],ignore:'.category-rail,.feature-tabs',change(next){L.settings({mode:next});renderParents();root.querySelector(`[data-child-mode="${next}"]`).focus({preventScroll:true});}});
      BearSelect.mountAll(root);
      $('learning-text-size').onchange=e=>L.settings({textSize:e.target.value});
      $('show-chinese').onchange=e=>L.settings({chinese:e.target.checked});
      $('clear-learning').onclick=()=>{$('clear-confirm').hidden=false;};$('cancel-clear').onclick=()=>{$('clear-confirm').hidden=true;};
      $('confirm-clear').onclick=()=>{try{L.clear();location.reload();}catch(error){$('clear-error').textContent=error.message;}};
      root.querySelectorAll('[data-parent-open]').forEach(b=>b.onclick=()=>openDetail(b.dataset.parentOpen));
    }
    function mountParentTabs(){
      const title=root.querySelector('.feature-heading'),bar=document.createElement('div');bar.className='parent-tabs';bar.setAttribute('role','tablist');bar.setAttribute('aria-label','家长空间');
      const tabs=[['practice','陪练与成长','🌱'],['profiles','孩子与设置','👨‍👩‍👧'],['offline','离线学习','📦']];
      const panels=tabs.map(([id,label,icon])=>{const panel=document.createElement('section');panel.id='parent-panel-'+id;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','parent-tab-'+id);panel.tabIndex=0;
        if(id==='profiles')panel.append(root.querySelector('.family-tools'),root.querySelector('.parent-settings-menu'),root.querySelector('[data-parent-detail="playback"]'),root.querySelector('[data-parent-detail="assessment"]'),root.querySelector('[data-parent-detail="quality"]'),root.querySelector('[data-parent-detail="updates"]'));
        else if(id==='offline')panel.append(root.querySelector('.offline-tools'));
        else root.querySelectorAll('[data-parent-home="practice"],[data-parent-detail="report"],[data-parent-detail="weak"],[data-parent-detail="familyGame"]').forEach(n=>panel.append(n));
        const button=document.createElement('button');button.id='parent-tab-'+id;button.dataset.parentTab=id;button.setAttribute('role','tab');button.setAttribute('aria-controls',panel.id);button.innerHTML=`<span class="tab-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
        button.onclick=()=>{window.BearLesson.pause();BearFeatures.openParents(id);window.scrollTo({top:0,behavior:'instant'});};
        button.onkeydown=e=>{const i=tabs.findIndex(t=>t[0]===id);if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;BearFeatures.openParents(tabs[next][0]);$('parent-tab-'+tabs[next][0]).focus();}};bar.append(button);return panel;
      });
      root.replaceChildren(title,bar,...panels);if(!tabs.some(t=>t[0]===parentTab))parentTab='practice';applyPage();
    }
    function applyPage(){
      window.BearSelect?.close();
      root.querySelectorAll('[data-parent-tab]').forEach(b=>{const active=b.dataset.parentTab===parentTab;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
      root.querySelectorAll('[role=tabpanel]').forEach(p=>p.hidden=p.id!=='parent-panel-'+parentTab);
      root.querySelectorAll('[data-parent-home]').forEach(n=>n.hidden=!!parentDetail||n.dataset.parentHome!==parentTab);
      root.querySelectorAll('[data-parent-detail]').forEach(n=>n.hidden=n.dataset.parentDetail!==parentDetail);
      const h=root.querySelector('.feature-heading');h.querySelector('h2').textContent=parentDetail?pages[parentDetail][1]:'家长空间';
      h.querySelector('div>p:last-child').textContent=parentDetail?`${BearProfiles.current().name} · 返回可回到本组首页。`:'一起陪练、查看成长，管理孩子的学习。';
    }
    function openDetail(id){
      if(!pages[id]||!window.BearNavigation.isParent())return;
      parentDetail=id;parentTab=pages[id][0];applyPage();
      window.BearNavigation.visit('parent-detail:'+id,()=>BearFeatures.openParents(pages[id][0],id));
      window.scrollTo({top:0,behavior:'instant'});root.querySelector('.feature-heading h2').tabIndex=-1;root.querySelector('.feature-heading h2').focus({preventScroll:true});
    }
    return {render:renderParents,openDetail,checkpoint:()=>({parentTab,parentDetail}),prepare(tab,refreshSentence){parentTab=tab;parentDetail=null;if(refreshSentence)pickParentSentence();}};
  }};
})();

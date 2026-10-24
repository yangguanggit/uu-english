/* Visible, recently interactive child time; reminders appear only at task boundaries. */
(() => {
  'use strict';
  const G=BearGrowth,L=BearLearning;
  let last=performance.now(),interaction=last,pending=0,day=L.today();
  // A nonmodal card library can stay open in desktop layouts, even on hidden pages.
  const blocked=()=>Boolean(document.querySelector('dialog:modal'));
  const active=()=>{const key=window.BearNavigation?.capture()?.key||'';const learning=key==='section:foundation'||key==='feature:phonics'||key.startsWith('lab:sentences:')||key.startsWith('lab:role:')||key==='quiz'||key==='mixed-review'||key.startsWith('book:')||key.startsWith('lesson:')||key==='growth:assessment'||key.startsWith('growth:game-');return learning&&!document.hidden&&!BearNavigation.isParent()&&!blocked()&&performance.now()-interaction<60000;};
  function flush(){const seconds=Math.floor(pending/1000);if(seconds){const session=L.get().growth.sessions[L.today()],remaining=86400-(session?.seconds||0);if(remaining>0)L.growth('growthSession',{seconds:Math.min(seconds,remaining)});pending-=seconds*1000;}}
  function tick(){const now=performance.now(),elapsed=now-last;last=now;if(day!==L.today()){pending=0;day=L.today();}if(active())pending+=Math.min(elapsed,5000);if(pending>=15000)flush();}
  for(const name of ['pointerdown','keydown','touchstart'])document.addEventListener(name,()=>{tick();interaction=performance.now();},{passive:true});
  setInterval(tick,5000);
  document.addEventListener('visibilitychange',()=>{tick();flush();last=performance.now();});window.addEventListener('pagehide',()=>{tick();flush();});
  function boundary(){tick();flush();const s=L.get(),session=s.growth.sessions[L.today()],minutes=s.settings.restMinutes??15;if(!session||!minutes||session.seconds-session.restAt<minutes*60||document.hidden||BearNavigation.isParent()||blocked())return;
    const dialog=document.createElement('dialog');dialog.id='learning-rest';dialog.className='parent-gate';dialog.setAttribute('aria-labelledby','learning-rest-title');const w=BEAR_FOUNDATIONS.words.find(w=>w.id===L.plan().learn[0]);dialog.innerHTML=`<h2 id="learning-rest-title">收好这一小段，休息一下吧</h2><p>你已经活跃学习约 ${Math.floor((session.seconds-session.restAt)/60)} 分钟啦。</p><p>和家长在身边找一找「${G.esc(w.zh)}」，试着说 “${G.esc(w.text)}”，也可以看看窗外、活动一下。</p><button id="rest-now" class="continue-button">先休息，回到今天</button><button id="rest-later" class="text-button">我想再学一小段</button>`;document.body.append(dialog);BearLesson.pause();BearFeatures.pause();BearFoundation.pause();dialog.showModal();const close=()=>{L.growth('growthRest',{});dialog.close();dialog.remove();interaction=performance.now();};dialog.querySelector('#rest-now').onclick=()=>{close();BearFeatures.open('landing');};dialog.querySelector('#rest-later').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
  }
  G.boundary=boundary;
})();

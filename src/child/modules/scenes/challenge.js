/* Scene challenge levels and short-lived reward effects. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id),
    S = LITTLE_BEAR_SCENES,
    L = BearLearning;
  let effectTimer;
  function mountChallenge(id, mode, n) {
    let bar = $('challenge-toolbar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'challenge-toolbar';
      bar.className = 'challenge-toolbar';
      $('lesson-workspace').prepend(bar);
    }
    bar.innerHTML = `<div><strong>三级小挑战</strong><small>${n === 1 ? '先听示范，再跟着说' : n === 2 ? '只看情境与图片，自己想一想' : '举一反三：换个同类任务，隐藏回答'}</small></div><div class="feature-tabs" data-tab-level="secondary">${[1, 2, 3].map((x) => `<button data-level="${x}" data-rail-key="${x}" aria-pressed="${x === n}">${x === 1 ? '跟读' : x === 2 ? '看图说' : '换一题'}</button>`).join('')}<button id="reveal-answer">需要示范</button></div>`;
    BearCategoryRail.mount(bar.querySelector('.feature-tabs'),{selector:'[data-level]',active:String(n),surfaces:[$('lesson-workspace').querySelector('.main-grid')],ignore:'.category-rail,.feature-tabs',change(next){
      const selected=Number(next),category=window.BEAR_CATEGORIES.find(c=>c.id===S[id].categoryId);
      const target=selected===3?category.games[(category.games.indexOf(id)+1)%category.games.length]:id;
      window.BearLesson.changeChallenge(target,selected);
    }});
    $('reveal-answer').onclick = () => {
      window.BearLesson.reveal();
      $('help-button').click();
    };
  }
  function speechFeedback(id, result, hinted, { countActivity = true } = {}) {
    const type =
      result === 'recognized'
        ? hinted
          ? 'recognized'
          : 'independent'
        : result === 'recorded'
          ? 'recorded'
          : 'practiced';
    L.record(`scene:${id}`, type, { hinted, countActivity });
    let effect = $('speech-effect');
    if (!effect) {
      effect = document.createElement('div');
      effect.id = 'speech-effect';
      effect.setAttribute('role', 'status');
      $('scene').append(effect);
    }
    effect.className = 'speech-effect';
    effect.replaceChildren();
    const icon = document.createElement('span');
    const target = S[id].options.find((x) => x.id === S[id].listen.target);
    if (target?.art)
      icon.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true">${target.art}</svg>`;
    else icon.textContent = S[id].emoji;
    const text = document.createElement('strong');
    text.textContent =
      result === 'recognized'
        ? '米米听到目标词，送来小礼物！'
        : result === 'recorded'
          ? '录好啦！点回听，再试着说一次。'
          : '米米为你的尝试送来小礼物！';
    effect.append(icon, text);
    void effect.offsetWidth;
    effect.classList.add('delivered');
    clearTimeout(effectTimer);
    effectTimer = setTimeout(() => effect.remove(), 4000);
  }
  window.BearChallenge = {
    mount: mountChallenge,
    speechFeedback,
    pause() {
      clearTimeout(effectTimer);
      $('speech-effect')?.remove();
    },
  };
})();

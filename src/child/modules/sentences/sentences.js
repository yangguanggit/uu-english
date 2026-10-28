(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    P = BearPracticeDrafts,
    esc = G.esc;
  const root = () => document.getElementById('features-panel');
  const page = BearPracticePage.open;
  function sentences(id = BEAR_SENTENCE_PATTERNS[0].id) {
    if (!BEAR_SENTENCE_PATTERNS.some((p) => p.id === id)) return;
    page('lab:sentences:' + id, () => renderSentences(id));
  }
  function renderSentences(id = BEAR_SENTENCE_PATTERNS[0].id) {
    const p = BEAR_SENTENCE_PATTERNS.find((p) => p.id === id),
      box = root();
    let draft = structuredClone(
      L.get().growth.lab?.sentences[id] || { choice: 0, order: [], completed: [], attempts: 0 },
    );
    const e = () => p.examples[draft.choice],
      save = () => P.save('sentences', id, draft);
    box.innerHTML = `<div class="feature-heading"><span>🧩</span><div><h2>句型积木</h2><p>10 类句型 · 每类 10 句 · 拼好后到场景里用一用</p></div></div>${BearFoundation.navigation('sentences')}<div class="lab-patterns category-rail" data-tab-level="secondary" role="group" aria-label="选择句型">${BEAR_SENTENCE_PATTERNS.map((x) => `<button data-pattern="${x.id}" data-rail-key="${x.id}" aria-pressed="${x.id === id}">${esc(BearCategoryRail.label(x.title,x.examples.length))}</button>`).join('')}</div><section class="feature-card lab-card"><h3 class="learning-copy">${esc(p.prefix)} …</h3><label>换一个表达<select id="sentence-example" aria-label="选择例句">${p.examples.map((x, i) => `<option value="${i}" ${i === draft.choice ? 'selected' : ''}>${esc(x.zh)}</option>`).join('')}</select></label><p id="sentence-meaning" class="learning-copy"></p><button id="sentence-listen" class="text-button">♫ 听完整示范</button><div id="sentence-slots" class="sentence-slots" aria-label="拼出的句子"></div><div id="sentence-blocks" class="sentence-blocks" aria-label="点击积木按顺序放入"></div><div class="lab-actions"><button id="sentence-undo" class="text-button">撤回一块</button><button id="sentence-reset" class="text-button">重新拼</button><button id="sentence-check" class="continue-button">拼好啦，检查一下</button></div><p id="sentence-status" role="status"></p><p id="sentence-progress"></p><details><summary>看看完整句，再跟着说</summary><p id="sentence-answer" class="learning-copy" lang="en"></p><p>先听、再遮住句子试着说；跟读不计为独立口语达标。</p></details><button id="sentence-scene" class="text-button">去对应场景用一用 →</button></section>`;
    const $ = (id) => box.querySelector('#' + id);
    function draw() {
      const x = e();
      $('sentence-meaning').textContent = x.zh;
      $('sentence-answer').textContent = x.text;
      $('sentence-slots').innerHTML = draft.order.length
        ? draft.order.map((i) => `<span>${esc(x.blocks[i])}</span>`).join('')
        : '<span class="feature-note">点下面的积木，拼出刚才听到的句子</span>';
      $('sentence-blocks').innerHTML = x.blocks
        .map((text, i) => ({ text, i }))
        .reverse()
        .map(
          ({ text, i }) =>
            `<button data-block="${i}" ${draft.order.includes(i) ? 'disabled' : ''} lang="en">${esc(text)}</button>`,
        )
        .join('');
      $('sentence-check').disabled = draft.order.length !== x.blocks.length;
      $('sentence-undo').disabled = !draft.order.length;
      $('sentence-progress').textContent =
        `这类句型已拼对 ${draft.completed.length} / ${p.examples.length} 句（排序练习）`;
      box.querySelectorAll('[data-block]').forEach(
        (b) =>
          (b.onclick = () => {
            draft.order.push(Number(b.dataset.block));
            save();
            $('sentence-status').textContent = '';
            draw();
          }),
      );
    }
    BearPageLayout.categories(box,['.foundation-tabs','.lab-patterns']);
    BearFoundation.bindNavigation(box,'sentences');
    BearCategoryRail.mount(box.querySelector('.lab-patterns'),{selector:'[data-pattern]',active:id,surfaces:[box],ignore:'.category-rail,.feature-tabs',change(next){BearLesson.pause();sentences(next);}});
    $('sentence-example').onchange = () => {
      draft.choice = Number($('sentence-example').value);
      draft.order = [];
      save();
      draw();
      $('sentence-status').textContent = '听听新句子，再拼一拼。';
      BearLesson.playFile(e().file, e().text);
    };
    $('sentence-listen').onclick = () => BearLesson.playFile(e().file, e().text);
    $('sentence-undo').onclick = () => {
      draft.order.pop();
      save();
      draw();
    };
    $('sentence-reset').onclick = () => {
      draft.order = [];
      save();
      draw();
      $('sentence-status').textContent = '';
    };
    $('sentence-check').onclick = () => {
      if (draft.order.length !== e().blocks.length) return;
      const correct = draft.order.every((v, i) => v === i);
      draft.attempts = Math.min(1000000, draft.attempts + 1);
      if (correct && !draft.completed.includes(draft.choice)) draft.completed.push(draft.choice);
      save();
      draw();
      $('sentence-status').textContent = correct
        ? '拼对啦！听一遍，再用自己的声音试试。'
        : '顺序还差一点，重听后撤回或重新拼。';
      if (correct) {
        BearLesson.playFile(e().file, e().text);
        G.boundary();
      }
    };
    $('sentence-scene').onclick = () => {
      BearHub.show('scenes');
      BearLesson.open(e().scene, false, 1);
    };
    draw();
    G.feedbackButton?.(box.querySelector('.lab-card'), 'sentence:' + id);
    BearLesson.playFile(e().file, e().text);
  }
  window.BearSentenceBlocks = { open: sentences };
})();

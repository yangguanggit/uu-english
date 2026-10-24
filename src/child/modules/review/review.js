(() => {
  'use strict';
  /* BearChildReview: feature-owned state behind a single factory. */
  window.BearChildReview = {
    create({ root, heading, open, openTheme, downloadedTopics, pause, playWord }) {
      const $ = (id) => document.getElementById(id);
      const L = BearLearning;
      const D = BEAR_FOUNDATIONS;
      const word = (id) => D.words.find((w) => w.id === id);
      const esc = BearGrowth.esc;
      let quiz = null;
      function renderReview() {
        const pool = BearLearningTools.reviewPool(5),
          state = L.get(),
          due = pool.filter((x) => state.items[x.id].due <= Date.now());
        root.innerHTML =
          heading('🎒', '复习小口袋', '单词、场景回应和绘本问题，每轮最多五项。') +
          `<div class="review-overview"><strong>${due.length} 项到期内容</strong><span>本轮 ${pool.length} 项</span></div><div class="review-chips">${pool.map((x) => `<span>${x.icon} ${esc(x.kind)} · ${esc(x.title)}</span>`).join('')}</div><button id="begin-review" class="continue-button">${pool.length ? '开始混合复习' : '先认识今天的主题词'} →</button><p class="feature-note">答错或使用提示的内容会更早回来。没有到期内容时，可提前巩固已有学习记录。</p>`;
        $('begin-review').onclick = async () => {
          if (!navigator.onLine && !(await BearOffline.verify(L.plan().theme))) {
            downloadedTopics();
            return;
          }
          if (pool.length) BearLearningTools.mixedReview(root, pool, () => open('review'));
          else open('today');
        };
      }
      function renderQuiz() {
        const saved = structuredClone(quiz);
        window.BearNavigation.visit('quiz', () => {
          pause();
          BearHub.show('extras');
          quiz = structuredClone(saved);
          renderQuiz();
        });
        pause();
        window.BearLesson.pause();
        const q = quiz,
          w = word(q.ids[q.i]);
        if (!w) {
          if (q.key) L.task(q.key, q.taskContext || null);
          BearGrowth.boundary?.();
          root.innerHTML =
            heading('🌟', '这一小段完成啦！', '愿意听、愿意试，就有新的发现。') +
            '<button id="quiz-return" class="continue-button">继续今天的小冒险 →</button>';
          $('quiz-return').onclick = () => (q.topic ? openTheme(q.topic) : open('today'));
          return;
        }
        const choices = BearGrowth.shuffle([w, ...BearGrowth.distractors(w)]);
        root.innerHTML =
          heading(
            q.phase === 'learn' ? '🌱' : '🎧',
            q.phase === 'learn' ? '听一听，认识新朋友' : '听一听，选对小图片',
            `${q.i + 1} / ${q.ids.length}`,
          ) +
          `<div class="quiz-card">${q.phase === 'learn' ? `<div class="quiz-picture">${w.picture}</div><h2>${w.text} <span class="word-ipa">${w.ipa}</span></h2><p class="translation">${w.zh}</p><button id="quiz-listen" class="continue-button">♫ 再听英文和中文</button><button id="quiz-test" class="text-button">记住啦，来试一试 →</button>` : `<button id="quiz-listen" class="continue-button">♫ 再听英文</button><div class="quiz-options">${choices.map((x) => `<button data-answer="${x.id}" aria-label="${esc(x.zh)}"><span>${x.picture}</span><small>${x.zh}</small></button>`).join('')}</div><button id="quiz-hint" class="text-button">看看提示</button><p id="quiz-hint-text" hidden>${w.text} · ${w.zh}</p><p id="quiz-feedback" role="status"></p><button id="quiz-next" class="continue-button" hidden>下一个朋友 →</button>`}</div>`;
        $('quiz-listen').onclick = () =>
          q.phase === 'learn' ? playWord(w) : window.BearLesson.playFile(w.audio + '.wav', w.text);
        if (q.phase === 'learn') {
          $('quiz-test').onclick = () => {
            q.phase = 'test';
            q.hinted = true;
            renderQuiz();
          };
          playWord(w);
          return;
        }
        const gate = BearGrowth.listenGate(
          root,
          () => BearLesson.playFile(w.audio + '.wav', w.text),
          [...root.querySelectorAll('[data-answer]')],
          '#quiz-feedback',
        );
        $('quiz-listen').onclick = gate.play;
        $('quiz-hint').onclick = () => {
          if (q.selected) return;
          q.hinted = true;
          L.record(w.id, 'hinted');
          $('quiz-hint-text').hidden = false;
          playWord(w);
        };
        root.querySelectorAll('[data-answer]').forEach(
          (b) =>
            (b.onclick = () => {
              if (q.selected || !gate.ready()) return;
              if (b.dataset.answer !== w.id) {
                q.wrong = true;
                L.record(w.id, 'wrong');
                $('quiz-feedback').textContent = '再听一次，慢慢找。';
                b.classList.add('wrong');
                gate.play();
                return;
              }
              q.selected = true;
              L.record(w.id, 'selected', { hinted: q.hinted || q.wrong });
              BearGrowth.transfer(w.id, !q.hinted && !q.wrong, 'daily');
              b.classList.add('selected');
              $('quiz-feedback').textContent =
                q.hinted || q.wrong ? '找到啦，下次再巩固一下！' : '这次独立选对啦！';
              $('quiz-next').hidden = false;
            }),
        );
        if (q.selected) {
          root.querySelector(`[data-answer="${w.id}"]`)?.classList.add('selected');
          $('quiz-feedback').textContent = '这一题已经选对啦，可以继续。';
          $('quiz-next').hidden = false;
        }
        $('quiz-next').onclick = () => {
          q.i++;
          q.hinted = false;
          q.wrong = false;
          q.selected = false;
          q.phase = q.key === 'learn' || q.topic ? 'learn' : 'test';
          renderQuiz();
        };
        gate.onSkip = () => {
          gate.dispose();
          BearLesson.pause();
          q.hinted = true;
          q.selected = true;
          $('quiz-feedback').textContent = '本题已跳过，未记录答错；下次可以再听。';
          $('quiz-next').hidden = false;
        };
        if (!q.selected) gate.play();
        else gate.dispose();
      }
      function validQuiz(q) {
        return (
          q &&
          Array.isArray(q.ids) &&
          q.ids.length > 0 &&
          q.ids.length <= 5 &&
          q.ids.every((id) => word(id)) &&
          Number.isInteger(q.i) &&
          q.i >= 0 &&
          q.i <= q.ids.length &&
          ['learn', 'test'].includes(q.phase)
        );
      }
      return {
        render: renderReview,
        start(q) {
          quiz = q;
          renderQuiz();
        },
        restore(q) {
          if (!validQuiz(q)) return;
          open('today');
          quiz = structuredClone(q);
          renderQuiz();
        },
        reset() {
          quiz = null;
        },
        checkpoint: () => structuredClone(quiz),
        valid: validQuiz,
      };
    },
  };
})();

(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    D = BEAR_FOUNDATIONS,
    esc = G.esc;
  const root = () => document.getElementById('features-panel'),
    openPage = BearActivityPage.open;
  function assessmentQuestions() {
    return G.questionBank();
  }
  function assessment() {
    openPage('assessment', renderAssessment);
  }
  function renderAssessment() {
    const box = root(),
      g = L.get().growth,
      answers = g.draft?.answers || [],
      questions = assessmentQuestions(),
      q = questions[answers.length];
    if (!q) {
      const count = (kind) => answers.filter((a) => a.kind === kind && a.correct).length,
        words = count('words'),
        sounds = count('sounds'),
        sentences = count('sentences');
      const incomplete = answers.some((a) => a.skipped),
        current = L.get().settings;
      const result = {
        words,
        sounds,
        sentences,
        level: incomplete
          ? current.readingLevel || 'L1'
          : sentences === 2 && words >= 3
            ? 'L3'
            : words >= 3
              ? 'L2'
              : 'L1',
        stage: incomplete ? current.phonicsStage || 'short' : sounds === 2 ? 'blends' : 'short',
        theme: incomplete ? L.plan().theme : words >= 3 ? 'park' : 'breakfast',
        incomplete,
        time: Date.now(),
      };
      L.growth('growthAssessment', { value: result });
      openPage('assessment-result', () => renderAssessmentResult(L.get().growth.assessment));
      return;
    }
    box.innerHTML = `<div class="feature-heading"><span>🌱</span><div><h2>找到适合自己的起点</h2><p>第 ${answers.length + 1} / 8 个小任务 · 可随时跳过</p></div></div><section class="quiz-card"><h3>${q.prompt}</h3><button id="assessment-listen" class="continue-button">♫ 听一听</button><div class="growth-options">${q.choices
      .map((x, i) => ({ x, sort: (i + answers.length) % q.choices.length }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ x }) => `<button data-assess-answer="${esc(x.id)}">${x.label}</button>`)
      .join(
        '',
      )}</div><p id="assessment-feedback" role="status"></p><button id="assessment-next" class="continue-button" hidden>下一个 →</button><button id="assessment-skip" class="text-button">先跳过，直接开始学习</button><p class="feature-note">只用于建议学习起点，不是能力测评或发音评分。请勿代答；不确定也没关系。</p></section>`;
    let selected = null;
    const buttons = [...box.querySelectorAll('[data-assess-answer]')];
    const gate = G.listenGate(box, q.play, buttons, '#assessment-feedback');
    box.querySelector('#assessment-listen').onclick = gate.play;
    box.querySelectorAll('[data-assess-answer]').forEach(
      (b) =>
        (b.onclick = () => {
          if (selected !== null || !gate.ready()) return;
          selected = b.dataset.assessAnswer;
          box.querySelectorAll('[data-assess-answer]').forEach((x) => (x.disabled = true));
          b.classList.add('selected');
          box.querySelector('#assessment-feedback').textContent = '记下啦，我们继续认识新朋友。';
          box.querySelector('#assessment-next').hidden = false;
        }),
    );
    box.querySelector('#assessment-next').onclick = () => {
      if (selected === null) return;
      gate.dispose();
      L.growth('growthDraft', {
        value: {
          ...L.get().growth.draft,
          answers: [
            ...answers,
            { kind: q.kind, correct: selected === q.answer, skipped: selected === '__skip__' },
          ],
        },
      });
      renderAssessment();
    };
    box.querySelector('#assessment-skip').onclick = () => {
      L.settings({ onboardingSkipped: true });
      BearFeatures.open('landing');
    };
    gate.onSkip = () => {
      gate.dispose();
      BearLesson.pause();
      buttons.forEach((b) => (b.disabled = true));
      selected = '__skip__';
      box.querySelector('#assessment-feedback').textContent = '本题跳过，不计入起点判断。';
      box.querySelector('#assessment-next').hidden = false;
    };
    gate.play();
  }
  function renderAssessmentResult(a) {
    const box = root();
    box.innerHTML = `<section class="feature-card assessment-result"><h2>小起点准备好啦！</h2><p>认图 ${a.words}/4 · 声音与拼写 ${a.sounds}/2 · 句意 ${a.sentences}/2</p><p>${a.incomplete ? '保留原起点' : '建议从'} <strong>${a.level}</strong> 绘本、<strong>${esc(BEAR_PHONICS_COURSE.find((c) => c.id === a.stage).title)}</strong> 和「${BEAR_LEARNING_THEMES.find((t) => t.id === a.theme).title}」主题开始。</p><p>${a.incomplete ? '有未听完或跳过的题目，未完成部分不评分。本次保留原有起点与主题，完整重做后再生成建议。' : ''}这只是八道小任务的学习建议，可以由家长调整，也可以从更简单的内容开始。</p><p id="assessment-result-status" role="status"></p><button id="assessment-apply" class="continue-button">使用建议，开始冒险</button><button id="assessment-keep" class="text-button">保留原计划，回到今天</button></section>`;
    box.querySelector('#assessment-apply').onclick = () => {
      L.settings({ readingLevel: a.level, phonicsStage: a.stage, onboardingSkipped: true });
      BearPhonics.setStage(a.stage);
      const current = L.plan();
      if (current.done.length) {
        box.querySelector('#assessment-result-status').textContent =
          '今天已有完成进度，保留今日主题；新的阅读与拼读起点已保存。家长可在学习计划中更换主题。';
        box.querySelector('#assessment-apply').hidden = true;
        return;
      }
      L.choosePlan(a.theme, L.get().settings.planMinutes);
      BearFeatures.open('landing');
    };
    box.querySelector('#assessment-keep').onclick = () => BearFeatures.open('landing');
  }
  function entry(box) {
    const g = L.get().growth;
    if (g.assessment || L.get().settings.onboardingSkipped) return;
    const card = document.createElement('section');
    card.className = 'feature-card growth-entry';
    card.innerHTML = `<h3>🌱 找到适合自己的起点</h3><p>8 个轻松小任务，推荐绘本、拼读和主题。可以稍后再做。</p><button id="start-assessment" class="text-button">${g.draft?.answers.length ? '接着上次继续' : '试一试'} →</button><button id="skip-onboarding" class="text-button">稍后再说</button>`;
    box.append(card);
    card.querySelector('#start-assessment').onclick = assessment;
    card.querySelector('#skip-onboarding').onclick = () => {
      L.settings({ onboardingSkipped: true });
      card.remove();
    };
  }
  window.BearAssessment = {
    questions: assessmentQuestions,
    open: assessment,
    entry,
    restoreResult() {
      const a = L.get().growth.assessment;
      if (a) openPage('assessment-result', () => renderAssessmentResult(a));
      else assessment();
    },
  };
})();

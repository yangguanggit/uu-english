(() => {
  'use strict';
  window.BearParentPlan = {
    mount(section) {
      const $ = (id) => section.querySelector('#' + id);
      const p = BearLearning.plan(),
        planner = document.createElement('section');
      planner.className = 'feature-card daily-planner';
      planner.dataset.parentDetail = 'plan';
      planner.innerHTML = `<h4>安排今日学习</h4><p>未完成的主题次日会继续。更换或重学会重新安排今日任务，已保存的练习记录仍保留。</p><label>计划时长<select id="plan-minutes" aria-label="计划时长">${[5, 10, 15].map((n) => `<option value="${n}" ${Number(p.minutes || 10) === n ? 'selected' : ''}>约 ${n} 分钟${n === 5 ? ' · 三段轻量练习' : ' · 五段主题路线'}</option>`).join('')}</select></label><label>学习主题<select id="plan-theme" aria-label="学习主题">${BEAR_LEARNING_THEMES.map((t) => `<option value="${t.id}" ${t.id === p.theme ? 'selected' : ''}>${t.title} · ${BearCurriculum.words(t.id).length} 个关联词</option>`).join('')}</select></label><button id="apply-plan">更换 / 重学所选主题</button><p id="plan-feedback" role="status"></p>`;
      section.append(planner);
      $('apply-plan').onclick = () => {
        BearLearning.choosePlan($('plan-theme').value, Number($('plan-minutes').value));
        $('plan-feedback').textContent = '今日路线已重新安排，回到孩子的「今天」即可开始。';
      };
    },
  };
})();

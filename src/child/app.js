/* Child application entry: wire modules and route actions; page state stays in each module. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id),
    L = BearLearning,
    S = LITTLE_BEAR_SCENES;
  const root = $('features-panel');
  let view = 'today';
  function heading(icon, title, desc) {
    return `<div class="feature-heading"><span>${icon}</span><div><p class="eyebrow">A LITTLE MORE EVERY DAY</p><h2>${title}</h2><p>${desc}</p></div></div>`;
  }
  function playWord(w) {
    window.BearLesson.playFiles([
      { file: w.audio + '.wav', label: w.text },
      { file: w.zhAudio + '.wav', label: w.zh },
    ]);
  }
  function pause() {
    reading.pause();
    BearChallenge.pause();
  }
  function open(next) {
    if (next === 'parents' && !window.BearNavigation.isParent()) {
      window.BearNavigation.requestParents('practice');
      return;
    }
    pause();
    window.BearHub.show('extras');
    view = next;
    window.BearNavigation.view(next);
    review.reset();
    document.body.classList.toggle('home-landing', next === 'landing');
    render();
    if (next !== 'theme')
      window.BearNavigation.visit(
        'feature:' + next,
        next === 'parents'
          ? (() => {
              const tab = parentSpace.checkpoint().parentTab;
              return () => openParents(tab);
            })()
          : () => open(next),
        {
          root: ['landing', 'explore', 'books', 'parents'].includes(next),
          tab: ['landing', 'today', 'library'].includes(next)
            ? 'today'
            : next === 'books'
              ? 'books'
              : 'explore',
        },
      );
    root.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  function render() {
    document
      .querySelectorAll('[data-nav]')
      .forEach((b) =>
        b.classList.toggle('active', b.dataset.nav === { today: 'today', parents: 'growth' }[view]),
      );
    document.querySelectorAll('[data-feature]').forEach((b) => {
      b.classList.toggle('active', b.dataset.feature === view);
      b.setAttribute('aria-pressed', String(b.dataset.feature === view));
    });
    (
      ({
        landing: today.renderLanding,
        library: library.render,
        explore: explore.render,
        today: today.render,
        themes: themes.render,
        review: review.render,
        phonics: renderPhonics,
        books: reading.render,
        home: rewards.render,
        parents: renderParents,
      })[view] || today.render
    )();
  }
  function renderPhonics() {
    window.BearPhonics.render(root);
  }
  function openParents(tab = 'practice', detail = null) {
    if (!window.BearNavigation.isParent()) {
      window.BearNavigation.requestParents(tab);
      return;
    }
    if (BearGrowth.pendingIssue && tab === 'profiles') {
      detail = 'quality';
      BearGrowth.pendingIssue = false;
    }
    parentSpace.prepare(tab, view !== 'parents');
    open('parents');
    if (detail) parentSpace.openDetail(detail);
  }
  function renderParents() {
    parentSpace.render();
  }
  function openPhonics(id) {
    if (id) BearPhonics.select(id);
    open('phonics');
  }
  const library = BearChildLibrary.create({ root, heading, open });
  const reading = BearChildReading.create({
    root,
    heading,
    open,
    playWord,
    setView(next) {
      view = next;
    },
    isActive: () => view === 'books',
  });
  const themes = BearChildThemes.create({
    root,
    heading,
    open,
    openBook: (id) => reading.open(id),
    startQuiz: (q) => review.start(q),
  });
  const review = BearChildReview.create({
    root,
    heading,
    open,
    openTheme: (id) => themes.open(id),
    downloadedTopics: () => themes.downloaded(),
    pause,
    playWord,
  });
  const today = BearChildToday.create({
    root,
    heading,
    open,
    openBook: (id) => reading.open(id),
    downloadedTopics: () => themes.downloaded(),
    mountTodayLibrary: () => library.mountToday(),
    startQuiz: (q) => review.start(q),
  });
  const explore = BearChildExplore.create({
    root,
    heading,
    open,
    downloadedTopics: () => themes.downloaded(),
  });
  const rewards = BearChildRewards.create({
    root,
    heading,
    open,
    openBook: (id) => reading.open(id),
    openParents,
    openPhonics,
  });
  const parentSpace = BearParentSpace.create({ root, heading });
  document
    .querySelectorAll('[data-feature]')
    .forEach((b) => (b.onclick = () => open(b.dataset.feature)));
  document.querySelectorAll('[data-nav="today"]').forEach((b) => (b.onclick = () => open('today')));
  document
    .querySelectorAll('[data-nav="growth"]')
    .forEach((b) => (b.onclick = () => open('parents')));
  $('parent-button').onclick = () => window.BearNavigation.requestParents('practice');
  $('parent-tip-button').onclick = () => window.BearNavigation.requestParents('practice');
  document.querySelector('.brand').onclick = (e) => {
    e.preventDefault();
    open('landing');
  };

  window.BearFeatures = {
    restoreMixedReview(saved) {
      open('review');
      BearLearningTools.restoreReview(root, saved);
    },
    openLibrary: (options) => library.open(options),
    openBooks: (level) => reading.openBooks(level),
    checkpoint: () =>
      view === 'books'
        ? reading.checkpoint()
        : view === 'library'
          ? library.checkpoint()
          : view === 'parents'
            ? parentSpace.checkpoint()
            : review.checkpoint(),
    validQuiz: (q) => review.valid(q),
    openDownloaded() {
      open('review');
      themes.downloaded();
    },
    restoreQuiz: (q) => review.restore(q),
    open,
    openBook: (id) => reading.open(id),
    openTheme: (id) => themes.open(id),
    openPhonics,
    openParents,
    pause,
  };
  window.addEventListener('bear:progress', () => today.banner());
  today.banner();
  // A persistent, explicit reveal control is available in every child-facing view.
  const chinese = document.createElement('button');
  chinese.id = 'chinese-peek';
  chinese.className = 'chinese-peek';
  chinese.textContent = '查看中文';
  chinese.onclick = () => {
    const shown = document.body.classList.toggle('peek-chinese');
    chinese.textContent = shown ? '收起中文' : '查看中文';
  };
  document.body.append(chinese);
  const requestedView = new URLSearchParams(location.search).get('view');
  if (window.BearNavigation.resume()) {
  } else if (
    [
      'landing',
      'explore',
      'themes',
      'today',
      'review',
      'phonics',
      'books',
      'home',
      'parents',
    ].includes(requestedView)
  ) {
    if (requestedView === 'parents') open('landing');
    if (requestedView === 'phonics') BearHub.show('foundation');
    open(requestedView);
  } else {
    const requestedLesson = new URLSearchParams(location.search).get('lesson');
    if (requestedLesson && S[requestedLesson]) {
      BearHub.show('scenes');
      BearLesson.open(requestedLesson);
    } else open('landing');
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('reading-immersive')) {
      window.BearNavigation.back();
    }
  });
  window.addEventListener('pagehide', pause);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
  });
})();

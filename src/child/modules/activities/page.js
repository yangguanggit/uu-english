(() => {
  'use strict';
  function openPage(key, render) {
    if (BearNavigation.isParent()) BearFeatures.open('explore');
    BearFeatures.pause();
    BearLesson.pause();
    BearHub.show('extras');
    BearNavigation.view('explore');
    document.body.classList.remove('home-landing');
    render();
    BearNavigation.visit('growth:' + key, () => openPage(key, render));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.BearActivityPage = { open: openPage };
})();

/* Practice navigation owns disposal; exercise pages register their listener cleanup. */
(() => {
  'use strict';
  let dispose = () => {};
  function cleanup() {
    dispose();
    dispose = () => {};
  }
  function open(key, render) {
    cleanup();
    BearFeatures.pause();
    BearLesson.pause();
    BearFoundation.pause();
    BearHub.show('extras');
    BearNavigation.view('explore');
    document.body.classList.remove('home-landing');
    render();
    BearNavigation.visit(key, () => open(key, render));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  window.BearPracticePage = {
    open,
    cleanup,
    onLeave(fn) {
      dispose = fn;
    },
  };
})();

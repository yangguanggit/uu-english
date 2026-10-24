/* Compose profile settings without owning their persistence or asynchronous tasks. */
(() => {
  'use strict';
  window.BearFamily = {
    mount(root) {
      const section = document.createElement('section');
      section.className = 'family-tools';
      section.innerHTML = '<p id="family-status" role="status"></p>';
      root.prepend(section);
      const report = (error) =>
        (section.querySelector('#family-status').textContent = error.message || error);
      BearParentChildren.mount(section, report);
      BearParentBackup.mount(section, report);
      BearParentPlan.mount(section);
      BearParentOffline.mount(section);
      BearSelect.mountAll(section);
    },
  };
})();

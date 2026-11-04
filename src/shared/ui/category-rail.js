/* Menus scroll without changing selection; content gestures switch the deepest category. */
(() => {
  let suppressUntil = 0;
  document.addEventListener('pointerdown', () => { suppressUntil = 0; }, true);
  document.addEventListener('click', event => {
    if (performance.now() < suppressUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  const bindings = new WeakMap();
  const menus = '.category-rail,.feature-tabs,.course-stages,.discovery-nav,.reader-modes';
  function mount(nav, { selector, active, change, surfaces = [], ignore = '' }) {
    const controllers = [];
    const buttons = [...nav.querySelectorAll(selector)];
    const index = buttons.findIndex(button => button.matches('[aria-selected=true],[aria-pressed=true],[aria-current=page]'));
    const selected = buttons[index];
    if (selected) nav.scrollLeft += selected.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - selected.offsetWidth) / 2;
    buttons.forEach(button => { button.onclick = () => { if (button.dataset.railKey !== active) change(button.dataset.railKey); }; });
    [nav, ...surfaces].forEach(surface => {
      // Replacing a content binding must not dispose another menu's scrolling listener.
      bindings.get(surface)?.abort();
      const controller = new AbortController(), options = { signal: controller.signal };
      bindings.set(surface, controller);
      controllers.push(controller);
      surface.classList.add(surface === nav ? 'category-scroll-rail' : 'category-swipe-surface');
      let start = null;
      surface.addEventListener('pointerdown', event => {
        start = null;
        if (!nav.isConnected || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
        if (surface !== nav && (event.target.closest(menus) || (ignore && event.target.closest(ignore)))) return;
        if (event.target.closest('input,select,textarea,audio,a,.select-control,[data-no-category-swipe]')) return;
        start = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), scroll: surface.scrollLeft, moved: false };
        event.target.setPointerCapture(event.pointerId);
      }, options);
      surface.addEventListener('pointermove', event => {
        if (surface !== nav || !start || event.pointerId !== start.id) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        start.moved = true;
        surface.scrollLeft = start.scroll - dx;
        event.preventDefault();
      }, options);
      surface.addEventListener('pointercancel', () => { start = null; }, options);
      surface.addEventListener('pointerup', event => {
        const gesture = start;
        start = null;
        if (!gesture || gesture.id !== event.pointerId) return;
        const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
        if (surface === nav) {
          if (gesture.moved) { suppressUntil = performance.now() + 400; event.preventDefault(); }
          return;
        }
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5 || performance.now() - gesture.time > 1200) return;
        suppressUntil = performance.now() + 400;
        event.preventDefault();
        const next = buttons[index + (dx < 0 ? 1 : -1)];
        if (next) change(next.dataset.railKey);
      }, options);
    });
    return () => controllers.forEach(controller => controller.abort());
  }
  const label = (title, count) => count === 1 ? title : `${title} · ${count}`;
  window.BearCategoryRail = { mount, label };
})();

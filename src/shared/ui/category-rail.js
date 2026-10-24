/* One-line category navigation: clicks and one-step horizontal gestures. */
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
  function mount(nav, { selector, active, change, surfaces = [], ignore = '' }) {
    const controller = new AbortController(), options = { signal: controller.signal };
    const buttons = [...nav.querySelectorAll(selector)];
    const index = buttons.findIndex(button => button.matches('[aria-selected=true],[aria-pressed=true],[aria-current=page]'));
    const selected = buttons[index];
    if (selected) nav.scrollLeft += selected.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - selected.offsetWidth) / 2;
    buttons.forEach(button => { button.onclick = () => { if (button.dataset.railKey !== active) change(button.dataset.railKey); }; });
    [nav, ...surfaces].forEach(surface => {
      const previous = bindings.get(surface);
      if (previous !== controller) previous?.abort();
      bindings.set(surface, controller);
      surface.classList.add('category-swipe-surface');
      let start = null;
      surface.addEventListener('pointerdown', event => {
        if (!nav.isConnected) return;
        if (surface !== nav && ignore && event.target.closest(ignore)) return;
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0) || event.target.closest('input,select,textarea,audio,a,.select-control')) return;
        start = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now() };
        event.target.setPointerCapture(event.pointerId);
      }, options);
      surface.addEventListener('pointercancel', () => { start = null; }, options);
      surface.addEventListener('pointerup', event => {
        const gesture = start;
        start = null;
        if (!gesture || gesture.id !== event.pointerId) return;
        const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
        if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5 || performance.now() - gesture.time > 1200) return;
        suppressUntil = performance.now() + 400;
        event.preventDefault();
        const next = buttons[index + (dx < 0 ? 1 : -1)];
        if (next) change(next.dataset.railKey);
      }, options);
    });
    return () => controller.abort();
  }
  const label = (title, count) => count === 1 ? title : `${title} · ${count}`;
  window.BearCategoryRail = { mount, label };
})();

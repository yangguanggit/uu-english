/* Presentation helpers preserve existing elements, handlers and learning state. */
(() => {
  const observers = new WeakMap();
  function categories(root, selectors) {
    const nodes = selectors.map(selector => root.querySelector(selector)).filter(Boolean);
    if (!nodes.length) return;
    const bar = document.createElement('div');
    bar.className = 'page-categories';
    nodes[0].before(bar);
    bar.append(...nodes);
    const update = () => root.style.setProperty('--category-height', `${Math.ceil(bar.getBoundingClientRect().height)}px`);
    update();
    const previous = observers.get(root);
    previous?.disconnect();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    observers.set(root, observer);
  }
  window.BearPageLayout = { categories };
})();

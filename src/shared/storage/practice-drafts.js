/* Bounded drafts and review validation at the existing per-child journal seam. */
(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    patterns = BEAR_SENTENCE_PATTERNS,
    object = (x) => !!x && typeof x === 'object' && !Array.isArray(x),
    int = (x, max) => Number.isInteger(x) && x >= 0 && x <= max,
    { aspects, validPage } = BearContentReview;
  const validate = G.validate;
  G.validate = (g) => {
    if (!validate(g)) return false;
    if (!g) return true;
    if (g.lab !== undefined) {
      if (!object(g.lab) || !object(g.lab.sentences) || !object(g.lab.roles)) return false;
      if (
        Object.entries(g.lab.sentences).some(([id, v]) => {
          const p = patterns.find((p) => p.id === id);
          return (
            !p ||
            !object(v) ||
            !int(v.choice, p.examples.length - 1) ||
            !Array.isArray(v.order) ||
            v.order.length > p.examples[v.choice].blocks.length ||
            new Set(v.order).size !== v.order.length ||
            v.order.some((i) => !int(i, p.examples[v.choice].blocks.length - 1)) ||
            !Array.isArray(v.completed) ||
            v.completed.length > p.examples.length ||
            new Set(v.completed).size !== v.completed.length ||
            v.completed.some((i) => !int(i, p.examples.length - 1)) ||
            !int(v.attempts, 1000000)
          );
        })
      )
        return false;
      if (
        Object.entries(g.lab.roles).some(
          ([id, v]) =>
            !Object.hasOwn(BEAR_SCENE_BRANCHES, id) ||
            !object(v) ||
            !int(v.path, 1) ||
            !int(v.turn, 3) ||
            !['learner', 'partner', 'done'].includes(v.phase) ||
            (v.phase === 'done') !== (v.turn === 3) ||
            !Array.isArray(v.heard) ||
            new Set(v.heard).size !== v.heard.length ||
            v.heard.some((i) => !int(i, 2) || i > v.turn) ||
            !Array.isArray(v.practiced) ||
            new Set(v.practiced).size !== v.practiced.length ||
            v.practiced.some((i) => !int(i, 2) || i > v.turn),
        )
      )
        return false;
    }
    if (
      g.reviews !== undefined &&
      (!Array.isArray(g.reviews) ||
        g.reviews.length > 6000 ||
        g.reviews.some(
          (x) =>
            !object(x) ||
            !G.resourceValid(x.resource) ||
            !validPage(x.resource, x.page) ||
            !aspects.includes(x.type) ||
            !['pending', 'approved', 'fix'].includes(x.status) ||
            typeof x.note !== 'string' ||
            x.note.length > 300 ||
            !Number.isFinite(x.time) ||
            x.time < 0 ||
            !/^[a-f0-9]{8}$/.test(x.revision),
        ) ||
        new Set(g.reviews.map((x) => JSON.stringify([x.resource, x.page, x.type]))).size !==
          g.reviews.length)
    )
      return false;
    return true;
  };
  function save(kind, id, value) {
    const g = structuredClone(L.get().growth);
    g.lab ||= { sentences: {}, roles: {} };
    g.lab[kind][id] = value;
    if (!G.validate(g)) throw Error('练习记录无效，未保存');
    L.growth('growthLab', { kind, id, value });
  }

  window.BearPracticeDrafts = { save };
})();

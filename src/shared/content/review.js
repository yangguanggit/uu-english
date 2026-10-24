/* Manual review and revision fingerprints; separate from practice completion. */
(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    patterns = BEAR_SENTENCE_PATTERNS,
    int = (x, max) => Number.isInteger(x) && x >= 0 && x <= max,
    aspects = ['audio', 'chinese', 'ipa', 'art', 'other'];
  function resource(key) {
    if (key.startsWith('scene:')) return LITTLE_BEAR_SCENES[key.slice(6)];
    if (key.startsWith('book:')) return BEAR_BOOKS.find((b) => b.id === key.slice(5));
    if (key.startsWith('sentence:')) return patterns.find((p) => p.id === key.slice(9));
    return [
      ...BEAR_FOUNDATIONS.words,
      ...BEAR_FOUNDATIONS.letters,
      ...BEAR_FOUNDATIONS.phonemes,
    ].find((w) => w.id === key.replace(/^phonics:/, ''));
  }
  function validPage(key, page) {
    return (
      page === null ||
      (key.startsWith('book:') && int(page, (resource(key)?.pages.length || 0) - 1))
    );
  }
  function revision(key) {
    const r = resource(key);
    let files = [];
    if (key.startsWith('scene:')) files = G.sceneFiles(key.slice(6));
    else if (key.startsWith('sentence:')) files = r.examples.map((e) => e.file);
    else if (r?.audio) files = [r.audio + '.' + (r.extension || 'wav')];
    else if (r?.pages) files = r.pages.map((p, i) => p[4] || `story-${r.id}-${i}.wav`);
    // Include installed child hashes so replacing a recording invalidates its old approval.
    const voices = (window.BEAR_VOICE_PACKS || []).map((p) => [
      p.id,
      files.map((f) => [f, p.clips?.[f]?.sha256 || f]),
    ]);
    const packageRevision = document.querySelector('meta[name="app-revision"]')?.content || '';
    const text = JSON.stringify([
      packageRevision,
      r,
      key.startsWith('scene:') ? BEAR_SCENE_BRANCHES[key.slice(6)] : null,
      voices,
    ]);
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return (h >>> 0).toString(16).padStart(8, '0');
  }
  function reviewState(resource, page, type, g = L.get().growth) {
    const row = (g.reviews || []).find(
        (x) => x.resource === resource && x.page === page && x.type === type,
      ),
      issues = g.issues.some(
        (x) =>
          x.resource === resource &&
          x.type === type &&
          (x.page === page || x.page === null || page === null),
      ),
      stale = !!row && row.revision !== revision(resource);
    return { row, status: issues ? 'fix' : row && !stale ? row.status : 'pending', stale };
  }
  function review(resource, page, type, status, note = '') {
    if (
      !G.resourceValid(resource) ||
      !validPage(resource, page) ||
      !aspects.includes(type) ||
      !['pending', 'approved', 'fix'].includes(status) ||
      typeof note !== 'string' ||
      note.length > 300
    )
      throw Error('请选择有效内容、页码与审校状态');
    if (
      status === 'approved' &&
      reviewState(resource, page, type).status === 'fix' &&
      L.get().growth.issues.some(
        (x) =>
          x.resource === resource &&
          x.type === type &&
          (x.page === page || x.page === null || page === null),
      )
    )
      throw Error('请先核对并移除该项尚未解决的问题，再确认已审');
    L.growth('growthReview', {
      value: {
        resource,
        page,
        type,
        status,
        note: note.trim(),
        revision: revision(resource),
        time: Date.now(),
      },
    });
  }

  window.BearContentReview = { resource, validPage, revision, reviewState, review, aspects };
})();

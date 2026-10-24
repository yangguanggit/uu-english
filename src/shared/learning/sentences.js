/* Sentence examples contribute their recordings to associated offline scenes. */
(() => {
  'use strict';
  BearGrowth.registerSceneResources((id) => ({
    files: BEAR_SENTENCE_PATTERNS.flatMap((p) =>
      p.examples.filter((e) => e.scene === id).map((e) => e.file),
    ),
  }));
})();

/* Compose the existing learning-extension interface from independent feature owners. */
(() => {
  'use strict';
  Object.assign(BearGrowth, {
    assessmentQuestions: BearAssessment.questions,
    assessment: BearAssessment.open,
    entry: BearAssessment.entry,
    games: BearListeningGames.open,
    startGame: BearListeningGames.start,
    mountReading: BearReadingActivities.mount,
    pauseForReading: BearReadingActivities.pauseForReading,
    restore(key) {
      if (key === 'assessment') BearAssessment.open();
      else if (key === 'assessment-result') BearAssessment.restoreResult();
      else if (key === 'games') BearListeningGames.open();
      else if (key.startsWith('game-')) BearListeningGames.start(key.slice(5));
    },
  });
})();

/* Initiating-role curriculum; shared by practice and offline scene resources. */
(() => {
  'use strict';
  function roleTurns(id, path = 0) {
    const b = BEAR_SCENE_BRANCHES[id],
      p = b.paths[path];
    return [
      { say: b.question, zh: b.zh, reply: p.pick, replyZh: p.zh },
      { say: p.npc, zh: p.npcZh, reply: p.answer, replyZh: p.answerZh },
      {
        say: p.end.replace(/UU/g, 'Mimi'),
        zh: p.endZh.replace(/UU/g, '米米'),
        reply: p.endAnswer,
        replyZh: p.endAnswerZh,
      },
    ];
  }

  BearGrowth.registerSceneResources((id) => ({
    texts: [0, 1].flatMap((path) => roleTurns(id, path).flatMap((t) => [t.say, t.reply])),
  }));
  window.BearRoleplayData = { turns: roleTurns };
})();

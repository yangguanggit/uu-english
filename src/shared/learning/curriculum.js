/* Editorial topic ownership keeps all vocabulary reachable from a learning route. */
(() => {
  const groups={breakfast:['food','drinks','tableware'],park:['toys','positions'],rain:['weather','clothes'],library:['story-words'],seed:['nature'],farm:['farm-animals'],shopping:['fruit','numbers','comparisons'],sea:['sea-animals'],school:['school','art-tools','jobs'],bedtime:['family','home','cleaning','body','time'],bakery:['more-food'],zoo:['animals'],airport:['personal','travel','places','community'],colors:['colors'],vegetables:['vegetables'],sports:['sports','actions','instructions','activities','feelings']};
  Object.assign(groups,{'read-fox-box':['little-objects'],'read-forest-walk':['wildlife'],'read-soup-share':['fresh-food'],'read-aquarium-visit':['outdoor-places'],'read-dress-day':['daily-things']});
  window.BearCurriculum={groups,words(id){const theme=BEAR_LEARNING_THEMES.find(t=>t.id===id);return [...new Map([...(theme?.words||[]).map(t=>BEAR_FOUNDATIONS.words.find(w=>w.text===t)),...BEAR_FOUNDATIONS.words.filter(w=>(groups[id]||[]).includes(w.theme))].filter(Boolean).map(w=>[w.id,w])).values()];}};
})();

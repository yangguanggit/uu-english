(() => {
  const icon = (id) => `<use href="#scene-${id}"/>`;
  const item = (id, en, zh) => ({ id, en, zh, art: icon(id) });
  const art = {
    apple: '<use href="#food-apple"/>', banana: '<use href="#scene-banana"/>', carrot: '<use href="#scene-carrot"/>',
    bus: '<rect x="8" y="22" width="84" height="54" rx="10" fill="#dfbd72"/><path d="M17 32h66v23H17Z" fill="#dceae6"/><path d="M39 32v23m22-23v23" stroke="#b69960" stroke-width="4"/><circle cx="28" cy="76" r="10" fill="#6e786f"/><circle cx="74" cy="76" r="10" fill="#6e786f"/><circle cx="28" cy="76" r="4" fill="#f4e6ca"/><circle cx="74" cy="76" r="4" fill="#f4e6ca"/>',
    bike: '<g fill="none" stroke="#8ba4ae" stroke-width="5"><circle cx="23" cy="70" r="18"/><circle cx="77" cy="70" r="18"/><path d="m23 70 22-38 14 38H23m36 0 14-47m-9 0h15M35 30h19"/></g>',
    boat: '<path d="m9 65 16 22h51l16-22Z" fill="#9bbbc7"/><path d="M48 11v52H15Zm7 11v41h33Z" fill="#f0d194"/>',
    stop: '<rect x="24" y="8" width="52" height="84" rx="15" fill="#707c73"/><circle cx="50" cy="29" r="15" fill="#df8e7d"/><circle cx="50" cy="69" r="15" fill="#9a9f8e"/>',
    go: '<rect x="24" y="8" width="52" height="84" rx="15" fill="#707c73"/><circle cx="50" cy="29" r="15" fill="#9a9f8e"/><circle cx="50" cy="69" r="15" fill="#a1bb86"/>',
    wait: '<rect x="24" y="8" width="52" height="84" rx="15" fill="#707c73"/><circle cx="50" cy="50" r="15" fill="#edca78"/>',
    seed: '<ellipse cx="50" cy="54" rx="22" ry="32" transform="rotate(28 50 54)" fill="#b78c67"/><path d="M60 34Q35 56 45 76" fill="none" stroke="#e1be92" stroke-width="4"/>',
    water: '<path d="M28 37h45v44H28Z" fill="#a0bdc9"/><path d="m28 53-20-9 5 31 17-8" fill="#a0bdc9"/><path d="M72 43q30-14 17 24H73" fill="none" stroke="#83a2b0" stroke-width="6"/><path d="M38 37V22h24v15" fill="none" stroke="#83a2b0" stroke-width="5"/>',
    shovel: '<path d="M47 10h9v52h-9Z" fill="#bea17a"/><path d="M30 52h43q0 30-22 43-23-15-21-43" fill="#a6b6ae"/><rect x="36" y="7" width="31" height="20" rx="6" fill="none" stroke="#b1926d" stroke-width="6"/>',
    sun: '<circle cx="50" cy="50" r="23" fill="#edcd7e"/><path d="M50 4v13m0 66v13M4 50h13m66 0h13M18 18l10 10m44 44 10 10m0-64L72 28M28 72 18 82" stroke="#edcd7e" stroke-width="5" stroke-linecap="round"/>',
    umbrella: '<path d="M50 43v36q0 18-13 8" fill="none" stroke="#a28b73" stroke-width="5" stroke-linecap="round"/><path d="M8 45q42-65 84 0-13-9-28 0-14-9-28 0-14-9-28 0" fill="#b0a1c7"/><path d="M36 44q0-26 14-33 14 7 14 33" fill="none" stroke="#d7cce2" stroke-width="3"/>',
    boots: '<path d="M18 17h24v45l16 9v17H12V66h6Z" fill="#dec177"/><path d="M55 13h24v45l15 9v17H59V66h-4Z" fill="#e8d08f"/><path d="M11 85h47m0-4h37" stroke="#b49757" stroke-width="5"/>',
    cloud: '<path d="M17 64Q-1 42 24 34q4-29 31-16 22-11 29 15 28 7 11 31Z" fill="#b6cad5"/><path d="m28 74-7 13m30-13-7 13m30-13-7 13" stroke="#92b1c2" stroke-width="5" stroke-linecap="round"/>',
    sunglasses: '<path d="M8 36h32v28H16Zm52 0h32l-8 28H60Z" fill="#8eaeac" stroke="#698e8c" stroke-width="4"/><path d="M40 43h20" stroke="#698e8c" stroke-width="5"/>',
    cake: '<path d="M14 49h72v35H14Z" fill="#e3b5a4"/><path d="M14 49q9-13 18 0t18 0 18 0 18 0v10q-9 12-18 0t-18 0-18 0-18 0Z" fill="#fff0d5"/><path d="M50 20v24" stroke="#9cb5ca" stroke-width="7"/><path d="M50 4q-13 15 0 18 13-3 0-18" fill="#e9bd65"/><path d="M8 87h84" stroke="#c6b298" stroke-width="5" stroke-linecap="round"/>',
    gift: '<rect x="15" y="36" width="70" height="53" rx="5" fill="#a7bca0"/><rect x="10" y="29" width="80" height="17" rx="4" fill="#bdcdb3"/><path d="M50 29v60m-3-58Q12 3 27 6q21-4 23 24Q55 0 73 7q13 7-20 24" fill="none" stroke="#eed49b" stroke-width="8"/>',
    candle: '<rect x="37" y="34" width="26" height="57" rx="5" fill="#b2a3cb"/><path d="m39 49 22-7m-22 26 22-7m-22 26 22-7" stroke="#e1d7ec" stroke-width="5"/><path d="M50 6q-23 26 0 28 23-2 0-28" fill="#edc779"/>'
  };
  // The existing banana/carrot symbols are reused directly.
  const symbols = Object.entries(art).filter(([id]) => !['banana','carrot'].includes(id));
  window.LITTLE_BEAR_SYMBOLS += `<svg class="svg-defs" aria-hidden="true"><defs>${symbols.map(([id, content]) => `<symbol id="scene-${id}" viewBox="0 0 100 100">${content}</symbol>`).join('')}</defs></svg>`;
  const bear = `<ellipse cx="375" cy="317" rx="70" ry="10" fill="#58654b20"/><rect x="328" y="208" width="98" height="102" rx="35" fill="#c99a70"/><path d="M338 224h78l15 78H323Z" fill="#f1d58f"/><use href="#bear-head" x="295" y="83" width="160" height="160"/>`;
  const use = (id, x, y, width, height = width) => `<use href="#scene-${id}" x="${x}" y="${y}" width="${width}" height="${height}"/>`;
  const sceneArt = (label, color, background, foreground = '') => `<svg class="kitchen" viewBox="0 0 760 340" role="img" aria-label="${label}"><rect width="760" height="340" fill="${color}"/><path d="M0 270h760v70H0Z" fill="#d9d0b8"/>${background}${bear}${foreground}</svg>`;
  function lesson(config) {
    const scene = { minutes: 7, ...config, encouragement: '勇敢尝试，就是今天的超能力！', thanks: { en:'Thank you, my friend!', zh:'谢谢你，和我一起完成小冒险！' } };
    scene.listen.subtitle = '听英文，再点选对应的小物品';
    scene.listen.success = 'Great job!';
    scene.listen.successZh = '找对啦！下一步，和米米一起开口说。';
    scene.speech.response = 'Great job!';
    scene.speech.responseZh = '谢谢你愿意开口！一起完成这一站的小任务吧。';
    const phrases = [scene.listen.en, scene.speech.en, scene.final.en, ...(scene.final.sequence || []).map(task => task.en), scene.parent.demo];
    scene.audio = [...new Set(phrases)].map((text, i) => [text, `${scene.id}-${i + 1}`]);
    return scene;
  }
  Object.assign(window.LITTLE_BEAR_SCENES, {
    market: lesson({
      id:'market', title:'水果集市小买手', emoji:'🍎', station:'水果集市', theme:'水果 · 数量 · 礼貌购物', sceneLabel:"MIMI'S FRUIT MARKET", greeting:'离开小食堂，去集市给朋友带点水果吧！', subtitle:'听音找苹果，开口说数量，把两个苹果装进篮子。',
      options:[item('apple','Apple','苹果'),item('banana','Banana','香蕉'),item('carrot','Carrot','胡萝卜'),item('cake','Cake','蛋糕')],
      listen:{target:'apple',en:'Find the apple.',zh:'找到红苹果吧。',title:'先找找，哪一个是苹果？',hint:'apple 是苹果，找找圆圆的红色水果。'},
      speech:{en:'Two apples, please.',zh:'请给我两个苹果。',words:['two','apples','please'],title:'买水果，也能说一句英语'},
      final:{kind:'counter',title:'买两个苹果，装进小篮子',en:'Put two apples in the basket.',zh:'点加号放苹果，点减号可以拿出来，装好两个再出发。',target:2,max:5,object:'apple',unit:'个苹果',action:'带好水果，继续冒险',report:'按提示在购物篮中放入两个苹果；有画面数量和中文辅助。'},
      missions:[['🎧','听音认认水果','找到红苹果'],['💬','有礼貌地买水果','练习 Two apples, please.'],['🧺','把两个苹果装好','用加减按钮调整数量']],
      parent:{title:'买水果时数一数',tip:'拿两个苹果，边数 “One, two”，边示范 “Two apples, please.”。',demo:'One, two. Two apples, please. Thank you!'},
      illustration:sceneArt('米米在水果集市选购苹果，篮子里会出现所选数量的苹果','#f2eadb',`<rect x="50" y="79" width="203" height="180" rx="12" fill="#e5c79c"/><path d="M40 78h224V45H40Z" fill="#b5c29e"/><path d="M62 45v33m44-33v33m44-33v33m44-33v33m44-33v33" stroke="#edf0d7" stroke-width="18"/>${use('apple',73,101,72)}${use('banana',158,101,72)}<rect x="64" y="193" width="173" height="49" rx="8" fill="#c39c6f"/>`, `<path d="m498 263 13 59h186l14-59Z" fill="#bca17a"/><path d="M528 260q76-103 153 0" fill="none" stroke="#bca17a" stroke-width="10"/><g id="counter-visual">${[0,1,2,3,4].map(i=>`<g data-count-item="${i + 1}" visibility="hidden">${use('apple',506+i*36,255,44)}</g>`).join('')}</g>`)
    }),
    bus: lesson({
      id:'bus',title:'小巴士出发啦',emoji:'🚌',station:'巴士出行',theme:'交通 · 红绿灯 · 动作指令',sceneLabel:"MIMI'S LITTLE BUS",greeting:'带着水果坐上小巴士，去下一站花园啦！',subtitle:'找到小巴士，认识红绿灯，和米米一起安全出发。',
      options:[item('bus','Bus','巴士'),item('bike','Bike','自行车'),item('boat','Boat','小船'),{id:'car',en:'Car',zh:'汽车',art:icon('car')}],
      finalOptions:[item('stop','Stop','停下来'),item('go','Go','出发'),item('wait','Wait','等一等')],
      listen:{target:'bus',en:'Find the bus.',zh:'找到黄色的小巴士。',title:'去花园，要坐哪辆车？',hint:'bus 是巴士，找找有很多座位的大车。'},
      speech:{en:'On the bus.',zh:'在巴士上。',words:['on','bus'],title:'和米米一起坐上小巴士'},
      final:{kind:'sequence',title:'听听红绿灯的两条小指令',en:'Red light. Stop.',zh:'红灯亮了，先停下来。',sequence:[{id:'stop',en:'Red light. Stop.',zh:'红灯亮了，先停下来。',visual:'bus-stopped'},{id:'go',en:'Green light. Go.',zh:'绿灯亮了，再出发。',visual:'bus-moving'}],options:['stop','go','wait'],action:'安全到站，继续冒险',report:'按英文与画面提示完成红灯停、绿灯行两条指令；这是页面游戏练习。'},
      missions:[['🎧','认认交通工具','听音找到小巴士'],['💬','坐上小巴士','练习 On the bus.'],['🚦','听懂红绿灯指令','先停下来，再出发']],
      parent:{title:'用玩具车玩停和走',tip:'拿玩具车示范 “Stop” 和 “Go”，让孩子听词控制小车，在家里玩就好。',demo:'On the bus. Red light. Stop. Green light. Go.'},
      illustration:sceneArt('米米在巴士站听红绿灯指令，小巴士准备出发','#e8efec',`<rect x="80" y="58" width="115" height="137" rx="15" fill="#d2b78a"/><rect x="91" y="70" width="93" height="109" rx="10" fill="#fff5dc"/>${use('bus',98,82,80)}<path d="M137 194v89" stroke="#b29a78" stroke-width="10"/><path d="M0 307h760" stroke="#f8f0d8" stroke-width="5" stroke-dasharray="34 22"/>`,`${use('bus',494,208,204,115)}<g id="bus-stopped" visibility="hidden">${use('stop',218,158,58,94)}</g><g id="bus-moving" visibility="hidden"><rect x="215" y="154" width="65" height="102" rx="14" fill="#e8efec"/>${use('go',218,158,58,94)}<path d="M491 277h-30m30 14h-43" stroke="#91aa7e" stroke-width="5" stroke-linecap="round"/></g>`)
    }),
    garden: lesson({
      id:'garden',title:'种子花园小园丁',emoji:'🌱',station:'种植花园',theme:'自然 · 动作 · 生命观察',sceneLabel:"MIMI'S GROWING GARDEN",greeting:'巴士到站啦！把小种子种进花园，照顾它慢慢长大。',subtitle:'找找小种子，先种下再浇水，看看绿芽冒出来。',
      options:[item('seed','Seed','种子'),item('water','Watering can','小水壶'),item('shovel','Shovel','小铲子'),item('sun','Sun','太阳')],
      listen:{target:'seed',en:'Find the seed.',zh:'找找小小的种子。',title:'什么能长成一株小植物？',hint:'seed 是种子，找找小小的棕色种子。'},
      speech:{en:'Grow, little seed!',zh:'长大吧，小种子！',words:['grow','seed'],title:'给小种子一句英语鼓励'},
      final:{kind:'sequence',title:'先种种子，再给它浇浇水',en:'Plant the seed.',zh:'先选种子，把它种进土里。',sequence:[{id:'seed',en:'Plant the seed.',zh:'先选种子，把它种进土里。',visual:'garden-seed'},{id:'water',en:'Water the seed.',zh:'再选小水壶，给种子浇浇水。',visual:'garden-sprout'}],options:['seed','water','shovel'],action:'照顾好绿芽，继续冒险',report:'依次完成种种子、浇水两步，页面展示发芽反馈；真实植物需要时间生长。'},
      missions:[['🎧','找到一颗小种子','听音认识 seed'],['💬','为种子加加油','练习 Grow, little seed!'],['🌿','完成两步种植','先种下，再浇水']],
      parent:{title:'照顾一盆真实的小绿植',tip:'和孩子一起浇水时说 “Water the plant”，每天观察一点变化，不着急等它长大。',demo:'Plant the seed. Water the seed. Grow, little seed!'},
      illustration:sceneArt('米米在花园种下种子、浇水，小绿芽慢慢出现','#e9efdf',`<circle cx="154" cy="64" r="31" fill="#f0d68c"/><path d="M0 246q150-65 310 0t450 0v94H0Z" fill="#bbcba4"/>${use('water',590,200,105)}${use('shovel',675,221,67)}`,`<g transform="translate(-420 0)"><path d="m500 260 20 67h143l20-67Z" fill="#cca185"/><rect x="492" y="252" width="199" height="19" rx="8" fill="#deb796"/><ellipse cx="590" cy="252" rx="82" ry="10" fill="#987957"/><g id="garden-seed" visibility="hidden">${use('seed',567,220,43)}</g><g id="garden-sprout" visibility="hidden"><path d="M590 252v-62m0 31q-54-12-43-39 39-4 43 39m0-16q1-49 40-45 14 30-40 45" fill="#91ae7d" stroke="#789762" stroke-width="5"/><path d="m545 210-8 15m96-21 7 15" stroke="#a7c9d1" stroke-width="5" stroke-linecap="round"/></g></g>`)
    }),
    weather: lesson({
      id:'weather',title:'雨天出门准备站',emoji:'☔',station:'雨天出行',theme:'天气 · 雨具 · 日常准备',sceneLabel:"MIMI'S RAINY DAY",greeting:'花园下起小雨啦，帮米米准备好雨具再出发。',subtitle:'听听雨天怎么说，带上雨伞，穿好小雨靴。',
      options:[item('umbrella','Umbrella','雨伞'),item('boots','Boots','雨靴'),item('sun','Sun','太阳'),item('sunglasses','Sunglasses','太阳镜')],
      listen:{target:'umbrella',en:'Find the umbrella.',zh:'下雨了，找到一把雨伞吧。',title:'雨天带什么，才能挡住小雨点？',hint:'umbrella 是雨伞，找找能撑开挡雨的物品。'},
      speech:{en:'It is raining.',zh:'正在下雨。',words:['raining'],title:'告诉米米，现在是什么天气'},
      final:{kind:'sequence',title:'给米米准备两样雨天装备',en:'Take your umbrella.',zh:'先拿好雨伞。',sequence:[{id:'umbrella',en:'Take your umbrella.',zh:'先拿好雨伞。',visual:'weather-umbrella'},{id:'boots',en:'Put on your boots.',zh:'再穿上雨靴。',visual:'weather-boots'}],options:['umbrella','boots','sunglasses'],action:'准备好雨具，继续冒险',report:'按提示选择雨伞和雨靴，完成雨天出门准备；有中文与图像辅助。'},
      missions:[['🎧','认认挡雨小帮手','听音找到雨伞'],['💬','说说今天的天气','练习 It is raining.'],['☔','准备雨天装备','拿雨伞，再穿雨靴']],
      parent:{title:'一起看看窗外的天气',tip:'下雨时指着窗外示范 “It is raining.”，拿雨伞时说 “Umbrella”，和生活动作连起来。',demo:'It is raining. Take your umbrella. Put on your boots.'},
      illustration:sceneArt('米米站在窗边，外面下着雨，等待拿伞和穿雨靴','#e9e9ef',`<rect x="55" y="47" width="185" height="177" rx="15" fill="#c4b49c"/><rect x="67" y="59" width="161" height="153" rx="9" fill="#cbdce2"/>${use('cloud',98,72,98)}<path d="m91 162-8 17m42-17-8 17m42-17-8 17m42-17-8 17" stroke="#91afbd" stroke-width="4" stroke-linecap="round"/><path d="M149 60v152m-82-64h161" stroke="#ede5d3" stroke-width="6"/><ellipse cx="379" cy="317" rx="96" ry="14" fill="#c1c0ce"/>`,`<g id="weather-umbrella" visibility="hidden">${use('umbrella',219,124,103,145)}</g><g id="weather-boots" visibility="hidden">${use('boots',330,262,98,73)}</g>`)
    }),
    birthday: lesson({
      id:'birthday',title:'生日派对小帮手',emoji:'🎂',station:'生日派对',theme:'祝福 · 数数 · 生日布置',sceneLabel:"MIMI'S BIRTHDAY PARTY",greeting:'雨停啦，最后一起去朋友的生日派对，说一句暖暖的祝福！',subtitle:'找到生日蛋糕，说句生日快乐，再摆好三根蜡烛。',
      options:[item('cake','Cake','蛋糕'),item('gift','Gift','礼物'),item('candle','Candle','蜡烛'),{id:'ball',en:'Ball',zh:'皮球',art:icon('ball')}],
      listen:{target:'cake',en:'Find the cake.',zh:'生日蛋糕在哪里？',title:'生日派对少不了哪份美味？',hint:'cake 是蛋糕，找找有奶油的生日点心。'},
      speech:{en:'Happy birthday!',zh:'生日快乐！',words:['happy','birthday'],title:'送给朋友一句英语祝福'},
      final:{kind:'counter',title:'给生日蛋糕摆上三根蜡烛',en:'Put three candles on the cake.',zh:'点加号摆蜡烛，点减号可以调整，准备好三根再庆祝。',target:3,max:5,object:'candle',unit:'根蜡烛',action:'送上生日祝福，完成这一站',report:'根据英文、数量与画面提示，在蛋糕上摆好三根虚拟蜡烛。'},
      missions:[['🎧','找到生日蛋糕','听音认识 cake'],['💬','送上一句生日祝福','练习 Happy birthday!'],['🕯️','一起数到三','摆好三根虚拟蜡烛']],
      parent:{title:'把祝福送给喜欢的人',tip:'和孩子给玩偶办一个小派对，说 “Happy birthday!”，用画出来的蜡烛练习数数。',demo:'One, two, three. Happy birthday!'},
      illustration:sceneArt('米米在温暖的生日派对上为蛋糕摆放三根虚拟蜡烛','#f2e6e4',`<path d="M35 47q330 65 690 0" fill="none" stroke="#c6b4a1" stroke-width="3"/><path d="m70 53 16 38 25-32m37 5 18 38 22-34m43 4 18 38 24-36m43 3 20 38 22-38m43 0 20 37 22-40m45-4 20 36 20-41m45-7 20 35 20-43" fill="#d7b5b2"/><ellipse cx="640" cy="177" rx="32" ry="42" fill="#c4b0d1"/><path d="M640 219v74" stroke="#bca794" stroke-width="2"/>${use('gift',588,236,98)}`,`<g transform="translate(-400 0)"><rect x="483" y="282" width="235" height="15" rx="7" fill="#c5aa8f"/><rect x="506" y="238" width="188" height="45" rx="8" fill="#dbb2a6"/><path d="M506 239q16-16 31 0t31 0 31 0 31 0 31 0 33 0v15H506Z" fill="#fff1d9"/><g id="counter-visual">${[0,1,2,3,4].map(i=>`<g data-count-item="${i+1}" visibility="hidden">${use('candle',516+i*34,189,35,59)}</g>`).join('')}</g></g>`)
    })
  });
  // Single source for the visible route, station numbers and every next-station action.
  window.LITTLE_BEAR_ROUTE = ['breakfast','park','wardrobe','toys','animals','market','bus','garden','weather','birthday'];
})();

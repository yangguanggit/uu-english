(() => {
  const themes=[
  [
    "food",
    "食物",
    "🍞",
    [
      [
        "apple",
        "苹果",
        "🍎"
      ],
      [
        "milk",
        "牛奶",
        "🥛"
      ],
      [
        "bread",
        "面包",
        "🍞"
      ],
      [
        "egg",
        "鸡蛋",
        "🥚"
      ],
      [
        "banana",
        "香蕉",
        "🍌"
      ],
      [
        "water",
        "水",
        "💧"
      ],
      [
        "rice",
        "米饭",
        "🍚"
      ],
      [
        "noodles",
        "面条",
        "🍜"
      ],
      [
        "chicken",
        "鸡肉",
        "🍗"
      ],
      [
        "soup",
        "汤",
        "🍲"
      ],
      [
        "cake",
        "蛋糕",
        "🍰"
      ],
      [
        "sandwich",
        "三明治",
        "🥪"
      ]
    ]
  ],
  [
    "animals",
    "动物",
    "🐰",
    [
      [
        "rabbit",
        "兔子",
        "🐰"
      ],
      [
        "cat",
        "猫",
        "🐱"
      ],
      [
        "dog",
        "狗",
        "🐶"
      ],
      [
        "bird",
        "鸟",
        "🐦"
      ],
      [
        "monkey",
        "猴子",
        "🐒"
      ],
      [
        "panda",
        "熊猫",
        "🐼"
      ],
      [
        "elephant",
        "大象",
        "🐘"
      ],
      [
        "tiger",
        "老虎",
        "🐯"
      ],
      [
        "lion",
        "狮子",
        "🦁"
      ],
      [
        "duck",
        "鸭子",
        "🦆"
      ],
      [
        "horse",
        "马",
        "🐴"
      ],
      [
        "sheep",
        "绵羊",
        "🐑"
      ]
    ]
  ],
  [
    "home",
    "家里",
    "🏡",
    [
      [
        "bed",
        "床",
        "🛏️"
      ],
      [
        "chair",
        "椅子",
        "🪑"
      ],
      [
        "door",
        "门",
        "🚪"
      ],
      [
        "hat",
        "帽子",
        "👒"
      ],
      [
        "shoes",
        "鞋子",
        "👟"
      ],
      [
        "ball",
        "皮球",
        "⚽"
      ],
      [
        "table",
        "桌子",
        "🪑"
      ],
      [
        "window",
        "窗户",
        "🪟"
      ],
      [
        "sofa",
        "沙发",
        "🛋️"
      ],
      [
        "lamp",
        "灯",
        "💡"
      ],
      [
        "clock",
        "时钟",
        "🕒"
      ],
      [
        "key",
        "钥匙",
        "🔑"
      ]
    ]
  ],
  [
    "school",
    "学校",
    "🏫",
    [
      [
        "book",
        "书",
        "📖"
      ],
      [
        "pencil",
        "铅笔",
        "✏️"
      ],
      [
        "bag",
        "包",
        "🎒"
      ],
      [
        "ruler",
        "尺子",
        "📏"
      ],
      [
        "teacher",
        "老师",
        "🧑‍🏫"
      ],
      [
        "friend",
        "朋友",
        "🧒"
      ],
      [
        "pen",
        "钢笔",
        "🖊️"
      ],
      [
        "eraser",
        "橡皮",
        "🧽"
      ],
      [
        "desk",
        "课桌",
        "🪑"
      ],
      [
        "school",
        "学校",
        "🏫"
      ],
      [
        "notebook",
        "笔记本",
        "📓"
      ],
      [
        "crayon",
        "蜡笔",
        "🖍️"
      ]
    ]
  ],
  [
    "travel",
    "出行",
    "🚌",
    [
      [
        "bus",
        "公交车",
        "🚌"
      ],
      [
        "train",
        "火车",
        "🚆"
      ],
      [
        "ticket",
        "车票",
        "🎫"
      ],
      [
        "map",
        "地图",
        "🗺️"
      ],
      [
        "bike",
        "自行车",
        "🚲"
      ],
      [
        "boat",
        "船",
        "⛵"
      ],
      [
        "car",
        "汽车",
        "🚗"
      ],
      [
        "taxi",
        "出租车",
        "🚕"
      ],
      [
        "plane",
        "飞机",
        "✈️"
      ],
      [
        "subway",
        "地铁",
        "🚇"
      ],
      [
        "truck",
        "卡车",
        "🚚"
      ],
      [
        "helicopter",
        "直升机",
        "🚁"
      ]
    ]
  ],
  [
    "nature",
    "自然",
    "🌱",
    [
      [
        "tree",
        "树",
        "🌳"
      ],
      [
        "flower",
        "花",
        "🌼"
      ],
      [
        "sun",
        "太阳",
        "☀️"
      ],
      [
        "rain",
        "雨",
        "🌧️"
      ],
      [
        "seed",
        "种子",
        "🌱"
      ],
      [
        "leaf",
        "叶子",
        "🍃"
      ],
      [
        "moon",
        "月亮",
        "🌙"
      ],
      [
        "star",
        "星星",
        "⭐"
      ],
      [
        "river",
        "河流",
        "🏞️"
      ],
      [
        "mountain",
        "山",
        "⛰️"
      ],
      [
        "sea",
        "大海",
        "🌊"
      ],
      [
        "grass",
        "草",
        "🌿"
      ]
    ]
  ],
  [
    "fruit",
    "水果",
    "🍓",
    [
      [
        "orange",
        "橙子",
        "🍊"
      ],
      [
        "pear",
        "梨",
        "🍐"
      ],
      [
        "peach",
        "桃子",
        "🍑"
      ],
      [
        "grape",
        "葡萄",
        "🍇"
      ],
      [
        "strawberry",
        "草莓",
        "🍓"
      ],
      [
        "watermelon",
        "西瓜",
        "🍉"
      ],
      [
        "lemon",
        "柠檬",
        "🍋"
      ],
      [
        "pineapple",
        "菠萝",
        "🍍"
      ],
      [
        "cherry",
        "樱桃",
        "🍒"
      ],
      [
        "mango",
        "芒果",
        "🥭"
      ],
      [
        "kiwi",
        "猕猴桃",
        "🥝"
      ],
      [
        "coconut",
        "椰子",
        "🥥"
      ]
    ]
  ],
  [
    "vegetables",
    "蔬菜",
    "🥦",
    [
      [
        "carrot",
        "胡萝卜",
        "🥕"
      ],
      [
        "potato",
        "土豆",
        "🥔"
      ],
      [
        "tomato",
        "番茄",
        "🍅"
      ],
      [
        "corn",
        "玉米",
        "🌽"
      ],
      [
        "onion",
        "洋葱",
        "🧅"
      ],
      [
        "cucumber",
        "黄瓜",
        "🥒"
      ],
      [
        "broccoli",
        "西兰花",
        "🥦"
      ],
      [
        "cabbage",
        "卷心菜",
        "🥬"
      ],
      [
        "pumpkin",
        "南瓜",
        "🎃"
      ],
      [
        "mushroom",
        "蘑菇",
        "🍄"
      ],
      [
        "peas",
        "豌豆",
        "🫛"
      ],
      [
        "pepper",
        "甜椒",
        "🫑"
      ]
    ]
  ],
  [
    "drinks",
    "饮品点心",
    "🧃",
    [
      [
        "juice",
        "果汁",
        "🧃"
      ],
      [
        "tea",
        "茶",
        "🍵"
      ],
      [
        "yogurt",
        "酸奶",
        "🥛"
      ],
      [
        "cheese",
        "奶酪",
        "🧀"
      ],
      [
        "cookie",
        "曲奇饼干",
        "🍪"
      ],
      [
        "chocolate",
        "巧克力",
        "🍫"
      ],
      [
        "ice cream",
        "冰淇淋",
        "🍦"
      ],
      [
        "pancake",
        "薄煎饼",
        "🥞"
      ],
      [
        "honey",
        "蜂蜜",
        "🍯"
      ],
      [
        "popcorn",
        "爆米花",
        "🍿"
      ],
      [
        "toast",
        "吐司",
        "🍞"
      ],
      [
        "candy",
        "糖果",
        "🍬"
      ]
    ]
  ],
  [
    "body",
    "身体",
    "🖐️",
    [
      [
        "head",
        "头",
        "👤"
      ],
      [
        "hair",
        "头发",
        "💇"
      ],
      [
        "eye",
        "眼睛",
        "👁️"
      ],
      [
        "ear",
        "耳朵",
        "👂"
      ],
      [
        "nose",
        "鼻子",
        "👃"
      ],
      [
        "mouth",
        "嘴巴",
        "👄"
      ],
      [
        "tooth",
        "牙齿",
        "🦷"
      ],
      [
        "hand",
        "手",
        "🖐️"
      ],
      [
        "arm",
        "手臂",
        "💪"
      ],
      [
        "leg",
        "腿",
        "🦵"
      ],
      [
        "foot",
        "脚",
        "🦶"
      ],
      [
        "knee",
        "膝盖",
        "🦵"
      ]
    ]
  ],
  [
    "family",
    "家人",
    "👨‍👩‍👧",
    [
      [
        "mother",
        "妈妈",
        "👩"
      ],
      [
        "father",
        "爸爸",
        "👨"
      ],
      [
        "sister",
        "姐妹",
        "👧"
      ],
      [
        "brother",
        "兄弟",
        "👦"
      ],
      [
        "grandmother",
        "奶奶或外婆",
        "👵"
      ],
      [
        "grandfather",
        "爷爷或外公",
        "👴"
      ],
      [
        "baby",
        "宝宝",
        "👶"
      ],
      [
        "family",
        "家人",
        "👨‍👩‍👧"
      ],
      [
        "aunt",
        "姑姑或阿姨",
        "👩"
      ],
      [
        "uncle",
        "叔叔或舅舅",
        "👨"
      ],
      [
        "cousin",
        "堂兄弟姐妹或表兄弟姐妹",
        "🧒"
      ],
      [
        "parents",
        "父母",
        "👨‍👩‍👧"
      ]
    ]
  ],
  [
    "clothes",
    "衣服",
    "👕",
    [
      [
        "shirt",
        "衬衫",
        "👔"
      ],
      [
        "T-shirt",
        "T恤",
        "👕"
      ],
      [
        "dress",
        "连衣裙",
        "👗"
      ],
      [
        "skirt",
        "半身裙",
        "👗"
      ],
      [
        "pants",
        "裤子",
        "👖"
      ],
      [
        "shorts",
        "短裤",
        "🩳"
      ],
      [
        "socks",
        "袜子",
        "🧦"
      ],
      [
        "coat",
        "外套",
        "🧥"
      ],
      [
        "jacket",
        "夹克",
        "🧥"
      ],
      [
        "scarf",
        "围巾",
        "🧣"
      ],
      [
        "gloves",
        "手套",
        "🧤"
      ],
      [
        "boots",
        "靴子",
        "🥾"
      ]
    ]
  ],
  [
    "colors",
    "颜色形状",
    "🎨",
    [
      [
        "red",
        "红色",
        "🔴"
      ],
      [
        "blue",
        "蓝色",
        "🔵"
      ],
      [
        "yellow",
        "黄色",
        "🟡"
      ],
      [
        "green",
        "绿色",
        "🟢"
      ],
      [
        "brown",
        "棕色",
        "🟤"
      ],
      [
        "purple",
        "紫色",
        "🟣"
      ],
      [
        "pink",
        "粉色",
        "🌸"
      ],
      [
        "white",
        "白色",
        "⚪"
      ],
      [
        "black",
        "黑色",
        "⚫"
      ],
      [
        "circle",
        "圆形",
        "⭕"
      ],
      [
        "square",
        "正方形",
        "🟦"
      ],
      [
        "triangle",
        "三角形",
        "🔺"
      ]
    ]
  ],
  [
    "numbers",
    "数字",
    "🔢",
    [
      [
        "one",
        "一",
        "1️⃣"
      ],
      [
        "two",
        "二",
        "2️⃣"
      ],
      [
        "three",
        "三",
        "3️⃣"
      ],
      [
        "four",
        "四",
        "4️⃣"
      ],
      [
        "five",
        "五",
        "5️⃣"
      ],
      [
        "six",
        "六",
        "6️⃣"
      ],
      [
        "seven",
        "七",
        "7️⃣"
      ],
      [
        "eight",
        "八",
        "8️⃣"
      ],
      [
        "nine",
        "九",
        "9️⃣"
      ],
      [
        "ten",
        "十",
        "🔟"
      ],
      [
        "eleven",
        "十一",
        "🔢"
      ],
      [
        "twelve",
        "十二",
        "🔢"
      ]
    ]
  ],
  [
    "weather",
    "天气季节",
    "🌈",
    [
      [
        "sunny",
        "晴朗的",
        "☀️"
      ],
      [
        "rainy",
        "下雨的",
        "🌧️"
      ],
      [
        "cloudy",
        "多云的",
        "☁️"
      ],
      [
        "windy",
        "有风的",
        "🌬️"
      ],
      [
        "hot",
        "热的",
        "🥵"
      ],
      [
        "cold",
        "冷的",
        "🥶"
      ],
      [
        "snow",
        "雪",
        "❄️"
      ],
      [
        "rainbow",
        "彩虹",
        "🌈"
      ],
      [
        "spring",
        "春天",
        "🌸"
      ],
      [
        "summer",
        "夏天",
        "🏖️"
      ],
      [
        "autumn",
        "秋天",
        "🍂"
      ],
      [
        "winter",
        "冬天",
        "⛄"
      ]
    ]
  ],
  [
    "actions",
    "日常动作",
    "🏃",
    [
      [
        "eat",
        "吃",
        "🍽️"
      ],
      [
        "drink",
        "喝",
        "🥤"
      ],
      [
        "sleep",
        "睡觉",
        "😴"
      ],
      [
        "wake up",
        "醒来",
        "⏰"
      ],
      [
        "wash",
        "洗",
        "🧼"
      ],
      [
        "brush",
        "刷",
        "🪥"
      ],
      [
        "walk",
        "走路",
        "🚶"
      ],
      [
        "run",
        "跑步",
        "🏃"
      ],
      [
        "jump",
        "跳",
        "🤸"
      ],
      [
        "read",
        "阅读",
        "📖"
      ],
      [
        "write",
        "写字",
        "✍️"
      ],
      [
        "draw",
        "画画",
        "🎨"
      ]
    ]
  ],
  [
    "feelings",
    "感受礼貌",
    "😊",
    [
      [
        "happy",
        "开心的",
        "😊"
      ],
      [
        "sad",
        "难过的",
        "😢"
      ],
      [
        "angry",
        "生气的",
        "😠"
      ],
      [
        "tired",
        "累的",
        "🥱"
      ],
      [
        "hungry",
        "饿的",
        "🍽️"
      ],
      [
        "thirsty",
        "渴的",
        "🥤"
      ],
      [
        "scared",
        "害怕的",
        "😨"
      ],
      [
        "excited",
        "兴奋的",
        "🤩"
      ],
      [
        "hello",
        "你好",
        "👋"
      ],
      [
        "goodbye",
        "再见",
        "👋"
      ],
      [
        "please",
        "请",
        "🙏"
      ],
      [
        "thank you",
        "谢谢",
        "💐"
      ]
    ]
  ],
  [
    "places",
    "生活场所",
    "🏥",
    [
      [
        "park",
        "公园",
        "🏞️"
      ],
      [
        "hospital",
        "医院",
        "🏥"
      ],
      [
        "library",
        "图书馆",
        "📚"
      ],
      [
        "zoo",
        "动物园",
        "🦒"
      ],
      [
        "airport",
        "机场",
        "🛫"
      ],
      [
        "station",
        "车站",
        "🚉"
      ],
      [
        "supermarket",
        "超市",
        "🛒"
      ],
      [
        "restaurant",
        "餐厅",
        "🍽️"
      ],
      [
        "playground",
        "游乐场",
        "🛝"
      ],
      [
        "bathroom",
        "浴室",
        "🛁"
      ],
      [
        "kitchen",
        "厨房",
        "🍳"
      ],
      [
        "bedroom",
        "卧室",
        "🛏️"
      ]
    ]
  ]
];
  themes.push(
    ["toys", "玩具游戏", "🧸", [
      ["teddy", "泰迪熊", "🧸"],
      ["doll", "玩偶", "🪆"],
      ["blocks", "积木", "🧱"],
      ["robot", "机器人", "🤖"],
      ["kite", "风筝", "🪁"],
      ["balloon", "气球", "🎈"],
      ["puzzle", "拼图", "🧩"],
      ["drum", "鼓", "🥁"],
      ["yo-yo", "悠悠球", "🪀"],
      ["marbles", "弹珠", "🔮"],
      ["puppet", "手偶", "🎭"],
      ["rocket", "火箭", "🚀"]
    ]],
    ["tableware", "餐具用品", "🥣", [
      ["bowl", "碗", "🥣"],
      ["plate", "盘子", "🍽️"],
      ["cup", "杯子", "☕"],
      ["glass", "玻璃杯", "🥛"],
      ["spoon", "勺子", "🥄"],
      ["fork", "叉子", "🍴"],
      ["chopsticks", "筷子", "🥢"],
      ["napkin", "餐巾", "🧻"],
      ["bottle", "瓶子", "🍼"],
      ["lunch box", "午餐盒", "🍱"],
      ["tray", "托盘", "🍽️"],
      ["teapot", "茶壶", "🫖"]
    ]],
    ["cleaning", "洗漱清洁", "🪥", [
      ["soap", "肥皂", "🧼"],
      ["towel", "毛巾", "🧺"],
      ["toothbrush", "牙刷", "🪥"],
      ["toothpaste", "牙膏", "🪥"],
      ["comb", "梳子", "🪮"],
      ["mirror", "镜子", "🪞"],
      ["shower", "淋浴", "🚿"],
      ["bathtub", "浴缸", "🛁"],
      ["tissue", "纸巾", "🧻"],
      ["sponge", "海绵", "🧽"],
      ["basket", "篮子", "🧺"],
      ["sink", "洗手池", "🚰"]
    ]],
    ["positions", "方位位置", "🧭", [
      ["in", "在里面", "📥"],
      ["on", "在上面", "🔝"],
      ["under", "在下面", "⬇️"],
      ["behind", "在后面", "🫣"],
      ["beside", "在旁边", "↔️"],
      ["between", "在中间", "↔️"],
      ["near", "在附近", "📍"],
      ["far", "远的", "🔭"],
      ["inside", "在内部", "📦"],
      ["outside", "在外面", "🏞️"],
      ["up", "向上", "⬆️"],
      ["down", "向下", "⬇️"]
    ]],
    ["jobs", "职业人物", "🧑‍🚒", [
      ["doctor", "医生", "🧑‍⚕️"],
      ["nurse", "护士", "👩‍⚕️"],
      ["farmer", "农民", "🧑‍🌾"],
      ["driver", "司机", "🧑‍✈️"],
      ["cook", "厨师", "🧑‍🍳"],
      ["firefighter", "消防员", "🧑‍🚒"],
      ["police officer", "警察", "👮"],
      ["dentist", "牙医", "🦷"],
      ["pilot", "飞行员", "🧑‍✈️"],
      ["artist", "画家", "🧑‍🎨"],
      ["singer", "歌手", "🧑‍🎤"],
      ["worker", "工人", "👷"]
    ]],
    ["sports", "运动活动", "🏀", [
      ["soccer", "足球", "⚽"],
      ["basketball", "篮球", "🏀"],
      ["tennis", "网球", "🎾"],
      ["badminton", "羽毛球", "🏸"],
      ["swimming", "游泳", "🏊"],
      ["skating", "滑冰", "⛸️"],
      ["dancing", "跳舞", "💃"],
      ["cycling", "骑自行车", "🚴"],
      ["running", "跑步", "🏃"],
      ["climbing", "攀爬", "🧗"],
      ["kicking", "踢球", "⚽"],
      ["catching", "接球", "🤲"]
    ]]
  );
  const extra=window.BEAR_EXTRA_CONTENT;
  if(extra)themes.push(...extra.themes.map(([id,title,emoji,rows])=>[id,title,emoji,rows.map(([en,zh,pic])=>[en,zh,pic])]));
  const corrections={sister:'姐姐或妹妹',brother:'哥哥或弟弟',parents:'爸爸妈妈',cookie:'饼干',pancake:'煎饼'};
  themes.forEach(t=>t[3].forEach(row=>{if(corrections[row[0]])row[1]=corrections[row[0]];}));
  const themeSections=extra?.wordSections||[["认识自己", ["family", "body", "clothes", "feelings"]], ["在家生活", ["home", "cleaning", "toys", "food", "fruit", "vegetables", "drinks", "tableware"]], ["学习与表达", ["school", "colors", "numbers", "positions", "actions", "sports"]], ["探索世界", ["animals", "nature", "weather", "travel", "places", "jobs"]]];
  const themeOrder=themeSections.flatMap(([,ids])=>ids);
  themes.sort((a,b)=>themeOrder.indexOf(a[0])-themeOrder.indexOf(b[0]));
  const phonemes=[
    ['i','see','看见','嘴角轻轻展开，舌头向前抬高。'],['ɪ','fish','鱼','嘴巴放松，发一个轻短的音。'],['ɛ','egg','鸡蛋','下巴稍放低，嘴巴自然打开。'],['æ','apple','苹果','嘴巴张大一些，舌头靠前。'],['ə','about','关于','嘴巴放松，听 about 开头的轻音。'],['ʌ','sun','太阳','嘴巴自然张开，发音短而清楚。'],['ʊ','book','书','嘴唇轻轻圆起，发一个短音。'],['u','blue','蓝色','嘴唇圆起，舌头向后抬高。'],
    ['p','pen','钢笔','双唇合上，再轻轻放开送气。'],['b','ball','皮球','双唇合上再放开，感受声带振动。'],['t','ten','十','舌尖轻碰上齿龈，再放开。'],['d','dog','狗','舌尖轻碰上齿龈，带着声音放开。'],['k','cat','猫','舌头后部抬起，再放开气流。'],['ɡ','go','走','舌头后部抬起，带着声音放开。'],['f','fish','鱼','上牙轻碰下唇，让气流通过。'],['v','van','厢式车','上牙轻碰下唇，感受声带振动。'],['s','sun','太阳','牙齿稍靠近，让气流从中间通过。'],['z','zoo','动物园','像 s 一样送气，同时让声带振动。'],['h','hat','帽子','嘴巴放松，轻轻呼出气流。'],['m','milk','牛奶','双唇合上，让声音从鼻腔出来。'],['n','nose','鼻子','舌尖碰上齿龈，让声音从鼻腔出来。'],['l','leaf','叶子','舌尖轻碰上齿龈，让气流从两侧通过。'],['θ','three','三','舌尖轻放在上下牙之间，轻轻送气。'],['ʃ','ship','轮船','嘴唇稍圆，让气流轻轻摩擦。']
  ];
  // Broad General American IPA; sources and editorial choices: WORD-IPA-CREDITS.txt.
  const wordIPA={
  "apple": "/ˈæpəl/",
  "milk": "/mɪlk/",
  "bread": "/brɛd/",
  "egg": "/ɛɡ/",
  "banana": "/bəˈnænə/",
  "water": "/ˈwɔtɝ/",
  "rice": "/raɪs/",
  "noodles": "/ˈnudəlz/",
  "chicken": "/ˈtʃɪkən/",
  "soup": "/sup/",
  "cake": "/keɪk/",
  "sandwich": "/ˈsændwɪtʃ/",
  "rabbit": "/ˈræbɪt/",
  "cat": "/kæt/",
  "dog": "/dɔɡ/",
  "bird": "/bɝd/",
  "monkey": "/ˈmʌŋki/",
  "panda": "/ˈpændə/",
  "elephant": "/ˈɛləfənt/",
  "tiger": "/ˈtaɪɡɝ/",
  "lion": "/ˈlaɪən/",
  "duck": "/dʌk/",
  "horse": "/hɔrs/",
  "sheep": "/ʃip/",
  "bed": "/bɛd/",
  "chair": "/tʃɛr/",
  "door": "/dɔr/",
  "hat": "/hæt/",
  "shoes": "/ʃuz/",
  "ball": "/bɔl/",
  "table": "/ˈteɪbəl/",
  "window": "/ˈwɪndoʊ/",
  "sofa": "/ˈsoʊfə/",
  "lamp": "/læmp/",
  "clock": "/klɑk/",
  "key": "/ki/",
  "book": "/bʊk/",
  "pencil": "/ˈpɛnsəl/",
  "bag": "/bæɡ/",
  "ruler": "/ˈrulɝ/",
  "teacher": "/ˈtitʃɝ/",
  "friend": "/frɛnd/",
  "pen": "/pɛn/",
  "eraser": "/ɪˈreɪsɝ/",
  "desk": "/dɛsk/",
  "school": "/skul/",
  "notebook": "/ˈnoʊtˌbʊk/",
  "crayon": "/ˈkreɪɑn/",
  "bus": "/bʌs/",
  "train": "/treɪn/",
  "ticket": "/ˈtɪkɪt/",
  "map": "/mæp/",
  "bike": "/baɪk/",
  "boat": "/boʊt/",
  "car": "/kɑr/",
  "taxi": "/ˈtæksi/",
  "plane": "/pleɪn/",
  "subway": "/ˈsʌbˌweɪ/",
  "truck": "/trʌk/",
  "helicopter": "/ˈhɛlɪˌkɑptɝ/",
  "tree": "/tri/",
  "flower": "/ˈflaʊɝ/",
  "sun": "/sʌn/",
  "rain": "/reɪn/",
  "seed": "/sid/",
  "leaf": "/lif/",
  "moon": "/mun/",
  "star": "/stɑr/",
  "river": "/ˈrɪvɝ/",
  "mountain": "/ˈmaʊntən/",
  "sea": "/si/",
  "grass": "/ɡræs/",
  "orange": "/ˈɔrɪndʒ/",
  "pear": "/pɛr/",
  "peach": "/pitʃ/",
  "grape": "/ɡreɪp/",
  "strawberry": "/ˈstrɔˌbɛri/",
  "watermelon": "/ˈwɔtɝˌmɛlən/",
  "lemon": "/ˈlɛmən/",
  "pineapple": "/ˈpaɪnˌæpəl/",
  "cherry": "/ˈtʃɛri/",
  "mango": "/ˈmæŋɡoʊ/",
  "kiwi": "/ˈkiwi/",
  "coconut": "/ˈkoʊkəˌnʌt/",
  "carrot": "/ˈkærət/",
  "potato": "/pəˈteɪtoʊ/",
  "tomato": "/təˈmeɪtoʊ/",
  "corn": "/kɔrn/",
  "onion": "/ˈʌnjən/",
  "cucumber": "/ˈkjukəmbɝ/",
  "broccoli": "/ˈbrɑkəli/",
  "cabbage": "/ˈkæbɪdʒ/",
  "pumpkin": "/ˈpʌmpkɪn/",
  "mushroom": "/ˈmʌʃrum/",
  "peas": "/piz/",
  "pepper": "/ˈpɛpɝ/",
  "juice": "/dʒus/",
  "tea": "/ti/",
  "yogurt": "/ˈjoʊɡɝt/",
  "cheese": "/tʃiz/",
  "cookie": "/ˈkʊki/",
  "chocolate": "/ˈtʃɔklət/",
  "ice cream": "/ˈaɪs krim/",
  "pancake": "/ˈpænˌkeɪk/",
  "honey": "/ˈhʌni/",
  "popcorn": "/ˈpɑpˌkɔrn/",
  "toast": "/toʊst/",
  "candy": "/ˈkændi/",
  "head": "/hɛd/",
  "hair": "/hɛr/",
  "eye": "/aɪ/",
  "ear": "/ir/",
  "nose": "/noʊz/",
  "mouth": "/maʊθ/",
  "tooth": "/tuθ/",
  "hand": "/hænd/",
  "arm": "/ɑrm/",
  "leg": "/lɛɡ/",
  "foot": "/fʊt/",
  "knee": "/ni/",
  "mother": "/ˈmʌðɝ/",
  "father": "/ˈfɑðɝ/",
  "sister": "/ˈsɪstɝ/",
  "brother": "/ˈbrʌðɝ/",
  "grandmother": "/ˈɡrændˌmʌðɝ/",
  "grandfather": "/ˈɡrændˌfɑðɝ/",
  "baby": "/ˈbeɪbi/",
  "family": "/ˈfæməli/",
  "aunt": "/ænt/",
  "uncle": "/ˈʌŋkəl/",
  "cousin": "/ˈkʌzən/",
  "parents": "/ˈpɛrənts/",
  "shirt": "/ʃɝt/",
  "T-shirt": "/ˈtiˌʃɝt/",
  "dress": "/drɛs/",
  "skirt": "/skɝt/",
  "pants": "/pænts/",
  "shorts": "/ʃɔrts/",
  "socks": "/sɑks/",
  "coat": "/koʊt/",
  "jacket": "/ˈdʒækɪt/",
  "scarf": "/skɑrf/",
  "gloves": "/ɡlʌvz/",
  "boots": "/buts/",
  "red": "/rɛd/",
  "blue": "/blu/",
  "yellow": "/ˈjɛloʊ/",
  "green": "/ɡrin/",
  "brown": "/braʊn/",
  "purple": "/ˈpɝpəl/",
  "pink": "/pɪŋk/",
  "white": "/waɪt/",
  "black": "/blæk/",
  "circle": "/ˈsɝkəl/",
  "square": "/skwɛr/",
  "triangle": "/ˈtraɪˌæŋɡəl/",
  "one": "/wʌn/",
  "two": "/tu/",
  "three": "/θri/",
  "four": "/fɔr/",
  "five": "/faɪv/",
  "six": "/sɪks/",
  "seven": "/ˈsɛvən/",
  "eight": "/eɪt/",
  "nine": "/naɪn/",
  "ten": "/tɛn/",
  "eleven": "/ɪˈlɛvən/",
  "twelve": "/twɛlv/",
  "sunny": "/ˈsʌni/",
  "rainy": "/ˈreɪni/",
  "cloudy": "/ˈklaʊdi/",
  "windy": "/ˈwɪndi/",
  "hot": "/hɑt/",
  "cold": "/koʊld/",
  "snow": "/snoʊ/",
  "rainbow": "/ˈreɪnˌboʊ/",
  "spring": "/sprɪŋ/",
  "summer": "/ˈsʌmɝ/",
  "autumn": "/ˈɔtəm/",
  "winter": "/ˈwɪntɝ/",
  "eat": "/it/",
  "drink": "/drɪŋk/",
  "sleep": "/slip/",
  "wake up": "/weɪk ˈʌp/",
  "wash": "/wɑʃ/",
  "brush": "/brʌʃ/",
  "walk": "/wɑk/",
  "run": "/rʌn/",
  "jump": "/dʒʌmp/",
  "read": "/rid/",
  "write": "/raɪt/",
  "draw": "/drɔ/",
  "happy": "/ˈhæpi/",
  "sad": "/sæd/",
  "angry": "/ˈæŋɡri/",
  "tired": "/ˈtaɪɝd/",
  "hungry": "/ˈhʌŋɡri/",
  "thirsty": "/ˈθɝsti/",
  "scared": "/skɛrd/",
  "excited": "/ɪkˈsaɪtɪd/",
  "hello": "/həˈloʊ/",
  "goodbye": "/ˌɡʊdˈbaɪ/",
  "please": "/pliz/",
  "thank you": "/ˈθæŋk ju/",
  "park": "/pɑrk/",
  "hospital": "/ˈhɑspɪtəl/",
  "library": "/ˈlaɪˌbrɛri/",
  "zoo": "/zu/",
  "airport": "/ˈɛrˌpɔrt/",
  "station": "/ˈsteɪʃən/",
  "supermarket": "/ˈsupɝˌmɑrkɪt/",
  "restaurant": "/ˈrɛstərɑnt/",
  "playground": "/ˈpleɪˌɡraʊnd/",
  "bathroom": "/ˈbæθrum/",
  "kitchen": "/ˈkɪtʃən/",
  "bedroom": "/ˈbɛdrum/",
  "see": "/si/",
  "fish": "/fɪʃ/",
  "about": "/əˈbaʊt/",
  "go": "/ɡoʊ/",
  "van": "/væn/",
  "ship": "/ʃɪp/"
};
  Object.assign(wordIPA,{"teddy": "/ˈtɛdi/", "doll": "/dɑl/", "blocks": "/blɑks/", "robot": "/ˈroʊbɑt/", "kite": "/kaɪt/", "balloon": "/bəˈlun/", "puzzle": "/ˈpʌzəl/", "drum": "/drʌm/", "yo-yo": "/ˈjoʊjoʊ/", "marbles": "/ˈmɑrbəlz/", "puppet": "/ˈpʌpɪt/", "rocket": "/ˈrɑkɪt/", "bowl": "/boʊl/", "plate": "/pleɪt/", "cup": "/kʌp/", "glass": "/ɡlæs/", "spoon": "/spun/", "fork": "/fɔrk/", "chopsticks": "/ˈtʃɑpˌstɪks/", "napkin": "/ˈnæpkɪn/", "bottle": "/ˈbɑtəl/", "lunch box": "/ˈlʌntʃ bɑks/", "tray": "/treɪ/", "teapot": "/ˈtiˌpɑt/", "soap": "/soʊp/", "towel": "/ˈtaʊəl/", "toothbrush": "/ˈtuθˌbrʌʃ/", "toothpaste": "/ˈtuθˌpeɪst/", "comb": "/koʊm/", "mirror": "/ˈmɪrɝ/", "shower": "/ˈʃaʊɝ/", "bathtub": "/ˈbæθˌtʌb/", "tissue": "/ˈtɪʃu/", "sponge": "/spʌndʒ/", "basket": "/ˈbæskɪt/", "sink": "/sɪŋk/", "in": "/ɪn/", "on": "/ɑn/", "under": "/ˈʌndɝ/", "behind": "/bɪˈhaɪnd/", "beside": "/bɪˈsaɪd/", "between": "/bɪˈtwin/", "near": "/nɪr/", "far": "/fɑr/", "inside": "/ɪnˈsaɪd/", "outside": "/aʊtˈsaɪd/", "up": "/ʌp/", "down": "/daʊn/", "doctor": "/ˈdɑktɝ/", "nurse": "/nɝs/", "farmer": "/ˈfɑrmɝ/", "driver": "/ˈdraɪvɝ/", "cook": "/kʊk/", "firefighter": "/ˈfaɪrˌfaɪtɝ/", "police officer": "/pəˈlis ˌɔfɪsɝ/", "dentist": "/ˈdɛntɪst/", "pilot": "/ˈpaɪlət/", "artist": "/ˈɑrtɪst/", "singer": "/ˈsɪŋɝ/", "worker": "/ˈwɝkɝ/", "soccer": "/ˈsɑkɝ/", "basketball": "/ˈbæskɪtˌbɔl/", "tennis": "/ˈtɛnɪs/", "badminton": "/ˈbædmɪntən/", "swimming": "/ˈswɪmɪŋ/", "skating": "/ˈskeɪtɪŋ/", "dancing": "/ˈdænsɪŋ/", "cycling": "/ˈsaɪklɪŋ/", "running": "/ˈrʌnɪŋ/", "climbing": "/ˈklaɪmɪŋ/", "kicking": "/ˈkɪkɪŋ/", "catching": "/ˈkætʃɪŋ/"});
  if(extra)Object.assign(wordIPA,Object.fromEntries(extra.themes.flatMap(t=>t[3].map(([en,,,ipa])=>[en,ipa]))));
  window.BEAR_FOUNDATIONS={
    themeSections:themeSections.map(([title,ids])=>({title,ids})),
    letters:Array.from({length:26},(_,i)=>{const letter=String.fromCharCode(65+i);return{id:`letter-${letter}`,display:`${letter} ${letter.toLowerCase()}`,label:letter,text:letter,zh:'听字母名称，再用自己的声音试试看',kind:'letters',audio:`foundation-letter-${letter}-v4`};}),
    phonemes:phonemes.map(([symbol,word,zh,tip],i)=>({id:`phoneme-${i}`,display:`/${symbol}/`,label:`/${symbol}/`,text:word,zh,tip,kind:'phonemes',symbol,word,ipa:wordIPA[word],audio:`osu-english-${symbol.codePointAt(0).toString(16).toUpperCase().padStart(4,'0')}-v1`,extension:'wav',recordingNote:i>=8?'真人示范带有辅助轻元音 ə；练习时注意目标辅音。':'真人元音示范，按原声跟读。'})),
    words:themes.flatMap(([theme,title,emoji,words])=>words.map(([word,zh,picture])=>({id:`word-${word}`,display:word,label:word,text:word,zh,picture:window.BearArtwork?.render(word,picture)||picture,theme,themeTitle:title,kind:'words',ipa:wordIPA[word],audio:`foundation-word-${word.replaceAll(" ","-")}`,zhAudio:`foundation-zh-${word.replaceAll(" ","-")}`}))),themes:themes.map(([id,title,emoji])=>({id,title,emoji}))
  };
  // Versioned corrected clips preserve learning ids and avoid stale browser media.
  for(const unit of window.BEAR_FOUNDATIONS.words){if(['close'].includes(unit.text))unit.audio+='-v16';if(Object.hasOwn(corrections,unit.text))unit.zhAudio+='-v16';}
  window.BEAR_FOUNDATION_AUDIO=[...window.BEAR_FOUNDATIONS.letters,...window.BEAR_FOUNDATIONS.words].map(unit=>[unit.text,unit.audio]);
  window.BEAR_PHONEME_EXAMPLES=phonemes.map(([,word])=>[word,`phoneme-example-${word}`]);
})();

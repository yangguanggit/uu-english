/* Ten internal reading bands, ten original stories per band. */
window.BEAR_READING_LEVELS=[
  {
    "id": "L1",
    "title": "看图认物",
    "icon": "🌱",
    "description": "从单词和短语开始，用图片认识熟悉的物品。",
    "skills": "名词与短语 · 指图听读"
  },
  {
    "id": "L2",
    "title": "简单短句",
    "icon": "🌿",
    "description": "听懂简单的完整句子，认识人物和物品。",
    "skills": "简单句 · 看图理解"
  },
  {
    "id": "L3",
    "title": "重复句式",
    "icon": "🍀",
    "description": "在重复表达中认识动作和颜色。",
    "skills": "重复结构 · 跟读模仿"
  },
  {
    "id": "L4",
    "title": "日常动作",
    "icon": "🌼",
    "description": "跟着人物完成熟悉的生活小事。",
    "skills": "人物动作 · 简单描述"
  },
  {
    "id": "L5",
    "title": "事件顺序",
    "icon": "🌳",
    "description": "按照先后顺序读懂一个完整的小故事。",
    "skills": "先后顺序 · 回顾情节"
  },
  {
    "id": "L6",
    "title": "生活交流",
    "icon": "🌻",
    "description": "结合情境读懂需要、回应和行动。",
    "skills": "日常表达 · 联系上下文"
  },
  {
    "id": "L7",
    "title": "问题与办法",
    "icon": "🪴",
    "description": "发现故事里的小问题，寻找解决办法。",
    "skills": "问题解决 · 理解选择"
  },
  {
    "id": "L8",
    "title": "原因与结果",
    "icon": "🌈",
    "description": "留意连接词，理解行动的原因与结果。",
    "skills": "因果关系 · 简单复述"
  },
  {
    "id": "L9",
    "title": "计划与合作",
    "icon": "🧭",
    "description": "跟着人物调整计划，理解彼此的想法。",
    "skills": "计划合作 · 归纳过程"
  },
  {
    "id": "L10",
    "title": "连贯阅读",
    "icon": "🚀",
    "description": "阅读更长的句子，联系多条信息理解故事。",
    "skills": "连接信息 · 讨论与复述"
  }
];
window.BEAR_BOOKS=[
  {
    "id": "milk",
    "title": "UU 和小猫的早餐",
    "emoji": "🐱",
    "question": "小猫想喝什么？",
    "answer": "water",
    "choices": [
      "milk",
      "water",
      "juice"
    ],
    "pages": [
      [
        "🏡",
        "UU is at home.",
        "UU 在家里。",
        [
          "home"
        ]
      ],
      [
        "🐱",
        "UU sees a cat.",
        "UU 看见一只小猫。",
        [
          "cat"
        ]
      ],
      [
        "😽",
        "The cat is thirsty.",
        "小猫渴了。",
        [
          "cat",
          "thirsty"
        ],
        "story-milk-2-v16.wav"
      ],
      [
        "💧",
        "Water, please.",
        "请给我水。",
        [
          "water"
        ],
        "story-milk-3-v16.wav"
      ],
      [
        "🥣",
        "Here you are.",
        "给你。",
        [
          "bowl"
        ]
      ],
      [
        "💛",
        "Thank you!",
        "谢谢你！",
        []
      ]
    ],
    "scene": "日常与照顾",
    "level": "L1",
    "pageArt": [
      [
        "home"
      ],
      [
        "cat"
      ],
      [
        "cat",
        "water"
      ],
      [
        "water"
      ],
      [
        {
          "word": "bowl",
          "variant": "water"
        }
      ],
      [
        "cat",
        "water"
      ]
    ],
    "coverArt": [
      "cat",
      "water"
    ]
  },
  {
    "id": "park",
    "title": "公园里的新朋友",
    "emoji": "🌳",
    "question": "UU 带了什么去公园？",
    "answer": "ball",
    "choices": [
      "ball",
      "book",
      "hat"
    ],
    "pages": [
      [
        "🌳",
        "UU is at the park.",
        "UU 来到了公园。",
        [
          "park"
        ]
      ],
      [
        "⚽",
        "UU has a ball.",
        "UU 有一个球。",
        [
          "ball"
        ]
      ],
      [
        "🐰",
        "Hello!",
        "你好！",
        []
      ],
      [
        "🤝",
        "Let us play!",
        "我们一起玩吧！",
        [
          "play"
        ]
      ],
      [
        "⚽",
        "This is fun!",
        "真好玩！",
        []
      ],
      [
        "👋",
        "See you!",
        "再见！",
        []
      ]
    ],
    "scene": "公园与交友",
    "level": "L1",
    "pageArt": [
      [
        "park"
      ],
      [
        "ball"
      ],
      [
        "ball",
        "play"
      ],
      [
        "ball"
      ],
      [
        "play",
        "ball"
      ],
      [
        "park",
        "ball"
      ]
    ],
    "coverArt": [
      "park",
      "ball"
    ]
  },
  {
    "id": "rain",
    "title": "一把伞，两个朋友",
    "emoji": "☔",
    "scene": "天气与分享",
    "level": "L3",
    "question": "UU 和朋友一起用了什么？",
    "answer": "umbrella",
    "choices": [
      "umbrella",
      "cap",
      "ball"
    ],
    "pages": [
      [
        "🪟",
        "UU looks out of the window.",
        "UU 向窗外看。",
        [
          "window",
          "look"
        ]
      ],
      [
        "🌧️",
        "It is raining.",
        "下雨了。",
        [
          "rain",
          "rainy"
        ]
      ],
      [
        "☂️",
        "UU has an umbrella.",
        "UU 有一把伞。",
        [
          "umbrella"
        ]
      ],
      [
        "🐰",
        "A friend is waiting.",
        "一位朋友正在等。",
        [
          "friend",
          "wait"
        ]
      ],
      [
        "🤝",
        "Let us share the umbrella.",
        "我们一起撑伞吧。",
        [
          "share",
          "umbrella"
        ]
      ],
      [
        "🏡",
        "They walk home together.",
        "他们一起走回家。",
        [
          "walk",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        "window"
      ],
      [
        "rain"
      ],
      [
        "umbrella"
      ],
      [
        "umbrella",
        "friend"
      ],
      [
        {
          "word": "friend",
          "count": 2
        },
        "umbrella"
      ],
      [
        "home"
      ]
    ],
    "coverArt": [
      "rain",
      "umbrella"
    ]
  },
  {
    "id": "library",
    "title": "借一本有兔子的书",
    "emoji": "📖",
    "scene": "阅读与礼貌",
    "level": "L5",
    "question": "UU 借的书里有什么动物？",
    "answer": "rabbit",
    "choices": [
      "rabbit",
      "tiger",
      "whale"
    ],
    "pages": [
      [
        "📚",
        "UU goes to the library.",
        "UU 来到了图书馆。",
        [
          "library"
        ]
      ],
      [
        "🐰",
        "This book has a rabbit in it.",
        "这本书里有一只兔子。",
        [
          "book",
          "rabbit"
        ]
      ],
      [
        "🙋",
        "May I borrow this book?",
        "我可以借这本书吗？",
        [
          "book",
          "please"
        ]
      ],
      [
        "🐻",
        "Yes. Here you are.",
        "可以，给你。",
        []
      ],
      [
        "🏡",
        "UU reads the book at home.",
        "UU 在家读这本书。",
        [
          "read",
          "home"
        ]
      ],
      [
        "📚",
        "UU brings the book back.",
        "UU 把书还了回来。",
        [
          "book",
          "library"
        ]
      ]
    ],
    "pageArt": [
      [
        "library"
      ],
      [
        "book",
        "rabbit"
      ],
      [
        "book"
      ],
      [
        "book"
      ],
      [
        "home",
        "book"
      ],
      [
        "library",
        "book"
      ]
    ],
    "coverArt": [
      "book",
      "rabbit"
    ]
  },
  {
    "id": "seed",
    "title": "小种子的第一片叶子",
    "emoji": "🌱",
    "scene": "自然与照顾",
    "level": "L4",
    "question": "种子最后长出了什么？",
    "answer": "leaf",
    "choices": [
      "leaf",
      "apple",
      "ball"
    ],
    "pages": [
      [
        "🌱",
        "UU has a little seed.",
        "UU 有一颗小种子。",
        [
          "seed"
        ]
      ],
      [
        "🪴",
        "The seed goes into the soil.",
        "种子被种进土里。",
        [
          "seed",
          "in"
        ]
      ],
      [
        "💧",
        "UU gives it some water.",
        "UU 给它浇了一点水。",
        [
          "water",
          "give"
        ]
      ],
      [
        "☀️",
        "The sun is warm.",
        "太阳暖暖的。",
        [
          "sun"
        ]
      ],
      [
        "🍃",
        "A little leaf comes out.",
        "一片小叶子长了出来。",
        [
          "leaf"
        ]
      ],
      [
        "🐻",
        "Grow, little seed!",
        "长大吧，小种子！",
        [
          "seed",
          "leaf"
        ]
      ]
    ],
    "pageArt": [
      [
        "seed"
      ],
      [
        {
          "word": "seed",
          "variant": "soil"
        }
      ],
      [
        "water",
        "seed"
      ],
      [
        "sun"
      ],
      [
        "leaf"
      ],
      [
        "leaf",
        "seed"
      ]
    ],
    "coverArt": [
      "seed",
      "leaf"
    ]
  },
  {
    "id": "farm",
    "title": "农场里的小小朋友",
    "emoji": "🐥",
    "scene": "农场与动物",
    "level": "L3",
    "question": "谁跟在母鸡后面？",
    "answer": "chick",
    "choices": [
      "chick",
      "pig",
      "goat"
    ],
    "pages": [
      [
        "🚜",
        "UU visits a farm.",
        "UU 来到了农场。",
        [
          "farmer"
        ]
      ],
      [
        "🐄",
        "A cow is eating grass.",
        "一头奶牛正在吃草。",
        [
          "cow",
          "grass"
        ]
      ],
      [
        "🐔",
        "A hen is walking slowly.",
        "一只母鸡慢慢地走。",
        [
          "hen",
          "slow"
        ]
      ],
      [
        "🐥",
        "A chick is behind the hen.",
        "一只小鸡跟在母鸡后面。",
        [
          "chick",
          "behind"
        ]
      ],
      [
        "🤫",
        "Let us watch quietly.",
        "我们安静地看看吧。",
        [
          "look"
        ]
      ],
      [
        "👋",
        "Goodbye, little chick!",
        "再见，小鸡！",
        [
          "goodbye",
          "chick"
        ]
      ]
    ],
    "pageArt": [
      [
        "farmer"
      ],
      [
        "cow",
        "grass"
      ],
      [
        "hen"
      ],
      [
        "hen",
        "chick"
      ],
      [
        "chick"
      ],
      [
        "farmer",
        "chick"
      ]
    ],
    "coverArt": [
      "hen",
      "chick"
    ],
    "pageLayouts": {
      "3": "behind"
    }
  },
  {
    "id": "shopping",
    "title": "UU 的三样购物清单",
    "emoji": "🛒",
    "scene": "购物与数量",
    "level": "L5",
    "question": "UU 最后挑了什么水果？",
    "answer": "apple",
    "choices": [
      "apple",
      "pear",
      "lemon"
    ],
    "pages": [
      [
        "🛒",
        "UU goes shopping with Dad.",
        "UU 和爸爸一起去购物。",
        [
          "shop",
          "father"
        ]
      ],
      [
        "🥚",
        "First, they find some eggs.",
        "首先，他们找到了鸡蛋。",
        [
          "egg"
        ]
      ],
      [
        "🥛",
        "Next, they find some milk.",
        "接着，他们找到了牛奶。",
        [
          "milk"
        ]
      ],
      [
        "🍎",
        "UU picks three apples.",
        "UU 挑了三个苹果。",
        [
          "apple",
          "three"
        ]
      ],
      [
        "🧺",
        "Eggs, milk, and apples. All done!",
        "鸡蛋、牛奶和苹果，都买齐啦！",
        [
          "egg",
          "milk",
          "apple"
        ]
      ],
      [
        "🏡",
        "They take the food home.",
        "他们把食物带回家。",
        [
          "take",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        "shop",
        "father"
      ],
      [
        {
          "word": "egg",
          "count": 2
        }
      ],
      [
        "milk"
      ],
      [
        {
          "word": "apple",
          "count": 3
        }
      ],
      [
        {
          "word": "egg",
          "count": 2
        },
        "milk",
        {
          "word": "apple",
          "count": 3
        }
      ],
      [
        "home"
      ]
    ],
    "coverArt": [
      "milk",
      "apple"
    ]
  },
  {
    "id": "crab",
    "title": "海边的小螃蟹",
    "emoji": "🦀",
    "scene": "海边与观察",
    "level": "L4",
    "question": "UU 看见了哪种小动物？",
    "answer": "crab",
    "choices": [
      "crab",
      "dolphin",
      "turtle"
    ],
    "pages": [
      [
        "🌊",
        "UU is by the sea.",
        "UU 来到了海边。",
        [
          "sea"
        ]
      ],
      [
        "🦀",
        "A little crab is on the sand.",
        "一只小螃蟹在沙子上。",
        [
          "crab",
          "on"
        ]
      ],
      [
        "👀",
        "UU watches the crab.",
        "UU 看着小螃蟹。",
        [
          "look",
          "crab"
        ]
      ],
      [
        "🦀",
        "The crab walks sideways.",
        "小螃蟹横着走。",
        [
          "crab",
          "walk"
        ]
      ],
      [
        "🤝",
        "Let us give it some space.",
        "我们离它远一点吧。",
        [
          "give"
        ]
      ],
      [
        "👋",
        "Goodbye, little crab!",
        "再见，小螃蟹！",
        [
          "goodbye",
          "crab"
        ]
      ]
    ],
    "pageArt": [
      [
        "sea"
      ],
      [
        "crab"
      ],
      [
        "crab"
      ],
      [
        "crab"
      ],
      [
        "crab",
        "sea"
      ],
      [
        "crab",
        "sea"
      ]
    ],
    "coverArt": [
      "sea",
      "crab"
    ]
  },
  {
    "id": "school",
    "title": "UU 借到一支铅笔",
    "emoji": "✏️",
    "level": "L2",
    "scene": "学校里的礼貌用语",
    "answer": "pencil",
    "question": "UU 向朋友借了什么？",
    "choices": [
      "pencil",
      "ruler",
      "book"
    ],
    "pages": [
      [
        "✏️",
        "UU is at school.",
        "UU 在学校。",
        [
          "school"
        ]
      ],
      [
        "✏️",
        "UU has a book.",
        "UU 有一本书。",
        [
          "book"
        ]
      ],
      [
        "✏️",
        "UU needs a pencil.",
        "UU 需要一支铅笔。",
        [
          "pencil"
        ]
      ],
      [
        "✏️",
        "A pencil, please.",
        "请借我一支铅笔。",
        [
          "pencil",
          "please"
        ]
      ],
      [
        "✏️",
        "Here you are, UU.",
        "UU，给你。",
        [
          "pencil"
        ]
      ],
      [
        "✏️",
        "Thank you, my friend!",
        "谢谢你，我的朋友！",
        [
          "pencil",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "school"
      ],
      [
        "book"
      ],
      [
        "pencil"
      ],
      [
        "pencil"
      ],
      [
        "pencil"
      ],
      [
        "pencil",
        "friend"
      ]
    ],
    "coverArt": [
      "school",
      "pencil"
    ]
  },
  {
    "id": "bedtime",
    "title": "月亮出来，UU 晚安",
    "emoji": "🌙",
    "level": "L4",
    "scene": "睡前的小小约定",
    "answer": "book",
    "question": "UU 睡前读了什么？",
    "choices": [
      "book",
      "ball",
      "kite"
    ],
    "pages": [
      [
        "🌙",
        "The moon is in the sky.",
        "月亮在天空中。",
        [
          "moon",
          "sky"
        ]
      ],
      [
        "🌙",
        "UU puts the teddy on the bed.",
        "UU 把玩具熊放在床上。",
        [
          "teddy",
          "bed"
        ]
      ],
      [
        "🌙",
        "UU chooses a book.",
        "UU 选了一本书。",
        [
          "book"
        ]
      ],
      [
        "🌙",
        "UU reads with Mother.",
        "UU 和妈妈一起读书。",
        [
          "book",
          "mother"
        ]
      ],
      [
        "🌙",
        "Good night, Mother.",
        "妈妈，晚安。",
        [
          "mother",
          "moon"
        ]
      ],
      [
        "🌙",
        "UU goes to sleep.",
        "UU 睡觉了。",
        [
          "bed",
          "moon"
        ]
      ]
    ],
    "pageArt": [
      [
        "moon",
        {
          "word": "sky",
          "variant": "night"
        }
      ],
      [
        "teddy",
        "bed"
      ],
      [
        "book"
      ],
      [
        "book",
        "mother"
      ],
      [
        "mother",
        "moon"
      ],
      [
        "bed",
        "moon"
      ]
    ],
    "coverArt": [
      "moon",
      "bed"
    ]
  },
  {
    "id": "bakery",
    "title": "UU 分享小面包",
    "emoji": "🥖",
    "level": "L3",
    "scene": "面包店里的分享",
    "answer": "bun",
    "question": "UU 和朋友分享了什么？",
    "choices": [
      "bun",
      "apple",
      "egg"
    ],
    "pages": [
      [
        "🥖",
        "UU goes to the bakery.",
        "UU 去了面包店。",
        [
          "bakery"
        ]
      ],
      [
        "🥖",
        "Look at the bread!",
        "看这些面包！",
        [
          "bread"
        ]
      ],
      [
        "🥖",
        "A bun, please.",
        "请给我一个小圆面包。",
        [
          "bun"
        ]
      ],
      [
        "🥖",
        "Here you are, UU.",
        "UU，给你。",
        [
          "bun"
        ]
      ],
      [
        "🥖",
        "UU shares the bun with a friend.",
        "UU 和朋友分享小圆面包。",
        [
          "bun",
          "friend"
        ]
      ],
      [
        "🥖",
        "Thank you for sharing!",
        "谢谢你的分享！",
        [
          "bun",
          "share"
        ]
      ]
    ],
    "pageArt": [
      [
        "bakery"
      ],
      [
        "bread"
      ],
      [
        "bun"
      ],
      [
        "bun"
      ],
      [
        "bun",
        "friend"
      ],
      [
        "bun",
        "share"
      ]
    ],
    "coverArt": [
      "bakery",
      "bun"
    ]
  },
  {
    "id": "zoo",
    "title": "UU 给动物送午餐",
    "emoji": "🐼",
    "level": "L3",
    "scene": "动物园的食物配对",
    "answer": "bamboo",
    "question": "熊猫吃什么？",
    "choices": [
      "bamboo",
      "banana",
      "carrot"
    ],
    "pages": [
      [
        "🐼",
        "UU visits the zoo.",
        "UU 去参观动物园。",
        [
          "zoo"
        ]
      ],
      [
        "🐼",
        "The panda is hungry.",
        "熊猫饿了。",
        [
          "panda"
        ]
      ],
      [
        "🐼",
        "Bamboo for the panda.",
        "竹子给熊猫。",
        [
          "bamboo",
          "panda"
        ]
      ],
      [
        "🐼",
        "A banana for the monkey.",
        "香蕉给猴子。",
        [
          "banana",
          "monkey"
        ]
      ],
      [
        "🐼",
        "A carrot for the rabbit.",
        "胡萝卜给兔子。",
        [
          "carrot",
          "rabbit"
        ]
      ],
      [
        "🐼",
        "The animals have their lunch.",
        "动物们吃到午餐啦。",
        [
          "panda",
          "monkey",
          "rabbit"
        ]
      ]
    ],
    "pageArt": [
      [
        "zoo"
      ],
      [
        "panda"
      ],
      [
        "bamboo",
        "panda"
      ],
      [
        "banana",
        "monkey"
      ],
      [
        "carrot",
        "rabbit"
      ],
      [
        "panda",
        "monkey",
        "rabbit"
      ]
    ],
    "coverArt": [
      "panda",
      "bamboo"
    ]
  },
  {
    "id": "airport",
    "title": "UU 第一次坐飞机",
    "emoji": "✈️",
    "level": "L5",
    "scene": "机场与出行准备",
    "answer": "plane",
    "question": "UU 乘坐什么去旅行？",
    "choices": [
      "plane",
      "bus",
      "train"
    ],
    "pages": [
      [
        "✈️",
        "UU is at the airport.",
        "UU 在机场。",
        [
          "airport"
        ]
      ],
      [
        "✈️",
        "UU has a small bag.",
        "UU 有一个小包。",
        [
          "bag"
        ]
      ],
      [
        "✈️",
        "Here is the passport.",
        "这是护照。",
        [
          "passport"
        ]
      ],
      [
        "✈️",
        "Look at the plane!",
        "看那架飞机！",
        [
          "plane"
        ]
      ],
      [
        "✈️",
        "UU sits in the seat.",
        "UU 坐在座位上。",
        [
          "seat"
        ]
      ],
      [
        "✈️",
        "The plane goes up into the sky.",
        "飞机飞上了天空。",
        [
          "plane",
          "sky"
        ]
      ]
    ],
    "pageArt": [
      [
        "airport"
      ],
      [
        "bag"
      ],
      [
        "passport"
      ],
      [
        "plane"
      ],
      [
        "seat"
      ],
      [
        "plane",
        "sky"
      ]
    ],
    "coverArt": [
      "passport",
      "plane"
    ]
  },
  {
    "id": "colors",
    "title": "UU 的彩色小花园",
    "emoji": "🎨",
    "level": "L5",
    "scene": "颜色与自然观察",
    "answer": "yellow",
    "question": "故事里的太阳是什么颜色？",
    "choices": [
      "red",
      "yellow",
      "blue"
    ],
    "pages": [
      [
        "🎨",
        "UU sees a red flower.",
        "UU 看见一朵红色的花。",
        [
          "red",
          "flower"
        ]
      ],
      [
        "🎨",
        "A green leaf is on the tree.",
        "树上有一片绿色的叶子。",
        [
          "green",
          "leaf"
        ]
      ],
      [
        "🎨",
        "The sky is blue.",
        "天空是蓝色的。",
        [
          "sky",
          "blue"
        ]
      ],
      [
        "🎨",
        "The sun is yellow.",
        "太阳是黄色的。",
        [
          "sun",
          "yellow"
        ]
      ],
      [
        "🎨",
        "UU draws a purple butterfly.",
        "UU 画了一只紫色的蝴蝶。",
        [
          "purple",
          "butterfly"
        ]
      ],
      [
        "🎨",
        "So many colors in the garden!",
        "花园里有这么多颜色！",
        [
          "red",
          "green",
          "blue"
        ]
      ]
    ],
    "pageArt": [
      [
        {
          "word": "flower",
          "variant": "red"
        }
      ],
      [
        {
          "word": "leaf",
          "variant": "green"
        }
      ],
      [
        {
          "word": "sky",
          "variant": "blue"
        }
      ],
      [
        {
          "word": "sun",
          "variant": "yellow"
        }
      ],
      [
        {
          "word": "butterfly",
          "variant": "purple"
        }
      ],
      [
        "red",
        "green",
        "blue"
      ]
    ],
    "coverArt": [
      "flower",
      "leaf"
    ]
  },
  {
    "id": "vegetables",
    "title": "UU 的蔬菜小篮子",
    "emoji": "🥕",
    "level": "L4",
    "scene": "挑选与分享蔬菜",
    "answer": "carrot",
    "question": "小兔子吃到了什么蔬菜？",
    "choices": [
      "carrot",
      "potato",
      "broccoli"
    ],
    "pages": [
      [
        "🥕",
        "UU puts a carrot in the basket.",
        "UU 把一根胡萝卜放进篮子。",
        [
          "carrot",
          "basket"
        ]
      ],
      [
        "🥕",
        "A tomato goes in the basket.",
        "一个番茄也放进篮子。",
        [
          "tomato",
          "basket"
        ]
      ],
      [
        "🥕",
        "Here is a potato.",
        "这里还有一个土豆。",
        [
          "potato"
        ]
      ],
      [
        "🥕",
        "UU washes the vegetables.",
        "UU 把蔬菜洗干净。",
        [
          "carrot",
          "tomato",
          "potato"
        ]
      ],
      [
        "🥕",
        "A carrot for the rabbit.",
        "给小兔子一根胡萝卜。",
        [
          "carrot",
          "rabbit"
        ]
      ],
      [
        "🥕",
        "Thank you, UU!",
        "谢谢你，UU！",
        [
          "rabbit",
          "carrot"
        ]
      ]
    ],
    "pageArt": [
      [
        "carrot",
        "basket"
      ],
      [
        "tomato",
        "basket"
      ],
      [
        "potato"
      ],
      [
        "carrot",
        "tomato",
        "potato"
      ],
      [
        "carrot",
        "rabbit"
      ],
      [
        "rabbit",
        "carrot"
      ]
    ],
    "coverArt": [
      "carrot",
      "tomato"
    ]
  },
  {
    "id": "sports",
    "title": "UU 和朋友传球",
    "emoji": "⚽",
    "level": "L3",
    "scene": "运动场上的轮流与合作",
    "answer": "ball",
    "question": "UU 和朋友一起玩什么？",
    "choices": [
      "ball",
      "kite",
      "puzzle"
    ],
    "pages": [
      [
        "⚽",
        "UU has a ball.",
        "UU 有一个球。",
        [
          "ball"
        ]
      ],
      [
        "⚽",
        "Can we play together?",
        "我们可以一起玩吗？",
        [
          "ball",
          "play"
        ]
      ],
      [
        "⚽",
        "UU kicks the ball.",
        "UU 踢了一下球。",
        [
          "ball"
        ]
      ],
      [
        "⚽",
        "My turn, please.",
        "请让我来一次。",
        [
          "ball",
          "please"
        ]
      ],
      [
        "⚽",
        "The friend kicks the ball back.",
        "朋友把球踢了回来。",
        [
          "friend",
          "ball"
        ]
      ],
      [
        "⚽",
        "We can play together!",
        "我们可以一起玩！",
        [
          "ball",
          "play"
        ]
      ]
    ],
    "pageArt": [
      [
        "ball"
      ],
      [
        "ball",
        "play"
      ],
      [
        "ball"
      ],
      [
        "ball",
        "friend"
      ],
      [
        "friend",
        "ball"
      ],
      [
        "ball",
        "play"
      ]
    ],
    "coverArt": [
      "ball",
      "friend"
    ]
  },
  {
    "id": "fruit-basket",
    "title": "UU 的水果小篮子",
    "emoji": "🍎",
    "level": "L1",
    "topic": "read-fruit-basket",
    "scene": "水果与物品",
    "question": "篮子里哪种水果是黄色的？",
    "answer": "banana",
    "choices": [
      "banana",
      "apple",
      "pear"
    ],
    "pages": [
      [
        "🍎",
        "An apple.",
        "一个苹果。",
        [
          "apple"
        ]
      ],
      [
        "🍎",
        "A banana.",
        "一根香蕉。",
        [
          "banana"
        ]
      ],
      [
        "🍎",
        "A pear.",
        "一个梨。",
        [
          "pear"
        ]
      ],
      [
        "🍎",
        "An orange.",
        "一个橙子。",
        [
          "orange"
        ]
      ],
      [
        "🍎",
        "A peach.",
        "一个桃子。",
        [
          "peach"
        ]
      ],
      [
        "🍎",
        "Fruit in a basket.",
        "篮子里的水果。",
        [
          "basket",
          "apple",
          "banana"
        ]
      ]
    ],
    "pageArt": [
      [
        "apple"
      ],
      [
        "banana"
      ],
      [
        "pear"
      ],
      [
        "orange"
      ],
      [
        "peach"
      ],
      [
        "basket",
        "apple",
        "banana"
      ]
    ],
    "coverArt": [
      "banana",
      "apple"
    ]
  },
  {
    "id": "toy-day",
    "title": "UU 的玩具朋友",
    "emoji": "🧸",
    "level": "L1",
    "topic": "read-toy-day",
    "scene": "玩具与游戏",
    "question": "哪一个玩具可以放到天上飞？",
    "answer": "kite",
    "choices": [
      "kite",
      "doll",
      "drum"
    ],
    "pages": [
      [
        "🧸",
        "A ball.",
        "一个球。",
        [
          "ball"
        ]
      ],
      [
        "🧸",
        "A doll.",
        "一个娃娃。",
        [
          "doll"
        ]
      ],
      [
        "🧸",
        "A robot.",
        "一个机器人。",
        [
          "robot"
        ]
      ],
      [
        "🧸",
        "A kite.",
        "一只风筝。",
        [
          "kite"
        ]
      ],
      [
        "🧸",
        "A drum.",
        "一个鼓。",
        [
          "drum"
        ]
      ],
      [
        "🧸",
        "UU can play.",
        "UU 可以玩耍。",
        [
          "play",
          "ball"
        ]
      ]
    ],
    "pageArt": [
      [
        "ball"
      ],
      [
        "doll"
      ],
      [
        "robot"
      ],
      [
        "kite"
      ],
      [
        "drum"
      ],
      [
        "play",
        "ball"
      ]
    ],
    "coverArt": [
      "kite",
      "ball"
    ]
  },
  {
    "id": "color-book",
    "title": "UU 的六种颜色",
    "emoji": "🎨",
    "level": "L1",
    "topic": "read-color-book",
    "scene": "颜色与观察",
    "question": "故事最后介绍了什么颜色？",
    "answer": "pink",
    "choices": [
      "pink",
      "blue",
      "green"
    ],
    "pages": [
      [
        "🎨",
        "This is red.",
        "这是红色。",
        [
          "red"
        ]
      ],
      [
        "🎨",
        "This is blue.",
        "这是蓝色。",
        [
          "blue"
        ]
      ],
      [
        "🎨",
        "This is yellow.",
        "这是黄色。",
        [
          "yellow"
        ]
      ],
      [
        "🎨",
        "This is green.",
        "这是绿色。",
        [
          "green"
        ]
      ],
      [
        "🎨",
        "This is purple.",
        "这是紫色。",
        [
          "purple"
        ]
      ],
      [
        "🎨",
        "This is pink.",
        "这是粉色。",
        [
          "pink"
        ]
      ]
    ],
    "pageArt": [
      [
        "red"
      ],
      [
        "blue"
      ],
      [
        "yellow"
      ],
      [
        "green"
      ],
      [
        "purple"
      ],
      [
        "pink"
      ]
    ],
    "coverArt": [
      "pink",
      "red"
    ]
  },
  {
    "id": "body-book",
    "title": "UU 认识小身体",
    "emoji": "🖐️",
    "level": "L2",
    "topic": "read-body-book",
    "scene": "身体与数量",
    "question": "UU 用什么听声音？",
    "answer": "ear",
    "choices": [
      "ear",
      "nose",
      "hand"
    ],
    "pages": [
      [
        "🖐️",
        "UU has two eyes.",
        "UU 有两只眼睛。",
        [
          "eye"
        ]
      ],
      [
        "🖐️",
        "UU has one nose.",
        "UU 有一个鼻子。",
        [
          "nose"
        ]
      ],
      [
        "🖐️",
        "UU has one mouth.",
        "UU 有一张嘴巴。",
        [
          "mouth"
        ]
      ],
      [
        "🖐️",
        "UU has two ears.",
        "UU 有两只耳朵。",
        [
          "ear"
        ]
      ],
      [
        "🖐️",
        "UU has two hands.",
        "UU 有两只手。",
        [
          "hand"
        ]
      ],
      [
        "🖐️",
        "UU has two feet.",
        "UU 有两只脚。",
        [
          "foot"
        ]
      ]
    ],
    "pageArt": [
      [
        {
          "word": "eye",
          "count": 2
        }
      ],
      [
        "nose"
      ],
      [
        "mouth"
      ],
      [
        {
          "word": "ear",
          "count": 2
        }
      ],
      [
        {
          "word": "hand",
          "count": 2
        }
      ],
      [
        {
          "word": "foot",
          "count": 2
        }
      ]
    ],
    "coverArt": [
      "ear",
      "eye"
    ]
  },
  {
    "id": "weather-book",
    "title": "UU 看天气",
    "emoji": "☀️",
    "level": "L1",
    "topic": "read-weather-book",
    "scene": "天气与感受",
    "question": "哪一页说的是下雨的天气？",
    "answer": "rainy",
    "choices": [
      "rainy",
      "sunny",
      "windy"
    ],
    "pages": [
      [
        "☀️",
        "It is sunny.",
        "天气晴朗。",
        [
          "sunny"
        ]
      ],
      [
        "☀️",
        "It is rainy.",
        "下雨了。",
        [
          "rainy"
        ]
      ],
      [
        "☀️",
        "It is cloudy.",
        "多云了。",
        [
          "cloudy"
        ]
      ],
      [
        "☀️",
        "It is windy.",
        "起风了。",
        [
          "windy"
        ]
      ],
      [
        "☀️",
        "It is hot.",
        "天气很热。",
        [
          "hot"
        ]
      ],
      [
        "☀️",
        "It is cold.",
        "天气很冷。",
        [
          "cold"
        ]
      ]
    ],
    "pageArt": [
      [
        "sunny"
      ],
      [
        "rainy"
      ],
      [
        "cloudy"
      ],
      [
        "windy"
      ],
      [
        "hot"
      ],
      [
        "cold"
      ]
    ],
    "coverArt": [
      "rainy",
      "sunny"
    ]
  },
  {
    "id": "clean-hands",
    "title": "UU 洗洗小手",
    "emoji": "🧼",
    "level": "L4",
    "topic": "read-clean-hands",
    "scene": "清洁与生活",
    "question": "UU 用什么擦干双手？",
    "answer": "towel",
    "choices": [
      "towel",
      "soap",
      "spoon"
    ],
    "pages": [
      [
        "🧼",
        "UU is ready to eat.",
        "UU 准备吃饭了。",
        [
          "eat"
        ]
      ],
      [
        "🧼",
        "UU needs clean hands.",
        "UU 需要干净的双手。",
        [
          "hand"
        ]
      ],
      [
        "🧼",
        "UU turns on the water.",
        "UU 打开水龙头。",
        [
          "water",
          "sink"
        ]
      ],
      [
        "🧼",
        "UU washes with soap.",
        "UU 用肥皂洗手。",
        [
          "soap",
          "hand"
        ]
      ],
      [
        "🧼",
        "UU dries both hands with a towel.",
        "UU 用毛巾擦干双手。",
        [
          "towel",
          "hand"
        ]
      ],
      [
        "🧼",
        "Now UU can eat.",
        "现在 UU 可以吃饭了。",
        [
          "eat",
          "bowl"
        ]
      ]
    ],
    "pageArt": [
      [
        "eat"
      ],
      [
        "hand"
      ],
      [
        "water",
        "sink"
      ],
      [
        "soap",
        "hand"
      ],
      [
        "towel",
        "hand"
      ],
      [
        "eat",
        "bowl"
      ]
    ],
    "coverArt": [
      "towel",
      "eat"
    ]
  },
  {
    "id": "bus-ride",
    "title": "UU 坐公交车",
    "emoji": "🚌",
    "level": "L5",
    "topic": "read-bus-ride",
    "scene": "交通与出行",
    "question": "UU 坐的是什么车？",
    "answer": "bus",
    "choices": [
      "bus",
      "train",
      "taxi"
    ],
    "pages": [
      [
        "🚌",
        "UU waits at the bus stop.",
        "UU 在公交车站等车。",
        [
          "bus",
          "wait"
        ]
      ],
      [
        "🚌",
        "Here comes the bus.",
        "公交车来了。",
        [
          "bus"
        ]
      ],
      [
        "🚌",
        "UU gets on the bus.",
        "UU 上了公交车。",
        [
          "bus"
        ]
      ],
      [
        "🚌",
        "UU sits in a seat.",
        "UU 坐在座位上。",
        [
          "seat"
        ]
      ],
      [
        "🚌",
        "UU sees the park.",
        "UU 看见了公园。",
        [
          "park"
        ]
      ],
      [
        "🚌",
        "UU gets off at the park.",
        "UU 在公园下车。",
        [
          "park",
          "bus"
        ]
      ]
    ],
    "pageArt": [
      [
        "bus",
        "wait"
      ],
      [
        "bus"
      ],
      [
        "bus"
      ],
      [
        "seat"
      ],
      [
        "park"
      ],
      [
        "park",
        "bus"
      ]
    ],
    "coverArt": [
      "bus",
      "wait"
    ]
  },
  {
    "id": "picnic-fruit",
    "title": "UU 分享水果",
    "emoji": "🍐",
    "level": "L4",
    "topic": "read-picnic-fruit",
    "scene": "野餐与分享",
    "question": "UU 给朋友的是什么水果？",
    "answer": "pear",
    "choices": [
      "pear",
      "banana",
      "orange"
    ],
    "pages": [
      [
        "🍐",
        "UU takes a basket to the park.",
        "UU 提着篮子去公园。",
        [
          "basket",
          "park"
        ]
      ],
      [
        "🍐",
        "UU has an apple.",
        "UU 有一个苹果。",
        [
          "apple"
        ]
      ],
      [
        "🍐",
        "UU has a pear, too.",
        "UU 还有一个梨。",
        [
          "pear"
        ]
      ],
      [
        "🍐",
        "A friend is hungry.",
        "一位朋友饿了。",
        [
          "friend",
          "hungry"
        ]
      ],
      [
        "🍐",
        "UU shares the pear.",
        "UU 把梨分给朋友。",
        [
          "pear",
          "friend"
        ]
      ],
      [
        "🍐",
        "They eat under a tree.",
        "他们在树下吃水果。",
        [
          "tree",
          "apple",
          "pear"
        ]
      ]
    ],
    "pageArt": [
      [
        "basket",
        "park"
      ],
      [
        "apple"
      ],
      [
        "pear"
      ],
      [
        "friend",
        "hungry"
      ],
      [
        "pear",
        "friend"
      ],
      [
        "tree",
        "apple",
        "pear"
      ]
    ],
    "coverArt": [
      "pear",
      "basket"
    ]
  },
  {
    "id": "teddy-sleep",
    "title": "UU 和小熊说晚安",
    "emoji": "🧸",
    "level": "L6",
    "topic": "read-teddy-sleep",
    "scene": "睡前与陪伴",
    "question": "UU 把哪个玩具放在床上？",
    "answer": "teddy",
    "choices": [
      "teddy",
      "robot",
      "kite"
    ],
    "pages": [
      [
        "🧸",
        "The moon is in the sky.",
        "月亮在天空中。",
        [
          "moon",
          "sky"
        ]
      ],
      [
        "🧸",
        "UU puts a book away.",
        "UU 把书收好。",
        [
          "book"
        ]
      ],
      [
        "🧸",
        "UU puts the teddy on the bed.",
        "UU 把玩具熊放到床上。",
        [
          "teddy",
          "bed"
        ]
      ],
      [
        "🧸",
        "UU turns off the lamp.",
        "UU 关掉台灯。",
        [
          "lamp"
        ]
      ],
      [
        "🧸",
        "Good night, little teddy.",
        "晚安，小熊。",
        [
          "teddy"
        ]
      ],
      [
        "🧸",
        "UU is ready to sleep.",
        "UU 准备睡觉了。",
        [
          "sleep",
          "bed"
        ]
      ]
    ],
    "pageArt": [
      [
        "moon",
        "sky"
      ],
      [
        "book"
      ],
      [
        "teddy",
        "bed"
      ],
      [
        "lamp"
      ],
      [
        "teddy"
      ],
      [
        "sleep",
        "bed"
      ]
    ],
    "coverArt": [
      "teddy",
      "moon"
    ]
  },
  {
    "id": "lost-hat",
    "title": "UU 找回小帽子",
    "emoji": "🧢",
    "level": "L7",
    "topic": "read-lost-hat",
    "scene": "观察与互助",
    "question": "UU 最后找回了什么？",
    "answer": "hat",
    "choices": [
      "hat",
      "bag",
      "shoes"
    ],
    "pages": [
      [
        "🧢",
        "UU wears a hat to the park.",
        "UU 戴着帽子去公园。",
        [
          "hat",
          "park"
        ]
      ],
      [
        "🧢",
        "The wind blows the hat away.",
        "风把帽子吹走了。",
        [
          "windy",
          "hat"
        ]
      ],
      [
        "🧢",
        "UU looks for the hat.",
        "UU 寻找帽子。",
        [
          "look",
          "hat"
        ]
      ],
      [
        "🧢",
        "A friend sees it by a tree.",
        "一位朋友在树旁看见了它。",
        [
          "friend",
          "tree",
          "hat"
        ]
      ],
      [
        "🧢",
        "The friend brings the hat to UU.",
        "朋友把帽子拿给 UU。",
        [
          "hat",
          "friend"
        ]
      ],
      [
        "🧢",
        "UU says thank you and holds it tight.",
        "UU 说了谢谢，然后牢牢拿住帽子。",
        [
          "hat",
          "thank you"
        ]
      ]
    ],
    "pageArt": [
      [
        "hat",
        "park"
      ],
      [
        "windy",
        "hat"
      ],
      [
        "look",
        "hat"
      ],
      [
        "friend",
        "tree",
        "hat"
      ],
      [
        "hat",
        "friend"
      ],
      [
        "hat",
        "thank you"
      ]
    ],
    "coverArt": [
      "hat",
      "park"
    ]
  },
  {
    "id": "library-return",
    "title": "UU 雨天还书",
    "emoji": "📚",
    "level": "L6",
    "topic": "read-library-return",
    "scene": "阅读与守护",
    "question": "UU 用什么挡雨？",
    "answer": "umbrella",
    "choices": [
      "umbrella",
      "hat",
      "towel"
    ],
    "pages": [
      [
        "📚",
        "UU needs to return a library book.",
        "UU 要归还一本图书馆的书。",
        [
          "library",
          "book"
        ]
      ],
      [
        "📚",
        "It starts to rain outside.",
        "外面开始下雨了。",
        [
          "rain"
        ]
      ],
      [
        "📚",
        "UU puts the book in a bag.",
        "UU 把书放进书包。",
        [
          "book",
          "bag"
        ]
      ],
      [
        "📚",
        "Then UU takes an umbrella.",
        "然后 UU 带上一把伞。",
        [
          "umbrella"
        ]
      ],
      [
        "📚",
        "The book stays dry on the way.",
        "一路上，书没有被淋湿。",
        [
          "bag",
          "book",
          "umbrella"
        ]
      ],
      [
        "📚",
        "UU returns it at the library.",
        "UU 到图书馆归还了书。",
        [
          "library",
          "book"
        ]
      ]
    ],
    "pageArt": [
      [
        "library",
        "book"
      ],
      [
        "rain"
      ],
      [
        "book",
        "bag"
      ],
      [
        "umbrella"
      ],
      [
        "bag",
        "book",
        "umbrella"
      ],
      [
        "library",
        "book"
      ]
    ],
    "coverArt": [
      "umbrella",
      "library"
    ]
  },
  {
    "id": "vegetable-soup",
    "title": "UU 的蔬菜汤",
    "emoji": "🥕",
    "level": "L6",
    "topic": "read-vegetable-soup",
    "scene": "食物与合作",
    "question": "汤里放了哪种橙色蔬菜？",
    "answer": "carrot",
    "choices": [
      "carrot",
      "cucumber",
      "cabbage"
    ],
    "pages": [
      [
        "🥕",
        "UU helps make soup in the kitchen.",
        "UU 在厨房帮忙做汤。",
        [
          "kitchen",
          "soup"
        ]
      ],
      [
        "🥕",
        "First, UU washes a carrot.",
        "首先，UU 洗了一根胡萝卜。",
        [
          "carrot",
          "water"
        ]
      ],
      [
        "🥕",
        "Then UU washes a potato.",
        "然后 UU 洗了一个土豆。",
        [
          "potato",
          "water"
        ]
      ],
      [
        "🥕",
        "A grown-up cuts the vegetables.",
        "一位大人切好了蔬菜。",
        [
          "carrot",
          "potato"
        ]
      ],
      [
        "🥕",
        "The vegetables go into the soup.",
        "蔬菜被放进汤里。",
        [
          "soup",
          "carrot",
          "potato"
        ]
      ],
      [
        "🥕",
        "UU shares the warm soup with family.",
        "UU 和家人分享热乎乎的汤。",
        [
          "soup",
          "family"
        ]
      ]
    ],
    "pageArt": [
      [
        "kitchen",
        "soup"
      ],
      [
        "carrot",
        "water"
      ],
      [
        "potato",
        "water"
      ],
      [
        "carrot",
        "potato"
      ],
      [
        "soup",
        "carrot",
        "potato"
      ],
      [
        "soup",
        "family"
      ]
    ],
    "coverArt": [
      "carrot",
      "kitchen"
    ]
  },
  {
    "id": "rainy-picnic",
    "title": "UU 的雨天野餐计划",
    "emoji": "☔",
    "level": "L8",
    "topic": "read-rainy-picnic",
    "scene": "计划与应变",
    "question": "下雨后，大家在什么地方野餐？",
    "answer": "home",
    "choices": [
      "home",
      "park",
      "school"
    ],
    "pages": [
      [
        "☔",
        "UU packs bread and fruit for a picnic in the park.",
        "UU 装好面包和水果，准备去公园野餐。",
        [
          "bread",
          "apple",
          "basket"
        ]
      ],
      [
        "☔",
        "But dark clouds arrive before UU leaves home.",
        "但是 UU 出门前，天空飘来了乌云。",
        [
          "cloudy",
          "home"
        ]
      ],
      [
        "☔",
        "When the rain begins, UU makes a new plan.",
        "雨下起来时，UU 想了一个新计划。",
        [
          "rain",
          "look"
        ]
      ],
      [
        "☔",
        "UU puts the picnic basket on the table at home.",
        "UU 把野餐篮子放在家里的桌子上。",
        [
          "basket",
          "table",
          "home"
        ]
      ],
      [
        "☔",
        "The family shares the food and listens to the rain.",
        "家人一起分享食物，听着外面的雨声。",
        [
          "family",
          "bread",
          "rain"
        ]
      ],
      [
        "☔",
        "The plan is different, but everyone has a good time.",
        "虽然计划变了，但大家都玩得很开心。",
        [
          "happy",
          "family"
        ]
      ]
    ],
    "pageArt": [
      [
        "bread",
        "apple",
        "basket"
      ],
      [
        "cloudy",
        "home"
      ],
      [
        "rain",
        "look"
      ],
      [
        "basket",
        "table",
        "home"
      ],
      [
        "family",
        "bread",
        "rain"
      ],
      [
        "happy",
        "family"
      ]
    ],
    "coverArt": [
      "home",
      "bread"
    ]
  },
  {
    "id": "airport-bag",
    "title": "UU 检查旅行包",
    "emoji": "🎒",
    "level": "L8",
    "topic": "read-airport-bag",
    "scene": "出行与准备",
    "question": "UU 发现少了哪样东西？",
    "answer": "ticket",
    "choices": [
      "ticket",
      "book",
      "hat"
    ],
    "pages": [
      [
        "🎒",
        "UU is going to the airport with the family.",
        "UU 要和家人一起去机场。",
        [
          "airport",
          "family"
        ]
      ],
      [
        "🎒",
        "Before they leave, UU checks the bag one more time.",
        "出发前，UU 又检查了一遍旅行包。",
        [
          "bag",
          "look"
        ]
      ],
      [
        "🎒",
        "The book is inside, but the ticket is missing.",
        "书在包里，但是机票不见了。",
        [
          "book",
          "bag"
        ]
      ],
      [
        "🎒",
        "UU remembers putting the ticket on the table.",
        "UU 想起把机票放在了桌子上。",
        [
          "ticket",
          "table"
        ]
      ],
      [
        "🎒",
        "UU finds it there and puts it safely in the bag.",
        "UU 在那里找到了机票，把它妥当地放进包里。",
        [
          "ticket",
          "bag"
        ]
      ],
      [
        "🎒",
        "Now the family is ready to go to the airport.",
        "现在，一家人准备好去机场了。",
        [
          "family",
          "airport"
        ]
      ]
    ],
    "pageArt": [
      [
        "airport",
        "family"
      ],
      [
        "bag",
        "look"
      ],
      [
        "book",
        "bag"
      ],
      [
        "ticket",
        "table"
      ],
      [
        "ticket",
        "bag"
      ],
      [
        "family",
        "airport"
      ]
    ],
    "coverArt": [
      "ticket",
      "airport"
    ]
  },
  {
    "id": "garden-helper",
    "title": "UU 和口渴的小花",
    "emoji": "🌷",
    "level": "L7",
    "topic": "read-garden-helper",
    "scene": "观察与照料",
    "question": "UU 给小花浇了什么？",
    "answer": "water",
    "choices": [
      "water",
      "juice",
      "milk"
    ],
    "pages": [
      [
        "🌷",
        "UU sees a small flower in the sunny garden.",
        "UU 在阳光下的花园里看见一朵小花。",
        [
          "flower",
          "sunny"
        ]
      ],
      [
        "🌷",
        "Its leaves hang down because the soil is dry.",
        "因为土壤干了，花的叶子低垂着。",
        [
          "leaf",
          "flower"
        ]
      ],
      [
        "🌷",
        "UU fills a cup with water and asks for help.",
        "UU 接了一杯水，并请大人帮忙。",
        [
          "cup",
          "water"
        ]
      ],
      [
        "🌷",
        "Together, they pour a little water around the flower.",
        "他们一起给小花周围浇了一点水。",
        [
          "water",
          "flower"
        ]
      ],
      [
        "🌷",
        "The next morning, UU sees the leaves standing up.",
        "第二天早上，UU 看见叶子挺了起来。",
        [
          "leaf",
          "flower"
        ]
      ],
      [
        "🌷",
        "UU smiles and remembers to check the flower each day.",
        "UU 笑了，并记着每天看看这朵花。",
        [
          "happy",
          "flower"
        ]
      ]
    ],
    "pageArt": [
      [
        "flower",
        "sunny"
      ],
      [
        "leaf",
        "flower"
      ],
      [
        "cup",
        "water"
      ],
      [
        "water",
        "flower"
      ],
      [
        "leaf",
        "flower"
      ],
      [
        "happy",
        "flower"
      ]
    ],
    "coverArt": [
      "water",
      "flower"
    ]
  },
  {
    "id": "library-friends",
    "title": "UU 和朋友轮流读",
    "emoji": "📖",
    "level": "L8",
    "topic": "read-library-friends",
    "scene": "轮流与合作",
    "question": "UU 和朋友想读的故事里有什么动物？",
    "answer": "rabbit",
    "choices": [
      "rabbit",
      "tiger",
      "panda"
    ],
    "pages": [
      [
        "📖",
        "UU and a friend choose the same book at the library.",
        "UU 和一位朋友在图书馆选中了同一本书。",
        [
          "friend",
          "book",
          "library"
        ]
      ],
      [
        "📖",
        "Both want to read the story about a little rabbit.",
        "他们都想读那只小兔子的故事。",
        [
          "book",
          "rabbit"
        ]
      ],
      [
        "📖",
        "Instead of arguing, UU suggests reading the book together.",
        "UU 没有争吵，而是提议一起读这本书。",
        [
          "friend",
          "book"
        ]
      ],
      [
        "📖",
        "The friend reads first while UU points to the pictures.",
        "朋友先读，UU 指着书里的图画。",
        [
          "read",
          "book"
        ]
      ],
      [
        "📖",
        "Then they change roles and read the next page.",
        "然后他们交换角色，读下一页。",
        [
          "read",
          "friend"
        ]
      ],
      [
        "📖",
        "They finish the story and choose another book to share.",
        "他们读完了故事，又选了一本书一起读。",
        [
          "book",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "friend",
        "book",
        "library"
      ],
      [
        "book",
        "rabbit"
      ],
      [
        "friend",
        "book"
      ],
      [
        "read",
        "book"
      ],
      [
        "read",
        "friend"
      ],
      [
        "book",
        "friend"
      ]
    ],
    "coverArt": [
      "rabbit",
      "friend"
    ]
  },
  {
    "id": "beach-care",
    "title": "UU 让海边更干净",
    "emoji": "🏖️",
    "level": "L8",
    "topic": "read-beach-care",
    "scene": "环境与行动",
    "question": "UU 把捡到的纸放进了哪里？",
    "answer": "basket",
    "choices": [
      "basket",
      "cup",
      "bowl"
    ],
    "pages": [
      [
        "🏖️",
        "UU walks by the sea and sees paper on the sand.",
        "UU 在海边散步，看见沙滩上有纸。",
        [
          "sea",
          "paper"
        ]
      ],
      [
        "🏖️",
        "A grown-up checks that the paper is safe to pick up.",
        "一位大人先确认这张纸可以安全捡起。",
        [
          "paper"
        ]
      ],
      [
        "🏖️",
        "UU puts on gloves before picking up the paper.",
        "UU 戴好手套，才把纸捡起来。",
        [
          "gloves",
          "paper"
        ]
      ],
      [
        "🏖️",
        "Then UU puts it in a basket for the bin.",
        "然后 UU 把纸放进篮子，准备倒进垃圾桶。",
        [
          "paper",
          "basket"
        ]
      ],
      [
        "🏖️",
        "A little crab walks across the clean sand nearby.",
        "一只小螃蟹从旁边干净的沙滩上爬过。",
        [
          "crab",
          "sea"
        ]
      ],
      [
        "🏖️",
        "UU leaves the beach cleaner than it was before.",
        "UU 离开时，海滩比刚来时更干净了。",
        [
          "sea",
          "happy"
        ]
      ]
    ],
    "pageArt": [
      [
        "sea",
        "paper"
      ],
      [
        "paper"
      ],
      [
        "gloves",
        "paper"
      ],
      [
        "paper",
        "basket"
      ],
      [
        "crab",
        "sea"
      ],
      [
        "sea",
        "happy"
      ]
    ],
    "coverArt": [
      "basket",
      "sea"
    ]
  },
  {
    "id": "birthday-plan",
    "title": "UU 准备生日惊喜",
    "emoji": "🎂",
    "level": "L8",
    "topic": "read-birthday-plan",
    "scene": "庆祝与关心",
    "question": "UU 为朋友准备了什么食物？",
    "answer": "cake",
    "choices": [
      "cake",
      "bread",
      "soup"
    ],
    "pages": [
      [
        "🎂",
        "UU wants to make a birthday surprise for a friend.",
        "UU 想给一位朋友准备生日惊喜。",
        [
          "friend",
          "balloon"
        ]
      ],
      [
        "🎂",
        "First, UU asks the family to help make a cake.",
        "首先，UU 请家人帮忙做一个蛋糕。",
        [
          "family",
          "cake"
        ]
      ],
      [
        "🎂",
        "While the cake cools, UU draws a picture of flowers.",
        "蛋糕放凉时，UU 画了一幅小花的画。",
        [
          "draw",
          "flower"
        ]
      ],
      [
        "🎂",
        "UU puts the picture beside the cake on the table.",
        "UU 把画放在桌上的蛋糕旁边。",
        [
          "flower",
          "cake",
          "table"
        ]
      ],
      [
        "🎂",
        "When the friend arrives, everyone sings a birthday song.",
        "朋友到来时，大家一起唱起了生日歌。",
        [
          "friend",
          "singer"
        ]
      ],
      [
        "🎂",
        "The friend smiles because UU remembered this special day.",
        "朋友笑了，因为 UU 记住了这个特别的日子。",
        [
          "friend",
          "happy"
        ]
      ]
    ],
    "pageArt": [
      [
        "friend",
        "balloon"
      ],
      [
        "family",
        "cake"
      ],
      [
        "draw",
        "flower"
      ],
      [
        "flower",
        "cake",
        "table"
      ],
      [
        "friend",
        "singer"
      ],
      [
        "friend",
        "happy"
      ]
    ],
    "coverArt": [
      "cake",
      "friend"
    ]
  },
  {
    "id": "farm-duck",
    "title": "UU 帮小鸭喝水",
    "emoji": "🦆",
    "level": "L8",
    "topic": "read-farm-duck",
    "scene": "动物与需求",
    "question": "小鸭最后喝的是什么？",
    "answer": "water",
    "choices": [
      "water",
      "milk",
      "tea"
    ],
    "pages": [
      [
        "🦆",
        "UU visits a farm and meets a little duck.",
        "UU 来到农场，遇见一只小鸭子。",
        [
          "duck",
          "farmer"
        ]
      ],
      [
        "🦆",
        "The duck walks to a bowl, but the bowl is empty.",
        "小鸭走到碗旁边，可是碗里是空的。",
        [
          "duck",
          "bowl"
        ]
      ],
      [
        "🦆",
        "UU asks the farmer if the duck needs water.",
        "UU 问农夫，小鸭是不是需要水。",
        [
          "farmer",
          "water"
        ]
      ],
      [
        "🦆",
        "The farmer fills the bowl while UU watches quietly.",
        "UU 安静地看着，农夫给碗里装好水。",
        [
          "farmer",
          "bowl",
          "water"
        ]
      ],
      [
        "🦆",
        "The duck drinks, then walks back to the grass.",
        "小鸭喝了水，然后走回草地。",
        [
          "duck",
          "grass"
        ]
      ],
      [
        "🦆",
        "UU learns to ask before feeding animals on the farm.",
        "UU 学会了在农场喂动物前先征求同意。",
        [
          "duck",
          "farmer"
        ]
      ]
    ],
    "pageArt": [
      [
        "duck",
        "farmer"
      ],
      [
        "duck",
        "bowl"
      ],
      [
        "farmer",
        "water"
      ],
      [
        "farmer",
        "bowl",
        "water"
      ],
      [
        "duck",
        "grass"
      ],
      [
        "duck",
        "farmer"
      ]
    ],
    "coverArt": [
      "water",
      "duck"
    ]
  },
  {
    "id": "team-ball",
    "title": "UU 学会一起传球",
    "emoji": "⚽",
    "level": "L9",
    "topic": "read-team-ball",
    "scene": "运动与团队",
    "question": "UU 和朋友们一起玩的是什么？",
    "answer": "ball",
    "choices": [
      "ball",
      "kite",
      "drum"
    ],
    "pages": [
      [
        "⚽",
        "UU and two friends bring a ball to the park.",
        "UU 和两位朋友带着球来到公园。",
        [
          "friend",
          "ball",
          "park"
        ]
      ],
      [
        "⚽",
        "At first, everyone runs after the ball at once.",
        "一开始，大家都同时追着球跑。",
        [
          "run",
          "ball"
        ]
      ],
      [
        "⚽",
        "They stop because one friend has not had a turn.",
        "他们停下来，因为有一位朋友还没有轮到。",
        [
          "friend",
          "ball"
        ]
      ],
      [
        "⚽",
        "UU suggests passing the ball to each person in turn.",
        "UU 提议按照顺序把球传给每一个人。",
        [
          "ball",
          "friend"
        ]
      ],
      [
        "⚽",
        "Now each friend can catch the ball and pass it on.",
        "现在，每位朋友都能接到球，再把它传出去。",
        [
          "catching",
          "ball"
        ]
      ],
      [
        "⚽",
        "They enjoy the game more when everyone can join in.",
        "每个人都能参与时，大家玩得更开心了。",
        [
          "happy",
          "friend",
          "ball"
        ]
      ]
    ],
    "pageArt": [
      [
        "friend",
        "ball",
        "park"
      ],
      [
        "run",
        "ball"
      ],
      [
        "friend",
        "ball"
      ],
      [
        "ball",
        "friend"
      ],
      [
        "catching",
        "ball"
      ],
      [
        "happy",
        "friend",
        "ball"
      ]
    ],
    "coverArt": [
      "ball",
      "friend"
    ]
  },
  {
    "id": "fox-box",
    "title": "UU 和狐狸的盒子",
    "level": "L4",
    "emoji": "🦊",
    "scene": "和狐狸的盒子",
    "question": "狐狸在哪里？",
    "answer": "box",
    "choices": [
      "box",
      "bed",
      "chair"
    ],
    "pages": [
      [
        "🦊",
        "UU sees a fox.",
        "UU 看见一只狐狸。",
        [
          "fox"
        ]
      ],
      [
        "🦊",
        "The fox sees a box.",
        "狐狸看见一个盒子。",
        [
          "fox",
          "box"
        ]
      ],
      [
        "🦊",
        "The box is big.",
        "盒子很大。",
        [
          "box"
        ]
      ],
      [
        "🦊",
        "The fox is small.",
        "狐狸很小。",
        [
          "fox"
        ]
      ],
      [
        "🦊",
        "The fox is in the box.",
        "狐狸在盒子里。",
        [
          "fox",
          "box"
        ]
      ],
      [
        "🦊",
        "UU waves to the fox.",
        "UU 向狐狸挥手。",
        [
          "hand",
          "fox"
        ]
      ]
    ],
    "pageArt": [
      [
        "fox"
      ],
      [
        "fox",
        "box"
      ],
      [
        "box"
      ],
      [
        "fox"
      ],
      [
        "fox",
        "box"
      ],
      [
        "hand",
        "fox"
      ]
    ],
    "coverArt": [
      "fox"
    ],
    "topic": "read-fox-box"
  },
  {
    "id": "frog-pond",
    "title": "UU 找小青蛙",
    "level": "L4",
    "emoji": "🐸",
    "scene": "找小青蛙",
    "question": "青蛙在哪里？",
    "answer": "pond",
    "choices": [
      "pond",
      "bed",
      "box"
    ],
    "pages": [
      [
        "🐸",
        "UU sees a pond.",
        "UU 看见一个池塘。",
        [
          "pond"
        ]
      ],
      [
        "🐸",
        "UU sees a frog.",
        "UU 看见一只青蛙。",
        [
          "frog"
        ]
      ],
      [
        "🐸",
        "The frog is green.",
        "青蛙是绿色的。",
        [
          "frog",
          "green"
        ]
      ],
      [
        "🐸",
        "The frog is by a leaf.",
        "青蛙在叶子旁。",
        [
          "frog",
          "leaf"
        ]
      ],
      [
        "🐸",
        "The frog jumps into the pond.",
        "青蛙跳进池塘。",
        [
          "frog",
          "pond"
        ]
      ],
      [
        "🐸",
        "UU watches the pond.",
        "UU 看着池塘。",
        [
          "pond"
        ]
      ]
    ],
    "pageArt": [
      [
        "pond"
      ],
      [
        "frog"
      ],
      [
        {
          "word": "frog",
          "variant": "green"
        }
      ],
      [
        "frog",
        "leaf"
      ],
      [
        "frog",
        "pond"
      ],
      [
        "pond"
      ]
    ],
    "coverArt": [
      "pond"
    ],
    "topic": "read-frog-pond"
  },
  {
    "id": "new-fruits",
    "title": "UU 的新水果盘",
    "level": "L2",
    "emoji": "🫐",
    "scene": "的新水果盘",
    "question": "哪种水果是蓝色的小果子？",
    "answer": "blueberry",
    "choices": [
      "blueberry",
      "lime",
      "melon"
    ],
    "pages": [
      [
        "🫐",
        "UU has a plate.",
        "UU 有一个盘子。",
        [
          "plate"
        ]
      ],
      [
        "🫐",
        "Here is a plum.",
        "这里有一个李子。",
        [
          "plum"
        ]
      ],
      [
        "🫐",
        "Here is a lime.",
        "这里有一个青柠。",
        [
          "lime"
        ]
      ],
      [
        "🫐",
        "Here is a melon.",
        "这里有一个甜瓜。",
        [
          "melon"
        ]
      ],
      [
        "🫐",
        "Here is a blueberry.",
        "这里有一颗蓝莓。",
        [
          "blueberry"
        ]
      ],
      [
        "🫐",
        "UU shares the fruit.",
        "UU 分享水果。",
        [
          "plate",
          "blueberry",
          "plum"
        ]
      ]
    ],
    "pageArt": [
      [
        "plate"
      ],
      [
        "plum"
      ],
      [
        "lime"
      ],
      [
        "melon"
      ],
      [
        "blueberry"
      ],
      [
        "plate",
        "blueberry",
        "plum"
      ]
    ],
    "coverArt": [
      "plate"
    ],
    "topic": "read-new-fruits"
  },
  {
    "id": "dress-day",
    "title": "UU 穿好出门",
    "level": "L6",
    "emoji": "🧦",
    "scene": "穿好出门",
    "question": "UU 最后穿上什么？",
    "answer": "boot",
    "choices": [
      "boot",
      "vest",
      "sock"
    ],
    "pages": [
      [
        "🧦",
        "UU puts on a vest.",
        "UU 穿上背心。",
        [
          "vest"
        ]
      ],
      [
        "🧦",
        "UU puts on blue jeans.",
        "UU 穿上蓝色牛仔裤。",
        [
          "jeans"
        ]
      ],
      [
        "🧦",
        "UU puts on a sweater.",
        "UU 穿上毛衣。",
        [
          "sweater"
        ]
      ],
      [
        "🧦",
        "UU finds a sock.",
        "UU 找到一只袜子。",
        [
          "sock"
        ]
      ],
      [
        "🧦",
        "UU finds one boot, then the other.",
        "UU 找到一只靴子，然后找到另一只。",
        [
          "boot"
        ]
      ],
      [
        "🧦",
        "UU puts on the boots and is ready.",
        "UU 穿上靴子，准备好了。",
        [
          "boot"
        ]
      ]
    ],
    "pageArt": [
      [
        "vest"
      ],
      [
        "jeans"
      ],
      [
        "sweater"
      ],
      [
        "sock"
      ],
      [
        "boot"
      ],
      [
        "boot"
      ]
    ],
    "coverArt": [
      "vest"
    ],
    "topic": "read-dress-day"
  },
  {
    "id": "garden-snail",
    "title": "UU 和花园蜗牛",
    "level": "L5",
    "emoji": "🐌",
    "scene": "和花园蜗牛",
    "question": "蜗牛爬到了哪里？",
    "answer": "leaf",
    "choices": [
      "leaf",
      "box",
      "chair"
    ],
    "pages": [
      [
        "🐌",
        "UU looks in the garden.",
        "UU 在花园里观察。",
        [
          "garden"
        ]
      ],
      [
        "🐌",
        "UU sees a little snail.",
        "UU 看见一只小蜗牛。",
        [
          "snail"
        ]
      ],
      [
        "🐌",
        "The snail moves slowly.",
        "蜗牛慢慢移动。",
        [
          "snail"
        ]
      ],
      [
        "🐌",
        "The snail moves to a leaf.",
        "蜗牛爬向一片叶子。",
        [
          "snail",
          "leaf"
        ]
      ],
      [
        "🐌",
        "The snail rests on the leaf.",
        "蜗牛在叶子上休息。",
        [
          "snail",
          "leaf"
        ]
      ],
      [
        "🐌",
        "UU watches and does not touch.",
        "UU 静静观察，没有触碰。",
        [
          "snail",
          "leaf"
        ]
      ]
    ],
    "pageArt": [
      [
        "garden"
      ],
      [
        "snail"
      ],
      [
        "snail"
      ],
      [
        "snail",
        "leaf"
      ],
      [
        "snail",
        "leaf"
      ],
      [
        "snail",
        "leaf"
      ]
    ],
    "coverArt": [
      "garden"
    ],
    "topic": "read-garden-snail"
  },
  {
    "id": "music-bell",
    "title": "UU 的音乐时间",
    "level": "L5",
    "emoji": "🔔",
    "scene": "的音乐时间",
    "question": "什么发出叮铃声？",
    "answer": "bell",
    "choices": [
      "bell",
      "book",
      "bowl"
    ],
    "pages": [
      [
        "🔔",
        "UU sees a little drum.",
        "UU 看见一面小鼓。",
        [
          "drum"
        ]
      ],
      [
        "🔔",
        "UU taps the drum.",
        "UU 轻敲小鼓。",
        [
          "drum",
          "hand"
        ]
      ],
      [
        "🔔",
        "UU sees a little bell.",
        "UU 看见一个小铃铛。",
        [
          "bell"
        ]
      ],
      [
        "🔔",
        "UU rings the bell.",
        "UU 摇响铃铛。",
        [
          "bell"
        ]
      ],
      [
        "🔔",
        "The bell rings, ding, ding!",
        "铃铛叮叮响！",
        [
          "bell"
        ]
      ],
      [
        "🔔",
        "UU shares the drum with a friend.",
        "UU 和朋友分享小鼓。",
        [
          "drum",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "drum"
      ],
      [
        "drum",
        "hand"
      ],
      [
        "bell"
      ],
      [
        "bell"
      ],
      [
        "bell"
      ],
      [
        "drum",
        "friend"
      ]
    ],
    "coverArt": [
      "drum"
    ],
    "topic": "read-music-bell"
  },
  {
    "id": "art-apron",
    "title": "UU 画一面小旗",
    "level": "L6",
    "emoji": "🎨",
    "scene": "画一面小旗",
    "question": "什么让 UU 的衣服保持干净？",
    "answer": "apron",
    "choices": [
      "apron",
      "paper",
      "flag"
    ],
    "pages": [
      [
        "🎨",
        "UU gets paper and a paintbrush.",
        "UU 拿来画纸和画笔。",
        [
          "paper",
          "paintbrush"
        ]
      ],
      [
        "🎨",
        "First, UU puts on an apron.",
        "首先，UU 穿上围裙。",
        [
          "apron"
        ]
      ],
      [
        "🎨",
        "Then UU draws a little flag.",
        "然后，UU 画了一面小旗。",
        [
          "flag",
          "paper"
        ]
      ],
      [
        "🎨",
        "UU paints the flag red.",
        "UU 把小旗涂成红色。",
        [
          "flag",
          "red"
        ]
      ],
      [
        "🎨",
        "A drop of paint lands on the apron.",
        "一滴颜料落在围裙上。",
        [
          "apron",
          "paint"
        ]
      ],
      [
        "🎨",
        "The clothes stay clean under the apron.",
        "围裙下面的衣服保持干净。",
        [
          "apron",
          "shirt"
        ]
      ]
    ],
    "pageArt": [
      [
        "paper",
        "paintbrush"
      ],
      [
        "apron"
      ],
      [
        "flag",
        "paper"
      ],
      [
        {
          "word": "flag",
          "variant": "red"
        }
      ],
      [
        "apron",
        "paint"
      ],
      [
        "apron",
        "shirt"
      ]
    ],
    "coverArt": [
      "paper",
      "paintbrush"
    ],
    "topic": "read-art-apron"
  },
  {
    "id": "aquarium-visit",
    "title": "UU 参观水族馆",
    "level": "L7",
    "emoji": "🐠",
    "scene": "参观水族馆",
    "question": "什么动物有八只腕？",
    "answer": "octopus",
    "choices": [
      "octopus",
      "fish",
      "turtle"
    ],
    "pages": [
      [
        "🐠",
        "UU visits the aquarium with a grown-up.",
        "UU 和大人一起参观水族馆。",
        [
          "aquarium"
        ]
      ],
      [
        "🐠",
        "First, UU watches a little fish swim.",
        "首先，UU 看小鱼游泳。",
        [
          "fish"
        ]
      ],
      [
        "🐠",
        "Then a turtle swims past.",
        "然后，一只海龟游过。",
        [
          "turtle"
        ]
      ],
      [
        "🐠",
        "UU sees an octopus with eight arms.",
        "UU 看见一只有八只腕的章鱼。",
        [
          "octopus",
          "eight"
        ]
      ],
      [
        "🐠",
        "A jellyfish floats beside a rock.",
        "一只水母漂在石头旁。",
        [
          "jellyfish"
        ]
      ],
      [
        "🐠",
        "UU waves goodbye without tapping the glass.",
        "UU 挥手告别，没有敲玻璃。",
        [
          "hand",
          "fish"
        ]
      ]
    ],
    "pageArt": [
      [
        "aquarium"
      ],
      [
        "fish"
      ],
      [
        "turtle"
      ],
      [
        "octopus",
        "eight"
      ],
      [
        "jellyfish"
      ],
      [
        "hand",
        "fish"
      ]
    ],
    "coverArt": [
      "aquarium"
    ],
    "topic": "read-aquarium-visit"
  },
  {
    "id": "dentist-smile",
    "title": "UU 看牙医",
    "level": "L6",
    "emoji": "🦷",
    "scene": "看牙医",
    "question": "UU 用什么刷牙？",
    "answer": "toothbrush",
    "choices": [
      "toothbrush",
      "comb",
      "spoon"
    ],
    "pages": [
      [
        "🦷",
        "UU visits the dentist with a grown-up.",
        "UU 和大人一起去看牙医。",
        [
          "dentist"
        ]
      ],
      [
        "🦷",
        "The dentist asks UU to open wide.",
        "牙医请 UU 张大嘴巴。",
        [
          "dentist",
          "mouth"
        ]
      ],
      [
        "🦷",
        "UU opens the mouth for a check.",
        "UU 张开嘴巴接受检查。",
        [
          "mouth",
          "tooth"
        ]
      ],
      [
        "🦷",
        "The dentist shows UU a toothbrush.",
        "牙医向 UU 展示牙刷。",
        [
          "dentist",
          "toothbrush"
        ]
      ],
      [
        "🦷",
        "At home, UU brushes with help.",
        "回家后，UU 在大人帮助下刷牙。",
        [
          "toothbrush",
          "toothpaste"
        ]
      ],
      [
        "🦷",
        "UU smiles with clean teeth.",
        "UU 露出干净的牙齿笑了。",
        [
          "smile",
          "tooth"
        ]
      ]
    ],
    "pageArt": [
      [
        "dentist"
      ],
      [
        "dentist",
        "mouth"
      ],
      [
        "mouth",
        "tooth"
      ],
      [
        "dentist",
        "toothbrush"
      ],
      [
        "toothbrush",
        "toothpaste"
      ],
      [
        "smile",
        "tooth"
      ]
    ],
    "coverArt": [
      "dentist"
    ],
    "topic": "read-dentist-smile"
  },
  {
    "id": "wallet-help",
    "title": "UU 帮忙找钱包",
    "level": "L7",
    "emoji": "👛",
    "scene": "帮忙找钱包",
    "question": "UU 找到了什么？",
    "answer": "wallet",
    "choices": [
      "wallet",
      "ticket",
      "ring"
    ],
    "pages": [
      [
        "👛",
        "At the market, a grown-up cannot find a wallet.",
        "在市场里，一位大人找不到钱包了。",
        [
          "market",
          "wallet"
        ]
      ],
      [
        "👛",
        "UU looks under the bench, but it is not there.",
        "UU 看了长椅下面，那里没有。",
        [
          "bench"
        ]
      ],
      [
        "👛",
        "Then UU sees a wallet beside a basket.",
        "接着，UU 看见篮子旁有一个钱包。",
        [
          "wallet",
          "basket"
        ]
      ],
      [
        "👛",
        "UU tells a police officer about the wallet.",
        "UU 把钱包的事告诉一位警察。",
        [
          "police officer",
          "wallet"
        ]
      ],
      [
        "👛",
        "The officer checks who owns it before returning it.",
        "警察确认失主身份后归还钱包。",
        [
          "police officer",
          "wallet"
        ]
      ],
      [
        "👛",
        "The grown-up says thank you, and UU smiles.",
        "那位大人道谢，UU 笑了。",
        [
          "smile",
          "wallet"
        ]
      ]
    ],
    "pageArt": [
      [
        "market",
        "wallet"
      ],
      [
        "bench"
      ],
      [
        "wallet",
        "basket"
      ],
      [
        "police officer",
        "wallet"
      ],
      [
        "police officer",
        "wallet"
      ],
      [
        "smile",
        "wallet"
      ]
    ],
    "coverArt": [
      "market",
      "wallet"
    ],
    "topic": "read-wallet-help"
  },
  {
    "id": "forest-walk",
    "title": "UU 的森林观察记",
    "level": "L7",
    "emoji": "🌲",
    "scene": "的森林观察记",
    "question": "UU 跟着谁走在小路上？",
    "answer": "father",
    "choices": [
      "father",
      "owl",
      "fox"
    ],
    "pages": [
      [
        "🌲",
        "UU walks through the forest with Father.",
        "UU 和爸爸一起穿过森林。",
        [
          "forest",
          "father"
        ]
      ],
      [
        "🌲",
        "An owl rests in a tree, so they speak quietly.",
        "猫头鹰在树上休息，所以他们轻声说话。",
        [
          "owl",
          "tree"
        ]
      ],
      [
        "🌲",
        "Near a log, UU spots a spider and its web.",
        "在木头旁，UU 发现蜘蛛和它的网。",
        [
          "log",
          "spider",
          "web"
        ]
      ],
      [
        "🌲",
        "UU wants to look closer but stays on the path.",
        "UU 想靠近观察，但仍留在小路上。",
        [
          "forest",
          "spider"
        ]
      ],
      [
        "🌲",
        "Father points to a frog beside the pond.",
        "爸爸指着池塘边的一只青蛙。",
        [
          "father",
          "frog",
          "pond"
        ]
      ],
      [
        "🌲",
        "They leave the animals in peace and walk home.",
        "他们不打扰动物，走回家。",
        [
          "home",
          "father"
        ]
      ]
    ],
    "pageArt": [
      [
        "forest",
        "father"
      ],
      [
        "owl",
        "tree"
      ],
      [
        "log",
        "spider",
        "web"
      ],
      [
        "forest",
        "spider"
      ],
      [
        "father",
        "frog",
        "pond"
      ],
      [
        "home",
        "father"
      ]
    ],
    "coverArt": [
      "forest",
      "father"
    ],
    "topic": "read-forest-walk"
  },
  {
    "id": "pool-safety",
    "title": "UU 的游泳准备",
    "level": "L8",
    "emoji": "🏊",
    "scene": "的游泳准备",
    "question": "UU 带了什么擦干身体？",
    "answer": "towel",
    "choices": [
      "towel",
      "paper",
      "rug"
    ],
    "pages": [
      [
        "🏊",
        "UU plans a swim with a grown-up.",
        "UU 计划和大人一起游泳。",
        [
          "pool"
        ]
      ],
      [
        "🏊",
        "First, UU packs a swimming cap, a towel and water.",
        "首先，UU 装好泳帽、毛巾和水。",
        [
          "towel",
          "bottle"
        ],
        "story-pool-safety-1-v42.wav"
      ],
      [
        "🏊",
        "At the pool, the floor is wet, so UU walks slowly.",
        "游泳馆地面湿，所以 UU 慢慢走。",
        [
          "pool",
          "slow"
        ]
      ],
      [
        "🏊",
        "UU waits for the grown-up before entering the water.",
        "UU 等大人一起，才进入水中。",
        [
          "pool",
          "wait"
        ]
      ],
      [
        "🏊",
        "After swimming, UU uses the towel to get dry.",
        "游泳后，UU 用毛巾擦干身体。",
        [
          "towel"
        ]
      ],
      [
        "🏊",
        "Then UU drinks water and rests beside the grown-up.",
        "然后，UU 喝水，坐在大人身边休息。",
        [
          "bottle",
          "seat"
        ]
      ]
    ],
    "pageArt": [
      [
        "pool"
      ],
      [
        {
          "word": "cap",
          "variant": "swimming"
        },
        "towel",
        "bottle"
      ],
      [
        "pool",
        "slow"
      ],
      [
        "pool",
        "wait"
      ],
      [
        "towel"
      ],
      [
        "bottle",
        "seat"
      ]
    ],
    "coverArt": [
      "pool"
    ],
    "topic": "read-pool-safety"
  },
  {
    "id": "soup-share",
    "title": "UU 煮一锅新鲜汤",
    "level": "L8",
    "emoji": "🥘",
    "scene": "煮一锅新鲜汤",
    "question": "UU 最后把汤装在哪里？",
    "answer": "bowl",
    "choices": [
      "bowl",
      "pan",
      "box"
    ],
    "pages": [
      [
        "🥘",
        "UU chooses spinach, a radish and some beans.",
        "UU 选了菠菜、萝卜和一些豆子。",
        [
          "spinach",
          "radish",
          "bean"
        ]
      ],
      [
        "🥘",
        "With a grown-up, UU washes the vegetables first.",
        "UU 和大人一起，先洗蔬菜。",
        [
          "spinach",
          "radish"
        ]
      ],
      [
        "🥘",
        "The grown-up cuts them because the knife is sharp.",
        "因为刀很锋利，所以由大人切菜。",
        [
          "radish",
          "bean"
        ]
      ],
      [
        "🥘",
        "The grown-up puts the vegetables in a pot to cook.",
        "大人把蔬菜放进锅里煮。",
        [
          "pot",
          "spinach"
        ]
      ],
      [
        "🥘",
        "When the soup cools, UU carries a bowl to the table.",
        "汤放凉后，UU 把一碗汤端到桌上。",
        [
          "bowl",
          "table"
        ]
      ],
      [
        "🥘",
        "UU shares the soup and thanks the grown-up for helping.",
        "UU 分享汤，并感谢大人的帮助。",
        [
          "soup",
          "bowl"
        ]
      ]
    ],
    "pageArt": [
      [
        "spinach",
        "radish",
        "bean"
      ],
      [
        "spinach",
        "radish"
      ],
      [
        "radish",
        "bean"
      ],
      [
        "pot",
        "spinach"
      ],
      [
        "bowl",
        "table"
      ],
      [
        "soup",
        "bowl"
      ]
    ],
    "coverArt": [
      "spinach",
      "radish"
    ],
    "topic": "read-soup-share"
  },
  {
    "id": "bus-coin",
    "title": "UU 准备坐公交",
    "level": "L7",
    "emoji": "🪙",
    "scene": "准备坐公交",
    "question": "UU 把硬币放在哪里？",
    "answer": "wallet",
    "choices": [
      "wallet",
      "hat",
      "bowl"
    ],
    "pages": [
      [
        "🪙",
        "UU plans a bus ride with Mother.",
        "UU 计划和妈妈一起坐公交。",
        [
          "bus",
          "mother"
        ]
      ],
      [
        "🪙",
        "Before leaving, UU puts a coin in a wallet.",
        "出门前，UU 把硬币放进钱包。",
        [
          "coin",
          "wallet"
        ]
      ],
      [
        "🪙",
        "At the stop, they stand back and wait for the bus.",
        "在车站，他们站在安全位置等公交。",
        [
          "bus",
          "wait"
        ]
      ],
      [
        "🪙",
        "When the bus stops, UU lets people get off first.",
        "车停稳后，UU 先让别人下车。",
        [
          "bus"
        ]
      ],
      [
        "🪙",
        "Mother helps UU pay, and they find a seat.",
        "妈妈帮助 UU 付钱，他们找到座位。",
        [
          "mother",
          "coin",
          "seat"
        ]
      ],
      [
        "🪙",
        "UU keeps the wallet safe until they get home.",
        "UU 保管好钱包，直到回家。",
        [
          "wallet",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        "bus",
        "mother"
      ],
      [
        "coin",
        "wallet"
      ],
      [
        "bus",
        "wait"
      ],
      [
        "bus"
      ],
      [
        "mother",
        "coin",
        "seat"
      ],
      [
        "wallet",
        "home"
      ]
    ],
    "coverArt": [
      "bus",
      "mother"
    ],
    "topic": "read-bus-coin"
  },
  {
    "id": "small-box",
    "title": "UU 的小盒子",
    "emoji": "📦",
    "scene": "的小盒子",
    "topic": "read-fox-box",
    "question": "盒子里是什么？",
    "answer": "bell",
    "choices": [
      "bell",
      "coin",
      "key"
    ],
    "pages": [
      [
        "📦",
        "A box.",
        "一个盒子。",
        [
          "box"
        ]
      ],
      [
        "📦",
        "A small box.",
        "一个小盒子。",
        [
          "box"
        ]
      ],
      [
        "📦",
        "A bell.",
        "一个铃铛。",
        [
          "bell"
        ]
      ],
      [
        "📦",
        "A little bell.",
        "一个小铃铛。",
        [
          "bell"
        ]
      ],
      [
        "📦",
        "A bell in a box.",
        "盒子里的铃铛。",
        [
          "bell",
          "box"
        ]
      ],
      [
        "📦",
        "UU likes the bell.",
        "UU 喜欢铃铛。",
        [
          "bell"
        ]
      ]
    ],
    "pageArt": [
      [
        "box"
      ],
      [
        "box"
      ],
      [
        "bell"
      ],
      [
        "bell"
      ],
      [
        {
          "word": "box",
          "variant": "bell-in"
        }
      ],
      [
        "bell"
      ]
    ],
    "coverArt": [
      "box"
    ],
    "level": "L1"
  },
  {
    "id": "red-flag",
    "title": "UU 看小红旗",
    "emoji": "🚩",
    "scene": "看小红旗",
    "topic": "read-art-apron",
    "question": "旗帜是什么颜色？",
    "answer": "red",
    "choices": [
      "red",
      "blue",
      "green"
    ],
    "pages": [
      [
        "🚩",
        "A flag.",
        "一面旗帜。",
        [
          "flag"
        ]
      ],
      [
        "🚩",
        "A red flag.",
        "一面红旗。",
        [
          "flag",
          "red"
        ]
      ],
      [
        "🚩",
        "UU sees the flag.",
        "UU 看见旗帜。",
        [
          "flag"
        ]
      ],
      [
        "🚩",
        "The flag is up.",
        "旗帜在上方。",
        [
          "flag",
          "up"
        ]
      ],
      [
        "🚩",
        "The flag is down.",
        "旗帜在下方。",
        [
          "flag",
          "down"
        ]
      ],
      [
        "🚩",
        "UU waves the flag.",
        "UU 挥动旗帜。",
        [
          "flag"
        ]
      ]
    ],
    "pageArt": [
      [
        "flag"
      ],
      [
        {
          "word": "flag",
          "variant": "red"
        }
      ],
      [
        "flag"
      ],
      [
        "flag",
        "up"
      ],
      [
        "flag",
        "down"
      ],
      [
        "flag"
      ]
    ],
    "coverArt": [
      "flag"
    ],
    "level": "L2"
  },
  {
    "id": "soft-rug",
    "title": "UU 的软地毯",
    "emoji": "🧸",
    "scene": "的软地毯",
    "topic": "read-fox-box",
    "question": "UU 坐在哪里？",
    "answer": "rug",
    "choices": [
      "rug",
      "bed",
      "chair"
    ],
    "pages": [
      [
        "🧸",
        "A rug.",
        "一块地毯。",
        [
          "rug"
        ]
      ],
      [
        "🧸",
        "A soft rug.",
        "一块柔软的地毯。",
        [
          "rug"
        ]
      ],
      [
        "🧸",
        "A teddy.",
        "一只玩具熊。",
        [
          "teddy"
        ]
      ],
      [
        "🧸",
        "Teddy is on the rug.",
        "玩具熊在地毯上。",
        [
          "teddy",
          "rug"
        ]
      ],
      [
        "🧸",
        "UU sits on the rug.",
        "UU 坐在地毯上。",
        [
          "rug"
        ]
      ],
      [
        "🧸",
        "UU hugs Teddy.",
        "UU 抱抱玩具熊。",
        [
          "teddy"
        ]
      ]
    ],
    "pageArt": [
      [
        "rug"
      ],
      [
        "rug"
      ],
      [
        "teddy"
      ],
      [
        "teddy",
        "rug"
      ],
      [
        "rug"
      ],
      [
        "teddy"
      ]
    ],
    "coverArt": [
      "rug"
    ],
    "level": "L2"
  },
  {
    "id": "green-leaves",
    "title": "UU 找绿叶",
    "emoji": "🍃",
    "scene": "找绿叶",
    "topic": "seed",
    "question": "叶子是什么颜色？",
    "answer": "green",
    "choices": [
      "green",
      "red",
      "blue"
    ],
    "pages": [
      [
        "🍃",
        "A leaf.",
        "一片叶子。",
        [
          "leaf"
        ]
      ],
      [
        "🍃",
        "A green leaf.",
        "一片绿叶。",
        [
          "leaf",
          "green"
        ]
      ],
      [
        "🍃",
        "A tree.",
        "一棵树。",
        [
          "tree"
        ]
      ],
      [
        "🍃",
        "The tree has leaves.",
        "树上有叶子。",
        [
          "tree",
          "leaf"
        ]
      ],
      [
        "🍃",
        "UU sees a leaf.",
        "UU 看见一片叶子。",
        [
          "leaf"
        ]
      ],
      [
        "🍃",
        "UU likes green.",
        "UU 喜欢绿色。",
        [
          "green"
        ]
      ]
    ],
    "pageArt": [
      [
        "leaf"
      ],
      [
        {
          "word": "leaf",
          "variant": "green"
        }
      ],
      [
        "tree"
      ],
      [
        "tree",
        "leaf"
      ],
      [
        "leaf"
      ],
      [
        "green"
      ]
    ],
    "coverArt": [
      "leaf"
    ],
    "level": "L1"
  },
  {
    "id": "little-owl",
    "title": "UU 看小猫头鹰",
    "emoji": "🦉",
    "scene": "看小猫头鹰",
    "topic": "read-forest-walk",
    "question": "谁在树上？",
    "answer": "owl",
    "choices": [
      "owl",
      "frog",
      "rat"
    ],
    "pages": [
      [
        "🦉",
        "A tree.",
        "一棵树。",
        [
          "tree"
        ]
      ],
      [
        "🦉",
        "An owl.",
        "一只猫头鹰。",
        [
          "owl"
        ]
      ],
      [
        "🦉",
        "An owl in a tree.",
        "树上的猫头鹰。",
        [
          "owl",
          "tree"
        ]
      ],
      [
        "🦉",
        "The owl has eyes.",
        "猫头鹰有眼睛。",
        [
          "owl",
          "eye"
        ]
      ],
      [
        "🦉",
        "The owl looks at UU.",
        "猫头鹰看着 UU。",
        [
          "owl"
        ]
      ],
      [
        "🦉",
        "UU waves goodbye.",
        "UU 挥手告别。",
        [
          "hand"
        ]
      ]
    ],
    "pageArt": [
      [
        "tree"
      ],
      [
        "owl"
      ],
      [
        "owl",
        "tree"
      ],
      [
        "owl",
        "eye"
      ],
      [
        "owl"
      ],
      [
        "hand"
      ]
    ],
    "coverArt": [
      "tree"
    ],
    "level": "L2"
  },
  {
    "id": "blue-jeans",
    "title": "UU 的蓝色牛仔裤",
    "emoji": "👖",
    "scene": "的蓝色牛仔裤",
    "topic": "read-dress-day",
    "question": "牛仔裤是什么颜色？",
    "answer": "blue",
    "choices": [
      "blue",
      "red",
      "yellow"
    ],
    "pages": [
      [
        "👖",
        "UU has jeans.",
        "UU 有牛仔裤。",
        [
          "jeans"
        ]
      ],
      [
        "👖",
        "The jeans are blue.",
        "牛仔裤是蓝色的。",
        [
          "jeans",
          "blue"
        ]
      ],
      [
        "👖",
        "UU has a vest.",
        "UU 有背心。",
        [
          "vest"
        ]
      ],
      [
        "👖",
        "The vest is green.",
        "背心是绿色的。",
        [
          "vest",
          "green"
        ]
      ],
      [
        "👖",
        "UU puts on the jeans.",
        "UU 穿上牛仔裤。",
        [
          "jeans"
        ]
      ],
      [
        "👖",
        "UU puts on the vest.",
        "UU 穿上背心。",
        [
          "vest"
        ]
      ]
    ],
    "pageArt": [
      [
        "jeans"
      ],
      [
        {
          "word": "jeans",
          "variant": "blue"
        }
      ],
      [
        "vest"
      ],
      [
        {
          "word": "vest",
          "variant": "green"
        }
      ],
      [
        "jeans"
      ],
      [
        "vest"
      ]
    ],
    "coverArt": [
      "jeans"
    ],
    "level": "L3"
  },
  {
    "id": "wash-fruit",
    "title": "UU 洗水果",
    "emoji": "🍈",
    "scene": "洗水果",
    "topic": "read-new-fruits",
    "question": "UU 在吃水果前先做什么？",
    "answer": "wash",
    "choices": [
      "wash",
      "sleep",
      "run"
    ],
    "pages": [
      [
        "🍈",
        "UU sees a plum.",
        "UU 看见一个李子。",
        [
          "plum"
        ]
      ],
      [
        "🍈",
        "UU sees a melon.",
        "UU 看见一个甜瓜。",
        [
          "melon"
        ]
      ],
      [
        "🍈",
        "UU gets some water.",
        "UU 接了一些水。",
        [
          "water"
        ]
      ],
      [
        "🍈",
        "UU washes the plum.",
        "UU 清洗李子。",
        [
          "plum",
          "water"
        ]
      ],
      [
        "🍈",
        "UU washes the melon.",
        "UU 清洗甜瓜。",
        [
          "melon",
          "water"
        ]
      ],
      [
        "🍈",
        "The fruit is clean.",
        "水果干净了。",
        [
          "plum",
          "melon"
        ]
      ]
    ],
    "pageArt": [
      [
        "plum"
      ],
      [
        "melon"
      ],
      [
        "water"
      ],
      [
        "plum",
        "water"
      ],
      [
        "melon",
        "water"
      ],
      [
        "plum",
        "melon"
      ]
    ],
    "coverArt": [
      "plum"
    ],
    "level": "L2"
  },
  {
    "id": "tidy-mat",
    "title": "UU 收好玩具",
    "emoji": "🧩",
    "scene": "收好玩具",
    "topic": "read-toy-day",
    "question": "UU 把积木放在哪里？",
    "answer": "box",
    "choices": [
      "box",
      "bed",
      "bowl"
    ],
    "pages": [
      [
        "🧩",
        "UU plays on a mat.",
        "UU 在垫子上玩。",
        [
          "mat"
        ]
      ],
      [
        "🧩",
        "UU has some blocks.",
        "UU 有一些积木。",
        [
          "blocks"
        ]
      ],
      [
        "🧩",
        "UU has a small box.",
        "UU 有一个小盒子。",
        [
          "box"
        ]
      ],
      [
        "🧩",
        "UU picks up the blocks.",
        "UU 捡起积木。",
        [
          "blocks"
        ]
      ],
      [
        "🧩",
        "The blocks go in the box.",
        "积木放进盒子里。",
        [
          "blocks",
          "box"
        ]
      ],
      [
        "🧩",
        "The mat is tidy now.",
        "垫子现在整洁了。",
        [
          "mat"
        ]
      ]
    ],
    "pageArt": [
      [
        "mat"
      ],
      [
        "blocks"
      ],
      [
        "box"
      ],
      [
        "blocks"
      ],
      [
        "blocks",
        "box"
      ],
      [
        "mat"
      ]
    ],
    "coverArt": [
      "mat"
    ],
    "level": "L5"
  },
  {
    "id": "sound-walk",
    "title": "UU 听声音",
    "emoji": "🔔",
    "scene": "听声音",
    "topic": "read-music-bell",
    "question": "什么发出叮铃声？",
    "answer": "bell",
    "choices": [
      "bell",
      "leaf",
      "shoes"
    ],
    "pages": [
      [
        "🔔",
        "UU hears a bird.",
        "UU 听见鸟叫。",
        [
          "bird"
        ]
      ],
      [
        "🔔",
        "UU hears a dog.",
        "UU 听见狗叫。",
        [
          "dog"
        ]
      ],
      [
        "🔔",
        "UU hears a bell.",
        "UU 听见铃铛响。",
        [
          "bell"
        ]
      ],
      [
        "🔔",
        "The bell goes ding.",
        "铃铛叮地响。",
        [
          "bell"
        ]
      ],
      [
        "🔔",
        "UU listens with a friend.",
        "UU 和朋友一起听。",
        [
          "friend",
          "ear"
        ]
      ],
      [
        "🔔",
        "Listening is fun.",
        "听声音真有趣。",
        [
          "ear",
          "bell"
        ]
      ]
    ],
    "pageArt": [
      [
        "bird"
      ],
      [
        "dog"
      ],
      [
        "bell"
      ],
      [
        "bell"
      ],
      [
        "friend",
        "ear"
      ],
      [
        "ear",
        "bell"
      ]
    ],
    "coverArt": [
      "bird"
    ],
    "level": "L2"
  },
  {
    "id": "little-chef",
    "title": "UU 的小厨师围裙",
    "emoji": "🥘",
    "scene": "的小厨师围裙",
    "topic": "read-soup-share",
    "question": "UU 穿什么保护衣服？",
    "answer": "apron",
    "choices": [
      "apron",
      "hat",
      "sock"
    ],
    "pages": [
      [
        "🥘",
        "UU puts on an apron.",
        "UU 穿上围裙。",
        [
          "apron"
        ]
      ],
      [
        "🥘",
        "UU gets a bowl.",
        "UU 拿来一个碗。",
        [
          "bowl"
        ]
      ],
      [
        "🥘",
        "UU gets a spoon.",
        "UU 拿来一把勺子。",
        [
          "spoon"
        ]
      ],
      [
        "🥘",
        "A grown-up makes soup.",
        "大人做好汤。",
        [
          "soup"
        ]
      ],
      [
        "🥘",
        "UU sets the table.",
        "UU 摆好餐桌。",
        [
          "bowl",
          "spoon",
          "table"
        ]
      ],
      [
        "🥘",
        "UU shares the warm soup.",
        "UU 分享温热的汤。",
        [
          "soup",
          "bowl"
        ]
      ]
    ],
    "pageArt": [
      [
        "apron"
      ],
      [
        "bowl"
      ],
      [
        "spoon"
      ],
      [
        "soup"
      ],
      [
        "bowl",
        "spoon",
        "table"
      ],
      [
        "soup",
        "bowl"
      ]
    ],
    "coverArt": [
      "apron"
    ],
    "level": "L3"
  },
  {
    "id": "pet-water",
    "title": "UU 给小狗添水",
    "emoji": "🐶",
    "scene": "给小狗添水",
    "topic": "read-clean-hands",
    "question": "小狗从哪里喝水？",
    "answer": "bowl",
    "choices": [
      "bowl",
      "box",
      "hat"
    ],
    "pages": [
      [
        "🐶",
        "The dog is thirsty.",
        "小狗口渴了。",
        [
          "dog"
        ]
      ],
      [
        "🐶",
        "UU finds the bowl.",
        "UU 找到碗。",
        [
          "bowl"
        ]
      ],
      [
        "🐶",
        "UU washes the bowl.",
        "UU 清洗碗。",
        [
          "bowl",
          "water"
        ]
      ],
      [
        "🐶",
        "UU adds clean water.",
        "UU 加入干净的水。",
        [
          "bowl",
          "water"
        ]
      ],
      [
        "🐶",
        "The dog drinks the water.",
        "小狗喝水。",
        [
          "dog",
          "bowl"
        ]
      ],
      [
        "🐶",
        "UU smiles at the dog.",
        "UU 对小狗笑了。",
        [
          "dog",
          "smile"
        ]
      ]
    ],
    "pageArt": [
      [
        "dog"
      ],
      [
        "bowl"
      ],
      [
        "bowl",
        "water"
      ],
      [
        "bowl",
        "water"
      ],
      [
        "dog",
        "bowl"
      ],
      [
        "dog",
        "smile"
      ]
    ],
    "coverArt": [
      "dog"
    ],
    "level": "L3"
  },
  {
    "id": "market-basket",
    "title": "UU 的市场小篮子",
    "emoji": "🛒",
    "scene": "的市场小篮子",
    "topic": "read-soup-share",
    "question": "UU 用什么装食材？",
    "answer": "basket",
    "choices": [
      "basket",
      "bowl",
      "box"
    ],
    "pages": [
      [
        "🛒",
        "UU brings a basket to the market.",
        "UU 带着篮子来到市场。",
        [
          "basket",
          "market"
        ]
      ],
      [
        "🛒",
        "UU chooses a fresh radish.",
        "UU 挑选一个新鲜萝卜。",
        [
          "radish"
        ]
      ],
      [
        "🛒",
        "UU chooses some green spinach.",
        "UU 挑选一些绿菠菜。",
        [
          "spinach"
        ]
      ],
      [
        "🛒",
        "UU adds beans to the basket.",
        "UU 把豆子放进篮子。",
        [
          "bean",
          "basket"
        ]
      ],
      [
        "🛒",
        "A grown-up pays for the food.",
        "大人为食材付钱。",
        [
          "coin",
          "basket"
        ]
      ],
      [
        "🛒",
        "UU carries the basket home.",
        "UU 提着篮子回家。",
        [
          "basket",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        "basket",
        "market"
      ],
      [
        "radish"
      ],
      [
        "spinach"
      ],
      [
        "bean",
        "basket"
      ],
      [
        "coin",
        "basket"
      ],
      [
        "basket",
        "home"
      ]
    ],
    "coverArt": [
      "basket",
      "market"
    ],
    "level": "L6"
  },
  {
    "id": "library-bell",
    "title": "UU 等待图书馆开门",
    "emoji": "📚",
    "scene": "等待图书馆开门",
    "topic": "read-library-return",
    "question": "UU 在等待时做什么？",
    "answer": "read",
    "choices": [
      "read",
      "run",
      "sleep"
    ],
    "pages": [
      [
        "📚",
        "UU arrives before the library opens.",
        "UU 在图书馆开门前到达。",
        [
          "library"
        ]
      ],
      [
        "📚",
        "The door is still closed.",
        "门还关着。",
        [
          "door"
        ]
      ],
      [
        "📚",
        "UU waits quietly beside a grown-up.",
        "UU 安静地在大人身边等待。",
        [
          "wait"
        ]
      ],
      [
        "📚",
        "UU reads a book from home.",
        "UU 读一本从家里带来的书。",
        [
          "book",
          "home"
        ]
      ],
      [
        "📚",
        "Soon the librarian opens the door.",
        "不久，图书管理员打开门。",
        [
          "library",
          "door"
        ]
      ],
      [
        "📚",
        "UU puts the book away and goes inside.",
        "UU 收好书，走进去。",
        [
          "book",
          "library"
        ]
      ]
    ],
    "pageArt": [
      [
        "library"
      ],
      [
        "door"
      ],
      [
        "wait"
      ],
      [
        "book",
        "home"
      ],
      [
        "library",
        "door"
      ],
      [
        "book",
        "library"
      ]
    ],
    "coverArt": [
      "library"
    ],
    "level": "L7"
  },
  {
    "id": "rain-boots",
    "title": "UU 穿雨靴",
    "emoji": "🥾",
    "scene": "穿雨靴",
    "topic": "rain",
    "question": "什么让 UU 的脚保持干燥？",
    "answer": "boot",
    "choices": [
      "boot",
      "sock",
      "hat"
    ],
    "pages": [
      [
        "🥾",
        "Rain falls outside the window.",
        "窗外下雨了。",
        [
          "rain",
          "window"
        ]
      ],
      [
        "🥾",
        "UU wants to walk with Mother.",
        "UU 想和妈妈去散步。",
        [
          "mother"
        ]
      ],
      [
        "🥾",
        "First, UU puts on a coat.",
        "首先，UU 穿上外套。",
        [
          "coat"
        ]
      ],
      [
        "🥾",
        "Then UU puts on waterproof boots.",
        "然后，UU 穿上防水靴。",
        [
          "boot"
        ]
      ],
      [
        "🥾",
        "Mother holds the umbrella as they walk.",
        "散步时妈妈撑着伞。",
        [
          "mother",
          "umbrella"
        ]
      ],
      [
        "🥾",
        "UU comes home with dry feet.",
        "UU 回家时脚还是干的。",
        [
          "foot",
          "boot"
        ]
      ]
    ],
    "pageArt": [
      [
        "rain",
        "window"
      ],
      [
        "mother"
      ],
      [
        "coat"
      ],
      [
        "boot"
      ],
      [
        "mother",
        "umbrella"
      ],
      [
        "foot",
        "boot"
      ]
    ],
    "coverArt": [
      "rain",
      "window"
    ],
    "level": "L6"
  },
  {
    "id": "school-zip",
    "title": "UU 拉好书包拉链",
    "emoji": "🎒",
    "scene": "拉好书包拉链",
    "topic": "school",
    "question": "UU 最后拉好什么？",
    "answer": "zip",
    "choices": [
      "zip",
      "rope",
      "bell"
    ],
    "pages": [
      [
        "🎒",
        "UU packs a notebook for school.",
        "UU 装好上学用的笔记本。",
        [
          "notebook",
          "bag"
        ]
      ],
      [
        "🎒",
        "A pencil goes in the bag too.",
        "一支铅笔也放进书包。",
        [
          "pencil",
          "bag"
        ]
      ],
      [
        "🎒",
        "UU checks for the water bottle.",
        "UU 检查有没有水瓶。",
        [
          "bottle"
        ]
      ],
      [
        "🎒",
        "The bottle is beside the chair.",
        "水瓶在椅子旁。",
        [
          "bottle",
          "chair"
        ]
      ],
      [
        "🎒",
        "UU puts it in and closes the zip.",
        "UU 把水瓶放进去，拉好拉链。",
        [
          "zip",
          "bag"
        ]
      ],
      [
        "🎒",
        "Now the bag is ready for school.",
        "现在书包装好了，可以上学了。",
        [
          "bag",
          "school"
        ]
      ]
    ],
    "pageArt": [
      [
        "notebook",
        "bag"
      ],
      [
        "pencil",
        "bag"
      ],
      [
        "bottle"
      ],
      [
        "bottle",
        "chair"
      ],
      [
        "zip",
        "bag"
      ],
      [
        "bag",
        "school"
      ]
    ],
    "coverArt": [
      "notebook",
      "bag"
    ],
    "level": "L7"
  },
  {
    "id": "snail-after-rain",
    "title": "UU 雨后看蜗牛",
    "emoji": "🐌",
    "scene": "雨后看蜗牛",
    "topic": "read-garden-snail",
    "question": "UU 给谁留出了空间？",
    "answer": "snail",
    "choices": [
      "snail",
      "coin",
      "bell"
    ],
    "pages": [
      [
        "🐌",
        "After the rain stops, UU visits the garden with Father.",
        "雨停后，UU 和爸爸来到花园。",
        [
          "rain",
          "garden",
          "father"
        ]
      ],
      [
        "🐌",
        "A small snail is moving slowly across a wet leaf.",
        "一只小蜗牛正慢慢爬过湿叶子。",
        [
          "snail",
          "leaf"
        ]
      ],
      [
        "🐌",
        "UU wants to touch it, but Father suggests watching instead.",
        "UU 想摸摸它，但爸爸建议先观察。",
        [
          "father",
          "snail"
        ]
      ],
      [
        "🐌",
        "They stay on the path so the snail has space.",
        "他们留在小路上，给蜗牛留出空间。",
        [
          "snail",
          "garden"
        ]
      ],
      [
        "🐌",
        "Soon the snail reaches the shade beneath another leaf.",
        "不久，蜗牛爬到另一片叶子下面的阴凉处。",
        [
          "snail",
          "leaf"
        ]
      ],
      [
        "🐌",
        "UU leaves the garden quietly, happy to have watched it move.",
        "UU 轻轻离开花园，很开心看到了蜗牛爬行。",
        [
          "garden",
          "snail"
        ]
      ]
    ],
    "pageArt": [
      [
        "rain",
        "garden",
        "father"
      ],
      [
        "snail",
        "leaf"
      ],
      [
        "father",
        "snail"
      ],
      [
        "snail",
        "garden"
      ],
      [
        "snail",
        "leaf"
      ],
      [
        "garden",
        "snail"
      ]
    ],
    "coverArt": [
      "rain",
      "garden"
    ],
    "level": "L9"
  },
  {
    "id": "lost-mitten",
    "title": "UU 找回手套",
    "emoji": "🧤",
    "scene": "找回手套",
    "topic": "read-dress-day",
    "question": "手套最后在哪里找到？",
    "answer": "bench",
    "choices": [
      "bench",
      "bed",
      "box"
    ],
    "pages": [
      [
        "🧤",
        "At the park gate, UU notices that a mitten is missing.",
        "在公园门口，UU 发现少了一只连指手套。",
        [
          "mitten",
          "gate"
        ]
      ],
      [
        "🧤",
        "UU and Mother remember sitting on a bench near the pond.",
        "UU 和妈妈想起，他们刚在池塘附近的长椅上坐过。",
        [
          "mother",
          "bench",
          "pond"
        ]
      ],
      [
        "🧤",
        "They walk back together instead of running away in different directions.",
        "他们一起走回去，没有分头跑开。",
        [
          "mother",
          "park"
        ]
      ],
      [
        "🧤",
        "There is the mitten, resting under the end of the bench!",
        "手套就在长椅一端的下面！",
        [
          "mitten",
          "bench"
        ]
      ],
      [
        "🧤",
        "UU puts it on and checks that both hands are warm.",
        "UU 戴好手套，确认两只手都暖和了。",
        [
          "mitten",
          "hand"
        ]
      ],
      [
        "🧤",
        "Before leaving again, UU thanks Mother for helping with the search.",
        "再次离开前，UU 感谢妈妈帮忙寻找。",
        [
          "mother",
          "mitten"
        ]
      ]
    ],
    "pageArt": [
      [
        "mitten",
        "gate"
      ],
      [
        "mother",
        "bench",
        "pond"
      ],
      [
        "mother",
        "park"
      ],
      [
        "mitten",
        "bench"
      ],
      [
        "mitten",
        "hand"
      ],
      [
        "mother",
        "mitten"
      ]
    ],
    "coverArt": [
      "mitten",
      "gate"
    ],
    "level": "L9"
  },
  {
    "id": "aquarium-quiet",
    "title": "UU 轻声看小鱼",
    "emoji": "🐠",
    "scene": "轻声看小鱼",
    "topic": "read-aquarium-visit",
    "question": "UU 用什么告诉朋友想法？",
    "answer": "hand",
    "choices": [
      "hand",
      "bell",
      "drum"
    ],
    "pages": [
      [
        "🐠",
        "At the aquarium, UU and a friend find a tank of fish.",
        "在水族馆里，UU 和朋友发现一缸小鱼。",
        [
          "aquarium",
          "fish"
        ]
      ],
      [
        "🐠",
        "The friend wants to tap the glass to make a fish turn.",
        "朋友想敲玻璃，让小鱼转身。",
        [
          "friend",
          "fish"
        ]
      ],
      [
        "🐠",
        "UU points to a sign that asks visitors to keep quiet.",
        "UU 指向提醒游客保持安静的提示牌。",
        [
          "hand",
          "aquarium"
        ]
      ],
      [
        "🐠",
        "Instead of tapping, they stand still and watch the fish together.",
        "他们不敲玻璃，而是站好，一起观察小鱼。",
        [
          "fish",
          "friend"
        ]
      ],
      [
        "🐠",
        "A fish swims close, and UU gives a small wave without touching.",
        "一条鱼游近了，UU 轻轻挥手，没有碰玻璃。",
        [
          "fish",
          "hand"
        ]
      ],
      [
        "🐠",
        "The friends learn that watching patiently can reveal something new.",
        "朋友们发现，耐心观察也能看到新的东西。",
        [
          "friend",
          "fish"
        ]
      ]
    ],
    "pageArt": [
      [
        "aquarium",
        "fish"
      ],
      [
        "friend",
        "fish"
      ],
      [
        "hand",
        "aquarium"
      ],
      [
        "fish",
        "friend"
      ],
      [
        "fish",
        "hand"
      ],
      [
        "friend",
        "fish"
      ]
    ],
    "coverArt": [
      "aquarium",
      "fish"
    ],
    "level": "L9"
  },
  {
    "id": "fair-turns",
    "title": "UU 轮流玩小鼓",
    "emoji": "🥁",
    "scene": "轮流玩小鼓",
    "topic": "read-music-bell",
    "question": "UU 用什么轮流演奏？",
    "answer": "drum",
    "choices": [
      "drum",
      "bell",
      "book"
    ],
    "pages": [
      [
        "🥁",
        "UU and a friend both reach for the same little drum.",
        "UU 和朋友同时伸手，想拿同一面小鼓。",
        [
          "drum",
          "friend"
        ]
      ],
      [
        "🥁",
        "There is only one drum, so they need a fair plan.",
        "只有一面鼓，所以他们需要一个公平的办法。",
        [
          "drum"
        ]
      ],
      [
        "🥁",
        "The teacher suggests taking turns while the other person claps.",
        "老师建议轮流敲鼓，另一个人拍手。",
        [
          "teacher",
          "hand"
        ]
      ],
      [
        "🥁",
        "UU plays first, then passes the drum to the friend.",
        "UU 先敲鼓，然后把鼓递给朋友。",
        [
          "drum",
          "friend"
        ]
      ],
      [
        "🥁",
        "This time UU claps along and listens to a different rhythm.",
        "这一次，UU 一边拍手，一边听不同的节奏。",
        [
          "hand",
          "ear"
        ]
      ],
      [
        "🥁",
        "By sharing the drum, both friends can enjoy the music together.",
        "通过分享小鼓，两位朋友都能一起享受音乐。",
        [
          "drum",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "drum",
        "friend"
      ],
      [
        "drum"
      ],
      [
        "teacher",
        "hand"
      ],
      [
        "drum",
        "friend"
      ],
      [
        "hand",
        "ear"
      ],
      [
        "drum",
        "friend"
      ]
    ],
    "coverArt": [
      "drum",
      "friend"
    ],
    "level": "L9"
  },
  {
    "id": "right-elevator",
    "title": "UU 找到电梯",
    "emoji": "🛗",
    "scene": "找到电梯",
    "topic": "airport",
    "question": "他们最后选择乘什么上楼？",
    "answer": "elevator",
    "choices": [
      "elevator",
      "escalator",
      "train"
    ],
    "pages": [
      [
        "🛗",
        "UU visits a shopping center with Mother and a baby in a stroller.",
        "UU 和妈妈带着坐婴儿车的小宝宝来到商场。",
        [
          "mother",
          "baby"
        ]
      ],
      [
        "🛗",
        "They need to go upstairs, but the escalator is ahead of them.",
        "他们要上楼，前面有自动扶梯。",
        [
          "escalator"
        ]
      ],
      [
        "🛗",
        "Mother explains that a stroller needs a safer way between floors.",
        "妈妈解释说，婴儿车需要更安全的上下楼方式。",
        [
          "mother",
          "baby"
        ]
      ],
      [
        "🛗",
        "UU spots the elevator sign and points out the way to Mother.",
        "UU 发现电梯标志，向妈妈指出方向。",
        [
          "elevator",
          "hand"
        ]
      ],
      [
        "🛗",
        "They wait for the elevator and let others come out first.",
        "他们等电梯，并先让里面的人出来。",
        [
          "elevator",
          "wait"
        ]
      ],
      [
        "🛗",
        "Then they enter together and ride upstairs safely with the baby.",
        "然后，他们和小宝宝一起进入，安全地上楼。",
        [
          "elevator",
          "baby"
        ]
      ]
    ],
    "pageArt": [
      [
        "mother",
        "baby"
      ],
      [
        "escalator"
      ],
      [
        "mother",
        "baby"
      ],
      [
        "elevator",
        "hand"
      ],
      [
        "elevator",
        "wait"
      ],
      [
        "elevator",
        "baby"
      ]
    ],
    "coverArt": [
      "mother",
      "baby"
    ],
    "level": "L9"
  },
  {
    "id": "ticket-check",
    "title": "UU 检查出行小物",
    "emoji": "🎫",
    "scene": "检查出行小物",
    "topic": "airport",
    "question": "出发前 UU 检查了什么？",
    "answer": "ticket",
    "choices": [
      "ticket",
      "ring",
      "bell"
    ],
    "pages": [
      [
        "🎫",
        "UU is excited about a train trip, but the bag feels full.",
        "UU 为火车旅行感到兴奋，但包已经满满的了。",
        [
          "train",
          "bag"
        ]
      ],
      [
        "🎫",
        "Before leaving home, Father suggests checking the things they really need.",
        "离家前，爸爸建议检查真正需要的物品。",
        [
          "father",
          "home"
        ]
      ],
      [
        "🎫",
        "UU finds the ticket beside a book and puts it in a safe pocket.",
        "UU 在书旁找到车票，把它放进安全的口袋。",
        [
          "ticket",
          "book"
        ]
      ],
      [
        "🎫",
        "The heavy toy can stay at home, so there is room for water.",
        "沉重的玩具可以留在家里，这样就能装水。",
        [
          "teddy",
          "bottle"
        ]
      ],
      [
        "🎫",
        "At the station, UU finds the ticket easily when Father asks for it.",
        "到车站后，爸爸要车票时，UU 很容易就找到了。",
        [
          "station",
          "ticket"
        ]
      ],
      [
        "🎫",
        "Planning ahead makes the trip calmer, and UU has everything needed.",
        "提前准备让旅程更从容，UU 带齐了需要的东西。",
        [
          "ticket",
          "bottle"
        ]
      ]
    ],
    "pageArt": [
      [
        "train",
        "bag"
      ],
      [
        "father",
        "home"
      ],
      [
        "ticket",
        "book"
      ],
      [
        "teddy",
        "bottle"
      ],
      [
        "station",
        "ticket"
      ],
      [
        "ticket",
        "bottle"
      ]
    ],
    "coverArt": [
      "train",
      "bag"
    ],
    "level": "L9"
  },
  {
    "id": "garden-choices",
    "title": "UU 给花园选位置",
    "emoji": "🌱",
    "scene": "给花园选位置",
    "topic": "seed",
    "question": "UU 给种子选了什么位置？",
    "answer": "sun",
    "choices": [
      "sun",
      "bed",
      "box"
    ],
    "pages": [
      [
        "🌱",
        "UU wants to grow a plant, so a grown-up helps read the seed packet.",
        "UU 想种植物，于是大人帮忙阅读种子包装。",
        [
          "seed",
          "garden"
        ]
      ],
      [
        "🌱",
        "The packet says this plant needs sunlight and regular watering to grow.",
        "包装上说，这种植物生长需要阳光和定期浇水。",
        [
          "sun",
          "water"
        ]
      ],
      [
        "🌱",
        "UU first chooses a dark corner, but then remembers the instructions.",
        "UU 起初选了阴暗的角落，随后想起了说明。",
        [
          "seed"
        ]
      ],
      [
        "🌱",
        "Together they find a sunny spot and plant the seed carefully in the soil.",
        "他们一起找到阳光充足的位置，把种子小心种进土里。",
        [
          "sun",
          "seed"
        ]
      ],
      [
        "🌱",
        "UU checks the soil each day with help, adding water when it is needed.",
        "UU 每天在帮助下检查土壤，需要时再浇水。",
        [
          "water",
          "seed"
        ]
      ],
      [
        "🌱",
        "When a leaf finally appears, UU understands why the right place mattered.",
        "叶子终于长出来时，UU 明白了为什么选对位置很重要。",
        [
          "leaf",
          "sun"
        ]
      ]
    ],
    "pageArt": [
      [
        "seed",
        "garden"
      ],
      [
        "sun",
        "water"
      ],
      [
        "seed"
      ],
      [
        "sun",
        "seed"
      ],
      [
        "water",
        "seed"
      ],
      [
        "leaf",
        "sun"
      ]
    ],
    "coverArt": [
      "seed",
      "garden"
    ],
    "level": "L9"
  },
  {
    "id": "market-plan",
    "title": "UU 按计划买食材",
    "emoji": "🫘",
    "scene": "按计划买食材",
    "topic": "read-soup-share",
    "question": "他们为了做汤买了什么？",
    "answer": "bean",
    "choices": [
      "bean",
      "candy",
      "ring"
    ],
    "pages": [
      [
        "🫘",
        "Before going to the market, UU and Father decide to make vegetable soup for lunch.",
        "去市场前，UU 和爸爸决定午餐做蔬菜汤。",
        [
          "father",
          "market",
          "soup"
        ]
      ],
      [
        "🫘",
        "They draw a short list with beans, a radish and green spinach so nothing is forgotten.",
        "他们画了一张小清单，列出豆子、萝卜和菠菜，避免遗漏。",
        [
          "bean",
          "radish",
          "spinach"
        ]
      ],
      [
        "🫘",
        "At a stall, UU sees bright candy but checks the list before making a choice.",
        "在摊位前，UU 看见鲜艳的糖果，但先检查清单再选择。",
        [
          "candy",
          "paper"
        ]
      ],
      [
        "🫘",
        "Father explains that they can save the candy for another day and buy the soup ingredients first.",
        "爸爸解释说，可以改天再买糖果，今天先买做汤的食材。",
        [
          "father",
          "bean",
          "radish"
        ]
      ],
      [
        "🫘",
        "UU helps carry the light basket while Father carries the heavier shopping bag beside it.",
        "UU 帮忙提轻篮子，爸爸在旁边提更重的购物袋。",
        [
          "basket",
          "bag"
        ]
      ],
      [
        "🫘",
        "At home, the ingredients are ready, and their simple plan helps everyone prepare lunch together.",
        "回到家，食材都备好了，简单的计划让大家能一起准备午餐。",
        [
          "home",
          "bean",
          "soup"
        ]
      ]
    ],
    "pageArt": [
      [
        "father",
        "market",
        "soup"
      ],
      [
        "bean",
        "radish",
        "spinach"
      ],
      [
        "candy",
        "paper"
      ],
      [
        "father",
        "bean",
        "radish"
      ],
      [
        "basket",
        "bag"
      ],
      [
        "home",
        "bean",
        "soup"
      ]
    ],
    "coverArt": [
      "father",
      "market"
    ],
    "level": "L10"
  },
  {
    "id": "picnic-change",
    "title": "UU 改变野餐计划",
    "emoji": "☂️",
    "scene": "改变野餐计划",
    "topic": "read-rainy-picnic",
    "question": "下雨后他们在哪里野餐？",
    "answer": "home",
    "choices": [
      "home",
      "forest",
      "beach"
    ],
    "pages": [
      [
        "☂️",
        "UU packs fruit for a picnic, but dark clouds gather before the family leaves home.",
        "UU 装好野餐水果，但一家人出门前，乌云聚拢起来。",
        [
          "basket",
          "cloudy",
          "home"
        ]
      ],
      [
        "☂️",
        "When the rain begins, UU feels disappointed because the outdoor plan must wait for another day.",
        "开始下雨时，UU 有些失望，因为户外计划只能等改天了。",
        [
          "rain",
          "sad"
        ]
      ],
      [
        "☂️",
        "Mother suggests spreading a clean mat indoors, where the family can still sit and eat together.",
        "妈妈建议在室内铺上干净的垫子，大家仍能坐在一起吃东西。",
        [
          "mother",
          "mat"
        ]
      ],
      [
        "☂️",
        "UU brings the fruit basket to the mat and asks everyone to choose a favorite piece.",
        "UU 把水果篮拿到垫子上，请大家挑选喜欢的水果。",
        [
          "basket",
          "mat",
          "apple"
        ]
      ],
      [
        "☂️",
        "Although the place has changed, the family shares food and tells funny stories as the rain falls.",
        "虽然地点改变了，一家人仍分享食物，在雨声中讲有趣的故事。",
        [
          "family",
          "basket",
          "rain"
        ]
      ],
      [
        "☂️",
        "UU discovers that a good afternoon can begin with a new idea when the first plan changes.",
        "UU 发现，当最初的计划改变时，一个新主意也能带来美好的下午。",
        [
          "happy",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        "basket",
        "cloudy",
        "home"
      ],
      [
        "rain",
        "sad"
      ],
      [
        "mother",
        "mat"
      ],
      [
        "basket",
        "mat",
        "apple"
      ],
      [
        "family",
        "basket",
        "rain"
      ],
      [
        "happy",
        "home"
      ]
    ],
    "coverArt": [
      "basket",
      "cloudy"
    ],
    "level": "L10"
  },
  {
    "id": "museum-map",
    "title": "UU 在博物馆找路",
    "emoji": "🗺️",
    "scene": "在博物馆找路",
    "topic": "library",
    "question": "UU 用什么找到展厅？",
    "answer": "map",
    "choices": [
      "map",
      "bell",
      "coin"
    ],
    "pages": [
      [
        "🗺️",
        "UU visits a museum with Father and hopes to find the room with pictures of animals.",
        "UU 和爸爸参观博物馆，希望找到有动物图片的展厅。",
        [
          "museum",
          "father"
        ]
      ],
      [
        "🗺️",
        "The building has several rooms, so they stop near the entrance instead of guessing which way to go.",
        "馆里有几个房间，所以他们在入口附近停下，没有猜着走。",
        [
          "museum",
          "gate"
        ]
      ],
      [
        "🗺️",
        "UU notices a map on the wall and asks Father to help match the symbols with the rooms.",
        "UU 注意到墙上的地图，请爸爸帮助把符号和展厅对应起来。",
        [
          "map",
          "father"
        ]
      ],
      [
        "🗺️",
        "Together they follow the marked route, walking slowly so they can notice signs along the way.",
        "他们一起沿标出的路线慢慢走，以便留意沿途标志。",
        [
          "map",
          "walk"
        ]
      ],
      [
        "🗺️",
        "At last they reach the animal pictures, and UU recognizes an owl from an earlier forest walk.",
        "他们终于找到动物图片，UU 认出了之前森林散步时见过的猫头鹰。",
        [
          "owl",
          "forest"
        ]
      ],
      [
        "🗺️",
        "Before leaving, UU explains how checking the map helped the family find the room without rushing.",
        "离开前，UU 讲述了查看地图怎样帮助一家人从容地找到展厅。",
        [
          "map",
          "family"
        ]
      ]
    ],
    "pageArt": [
      [
        "museum",
        "father"
      ],
      [
        "museum",
        "gate"
      ],
      [
        "map",
        "father"
      ],
      [
        "map",
        "walk"
      ],
      [
        "owl",
        "forest"
      ],
      [
        "map",
        "family"
      ]
    ],
    "coverArt": [
      "museum",
      "father"
    ],
    "level": "L10"
  },
  {
    "id": "friend-sad",
    "title": "UU 陪朋友重新搭积木",
    "emoji": "🧩",
    "scene": "陪朋友重新搭积木",
    "topic": "read-team-ball",
    "question": "他们最后一起玩什么？",
    "answer": "blocks",
    "choices": [
      "blocks",
      "drum",
      "ball"
    ],
    "pages": [
      [
        "🧩",
        "At school, UU sees a friend sitting quietly beside a tower of blocks that has fallen over.",
        "在学校里，UU 看见朋友静静坐在倒塌的积木塔旁。",
        [
          "school",
          "friend",
          "blocks"
        ]
      ],
      [
        "🧩",
        "Instead of picking everything up at once, UU asks whether the friend would like some help rebuilding it.",
        "UU 没有立刻收起所有积木，而是先问朋友是否愿意一起重搭。",
        [
          "friend",
          "help"
        ]
      ],
      [
        "🧩",
        "The friend nods and explains that the tower kept falling because the bottom was too narrow.",
        "朋友点点头，解释说底部太窄，所以积木塔总是倒下。",
        [
          "friend",
          "blocks"
        ]
      ],
      [
        "🧩",
        "Together they choose wider blocks for the base before adding the smaller pieces carefully on top.",
        "他们一起选较宽的积木做底座，再小心把小块放上去。",
        [
          "blocks"
        ]
      ],
      [
        "🧩",
        "This time the tower stands, and both friends feel proud of the plan they worked out together.",
        "这次积木塔站稳了，两位朋友都为一起想出的办法感到自豪。",
        [
          "blocks",
          "happy"
        ]
      ],
      [
        "🧩",
        "UU learns that listening to a friend can be just as helpful as knowing what to build.",
        "UU 学到，倾听朋友的想法和知道怎么搭一样有帮助。",
        [
          "ear",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "school",
        "friend",
        "blocks"
      ],
      [
        "friend",
        "help"
      ],
      [
        "friend",
        "blocks"
      ],
      [
        "blocks"
      ],
      [
        "blocks",
        "happy"
      ],
      [
        "ear",
        "friend"
      ]
    ],
    "coverArt": [
      "school",
      "friend"
    ],
    "level": "L10"
  },
  {
    "id": "beach-cleanup",
    "title": "UU 让海滩保持干净",
    "emoji": "🏖️",
    "scene": "让海滩保持干净",
    "topic": "read-beach-care",
    "question": "他们把垃圾带到哪里？",
    "answer": "bin",
    "choices": [
      "bin",
      "sea",
      "pond"
    ],
    "pages": [
      [
        "🏖️",
        "During a beach walk with a grown-up, UU notices paper near a place where birds are resting.",
        "和大人在海滩散步时，UU 发现鸟儿休息处附近有纸。",
        [
          "beach",
          "paper",
          "bird"
        ]
      ],
      [
        "🏖️",
        "UU wants to help, but first checks with the grown-up because some litter can be sharp or dirty.",
        "UU 想帮忙，但先询问大人，因为有些垃圾可能锋利或脏。",
        [
          "paper",
          "help"
        ]
      ],
      [
        "🏖️",
        "The grown-up handles the litter safely while UU points out the nearest bin along the path.",
        "大人安全处理垃圾，UU 则指出小路旁最近的垃圾桶。",
        [
          "bin",
          "hand"
        ]
      ],
      [
        "🏖️",
        "After putting the rubbish in the bin, they wash their hands before opening the picnic basket.",
        "把垃圾扔进桶后，他们先洗手，再打开野餐篮。",
        [
          "bin",
          "wash",
          "basket"
        ]
      ],
      [
        "🏖️",
        "The beach looks cleaner, and the birds can rest without bits of paper blowing around them.",
        "海滩更干净了，鸟儿也能休息，不再有纸片在周围飘动。",
        [
          "beach",
          "bird"
        ]
      ],
      [
        "🏖️",
        "UU understands that caring for a place also means asking for help and choosing safe ways to act.",
        "UU 明白，爱护一个地方也包括寻求帮助并选择安全的行动方式。",
        [
          "beach",
          "help"
        ]
      ]
    ],
    "pageArt": [
      [
        "beach",
        "paper",
        "bird"
      ],
      [
        "paper",
        "help"
      ],
      [
        "bin",
        "hand"
      ],
      [
        "bin",
        "wash",
        "basket"
      ],
      [
        "beach",
        "bird"
      ],
      [
        "beach",
        "help"
      ]
    ],
    "coverArt": [
      "beach",
      "paper"
    ],
    "level": "L10"
  },
  {
    "id": "library-choice",
    "title": "UU 挑一本适合的书",
    "emoji": "📖",
    "scene": "挑一本适合的书",
    "topic": "read-library-friends",
    "question": "UU 最后选择带图片的什么？",
    "answer": "book",
    "choices": [
      "book",
      "map",
      "ticket"
    ],
    "pages": [
      [
        "📖",
        "UU finds a shelf full of books and feels unsure which one to take home for a first independent read.",
        "UU 面对一整架书，不确定该选哪一本作为第一次独立阅读。",
        [
          "library",
          "book"
        ]
      ],
      [
        "📖",
        "One book has many long sentences, while another tells a short story with clear pictures on every page.",
        "一本书有许多长句，另一本则用每页清晰的图片讲一个短故事。",
        [
          "book"
        ]
      ],
      [
        "📖",
        "A librarian suggests trying a page to see whether UU can follow the story and enjoy finding out what happens.",
        "图书管理员建议先试读一页，看看 UU 能否理解故事并愿意继续。",
        [
          "library",
          "read"
        ]
      ],
      [
        "📖",
        "UU chooses the picture book for today and asks a grown-up to save the longer book for reading together later.",
        "UU 今天选了图画书，并请大人把较长的书留到以后一起读。",
        [
          "book",
          "family"
        ]
      ],
      [
        "📖",
        "At home, UU reads slowly, checks the pictures when a word is new and talks about the ending with Father.",
        "回家后，UU 慢慢读，遇到新词就看图，并和爸爸讨论结局。",
        [
          "book",
          "father"
        ]
      ],
      [
        "📖",
        "Choosing a comfortable starting point gives UU confidence, while the longer book remains an exciting goal for another day.",
        "选择合适的起点给了 UU 信心，而较长的书仍是未来令人期待的目标。",
        [
          "book",
          "happy"
        ]
      ]
    ],
    "pageArt": [
      [
        "library",
        "book"
      ],
      [
        "book"
      ],
      [
        "library",
        "read"
      ],
      [
        "book",
        "family"
      ],
      [
        "book",
        "father"
      ],
      [
        "book",
        "happy"
      ]
    ],
    "coverArt": [
      "library",
      "book"
    ],
    "level": "L10"
  },
  {
    "id": "shared-garden",
    "title": "UU 和邻居一起照顾花园",
    "emoji": "🌷",
    "scene": "和邻居一起照顾花园",
    "topic": "read-garden-helper",
    "question": "他们用什么记下浇水日期？",
    "answer": "calendar",
    "choices": [
      "calendar",
      "ticket",
      "map"
    ],
    "pages": [
      [
        "🌷",
        "UU and a neighbor both want to help care for a small garden, but they visit at different times of the day.",
        "UU 和邻居都想照顾小花园，但他们每天来的时间不同。",
        [
          "garden",
          "friend"
        ]
      ],
      [
        "🌷",
        "After noticing that one plant has been watered twice, they ask a grown-up how to share the jobs more clearly.",
        "发现一株植物被浇了两次水后，他们请大人帮忙把任务分清楚。",
        [
          "water",
          "help"
        ]
      ],
      [
        "🌷",
        "Together they mark a calendar, showing who will check the soil and who will look for fallen leaves each day.",
        "他们一起在日历上标记，写清每天由谁检查土壤、谁查看落叶。",
        [
          "calendar",
          "leaf"
        ]
      ],
      [
        "🌷",
        "UU checks the calendar before starting, then asks for help whenever the soil seems different from what was expected.",
        "UU 开始前先看日历，土壤情况和预期不同时就寻求帮助。",
        [
          "calendar",
          "garden"
        ]
      ],
      [
        "🌷",
        "Because everyone can see what has already been done, the plants receive the care they need without unnecessary extra watering.",
        "因为大家都能看到完成的任务，植物得到所需照料，也不会被多浇水。",
        [
          "water",
          "flower"
        ]
      ],
      [
        "🌷",
        "At the end of the week, UU and the neighbor celebrate new leaves and the teamwork that helped them grow.",
        "一周结束时，UU 和邻居一起庆祝新叶长出，也庆祝帮助植物成长的合作。",
        [
          "leaf",
          "friend"
        ]
      ]
    ],
    "pageArt": [
      [
        "garden",
        "friend"
      ],
      [
        "water",
        "help"
      ],
      [
        "calendar",
        "leaf"
      ],
      [
        "calendar",
        "garden"
      ],
      [
        "water",
        "flower"
      ],
      [
        "leaf",
        "friend"
      ]
    ],
    "coverArt": [
      "garden",
      "friend"
    ],
    "level": "L10"
  },
  {
    "id": "journey-help",
    "title": "UU 学会从容求助",
    "emoji": "🚉",
    "scene": "学会从容求助",
    "topic": "read-bus-coin",
    "question": "UU 找谁帮助查看站台？",
    "answer": "worker",
    "choices": [
      "worker",
      "farmer",
      "singer"
    ],
    "pages": [
      [
        "🚉",
        "At a busy station, UU and Mother notice that the platform number on a screen is different from the one on their note.",
        "在繁忙车站，UU 和妈妈发现屏幕上的站台号与纸条上的不同。",
        [
          "station",
          "mother",
          "paper"
        ]
      ],
      [
        "🚉",
        "Rather than rushing toward a crowd, they stop together in a safe place and check the ticket and screen again.",
        "他们没有急着跟人群走，而是一起在安全位置停下，再核对车票和屏幕。",
        [
          "ticket",
          "wait"
        ]
      ],
      [
        "🚉",
        "Mother asks a station worker for help, and UU listens carefully as the worker explains which signs they should follow.",
        "妈妈向车站工作人员求助，UU 认真听工作人员解释应该跟随哪些标志。",
        [
          "worker",
          "ear"
        ]
      ],
      [
        "🚉",
        "They repeat the information back to make sure it is clear, then walk to the correct platform without separating.",
        "他们复述信息确认理解，再一起走向正确站台，始终没有分开。",
        [
          "station",
          "mother"
        ]
      ],
      [
        "🚉",
        "When they reach the waiting area, UU finds a seat beside Mother and keeps the ticket in a safe pocket.",
        "到候车区后，UU 找到妈妈旁边的座位，把车票放好。",
        [
          "seat",
          "ticket",
          "mother"
        ]
      ],
      [
        "🚉",
        "UU learns that pausing to ask a trusted worker can be more useful than hurrying when something on a journey changes.",
        "UU 学到，旅途中遇到变化时，停下来向可信的工作人员求助比着急赶路更有用。",
        [
          "worker",
          "train"
        ]
      ]
    ],
    "pageArt": [
      [
        "station",
        "mother",
        "paper"
      ],
      [
        "ticket",
        "wait"
      ],
      [
        "worker",
        "ear"
      ],
      [
        "station",
        "mother"
      ],
      [
        "seat",
        "ticket",
        "mother"
      ],
      [
        "worker",
        "train"
      ]
    ],
    "coverArt": [
      "station",
      "mother"
    ],
    "level": "L10"
  },
  {
    "id": "little-shoes",
    "title": "UU 的小鞋子",
    "level": "L1",
    "emoji": "📖",
    "scene": "UU 的小鞋子",
    "topic": "read-dress-day",
    "question": "UU 的鞋子是什么颜色？",
    "answer": "red",
    "choices": [
      "red",
      "blue",
      "green"
    ],
    "pages": [
      [
        "📖",
        "Shoes.",
        "鞋子。",
        [
          "shoes"
        ]
      ],
      [
        "📖",
        "Red shoes.",
        "红鞋子。",
        [
          "red",
          "shoes"
        ]
      ],
      [
        "📖",
        "Two shoes.",
        "两只鞋子。",
        [
          "shoes"
        ]
      ],
      [
        "📖",
        "UU's shoes.",
        "UU 的鞋子。",
        [
          "shoes"
        ]
      ],
      [
        "📖",
        "Shoes on.",
        "穿上鞋子。",
        [
          "shoes"
        ]
      ],
      [
        "📖",
        "Go, UU!",
        "出发吧，UU！",
        [
          "shoes",
          "home"
        ]
      ]
    ],
    "pageArt": [
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        }
      ],
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        }
      ],
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        }
      ],
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        }
      ],
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        }
      ],
      [
        {
          "word": "shoes",
          "variant": "red",
          "count": 2
        },
        "home"
      ]
    ],
    "coverArt": [
      {
        "word": "shoes",
        "variant": "red",
        "count": 2
      }
    ]
  },
  {
    "id": "round-orange",
    "title": "UU 的橙子",
    "level": "L1",
    "emoji": "📖",
    "scene": "UU 的橙子",
    "topic": "read-fruit-basket",
    "question": "UU 看到的是什么水果？",
    "answer": "orange",
    "choices": [
      "orange",
      "apple",
      "banana"
    ],
    "pages": [
      [
        "📖",
        "An orange.",
        "一个橙子。",
        [
          "orange"
        ]
      ],
      [
        "📖",
        "A round orange.",
        "一个圆圆的橙子。",
        [
          "orange"
        ]
      ],
      [
        "📖",
        "An orange leaf.",
        "一片橙树叶子。",
        [
          "orange",
          "leaf"
        ]
      ],
      [
        "📖",
        "A plate.",
        "一个盘子。",
        [
          "plate"
        ]
      ],
      [
        "📖",
        "An orange on a plate.",
        "盘子上有一个橙子。",
        [
          "orange",
          "plate"
        ]
      ],
      [
        "📖",
        "An orange for UU.",
        "给 UU 的橙子。",
        [
          "orange"
        ]
      ]
    ],
    "pageArt": [
      [
        "orange"
      ],
      [
        "orange"
      ],
      [
        "orange",
        "leaf"
      ],
      [
        "plate"
      ],
      [
        "orange",
        "plate"
      ],
      [
        "orange"
      ]
    ],
    "coverArt": [
      "orange"
    ]
  },
  {
    "id": "morning-sun",
    "title": "UU 看太阳",
    "level": "L2",
    "emoji": "📖",
    "scene": "UU 看太阳",
    "topic": "read-weather-book",
    "question": "UU 看到天空里有什么？",
    "answer": "sun",
    "choices": [
      "sun",
      "moon",
      "star"
    ],
    "pages": [
      [
        "📖",
        "It is morning.",
        "现在是早晨。",
        [
          "sun"
        ]
      ],
      [
        "📖",
        "UU is up.",
        "UU 起床了。",
        [
          "bed"
        ]
      ],
      [
        "📖",
        "UU sees the sun.",
        "UU 看见太阳。",
        [
          "sun"
        ]
      ],
      [
        "📖",
        "The sky is blue.",
        "天空是蓝色的。",
        [
          "blue"
        ]
      ],
      [
        "📖",
        "A bird is here.",
        "这里有一只鸟。",
        [
          "bird"
        ]
      ],
      [
        "📖",
        "UU waves to the bird.",
        "UU 向小鸟挥手。",
        [
          "bird",
          "sun"
        ]
      ]
    ],
    "pageArt": [
      [
        "sun"
      ],
      [
        "bed"
      ],
      [
        "sun"
      ],
      [
        "blue"
      ],
      [
        "bird"
      ],
      [
        "bird",
        "sun"
      ]
    ],
    "coverArt": [
      "bird",
      "sun"
    ]
  },
  {
    "id": "small-train",
    "title": "UU 的玩具火车",
    "level": "L2",
    "emoji": "📖",
    "scene": "UU 的玩具火车",
    "topic": "read-toy-day",
    "question": "小猫在哪里？",
    "answer": "box",
    "choices": [
      "box",
      "chair",
      "bed"
    ],
    "pages": [
      [
        "📖",
        "UU has a train.",
        "UU 有一辆火车。",
        [
          "train"
        ]
      ],
      [
        "📖",
        "It is a toy.",
        "它是一个玩具。",
        [
          "train"
        ]
      ],
      [
        "📖",
        "The train is red.",
        "火车是红色的。",
        [
          "red",
          "train"
        ]
      ],
      [
        "📖",
        "A cat is here.",
        "这里有一只猫。",
        [
          "cat"
        ]
      ],
      [
        "📖",
        "The cat is in a box.",
        "猫在盒子里。",
        [
          "cat",
          "box"
        ]
      ],
      [
        "📖",
        "UU likes the train.",
        "UU 喜欢这辆火车。",
        [
          "train"
        ]
      ]
    ],
    "pageArt": [
      [
        "train"
      ],
      [
        "train"
      ],
      [
        {
          "word": "train",
          "variant": "red"
        }
      ],
      [
        "cat"
      ],
      [
        {
          "word": "box",
          "variant": "cat-in"
        }
      ],
      [
        "train"
      ]
    ],
    "coverArt": [
      "train"
    ]
  },
  {
    "id": "garden-can",
    "title": "UU 给花浇水",
    "level": "L3",
    "emoji": "📖",
    "scene": "UU 给花浇水",
    "topic": "read-garden-helper",
    "question": "UU 给花送去了什么？",
    "answer": "water",
    "choices": [
      "water",
      "milk",
      "juice"
    ],
    "pages": [
      [
        "📖",
        "UU sees a flower.",
        "UU 看见一朵花。",
        [
          "flower"
        ]
      ],
      [
        "📖",
        "UU sees a leaf.",
        "UU 看见一片叶子。",
        [
          "leaf"
        ]
      ],
      [
        "📖",
        "UU sees a bee.",
        "UU 看见一只蜜蜂。",
        [
          "bee"
        ]
      ],
      [
        "📖",
        "UU sees a butterfly.",
        "UU 看见一只蝴蝶。",
        [
          "butterfly"
        ]
      ],
      [
        "📖",
        "UU brings some water.",
        "UU 拿来一些水。",
        [
          "water"
        ]
      ],
      [
        "📖",
        "UU gives the flower water.",
        "UU 给花浇水。",
        [
          "flower",
          "water"
        ]
      ]
    ],
    "pageArt": [
      [
        "flower"
      ],
      [
        "leaf"
      ],
      [
        "bee"
      ],
      [
        "butterfly"
      ],
      [
        "water"
      ],
      [
        "flower",
        "water"
      ]
    ],
    "coverArt": [
      "flower",
      "water"
    ]
  },
  {
    "id": "farm-hello",
    "title": "UU 向农场问好",
    "level": "L3",
    "emoji": "📖",
    "scene": "UU 向农场问好",
    "topic": "farm",
    "question": "故事里最后和 UU 打招呼的动物是什么？",
    "answer": "duck",
    "choices": [
      "duck",
      "cow",
      "pig"
    ],
    "pages": [
      [
        "📖",
        "Hello, cow!",
        "你好，奶牛！",
        [
          "cow"
        ]
      ],
      [
        "📖",
        "Hello, pig!",
        "你好，小猪！",
        [
          "pig"
        ]
      ],
      [
        "📖",
        "Hello, sheep!",
        "你好，绵羊！",
        [
          "sheep"
        ]
      ],
      [
        "📖",
        "Hello, horse!",
        "你好，小马！",
        [
          "horse"
        ]
      ],
      [
        "📖",
        "Hello, duck!",
        "你好，小鸭！",
        [
          "duck"
        ]
      ],
      [
        "📖",
        "UU waves goodbye to the animals.",
        "UU 向动物们挥手告别。",
        [
          "cow",
          "duck",
          "sheep"
        ]
      ]
    ],
    "pageArt": [
      [
        "cow"
      ],
      [
        "pig"
      ],
      [
        "sheep"
      ],
      [
        "horse"
      ],
      [
        "duck"
      ],
      [
        "cow",
        "duck",
        "sheep"
      ]
    ],
    "coverArt": [
      "cow",
      "duck",
      "sheep"
    ]
  },
  {
    "id": "school-lunch",
    "title": "UU 的学校午餐",
    "level": "L4",
    "emoji": "📖",
    "scene": "UU 的学校午餐",
    "topic": "school",
    "question": "UU 喝的是什么？",
    "answer": "water",
    "choices": [
      "water",
      "juice",
      "milk"
    ],
    "pages": [
      [
        "📖",
        "UU washes both hands.",
        "UU 洗干净两只手。",
        [
          "hand",
          "water"
        ]
      ],
      [
        "📖",
        "UU sits on a chair.",
        "UU 坐在椅子上。",
        [
          "chair"
        ]
      ],
      [
        "📖",
        "UU puts rice on a plate.",
        "UU 把米饭盛在盘子里。",
        [
          "rice",
          "plate"
        ]
      ],
      [
        "📖",
        "UU eats an egg.",
        "UU 吃了一个鸡蛋。",
        [
          "egg"
        ]
      ],
      [
        "📖",
        "UU drinks some water.",
        "UU 喝了一些水。",
        [
          "water"
        ]
      ],
      [
        "📖",
        "UU cleans the table.",
        "UU 把桌子擦干净。",
        [
          "table"
        ]
      ]
    ],
    "pageArt": [
      [
        "hand",
        "water"
      ],
      [
        "chair"
      ],
      [
        "rice",
        "plate"
      ],
      [
        "egg"
      ],
      [
        "water"
      ],
      [
        "table"
      ]
    ],
    "coverArt": [
      "table"
    ]
  },
  {
    "id": "night-curtain",
    "title": "UU 准备睡觉",
    "level": "L4",
    "emoji": "📖",
    "scene": "UU 准备睡觉",
    "topic": "bedtime",
    "question": "UU 最后躺在什么地方？",
    "answer": "bed",
    "choices": [
      "bed",
      "chair",
      "sofa"
    ],
    "pages": [
      [
        "📖",
        "UU puts the toys in a box.",
        "UU 把玩具放进盒子里。",
        [
          "ball",
          "box"
        ]
      ],
      [
        "📖",
        "UU washes with warm water.",
        "UU 用温水洗漱。",
        [
          "water"
        ]
      ],
      [
        "📖",
        "UU puts on a soft shirt.",
        "UU 穿上一件柔软的上衣。",
        [
          "shirt"
        ]
      ],
      [
        "📖",
        "UU opens a small book.",
        "UU 打开一本小书。",
        [
          "book"
        ]
      ],
      [
        "📖",
        "UU closes the book.",
        "UU 合上书。",
        [
          "book"
        ]
      ],
      [
        "📖",
        "UU gets into bed.",
        "UU 躺进被窝里。",
        [
          "bed"
        ]
      ]
    ],
    "pageArt": [
      [
        "ball",
        "box"
      ],
      [
        "water"
      ],
      [
        "shirt"
      ],
      [
        "book"
      ],
      [
        "book"
      ],
      [
        "bed"
      ]
    ],
    "coverArt": [
      "bed"
    ]
  },
  {
    "id": "sand-tower",
    "title": "UU 的沙滩小塔",
    "level": "L5",
    "emoji": "📖",
    "scene": "UU 的沙滩小塔",
    "topic": "sea",
    "question": "UU 用什么装沙子？",
    "answer": "cup",
    "choices": [
      "cup",
      "box",
      "bowl"
    ],
    "pages": [
      [
        "📖",
        "First, UU finds a place on the beach.",
        "首先，UU 在沙滩上找到一块地方。",
        [
          "beach"
        ]
      ],
      [
        "📖",
        "Next, UU fills a cup with sand.",
        "接着，UU 把沙子装进杯子里。",
        [
          "cup",
          "beach"
        ]
      ],
      [
        "📖",
        "Then, UU turns the cup over.",
        "然后，UU 把杯子倒扣过来。",
        [
          "cup"
        ]
      ],
      [
        "📖",
        "UU lifts the cup very slowly.",
        "UU 慢慢地把杯子提起来。",
        [
          "cup",
          "beach"
        ]
      ],
      [
        "📖",
        "Now a little sand tower stands there.",
        "现在，一座小沙塔立在那里。",
        [
          "beach"
        ]
      ],
      [
        "📖",
        "Finally, UU smiles beside the tower.",
        "最后，UU 在塔旁开心地笑了。",
        [
          "beach",
          "beach"
        ]
      ]
    ],
    "pageArt": [
      [
        "beach"
      ],
      [
        "cup",
        "beach"
      ],
      [
        "cup"
      ],
      [
        "cup",
        "beach"
      ],
      [
        "beach"
      ],
      [
        "beach",
        "beach"
      ]
    ],
    "coverArt": [
      "beach",
      "beach"
    ]
  },
  {
    "id": "fruit-yogurt",
    "title": "UU 做水果酸奶",
    "level": "L5",
    "emoji": "📖",
    "scene": "UU 做水果酸奶",
    "topic": "read-new-fruits",
    "question": "UU 把水果加进了什么？",
    "answer": "yogurt",
    "choices": [
      "yogurt",
      "soup",
      "milk"
    ],
    "pages": [
      [
        "📖",
        "First, UU washes a banana and an apple.",
        "首先，UU 清洗了一根香蕉和一个苹果。",
        [
          "banana",
          "apple"
        ]
      ],
      [
        "📖",
        "A grown-up cuts the apple into small pieces.",
        "大人把苹果切成小块。",
        [
          "apple"
        ]
      ],
      [
        "📖",
        "Next, UU peels the banana.",
        "接着，UU 剥开香蕉。",
        [
          "banana"
        ]
      ],
      [
        "📖",
        "Then, UU puts the fruit in a bowl.",
        "然后，UU 把水果放进碗里。",
        [
          "banana",
          "apple",
          "bowl"
        ]
      ],
      [
        "📖",
        "UU adds yogurt and stirs with a spoon.",
        "UU 加入酸奶，用勺子搅拌。",
        [
          "yogurt",
          "spoon"
        ]
      ],
      [
        "📖",
        "Finally, UU shares the snack with a friend.",
        "最后，UU 和朋友分享这份点心。",
        [
          "yogurt",
          "bowl"
        ]
      ]
    ],
    "pageArt": [
      [
        "banana",
        "apple"
      ],
      [
        "apple"
      ],
      [
        "banana"
      ],
      [
        "banana",
        "apple",
        "bowl"
      ],
      [
        "yogurt",
        "spoon"
      ],
      [
        "yogurt",
        "bowl"
      ]
    ],
    "coverArt": [
      "yogurt",
      "bowl"
    ]
  },
  {
    "id": "polite-bread",
    "title": "UU 在面包店",
    "level": "L6",
    "emoji": "📖",
    "scene": "UU 在面包店",
    "topic": "bakery",
    "question": "UU 买了什么？",
    "answer": "bread",
    "choices": [
      "bread",
      "cake",
      "cookie"
    ],
    "pages": [
      [
        "📖",
        "UU waits beside the counter at the bakery.",
        "UU 在面包店的柜台旁等候。",
        [
          "bread"
        ]
      ],
      [
        "📖",
        "The baker asks what UU would like today.",
        "面包师问 UU 今天想要什么。",
        [
          "bread",
          "cake"
        ]
      ],
      [
        "📖",
        "UU asks for some bread and says please.",
        "UU 礼貌地说请给一些面包。",
        [
          "bread"
        ]
      ],
      [
        "📖",
        "The baker puts the bread in a bag.",
        "面包师把面包装进袋子里。",
        [
          "bread",
          "bag"
        ]
      ],
      [
        "📖",
        "UU thanks the baker and holds the bag.",
        "UU 谢过面包师，拿好袋子。",
        [
          "bag"
        ]
      ],
      [
        "📖",
        "At home, UU shares the bread with Mother.",
        "到家后，UU 和妈妈分享面包。",
        [
          "home",
          "bread"
        ]
      ]
    ],
    "pageArt": [
      [
        "bread"
      ],
      [
        "bread",
        "cake"
      ],
      [
        "bread"
      ],
      [
        "bread",
        "bag"
      ],
      [
        "bag"
      ],
      [
        "home",
        "bread"
      ]
    ],
    "coverArt": [
      "home",
      "bread"
    ]
  },
  {
    "id": "borrow-crayon",
    "title": "UU 借蜡笔",
    "level": "L6",
    "emoji": "📖",
    "scene": "UU 借蜡笔",
    "topic": "read-art-apron",
    "question": "UU 借用的蜡笔是什么颜色？",
    "answer": "blue",
    "choices": [
      "blue",
      "red",
      "yellow"
    ],
    "pages": [
      [
        "📖",
        "UU wants to draw a blue boat at school.",
        "UU 想在学校画一艘蓝色的小船。",
        [
          "boat",
          "blue"
        ]
      ],
      [
        "📖",
        "UU has a red crayon but no blue one.",
        "UU 有红色蜡笔，却没有蓝色蜡笔。",
        [
          "crayon",
          "red"
        ]
      ],
      [
        "📖",
        "UU politely asks a friend for a blue crayon.",
        "UU 礼貌地向朋友借蓝色蜡笔。",
        [
          "crayon",
          "blue"
        ]
      ],
      [
        "📖",
        "The friend says yes and passes the crayon.",
        "朋友答应了，把蜡笔递过来。",
        [
          "crayon"
        ]
      ],
      [
        "📖",
        "UU draws the boat and returns the crayon.",
        "UU 画好小船，把蜡笔还给朋友。",
        [
          "boat",
          "crayon"
        ]
      ],
      [
        "📖",
        "UU says thank you, and both children smile.",
        "UU 说了谢谢，两个孩子都笑了。",
        [
          "boat",
          "blue"
        ]
      ]
    ],
    "pageArt": [
      [
        {
          "word": "boat",
          "variant": "blue"
        }
      ],
      [
        {
          "word": "crayon",
          "variant": "red"
        }
      ],
      [
        {
          "word": "crayon",
          "variant": "blue"
        }
      ],
      [
        {
          "word": "crayon",
          "variant": "blue"
        }
      ],
      [
        {
          "word": "boat",
          "variant": "blue"
        },
        {
          "word": "crayon",
          "variant": "blue"
        }
      ],
      [
        {
          "word": "boat",
          "variant": "blue"
        }
      ]
    ],
    "coverArt": [
      {
        "word": "boat",
        "variant": "blue"
      },
      {
        "word": "crayon",
        "variant": "blue"
      }
    ]
  },
  {
    "id": "wet-notebook",
    "title": "UU 保护笔记本",
    "level": "L7",
    "emoji": "📖",
    "scene": "UU 保护笔记本",
    "topic": "rain",
    "question": "UU 用什么保护笔记本？",
    "answer": "bag",
    "choices": [
      "bag",
      "bowl",
      "plate"
    ],
    "pages": [
      [
        "📖",
        "UU takes a notebook outside to draw a tree.",
        "UU 带着笔记本到外面画树。",
        [
          "notebook",
          "tree"
        ]
      ],
      [
        "📖",
        "Small raindrops land on the open notebook.",
        "小雨滴落在打开的笔记本上。",
        [
          "rain",
          "notebook"
        ]
      ],
      [
        "📖",
        "UU notices that the paper is getting wet.",
        "UU 发现纸张正在变湿。",
        [
          "paper",
          "rain"
        ]
      ],
      [
        "📖",
        "UU puts the notebook inside a dry bag.",
        "UU 把笔记本放进干燥的袋子里。",
        [
          "notebook",
          "bag"
        ]
      ],
      [
        "📖",
        "UU goes home with a grown-up before drawing again.",
        "UU 和大人回家后再继续画。",
        [
          "home",
          "bag"
        ]
      ],
      [
        "📖",
        "The notebook stays safe, and UU finishes the tree indoors.",
        "笔记本保护好了，UU 在屋里画完了树。",
        [
          "notebook",
          "tree"
        ]
      ]
    ],
    "pageArt": [
      [
        "notebook",
        "tree"
      ],
      [
        "rain",
        "notebook"
      ],
      [
        "paper",
        "rain"
      ],
      [
        "notebook",
        "bag"
      ],
      [
        "home",
        "bag"
      ],
      [
        "notebook",
        "tree"
      ]
    ],
    "coverArt": [
      "notebook",
      "tree"
    ]
  },
  {
    "id": "rolling-ball",
    "title": "UU 找回小球",
    "level": "L7",
    "emoji": "📖",
    "scene": "UU 找回小球",
    "topic": "sports",
    "question": "球停在了什么下面？",
    "answer": "bench",
    "choices": [
      "bench",
      "table",
      "bed"
    ],
    "pages": [
      [
        "📖",
        "UU and a friend roll a ball across the grass.",
        "UU 和朋友在草地上滚球。",
        [
          "ball",
          "grass"
        ]
      ],
      [
        "📖",
        "The ball rolls too far and stops under a bench.",
        "球滚得太远，停在长椅下面。",
        [
          "ball",
          "bench"
        ]
      ],
      [
        "📖",
        "UU cannot reach it safely from one side.",
        "UU 从一侧无法安全地够到球。",
        [
          "bench",
          "ball"
        ]
      ],
      [
        "📖",
        "The friend points to the other side of the bench.",
        "朋友指向长椅的另一侧。",
        [
          "bench"
        ]
      ],
      [
        "📖",
        "UU walks around and picks up the ball easily.",
        "UU 绕过去，轻松捡起了球。",
        [
          "ball"
        ]
      ],
      [
        "📖",
        "They move away from the bench and play again.",
        "他们离长椅远一些，再继续玩。",
        [
          "ball",
          "grass"
        ]
      ]
    ],
    "pageArt": [
      [
        "ball",
        "grass"
      ],
      [
        "ball",
        "bench"
      ],
      [
        "bench",
        "ball"
      ],
      [
        "bench"
      ],
      [
        "ball"
      ],
      [
        "ball",
        "grass"
      ]
    ],
    "coverArt": [
      "ball",
      "grass"
    ]
  },
  {
    "id": "shade-water",
    "title": "UU 照顾小狗",
    "level": "L8",
    "emoji": "📖",
    "scene": "UU 照顾小狗",
    "topic": "park",
    "question": "因为天气热，小狗需要什么？",
    "answer": "water",
    "choices": [
      "water",
      "cake",
      "bread"
    ],
    "pages": [
      [
        "📖",
        "The sun is bright, so UU chooses a shady place in the park.",
        "阳光很强，所以 UU 在公园选了一处阴凉的地方。",
        [
          "sun",
          "tree"
        ]
      ],
      [
        "📖",
        "A dog rests nearby because it feels hot after a walk.",
        "一只狗在附近休息，因为它散步后觉得热。",
        [
          "dog"
        ]
      ],
      [
        "📖",
        "UU asks the dog's owner before bringing a bowl of water.",
        "UU 先征得狗主人的同意，再端来一碗水。",
        [
          "dog",
          "bowl",
          "water"
        ]
      ],
      [
        "📖",
        "The owner sets down the bowl so the dog can drink.",
        "主人放下碗，让小狗喝水。",
        [
          "dog",
          "water"
        ]
      ],
      [
        "📖",
        "After drinking, the dog rests under the tree instead of running.",
        "喝完水，小狗在树下休息，没有继续跑。",
        [
          "dog",
          "tree"
        ]
      ],
      [
        "📖",
        "UU learns that shade, water, and rest help on a hot day.",
        "UU 明白了：天热时，阴凉、饮水和休息很有帮助。",
        [
          "tree",
          "water"
        ]
      ]
    ],
    "pageArt": [
      [
        "sun",
        "tree"
      ],
      [
        "dog"
      ],
      [
        "dog",
        "bowl",
        "water"
      ],
      [
        "dog",
        "water"
      ],
      [
        "dog",
        "tree"
      ],
      [
        "tree",
        "water"
      ]
    ],
    "coverArt": [
      "tree",
      "water"
    ]
  },
  {
    "id": "quiet-hatch",
    "title": "UU 轻轻看小鸡",
    "level": "L8",
    "emoji": "📖",
    "scene": "UU 轻轻看小鸡",
    "topic": "farm",
    "question": "UU 轻轻观察的是什么动物？",
    "answer": "chick",
    "choices": [
      "chick",
      "duck",
      "sheep"
    ],
    "pages": [
      [
        "📖",
        "UU visits the farm because some chicks have just hatched.",
        "UU 来到农场，因为有几只小鸡刚刚孵出来。",
        [
          "chick",
          "egg"
        ]
      ],
      [
        "📖",
        "The farmer asks everyone to speak softly near the chicks.",
        "农场主人请大家在小鸡附近轻声说话。",
        [
          "chick"
        ]
      ],
      [
        "📖",
        "UU stands still so the little chicks are not frightened.",
        "UU 静静站着，这样小鸡就不会受到惊吓。",
        [
          "chick"
        ]
      ],
      [
        "📖",
        "A chick walks toward its mother because it hears her call.",
        "一只小鸡听见妈妈的叫声，便朝妈妈走去。",
        [
          "chick",
          "hen"
        ]
      ],
      [
        "📖",
        "UU watches without touching, so the chicks can stay together.",
        "UU 只看不碰，让小鸡们安稳地待在一起。",
        [
          "chick",
          "hen"
        ]
      ],
      [
        "📖",
        "On the way home, UU remembers how gentle visitors help animals feel safe.",
        "回家的路上，UU 记住了：温柔地参观能让动物安心。",
        [
          "home",
          "chick"
        ]
      ]
    ],
    "pageArt": [
      [
        "chick",
        "egg"
      ],
      [
        "chick"
      ],
      [
        "chick"
      ],
      [
        "chick",
        "hen"
      ],
      [
        "chick",
        "hen"
      ],
      [
        "home",
        "chick"
      ]
    ],
    "coverArt": [
      "home",
      "chick"
    ]
  },
  {
    "id": "class-plant",
    "title": "UU 的班级小花园",
    "level": "L9",
    "emoji": "📖",
    "scene": "UU 的班级小花园",
    "topic": "seed",
    "question": "大家把小植物放在了什么旁边？",
    "answer": "window",
    "choices": [
      "window",
      "door",
      "bed"
    ],
    "pages": [
      [
        "📖",
        "UU's class plans to grow a plant, and everyone agrees to share the work.",
        "UU 的班级计划种一株植物，大家同意一起分担照顾工作。",
        [
          "seed"
        ]
      ],
      [
        "📖",
        "One friend brings a pot while UU helps gather soil with the teacher.",
        "一位朋友带来花盆，UU 则和老师一起准备泥土。",
        [
          "teacher"
        ]
      ],
      [
        "📖",
        "Another friend adds a seed, and UU gently covers it with soil.",
        "另一位朋友放入种子，UU 轻轻盖上泥土。",
        [
          "seed"
        ]
      ],
      [
        "📖",
        "Together they choose a place near the window where the plant will get light.",
        "大家一起选了窗边的位置，让植物能得到光照。",
        [
          "seed",
          "window"
        ]
      ],
      [
        "📖",
        "They make a plan to check the soil before adding a little water.",
        "他们约好先检查泥土，再适量浇水。",
        [
          "water"
        ]
      ],
      [
        "📖",
        "When green leaves appear, the class celebrates the small result of working together.",
        "当绿叶出现时，全班一起庆祝合作带来的小成果。",
        [
          "leaf",
          "seed"
        ]
      ]
    ],
    "pageArt": [
      [
        "seed"
      ],
      [
        {
          "word": "pot",
          "variant": "flower"
        },
        {
          "word": "garden",
          "variant": "soil"
        }
      ],
      [
        "seed",
        {
          "word": "garden",
          "variant": "soil"
        },
        {
          "word": "pot",
          "variant": "flower"
        }
      ],
      [
        "seed",
        "window"
      ],
      [
        {
          "word": "garden",
          "variant": "soil"
        },
        "water"
      ],
      [
        "leaf",
        "seed"
      ]
    ],
    "coverArt": [
      "leaf",
      "seed"
    ]
  },
  {
    "id": "picnic-jobs",
    "title": "UU 分工准备野餐",
    "level": "L9",
    "emoji": "📖",
    "scene": "UU 分工准备野餐",
    "topic": "read-picnic-fruit",
    "question": "UU 带的水果装在什么里面？",
    "answer": "basket",
    "choices": [
      "basket",
      "box",
      "cup"
    ],
    "pages": [
      [
        "📖",
        "UU and two friends plan a picnic, but they want to avoid bringing too much.",
        "UU 和两位朋友计划野餐，但他们不想带太多东西。",
        [
          "basket"
        ]
      ],
      [
        "📖",
        "They check what everyone needs and decide that each person will bring something different.",
        "他们先核对大家的需要，决定每人带不同的东西。",
        [
          "basket",
          "water"
        ]
      ],
      [
        "📖",
        "UU packs fruit in a basket while one friend brings cups and water.",
        "UU 把水果装进篮子，一位朋友准备杯子和水。",
        [
          "apple",
          "basket"
        ]
      ],
      [
        "📖",
        "The other friend brings a blanket and checks the weather with a grown-up.",
        "另一位朋友带上毯子，并和大人一起查看天气。",
        [
          "blanket",
          "sun"
        ]
      ],
      [
        "📖",
        "At the park, they put their things together and share a comfortable place to sit.",
        "到了公园，他们把物品放好，共同铺出舒适的座位。",
        [
          "blanket",
          "basket"
        ]
      ],
      [
        "📖",
        "Before leaving, everyone helps collect the rubbish, just as they planned together.",
        "离开前，大家按事先的约定，一起收拾垃圾。",
        [
          "bin",
          "basket"
        ]
      ]
    ],
    "pageArt": [
      [
        "basket"
      ],
      [
        "basket",
        "water"
      ],
      [
        "apple",
        "basket"
      ],
      [
        "blanket",
        "sun"
      ],
      [
        "blanket",
        "basket"
      ],
      [
        "bin",
        "basket"
      ]
    ],
    "coverArt": [
      "bin",
      "basket"
    ]
  },
  {
    "id": "station-change",
    "title": "UU 的换站小计划",
    "level": "L10",
    "emoji": "📖",
    "scene": "UU 的换站小计划",
    "topic": "read-bus-ride",
    "question": "UU 和爸爸改乘的是什么交通工具？",
    "answer": "bus",
    "choices": [
      "bus",
      "train",
      "plane"
    ],
    "pages": [
      [
        "📖",
        "UU and Father arrive at the train station early, expecting to visit a friend before lunchtime.",
        "UU 和爸爸早早来到火车站，原本打算午饭前去看朋友。",
        [
          "train",
          "station"
        ]
      ],
      [
        "📖",
        "When the notice shows a delay, Father explains that they will need to change their travel plan.",
        "公告显示列车晚点，爸爸解释说他们需要调整出行计划。",
        [
          "train",
          "clock"
        ]
      ],
      [
        "📖",
        "UU stays beside Father while they ask a member of staff which bus can take them to the same place.",
        "UU 一直待在爸爸身边，他们一起向工作人员询问能到同一目的地的公交车。",
        [
          "bus",
          "station"
        ]
      ],
      [
        "📖",
        "After checking the route and the time, they walk together to the bus stop outside the station.",
        "核对路线和时间后，他们一起走到车站外的公交站。",
        [
          "bus",
          "clock"
        ]
      ],
      [
        "📖",
        "Father tells their friend about the change, so nobody has to worry about why they have not arrived yet.",
        "爸爸把变化告诉朋友，这样朋友就不用担心他们为什么还没到。",
        [
          "phone",
          "bus"
        ]
      ],
      [
        "📖",
        "As the bus sets off, UU feels pleased that asking for help has turned a delay into a manageable adventure.",
        "公交车出发了，UU 很高兴：主动求助让一次晚点变成了能够应对的小冒险。",
        [
          "bus"
        ]
      ]
    ],
    "pageArt": [
      [
        "train",
        "station"
      ],
      [
        "train",
        "clock"
      ],
      [
        "bus",
        "station"
      ],
      [
        "bus",
        "clock"
      ],
      [
        "phone",
        "bus"
      ],
      [
        "bus"
      ]
    ],
    "coverArt": [
      "bus"
    ]
  },
  {
    "id": "book-display",
    "title": "UU 布置分享书桌",
    "level": "L10",
    "emoji": "📖",
    "scene": "UU 布置分享书桌",
    "topic": "library",
    "question": "大家把借书提醒写在了什么上？",
    "answer": "paper",
    "choices": [
      "paper",
      "plate",
      "cup"
    ],
    "pages": [
      [
        "📖",
        "UU's class wants to share favorite books, but the small table cannot hold every book at the same time.",
        "UU 的班级想分享喜欢的书，可是小桌子无法同时放下所有的书。",
        [
          "book",
          "table"
        ]
      ],
      [
        "📖",
        "Instead of choosing only one person's favorites, the children agree to take turns making a display each week.",
        "孩子们没有只选一个人的最爱，而是约定每周轮流布置展示。",
        [
          "book"
        ]
      ],
      [
        "📖",
        "UU helps the first group choose a few books with different topics, so visitors can find something they enjoy.",
        "UU 帮第一组挑选了几本不同主题的书，让来看的同学都能找到感兴趣的内容。",
        [
          "book",
          "table"
        ]
      ],
      [
        "📖",
        "Together they write a reminder on paper asking readers to return each book to the table after looking at it.",
        "大家一起在纸上写下提醒，请读者看完后把书放回桌上。",
        [
          "paper",
          "book"
        ]
      ],
      [
        "📖",
        "When a younger child cannot reach a book, UU asks which one the child wants and carefully passes it over.",
        "一个小朋友够不到书时，UU 先问清他想看哪本，再小心地递过去。",
        [
          "book"
        ]
      ],
      [
        "📖",
        "By the end of the week, the class understands that sharing works best when everyone can choose, join in, and help.",
        "一周结束时，全班明白了：让每个人都能选择、参与和帮忙，分享才会更好。",
        [
          "book",
          "table"
        ]
      ]
    ],
    "pageArt": [
      [
        "book",
        "table"
      ],
      [
        "book"
      ],
      [
        "book",
        "table"
      ],
      [
        "paper",
        "book"
      ],
      [
        "book"
      ],
      [
        "book",
        "table"
      ]
    ],
    "coverArt": [
      "book",
      "table"
    ]
  }
];

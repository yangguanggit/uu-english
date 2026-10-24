/* Two authored decisions per scene; each path has exactly three exchanges. */
window.BEAR_SCENE_BRANCHES = {
  "breakfast": {
    "question": "Milk or water?",
    "zh": "你想喝牛奶还是水？",
    "paths": [
      {
        "pick": "Milk, please.",
        "zh": "请给我牛奶。",
        "npc": "Here is your milk.",
        "npcZh": "这是你的牛奶。",
        "end": "Enjoy your milk!",
        "endZh": "慢慢享用牛奶吧！",
        "result": "拿到了牛奶",
        "choices": [
          "Milk, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "Water, please.",
        "zh": "请给我水。",
        "npc": "Here is your water.",
        "npcZh": "这是你的水。",
        "end": "Enjoy your water!",
        "endZh": "慢慢喝水吧！",
        "result": "拿到了水",
        "choices": [
          "Water, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "wardrobe": {
    "question": "Would you like to wear the red hat or wear the blue hat?",
    "zh": "你想先戴红帽子，还是戴蓝帽子？",
    "paths": [
      {
        "pick": "Let us wear the red hat.",
        "zh": "我们戴红帽子吧。",
        "choices": [
          "Let us wear the red hat.",
          "I would like to wear the red hat."
        ],
        "npc": "You can wear the red hat. Are you ready to start?",
        "npcZh": "你可以戴红帽子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：戴红帽子"
      },
      {
        "pick": "Let us wear the blue hat.",
        "zh": "我们戴蓝帽子吧。",
        "choices": [
          "Let us wear the blue hat.",
          "I would like to wear the blue hat."
        ],
        "npc": "You can wear the blue hat. Are you ready to start?",
        "npcZh": "你可以戴蓝帽子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：戴蓝帽子"
      }
    ]
  },
  "toys": {
    "question": "Would you like to play with the ball or play with the toy car?",
    "zh": "你想先玩球，还是玩玩具车？",
    "paths": [
      {
        "pick": "Let us play with the ball.",
        "zh": "我们玩球吧。",
        "choices": [
          "Let us play with the ball.",
          "I would like to play with the ball."
        ],
        "npc": "You can play with the ball. Would you like some help?",
        "npcZh": "你可以玩球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：玩球"
      },
      {
        "pick": "Let us play with the toy car.",
        "zh": "我们玩玩具车吧。",
        "choices": [
          "Let us play with the toy car.",
          "I would like to play with the toy car."
        ],
        "npc": "You can play with the toy car. Would you like some help?",
        "npcZh": "你可以玩玩具车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：玩玩具车"
      }
    ]
  },
  "birthday": {
    "question": "Cake or juice?",
    "zh": "你想要蛋糕还是果汁？",
    "paths": [
      {
        "pick": "Cake, please.",
        "zh": "请给我蛋糕。",
        "npc": "Here is your cake.",
        "npcZh": "这是你的蛋糕。",
        "end": "Enjoy your cake!",
        "endZh": "慢慢享用蛋糕吧！",
        "result": "选好了生日蛋糕",
        "choices": [
          "Cake, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "Juice, please.",
        "zh": "请给我果汁。",
        "npc": "Here is your juice.",
        "npcZh": "这是你的果汁。",
        "end": "Enjoy your juice!",
        "endZh": "慢慢喝果汁吧！",
        "result": "选好了生日果汁",
        "choices": [
          "Juice, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "home-sleep": {
    "question": "Would you like to read before bed or say good night?",
    "zh": "你想先睡前读书，还是道晚安？",
    "paths": [
      {
        "pick": "Let us read before bed.",
        "zh": "我们睡前读书吧。",
        "choices": [
          "Let us read before bed.",
          "I would like to read before bed."
        ],
        "npc": "You can read before bed. Are you ready to start?",
        "npcZh": "你可以睡前读书。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：睡前读书"
      },
      {
        "pick": "Let us say good night.",
        "zh": "我们道晚安吧。",
        "choices": [
          "Let us say good night.",
          "I would like to say good night."
        ],
        "npc": "You can say good night. Are you ready to start?",
        "npcZh": "你可以道晚安。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：道晚安"
      }
    ]
  },
  "bedroom-bed": {
    "question": "Would you like to make the bed or fold the blanket?",
    "zh": "你想先整理床铺，还是叠毯子？",
    "paths": [
      {
        "pick": "Let us make the bed.",
        "zh": "我们整理床铺吧。",
        "choices": [
          "Let us make the bed.",
          "I would like to make the bed."
        ],
        "npc": "You can make the bed. Would you like some help?",
        "npcZh": "你可以整理床铺。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：整理床铺"
      },
      {
        "pick": "Let us fold the blanket.",
        "zh": "我们叠毯子吧。",
        "choices": [
          "Let us fold the blanket.",
          "I would like to fold the blanket."
        ],
        "npc": "You can fold the blanket. Would you like some help?",
        "npcZh": "你可以叠毯子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：叠毯子"
      }
    ]
  },
  "bedroom-shirt": {
    "question": "Would you like to wear the blue shirt or wear the red shirt?",
    "zh": "你想先穿蓝衬衫，还是穿红衬衫？",
    "paths": [
      {
        "pick": "Let us wear the blue shirt.",
        "zh": "我们穿蓝衬衫吧。",
        "choices": [
          "Let us wear the blue shirt.",
          "I would like to wear the blue shirt."
        ],
        "npc": "You can wear the blue shirt. Shall we do it together?",
        "npcZh": "你可以穿蓝衬衫。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：穿蓝衬衫"
      },
      {
        "pick": "Let us wear the red shirt.",
        "zh": "我们穿红衬衫吧。",
        "choices": [
          "Let us wear the red shirt.",
          "I would like to wear the red shirt."
        ],
        "npc": "You can wear the red shirt. Shall we do it together?",
        "npcZh": "你可以穿红衬衫。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：穿红衬衫"
      }
    ]
  },
  "bedroom-window": {
    "question": "Would you like to open the window or close the window?",
    "zh": "你想先打开窗户，还是关上窗户？",
    "paths": [
      {
        "pick": "Let us open the window.",
        "zh": "我们打开窗户吧。",
        "choices": [
          "Let us open the window.",
          "I would like to open the window."
        ],
        "npc": "You can open the window. Are you ready to start?",
        "npcZh": "你可以打开窗户。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：打开窗户"
      },
      {
        "pick": "Let us close the window.",
        "zh": "我们关上窗户吧。",
        "choices": [
          "Let us close the window.",
          "I would like to close the window."
        ],
        "npc": "You can close the window. Are you ready to start?",
        "npcZh": "你可以关上窗户。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：关上窗户"
      }
    ]
  },
  "bedroom-clock": {
    "question": "Would you like to get up now or look at the clock?",
    "zh": "你想先现在起床，还是看看时钟？",
    "paths": [
      {
        "pick": "Let us get up now.",
        "zh": "我们现在起床吧。",
        "choices": [
          "Let us get up now.",
          "I would like to get up now."
        ],
        "npc": "You can get up now. Would you like some help?",
        "npcZh": "你可以现在起床。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：现在起床"
      },
      {
        "pick": "Let us look at the clock.",
        "zh": "我们看看时钟吧。",
        "choices": [
          "Let us look at the clock.",
          "I would like to look at the clock."
        ],
        "npc": "You can look at the clock. Would you like some help?",
        "npcZh": "你可以看看时钟。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看看时钟"
      }
    ]
  },
  "bedroom-story": {
    "question": "An animal book or a color book?",
    "zh": "你想读动物书还是颜色书？",
    "paths": [
      {
        "pick": "The animal book, please.",
        "zh": "请给我动物书。",
        "npc": "Here is the animal book.",
        "npcZh": "这是动物书。",
        "end": "Enjoy the animal story!",
        "endZh": "一起读动物故事吧！",
        "result": "找到了想读的动物书",
        "choices": [
          "The animal book, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "The color book, please.",
        "zh": "请给我颜色书。",
        "npc": "Here is the color book.",
        "npcZh": "这是颜色书。",
        "end": "Enjoy the color story!",
        "endZh": "一起读颜色故事吧！",
        "result": "找到了想读的颜色书",
        "choices": [
          "The color book, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "bathroom-soap": {
    "question": "Would you like to wash our hands or get some soap?",
    "zh": "你想先洗手，还是拿些肥皂？",
    "paths": [
      {
        "pick": "Let us wash our hands.",
        "zh": "我们洗手吧。",
        "choices": [
          "Let us wash our hands.",
          "I would like to wash our hands."
        ],
        "npc": "You can wash our hands. Are you ready to start?",
        "npcZh": "你可以洗手。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：洗手"
      },
      {
        "pick": "Let us get some soap.",
        "zh": "我们拿些肥皂吧。",
        "choices": [
          "Let us get some soap.",
          "I would like to get some soap."
        ],
        "npc": "You can get some soap. Are you ready to start?",
        "npcZh": "你可以拿些肥皂。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：拿些肥皂"
      }
    ]
  },
  "bathroom-towel": {
    "question": "Would you like to use the yellow towel or use the blue towel?",
    "zh": "你想先用黄毛巾，还是用蓝毛巾？",
    "paths": [
      {
        "pick": "Let us use the yellow towel.",
        "zh": "我们用黄毛巾吧。",
        "choices": [
          "Let us use the yellow towel.",
          "I would like to use the yellow towel."
        ],
        "npc": "You can use the yellow towel. Would you like some help?",
        "npcZh": "你可以用黄毛巾。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：用黄毛巾"
      },
      {
        "pick": "Let us use the blue towel.",
        "zh": "我们用蓝毛巾吧。",
        "choices": [
          "Let us use the blue towel.",
          "I would like to use the blue towel."
        ],
        "npc": "You can use the blue towel. Would you like some help?",
        "npcZh": "你可以用蓝毛巾。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：用蓝毛巾"
      }
    ]
  },
  "bathroom-teeth": {
    "question": "Would you like to find the toothbrush or find the toothpaste?",
    "zh": "你想先找牙刷，还是找牙膏？",
    "paths": [
      {
        "pick": "Let us find the toothbrush.",
        "zh": "我们找牙刷吧。",
        "choices": [
          "Let us find the toothbrush.",
          "I would like to find the toothbrush."
        ],
        "npc": "You can find the toothbrush. Shall we do it together?",
        "npcZh": "你可以找牙刷。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找牙刷"
      },
      {
        "pick": "Let us find the toothpaste.",
        "zh": "我们找牙膏吧。",
        "choices": [
          "Let us find the toothpaste.",
          "I would like to find the toothpaste."
        ],
        "npc": "You can find the toothpaste. Shall we do it together?",
        "npcZh": "你可以找牙膏。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找牙膏"
      }
    ]
  },
  "bathroom-comb": {
    "question": "Would you like to comb your hair or find your comb?",
    "zh": "你想先梳头，还是找梳子？",
    "paths": [
      {
        "pick": "Let us comb my hair.",
        "zh": "我们梳头吧。",
        "choices": [
          "Let us comb my hair.",
          "I would like to comb my hair."
        ],
        "npc": "You can comb your hair. Are you ready to start?",
        "npcZh": "你可以梳头。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：梳头"
      },
      {
        "pick": "Let us find my comb.",
        "zh": "我们找梳子吧。",
        "choices": [
          "Let us find my comb.",
          "I would like to find my comb."
        ],
        "npc": "You can find your comb. Are you ready to start?",
        "npcZh": "你可以找梳子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找梳子"
      }
    ]
  },
  "bathroom-tissue": {
    "question": "Would you like to get a tissue or put the tissue in the bin?",
    "zh": "你想先拿纸巾，还是把纸巾扔进垃圾桶？",
    "paths": [
      {
        "pick": "Let us get a tissue.",
        "zh": "我们拿纸巾吧。",
        "choices": [
          "Let us get a tissue.",
          "I would like to get a tissue."
        ],
        "npc": "You can get a tissue. Would you like some help?",
        "npcZh": "你可以拿纸巾。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：拿纸巾"
      },
      {
        "pick": "Let us put the tissue in the bin.",
        "zh": "我们把纸巾扔进垃圾桶吧。",
        "choices": [
          "Let us put the tissue in the bin.",
          "I would like to put the tissue in the bin."
        ],
        "npc": "You can put the tissue in the bin. Would you like some help?",
        "npcZh": "你可以把纸巾扔进垃圾桶。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：把纸巾扔进垃圾桶"
      }
    ]
  },
  "kitchen-spoon": {
    "question": "Would you like to get a spoon or get a fork?",
    "zh": "你想先拿勺子，还是拿叉子？",
    "paths": [
      {
        "pick": "Let us get a spoon.",
        "zh": "我们拿勺子吧。",
        "choices": [
          "Let us get a spoon.",
          "I would like to get a spoon."
        ],
        "npc": "You can get a spoon. Shall we do it together?",
        "npcZh": "你可以拿勺子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：拿勺子"
      },
      {
        "pick": "Let us get a fork.",
        "zh": "我们拿叉子吧。",
        "choices": [
          "Let us get a fork.",
          "I would like to get a fork."
        ],
        "npc": "You can get a fork. Shall we do it together?",
        "npcZh": "你可以拿叉子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：拿叉子"
      }
    ]
  },
  "kitchen-bowl": {
    "question": "Would you like to use the small bowl or use the big bowl?",
    "zh": "你想先用小碗，还是用大碗？",
    "paths": [
      {
        "pick": "Let us use the small bowl.",
        "zh": "我们用小碗吧。",
        "choices": [
          "Let us use the small bowl.",
          "I would like to use the small bowl."
        ],
        "npc": "You can use the small bowl. Are you ready to start?",
        "npcZh": "你可以用小碗。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：用小碗"
      },
      {
        "pick": "Let us use the big bowl.",
        "zh": "我们用大碗吧。",
        "choices": [
          "Let us use the big bowl.",
          "I would like to use the big bowl."
        ],
        "npc": "You can use the big bowl. Are you ready to start?",
        "npcZh": "你可以用大碗。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：用大碗"
      }
    ]
  },
  "kitchen-cup": {
    "question": "A big cup or a small cup?",
    "zh": "你需要大杯子还是小杯子？",
    "paths": [
      {
        "pick": "A big cup, please.",
        "zh": "请给我一个大杯子。",
        "npc": "Here is the big cup.",
        "npcZh": "这是大杯子。",
        "end": "Enjoy your drink!",
        "endZh": "慢慢喝吧！",
        "result": "拿到了大杯子",
        "choices": [
          "A big cup, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "A small cup, please.",
        "zh": "请给我一个小杯子。",
        "npc": "Here is the small cup.",
        "npcZh": "这是小杯子。",
        "end": "Enjoy your drink!",
        "endZh": "慢慢喝吧！",
        "result": "拿到了小杯子",
        "choices": [
          "A small cup, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "kitchen-plate": {
    "question": "Would you like to pass the plate or pass the bread?",
    "zh": "你想先递盘子，还是递面包？",
    "paths": [
      {
        "pick": "Let us pass the plate.",
        "zh": "我们递盘子吧。",
        "choices": [
          "Let us pass the plate.",
          "I would like to pass the plate."
        ],
        "npc": "You can pass the plate. Shall we do it together?",
        "npcZh": "你可以递盘子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：递盘子"
      },
      {
        "pick": "Let us pass the bread.",
        "zh": "我们递面包吧。",
        "choices": [
          "Let us pass the bread.",
          "I would like to pass the bread."
        ],
        "npc": "You can pass the bread. Shall we do it together?",
        "npcZh": "你可以递面包。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：递面包"
      }
    ]
  },
  "kitchen-bottle": {
    "question": "Would you like to fill the water bottle or put the bottle in the bag?",
    "zh": "你想先装满水瓶，还是把水瓶放进包里？",
    "paths": [
      {
        "pick": "Let us fill the water bottle.",
        "zh": "我们装满水瓶吧。",
        "choices": [
          "Let us fill the water bottle.",
          "I would like to fill the water bottle."
        ],
        "npc": "You can fill the water bottle. Are you ready to start?",
        "npcZh": "你可以装满水瓶。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：装满水瓶"
      },
      {
        "pick": "Let us put the bottle in the bag.",
        "zh": "我们把水瓶放进包里吧。",
        "choices": [
          "Let us put the bottle in the bag.",
          "I would like to put the bottle in the bag."
        ],
        "npc": "You can put the bottle in the bag. Are you ready to start?",
        "npcZh": "你可以把水瓶放进包里。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：把水瓶放进包里"
      }
    ]
  },
  "playroom-teddy": {
    "question": "Would you like to look under the chair or look beside the bed?",
    "zh": "你想先看看椅子下面，还是看看床边？",
    "paths": [
      {
        "pick": "Let us look under the chair.",
        "zh": "我们看看椅子下面吧。",
        "choices": [
          "Let us look under the chair.",
          "I would like to look under the chair."
        ],
        "npc": "You can look under the chair. Would you like some help?",
        "npcZh": "你可以看看椅子下面。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看看椅子下面"
      },
      {
        "pick": "Let us look beside the bed.",
        "zh": "我们看看床边吧。",
        "choices": [
          "Let us look beside the bed.",
          "I would like to look beside the bed."
        ],
        "npc": "You can look beside the bed. Would you like some help?",
        "npcZh": "你可以看看床边。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看看床边"
      }
    ]
  },
  "playroom-blocks": {
    "question": "Would you like to build a tall tower or build a little house?",
    "zh": "你想先搭高塔，还是搭小房子？",
    "paths": [
      {
        "pick": "Let us build a tall tower.",
        "zh": "我们搭高塔吧。",
        "choices": [
          "Let us build a tall tower.",
          "I would like to build a tall tower."
        ],
        "npc": "You can build a tall tower. Shall we do it together?",
        "npcZh": "你可以搭高塔。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：搭高塔"
      },
      {
        "pick": "Let us build a little house.",
        "zh": "我们搭小房子吧。",
        "choices": [
          "Let us build a little house.",
          "I would like to build a little house."
        ],
        "npc": "You can build a little house. Shall we do it together?",
        "npcZh": "你可以搭小房子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：搭小房子"
      }
    ]
  },
  "playroom-robot": {
    "question": "Would you like to make the robot walk or make the robot dance?",
    "zh": "你想先让机器人走路，还是让机器人跳舞？",
    "paths": [
      {
        "pick": "Let us make the robot walk.",
        "zh": "我们让机器人走路吧。",
        "choices": [
          "Let us make the robot walk.",
          "I would like to make the robot walk."
        ],
        "npc": "You can make the robot walk. Are you ready to start?",
        "npcZh": "你可以让机器人走路。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：让机器人走路"
      },
      {
        "pick": "Let us make the robot dance.",
        "zh": "我们让机器人跳舞吧。",
        "choices": [
          "Let us make the robot dance.",
          "I would like to make the robot dance."
        ],
        "npc": "You can make the robot dance. Are you ready to start?",
        "npcZh": "你可以让机器人跳舞。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：让机器人跳舞"
      }
    ]
  },
  "playroom-kite": {
    "question": "Would you like to fly the green kite or fly the red kite?",
    "zh": "你想先放绿风筝，还是放红风筝？",
    "paths": [
      {
        "pick": "Let us fly the green kite.",
        "zh": "我们放绿风筝吧。",
        "choices": [
          "Let us fly the green kite.",
          "I would like to fly the green kite."
        ],
        "npc": "You can fly the green kite. Would you like some help?",
        "npcZh": "你可以放绿风筝。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：放绿风筝"
      },
      {
        "pick": "Let us fly the red kite.",
        "zh": "我们放红风筝吧。",
        "choices": [
          "Let us fly the red kite.",
          "I would like to fly the red kite."
        ],
        "npc": "You can fly the red kite. Would you like some help?",
        "npcZh": "你可以放红风筝。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：放红风筝"
      }
    ]
  },
  "playroom-puzzle": {
    "question": "Would you like to find the corner piece or find the blue piece?",
    "zh": "你想先找角上的拼图，还是找蓝色拼图？",
    "paths": [
      {
        "pick": "Let us find the corner piece.",
        "zh": "我们找角上的拼图吧。",
        "choices": [
          "Let us find the corner piece.",
          "I would like to find the corner piece."
        ],
        "npc": "You can find the corner piece. Shall we do it together?",
        "npcZh": "你可以找角上的拼图。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找角上的拼图"
      },
      {
        "pick": "Let us find the blue piece.",
        "zh": "我们找蓝色拼图吧。",
        "choices": [
          "Let us find the blue piece.",
          "I would like to find the blue piece."
        ],
        "npc": "You can find the blue piece. Shall we do it together?",
        "npcZh": "你可以找蓝色拼图。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找蓝色拼图"
      }
    ]
  },
  "clothing-store-1": {
    "question": "Would you like to try on the sweater or look for a jacket?",
    "zh": "你想先试穿毛衣，还是找外套？",
    "paths": [
      {
        "pick": "Let us try on the sweater.",
        "zh": "我们试穿毛衣吧。",
        "choices": [
          "Let us try on the sweater.",
          "I would like to try on the sweater."
        ],
        "npc": "You can try on the sweater. Are you ready to start?",
        "npcZh": "你可以试穿毛衣。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：试穿毛衣"
      },
      {
        "pick": "Let us look for a jacket.",
        "zh": "我们找外套吧。",
        "choices": [
          "Let us look for a jacket.",
          "I would like to look for a jacket."
        ],
        "npc": "You can look for a jacket. Are you ready to start?",
        "npcZh": "你可以找外套。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找外套"
      }
    ]
  },
  "clothing-store-2": {
    "question": "Would you like to try on the blue jeans or try on the black jeans?",
    "zh": "你想先试穿蓝牛仔裤，还是试穿黑牛仔裤？",
    "paths": [
      {
        "pick": "Let us try on the blue jeans.",
        "zh": "我们试穿蓝牛仔裤吧。",
        "choices": [
          "Let us try on the blue jeans.",
          "I would like to try on the blue jeans."
        ],
        "npc": "You can try on the blue jeans. Would you like some help?",
        "npcZh": "你可以试穿蓝牛仔裤。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：试穿蓝牛仔裤"
      },
      {
        "pick": "Let us try on the black jeans.",
        "zh": "我们试穿黑牛仔裤吧。",
        "choices": [
          "Let us try on the black jeans.",
          "I would like to try on the black jeans."
        ],
        "npc": "You can try on the black jeans. Would you like some help?",
        "npcZh": "你可以试穿黑牛仔裤。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：试穿黑牛仔裤"
      }
    ]
  },
  "clothing-store-3": {
    "question": "Would you like to find the matching sock or choose some new socks?",
    "zh": "你想先找配对的袜子，还是挑新袜子？",
    "paths": [
      {
        "pick": "Let us find the matching sock.",
        "zh": "我们找配对的袜子吧。",
        "choices": [
          "Let us find the matching sock.",
          "I would like to find the matching sock."
        ],
        "npc": "You can find the matching sock. Shall we do it together?",
        "npcZh": "你可以找配对的袜子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找配对的袜子"
      },
      {
        "pick": "Let us choose some new socks.",
        "zh": "我们挑新袜子吧。",
        "choices": [
          "Let us choose some new socks.",
          "I would like to choose some new socks."
        ],
        "npc": "You can choose some new socks. Shall we do it together?",
        "npcZh": "你可以挑新袜子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：挑新袜子"
      }
    ]
  },
  "clothing-store-4": {
    "question": "Would you like to try on the mittens or try on the gloves?",
    "zh": "你想先试戴连指手套，还是试戴手套？",
    "paths": [
      {
        "pick": "Let us try on the mittens.",
        "zh": "我们试戴连指手套吧。",
        "choices": [
          "Let us try on the mittens.",
          "I would like to try on the mittens."
        ],
        "npc": "You can try on the mittens. Are you ready to start?",
        "npcZh": "你可以试戴连指手套。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：试戴连指手套"
      },
      {
        "pick": "Let us try on the gloves.",
        "zh": "我们试戴手套吧。",
        "choices": [
          "Let us try on the gloves.",
          "I would like to try on the gloves."
        ],
        "npc": "You can try on the gloves. Are you ready to start?",
        "npcZh": "你可以试戴手套。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：试戴手套"
      }
    ]
  },
  "clothing-store-5": {
    "question": "Would you like to wear the green vest or wear the blue vest?",
    "zh": "你想先穿绿马甲，还是穿蓝马甲？",
    "paths": [
      {
        "pick": "Let us wear the green vest.",
        "zh": "我们穿绿马甲吧。",
        "choices": [
          "Let us wear the green vest.",
          "I would like to wear the green vest."
        ],
        "npc": "You can wear the green vest. Would you like some help?",
        "npcZh": "你可以穿绿马甲。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：穿绿马甲"
      },
      {
        "pick": "Let us wear the blue vest.",
        "zh": "我们穿蓝马甲吧。",
        "choices": [
          "Let us wear the blue vest.",
          "I would like to wear the blue vest."
        ],
        "npc": "You can wear the blue vest. Would you like some help?",
        "npcZh": "你可以穿蓝马甲。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：穿蓝马甲"
      }
    ]
  },
  "body-eyes": {
    "question": "Would you like to close our eyes or look at a picture?",
    "zh": "你想先闭上眼睛，还是看图画？",
    "paths": [
      {
        "pick": "Let us close our eyes.",
        "zh": "我们闭上眼睛吧。",
        "choices": [
          "Let us close our eyes.",
          "I would like to close our eyes."
        ],
        "npc": "You can close our eyes. Shall we do it together?",
        "npcZh": "你可以闭上眼睛。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：闭上眼睛"
      },
      {
        "pick": "Let us look at a picture.",
        "zh": "我们看图画吧。",
        "choices": [
          "Let us look at a picture.",
          "I would like to look at a picture."
        ],
        "npc": "You can look at a picture. Shall we do it together?",
        "npcZh": "你可以看图画。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看图画"
      }
    ]
  },
  "body-ears": {
    "question": "Would you like to listen to music or listen to the birds?",
    "zh": "你想先听音乐，还是听鸟叫？",
    "paths": [
      {
        "pick": "Let us listen to music.",
        "zh": "我们听音乐吧。",
        "choices": [
          "Let us listen to music.",
          "I would like to listen to music."
        ],
        "npc": "You can listen to music. Are you ready to start?",
        "npcZh": "你可以听音乐。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：听音乐"
      },
      {
        "pick": "Let us listen to the birds.",
        "zh": "我们听鸟叫吧。",
        "choices": [
          "Let us listen to the birds.",
          "I would like to listen to the birds."
        ],
        "npc": "You can listen to the birds. Are you ready to start?",
        "npcZh": "你可以听鸟叫。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：听鸟叫"
      }
    ]
  },
  "body-nose": {
    "question": "Would you like to smell the flower or smell the orange?",
    "zh": "你想先闻花香，还是闻橙子的香味？",
    "paths": [
      {
        "pick": "Let us smell the flower.",
        "zh": "我们闻花香吧。",
        "choices": [
          "Let us smell the flower.",
          "I would like to smell the flower."
        ],
        "npc": "You can smell the flower. Would you like some help?",
        "npcZh": "你可以闻花香。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：闻花香"
      },
      {
        "pick": "Let us smell the orange.",
        "zh": "我们闻橙子的香味吧。",
        "choices": [
          "Let us smell the orange.",
          "I would like to smell the orange."
        ],
        "npc": "You can smell the orange. Would you like some help?",
        "npcZh": "你可以闻橙子的香味。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：闻橙子的香味"
      }
    ]
  },
  "body-hands": {
    "question": "Would you like to wash our hands or dry our hands?",
    "zh": "你想先洗手，还是擦干手？",
    "paths": [
      {
        "pick": "Let us wash our hands.",
        "zh": "我们洗手吧。",
        "choices": [
          "Let us wash our hands.",
          "I would like to wash our hands."
        ],
        "npc": "You can wash our hands. Shall we do it together?",
        "npcZh": "你可以洗手。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：洗手"
      },
      {
        "pick": "Let us dry our hands.",
        "zh": "我们擦干手吧。",
        "choices": [
          "Let us dry our hands.",
          "I would like to dry our hands."
        ],
        "npc": "You can dry our hands. Shall we do it together?",
        "npcZh": "你可以擦干手。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：擦干手"
      }
    ]
  },
  "body-feet": {
    "question": "Would you like to stamp our feet or jump up and down?",
    "zh": "你想先跺脚，还是上下跳？",
    "paths": [
      {
        "pick": "Let us stamp our feet.",
        "zh": "我们跺脚吧。",
        "choices": [
          "Let us stamp our feet.",
          "I would like to stamp our feet."
        ],
        "npc": "You can stamp our feet. Are you ready to start?",
        "npcZh": "你可以跺脚。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：跺脚"
      },
      {
        "pick": "Let us jump up and down.",
        "zh": "我们上下跳吧。",
        "choices": [
          "Let us jump up and down.",
          "I would like to jump up and down."
        ],
        "npc": "You can jump up and down. Are you ready to start?",
        "npcZh": "你可以上下跳。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：上下跳"
      }
    ]
  },
  "color-red": {
    "question": "Would you like to find a red apple or find a red ball?",
    "zh": "你想先找红苹果，还是找红球？",
    "paths": [
      {
        "pick": "Let us find a red apple.",
        "zh": "我们找红苹果吧。",
        "choices": [
          "Let us find a red apple.",
          "I would like to find a red apple."
        ],
        "npc": "You can find a red apple. Would you like some help?",
        "npcZh": "你可以找红苹果。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找红苹果"
      },
      {
        "pick": "Let us find a red ball.",
        "zh": "我们找红球吧。",
        "choices": [
          "Let us find a red ball.",
          "I would like to find a red ball."
        ],
        "npc": "You can find a red ball. Would you like some help?",
        "npcZh": "你可以找红球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找红球"
      }
    ]
  },
  "color-blue": {
    "question": "Would you like to choose a blue pencil or look at the blue sky?",
    "zh": "你想先选蓝铅笔，还是看蓝天？",
    "paths": [
      {
        "pick": "Let us choose a blue pencil.",
        "zh": "我们选蓝铅笔吧。",
        "choices": [
          "Let us choose a blue pencil.",
          "I would like to choose a blue pencil."
        ],
        "npc": "You can choose a blue pencil. Shall we do it together?",
        "npcZh": "你可以选蓝铅笔。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选蓝铅笔"
      },
      {
        "pick": "Let us look at the blue sky.",
        "zh": "我们看蓝天吧。",
        "choices": [
          "Let us look at the blue sky.",
          "I would like to look at the blue sky."
        ],
        "npc": "You can look at the blue sky. Shall we do it together?",
        "npcZh": "你可以看蓝天。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看蓝天"
      }
    ]
  },
  "color-yellow": {
    "question": "Would you like to choose a yellow pencil or draw a yellow sun?",
    "zh": "你想先选黄铅笔，还是画黄色太阳？",
    "paths": [
      {
        "pick": "Let us choose a yellow pencil.",
        "zh": "我们选黄铅笔吧。",
        "choices": [
          "Let us choose a yellow pencil.",
          "I would like to choose a yellow pencil."
        ],
        "npc": "You can choose a yellow pencil. Are you ready to start?",
        "npcZh": "你可以选黄铅笔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选黄铅笔"
      },
      {
        "pick": "Let us draw a yellow sun.",
        "zh": "我们画黄色太阳吧。",
        "choices": [
          "Let us draw a yellow sun.",
          "I would like to draw a yellow sun."
        ],
        "npc": "You can draw a yellow sun. Are you ready to start?",
        "npcZh": "你可以画黄色太阳。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：画黄色太阳"
      }
    ]
  },
  "color-green": {
    "question": "Would you like to look at the green leaves or find a green crayon?",
    "zh": "你想先看绿叶，还是找绿蜡笔？",
    "paths": [
      {
        "pick": "Let us look at the green leaves.",
        "zh": "我们看绿叶吧。",
        "choices": [
          "Let us look at the green leaves.",
          "I would like to look at the green leaves."
        ],
        "npc": "You can look at the green leaves. Would you like some help?",
        "npcZh": "你可以看绿叶。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看绿叶"
      },
      {
        "pick": "Let us find a green crayon.",
        "zh": "我们找绿蜡笔吧。",
        "choices": [
          "Let us find a green crayon.",
          "I would like to find a green crayon."
        ],
        "npc": "You can find a green crayon. Would you like some help?",
        "npcZh": "你可以找绿蜡笔。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找绿蜡笔"
      }
    ]
  },
  "color-purple": {
    "question": "Would you like to use a purple pencil or draw a purple flower?",
    "zh": "你想先用紫铅笔，还是画紫色花朵？",
    "paths": [
      {
        "pick": "Let us use a purple pencil.",
        "zh": "我们用紫铅笔吧。",
        "choices": [
          "Let us use a purple pencil.",
          "I would like to use a purple pencil."
        ],
        "npc": "You can use a purple pencil. Shall we do it together?",
        "npcZh": "你可以用紫铅笔。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用紫铅笔"
      },
      {
        "pick": "Let us draw a purple flower.",
        "zh": "我们画紫色花朵吧。",
        "choices": [
          "Let us draw a purple flower.",
          "I would like to draw a purple flower."
        ],
        "npc": "You can draw a purple flower. Shall we do it together?",
        "npcZh": "你可以画紫色花朵。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画紫色花朵"
      }
    ]
  },
  "fruit-apple": {
    "question": "Would you like to choose a red apple or choose a green apple?",
    "zh": "你想先选红苹果，还是选绿苹果？",
    "paths": [
      {
        "pick": "Let us choose a red apple.",
        "zh": "我们选红苹果吧。",
        "choices": [
          "Let us choose a red apple.",
          "I would like to choose a red apple."
        ],
        "npc": "You can choose a red apple. Are you ready to start?",
        "npcZh": "你可以选红苹果。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选红苹果"
      },
      {
        "pick": "Let us choose a green apple.",
        "zh": "我们选绿苹果吧。",
        "choices": [
          "Let us choose a green apple.",
          "I would like to choose a green apple."
        ],
        "npc": "You can choose a green apple. Are you ready to start?",
        "npcZh": "你可以选绿苹果。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选绿苹果"
      }
    ]
  },
  "fruit-banana": {
    "question": "Would you like to peel the banana or share the banana?",
    "zh": "你想先剥香蕉，还是分享香蕉？",
    "paths": [
      {
        "pick": "Let us peel the banana.",
        "zh": "我们剥香蕉吧。",
        "choices": [
          "Let us peel the banana.",
          "I would like to peel the banana."
        ],
        "npc": "You can peel the banana. Would you like some help?",
        "npcZh": "你可以剥香蕉。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：剥香蕉"
      },
      {
        "pick": "Let us share the banana.",
        "zh": "我们分享香蕉吧。",
        "choices": [
          "Let us share the banana.",
          "I would like to share the banana."
        ],
        "npc": "You can share the banana. Would you like some help?",
        "npcZh": "你可以分享香蕉。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：分享香蕉"
      }
    ]
  },
  "fruit-orange": {
    "question": "Would you like to peel an orange or share an orange?",
    "zh": "你想先剥橙子，还是分享橙子？",
    "paths": [
      {
        "pick": "Let us peel an orange.",
        "zh": "我们剥橙子吧。",
        "choices": [
          "Let us peel an orange.",
          "I would like to peel an orange."
        ],
        "npc": "You can peel an orange. Shall we do it together?",
        "npcZh": "你可以剥橙子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：剥橙子"
      },
      {
        "pick": "Let us share an orange.",
        "zh": "我们分享橙子吧。",
        "choices": [
          "Let us share an orange.",
          "I would like to share an orange."
        ],
        "npc": "You can share an orange. Shall we do it together?",
        "npcZh": "你可以分享橙子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：分享橙子"
      }
    ]
  },
  "fruit-grapes": {
    "question": "Would you like to wash the grapes or put the grapes in a bowl?",
    "zh": "你想先洗葡萄，还是把葡萄放进碗里？",
    "paths": [
      {
        "pick": "Let us wash the grapes.",
        "zh": "我们洗葡萄吧。",
        "choices": [
          "Let us wash the grapes.",
          "I would like to wash the grapes."
        ],
        "npc": "You can wash the grapes. Are you ready to start?",
        "npcZh": "你可以洗葡萄。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：洗葡萄"
      },
      {
        "pick": "Let us put the grapes in a bowl.",
        "zh": "我们把葡萄放进碗里吧。",
        "choices": [
          "Let us put the grapes in a bowl.",
          "I would like to put the grapes in a bowl."
        ],
        "npc": "You can put the grapes in a bowl. Are you ready to start?",
        "npcZh": "你可以把葡萄放进碗里。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：把葡萄放进碗里"
      }
    ]
  },
  "fruit-watermelon": {
    "question": "Would you like to have a small piece of watermelon or share the watermelon?",
    "zh": "你想先吃一小块西瓜，还是分享西瓜？",
    "paths": [
      {
        "pick": "Let us have a small piece of watermelon.",
        "zh": "我们吃一小块西瓜吧。",
        "choices": [
          "Let us have a small piece of watermelon.",
          "I would like to have a small piece of watermelon."
        ],
        "npc": "You can have a small piece of watermelon. Would you like some help?",
        "npcZh": "你可以吃一小块西瓜。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：吃一小块西瓜"
      },
      {
        "pick": "Let us share the watermelon.",
        "zh": "我们分享西瓜吧。",
        "choices": [
          "Let us share the watermelon.",
          "I would like to share the watermelon."
        ],
        "npc": "You can share the watermelon. Would you like some help?",
        "npcZh": "你可以分享西瓜。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：分享西瓜"
      }
    ]
  },
  "veg-carrot": {
    "question": "Would you like to wash the carrot or put the carrot in the basket?",
    "zh": "你想先洗胡萝卜，还是把胡萝卜放进篮子里？",
    "paths": [
      {
        "pick": "Let us wash the carrot.",
        "zh": "我们洗胡萝卜吧。",
        "choices": [
          "Let us wash the carrot.",
          "I would like to wash the carrot."
        ],
        "npc": "You can wash the carrot. Shall we do it together?",
        "npcZh": "你可以洗胡萝卜。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：洗胡萝卜"
      },
      {
        "pick": "Let us put the carrot in the basket.",
        "zh": "我们把胡萝卜放进篮子里吧。",
        "choices": [
          "Let us put the carrot in the basket.",
          "I would like to put the carrot in the basket."
        ],
        "npc": "You can put the carrot in the basket. Shall we do it together?",
        "npcZh": "你可以把胡萝卜放进篮子里。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：把胡萝卜放进篮子里"
      }
    ]
  },
  "veg-tomato": {
    "question": "Would you like to buy two tomatoes or buy three tomatoes?",
    "zh": "你想先买两个番茄，还是买三个番茄？",
    "paths": [
      {
        "pick": "Let us buy two tomatoes.",
        "zh": "我们买两个番茄吧。",
        "choices": [
          "Let us buy two tomatoes.",
          "I would like to buy two tomatoes."
        ],
        "npc": "You can buy two tomatoes. Are you ready to start?",
        "npcZh": "你可以买两个番茄。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买两个番茄"
      },
      {
        "pick": "Let us buy three tomatoes.",
        "zh": "我们买三个番茄吧。",
        "choices": [
          "Let us buy three tomatoes.",
          "I would like to buy three tomatoes."
        ],
        "npc": "You can buy three tomatoes. Are you ready to start?",
        "npcZh": "你可以买三个番茄。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买三个番茄"
      }
    ]
  },
  "veg-potato": {
    "question": "Would you like to wash the potato or put the potato in the bowl?",
    "zh": "你想先洗土豆，还是把土豆放进碗里？",
    "paths": [
      {
        "pick": "Let us wash the potato.",
        "zh": "我们洗土豆吧。",
        "choices": [
          "Let us wash the potato.",
          "I would like to wash the potato."
        ],
        "npc": "You can wash the potato. Would you like some help?",
        "npcZh": "你可以洗土豆。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：洗土豆"
      },
      {
        "pick": "Let us put the potato in the bowl.",
        "zh": "我们把土豆放进碗里吧。",
        "choices": [
          "Let us put the potato in the bowl.",
          "I would like to put the potato in the bowl."
        ],
        "npc": "You can put the potato in the bowl. Would you like some help?",
        "npcZh": "你可以把土豆放进碗里。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：把土豆放进碗里"
      }
    ]
  },
  "veg-cucumber": {
    "question": "Would you like to wash the cucumber or put the cucumber on the plate?",
    "zh": "你想先洗黄瓜，还是把黄瓜放到盘子上？",
    "paths": [
      {
        "pick": "Let us wash the cucumber.",
        "zh": "我们洗黄瓜吧。",
        "choices": [
          "Let us wash the cucumber.",
          "I would like to wash the cucumber."
        ],
        "npc": "You can wash the cucumber. Shall we do it together?",
        "npcZh": "你可以洗黄瓜。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：洗黄瓜"
      },
      {
        "pick": "Let us put the cucumber on the plate.",
        "zh": "我们把黄瓜放到盘子上吧。",
        "choices": [
          "Let us put the cucumber on the plate.",
          "I would like to put the cucumber on the plate."
        ],
        "npc": "You can put the cucumber on the plate. Shall we do it together?",
        "npcZh": "你可以把黄瓜放到盘子上。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：把黄瓜放到盘子上"
      }
    ]
  },
  "veg-broccoli": {
    "question": "Would you like to try a little broccoli or look at the broccoli?",
    "zh": "你想先尝一点西兰花，还是看看西兰花？",
    "paths": [
      {
        "pick": "Let us try a little broccoli.",
        "zh": "我们尝一点西兰花吧。",
        "choices": [
          "Let us try a little broccoli.",
          "I would like to try a little broccoli."
        ],
        "npc": "You can try a little broccoli. Are you ready to start?",
        "npcZh": "你可以尝一点西兰花。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：尝一点西兰花"
      },
      {
        "pick": "Let us look at the broccoli.",
        "zh": "我们看看西兰花吧。",
        "choices": [
          "Let us look at the broccoli.",
          "I would like to look at the broccoli."
        ],
        "npc": "You can look at the broccoli. Are you ready to start?",
        "npcZh": "你可以看看西兰花。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看看西兰花"
      }
    ]
  },
  "pet-cat": {
    "question": "Would you like to watch the cat quietly or draw a cat?",
    "zh": "你想先安静看猫，还是画猫？",
    "paths": [
      {
        "pick": "Let us watch the cat quietly.",
        "zh": "我们安静看猫吧。",
        "choices": [
          "Let us watch the cat quietly.",
          "I would like to watch the cat quietly."
        ],
        "npc": "You can watch the cat quietly. Would you like some help?",
        "npcZh": "你可以安静看猫。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：安静看猫"
      },
      {
        "pick": "Let us draw a cat.",
        "zh": "我们画猫吧。",
        "choices": [
          "Let us draw a cat.",
          "I would like to draw a cat."
        ],
        "npc": "You can draw a cat. Would you like some help?",
        "npcZh": "你可以画猫。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：画猫"
      }
    ]
  },
  "pet-dog": {
    "question": "Would you like to say hello to the dog or ask the owner about the dog?",
    "zh": "你想先向小狗问好，还是问主人小狗的情况？",
    "paths": [
      {
        "pick": "Let us say hello to the dog.",
        "zh": "我们向小狗问好吧。",
        "choices": [
          "Let us say hello to the dog.",
          "I would like to say hello to the dog."
        ],
        "npc": "You can say hello to the dog. Shall we do it together?",
        "npcZh": "你可以向小狗问好。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向小狗问好"
      },
      {
        "pick": "Let us ask the owner about the dog.",
        "zh": "我们问主人小狗的情况吧。",
        "choices": [
          "Let us ask the owner about the dog.",
          "I would like to ask the owner about the dog."
        ],
        "npc": "You can ask the owner about the dog. Shall we do it together?",
        "npcZh": "你可以问主人小狗的情况。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：问主人小狗的情况"
      }
    ]
  },
  "farm-cow": {
    "question": "Would you like to watch the cow or listen to the cow?",
    "zh": "你想先看奶牛，还是听奶牛的声音？",
    "paths": [
      {
        "pick": "Let us watch the cow.",
        "zh": "我们看奶牛吧。",
        "choices": [
          "Let us watch the cow.",
          "I would like to watch the cow."
        ],
        "npc": "You can watch the cow. Are you ready to start?",
        "npcZh": "你可以看奶牛。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看奶牛"
      },
      {
        "pick": "Let us listen to the cow.",
        "zh": "我们听奶牛的声音吧。",
        "choices": [
          "Let us listen to the cow.",
          "I would like to listen to the cow."
        ],
        "npc": "You can listen to the cow. Are you ready to start?",
        "npcZh": "你可以听奶牛的声音。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：听奶牛的声音"
      }
    ]
  },
  "farm-duck": {
    "question": "Would you like to watch the duck swim or count the ducks?",
    "zh": "你想先看鸭子游泳，还是数鸭子？",
    "paths": [
      {
        "pick": "Let us watch the duck swim.",
        "zh": "我们看鸭子游泳吧。",
        "choices": [
          "Let us watch the duck swim.",
          "I would like to watch the duck swim."
        ],
        "npc": "You can watch the duck swim. Would you like some help?",
        "npcZh": "你可以看鸭子游泳。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看鸭子游泳"
      },
      {
        "pick": "Let us count the ducks.",
        "zh": "我们数鸭子吧。",
        "choices": [
          "Let us count the ducks.",
          "I would like to count the ducks."
        ],
        "npc": "You can count the ducks. Would you like some help?",
        "npcZh": "你可以数鸭子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：数鸭子"
      }
    ]
  },
  "pet-rabbit": {
    "question": "Would you like to ask the keeper about the rabbit or watch the rabbit eat?",
    "zh": "你想先向饲养员了解兔子，还是看兔子吃东西？",
    "paths": [
      {
        "pick": "Let us ask the keeper about the rabbit.",
        "zh": "我们向饲养员了解兔子吧。",
        "choices": [
          "Let us ask the keeper about the rabbit.",
          "I would like to ask the keeper about the rabbit."
        ],
        "npc": "You can ask the keeper about the rabbit. Shall we do it together?",
        "npcZh": "你可以向饲养员了解兔子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向饲养员了解兔子"
      },
      {
        "pick": "Let us watch the rabbit eat.",
        "zh": "我们看兔子吃东西吧。",
        "choices": [
          "Let us watch the rabbit eat.",
          "I would like to watch the rabbit eat."
        ],
        "npc": "You can watch the rabbit eat. Shall we do it together?",
        "npcZh": "你可以看兔子吃东西。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看兔子吃东西"
      }
    ]
  },
  "fruit-market-1": {
    "question": "Would you like to choose a small melon or choose a big melon?",
    "zh": "你想先选小甜瓜，还是选大甜瓜？",
    "paths": [
      {
        "pick": "Let us choose a small melon.",
        "zh": "我们选小甜瓜吧。",
        "choices": [
          "Let us choose a small melon.",
          "I would like to choose a small melon."
        ],
        "npc": "You can choose a small melon. Are you ready to start?",
        "npcZh": "你可以选小甜瓜。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选小甜瓜"
      },
      {
        "pick": "Let us choose a big melon.",
        "zh": "我们选大甜瓜吧。",
        "choices": [
          "Let us choose a big melon.",
          "I would like to choose a big melon."
        ],
        "npc": "You can choose a big melon. Are you ready to start?",
        "npcZh": "你可以选大甜瓜。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选大甜瓜"
      }
    ]
  },
  "fruit-market-2": {
    "question": "Would you like to buy some blueberries or buy some grapes?",
    "zh": "你想先买些蓝莓，还是买些葡萄？",
    "paths": [
      {
        "pick": "Let us buy some blueberries.",
        "zh": "我们买些蓝莓吧。",
        "choices": [
          "Let us buy some blueberries.",
          "I would like to buy some blueberries."
        ],
        "npc": "You can buy some blueberries. Would you like some help?",
        "npcZh": "你可以买些蓝莓。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买些蓝莓"
      },
      {
        "pick": "Let us buy some grapes.",
        "zh": "我们买些葡萄吧。",
        "choices": [
          "Let us buy some grapes.",
          "I would like to buy some grapes."
        ],
        "npc": "You can buy some grapes. Would you like some help?",
        "npcZh": "你可以买些葡萄。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买些葡萄"
      }
    ]
  },
  "fruit-market-3": {
    "question": "Would you like to choose a ripe avocado or ask about the avocado?",
    "zh": "你想先选熟牛油果，还是问问牛油果的情况？",
    "paths": [
      {
        "pick": "Let us choose a ripe avocado.",
        "zh": "我们选熟牛油果吧。",
        "choices": [
          "Let us choose a ripe avocado.",
          "I would like to choose a ripe avocado."
        ],
        "npc": "You can choose a ripe avocado. Shall we do it together?",
        "npcZh": "你可以选熟牛油果。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选熟牛油果"
      },
      {
        "pick": "Let us ask about the avocado.",
        "zh": "我们问问牛油果的情况吧。",
        "choices": [
          "Let us ask about the avocado.",
          "I would like to ask about the avocado."
        ],
        "npc": "You can ask about the avocado. Shall we do it together?",
        "npcZh": "你可以问问牛油果的情况。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：问问牛油果的情况"
      }
    ]
  },
  "fruit-market-4": {
    "question": "Would you like to buy two plums or buy four plums?",
    "zh": "你想先买两个李子，还是买四个李子？",
    "paths": [
      {
        "pick": "Let us buy two plums.",
        "zh": "我们买两个李子吧。",
        "choices": [
          "Let us buy two plums.",
          "I would like to buy two plums."
        ],
        "npc": "You can buy two plums. Are you ready to start?",
        "npcZh": "你可以买两个李子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买两个李子"
      },
      {
        "pick": "Let us buy four plums.",
        "zh": "我们买四个李子吧。",
        "choices": [
          "Let us buy four plums.",
          "I would like to buy four plums."
        ],
        "npc": "You can buy four plums. Are you ready to start?",
        "npcZh": "你可以买四个李子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买四个李子"
      }
    ]
  },
  "fruit-market-5": {
    "question": "Would you like to choose a lime or choose a lemon?",
    "zh": "你想先选青柠，还是选柠檬？",
    "paths": [
      {
        "pick": "Let us choose a lime.",
        "zh": "我们选青柠吧。",
        "choices": [
          "Let us choose a lime.",
          "I would like to choose a lime."
        ],
        "npc": "You can choose a lime. Would you like some help?",
        "npcZh": "你可以选青柠。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：选青柠"
      },
      {
        "pick": "Let us choose a lemon.",
        "zh": "我们选柠檬吧。",
        "choices": [
          "Let us choose a lemon.",
          "I would like to choose a lemon."
        ],
        "npc": "You can choose a lemon. Would you like some help?",
        "npcZh": "你可以选柠檬。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：选柠檬"
      }
    ]
  },
  "school-hello": {
    "question": "Would you like to play?",
    "zh": "你想一起玩吗？",
    "paths": [
      {
        "pick": "Yes, please.",
        "zh": "好的，谢谢。",
        "npc": "Let us play together!",
        "npcZh": "我们一起玩吧！",
        "end": "Have fun!",
        "endZh": "玩得开心！",
        "result": "和朋友约好一起玩",
        "choices": [
          "Yes, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "No, thank you.",
        "zh": "不了，谢谢。",
        "npc": "Would you like to read?",
        "npcZh": "你想读书吗？",
        "end": "Enjoy your book!",
        "endZh": "好好享受阅读吧！",
        "result": "选择了安静读书",
        "choices": [
          "No, thank you."
        ],
        "answer": "Yes, please.",
        "answerZh": "好的，谢谢。",
        "answers": [
          "Yes, please.",
          "Yes, thank you."
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "school-pencil": {
    "question": "Would you like to borrow a pencil or ask the teacher for a pencil?",
    "zh": "你想先借铅笔，还是向老师要铅笔？",
    "paths": [
      {
        "pick": "Let us borrow a pencil.",
        "zh": "我们借铅笔吧。",
        "choices": [
          "Let us borrow a pencil.",
          "I would like to borrow a pencil."
        ],
        "npc": "You can borrow a pencil. Are you ready to start?",
        "npcZh": "你可以借铅笔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：借铅笔"
      },
      {
        "pick": "Let us ask the teacher for a pencil.",
        "zh": "我们向老师要铅笔吧。",
        "choices": [
          "Let us ask the teacher for a pencil.",
          "I would like to ask the teacher for a pencil."
        ],
        "npc": "You can ask the teacher for a pencil. Are you ready to start?",
        "npcZh": "你可以向老师要铅笔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向老师要铅笔"
      }
    ]
  },
  "school-help": {
    "question": "Would you like to ask the teacher for help or ask a classmate for help?",
    "zh": "你想先向老师求助，还是向同学求助？",
    "paths": [
      {
        "pick": "Let us ask the teacher for help.",
        "zh": "我们向老师求助吧。",
        "choices": [
          "Let us ask the teacher for help.",
          "I would like to ask the teacher for help."
        ],
        "npc": "You can ask the teacher for help. Would you like some help?",
        "npcZh": "你可以向老师求助。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向老师求助"
      },
      {
        "pick": "Let us ask a classmate for help.",
        "zh": "我们向同学求助吧。",
        "choices": [
          "Let us ask a classmate for help.",
          "I would like to ask a classmate for help."
        ],
        "npc": "You can ask a classmate for help. Would you like some help?",
        "npcZh": "你可以向同学求助。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向同学求助"
      }
    ]
  },
  "school-water": {
    "question": "Would you like to drink some water or fill the water bottle?",
    "zh": "你想先喝些水，还是装满水瓶？",
    "paths": [
      {
        "pick": "Let us drink some water.",
        "zh": "我们喝些水吧。",
        "choices": [
          "Let us drink some water.",
          "I would like to drink some water."
        ],
        "npc": "You can drink some water. Shall we do it together?",
        "npcZh": "你可以喝些水。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：喝些水"
      },
      {
        "pick": "Let us fill the water bottle.",
        "zh": "我们装满水瓶吧。",
        "choices": [
          "Let us fill the water bottle.",
          "I would like to fill the water bottle."
        ],
        "npc": "You can fill the water bottle. Shall we do it together?",
        "npcZh": "你可以装满水瓶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：装满水瓶"
      }
    ]
  },
  "school-share": {
    "question": "Would you like to read the book together or take turns reading?",
    "zh": "你想先一起读书，还是轮流读书？",
    "paths": [
      {
        "pick": "Let us read the book together.",
        "zh": "我们一起读书吧。",
        "choices": [
          "Let us read the book together.",
          "I would like to read the book together."
        ],
        "npc": "You can read the book together. Are you ready to start?",
        "npcZh": "你可以一起读书。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：一起读书"
      },
      {
        "pick": "Let us take turns reading.",
        "zh": "我们轮流读书吧。",
        "choices": [
          "Let us take turns reading.",
          "I would like to take turns reading."
        ],
        "npc": "You can take turns reading. Are you ready to start?",
        "npcZh": "你可以轮流读书。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：轮流读书"
      }
    ]
  },
  "library-find": {
    "question": "Would you like to look for an animal book or look for a picture book?",
    "zh": "你想先找动物书，还是找图画书？",
    "paths": [
      {
        "pick": "Let us look for an animal book.",
        "zh": "我们找动物书吧。",
        "choices": [
          "Let us look for an animal book.",
          "I would like to look for an animal book."
        ],
        "npc": "You can look for an animal book. Would you like some help?",
        "npcZh": "你可以找动物书。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找动物书"
      },
      {
        "pick": "Let us look for a picture book.",
        "zh": "我们找图画书吧。",
        "choices": [
          "Let us look for a picture book.",
          "I would like to look for a picture book."
        ],
        "npc": "You can look for a picture book. Would you like some help?",
        "npcZh": "你可以找图画书。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找图画书"
      }
    ]
  },
  "library-borrow": {
    "question": "Would you like to borrow one book or borrow two books?",
    "zh": "你想先借一本书，还是借两本书？",
    "paths": [
      {
        "pick": "Let us borrow one book.",
        "zh": "我们借一本书吧。",
        "choices": [
          "Let us borrow one book.",
          "I would like to borrow one book."
        ],
        "npc": "You can borrow one book. Shall we do it together?",
        "npcZh": "你可以借一本书。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：借一本书"
      },
      {
        "pick": "Let us borrow two books.",
        "zh": "我们借两本书吧。",
        "choices": [
          "Let us borrow two books.",
          "I would like to borrow two books."
        ],
        "npc": "You can borrow two books. Shall we do it together?",
        "npcZh": "你可以借两本书。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：借两本书"
      }
    ]
  },
  "library-quiet": {
    "question": "Would you like to use a quiet voice or read silently?",
    "zh": "你想先小声说话，还是默读？",
    "paths": [
      {
        "pick": "Let us use a quiet voice.",
        "zh": "我们小声说话吧。",
        "choices": [
          "Let us use a quiet voice.",
          "I would like to use a quiet voice."
        ],
        "npc": "You can use a quiet voice. Are you ready to start?",
        "npcZh": "你可以小声说话。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：小声说话"
      },
      {
        "pick": "Let us read silently.",
        "zh": "我们默读吧。",
        "choices": [
          "Let us read silently.",
          "I would like to read silently."
        ],
        "npc": "You can read silently. Are you ready to start?",
        "npcZh": "你可以默读。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：默读"
      }
    ]
  },
  "library-read": {
    "question": "Would you like to read about animals or read about colors?",
    "zh": "你想先读动物故事，还是读颜色故事？",
    "paths": [
      {
        "pick": "Let us read about animals.",
        "zh": "我们读动物故事吧。",
        "choices": [
          "Let us read about animals.",
          "I would like to read about animals."
        ],
        "npc": "You can read about animals. Would you like some help?",
        "npcZh": "你可以读动物故事。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：读动物故事"
      },
      {
        "pick": "Let us read about colors.",
        "zh": "我们读颜色故事吧。",
        "choices": [
          "Let us read about colors.",
          "I would like to read about colors."
        ],
        "npc": "You can read about colors. Would you like some help?",
        "npcZh": "你可以读颜色故事。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：读颜色故事"
      }
    ]
  },
  "library-return": {
    "question": "Would you like to return the book or ask to keep the book longer?",
    "zh": "你想先还书，还是申请延长借书时间？",
    "paths": [
      {
        "pick": "Let us return the book.",
        "zh": "我们还书吧。",
        "choices": [
          "Let us return the book.",
          "I would like to return the book."
        ],
        "npc": "You can return the book. Shall we do it together?",
        "npcZh": "你可以还书。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：还书"
      },
      {
        "pick": "Let us ask to keep the book longer.",
        "zh": "我们申请延长借书时间吧。",
        "choices": [
          "Let us ask to keep the book longer.",
          "I would like to ask to keep the book longer."
        ],
        "npc": "You can ask to keep the book longer. Shall we do it together?",
        "npcZh": "你可以申请延长借书时间。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：申请延长借书时间"
      }
    ]
  },
  "sport-soccer": {
    "question": "Would you like to play soccer or practice kicking the ball?",
    "zh": "你想先踢足球，还是练习踢球？",
    "paths": [
      {
        "pick": "Let us play soccer.",
        "zh": "我们踢足球吧。",
        "choices": [
          "Let us play soccer.",
          "I would like to play soccer."
        ],
        "npc": "You can play soccer. Are you ready to start?",
        "npcZh": "你可以踢足球。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：踢足球"
      },
      {
        "pick": "Let us practice kicking the ball.",
        "zh": "我们练习踢球吧。",
        "choices": [
          "Let us practice kicking the ball.",
          "I would like to practice kicking the ball."
        ],
        "npc": "You can practice kicking the ball. Are you ready to start?",
        "npcZh": "你可以练习踢球。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：练习踢球"
      }
    ]
  },
  "sport-basketball": {
    "question": "Would you like to share the basketball or take turns shooting?",
    "zh": "你想先分享篮球，还是轮流投篮？",
    "paths": [
      {
        "pick": "Let us share the basketball.",
        "zh": "我们分享篮球吧。",
        "choices": [
          "Let us share the basketball.",
          "I would like to share the basketball."
        ],
        "npc": "You can share the basketball. Would you like some help?",
        "npcZh": "你可以分享篮球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：分享篮球"
      },
      {
        "pick": "Let us take turns shooting.",
        "zh": "我们轮流投篮吧。",
        "choices": [
          "Let us take turns shooting.",
          "I would like to take turns shooting."
        ],
        "npc": "You can take turns shooting. Would you like some help?",
        "npcZh": "你可以轮流投篮。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：轮流投篮"
      }
    ]
  },
  "sport-tennis": {
    "question": "Would you like to practice catching the ball or practice throwing the ball?",
    "zh": "你想先练习接球，还是练习抛球？",
    "paths": [
      {
        "pick": "Let us practice catching the ball.",
        "zh": "我们练习接球吧。",
        "choices": [
          "Let us practice catching the ball.",
          "I would like to practice catching the ball."
        ],
        "npc": "You can practice catching the ball. Shall we do it together?",
        "npcZh": "你可以练习接球。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：练习接球"
      },
      {
        "pick": "Let us practice throwing the ball.",
        "zh": "我们练习抛球吧。",
        "choices": [
          "Let us practice throwing the ball.",
          "I would like to practice throwing the ball."
        ],
        "npc": "You can practice throwing the ball. Shall we do it together?",
        "npcZh": "你可以练习抛球。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：练习抛球"
      }
    ]
  },
  "sport-badminton": {
    "question": "Would you like to play badminton or practice holding the racket?",
    "zh": "你想先打羽毛球，还是练习握拍？",
    "paths": [
      {
        "pick": "Let us play badminton.",
        "zh": "我们打羽毛球吧。",
        "choices": [
          "Let us play badminton.",
          "I would like to play badminton."
        ],
        "npc": "You can play badminton. Are you ready to start?",
        "npcZh": "你可以打羽毛球。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：打羽毛球"
      },
      {
        "pick": "Let us practice holding the racket.",
        "zh": "我们练习握拍吧。",
        "choices": [
          "Let us practice holding the racket.",
          "I would like to practice holding the racket."
        ],
        "npc": "You can practice holding the racket. Are you ready to start?",
        "npcZh": "你可以练习握拍。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：练习握拍"
      }
    ]
  },
  "sport-swimming": {
    "question": "Would you like to find our goggles or warm up before swimming?",
    "zh": "你想先找泳镜，还是游泳前热身？",
    "paths": [
      {
        "pick": "Let us find our goggles.",
        "zh": "我们找泳镜吧。",
        "choices": [
          "Let us find our goggles.",
          "I would like to find our goggles."
        ],
        "npc": "You can find our goggles. Would you like some help?",
        "npcZh": "你可以找泳镜。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找泳镜"
      },
      {
        "pick": "Let us warm up before swimming.",
        "zh": "我们游泳前热身吧。",
        "choices": [
          "Let us warm up before swimming.",
          "I would like to warm up before swimming."
        ],
        "npc": "You can warm up before swimming. Would you like some help?",
        "npcZh": "你可以游泳前热身。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：游泳前热身"
      }
    ]
  },
  "clinic-hello": {
    "question": "Would you like to say hello to the doctor or tell the doctor your name?",
    "zh": "你想先向医生问好，还是告诉医生名字？",
    "paths": [
      {
        "pick": "Let us say hello to the doctor.",
        "zh": "我们向医生问好吧。",
        "choices": [
          "Let us say hello to the doctor.",
          "I would like to say hello to the doctor."
        ],
        "npc": "You can say hello to the doctor. Shall we do it together?",
        "npcZh": "你可以向医生问好。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向医生问好"
      },
      {
        "pick": "Let us tell the doctor my name.",
        "zh": "我们告诉医生名字吧。",
        "choices": [
          "Let us tell the doctor my name.",
          "I would like to tell the doctor my name."
        ],
        "npc": "You can tell the doctor your name. Shall we do it together?",
        "npcZh": "你可以告诉医生名字。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：告诉医生名字"
      }
    ]
  },
  "clinic-tummy": {
    "question": "Would you like to tell the doctor about your tummy or ask your parent to help explain?",
    "zh": "你想先告诉医生肚子不舒服，还是请家长帮助说明情况？",
    "paths": [
      {
        "pick": "Let us tell the doctor about my tummy.",
        "zh": "我们告诉医生肚子不舒服吧。",
        "choices": [
          "Let us tell the doctor about my tummy.",
          "I would like to tell the doctor about my tummy."
        ],
        "npc": "You can tell the doctor about your tummy. Are you ready to start?",
        "npcZh": "你可以告诉医生肚子不舒服。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：告诉医生肚子不舒服"
      },
      {
        "pick": "Let us ask my parent to help explain.",
        "zh": "我们请家长帮助说明情况吧。",
        "choices": [
          "Let us ask my parent to help explain.",
          "I would like to ask my parent to help explain."
        ],
        "npc": "You can ask your parent to help explain. Are you ready to start?",
        "npcZh": "你可以请家长帮助说明情况。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请家长帮助说明情况"
      }
    ]
  },
  "clinic-head": {
    "question": "Would you like to tell the doctor about your headache or sit down with your parent?",
    "zh": "你想先告诉医生头痛，还是和家长一起坐下？",
    "paths": [
      {
        "pick": "Let us tell the doctor about my headache.",
        "zh": "我们告诉医生头痛吧。",
        "choices": [
          "Let us tell the doctor about my headache.",
          "I would like to tell the doctor about my headache."
        ],
        "npc": "You can tell the doctor about your headache. Would you like some help?",
        "npcZh": "你可以告诉医生头痛。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：告诉医生头痛"
      },
      {
        "pick": "Let us sit down with my parent.",
        "zh": "我们和家长一起坐下吧。",
        "choices": [
          "Let us sit down with my parent.",
          "I would like to sit down with my parent."
        ],
        "npc": "You can sit down with your parent. Would you like some help?",
        "npcZh": "你可以和家长一起坐下。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：和家长一起坐下"
      }
    ]
  },
  "clinic-scared": {
    "question": "Would you like to hold your teddy or hold your parent's hand?",
    "zh": "你想先抱住玩具熊，还是牵住家长的手？",
    "paths": [
      {
        "pick": "Let us hold my teddy.",
        "zh": "我们抱住玩具熊吧。",
        "choices": [
          "Let us hold my teddy.",
          "I would like to hold my teddy."
        ],
        "npc": "You can hold your teddy. Shall we do it together?",
        "npcZh": "你可以抱住玩具熊。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：抱住玩具熊"
      },
      {
        "pick": "Let us hold my parent's hand.",
        "zh": "我们牵住家长的手吧。",
        "choices": [
          "Let us hold my parent's hand.",
          "I would like to hold my parent's hand."
        ],
        "npc": "You can hold your parent's hand. Shall we do it together?",
        "npcZh": "你可以牵住家长的手。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：牵住家长的手"
      }
    ]
  },
  "clinic-thanks": {
    "question": "Would you like to thank the doctor or say goodbye to the nurse?",
    "zh": "你想先感谢医生，还是向护士道别？",
    "paths": [
      {
        "pick": "Let us thank the doctor.",
        "zh": "我们感谢医生吧。",
        "choices": [
          "Let us thank the doctor.",
          "I would like to thank the doctor."
        ],
        "npc": "You can thank the doctor. Are you ready to start?",
        "npcZh": "你可以感谢医生。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：感谢医生"
      },
      {
        "pick": "Let us say goodbye to the nurse.",
        "zh": "我们向护士道别吧。",
        "choices": [
          "Let us say goodbye to the nurse.",
          "I would like to say goodbye to the nurse."
        ],
        "npc": "You can say goodbye to the nurse. Are you ready to start?",
        "npcZh": "你可以向护士道别。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向护士道别"
      }
    ]
  },
  "post-card": {
    "question": "Would you like to send Grandma a postcard or send Grandpa a postcard?",
    "zh": "你想先给奶奶寄明信片，还是给爷爷寄明信片？",
    "paths": [
      {
        "pick": "Let us send Grandma a postcard.",
        "zh": "我们给奶奶寄明信片吧。",
        "choices": [
          "Let us send Grandma a postcard.",
          "I would like to send Grandma a postcard."
        ],
        "npc": "You can send Grandma a postcard. Would you like some help?",
        "npcZh": "你可以给奶奶寄明信片。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：给奶奶寄明信片"
      },
      {
        "pick": "Let us send Grandpa a postcard.",
        "zh": "我们给爷爷寄明信片吧。",
        "choices": [
          "Let us send Grandpa a postcard.",
          "I would like to send Grandpa a postcard."
        ],
        "npc": "You can send Grandpa a postcard. Would you like some help?",
        "npcZh": "你可以给爷爷寄明信片。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：给爷爷寄明信片"
      }
    ]
  },
  "post-stamp": {
    "question": "Would you like to buy one stamp or buy two stamps?",
    "zh": "你想先买一枚邮票，还是买两枚邮票？",
    "paths": [
      {
        "pick": "Let us buy one stamp.",
        "zh": "我们买一枚邮票吧。",
        "choices": [
          "Let us buy one stamp.",
          "I would like to buy one stamp."
        ],
        "npc": "You can buy one stamp. Shall we do it together?",
        "npcZh": "你可以买一枚邮票。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：买一枚邮票"
      },
      {
        "pick": "Let us buy two stamps.",
        "zh": "我们买两枚邮票吧。",
        "choices": [
          "Let us buy two stamps.",
          "I would like to buy two stamps."
        ],
        "npc": "You can buy two stamps. Shall we do it together?",
        "npcZh": "你可以买两枚邮票。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：买两枚邮票"
      }
    ]
  },
  "post-letter": {
    "question": "Would you like to write to Grandpa or write to Grandma?",
    "zh": "你想先给爷爷写信，还是给奶奶写信？",
    "paths": [
      {
        "pick": "Let us write to Grandpa.",
        "zh": "我们给爷爷写信吧。",
        "choices": [
          "Let us write to Grandpa.",
          "I would like to write to Grandpa."
        ],
        "npc": "You can write to Grandpa. Are you ready to start?",
        "npcZh": "你可以给爷爷写信。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：给爷爷写信"
      },
      {
        "pick": "Let us write to Grandma.",
        "zh": "我们给奶奶写信吧。",
        "choices": [
          "Let us write to Grandma.",
          "I would like to write to Grandma."
        ],
        "npc": "You can write to Grandma. Are you ready to start?",
        "npcZh": "你可以给奶奶写信。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：给奶奶写信"
      }
    ]
  },
  "post-box": {
    "question": "Would you like to look for the mailbox or ask the clerk for directions?",
    "zh": "你想先找邮筒，还是向工作人员问路？",
    "paths": [
      {
        "pick": "Let us look for the mailbox.",
        "zh": "我们找邮筒吧。",
        "choices": [
          "Let us look for the mailbox.",
          "I would like to look for the mailbox."
        ],
        "npc": "You can look for the mailbox. Would you like some help?",
        "npcZh": "你可以找邮筒。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找邮筒"
      },
      {
        "pick": "Let us ask the clerk for directions.",
        "zh": "我们向工作人员问路吧。",
        "choices": [
          "Let us ask the clerk for directions.",
          "I would like to ask the clerk for directions."
        ],
        "npc": "You can ask the clerk for directions. Would you like some help?",
        "npcZh": "你可以向工作人员问路。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向工作人员问路"
      }
    ]
  },
  "post-parcel": {
    "question": "Would you like to collect your parcel or ask for help with the parcel?",
    "zh": "你想先取包裹，还是请人帮忙拿包裹？",
    "paths": [
      {
        "pick": "Let us collect my parcel.",
        "zh": "我们取包裹吧。",
        "choices": [
          "Let us collect my parcel.",
          "I would like to collect my parcel."
        ],
        "npc": "You can collect your parcel. Shall we do it together?",
        "npcZh": "你可以取包裹。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：取包裹"
      },
      {
        "pick": "Let us ask for help with the parcel.",
        "zh": "我们请人帮忙拿包裹吧。",
        "choices": [
          "Let us ask for help with the parcel.",
          "I would like to ask for help with the parcel."
        ],
        "npc": "You can ask for help with the parcel. Shall we do it together?",
        "npcZh": "你可以请人帮忙拿包裹。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：请人帮忙拿包裹"
      }
    ]
  },
  "pet-clinic-1": {
    "question": "Would you like to ask the vet to help the cat or tell the vet about the cat?",
    "zh": "你想先请兽医帮助猫，还是告诉兽医猫的情况？",
    "paths": [
      {
        "pick": "Let us ask the vet to help the cat.",
        "zh": "我们请兽医帮助猫吧。",
        "choices": [
          "Let us ask the vet to help the cat.",
          "I would like to ask the vet to help the cat."
        ],
        "npc": "You can ask the vet to help the cat. Are you ready to start?",
        "npcZh": "你可以请兽医帮助猫。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请兽医帮助猫"
      },
      {
        "pick": "Let us tell the vet about the cat.",
        "zh": "我们告诉兽医猫的情况吧。",
        "choices": [
          "Let us tell the vet about the cat.",
          "I would like to tell the vet about the cat."
        ],
        "npc": "You can tell the vet about the cat. Are you ready to start?",
        "npcZh": "你可以告诉兽医猫的情况。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：告诉兽医猫的情况"
      }
    ]
  },
  "pet-clinic-2": {
    "question": "Would you like to help the dog stay calm or wait with the dog?",
    "zh": "你想先帮助狗保持平静，还是陪狗等候？",
    "paths": [
      {
        "pick": "Let us help the dog stay calm.",
        "zh": "我们帮助狗保持平静吧。",
        "choices": [
          "Let us help the dog stay calm.",
          "I would like to help the dog stay calm."
        ],
        "npc": "You can help the dog stay calm. Would you like some help?",
        "npcZh": "你可以帮助狗保持平静。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：帮助狗保持平静"
      },
      {
        "pick": "Let us wait with the dog.",
        "zh": "我们陪狗等候吧。",
        "choices": [
          "Let us wait with the dog.",
          "I would like to wait with the dog."
        ],
        "npc": "You can wait with the dog. Would you like some help?",
        "npcZh": "你可以陪狗等候。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：陪狗等候"
      }
    ]
  },
  "pet-clinic-3": {
    "question": "Would you like to keep the rabbit quiet or ask the vet for help?",
    "zh": "你想先让兔子安静休息，还是向兽医求助？",
    "paths": [
      {
        "pick": "Let us keep the rabbit quiet.",
        "zh": "我们让兔子安静休息吧。",
        "choices": [
          "Let us keep the rabbit quiet.",
          "I would like to keep the rabbit quiet."
        ],
        "npc": "You can keep the rabbit quiet. Shall we do it together?",
        "npcZh": "你可以让兔子安静休息。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：让兔子安静休息"
      },
      {
        "pick": "Let us ask the vet for help.",
        "zh": "我们向兽医求助吧。",
        "choices": [
          "Let us ask the vet for help.",
          "I would like to ask the vet for help."
        ],
        "npc": "You can ask the vet for help. Shall we do it together?",
        "npcZh": "你可以向兽医求助。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向兽医求助"
      }
    ]
  },
  "pet-clinic-4": {
    "question": "Would you like to fill the pet's water bowl or find a clean water bowl?",
    "zh": "你想先给宠物水碗加水，还是找干净的水碗？",
    "paths": [
      {
        "pick": "Let us fill the pet's water bowl.",
        "zh": "我们给宠物水碗加水吧。",
        "choices": [
          "Let us fill the pet's water bowl.",
          "I would like to fill the pet's water bowl."
        ],
        "npc": "You can fill the pet's water bowl. Are you ready to start?",
        "npcZh": "你可以给宠物水碗加水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：给宠物水碗加水"
      },
      {
        "pick": "Let us find a clean water bowl.",
        "zh": "我们找干净的水碗吧。",
        "choices": [
          "Let us find a clean water bowl.",
          "I would like to find a clean water bowl."
        ],
        "npc": "You can find a clean water bowl. Are you ready to start?",
        "npcZh": "你可以找干净的水碗。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找干净的水碗"
      }
    ]
  },
  "pet-clinic-5": {
    "question": "Would you like to put the kitten in the basket or ask for a soft blanket?",
    "zh": "你想先把小猫放进篮子，还是要一条软毯子？",
    "paths": [
      {
        "pick": "Let us put the kitten in the basket.",
        "zh": "我们把小猫放进篮子吧。",
        "choices": [
          "Let us put the kitten in the basket.",
          "I would like to put the kitten in the basket."
        ],
        "npc": "You can put the kitten in the basket. Would you like some help?",
        "npcZh": "你可以把小猫放进篮子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：把小猫放进篮子"
      },
      {
        "pick": "Let us ask for a soft blanket.",
        "zh": "我们要一条软毯子吧。",
        "choices": [
          "Let us ask for a soft blanket.",
          "I would like to ask for a soft blanket."
        ],
        "npc": "You can ask for a soft blanket. Would you like some help?",
        "npcZh": "你可以要一条软毯子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要一条软毯子"
      }
    ]
  },
  "dentist-place-1": {
    "question": "Would you like to say hello to the dentist or sit with your parent?",
    "zh": "你想先向牙医问好，还是和家长一起坐？",
    "paths": [
      {
        "pick": "Let us say hello to the dentist.",
        "zh": "我们向牙医问好吧。",
        "choices": [
          "Let us say hello to the dentist.",
          "I would like to say hello to the dentist."
        ],
        "npc": "You can say hello to the dentist. Shall we do it together?",
        "npcZh": "你可以向牙医问好。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向牙医问好"
      },
      {
        "pick": "Let us sit with my parent.",
        "zh": "我们和家长一起坐吧。",
        "choices": [
          "Let us sit with my parent.",
          "I would like to sit with my parent."
        ],
        "npc": "You can sit with your parent. Shall we do it together?",
        "npcZh": "你可以和家长一起坐。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：和家长一起坐"
      }
    ]
  },
  "dentist-place-2": {
    "question": "Would you like to open your mouth for the dentist or ask the dentist to explain first?",
    "zh": "你想先张嘴让牙医检查，还是请牙医先讲解？",
    "paths": [
      {
        "pick": "Let us open my mouth for the dentist.",
        "zh": "我们张嘴让牙医检查吧。",
        "choices": [
          "Let us open my mouth for the dentist.",
          "I would like to open my mouth for the dentist."
        ],
        "npc": "You can open your mouth for the dentist. Are you ready to start?",
        "npcZh": "你可以张嘴让牙医检查。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：张嘴让牙医检查"
      },
      {
        "pick": "Let us ask the dentist to explain first.",
        "zh": "我们请牙医先讲解吧。",
        "choices": [
          "Let us ask the dentist to explain first.",
          "I would like to ask the dentist to explain first."
        ],
        "npc": "You can ask the dentist to explain first. Are you ready to start?",
        "npcZh": "你可以请牙医先讲解。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请牙医先讲解"
      }
    ]
  },
  "dentist-place-3": {
    "question": "Would you like to show the dentist your tooth or tell the dentist where it hurts?",
    "zh": "你想先给牙医看牙齿，还是告诉牙医哪里疼？",
    "paths": [
      {
        "pick": "Let us show the dentist my tooth.",
        "zh": "我们给牙医看牙齿吧。",
        "choices": [
          "Let us show the dentist my tooth.",
          "I would like to show the dentist my tooth."
        ],
        "npc": "You can show the dentist your tooth. Would you like some help?",
        "npcZh": "你可以给牙医看牙齿。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：给牙医看牙齿"
      },
      {
        "pick": "Let us tell the dentist where it hurts.",
        "zh": "我们告诉牙医哪里疼吧。",
        "choices": [
          "Let us tell the dentist where it hurts.",
          "I would like to tell the dentist where it hurts."
        ],
        "npc": "You can tell the dentist where it hurts. Would you like some help?",
        "npcZh": "你可以告诉牙医哪里疼。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：告诉牙医哪里疼"
      }
    ]
  },
  "dentist-place-4": {
    "question": "Would you like to choose a soft toothbrush or ask how to brush your teeth?",
    "zh": "你想先选软毛牙刷，还是询问如何刷牙？",
    "paths": [
      {
        "pick": "Let us choose a soft toothbrush.",
        "zh": "我们选软毛牙刷吧。",
        "choices": [
          "Let us choose a soft toothbrush.",
          "I would like to choose a soft toothbrush."
        ],
        "npc": "You can choose a soft toothbrush. Shall we do it together?",
        "npcZh": "你可以选软毛牙刷。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选软毛牙刷"
      },
      {
        "pick": "Let us ask how to brush my teeth.",
        "zh": "我们询问如何刷牙吧。",
        "choices": [
          "Let us ask how to brush my teeth.",
          "I would like to ask how to brush my teeth."
        ],
        "npc": "You can ask how to brush your teeth. Shall we do it together?",
        "npcZh": "你可以询问如何刷牙。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：询问如何刷牙"
      }
    ]
  },
  "dentist-place-5": {
    "question": "Would you like to ask about the toothpaste or ask your parent for help?",
    "zh": "你想先问问牙膏，还是请家长帮助？",
    "paths": [
      {
        "pick": "Let us ask about the toothpaste.",
        "zh": "我们问问牙膏吧。",
        "choices": [
          "Let us ask about the toothpaste.",
          "I would like to ask about the toothpaste."
        ],
        "npc": "You can ask about the toothpaste. Are you ready to start?",
        "npcZh": "你可以问问牙膏。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问问牙膏"
      },
      {
        "pick": "Let us ask my parent for help.",
        "zh": "我们请家长帮助吧。",
        "choices": [
          "Let us ask my parent for help.",
          "I would like to ask my parent for help."
        ],
        "npc": "You can ask your parent for help. Are you ready to start?",
        "npcZh": "你可以请家长帮助。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请家长帮助"
      }
    ]
  },
  "fire-station-place-1": {
    "question": "Would you like to wave to the firefighter or thank the firefighter?",
    "zh": "你想先向消防员挥手，还是感谢消防员？",
    "paths": [
      {
        "pick": "Let us wave to the firefighter.",
        "zh": "我们向消防员挥手吧。",
        "choices": [
          "Let us wave to the firefighter.",
          "I would like to wave to the firefighter."
        ],
        "npc": "You can wave to the firefighter. Would you like some help?",
        "npcZh": "你可以向消防员挥手。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向消防员挥手"
      },
      {
        "pick": "Let us thank the firefighter.",
        "zh": "我们感谢消防员吧。",
        "choices": [
          "Let us thank the firefighter.",
          "I would like to thank the firefighter."
        ],
        "npc": "You can thank the firefighter. Would you like some help?",
        "npcZh": "你可以感谢消防员。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：感谢消防员"
      }
    ]
  },
  "fire-station-place-2": {
    "question": "Would you like to look at the fire truck or ask about the fire truck?",
    "zh": "你想先看消防车，还是询问消防车？",
    "paths": [
      {
        "pick": "Let us look at the fire truck.",
        "zh": "我们看消防车吧。",
        "choices": [
          "Let us look at the fire truck.",
          "I would like to look at the fire truck."
        ],
        "npc": "You can look at the fire truck. Shall we do it together?",
        "npcZh": "你可以看消防车。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看消防车"
      },
      {
        "pick": "Let us ask about the fire truck.",
        "zh": "我们询问消防车吧。",
        "choices": [
          "Let us ask about the fire truck.",
          "I would like to ask about the fire truck."
        ],
        "npc": "You can ask about the fire truck. Shall we do it together?",
        "npcZh": "你可以询问消防车。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：询问消防车"
      }
    ]
  },
  "fire-station-place-3": {
    "question": "Would you like to ask about the helmet or draw a firefighter's helmet?",
    "zh": "你想先询问头盔，还是画消防员头盔？",
    "paths": [
      {
        "pick": "Let us ask about the helmet.",
        "zh": "我们询问头盔吧。",
        "choices": [
          "Let us ask about the helmet.",
          "I would like to ask about the helmet."
        ],
        "npc": "You can ask about the helmet. Are you ready to start?",
        "npcZh": "你可以询问头盔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问头盔"
      },
      {
        "pick": "Let us draw a firefighter's helmet.",
        "zh": "我们画消防员头盔吧。",
        "choices": [
          "Let us draw a firefighter's helmet.",
          "I would like to draw a firefighter's helmet."
        ],
        "npc": "You can draw a firefighter's helmet. Are you ready to start?",
        "npcZh": "你可以画消防员头盔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：画消防员头盔"
      }
    ]
  },
  "fire-station-place-4": {
    "question": "Would you like to ask how the hose works or watch the firefighter demonstrate?",
    "zh": "你想先询问消防水管怎么用，还是看消防员示范？",
    "paths": [
      {
        "pick": "Let us ask how the hose works.",
        "zh": "我们询问消防水管怎么用吧。",
        "choices": [
          "Let us ask how the hose works.",
          "I would like to ask how the hose works."
        ],
        "npc": "You can ask how the hose works. Would you like some help?",
        "npcZh": "你可以询问消防水管怎么用。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：询问消防水管怎么用"
      },
      {
        "pick": "Let us watch the firefighter demonstrate.",
        "zh": "我们看消防员示范吧。",
        "choices": [
          "Let us watch the firefighter demonstrate.",
          "I would like to watch the firefighter demonstrate."
        ],
        "npc": "You can watch the firefighter demonstrate. Would you like some help?",
        "npcZh": "你可以看消防员示范。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看消防员示范"
      }
    ]
  },
  "fire-station-place-5": {
    "question": "Would you like to listen to the safety talk or ask about the fire alarm?",
    "zh": "你想先听安全讲解，还是询问火警警报？",
    "paths": [
      {
        "pick": "Let us listen to the safety talk.",
        "zh": "我们听安全讲解吧。",
        "choices": [
          "Let us listen to the safety talk.",
          "I would like to listen to the safety talk."
        ],
        "npc": "You can listen to the safety talk. Shall we do it together?",
        "npcZh": "你可以听安全讲解。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：听安全讲解"
      },
      {
        "pick": "Let us ask about the fire alarm.",
        "zh": "我们询问火警警报吧。",
        "choices": [
          "Let us ask about the fire alarm.",
          "I would like to ask about the fire alarm."
        ],
        "npc": "You can ask about the fire alarm. Shall we do it together?",
        "npcZh": "你可以询问火警警报。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：询问火警警报"
      }
    ]
  },
  "police-station-place-1": {
    "question": "Would you like to ask the police officer for help or tell the officer your name?",
    "zh": "你想先向警察求助，还是告诉警察名字？",
    "paths": [
      {
        "pick": "Let us ask the police officer for help.",
        "zh": "我们向警察求助吧。",
        "choices": [
          "Let us ask the police officer for help.",
          "I would like to ask the police officer for help."
        ],
        "npc": "You can ask the police officer for help. Are you ready to start?",
        "npcZh": "你可以向警察求助。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向警察求助"
      },
      {
        "pick": "Let us tell the officer my name.",
        "zh": "我们告诉警察名字吧。",
        "choices": [
          "Let us tell the officer my name.",
          "I would like to tell the officer my name."
        ],
        "npc": "You can tell the officer your name. Are you ready to start?",
        "npcZh": "你可以告诉警察名字。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：告诉警察名字"
      }
    ]
  },
  "police-station-place-2": {
    "question": "Would you like to hand in the lost wallet or tell the officer where I found it?",
    "zh": "你想先上交捡到的钱包，还是告诉警察拾到钱包的位置？",
    "paths": [
      {
        "pick": "Let us hand in the lost wallet.",
        "zh": "我们上交捡到的钱包吧。",
        "choices": [
          "Let us hand in the lost wallet.",
          "I would like to hand in the lost wallet."
        ],
        "npc": "You can hand in the lost wallet. Would you like some help?",
        "npcZh": "你可以上交捡到的钱包。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：上交捡到的钱包"
      },
      {
        "pick": "Let us tell the officer where I found it.",
        "zh": "我们告诉警察拾到钱包的位置吧。",
        "choices": [
          "Let us tell the officer where I found it.",
          "I would like to tell the officer where I found it."
        ],
        "npc": "You can tell the officer where I found it. Would you like some help?",
        "npcZh": "你可以告诉警察拾到钱包的位置。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：告诉警察拾到钱包的位置"
      }
    ]
  },
  "police-station-place-3": {
    "question": "Would you like to look for your key or ask the officer about lost keys?",
    "zh": "你想先找钥匙，还是向警察询问遗失钥匙？",
    "paths": [
      {
        "pick": "Let us look for my key.",
        "zh": "我们找钥匙吧。",
        "choices": [
          "Let us look for my key.",
          "I would like to look for my key."
        ],
        "npc": "You can look for your key. Shall we do it together?",
        "npcZh": "你可以找钥匙。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找钥匙"
      },
      {
        "pick": "Let us ask the officer about lost keys.",
        "zh": "我们向警察询问遗失钥匙吧。",
        "choices": [
          "Let us ask the officer about lost keys.",
          "I would like to ask the officer about lost keys."
        ],
        "npc": "You can ask the officer about lost keys. Shall we do it together?",
        "npcZh": "你可以向警察询问遗失钥匙。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向警察询问遗失钥匙"
      }
    ]
  },
  "police-station-place-4": {
    "question": "Would you like to ask for a map or ask the officer for directions?",
    "zh": "你想先要地图，还是向警察问路？",
    "paths": [
      {
        "pick": "Let us ask for a map.",
        "zh": "我们要地图吧。",
        "choices": [
          "Let us ask for a map.",
          "I would like to ask for a map."
        ],
        "npc": "You can ask for a map. Are you ready to start?",
        "npcZh": "你可以要地图。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：要地图"
      },
      {
        "pick": "Let us ask the officer for directions.",
        "zh": "我们向警察问路吧。",
        "choices": [
          "Let us ask the officer for directions.",
          "I would like to ask the officer for directions."
        ],
        "npc": "You can ask the officer for directions. Are you ready to start?",
        "npcZh": "你可以向警察问路。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向警察问路"
      }
    ]
  },
  "police-station-place-5": {
    "question": "Would you like to walk on the sidewalk or wait for your parent?",
    "zh": "你想先走人行道，还是等家长？",
    "paths": [
      {
        "pick": "Let us walk on the sidewalk.",
        "zh": "我们走人行道吧。",
        "choices": [
          "Let us walk on the sidewalk.",
          "I would like to walk on the sidewalk."
        ],
        "npc": "You can walk on the sidewalk. Would you like some help?",
        "npcZh": "你可以走人行道。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：走人行道"
      },
      {
        "pick": "Let us wait for my parent.",
        "zh": "我们等家长吧。",
        "choices": [
          "Let us wait for my parent.",
          "I would like to wait for my parent."
        ],
        "npc": "You can wait for your parent. Would you like some help?",
        "npcZh": "你可以等家长。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：等家长"
      }
    ]
  },
  "science-room-1": {
    "question": "Would you like to watch the snail or draw the snail?",
    "zh": "你想先观察蜗牛，还是画蜗牛？",
    "paths": [
      {
        "pick": "Let us watch the snail.",
        "zh": "我们观察蜗牛吧。",
        "choices": [
          "Let us watch the snail.",
          "I would like to watch the snail."
        ],
        "npc": "You can watch the snail. Shall we do it together?",
        "npcZh": "你可以观察蜗牛。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：观察蜗牛"
      },
      {
        "pick": "Let us draw the snail.",
        "zh": "我们画蜗牛吧。",
        "choices": [
          "Let us draw the snail.",
          "I would like to draw the snail."
        ],
        "npc": "You can draw the snail. Shall we do it together?",
        "npcZh": "你可以画蜗牛。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画蜗牛"
      }
    ]
  },
  "science-room-2": {
    "question": "Would you like to plant a seed or look at a seed?",
    "zh": "你想先种种子，还是观察种子？",
    "paths": [
      {
        "pick": "Let us plant a seed.",
        "zh": "我们种种子吧。",
        "choices": [
          "Let us plant a seed.",
          "I would like to plant a seed."
        ],
        "npc": "You can plant a seed. Are you ready to start?",
        "npcZh": "你可以种种子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：种种子"
      },
      {
        "pick": "Let us look at a seed.",
        "zh": "我们观察种子吧。",
        "choices": [
          "Let us look at a seed.",
          "I would like to look at a seed."
        ],
        "npc": "You can look at a seed. Are you ready to start?",
        "npcZh": "你可以观察种子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：观察种子"
      }
    ]
  },
  "science-room-3": {
    "question": "Would you like to look at the coin or count the coins?",
    "zh": "你想先观察硬币，还是数硬币？",
    "paths": [
      {
        "pick": "Let us look at the coin.",
        "zh": "我们观察硬币吧。",
        "choices": [
          "Let us look at the coin.",
          "I would like to look at the coin."
        ],
        "npc": "You can look at the coin. Would you like some help?",
        "npcZh": "你可以观察硬币。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：观察硬币"
      },
      {
        "pick": "Let us count the coins.",
        "zh": "我们数硬币吧。",
        "choices": [
          "Let us count the coins.",
          "I would like to count the coins."
        ],
        "npc": "You can count the coins. Would you like some help?",
        "npcZh": "你可以数硬币。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：数硬币"
      }
    ]
  },
  "science-room-4": {
    "question": "Would you like to watch the spider from a distance or draw a spider web?",
    "zh": "你想先远远观察蜘蛛，还是画蜘蛛网？",
    "paths": [
      {
        "pick": "Let us watch the spider from a distance.",
        "zh": "我们远远观察蜘蛛吧。",
        "choices": [
          "Let us watch the spider from a distance.",
          "I would like to watch the spider from a distance."
        ],
        "npc": "You can watch the spider from a distance. Shall we do it together?",
        "npcZh": "你可以远远观察蜘蛛。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：远远观察蜘蛛"
      },
      {
        "pick": "Let us draw a spider web.",
        "zh": "我们画蜘蛛网吧。",
        "choices": [
          "Let us draw a spider web.",
          "I would like to draw a spider web."
        ],
        "npc": "You can draw a spider web. Shall we do it together?",
        "npcZh": "你可以画蜘蛛网。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画蜘蛛网"
      }
    ]
  },
  "science-room-5": {
    "question": "Would you like to look at the ring or compare two rings?",
    "zh": "你想先观察圆环，还是比较两个圆环？",
    "paths": [
      {
        "pick": "Let us look at the ring.",
        "zh": "我们观察圆环吧。",
        "choices": [
          "Let us look at the ring.",
          "I would like to look at the ring."
        ],
        "npc": "You can look at the ring. Are you ready to start?",
        "npcZh": "你可以观察圆环。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：观察圆环"
      },
      {
        "pick": "Let us compare two rings.",
        "zh": "我们比较两个圆环吧。",
        "choices": [
          "Let us compare two rings.",
          "I would like to compare two rings."
        ],
        "npc": "You can compare two rings. Are you ready to start?",
        "npcZh": "你可以比较两个圆环。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：比较两个圆环"
      }
    ]
  },
  "music-room-1": {
    "question": "Would you like to play the drum or listen to the drum?",
    "zh": "你想先敲鼓，还是听鼓声？",
    "paths": [
      {
        "pick": "Let us play the drum.",
        "zh": "我们敲鼓吧。",
        "choices": [
          "Let us play the drum.",
          "I would like to play the drum."
        ],
        "npc": "You can play the drum. Would you like some help?",
        "npcZh": "你可以敲鼓。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：敲鼓"
      },
      {
        "pick": "Let us listen to the drum.",
        "zh": "我们听鼓声吧。",
        "choices": [
          "Let us listen to the drum.",
          "I would like to listen to the drum."
        ],
        "npc": "You can listen to the drum. Would you like some help?",
        "npcZh": "你可以听鼓声。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：听鼓声"
      }
    ]
  },
  "music-room-2": {
    "question": "Would you like to ring the bell or listen to the bell?",
    "zh": "你想先摇铃，还是听铃声？",
    "paths": [
      {
        "pick": "Let us ring the bell.",
        "zh": "我们摇铃吧。",
        "choices": [
          "Let us ring the bell.",
          "I would like to ring the bell."
        ],
        "npc": "You can ring the bell. Shall we do it together?",
        "npcZh": "你可以摇铃。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：摇铃"
      },
      {
        "pick": "Let us listen to the bell.",
        "zh": "我们听铃声吧。",
        "choices": [
          "Let us listen to the bell.",
          "I would like to listen to the bell."
        ],
        "npc": "You can listen to the bell. Shall we do it together?",
        "npcZh": "你可以听铃声。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：听铃声"
      }
    ]
  },
  "music-room-3": {
    "question": "Would you like to sing a song or listen to the singer?",
    "zh": "你想先唱歌，还是听歌手唱歌？",
    "paths": [
      {
        "pick": "Let us sing a song.",
        "zh": "我们唱歌吧。",
        "choices": [
          "Let us sing a song.",
          "I would like to sing a song."
        ],
        "npc": "You can sing a song. Are you ready to start?",
        "npcZh": "你可以唱歌。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：唱歌"
      },
      {
        "pick": "Let us listen to the singer.",
        "zh": "我们听歌手唱歌吧。",
        "choices": [
          "Let us listen to the singer.",
          "I would like to listen to the singer."
        ],
        "npc": "You can listen to the singer. Are you ready to start?",
        "npcZh": "你可以听歌手唱歌。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：听歌手唱歌"
      }
    ]
  },
  "music-room-4": {
    "question": "Would you like to clap to the beat or tap to the ticking clock?",
    "zh": "你想先跟着节拍拍手，还是跟着时钟滴答声打拍子？",
    "paths": [
      {
        "pick": "Let us clap to the beat.",
        "zh": "我们跟着节拍拍手吧。",
        "choices": [
          "Let us clap to the beat.",
          "I would like to clap to the beat."
        ],
        "npc": "You can clap to the beat. Would you like some help?",
        "npcZh": "你可以跟着节拍拍手。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：跟着节拍拍手"
      },
      {
        "pick": "Let us tap to the ticking clock.",
        "zh": "我们跟着时钟滴答声打拍子吧。",
        "choices": [
          "Let us tap to the ticking clock.",
          "I would like to tap to the ticking clock."
        ],
        "npc": "You can tap to the ticking clock. Would you like some help?",
        "npcZh": "你可以跟着时钟滴答声打拍子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：跟着时钟滴答声打拍子"
      }
    ]
  },
  "music-room-5": {
    "question": "Would you like to sing about a star or draw a star for our song?",
    "zh": "你想先唱星星歌，还是为歌曲画星星？",
    "paths": [
      {
        "pick": "Let us sing about a star.",
        "zh": "我们唱星星歌吧。",
        "choices": [
          "Let us sing about a star.",
          "I would like to sing about a star."
        ],
        "npc": "You can sing about a star. Shall we do it together?",
        "npcZh": "你可以唱星星歌。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：唱星星歌"
      },
      {
        "pick": "Let us draw a star for our song.",
        "zh": "我们为歌曲画星星吧。",
        "choices": [
          "Let us draw a star for our song.",
          "I would like to draw a star for our song."
        ],
        "npc": "You can draw a star for our song. Shall we do it together?",
        "npcZh": "你可以为歌曲画星星。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：为歌曲画星星"
      }
    ]
  },
  "art-room-1": {
    "question": "Would you like to use a big paintbrush or use a small paintbrush?",
    "zh": "你想先用大画笔，还是用小画笔？",
    "paths": [
      {
        "pick": "Let us use a big paintbrush.",
        "zh": "我们用大画笔吧。",
        "choices": [
          "Let us use a big paintbrush.",
          "I would like to use a big paintbrush."
        ],
        "npc": "You can use a big paintbrush. Are you ready to start?",
        "npcZh": "你可以用大画笔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：用大画笔"
      },
      {
        "pick": "Let us use a small paintbrush.",
        "zh": "我们用小画笔吧。",
        "choices": [
          "Let us use a small paintbrush.",
          "I would like to use a small paintbrush."
        ],
        "npc": "You can use a small paintbrush. Are you ready to start?",
        "npcZh": "你可以用小画笔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：用小画笔"
      }
    ]
  },
  "art-room-2": {
    "question": "Would you like to draw on white paper or draw on blue paper?",
    "zh": "你想先在白纸上画画，还是在蓝纸上画画？",
    "paths": [
      {
        "pick": "Let us draw on white paper.",
        "zh": "我们在白纸上画画吧。",
        "choices": [
          "Let us draw on white paper.",
          "I would like to draw on white paper."
        ],
        "npc": "You can draw on white paper. Would you like some help?",
        "npcZh": "你可以在白纸上画画。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：在白纸上画画"
      },
      {
        "pick": "Let us draw on blue paper.",
        "zh": "我们在蓝纸上画画吧。",
        "choices": [
          "Let us draw on blue paper.",
          "I would like to draw on blue paper."
        ],
        "npc": "You can draw on blue paper. Would you like some help?",
        "npcZh": "你可以在蓝纸上画画。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：在蓝纸上画画"
      }
    ]
  },
  "art-room-3": {
    "question": "Would you like to use a red crayon or use a yellow crayon?",
    "zh": "你想先用红蜡笔，还是用黄蜡笔？",
    "paths": [
      {
        "pick": "Let us use a red crayon.",
        "zh": "我们用红蜡笔吧。",
        "choices": [
          "Let us use a red crayon.",
          "I would like to use a red crayon."
        ],
        "npc": "You can use a red crayon. Shall we do it together?",
        "npcZh": "你可以用红蜡笔。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用红蜡笔"
      },
      {
        "pick": "Let us use a yellow crayon.",
        "zh": "我们用黄蜡笔吧。",
        "choices": [
          "Let us use a yellow crayon.",
          "I would like to use a yellow crayon."
        ],
        "npc": "You can use a yellow crayon. Shall we do it together?",
        "npcZh": "你可以用黄蜡笔。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用黄蜡笔"
      }
    ]
  },
  "art-room-4": {
    "question": "Would you like to put on an apron or find a clean apron?",
    "zh": "你想先穿围裙，还是找干净的围裙？",
    "paths": [
      {
        "pick": "Let us put on an apron.",
        "zh": "我们穿围裙吧。",
        "choices": [
          "Let us put on an apron.",
          "I would like to put on an apron."
        ],
        "npc": "You can put on an apron. Are you ready to start?",
        "npcZh": "你可以穿围裙。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：穿围裙"
      },
      {
        "pick": "Let us find a clean apron.",
        "zh": "我们找干净的围裙吧。",
        "choices": [
          "Let us find a clean apron.",
          "I would like to find a clean apron."
        ],
        "npc": "You can find a clean apron. Are you ready to start?",
        "npcZh": "你可以找干净的围裙。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找干净的围裙"
      }
    ]
  },
  "art-room-5": {
    "question": "Would you like to draw a red flag or draw a blue flag?",
    "zh": "你想先画红旗，还是画蓝旗？",
    "paths": [
      {
        "pick": "Let us draw a red flag.",
        "zh": "我们画红旗吧。",
        "choices": [
          "Let us draw a red flag.",
          "I would like to draw a red flag."
        ],
        "npc": "You can draw a red flag. Would you like some help?",
        "npcZh": "你可以画红旗。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：画红旗"
      },
      {
        "pick": "Let us draw a blue flag.",
        "zh": "我们画蓝旗吧。",
        "choices": [
          "Let us draw a blue flag.",
          "I would like to draw a blue flag."
        ],
        "npc": "You can draw a blue flag. Would you like some help?",
        "npcZh": "你可以画蓝旗。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：画蓝旗"
      }
    ]
  },
  "park": {
    "question": "Would you like to look under the tree or look beside the bench?",
    "zh": "你想先看看树下，还是看看长椅旁？",
    "paths": [
      {
        "pick": "Let us look under the tree.",
        "zh": "我们看看树下吧。",
        "choices": [
          "Let us look under the tree.",
          "I would like to look under the tree."
        ],
        "npc": "You can look under the tree. Shall we do it together?",
        "npcZh": "你可以看看树下。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看看树下"
      },
      {
        "pick": "Let us look beside the bench.",
        "zh": "我们看看长椅旁吧。",
        "choices": [
          "Let us look beside the bench.",
          "I would like to look beside the bench."
        ],
        "npc": "You can look beside the bench. Shall we do it together?",
        "npcZh": "你可以看看长椅旁。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看看长椅旁"
      }
    ]
  },
  "garden": {
    "question": "Would you like to plant a seed or water the plant?",
    "zh": "你想先种种子，还是给植物浇水？",
    "paths": [
      {
        "pick": "Let us plant a seed.",
        "zh": "我们种种子吧。",
        "choices": [
          "Let us plant a seed.",
          "I would like to plant a seed."
        ],
        "npc": "You can plant a seed. Are you ready to start?",
        "npcZh": "你可以种种子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：种种子"
      },
      {
        "pick": "Let us water the plant.",
        "zh": "我们给植物浇水吧。",
        "choices": [
          "Let us water the plant.",
          "I would like to water the plant."
        ],
        "npc": "You can water the plant. Are you ready to start?",
        "npcZh": "你可以给植物浇水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：给植物浇水"
      }
    ]
  },
  "weather": {
    "question": "Would you like to take your umbrella or put on your raincoat?",
    "zh": "你想先带雨伞，还是穿雨衣？",
    "paths": [
      {
        "pick": "Let us take my umbrella.",
        "zh": "我们带雨伞吧。",
        "choices": [
          "Let us take my umbrella.",
          "I would like to take my umbrella."
        ],
        "npc": "You can take your umbrella. Would you like some help?",
        "npcZh": "你可以带雨伞。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：带雨伞"
      },
      {
        "pick": "Let us put on my raincoat.",
        "zh": "我们穿雨衣吧。",
        "choices": [
          "Let us put on my raincoat.",
          "I would like to put on my raincoat."
        ],
        "npc": "You can put on your raincoat. Would you like some help?",
        "npcZh": "你可以穿雨衣。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：穿雨衣"
      }
    ]
  },
  "park-picnic": {
    "question": "Would you like to share the sandwiches or share the apples?",
    "zh": "你想先分享三明治，还是分享苹果？",
    "paths": [
      {
        "pick": "Let us share the sandwiches.",
        "zh": "我们分享三明治吧。",
        "choices": [
          "Let us share the sandwiches.",
          "I would like to share the sandwiches."
        ],
        "npc": "You can share the sandwiches. Shall we do it together?",
        "npcZh": "你可以分享三明治。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：分享三明治"
      },
      {
        "pick": "Let us share the apples.",
        "zh": "我们分享苹果吧。",
        "choices": [
          "Let us share the apples.",
          "I would like to share the apples."
        ],
        "npc": "You can share the apples. Shall we do it together?",
        "npcZh": "你可以分享苹果。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：分享苹果"
      }
    ]
  },
  "park-play": {
    "question": "Would you like to play on the slide or play on the swings?",
    "zh": "你想先玩滑梯，还是荡秋千？",
    "paths": [
      {
        "pick": "Let us play on the slide.",
        "zh": "我们玩滑梯吧。",
        "choices": [
          "Let us play on the slide.",
          "I would like to play on the slide."
        ],
        "npc": "You can play on the slide. Are you ready to start?",
        "npcZh": "你可以玩滑梯。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：玩滑梯"
      },
      {
        "pick": "Let us play on the swings.",
        "zh": "我们荡秋千吧。",
        "choices": [
          "Let us play on the swings.",
          "I would like to play on the swings."
        ],
        "npc": "You can play on the swings. Are you ready to start?",
        "npcZh": "你可以荡秋千。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：荡秋千"
      }
    ]
  },
  "animals": {
    "question": "Would you like to ask the keeper about the food or watch the animals eat?",
    "zh": "你想先向饲养员询问食物，还是看动物吃东西？",
    "paths": [
      {
        "pick": "Let us ask the keeper about the food.",
        "zh": "我们向饲养员询问食物吧。",
        "choices": [
          "Let us ask the keeper about the food.",
          "I would like to ask the keeper about the food."
        ],
        "npc": "You can ask the keeper about the food. Would you like some help?",
        "npcZh": "你可以向饲养员询问食物。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向饲养员询问食物"
      },
      {
        "pick": "Let us watch the animals eat.",
        "zh": "我们看动物吃东西吧。",
        "choices": [
          "Let us watch the animals eat.",
          "I would like to watch the animals eat."
        ],
        "npc": "You can watch the animals eat. Would you like some help?",
        "npcZh": "你可以看动物吃东西。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看动物吃东西"
      }
    ]
  },
  "zoo-panda": {
    "question": "Would you like to watch the panda eat or draw the panda?",
    "zh": "你想先看熊猫进食，还是画熊猫？",
    "paths": [
      {
        "pick": "Let us watch the panda eat.",
        "zh": "我们看熊猫进食吧。",
        "choices": [
          "Let us watch the panda eat.",
          "I would like to watch the panda eat."
        ],
        "npc": "You can watch the panda eat. Shall we do it together?",
        "npcZh": "你可以看熊猫进食。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看熊猫进食"
      },
      {
        "pick": "Let us draw the panda.",
        "zh": "我们画熊猫吧。",
        "choices": [
          "Let us draw the panda.",
          "I would like to draw the panda."
        ],
        "npc": "You can draw the panda. Shall we do it together?",
        "npcZh": "你可以画熊猫。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画熊猫"
      }
    ]
  },
  "zoo-monkey": {
    "question": "Would you like to watch the monkey climb or count the monkeys?",
    "zh": "你想先看猴子爬树，还是数猴子？",
    "paths": [
      {
        "pick": "Let us watch the monkey climb.",
        "zh": "我们看猴子爬树吧。",
        "choices": [
          "Let us watch the monkey climb.",
          "I would like to watch the monkey climb."
        ],
        "npc": "You can watch the monkey climb. Are you ready to start?",
        "npcZh": "你可以看猴子爬树。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看猴子爬树"
      },
      {
        "pick": "Let us count the monkeys.",
        "zh": "我们数猴子吧。",
        "choices": [
          "Let us count the monkeys.",
          "I would like to count the monkeys."
        ],
        "npc": "You can count the monkeys. Are you ready to start?",
        "npcZh": "你可以数猴子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：数猴子"
      }
    ]
  },
  "zoo-giraffe": {
    "question": "Would you like to look at the giraffe's neck or watch the giraffe walk?",
    "zh": "你想先看长颈鹿的脖子，还是看长颈鹿走路？",
    "paths": [
      {
        "pick": "Let us look at the giraffe's neck.",
        "zh": "我们看长颈鹿的脖子吧。",
        "choices": [
          "Let us look at the giraffe's neck.",
          "I would like to look at the giraffe's neck."
        ],
        "npc": "You can look at the giraffe's neck. Would you like some help?",
        "npcZh": "你可以看长颈鹿的脖子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看长颈鹿的脖子"
      },
      {
        "pick": "Let us watch the giraffe walk.",
        "zh": "我们看长颈鹿走路吧。",
        "choices": [
          "Let us watch the giraffe walk.",
          "I would like to watch the giraffe walk."
        ],
        "npc": "You can watch the giraffe walk. Would you like some help?",
        "npcZh": "你可以看长颈鹿走路。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看长颈鹿走路"
      }
    ]
  },
  "zoo-kind": {
    "question": "Would you like to watch from behind the fence or read the animal care sign?",
    "zh": "你想先在围栏后观看，还是阅读爱护动物告示？",
    "paths": [
      {
        "pick": "Let us watch from behind the fence.",
        "zh": "我们在围栏后观看吧。",
        "choices": [
          "Let us watch from behind the fence.",
          "I would like to watch from behind the fence."
        ],
        "npc": "You can watch from behind the fence. Shall we do it together?",
        "npcZh": "你可以在围栏后观看。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：在围栏后观看"
      },
      {
        "pick": "Let us read the animal care sign.",
        "zh": "我们阅读爱护动物告示吧。",
        "choices": [
          "Let us read the animal care sign.",
          "I would like to read the animal care sign."
        ],
        "npc": "You can read the animal care sign. Shall we do it together?",
        "npcZh": "你可以阅读爱护动物告示。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：阅读爱护动物告示"
      }
    ]
  },
  "farm-cow-milk": {
    "question": "Would you like to watch the cow eat grass or ask the farmer about milk?",
    "zh": "你想先看奶牛吃草，还是向农民询问牛奶？",
    "paths": [
      {
        "pick": "Let us watch the cow eat grass.",
        "zh": "我们看奶牛吃草吧。",
        "choices": [
          "Let us watch the cow eat grass.",
          "I would like to watch the cow eat grass."
        ],
        "npc": "You can watch the cow eat grass. Are you ready to start?",
        "npcZh": "你可以看奶牛吃草。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看奶牛吃草"
      },
      {
        "pick": "Let us ask the farmer about milk.",
        "zh": "我们向农民询问牛奶吧。",
        "choices": [
          "Let us ask the farmer about milk.",
          "I would like to ask the farmer about milk."
        ],
        "npc": "You can ask the farmer about milk. Are you ready to start?",
        "npcZh": "你可以向农民询问牛奶。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向农民询问牛奶"
      }
    ]
  },
  "farm-hen": {
    "question": "Would you like to look at the hen or look at the chick?",
    "zh": "你想先看母鸡，还是看小鸡？",
    "paths": [
      {
        "pick": "Let us look at the hen.",
        "zh": "我们看母鸡吧。",
        "choices": [
          "Let us look at the hen.",
          "I would like to look at the hen."
        ],
        "npc": "You can look at the hen. Would you like some help?",
        "npcZh": "你可以看母鸡。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看母鸡"
      },
      {
        "pick": "Let us look at the chick.",
        "zh": "我们看小鸡吧。",
        "choices": [
          "Let us look at the chick.",
          "I would like to look at the chick."
        ],
        "npc": "You can look at the chick. Would you like some help?",
        "npcZh": "你可以看小鸡。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看小鸡"
      }
    ]
  },
  "farm-goat": {
    "question": "Would you like to look beside the tree or ask the farmer about the goat?",
    "zh": "你想先看看树旁，还是向农民询问山羊？",
    "paths": [
      {
        "pick": "Let us look beside the tree.",
        "zh": "我们看看树旁吧。",
        "choices": [
          "Let us look beside the tree.",
          "I would like to look beside the tree."
        ],
        "npc": "You can look beside the tree. Shall we do it together?",
        "npcZh": "你可以看看树旁。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看看树旁"
      },
      {
        "pick": "Let us ask the farmer about the goat.",
        "zh": "我们向农民询问山羊吧。",
        "choices": [
          "Let us ask the farmer about the goat.",
          "I would like to ask the farmer about the goat."
        ],
        "npc": "You can ask the farmer about the goat. Shall we do it together?",
        "npcZh": "你可以向农民询问山羊。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向农民询问山羊"
      }
    ]
  },
  "farm-corn": {
    "question": "Would you like to look at the tall corn or count the corn plants?",
    "zh": "你想先看高高的玉米，还是数玉米植株？",
    "paths": [
      {
        "pick": "Let us look at the tall corn.",
        "zh": "我们看高高的玉米吧。",
        "choices": [
          "Let us look at the tall corn.",
          "I would like to look at the tall corn."
        ],
        "npc": "You can look at the tall corn. Are you ready to start?",
        "npcZh": "你可以看高高的玉米。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看高高的玉米"
      },
      {
        "pick": "Let us count the corn plants.",
        "zh": "我们数玉米植株吧。",
        "choices": [
          "Let us count the corn plants.",
          "I would like to count the corn plants."
        ],
        "npc": "You can count the corn plants. Are you ready to start?",
        "npcZh": "你可以数玉米植株。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：数玉米植株"
      }
    ]
  },
  "farm-bee": {
    "question": "Would you like to watch the bee from a distance or draw the flower?",
    "zh": "你想先远远观察蜜蜂，还是画花？",
    "paths": [
      {
        "pick": "Let us watch the bee from a distance.",
        "zh": "我们远远观察蜜蜂吧。",
        "choices": [
          "Let us watch the bee from a distance.",
          "I would like to watch the bee from a distance."
        ],
        "npc": "You can watch the bee from a distance. Would you like some help?",
        "npcZh": "你可以远远观察蜜蜂。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：远远观察蜜蜂"
      },
      {
        "pick": "Let us draw the flower.",
        "zh": "我们画花吧。",
        "choices": [
          "Let us draw the flower.",
          "I would like to draw the flower."
        ],
        "npc": "You can draw the flower. Would you like some help?",
        "npcZh": "你可以画花。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：画花"
      }
    ]
  },
  "petshop-cat": {
    "question": "Would you like to watch the sleeping cat or walk quietly past the cat?",
    "zh": "你想先看睡觉的猫，还是安静走过猫身旁？",
    "paths": [
      {
        "pick": "Let us watch the sleeping cat.",
        "zh": "我们看睡觉的猫吧。",
        "choices": [
          "Let us watch the sleeping cat.",
          "I would like to watch the sleeping cat."
        ],
        "npc": "You can watch the sleeping cat. Shall we do it together?",
        "npcZh": "你可以看睡觉的猫。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看睡觉的猫"
      },
      {
        "pick": "Let us walk quietly past the cat.",
        "zh": "我们安静走过猫身旁吧。",
        "choices": [
          "Let us walk quietly past the cat.",
          "I would like to walk quietly past the cat."
        ],
        "npc": "You can walk quietly past the cat. Shall we do it together?",
        "npcZh": "你可以安静走过猫身旁。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：安静走过猫身旁"
      }
    ]
  },
  "petshop-dog": {
    "question": "Would you like to ask about the dog or wave to the dog?",
    "zh": "你想先问问小狗的情况，还是向小狗挥手？",
    "paths": [
      {
        "pick": "Let us ask about the dog.",
        "zh": "我们问问小狗的情况吧。",
        "choices": [
          "Let us ask about the dog.",
          "I would like to ask about the dog."
        ],
        "npc": "You can ask about the dog. Are you ready to start?",
        "npcZh": "你可以问问小狗的情况。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问问小狗的情况"
      },
      {
        "pick": "Let us wave to the dog.",
        "zh": "我们向小狗挥手吧。",
        "choices": [
          "Let us wave to the dog.",
          "I would like to wave to the dog."
        ],
        "npc": "You can wave to the dog. Are you ready to start?",
        "npcZh": "你可以向小狗挥手。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向小狗挥手"
      }
    ]
  },
  "petshop-fish": {
    "question": "Would you like to watch the orange fish or count the fish?",
    "zh": "你想先看橙色的鱼，还是数鱼？",
    "paths": [
      {
        "pick": "Let us watch the orange fish.",
        "zh": "我们看橙色的鱼吧。",
        "choices": [
          "Let us watch the orange fish.",
          "I would like to watch the orange fish."
        ],
        "npc": "You can watch the orange fish. Would you like some help?",
        "npcZh": "你可以看橙色的鱼。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看橙色的鱼"
      },
      {
        "pick": "Let us count the fish.",
        "zh": "我们数鱼吧。",
        "choices": [
          "Let us count the fish.",
          "I would like to count the fish."
        ],
        "npc": "You can count the fish. Would you like some help?",
        "npcZh": "你可以数鱼。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：数鱼"
      }
    ]
  },
  "petshop-rabbit": {
    "question": "Would you like to look at the rabbit's ears or watch the rabbit hop?",
    "zh": "你想先看兔子的耳朵，还是看兔子蹦跳？",
    "paths": [
      {
        "pick": "Let us look at the rabbit's ears.",
        "zh": "我们看兔子的耳朵吧。",
        "choices": [
          "Let us look at the rabbit's ears.",
          "I would like to look at the rabbit's ears."
        ],
        "npc": "You can look at the rabbit's ears. Shall we do it together?",
        "npcZh": "你可以看兔子的耳朵。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看兔子的耳朵"
      },
      {
        "pick": "Let us watch the rabbit hop.",
        "zh": "我们看兔子蹦跳吧。",
        "choices": [
          "Let us watch the rabbit hop.",
          "I would like to watch the rabbit hop."
        ],
        "npc": "You can watch the rabbit hop. Shall we do it together?",
        "npcZh": "你可以看兔子蹦跳。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看兔子蹦跳"
      }
    ]
  },
  "petshop-bowl": {
    "question": "Would you like to find a water bowl or find a food bowl?",
    "zh": "你想先找水碗，还是找食碗？",
    "paths": [
      {
        "pick": "Let us find a water bowl.",
        "zh": "我们找水碗吧。",
        "choices": [
          "Let us find a water bowl.",
          "I would like to find a water bowl."
        ],
        "npc": "You can find a water bowl. Are you ready to start?",
        "npcZh": "你可以找水碗。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找水碗"
      },
      {
        "pick": "Let us find a food bowl.",
        "zh": "我们找食碗吧。",
        "choices": [
          "Let us find a food bowl.",
          "I would like to find a food bowl."
        ],
        "npc": "You can find a food bowl. Are you ready to start?",
        "npcZh": "你可以找食碗。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找食碗"
      }
    ]
  },
  "fun-ticket": {
    "question": "Would you like to buy one ticket or buy two tickets?",
    "zh": "你想先买一张票，还是买两张票？",
    "paths": [
      {
        "pick": "Let us buy one ticket.",
        "zh": "我们买一张票吧。",
        "choices": [
          "Let us buy one ticket.",
          "I would like to buy one ticket."
        ],
        "npc": "You can buy one ticket. Would you like some help?",
        "npcZh": "你可以买一张票。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买一张票"
      },
      {
        "pick": "Let us buy two tickets.",
        "zh": "我们买两张票吧。",
        "choices": [
          "Let us buy two tickets.",
          "I would like to buy two tickets."
        ],
        "npc": "You can buy two tickets. Would you like some help?",
        "npcZh": "你可以买两张票。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买两张票"
      }
    ]
  },
  "fun-wheel": {
    "question": "Would you like to ride the big wheel with your parent or watch the big wheel?",
    "zh": "你想先和家长坐摩天轮，还是看摩天轮？",
    "paths": [
      {
        "pick": "Let us ride the big wheel with my parent.",
        "zh": "我们和家长坐摩天轮吧。",
        "choices": [
          "Let us ride the big wheel with my parent.",
          "I would like to ride the big wheel with my parent."
        ],
        "npc": "You can ride the big wheel with your parent. Shall we do it together?",
        "npcZh": "你可以和家长坐摩天轮。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：和家长坐摩天轮"
      },
      {
        "pick": "Let us watch the big wheel.",
        "zh": "我们看摩天轮吧。",
        "choices": [
          "Let us watch the big wheel.",
          "I would like to watch the big wheel."
        ],
        "npc": "You can watch the big wheel. Shall we do it together?",
        "npcZh": "你可以看摩天轮。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看摩天轮"
      }
    ]
  },
  "fun-queue": {
    "question": "Would you like to wait in line or check the waiting time?",
    "zh": "你想先排队等候，还是查看等候时间？",
    "paths": [
      {
        "pick": "Let us wait in line.",
        "zh": "我们排队等候吧。",
        "choices": [
          "Let us wait in line.",
          "I would like to wait in line."
        ],
        "npc": "You can wait in line. Are you ready to start?",
        "npcZh": "你可以排队等候。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：排队等候"
      },
      {
        "pick": "Let us check the waiting time.",
        "zh": "我们查看等候时间吧。",
        "choices": [
          "Let us check the waiting time.",
          "I would like to check the waiting time."
        ],
        "npc": "You can check the waiting time. Are you ready to start?",
        "npcZh": "你可以查看等候时间。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：查看等候时间"
      }
    ]
  },
  "fun-train": {
    "question": "Would you like to ride the little train or wave to the little train?",
    "zh": "你想先坐小火车，还是向小火车挥手？",
    "paths": [
      {
        "pick": "Let us ride the little train.",
        "zh": "我们坐小火车吧。",
        "choices": [
          "Let us ride the little train.",
          "I would like to ride the little train."
        ],
        "npc": "You can ride the little train. Would you like some help?",
        "npcZh": "你可以坐小火车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：坐小火车"
      },
      {
        "pick": "Let us wave to the little train.",
        "zh": "我们向小火车挥手吧。",
        "choices": [
          "Let us wave to the little train.",
          "I would like to wave to the little train."
        ],
        "npc": "You can wave to the little train. Would you like some help?",
        "npcZh": "你可以向小火车挥手。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向小火车挥手"
      }
    ]
  },
  "fun-balloon": {
    "question": "Would you like to choose a red balloon or choose a blue balloon?",
    "zh": "你想先选红气球，还是选蓝气球？",
    "paths": [
      {
        "pick": "Let us choose a red balloon.",
        "zh": "我们选红气球吧。",
        "choices": [
          "Let us choose a red balloon.",
          "I would like to choose a red balloon."
        ],
        "npc": "You can choose a red balloon. Shall we do it together?",
        "npcZh": "你可以选红气球。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选红气球"
      },
      {
        "pick": "Let us choose a blue balloon.",
        "zh": "我们选蓝气球吧。",
        "choices": [
          "Let us choose a blue balloon.",
          "I would like to choose a blue balloon."
        ],
        "npc": "You can choose a blue balloon. Shall we do it together?",
        "npcZh": "你可以选蓝气球。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选蓝气球"
      }
    ]
  },
  "museum-ticket": {
    "question": "Would you like to buy a family ticket or ask about children's tickets?",
    "zh": "你想先买家庭票，还是询问儿童票？",
    "paths": [
      {
        "pick": "Let us buy a family ticket.",
        "zh": "我们买家庭票吧。",
        "choices": [
          "Let us buy a family ticket.",
          "I would like to buy a family ticket."
        ],
        "npc": "You can buy a family ticket. Are you ready to start?",
        "npcZh": "你可以买家庭票。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买家庭票"
      },
      {
        "pick": "Let us ask about children's tickets.",
        "zh": "我们询问儿童票吧。",
        "choices": [
          "Let us ask about children's tickets.",
          "I would like to ask about children's tickets."
        ],
        "npc": "You can ask about children's tickets. Are you ready to start?",
        "npcZh": "你可以询问儿童票。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问儿童票"
      }
    ]
  },
  "museum-dinosaur": {
    "question": "Would you like to look at the big dinosaur or look at the small dinosaur?",
    "zh": "你想先看大恐龙，还是看小恐龙？",
    "paths": [
      {
        "pick": "Let us look at the big dinosaur.",
        "zh": "我们看大恐龙吧。",
        "choices": [
          "Let us look at the big dinosaur.",
          "I would like to look at the big dinosaur."
        ],
        "npc": "You can look at the big dinosaur. Would you like some help?",
        "npcZh": "你可以看大恐龙。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看大恐龙"
      },
      {
        "pick": "Let us look at the small dinosaur.",
        "zh": "我们看小恐龙吧。",
        "choices": [
          "Let us look at the small dinosaur.",
          "I would like to look at the small dinosaur."
        ],
        "npc": "You can look at the small dinosaur. Would you like some help?",
        "npcZh": "你可以看小恐龙。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看小恐龙"
      }
    ]
  },
  "museum-map": {
    "question": "Would you like to find the dinosaur room or find the art room?",
    "zh": "你想先找恐龙展厅，还是找美术展厅？",
    "paths": [
      {
        "pick": "Let us find the dinosaur room.",
        "zh": "我们找恐龙展厅吧。",
        "choices": [
          "Let us find the dinosaur room.",
          "I would like to find the dinosaur room."
        ],
        "npc": "You can find the dinosaur room. Shall we do it together?",
        "npcZh": "你可以找恐龙展厅。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找恐龙展厅"
      },
      {
        "pick": "Let us find the art room.",
        "zh": "我们找美术展厅吧。",
        "choices": [
          "Let us find the art room.",
          "I would like to find the art room."
        ],
        "npc": "You can find the art room. Shall we do it together?",
        "npcZh": "你可以找美术展厅。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找美术展厅"
      }
    ]
  },
  "museum-quiet": {
    "question": "Would you like to walk quietly or read the museum sign?",
    "zh": "你想先安静走路，还是阅读博物馆告示？",
    "paths": [
      {
        "pick": "Let us walk quietly.",
        "zh": "我们安静走路吧。",
        "choices": [
          "Let us walk quietly.",
          "I would like to walk quietly."
        ],
        "npc": "You can walk quietly. Are you ready to start?",
        "npcZh": "你可以安静走路。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：安静走路"
      },
      {
        "pick": "Let us read the museum sign.",
        "zh": "我们阅读博物馆告示吧。",
        "choices": [
          "Let us read the museum sign.",
          "I would like to read the museum sign."
        ],
        "npc": "You can read the museum sign. Are you ready to start?",
        "npcZh": "你可以阅读博物馆告示。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：阅读博物馆告示"
      }
    ]
  },
  "museum-art": {
    "question": "Would you like to look at the tree painting or look at the flower painting?",
    "zh": "你想先看树的画，还是看花的画？",
    "paths": [
      {
        "pick": "Let us look at the tree painting.",
        "zh": "我们看树的画吧。",
        "choices": [
          "Let us look at the tree painting.",
          "I would like to look at the tree painting."
        ],
        "npc": "You can look at the tree painting. Would you like some help?",
        "npcZh": "你可以看树的画。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看树的画"
      },
      {
        "pick": "Let us look at the flower painting.",
        "zh": "我们看花的画吧。",
        "choices": [
          "Let us look at the flower painting.",
          "I would like to look at the flower painting."
        ],
        "npc": "You can look at the flower painting. Would you like some help?",
        "npcZh": "你可以看花的画。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看花的画"
      }
    ]
  },
  "beach-sea": {
    "question": "Would you like to look at the blue sea or listen to the waves?",
    "zh": "你想先看蓝色大海，还是听海浪？",
    "paths": [
      {
        "pick": "Let us look at the blue sea.",
        "zh": "我们看蓝色大海吧。",
        "choices": [
          "Let us look at the blue sea.",
          "I would like to look at the blue sea."
        ],
        "npc": "You can look at the blue sea. Shall we do it together?",
        "npcZh": "你可以看蓝色大海。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看蓝色大海"
      },
      {
        "pick": "Let us listen to the waves.",
        "zh": "我们听海浪吧。",
        "choices": [
          "Let us listen to the waves.",
          "I would like to listen to the waves."
        ],
        "npc": "You can listen to the waves. Shall we do it together?",
        "npcZh": "你可以听海浪。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：听海浪"
      }
    ]
  },
  "beach-sand": {
    "question": "Would you like to build a sandcastle or draw in the sand?",
    "zh": "你想先堆沙堡，还是在沙上画画？",
    "paths": [
      {
        "pick": "Let us build a sandcastle.",
        "zh": "我们堆沙堡吧。",
        "choices": [
          "Let us build a sandcastle.",
          "I would like to build a sandcastle."
        ],
        "npc": "You can build a sandcastle. Are you ready to start?",
        "npcZh": "你可以堆沙堡。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：堆沙堡"
      },
      {
        "pick": "Let us draw in the sand.",
        "zh": "我们在沙上画画吧。",
        "choices": [
          "Let us draw in the sand.",
          "I would like to draw in the sand."
        ],
        "npc": "You can draw in the sand. Are you ready to start?",
        "npcZh": "你可以在沙上画画。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：在沙上画画"
      }
    ]
  },
  "beach-shell": {
    "question": "Would you like to look at the shell or draw the shell?",
    "zh": "你想先看贝壳，还是画贝壳？",
    "paths": [
      {
        "pick": "Let us look at the shell.",
        "zh": "我们看贝壳吧。",
        "choices": [
          "Let us look at the shell.",
          "I would like to look at the shell."
        ],
        "npc": "You can look at the shell. Would you like some help?",
        "npcZh": "你可以看贝壳。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看贝壳"
      },
      {
        "pick": "Let us draw the shell.",
        "zh": "我们画贝壳吧。",
        "choices": [
          "Let us draw the shell.",
          "I would like to draw the shell."
        ],
        "npc": "You can draw the shell. Would you like some help?",
        "npcZh": "你可以画贝壳。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：画贝壳"
      }
    ]
  },
  "beach-bucket": {
    "question": "Would you like to use a blue bucket or use a yellow bucket?",
    "zh": "你想先用蓝桶，还是用黄桶？",
    "paths": [
      {
        "pick": "Let us use a blue bucket.",
        "zh": "我们用蓝桶吧。",
        "choices": [
          "Let us use a blue bucket.",
          "I would like to use a blue bucket."
        ],
        "npc": "You can use a blue bucket. Shall we do it together?",
        "npcZh": "你可以用蓝桶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用蓝桶"
      },
      {
        "pick": "Let us use a yellow bucket.",
        "zh": "我们用黄桶吧。",
        "choices": [
          "Let us use a yellow bucket.",
          "I would like to use a yellow bucket."
        ],
        "npc": "You can use a yellow bucket. Shall we do it together?",
        "npcZh": "你可以用黄桶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用黄桶"
      }
    ]
  },
  "beach-shade": {
    "question": "Would you like to rest in the shade or drink some water?",
    "zh": "你想先在阴凉处休息，还是喝些水？",
    "paths": [
      {
        "pick": "Let us rest in the shade.",
        "zh": "我们在阴凉处休息吧。",
        "choices": [
          "Let us rest in the shade.",
          "I would like to rest in the shade."
        ],
        "npc": "You can rest in the shade. Are you ready to start?",
        "npcZh": "你可以在阴凉处休息。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：在阴凉处休息"
      },
      {
        "pick": "Let us drink some water.",
        "zh": "我们喝些水吧。",
        "choices": [
          "Let us drink some water.",
          "I would like to drink some water."
        ],
        "npc": "You can drink some water. Are you ready to start?",
        "npcZh": "你可以喝些水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：喝些水"
      }
    ]
  },
  "camp-tent": {
    "question": "Would you like to put the tent under the tree or ask your parent where to camp?",
    "zh": "你想先把帐篷搭在树下，还是问家长在哪里露营？",
    "paths": [
      {
        "pick": "Let us put the tent under the tree.",
        "zh": "我们把帐篷搭在树下吧。",
        "choices": [
          "Let us put the tent under the tree.",
          "I would like to put the tent under the tree."
        ],
        "npc": "You can put the tent under the tree. Would you like some help?",
        "npcZh": "你可以把帐篷搭在树下。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：把帐篷搭在树下"
      },
      {
        "pick": "Let us ask my parent where to camp.",
        "zh": "我们问家长在哪里露营吧。",
        "choices": [
          "Let us ask my parent where to camp.",
          "I would like to ask my parent where to camp."
        ],
        "npc": "You can ask your parent where to camp. Would you like some help?",
        "npcZh": "你可以问家长在哪里露营。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：问家长在哪里露营"
      }
    ]
  },
  "camp-water": {
    "question": "Would you like to fill your water bottle or ask for some water?",
    "zh": "你想先装满水瓶，还是要些水？",
    "paths": [
      {
        "pick": "Let us fill my water bottle.",
        "zh": "我们装满水瓶吧。",
        "choices": [
          "Let us fill my water bottle.",
          "I would like to fill my water bottle."
        ],
        "npc": "You can fill your water bottle. Shall we do it together?",
        "npcZh": "你可以装满水瓶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：装满水瓶"
      },
      {
        "pick": "Let us ask for some water.",
        "zh": "我们要些水吧。",
        "choices": [
          "Let us ask for some water.",
          "I would like to ask for some water."
        ],
        "npc": "You can ask for some water. Shall we do it together?",
        "npcZh": "你可以要些水。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：要些水"
      }
    ]
  },
  "camp-stars": {
    "question": "Would you like to look at the stars or look at the moon?",
    "zh": "你想先看星星，还是看月亮？",
    "paths": [
      {
        "pick": "Let us look at the stars.",
        "zh": "我们看星星吧。",
        "choices": [
          "Let us look at the stars.",
          "I would like to look at the stars."
        ],
        "npc": "You can look at the stars. Are you ready to start?",
        "npcZh": "你可以看星星。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看星星"
      },
      {
        "pick": "Let us look at the moon.",
        "zh": "我们看月亮吧。",
        "choices": [
          "Let us look at the moon.",
          "I would like to look at the moon."
        ],
        "npc": "You can look at the moon. Are you ready to start?",
        "npcZh": "你可以看月亮。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看月亮"
      }
    ]
  },
  "camp-lamp": {
    "question": "Would you like to find the lamp or ask for a flashlight?",
    "zh": "你想先找灯，还是要手电筒？",
    "paths": [
      {
        "pick": "Let us find the lamp.",
        "zh": "我们找灯吧。",
        "choices": [
          "Let us find the lamp.",
          "I would like to find the lamp."
        ],
        "npc": "You can find the lamp. Would you like some help?",
        "npcZh": "你可以找灯。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找灯"
      },
      {
        "pick": "Let us ask for a flashlight.",
        "zh": "我们要手电筒吧。",
        "choices": [
          "Let us ask for a flashlight.",
          "I would like to ask for a flashlight."
        ],
        "npc": "You can ask for a flashlight. Would you like some help?",
        "npcZh": "你可以要手电筒。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要手电筒"
      }
    ]
  },
  "camp-clean": {
    "question": "Would you like to put the rubbish in the bin or pick up our picnic things?",
    "zh": "你想先把垃圾放进垃圾桶，还是收好野餐用品？",
    "paths": [
      {
        "pick": "Let us put the rubbish in the bin.",
        "zh": "我们把垃圾放进垃圾桶吧。",
        "choices": [
          "Let us put the rubbish in the bin.",
          "I would like to put the rubbish in the bin."
        ],
        "npc": "You can put the rubbish in the bin. Shall we do it together?",
        "npcZh": "你可以把垃圾放进垃圾桶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：把垃圾放进垃圾桶"
      },
      {
        "pick": "Let us pick up our picnic things.",
        "zh": "我们收好野餐用品吧。",
        "choices": [
          "Let us pick up our picnic things.",
          "I would like to pick up our picnic things."
        ],
        "npc": "You can pick up our picnic things. Shall we do it together?",
        "npcZh": "你可以收好野餐用品。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：收好野餐用品"
      }
    ]
  },
  "cafe-menu": {
    "question": "Would you like to look at the menu or ask about today's soup?",
    "zh": "你想先看菜单，还是询问今天的汤？",
    "paths": [
      {
        "pick": "Let us look at the menu.",
        "zh": "我们看菜单吧。",
        "choices": [
          "Let us look at the menu.",
          "I would like to look at the menu."
        ],
        "npc": "You can look at the menu. Are you ready to start?",
        "npcZh": "你可以看菜单。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看菜单"
      },
      {
        "pick": "Let us ask about today's soup.",
        "zh": "我们询问今天的汤吧。",
        "choices": [
          "Let us ask about today's soup.",
          "I would like to ask about today's soup."
        ],
        "npc": "You can ask about today's soup. Are you ready to start?",
        "npcZh": "你可以询问今天的汤。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问今天的汤"
      }
    ]
  },
  "cafe-noodles": {
    "question": "Would you like to order some noodles or order some rice?",
    "zh": "你想先点面条，还是点米饭？",
    "paths": [
      {
        "pick": "Let us order some noodles.",
        "zh": "我们点面条吧。",
        "choices": [
          "Let us order some noodles.",
          "I would like to order some noodles."
        ],
        "npc": "You can order some noodles. Would you like some help?",
        "npcZh": "你可以点面条。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：点面条"
      },
      {
        "pick": "Let us order some rice.",
        "zh": "我们点米饭吧。",
        "choices": [
          "Let us order some rice.",
          "I would like to order some rice."
        ],
        "npc": "You can order some rice. Would you like some help?",
        "npcZh": "你可以点米饭。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：点米饭"
      }
    ]
  },
  "cafe-water": {
    "question": "Would you like to ask for more water or fill your cup?",
    "zh": "你想先再要些水，还是装满杯子？",
    "paths": [
      {
        "pick": "Let us ask for more water.",
        "zh": "我们再要些水吧。",
        "choices": [
          "Let us ask for more water.",
          "I would like to ask for more water."
        ],
        "npc": "You can ask for more water. Shall we do it together?",
        "npcZh": "你可以再要些水。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：再要些水"
      },
      {
        "pick": "Let us fill my cup.",
        "zh": "我们装满杯子吧。",
        "choices": [
          "Let us fill my cup.",
          "I would like to fill my cup."
        ],
        "npc": "You can fill your cup. Shall we do it together?",
        "npcZh": "你可以装满杯子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：装满杯子"
      }
    ]
  },
  "cafe-taste": {
    "question": "Would you like to try the rice or try the noodles?",
    "zh": "你想先尝米饭，还是尝面条？",
    "paths": [
      {
        "pick": "Let us try the rice.",
        "zh": "我们尝米饭吧。",
        "choices": [
          "Let us try the rice.",
          "I would like to try the rice."
        ],
        "npc": "You can try the rice. Are you ready to start?",
        "npcZh": "你可以尝米饭。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：尝米饭"
      },
      {
        "pick": "Let us try the noodles.",
        "zh": "我们尝面条吧。",
        "choices": [
          "Let us try the noodles.",
          "I would like to try the noodles."
        ],
        "npc": "You can try the noodles. Are you ready to start?",
        "npcZh": "你可以尝面条。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：尝面条"
      }
    ]
  },
  "cafe-finish": {
    "question": "Would you like to thank the cook or ask for the bill?",
    "zh": "你想先感谢厨师，还是要账单？",
    "paths": [
      {
        "pick": "Let us thank the cook.",
        "zh": "我们感谢厨师吧。",
        "choices": [
          "Let us thank the cook.",
          "I would like to thank the cook."
        ],
        "npc": "You can thank the cook. Would you like some help?",
        "npcZh": "你可以感谢厨师。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：感谢厨师"
      },
      {
        "pick": "Let us ask for the bill.",
        "zh": "我们要账单吧。",
        "choices": [
          "Let us ask for the bill.",
          "I would like to ask for the bill."
        ],
        "npc": "You can ask for the bill. Would you like some help?",
        "npcZh": "你可以要账单。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要账单"
      }
    ]
  },
  "bakery-bread": {
    "question": "Would you like to buy some bread or buy some buns?",
    "zh": "你想先买面包，还是买小圆面包？",
    "paths": [
      {
        "pick": "Let us buy some bread.",
        "zh": "我们买面包吧。",
        "choices": [
          "Let us buy some bread.",
          "I would like to buy some bread."
        ],
        "npc": "You can buy some bread. Shall we do it together?",
        "npcZh": "你可以买面包。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：买面包"
      },
      {
        "pick": "Let us buy some buns.",
        "zh": "我们买小圆面包吧。",
        "choices": [
          "Let us buy some buns.",
          "I would like to buy some buns."
        ],
        "npc": "You can buy some buns. Shall we do it together?",
        "npcZh": "你可以买小圆面包。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：买小圆面包"
      }
    ]
  },
  "bakery-bun": {
    "question": "Would you like to buy two buns or buy three buns?",
    "zh": "你想先买两个小圆面包，还是买三个小圆面包？",
    "paths": [
      {
        "pick": "Let us buy two buns.",
        "zh": "我们买两个小圆面包吧。",
        "choices": [
          "Let us buy two buns.",
          "I would like to buy two buns."
        ],
        "npc": "You can buy two buns. Are you ready to start?",
        "npcZh": "你可以买两个小圆面包。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买两个小圆面包"
      },
      {
        "pick": "Let us buy three buns.",
        "zh": "我们买三个小圆面包吧。",
        "choices": [
          "Let us buy three buns.",
          "I would like to buy three buns."
        ],
        "npc": "You can buy three buns. Are you ready to start?",
        "npcZh": "你可以买三个小圆面包。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买三个小圆面包"
      }
    ]
  },
  "bakery-cookie": {
    "question": "Would you like to share the cookies or save a cookie for your sister?",
    "zh": "你想先分享饼干，还是留块饼干给姐姐？",
    "paths": [
      {
        "pick": "Let us share the cookies.",
        "zh": "我们分享饼干吧。",
        "choices": [
          "Let us share the cookies.",
          "I would like to share the cookies."
        ],
        "npc": "You can share the cookies. Would you like some help?",
        "npcZh": "你可以分享饼干。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：分享饼干"
      },
      {
        "pick": "Let us save a cookie for my sister.",
        "zh": "我们留块饼干给姐姐吧。",
        "choices": [
          "Let us save a cookie for my sister.",
          "I would like to save a cookie for my sister."
        ],
        "npc": "You can save a cookie for your sister. Would you like some help?",
        "npcZh": "你可以留块饼干给姐姐。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：留块饼干给姐姐"
      }
    ]
  },
  "bakery-cake": {
    "question": "Would you like to choose a small cake or choose a big cake?",
    "zh": "你想先选小蛋糕，还是选大蛋糕？",
    "paths": [
      {
        "pick": "Let us choose a small cake.",
        "zh": "我们选小蛋糕吧。",
        "choices": [
          "Let us choose a small cake.",
          "I would like to choose a small cake."
        ],
        "npc": "You can choose a small cake. Shall we do it together?",
        "npcZh": "你可以选小蛋糕。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选小蛋糕"
      },
      {
        "pick": "Let us choose a big cake.",
        "zh": "我们选大蛋糕吧。",
        "choices": [
          "Let us choose a big cake.",
          "I would like to choose a big cake."
        ],
        "npc": "You can choose a big cake. Shall we do it together?",
        "npcZh": "你可以选大蛋糕。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选大蛋糕"
      }
    ]
  },
  "bakery-sandwich": {
    "question": "Would you like to buy a cheese sandwich or buy an egg sandwich?",
    "zh": "你想先买奶酪三明治，还是买鸡蛋三明治？",
    "paths": [
      {
        "pick": "Let us buy a cheese sandwich.",
        "zh": "我们买奶酪三明治吧。",
        "choices": [
          "Let us buy a cheese sandwich.",
          "I would like to buy a cheese sandwich."
        ],
        "npc": "You can buy a cheese sandwich. Are you ready to start?",
        "npcZh": "你可以买奶酪三明治。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买奶酪三明治"
      },
      {
        "pick": "Let us buy an egg sandwich.",
        "zh": "我们买鸡蛋三明治吧。",
        "choices": [
          "Let us buy an egg sandwich.",
          "I would like to buy an egg sandwich."
        ],
        "npc": "You can buy an egg sandwich. Are you ready to start?",
        "npcZh": "你可以买鸡蛋三明治。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买鸡蛋三明治"
      }
    ]
  },
  "market": {
    "question": "Apples or bananas?",
    "zh": "你想买苹果还是香蕉？",
    "paths": [
      {
        "pick": "Two apples, please.",
        "zh": "请给我两个苹果。",
        "npc": "Here are two apples.",
        "npcZh": "这是两个苹果。",
        "end": "Enjoy your apples!",
        "endZh": "慢慢享用苹果吧！",
        "result": "买到了两个苹果",
        "choices": [
          "Two apples, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      },
      {
        "pick": "Two bananas, please.",
        "zh": "请给我两根香蕉。",
        "npc": "Here are two bananas.",
        "npcZh": "这是两根香蕉。",
        "end": "Enjoy your bananas!",
        "endZh": "慢慢享用香蕉吧！",
        "result": "买到了两根香蕉",
        "choices": [
          "Two bananas, please."
        ],
        "answer": "Thank you!",
        "answerZh": "谢谢！",
        "answers": [
          "Thank you!",
          "Thanks!"
        ],
        "endAnswer": "Thank you! Goodbye!",
        "endAnswerZh": "谢谢，再见！",
        "endAnswers": [
          "Thank you! Goodbye!",
          "Thanks! Bye!"
        ]
      }
    ]
  },
  "mall-size": {
    "question": "Would you like to try a smaller pair of shoes or try a bigger pair of shoes?",
    "zh": "你想先试小一码的鞋，还是试大一码的鞋？",
    "paths": [
      {
        "pick": "Let us try a smaller pair of shoes.",
        "zh": "我们试小一码的鞋吧。",
        "choices": [
          "Let us try a smaller pair of shoes.",
          "I would like to try a smaller pair of shoes."
        ],
        "npc": "You can try a smaller pair of shoes. Shall we do it together?",
        "npcZh": "你可以试小一码的鞋。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：试小一码的鞋"
      },
      {
        "pick": "Let us try a bigger pair of shoes.",
        "zh": "我们试大一码的鞋吧。",
        "choices": [
          "Let us try a bigger pair of shoes.",
          "I would like to try a bigger pair of shoes."
        ],
        "npc": "You can try a bigger pair of shoes. Shall we do it together?",
        "npcZh": "你可以试大一码的鞋。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：试大一码的鞋"
      }
    ]
  },
  "mall-price": {
    "question": "Would you like to ask the price of the teddy or ask the price of the ball?",
    "zh": "你想先问玩具熊价格，还是问球的价格？",
    "paths": [
      {
        "pick": "Let us ask the price of the teddy.",
        "zh": "我们问玩具熊价格吧。",
        "choices": [
          "Let us ask the price of the teddy.",
          "I would like to ask the price of the teddy."
        ],
        "npc": "You can ask the price of the teddy. Are you ready to start?",
        "npcZh": "你可以问玩具熊价格。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问玩具熊价格"
      },
      {
        "pick": "Let us ask the price of the ball.",
        "zh": "我们问球的价格吧。",
        "choices": [
          "Let us ask the price of the ball.",
          "I would like to ask the price of the ball."
        ],
        "npc": "You can ask the price of the ball. Are you ready to start?",
        "npcZh": "你可以问球的价格。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问球的价格"
      }
    ]
  },
  "mall-toilet": {
    "question": "Would you like to ask where the toilet is or ask your parent to come with me?",
    "zh": "你想先问厕所在哪里，还是请家长陪同？",
    "paths": [
      {
        "pick": "Let us ask where the toilet is.",
        "zh": "我们问厕所在哪里吧。",
        "choices": [
          "Let us ask where the toilet is.",
          "I would like to ask where the toilet is."
        ],
        "npc": "You can ask where the toilet is. Would you like some help?",
        "npcZh": "你可以问厕所在哪里。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：问厕所在哪里"
      },
      {
        "pick": "Let us ask my parent to come with me.",
        "zh": "我们请家长陪同吧。",
        "choices": [
          "Let us ask my parent to come with me.",
          "I would like to ask my parent to come with me."
        ],
        "npc": "You can ask your parent to come with me. Would you like some help?",
        "npcZh": "你可以请家长陪同。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：请家长陪同"
      }
    ]
  },
  "mall-bag": {
    "question": "Would you like to use a small bag or use your own bag?",
    "zh": "你想先用小袋子，还是用自己的袋子？",
    "paths": [
      {
        "pick": "Let us use a small bag.",
        "zh": "我们用小袋子吧。",
        "choices": [
          "Let us use a small bag.",
          "I would like to use a small bag."
        ],
        "npc": "You can use a small bag. Shall we do it together?",
        "npcZh": "你可以用小袋子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用小袋子"
      },
      {
        "pick": "Let us use my own bag.",
        "zh": "我们用自己的袋子吧。",
        "choices": [
          "Let us use my own bag.",
          "I would like to use my own bag."
        ],
        "npc": "You can use your own bag. Shall we do it together?",
        "npcZh": "你可以用自己的袋子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：用自己的袋子"
      }
    ]
  },
  "store-cart": {
    "question": "Would you like to get a shopping cart or get a shopping basket?",
    "zh": "你想先拿购物车，还是拿购物篮？",
    "paths": [
      {
        "pick": "Let us get a shopping cart.",
        "zh": "我们拿购物车吧。",
        "choices": [
          "Let us get a shopping cart.",
          "I would like to get a shopping cart."
        ],
        "npc": "You can get a shopping cart. Are you ready to start?",
        "npcZh": "你可以拿购物车。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：拿购物车"
      },
      {
        "pick": "Let us get a shopping basket.",
        "zh": "我们拿购物篮吧。",
        "choices": [
          "Let us get a shopping basket.",
          "I would like to get a shopping basket."
        ],
        "npc": "You can get a shopping basket. Are you ready to start?",
        "npcZh": "你可以拿购物篮。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：拿购物篮"
      }
    ]
  },
  "store-eggs": {
    "question": "Would you like to buy some eggs or check the shopping list?",
    "zh": "你想先买鸡蛋，还是查看购物清单？",
    "paths": [
      {
        "pick": "Let us buy some eggs.",
        "zh": "我们买鸡蛋吧。",
        "choices": [
          "Let us buy some eggs.",
          "I would like to buy some eggs."
        ],
        "npc": "You can buy some eggs. Would you like some help?",
        "npcZh": "你可以买鸡蛋。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买鸡蛋"
      },
      {
        "pick": "Let us check the shopping list.",
        "zh": "我们查看购物清单吧。",
        "choices": [
          "Let us check the shopping list.",
          "I would like to check the shopping list."
        ],
        "npc": "You can check the shopping list. Would you like some help?",
        "npcZh": "你可以查看购物清单。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：查看购物清单"
      }
    ]
  },
  "store-milk": {
    "question": "Would you like to find the milk or ask the clerk for help?",
    "zh": "你想先找牛奶，还是向店员求助？",
    "paths": [
      {
        "pick": "Let us find the milk.",
        "zh": "我们找牛奶吧。",
        "choices": [
          "Let us find the milk.",
          "I would like to find the milk."
        ],
        "npc": "You can find the milk. Shall we do it together?",
        "npcZh": "你可以找牛奶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找牛奶"
      },
      {
        "pick": "Let us ask the clerk for help.",
        "zh": "我们向店员求助吧。",
        "choices": [
          "Let us ask the clerk for help.",
          "I would like to ask the clerk for help."
        ],
        "npc": "You can ask the clerk for help. Shall we do it together?",
        "npcZh": "你可以向店员求助。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向店员求助"
      }
    ]
  },
  "store-apples": {
    "question": "Would you like to buy three apples or buy four apples?",
    "zh": "你想先买三个苹果，还是买四个苹果？",
    "paths": [
      {
        "pick": "Let us buy three apples.",
        "zh": "我们买三个苹果吧。",
        "choices": [
          "Let us buy three apples.",
          "I would like to buy three apples."
        ],
        "npc": "You can buy three apples. Are you ready to start?",
        "npcZh": "你可以买三个苹果。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买三个苹果"
      },
      {
        "pick": "Let us buy four apples.",
        "zh": "我们买四个苹果吧。",
        "choices": [
          "Let us buy four apples.",
          "I would like to buy four apples."
        ],
        "npc": "You can buy four apples. Are you ready to start?",
        "npcZh": "你可以买四个苹果。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买四个苹果"
      }
    ]
  },
  "store-pay": {
    "question": "Would you like to ask for a receipt or ask your parent to pay?",
    "zh": "你想先要收据，还是请家长付款？",
    "paths": [
      {
        "pick": "Let us ask for a receipt.",
        "zh": "我们要收据吧。",
        "choices": [
          "Let us ask for a receipt.",
          "I would like to ask for a receipt."
        ],
        "npc": "You can ask for a receipt. Would you like some help?",
        "npcZh": "你可以要收据。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要收据"
      },
      {
        "pick": "Let us ask my parent to pay.",
        "zh": "我们请家长付款吧。",
        "choices": [
          "Let us ask my parent to pay.",
          "I would like to ask my parent to pay."
        ],
        "npc": "You can ask your parent to pay. Would you like some help?",
        "npcZh": "你可以请家长付款。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：请家长付款"
      }
    ]
  },
  "garden-place-1": {
    "question": "Would you like to look at the pink flower or look at the yellow flower?",
    "zh": "你想先看粉色花朵，还是看黄色花朵？",
    "paths": [
      {
        "pick": "Let us look at the pink flower.",
        "zh": "我们看粉色花朵吧。",
        "choices": [
          "Let us look at the pink flower.",
          "I would like to look at the pink flower."
        ],
        "npc": "You can look at the pink flower. Shall we do it together?",
        "npcZh": "你可以看粉色花朵。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看粉色花朵"
      },
      {
        "pick": "Let us look at the yellow flower.",
        "zh": "我们看黄色花朵吧。",
        "choices": [
          "Let us look at the yellow flower.",
          "I would like to look at the yellow flower."
        ],
        "npc": "You can look at the yellow flower. Shall we do it together?",
        "npcZh": "你可以看黄色花朵。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看黄色花朵"
      }
    ]
  },
  "garden-place-2": {
    "question": "Would you like to plant a seed or water a seedling?",
    "zh": "你想先种种子，还是给幼苗浇水？",
    "paths": [
      {
        "pick": "Let us plant a seed.",
        "zh": "我们种种子吧。",
        "choices": [
          "Let us plant a seed.",
          "I would like to plant a seed."
        ],
        "npc": "You can plant a seed. Are you ready to start?",
        "npcZh": "你可以种种子。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：种种子"
      },
      {
        "pick": "Let us water a seedling.",
        "zh": "我们给幼苗浇水吧。",
        "choices": [
          "Let us water a seedling.",
          "I would like to water a seedling."
        ],
        "npc": "You can water a seedling. Are you ready to start?",
        "npcZh": "你可以给幼苗浇水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：给幼苗浇水"
      }
    ]
  },
  "garden-place-3": {
    "question": "Would you like to get some water or water the flowers?",
    "zh": "你想先取些水，还是浇花？",
    "paths": [
      {
        "pick": "Let us get some water.",
        "zh": "我们取些水吧。",
        "choices": [
          "Let us get some water.",
          "I would like to get some water."
        ],
        "npc": "You can get some water. Would you like some help?",
        "npcZh": "你可以取些水。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：取些水"
      },
      {
        "pick": "Let us water the flowers.",
        "zh": "我们浇花吧。",
        "choices": [
          "Let us water the flowers.",
          "I would like to water the flowers."
        ],
        "npc": "You can water the flowers. Would you like some help?",
        "npcZh": "你可以浇花。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：浇花"
      }
    ]
  },
  "garden-place-4": {
    "question": "Would you like to look at the green leaf or draw the leaf?",
    "zh": "你想先看绿叶，还是画叶子？",
    "paths": [
      {
        "pick": "Let us look at the green leaf.",
        "zh": "我们看绿叶吧。",
        "choices": [
          "Let us look at the green leaf.",
          "I would like to look at the green leaf."
        ],
        "npc": "You can look at the green leaf. Shall we do it together?",
        "npcZh": "你可以看绿叶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看绿叶"
      },
      {
        "pick": "Let us draw the leaf.",
        "zh": "我们画叶子吧。",
        "choices": [
          "Let us draw the leaf.",
          "I would like to draw the leaf."
        ],
        "npc": "You can draw the leaf. Shall we do it together?",
        "npcZh": "你可以画叶子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画叶子"
      }
    ]
  },
  "garden-place-5": {
    "question": "Would you like to watch the snail or leave the snail in the garden?",
    "zh": "你想先看蜗牛，还是让蜗牛留在花园里？",
    "paths": [
      {
        "pick": "Let us watch the snail.",
        "zh": "我们看蜗牛吧。",
        "choices": [
          "Let us watch the snail.",
          "I would like to watch the snail."
        ],
        "npc": "You can watch the snail. Are you ready to start?",
        "npcZh": "你可以看蜗牛。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看蜗牛"
      },
      {
        "pick": "Let us leave the snail in the garden.",
        "zh": "我们让蜗牛留在花园里吧。",
        "choices": [
          "Let us leave the snail in the garden.",
          "I would like to leave the snail in the garden."
        ],
        "npc": "You can leave the snail in the garden. Are you ready to start?",
        "npcZh": "你可以让蜗牛留在花园里。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：让蜗牛留在花园里"
      }
    ]
  },
  "cafe-place-1": {
    "question": "Would you like to order some water or order some milk?",
    "zh": "你想先点水，还是点牛奶？",
    "paths": [
      {
        "pick": "Let us order some water.",
        "zh": "我们点水吧。",
        "choices": [
          "Let us order some water.",
          "I would like to order some water."
        ],
        "npc": "You can order some water. Would you like some help?",
        "npcZh": "你可以点水。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：点水"
      },
      {
        "pick": "Let us order some milk.",
        "zh": "我们点牛奶吧。",
        "choices": [
          "Let us order some milk.",
          "I would like to order some milk."
        ],
        "npc": "You can order some milk. Would you like some help?",
        "npcZh": "你可以点牛奶。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：点牛奶"
      }
    ]
  },
  "cafe-place-2": {
    "question": "Would you like to order warm milk or order cold milk?",
    "zh": "你想先点温牛奶，还是点冷牛奶？",
    "paths": [
      {
        "pick": "Let us order warm milk.",
        "zh": "我们点温牛奶吧。",
        "choices": [
          "Let us order warm milk.",
          "I would like to order warm milk."
        ],
        "npc": "You can order warm milk. Shall we do it together?",
        "npcZh": "你可以点温牛奶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：点温牛奶"
      },
      {
        "pick": "Let us order cold milk.",
        "zh": "我们点冷牛奶吧。",
        "choices": [
          "Let us order cold milk.",
          "I would like to order cold milk."
        ],
        "npc": "You can order cold milk. Shall we do it together?",
        "npcZh": "你可以点冷牛奶。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：点冷牛奶"
      }
    ]
  },
  "cafe-place-3": {
    "question": "Would you like to choose a small cake or share a cake?",
    "zh": "你想先选小蛋糕，还是分享蛋糕？",
    "paths": [
      {
        "pick": "Let us choose a small cake.",
        "zh": "我们选小蛋糕吧。",
        "choices": [
          "Let us choose a small cake.",
          "I would like to choose a small cake."
        ],
        "npc": "You can choose a small cake. Are you ready to start?",
        "npcZh": "你可以选小蛋糕。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选小蛋糕"
      },
      {
        "pick": "Let us share a cake.",
        "zh": "我们分享蛋糕吧。",
        "choices": [
          "Let us share a cake.",
          "I would like to share a cake."
        ],
        "npc": "You can share a cake. Are you ready to start?",
        "npcZh": "你可以分享蛋糕。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：分享蛋糕"
      }
    ]
  },
  "cafe-place-4": {
    "question": "Would you like to ask for a spoon or ask for a fork?",
    "zh": "你想先要勺子，还是要叉子？",
    "paths": [
      {
        "pick": "Let us ask for a spoon.",
        "zh": "我们要勺子吧。",
        "choices": [
          "Let us ask for a spoon.",
          "I would like to ask for a spoon."
        ],
        "npc": "You can ask for a spoon. Would you like some help?",
        "npcZh": "你可以要勺子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要勺子"
      },
      {
        "pick": "Let us ask for a fork.",
        "zh": "我们要叉子吧。",
        "choices": [
          "Let us ask for a fork.",
          "I would like to ask for a fork."
        ],
        "npc": "You can ask for a fork. Would you like some help?",
        "npcZh": "你可以要叉子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：要叉子"
      }
    ]
  },
  "cafe-place-5": {
    "question": "Would you like to ask for a napkin or get a clean napkin?",
    "zh": "你想先要餐巾，还是拿干净的餐巾？",
    "paths": [
      {
        "pick": "Let us ask for a napkin.",
        "zh": "我们要餐巾吧。",
        "choices": [
          "Let us ask for a napkin.",
          "I would like to ask for a napkin."
        ],
        "npc": "You can ask for a napkin. Shall we do it together?",
        "npcZh": "你可以要餐巾。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：要餐巾"
      },
      {
        "pick": "Let us get a clean napkin.",
        "zh": "我们拿干净的餐巾吧。",
        "choices": [
          "Let us get a clean napkin.",
          "I would like to get a clean napkin."
        ],
        "npc": "You can get a clean napkin. Shall we do it together?",
        "npcZh": "你可以拿干净的餐巾。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：拿干净的餐巾"
      }
    ]
  },
  "cinema-place-1": {
    "question": "Would you like to buy a ticket or ask about the film time?",
    "zh": "你想先买票，还是询问电影时间？",
    "paths": [
      {
        "pick": "Let us buy a ticket.",
        "zh": "我们买票吧。",
        "choices": [
          "Let us buy a ticket.",
          "I would like to buy a ticket."
        ],
        "npc": "You can buy a ticket. Are you ready to start?",
        "npcZh": "你可以买票。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：买票"
      },
      {
        "pick": "Let us ask about the film time.",
        "zh": "我们询问电影时间吧。",
        "choices": [
          "Let us ask about the film time.",
          "I would like to ask about the film time."
        ],
        "npc": "You can ask about the film time. Are you ready to start?",
        "npcZh": "你可以询问电影时间。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问电影时间"
      }
    ]
  },
  "cinema-place-2": {
    "question": "Would you like to find your seat or ask the usher for help?",
    "zh": "你想先找座位，还是向引座员求助？",
    "paths": [
      {
        "pick": "Let us find my seat.",
        "zh": "我们找座位吧。",
        "choices": [
          "Let us find my seat.",
          "I would like to find my seat."
        ],
        "npc": "You can find your seat. Would you like some help?",
        "npcZh": "你可以找座位。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找座位"
      },
      {
        "pick": "Let us ask the usher for help.",
        "zh": "我们向引座员求助吧。",
        "choices": [
          "Let us ask the usher for help.",
          "I would like to ask the usher for help."
        ],
        "npc": "You can ask the usher for help. Would you like some help?",
        "npcZh": "你可以向引座员求助。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向引座员求助"
      }
    ]
  },
  "cinema-place-3": {
    "question": "Would you like to share some popcorn or choose a small popcorn?",
    "zh": "你想先分享爆米花，还是选小份爆米花？",
    "paths": [
      {
        "pick": "Let us share some popcorn.",
        "zh": "我们分享爆米花吧。",
        "choices": [
          "Let us share some popcorn.",
          "I would like to share some popcorn."
        ],
        "npc": "You can share some popcorn. Shall we do it together?",
        "npcZh": "你可以分享爆米花。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：分享爆米花"
      },
      {
        "pick": "Let us choose a small popcorn.",
        "zh": "我们选小份爆米花吧。",
        "choices": [
          "Let us choose a small popcorn.",
          "I would like to choose a small popcorn."
        ],
        "npc": "You can choose a small popcorn. Shall we do it together?",
        "npcZh": "你可以选小份爆米花。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选小份爆米花"
      }
    ]
  },
  "cinema-place-4": {
    "question": "Would you like to get some water or find your water bottle?",
    "zh": "你想先取些水，还是找水瓶？",
    "paths": [
      {
        "pick": "Let us get some water.",
        "zh": "我们取些水吧。",
        "choices": [
          "Let us get some water.",
          "I would like to get some water."
        ],
        "npc": "You can get some water. Are you ready to start?",
        "npcZh": "你可以取些水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：取些水"
      },
      {
        "pick": "Let us find my water bottle.",
        "zh": "我们找水瓶吧。",
        "choices": [
          "Let us find my water bottle.",
          "I would like to find my water bottle."
        ],
        "npc": "You can find your water bottle. Are you ready to start?",
        "npcZh": "你可以找水瓶。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找水瓶"
      }
    ]
  },
  "cinema-place-5": {
    "question": "Would you like to look at the film poster or find the star on the poster?",
    "zh": "你想先看电影海报，还是找海报上的星星？",
    "paths": [
      {
        "pick": "Let us look at the film poster.",
        "zh": "我们看电影海报吧。",
        "choices": [
          "Let us look at the film poster.",
          "I would like to look at the film poster."
        ],
        "npc": "You can look at the film poster. Would you like some help?",
        "npcZh": "你可以看电影海报。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看电影海报"
      },
      {
        "pick": "Let us find the star on the poster.",
        "zh": "我们找海报上的星星吧。",
        "choices": [
          "Let us find the star on the poster.",
          "I would like to find the star on the poster."
        ],
        "npc": "You can find the star on the poster. Would you like some help?",
        "npcZh": "你可以找海报上的星星。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找海报上的星星"
      }
    ]
  },
  "aquarium-place-1": {
    "question": "Would you like to watch the fish or count the fish?",
    "zh": "你想先看鱼，还是数鱼？",
    "paths": [
      {
        "pick": "Let us watch the fish.",
        "zh": "我们看鱼吧。",
        "choices": [
          "Let us watch the fish.",
          "I would like to watch the fish."
        ],
        "npc": "You can watch the fish. Shall we do it together?",
        "npcZh": "你可以看鱼。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看鱼"
      },
      {
        "pick": "Let us count the fish.",
        "zh": "我们数鱼吧。",
        "choices": [
          "Let us count the fish.",
          "I would like to count the fish."
        ],
        "npc": "You can count the fish. Shall we do it together?",
        "npcZh": "你可以数鱼。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：数鱼"
      }
    ]
  },
  "aquarium-place-2": {
    "question": "Would you like to watch the turtle swim or draw the turtle?",
    "zh": "你想先看海龟游泳，还是画海龟？",
    "paths": [
      {
        "pick": "Let us watch the turtle swim.",
        "zh": "我们看海龟游泳吧。",
        "choices": [
          "Let us watch the turtle swim.",
          "I would like to watch the turtle swim."
        ],
        "npc": "You can watch the turtle swim. Are you ready to start?",
        "npcZh": "你可以看海龟游泳。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看海龟游泳"
      },
      {
        "pick": "Let us draw the turtle.",
        "zh": "我们画海龟吧。",
        "choices": [
          "Let us draw the turtle.",
          "I would like to draw the turtle."
        ],
        "npc": "You can draw the turtle. Are you ready to start?",
        "npcZh": "你可以画海龟。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：画海龟"
      }
    ]
  },
  "aquarium-place-3": {
    "question": "Would you like to watch the octopus or count the octopus's arms?",
    "zh": "你想先看章鱼，还是数章鱼的腕足？",
    "paths": [
      {
        "pick": "Let us watch the octopus.",
        "zh": "我们看章鱼吧。",
        "choices": [
          "Let us watch the octopus.",
          "I would like to watch the octopus."
        ],
        "npc": "You can watch the octopus. Would you like some help?",
        "npcZh": "你可以看章鱼。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看章鱼"
      },
      {
        "pick": "Let us count the octopus's arms.",
        "zh": "我们数章鱼的腕足吧。",
        "choices": [
          "Let us count the octopus's arms.",
          "I would like to count the octopus's arms."
        ],
        "npc": "You can count the octopus's arms. Would you like some help?",
        "npcZh": "你可以数章鱼的腕足。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：数章鱼的腕足"
      }
    ]
  },
  "aquarium-place-4": {
    "question": "Would you like to look at the starfish or draw a starfish?",
    "zh": "你想先看海星，还是画海星？",
    "paths": [
      {
        "pick": "Let us look at the starfish.",
        "zh": "我们看海星吧。",
        "choices": [
          "Let us look at the starfish.",
          "I would like to look at the starfish."
        ],
        "npc": "You can look at the starfish. Shall we do it together?",
        "npcZh": "你可以看海星。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看海星"
      },
      {
        "pick": "Let us draw a starfish.",
        "zh": "我们画海星吧。",
        "choices": [
          "Let us draw a starfish.",
          "I would like to draw a starfish."
        ],
        "npc": "You can draw a starfish. Shall we do it together?",
        "npcZh": "你可以画海星。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画海星"
      }
    ]
  },
  "aquarium-place-5": {
    "question": "Would you like to watch the jellyfish or look at the jellyfish sign?",
    "zh": "你想先看水母，还是看水母介绍牌？",
    "paths": [
      {
        "pick": "Let us watch the jellyfish.",
        "zh": "我们看水母吧。",
        "choices": [
          "Let us watch the jellyfish.",
          "I would like to watch the jellyfish."
        ],
        "npc": "You can watch the jellyfish. Are you ready to start?",
        "npcZh": "你可以看水母。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看水母"
      },
      {
        "pick": "Let us look at the jellyfish sign.",
        "zh": "我们看水母介绍牌吧。",
        "choices": [
          "Let us look at the jellyfish sign.",
          "I would like to look at the jellyfish sign."
        ],
        "npc": "You can look at the jellyfish sign. Are you ready to start?",
        "npcZh": "你可以看水母介绍牌。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看水母介绍牌"
      }
    ]
  },
  "pool-place-1": {
    "question": "Would you like to wait for the lifeguard or ask your parent to come with me?",
    "zh": "你想先等救生员，还是请家长陪同？",
    "paths": [
      {
        "pick": "Let us wait for the lifeguard.",
        "zh": "我们等救生员吧。",
        "choices": [
          "Let us wait for the lifeguard.",
          "I would like to wait for the lifeguard."
        ],
        "npc": "You can wait for the lifeguard. Would you like some help?",
        "npcZh": "你可以等救生员。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：等救生员"
      },
      {
        "pick": "Let us ask my parent to come with me.",
        "zh": "我们请家长陪同吧。",
        "choices": [
          "Let us ask my parent to come with me.",
          "I would like to ask my parent to come with me."
        ],
        "npc": "You can ask your parent to come with me. Would you like some help?",
        "npcZh": "你可以请家长陪同。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：请家长陪同"
      }
    ]
  },
  "pool-place-2": {
    "question": "Would you like to get a dry towel or put the wet towel in your bag?",
    "zh": "你想先拿干毛巾，还是把湿毛巾放进包里？",
    "paths": [
      {
        "pick": "Let us get a dry towel.",
        "zh": "我们拿干毛巾吧。",
        "choices": [
          "Let us get a dry towel.",
          "I would like to get a dry towel."
        ],
        "npc": "You can get a dry towel. Shall we do it together?",
        "npcZh": "你可以拿干毛巾。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：拿干毛巾"
      },
      {
        "pick": "Let us put the wet towel in my bag.",
        "zh": "我们把湿毛巾放进包里吧。",
        "choices": [
          "Let us put the wet towel in my bag.",
          "I would like to put the wet towel in my bag."
        ],
        "npc": "You can put the wet towel in your bag. Shall we do it together?",
        "npcZh": "你可以把湿毛巾放进包里。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：把湿毛巾放进包里"
      }
    ]
  },
  "pool-place-3": {
    "question": "Would you like to fill your water bottle or drink some water?",
    "zh": "你想先装满水瓶，还是喝些水？",
    "paths": [
      {
        "pick": "Let us fill my water bottle.",
        "zh": "我们装满水瓶吧。",
        "choices": [
          "Let us fill my water bottle.",
          "I would like to fill my water bottle."
        ],
        "npc": "You can fill your water bottle. Are you ready to start?",
        "npcZh": "你可以装满水瓶。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：装满水瓶"
      },
      {
        "pick": "Let us drink some water.",
        "zh": "我们喝些水吧。",
        "choices": [
          "Let us drink some water.",
          "I would like to drink some water."
        ],
        "npc": "You can drink some water. Are you ready to start?",
        "npcZh": "你可以喝些水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：喝些水"
      }
    ]
  },
  "pool-place-4": {
    "question": "Would you like to put on your swimming cap or find your goggles?",
    "zh": "你想先戴泳帽，还是找泳镜？",
    "paths": [
      {
        "pick": "Let us put on my swimming cap.",
        "zh": "我们戴泳帽吧。",
        "choices": [
          "Let us put on my swimming cap.",
          "I would like to put on my swimming cap."
        ],
        "npc": "You can put on your swimming cap. Would you like some help?",
        "npcZh": "你可以戴泳帽。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：戴泳帽"
      },
      {
        "pick": "Let us find my goggles.",
        "zh": "我们找泳镜吧。",
        "choices": [
          "Let us find my goggles.",
          "I would like to find my goggles."
        ],
        "npc": "You can find your goggles. Would you like some help?",
        "npcZh": "你可以找泳镜。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找泳镜"
      }
    ]
  },
  "pool-place-5": {
    "question": "Would you like to take a shower or ask your parent for a clean towel?",
    "zh": "你想先淋浴，还是向家长要干净毛巾？",
    "paths": [
      {
        "pick": "Let us take a shower.",
        "zh": "我们淋浴吧。",
        "choices": [
          "Let us take a shower.",
          "I would like to take a shower."
        ],
        "npc": "You can take a shower. Shall we do it together?",
        "npcZh": "你可以淋浴。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：淋浴"
      },
      {
        "pick": "Let us ask my parent for a clean towel.",
        "zh": "我们向家长要干净毛巾吧。",
        "choices": [
          "Let us ask my parent for a clean towel.",
          "I would like to ask my parent for a clean towel."
        ],
        "npc": "You can ask your parent for a clean towel. Shall we do it together?",
        "npcZh": "你可以向家长要干净毛巾。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向家长要干净毛巾"
      }
    ]
  },
  "sports-shop-1": {
    "question": "Would you like to choose a soccer ball or ask about the soccer ball?",
    "zh": "你想先选足球，还是询问足球？",
    "paths": [
      {
        "pick": "Let us choose a soccer ball.",
        "zh": "我们选足球吧。",
        "choices": [
          "Let us choose a soccer ball.",
          "I would like to choose a soccer ball."
        ],
        "npc": "You can choose a soccer ball. Are you ready to start?",
        "npcZh": "你可以选足球。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：选足球"
      },
      {
        "pick": "Let us ask about the soccer ball.",
        "zh": "我们询问足球吧。",
        "choices": [
          "Let us ask about the soccer ball.",
          "I would like to ask about the soccer ball."
        ],
        "npc": "You can ask about the soccer ball. Are you ready to start?",
        "npcZh": "你可以询问足球。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问足球"
      }
    ]
  },
  "sports-shop-2": {
    "question": "Would you like to choose a basketball or ask to hold the basketball?",
    "zh": "你想先选篮球，还是请求拿一下篮球？",
    "paths": [
      {
        "pick": "Let us choose a basketball.",
        "zh": "我们选篮球吧。",
        "choices": [
          "Let us choose a basketball.",
          "I would like to choose a basketball."
        ],
        "npc": "You can choose a basketball. Would you like some help?",
        "npcZh": "你可以选篮球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：选篮球"
      },
      {
        "pick": "Let us ask to hold the basketball.",
        "zh": "我们请求拿一下篮球吧。",
        "choices": [
          "Let us ask to hold the basketball.",
          "I would like to ask to hold the basketball."
        ],
        "npc": "You can ask to hold the basketball. Would you like some help?",
        "npcZh": "你可以请求拿一下篮球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：请求拿一下篮球"
      }
    ]
  },
  "sports-shop-3": {
    "question": "Would you like to try on running shoes or ask for a smaller size?",
    "zh": "你想先试穿跑鞋，还是要小一码？",
    "paths": [
      {
        "pick": "Let us try on running shoes.",
        "zh": "我们试穿跑鞋吧。",
        "choices": [
          "Let us try on running shoes.",
          "I would like to try on running shoes."
        ],
        "npc": "You can try on running shoes. Shall we do it together?",
        "npcZh": "你可以试穿跑鞋。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：试穿跑鞋"
      },
      {
        "pick": "Let us ask for a smaller size.",
        "zh": "我们要小一码吧。",
        "choices": [
          "Let us ask for a smaller size.",
          "I would like to ask for a smaller size."
        ],
        "npc": "You can ask for a smaller size. Shall we do it together?",
        "npcZh": "你可以要小一码。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：要小一码"
      }
    ]
  },
  "sports-shop-4": {
    "question": "Would you like to try on a helmet or ask for help with the helmet?",
    "zh": "你想先试戴头盔，还是请人帮忙戴头盔？",
    "paths": [
      {
        "pick": "Let us try on a helmet.",
        "zh": "我们试戴头盔吧。",
        "choices": [
          "Let us try on a helmet.",
          "I would like to try on a helmet."
        ],
        "npc": "You can try on a helmet. Are you ready to start?",
        "npcZh": "你可以试戴头盔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：试戴头盔"
      },
      {
        "pick": "Let us ask for help with the helmet.",
        "zh": "我们请人帮忙戴头盔吧。",
        "choices": [
          "Let us ask for help with the helmet.",
          "I would like to ask for help with the helmet."
        ],
        "npc": "You can ask for help with the helmet. Are you ready to start?",
        "npcZh": "你可以请人帮忙戴头盔。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请人帮忙戴头盔"
      }
    ]
  },
  "sports-shop-5": {
    "question": "Would you like to look for a tennis racket or look for a tennis ball?",
    "zh": "你想先找网球拍，还是找网球？",
    "paths": [
      {
        "pick": "Let us look for a tennis racket.",
        "zh": "我们找网球拍吧。",
        "choices": [
          "Let us look for a tennis racket.",
          "I would like to look for a tennis racket."
        ],
        "npc": "You can look for a tennis racket. Would you like some help?",
        "npcZh": "你可以找网球拍。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找网球拍"
      },
      {
        "pick": "Let us look for a tennis ball.",
        "zh": "我们找网球吧。",
        "choices": [
          "Let us look for a tennis ball.",
          "I would like to look for a tennis ball."
        ],
        "npc": "You can look for a tennis ball. Would you like some help?",
        "npcZh": "你可以找网球。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找网球"
      }
    ]
  },
  "flower-shop-1": {
    "question": "Would you like to choose a red flower or choose a pink flower?",
    "zh": "你想先选红花，还是选粉花？",
    "paths": [
      {
        "pick": "Let us choose a red flower.",
        "zh": "我们选红花吧。",
        "choices": [
          "Let us choose a red flower.",
          "I would like to choose a red flower."
        ],
        "npc": "You can choose a red flower. Shall we do it together?",
        "npcZh": "你可以选红花。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选红花"
      },
      {
        "pick": "Let us choose a pink flower.",
        "zh": "我们选粉花吧。",
        "choices": [
          "Let us choose a pink flower.",
          "I would like to choose a pink flower."
        ],
        "npc": "You can choose a pink flower. Shall we do it together?",
        "npcZh": "你可以选粉花。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选粉花"
      }
    ]
  },
  "flower-shop-2": {
    "question": "Would you like to look at the green leaf or ask about the plant?",
    "zh": "你想先看绿叶，还是询问植物？",
    "paths": [
      {
        "pick": "Let us look at the green leaf.",
        "zh": "我们看绿叶吧。",
        "choices": [
          "Let us look at the green leaf.",
          "I would like to look at the green leaf."
        ],
        "npc": "You can look at the green leaf. Are you ready to start?",
        "npcZh": "你可以看绿叶。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看绿叶"
      },
      {
        "pick": "Let us ask about the plant.",
        "zh": "我们询问植物吧。",
        "choices": [
          "Let us ask about the plant.",
          "I would like to ask about the plant."
        ],
        "npc": "You can ask about the plant. Are you ready to start?",
        "npcZh": "你可以询问植物。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问植物"
      }
    ]
  },
  "flower-shop-3": {
    "question": "Would you like to buy some seeds or ask how to plant the seeds?",
    "zh": "你想先买种子，还是询问如何种种子？",
    "paths": [
      {
        "pick": "Let us buy some seeds.",
        "zh": "我们买种子吧。",
        "choices": [
          "Let us buy some seeds.",
          "I would like to buy some seeds."
        ],
        "npc": "You can buy some seeds. Would you like some help?",
        "npcZh": "你可以买种子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买种子"
      },
      {
        "pick": "Let us ask how to plant the seeds.",
        "zh": "我们询问如何种种子吧。",
        "choices": [
          "Let us ask how to plant the seeds.",
          "I would like to ask how to plant the seeds."
        ],
        "npc": "You can ask how to plant the seeds. Would you like some help?",
        "npcZh": "你可以询问如何种种子。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：询问如何种种子"
      }
    ]
  },
  "flower-shop-4": {
    "question": "Would you like to choose a small basket or choose a big basket?",
    "zh": "你想先选小篮子，还是选大篮子？",
    "paths": [
      {
        "pick": "Let us choose a small basket.",
        "zh": "我们选小篮子吧。",
        "choices": [
          "Let us choose a small basket.",
          "I would like to choose a small basket."
        ],
        "npc": "You can choose a small basket. Shall we do it together?",
        "npcZh": "你可以选小篮子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选小篮子"
      },
      {
        "pick": "Let us choose a big basket.",
        "zh": "我们选大篮子吧。",
        "choices": [
          "Let us choose a big basket.",
          "I would like to choose a big basket."
        ],
        "npc": "You can choose a big basket. Shall we do it together?",
        "npcZh": "你可以选大篮子。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：选大篮子"
      }
    ]
  },
  "flower-shop-5": {
    "question": "Would you like to ask how much water the plant needs or ask how often to water the plant?",
    "zh": "你想先询问植物需要多少水，还是询问多久浇水一次？",
    "paths": [
      {
        "pick": "Let us ask how much water the plant needs.",
        "zh": "我们询问植物需要多少水吧。",
        "choices": [
          "Let us ask how much water the plant needs.",
          "I would like to ask how much water the plant needs."
        ],
        "npc": "You can ask how much water the plant needs. Are you ready to start?",
        "npcZh": "你可以询问植物需要多少水。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问植物需要多少水"
      },
      {
        "pick": "Let us ask how often to water the plant.",
        "zh": "我们询问多久浇水一次吧。",
        "choices": [
          "Let us ask how often to water the plant.",
          "I would like to ask how often to water the plant."
        ],
        "npc": "You can ask how often to water the plant. Are you ready to start?",
        "npcZh": "你可以询问多久浇水一次。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问多久浇水一次"
      }
    ]
  },
  "forest-place-1": {
    "question": "Would you like to walk on the forest path or read the forest map?",
    "zh": "你想先走森林小径，还是看森林地图？",
    "paths": [
      {
        "pick": "Let us walk on the forest path.",
        "zh": "我们走森林小径吧。",
        "choices": [
          "Let us walk on the forest path.",
          "I would like to walk on the forest path."
        ],
        "npc": "You can walk on the forest path. Would you like some help?",
        "npcZh": "你可以走森林小径。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：走森林小径"
      },
      {
        "pick": "Let us read the forest map.",
        "zh": "我们看森林地图吧。",
        "choices": [
          "Let us read the forest map.",
          "I would like to read the forest map."
        ],
        "npc": "You can read the forest map. Would you like some help?",
        "npcZh": "你可以看森林地图。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看森林地图"
      }
    ]
  },
  "forest-place-2": {
    "question": "Would you like to look at the log or draw the log?",
    "zh": "你想先看木头，还是画木头？",
    "paths": [
      {
        "pick": "Let us look at the log.",
        "zh": "我们看木头吧。",
        "choices": [
          "Let us look at the log.",
          "I would like to look at the log."
        ],
        "npc": "You can look at the log. Shall we do it together?",
        "npcZh": "你可以看木头。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看木头"
      },
      {
        "pick": "Let us draw the log.",
        "zh": "我们画木头吧。",
        "choices": [
          "Let us draw the log.",
          "I would like to draw the log."
        ],
        "npc": "You can draw the log. Shall we do it together?",
        "npcZh": "你可以画木头。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画木头"
      }
    ]
  },
  "forest-place-3": {
    "question": "Would you like to listen for the owl or look at the owl from a distance?",
    "zh": "你想先听猫头鹰的声音，还是远远看猫头鹰？",
    "paths": [
      {
        "pick": "Let us listen for the owl.",
        "zh": "我们听猫头鹰的声音吧。",
        "choices": [
          "Let us listen for the owl.",
          "I would like to listen for the owl."
        ],
        "npc": "You can listen for the owl. Are you ready to start?",
        "npcZh": "你可以听猫头鹰的声音。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：听猫头鹰的声音"
      },
      {
        "pick": "Let us look at the owl from a distance.",
        "zh": "我们远远看猫头鹰吧。",
        "choices": [
          "Let us look at the owl from a distance.",
          "I would like to look at the owl from a distance."
        ],
        "npc": "You can look at the owl from a distance. Are you ready to start?",
        "npcZh": "你可以远远看猫头鹰。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：远远看猫头鹰"
      }
    ]
  },
  "forest-place-4": {
    "question": "Would you like to listen to the frog or watch the frog hop?",
    "zh": "你想先听青蛙叫，还是看青蛙蹦跳？",
    "paths": [
      {
        "pick": "Let us listen to the frog.",
        "zh": "我们听青蛙叫吧。",
        "choices": [
          "Let us listen to the frog.",
          "I would like to listen to the frog."
        ],
        "npc": "You can listen to the frog. Would you like some help?",
        "npcZh": "你可以听青蛙叫。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：听青蛙叫"
      },
      {
        "pick": "Let us watch the frog hop.",
        "zh": "我们看青蛙蹦跳吧。",
        "choices": [
          "Let us watch the frog hop.",
          "I would like to watch the frog hop."
        ],
        "npc": "You can watch the frog hop. Would you like some help?",
        "npcZh": "你可以看青蛙蹦跳。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看青蛙蹦跳"
      }
    ]
  },
  "forest-place-5": {
    "question": "Would you like to look at the spider web or draw the spider web?",
    "zh": "你想先看蜘蛛网，还是画蜘蛛网？",
    "paths": [
      {
        "pick": "Let us look at the spider web.",
        "zh": "我们看蜘蛛网吧。",
        "choices": [
          "Let us look at the spider web.",
          "I would like to look at the spider web."
        ],
        "npc": "You can look at the spider web. Shall we do it together?",
        "npcZh": "你可以看蜘蛛网。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看蜘蛛网"
      },
      {
        "pick": "Let us draw the spider web.",
        "zh": "我们画蜘蛛网吧。",
        "choices": [
          "Let us draw the spider web.",
          "I would like to draw the spider web."
        ],
        "npc": "You can draw the spider web. Shall we do it together?",
        "npcZh": "你可以画蜘蛛网。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画蜘蛛网"
      }
    ]
  },
  "car-belt": {
    "question": "Would you like to fasten your seat belt or ask your parent to check your seat belt?",
    "zh": "你想先系好安全带，还是请家长检查安全带？",
    "paths": [
      {
        "pick": "Let us fasten my seat belt.",
        "zh": "我们系好安全带吧。",
        "choices": [
          "Let us fasten my seat belt.",
          "I would like to fasten my seat belt."
        ],
        "npc": "You can fasten your seat belt. Are you ready to start?",
        "npcZh": "你可以系好安全带。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：系好安全带"
      },
      {
        "pick": "Let us ask my parent to check my seat belt.",
        "zh": "我们请家长检查安全带吧。",
        "choices": [
          "Let us ask my parent to check my seat belt.",
          "I would like to ask my parent to check my seat belt."
        ],
        "npc": "You can ask your parent to check your seat belt. Are you ready to start?",
        "npcZh": "你可以请家长检查安全带。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请家长检查安全带"
      }
    ]
  },
  "car-window": {
    "question": "Would you like to look at the tree or look at the yellow bus?",
    "zh": "你想先看树，还是看黄公交车？",
    "paths": [
      {
        "pick": "Let us look at the tree.",
        "zh": "我们看树吧。",
        "choices": [
          "Let us look at the tree.",
          "I would like to look at the tree."
        ],
        "npc": "You can look at the tree. Would you like some help?",
        "npcZh": "你可以看树。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看树"
      },
      {
        "pick": "Let us look at the yellow bus.",
        "zh": "我们看黄公交车吧。",
        "choices": [
          "Let us look at the yellow bus.",
          "I would like to look at the yellow bus."
        ],
        "npc": "You can look at the yellow bus. Would you like some help?",
        "npcZh": "你可以看黄公交车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看黄公交车"
      }
    ]
  },
  "car-water": {
    "question": "Would you like to ask for a safe place to stop or wait until the car stops for water?",
    "zh": "你想先请求在安全地点停车，还是等车停好再喝水？",
    "paths": [
      {
        "pick": "Let us ask for a safe place to stop.",
        "zh": "我们请求在安全地点停车吧。",
        "choices": [
          "Let us ask for a safe place to stop.",
          "I would like to ask for a safe place to stop."
        ],
        "npc": "You can ask for a safe place to stop. Shall we do it together?",
        "npcZh": "你可以请求在安全地点停车。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：请求在安全地点停车"
      },
      {
        "pick": "Let us wait until the car stops for water.",
        "zh": "我们等车停好再喝水吧。",
        "choices": [
          "Let us wait until the car stops for water.",
          "I would like to wait until the car stops for water."
        ],
        "npc": "You can wait until the car stops for water. Shall we do it together?",
        "npcZh": "你可以等车停好再喝水。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：等车停好再喝水"
      }
    ]
  },
  "car-color": {
    "question": "Would you like to look at the blue car or look at the red car?",
    "zh": "你想先看蓝车，还是看红车？",
    "paths": [
      {
        "pick": "Let us look at the blue car.",
        "zh": "我们看蓝车吧。",
        "choices": [
          "Let us look at the blue car.",
          "I would like to look at the blue car."
        ],
        "npc": "You can look at the blue car. Are you ready to start?",
        "npcZh": "你可以看蓝车。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看蓝车"
      },
      {
        "pick": "Let us look at the red car.",
        "zh": "我们看红车吧。",
        "choices": [
          "Let us look at the red car.",
          "I would like to look at the red car."
        ],
        "npc": "You can look at the red car. Are you ready to start?",
        "npcZh": "你可以看红车。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看红车"
      }
    ]
  },
  "car-arrive": {
    "question": "Would you like to wait until the car stops or ask your parent when to get out?",
    "zh": "你想先等车停稳，还是问家长什么时候下车？",
    "paths": [
      {
        "pick": "Let us wait until the car stops.",
        "zh": "我们等车停稳吧。",
        "choices": [
          "Let us wait until the car stops.",
          "I would like to wait until the car stops."
        ],
        "npc": "You can wait until the car stops. Would you like some help?",
        "npcZh": "你可以等车停稳。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：等车停稳"
      },
      {
        "pick": "Let us ask my parent when to get out.",
        "zh": "我们问家长什么时候下车吧。",
        "choices": [
          "Let us ask my parent when to get out.",
          "I would like to ask my parent when to get out."
        ],
        "npc": "You can ask your parent when to get out. Would you like some help?",
        "npcZh": "你可以问家长什么时候下车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：问家长什么时候下车"
      }
    ]
  },
  "bus": {
    "question": "Would you like to wait for the bus or check the bus number?",
    "zh": "你想先等公交车，还是看公交车号码？",
    "paths": [
      {
        "pick": "Let us wait for the bus.",
        "zh": "我们等公交车吧。",
        "choices": [
          "Let us wait for the bus.",
          "I would like to wait for the bus."
        ],
        "npc": "You can wait for the bus. Shall we do it together?",
        "npcZh": "你可以等公交车。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：等公交车"
      },
      {
        "pick": "Let us check the bus number.",
        "zh": "我们看公交车号码吧。",
        "choices": [
          "Let us check the bus number.",
          "I would like to check the bus number."
        ],
        "npc": "You can check the bus number. Shall we do it together?",
        "npcZh": "你可以看公交车号码。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看公交车号码"
      }
    ]
  },
  "bus-route": {
    "question": "Would you like to ask which bus goes to the park or check the bus map?",
    "zh": "你想先问哪路车去公园，还是看公交线路图？",
    "paths": [
      {
        "pick": "Let us ask which bus goes to the park.",
        "zh": "我们问哪路车去公园吧。",
        "choices": [
          "Let us ask which bus goes to the park.",
          "I would like to ask which bus goes to the park."
        ],
        "npc": "You can ask which bus goes to the park. Are you ready to start?",
        "npcZh": "你可以问哪路车去公园。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问哪路车去公园"
      },
      {
        "pick": "Let us check the bus map.",
        "zh": "我们看公交线路图吧。",
        "choices": [
          "Let us check the bus map.",
          "I would like to check the bus map."
        ],
        "npc": "You can check the bus map. Are you ready to start?",
        "npcZh": "你可以看公交线路图。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看公交线路图"
      }
    ]
  },
  "bus-wait": {
    "question": "Would you like to wait at the bus stop or check the arrival time?",
    "zh": "你想先在车站等车，还是查看到站时间？",
    "paths": [
      {
        "pick": "Let us wait at the bus stop.",
        "zh": "我们在车站等车吧。",
        "choices": [
          "Let us wait at the bus stop.",
          "I would like to wait at the bus stop."
        ],
        "npc": "You can wait at the bus stop. Would you like some help?",
        "npcZh": "你可以在车站等车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：在车站等车"
      },
      {
        "pick": "Let us check the arrival time.",
        "zh": "我们查看到站时间吧。",
        "choices": [
          "Let us check the arrival time.",
          "I would like to check the arrival time."
        ],
        "npc": "You can check the arrival time. Would you like some help?",
        "npcZh": "你可以查看到站时间。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：查看到站时间"
      }
    ]
  },
  "bus-seat": {
    "question": "Would you like to offer your seat or ask whether the seat is free?",
    "zh": "你想先让座，还是问座位是否有人？",
    "paths": [
      {
        "pick": "Let us offer my seat.",
        "zh": "我们让座吧。",
        "choices": [
          "Let us offer my seat.",
          "I would like to offer my seat."
        ],
        "npc": "You can offer your seat. Shall we do it together?",
        "npcZh": "你可以让座。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：让座"
      },
      {
        "pick": "Let us ask whether the seat is free.",
        "zh": "我们问座位是否有人吧。",
        "choices": [
          "Let us ask whether the seat is free.",
          "I would like to ask whether the seat is free."
        ],
        "npc": "You can ask whether the seat is free. Shall we do it together?",
        "npcZh": "你可以问座位是否有人。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：问座位是否有人"
      }
    ]
  },
  "bus-stop-here": {
    "question": "Would you like to ask about the next stop or tell your parent it is our stop?",
    "zh": "你想先问下一站，还是告诉家长该下车了？",
    "paths": [
      {
        "pick": "Let us ask about the next stop.",
        "zh": "我们问下一站吧。",
        "choices": [
          "Let us ask about the next stop.",
          "I would like to ask about the next stop."
        ],
        "npc": "You can ask about the next stop. Are you ready to start?",
        "npcZh": "你可以问下一站。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：问下一站"
      },
      {
        "pick": "Let us tell my parent it is our stop.",
        "zh": "我们告诉家长该下车了吧。",
        "choices": [
          "Let us tell my parent it is our stop.",
          "I would like to tell my parent it is our stop."
        ],
        "npc": "You can tell your parent it is our stop. Are you ready to start?",
        "npcZh": "你可以告诉家长该下车了。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：告诉家长该下车了"
      }
    ]
  },
  "metro-ticket": {
    "question": "Would you like to buy one metro ticket or ask about tickets to the zoo?",
    "zh": "你想先买一张地铁票，还是询问去动物园的地铁票？",
    "paths": [
      {
        "pick": "Let us buy one metro ticket.",
        "zh": "我们买一张地铁票吧。",
        "choices": [
          "Let us buy one metro ticket.",
          "I would like to buy one metro ticket."
        ],
        "npc": "You can buy one metro ticket. Would you like some help?",
        "npcZh": "你可以买一张地铁票。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：买一张地铁票"
      },
      {
        "pick": "Let us ask about tickets to the zoo.",
        "zh": "我们询问去动物园的地铁票吧。",
        "choices": [
          "Let us ask about tickets to the zoo.",
          "I would like to ask about tickets to the zoo."
        ],
        "npc": "You can ask about tickets to the zoo. Would you like some help?",
        "npcZh": "你可以询问去动物园的地铁票。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：询问去动物园的地铁票"
      }
    ]
  },
  "metro-platform": {
    "question": "Would you like to find the platform or ask the staff for directions?",
    "zh": "你想先找站台，还是向工作人员问路？",
    "paths": [
      {
        "pick": "Let us find the platform.",
        "zh": "我们找站台吧。",
        "choices": [
          "Let us find the platform.",
          "I would like to find the platform."
        ],
        "npc": "You can find the platform. Shall we do it together?",
        "npcZh": "你可以找站台。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找站台"
      },
      {
        "pick": "Let us ask the staff for directions.",
        "zh": "我们向工作人员问路吧。",
        "choices": [
          "Let us ask the staff for directions.",
          "I would like to ask the staff for directions."
        ],
        "npc": "You can ask the staff for directions. Shall we do it together?",
        "npcZh": "你可以向工作人员问路。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向工作人员问路"
      }
    ]
  },
  "metro-line": {
    "question": "Would you like to look for line one or check the metro map?",
    "zh": "你想先找一号线，还是看地铁图？",
    "paths": [
      {
        "pick": "Let us look for line one.",
        "zh": "我们找一号线吧。",
        "choices": [
          "Let us look for line one.",
          "I would like to look for line one."
        ],
        "npc": "You can look for line one. Are you ready to start?",
        "npcZh": "你可以找一号线。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：找一号线"
      },
      {
        "pick": "Let us check the metro map.",
        "zh": "我们看地铁图吧。",
        "choices": [
          "Let us check the metro map.",
          "I would like to check the metro map."
        ],
        "npc": "You can check the metro map. Are you ready to start?",
        "npcZh": "你可以看地铁图。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：看地铁图"
      }
    ]
  },
  "metro-door": {
    "question": "Would you like to let people get off first or wait behind the yellow line?",
    "zh": "你想先先让乘客下车，还是在黄线后等候？",
    "paths": [
      {
        "pick": "Let us let people get off first.",
        "zh": "我们先让乘客下车吧。",
        "choices": [
          "Let us let people get off first.",
          "I would like to let people get off first."
        ],
        "npc": "You can let people get off first. Would you like some help?",
        "npcZh": "你可以先让乘客下车。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：先让乘客下车"
      },
      {
        "pick": "Let us wait behind the yellow line.",
        "zh": "我们在黄线后等候吧。",
        "choices": [
          "Let us wait behind the yellow line.",
          "I would like to wait behind the yellow line."
        ],
        "npc": "You can wait behind the yellow line. Would you like some help?",
        "npcZh": "你可以在黄线后等候。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：在黄线后等候"
      }
    ]
  },
  "metro-exit": {
    "question": "Would you like to find the exit or ask which exit goes to the park?",
    "zh": "你想先找出口，还是询问去公园走哪个出口？",
    "paths": [
      {
        "pick": "Let us find the exit.",
        "zh": "我们找出口吧。",
        "choices": [
          "Let us find the exit.",
          "I would like to find the exit."
        ],
        "npc": "You can find the exit. Shall we do it together?",
        "npcZh": "你可以找出口。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找出口"
      },
      {
        "pick": "Let us ask which exit goes to the park.",
        "zh": "我们询问去公园走哪个出口吧。",
        "choices": [
          "Let us ask which exit goes to the park.",
          "I would like to ask which exit goes to the park."
        ],
        "npc": "You can ask which exit goes to the park. Shall we do it together?",
        "npcZh": "你可以询问去公园走哪个出口。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：询问去公园走哪个出口"
      }
    ]
  },
  "train-ticket": {
    "question": "Would you like to show your train ticket or ask your parent for the tickets?",
    "zh": "你想先出示火车票，还是向家长要车票？",
    "paths": [
      {
        "pick": "Let us show my train ticket.",
        "zh": "我们出示火车票吧。",
        "choices": [
          "Let us show my train ticket.",
          "I would like to show my train ticket."
        ],
        "npc": "You can show your train ticket. Are you ready to start?",
        "npcZh": "你可以出示火车票。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：出示火车票"
      },
      {
        "pick": "Let us ask my parent for the tickets.",
        "zh": "我们向家长要车票吧。",
        "choices": [
          "Let us ask my parent for the tickets.",
          "I would like to ask my parent for the tickets."
        ],
        "npc": "You can ask your parent for the tickets. Are you ready to start?",
        "npcZh": "你可以向家长要车票。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：向家长要车票"
      }
    ]
  },
  "train-bag": {
    "question": "Would you like to put your bag beside your seat or ask for help with your bag?",
    "zh": "你想先把包放在座位旁，还是请人帮忙拿包？",
    "paths": [
      {
        "pick": "Let us put my bag beside my seat.",
        "zh": "我们把包放在座位旁吧。",
        "choices": [
          "Let us put my bag beside my seat.",
          "I would like to put my bag beside my seat."
        ],
        "npc": "You can put your bag beside your seat. Would you like some help?",
        "npcZh": "你可以把包放在座位旁。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：把包放在座位旁"
      },
      {
        "pick": "Let us ask for help with my bag.",
        "zh": "我们请人帮忙拿包吧。",
        "choices": [
          "Let us ask for help with my bag.",
          "I would like to ask for help with my bag."
        ],
        "npc": "You can ask for help with your bag. Would you like some help?",
        "npcZh": "你可以请人帮忙拿包。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：请人帮忙拿包"
      }
    ]
  },
  "train-seat": {
    "question": "Would you like to find your train seat or ask the conductor for help?",
    "zh": "你想先找火车座位，还是向列车员求助？",
    "paths": [
      {
        "pick": "Let us find my train seat.",
        "zh": "我们找火车座位吧。",
        "choices": [
          "Let us find my train seat.",
          "I would like to find my train seat."
        ],
        "npc": "You can find your train seat. Shall we do it together?",
        "npcZh": "你可以找火车座位。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：找火车座位"
      },
      {
        "pick": "Let us ask the conductor for help.",
        "zh": "我们向列车员求助吧。",
        "choices": [
          "Let us ask the conductor for help.",
          "I would like to ask the conductor for help."
        ],
        "npc": "You can ask the conductor for help. Shall we do it together?",
        "npcZh": "你可以向列车员求助。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向列车员求助"
      }
    ]
  },
  "train-time": {
    "question": "Would you like to check the train time or ask when the train leaves?",
    "zh": "你想先查看火车时间，还是询问火车何时出发？",
    "paths": [
      {
        "pick": "Let us check the train time.",
        "zh": "我们查看火车时间吧。",
        "choices": [
          "Let us check the train time.",
          "I would like to check the train time."
        ],
        "npc": "You can check the train time. Are you ready to start?",
        "npcZh": "你可以查看火车时间。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：查看火车时间"
      },
      {
        "pick": "Let us ask when the train leaves.",
        "zh": "我们询问火车何时出发吧。",
        "choices": [
          "Let us ask when the train leaves.",
          "I would like to ask when the train leaves."
        ],
        "npc": "You can ask when the train leaves. Are you ready to start?",
        "npcZh": "你可以询问火车何时出发。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：询问火车何时出发"
      }
    ]
  },
  "train-window": {
    "question": "Would you like to look at the river or look at the trees?",
    "zh": "你想先看河流，还是看树？",
    "paths": [
      {
        "pick": "Let us look at the river.",
        "zh": "我们看河流吧。",
        "choices": [
          "Let us look at the river.",
          "I would like to look at the river."
        ],
        "npc": "You can look at the river. Would you like some help?",
        "npcZh": "你可以看河流。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看河流"
      },
      {
        "pick": "Let us look at the trees.",
        "zh": "我们看树吧。",
        "choices": [
          "Let us look at the trees.",
          "I would like to look at the trees."
        ],
        "npc": "You can look at the trees. Would you like some help?",
        "npcZh": "你可以看树。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：看树"
      }
    ]
  },
  "airport-pass": {
    "question": "Would you like to show your boarding pass or ask your parent for the boarding passes?",
    "zh": "你想先出示登机牌，还是向家长要登机牌？",
    "paths": [
      {
        "pick": "Let us show my boarding pass.",
        "zh": "我们出示登机牌吧。",
        "choices": [
          "Let us show my boarding pass.",
          "I would like to show my boarding pass."
        ],
        "npc": "You can show your boarding pass. Shall we do it together?",
        "npcZh": "你可以出示登机牌。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：出示登机牌"
      },
      {
        "pick": "Let us ask my parent for the boarding passes.",
        "zh": "我们向家长要登机牌吧。",
        "choices": [
          "Let us ask my parent for the boarding passes.",
          "I would like to ask my parent for the boarding passes."
        ],
        "npc": "You can ask your parent for the boarding passes. Shall we do it together?",
        "npcZh": "你可以向家长要登机牌。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：向家长要登机牌"
      }
    ]
  },
  "airport-bag": {
    "question": "Would you like to carry your small bag or ask for help with the heavy bag?",
    "zh": "你想先拿自己的小包，还是请人帮忙拿大包？",
    "paths": [
      {
        "pick": "Let us carry my small bag.",
        "zh": "我们拿自己的小包吧。",
        "choices": [
          "Let us carry my small bag.",
          "I would like to carry my small bag."
        ],
        "npc": "You can carry your small bag. Are you ready to start?",
        "npcZh": "你可以拿自己的小包。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：拿自己的小包"
      },
      {
        "pick": "Let us ask for help with the heavy bag.",
        "zh": "我们请人帮忙拿大包吧。",
        "choices": [
          "Let us ask for help with the heavy bag.",
          "I would like to ask for help with the heavy bag."
        ],
        "npc": "You can ask for help with the heavy bag. Are you ready to start?",
        "npcZh": "你可以请人帮忙拿大包。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：请人帮忙拿大包"
      }
    ]
  },
  "airport-gate": {
    "question": "Would you like to find gate five or ask the staff about the gate?",
    "zh": "你想先找五号登机口，还是向工作人员询问登机口？",
    "paths": [
      {
        "pick": "Let us find gate five.",
        "zh": "我们找五号登机口吧。",
        "choices": [
          "Let us find gate five.",
          "I would like to find gate five."
        ],
        "npc": "You can find gate five. Would you like some help?",
        "npcZh": "你可以找五号登机口。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：找五号登机口"
      },
      {
        "pick": "Let us ask the staff about the gate.",
        "zh": "我们向工作人员询问登机口吧。",
        "choices": [
          "Let us ask the staff about the gate.",
          "I would like to ask the staff about the gate."
        ],
        "npc": "You can ask the staff about the gate. Would you like some help?",
        "npcZh": "你可以向工作人员询问登机口。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向工作人员询问登机口"
      }
    ]
  },
  "airport-plane": {
    "question": "Would you like to watch the plane or draw a plane?",
    "zh": "你想先看飞机，还是画飞机？",
    "paths": [
      {
        "pick": "Let us watch the plane.",
        "zh": "我们看飞机吧。",
        "choices": [
          "Let us watch the plane.",
          "I would like to watch the plane."
        ],
        "npc": "You can watch the plane. Shall we do it together?",
        "npcZh": "你可以看飞机。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：看飞机"
      },
      {
        "pick": "Let us draw a plane.",
        "zh": "我们画飞机吧。",
        "choices": [
          "Let us draw a plane.",
          "I would like to draw a plane."
        ],
        "npc": "You can draw a plane. Shall we do it together?",
        "npcZh": "你可以画飞机。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：画飞机"
      }
    ]
  },
  "airport-seat": {
    "question": "Would you like to ask for a window seat or ask for an aisle seat?",
    "zh": "你想先要靠窗座位，还是要靠过道座位？",
    "paths": [
      {
        "pick": "Let us ask for a window seat.",
        "zh": "我们要靠窗座位吧。",
        "choices": [
          "Let us ask for a window seat.",
          "I would like to ask for a window seat."
        ],
        "npc": "You can ask for a window seat. Are you ready to start?",
        "npcZh": "你可以要靠窗座位。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：要靠窗座位"
      },
      {
        "pick": "Let us ask for an aisle seat.",
        "zh": "我们要靠过道座位吧。",
        "choices": [
          "Let us ask for an aisle seat.",
          "I would like to ask for an aisle seat."
        ],
        "npc": "You can ask for an aisle seat. Are you ready to start?",
        "npcZh": "你可以要靠过道座位。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：要靠过道座位"
      }
    ]
  },
  "hotel-hello": {
    "question": "Would you like to say hello to the hotel clerk or tell the clerk your name?",
    "zh": "你想先向酒店前台问好，还是告诉前台名字？",
    "paths": [
      {
        "pick": "Let us say hello to the hotel clerk.",
        "zh": "我们向酒店前台问好吧。",
        "choices": [
          "Let us say hello to the hotel clerk.",
          "I would like to say hello to the hotel clerk."
        ],
        "npc": "You can say hello to the hotel clerk. Would you like some help?",
        "npcZh": "你可以向酒店前台问好。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：向酒店前台问好"
      },
      {
        "pick": "Let us tell the clerk my name.",
        "zh": "我们告诉前台名字吧。",
        "choices": [
          "Let us tell the clerk my name.",
          "I would like to tell the clerk my name."
        ],
        "npc": "You can tell the clerk your name. Would you like some help?",
        "npcZh": "你可以告诉前台名字。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：告诉前台名字"
      }
    ]
  },
  "hotel-key": {
    "question": "Would you like to ask for our room key or ask where our room is?",
    "zh": "你想先要房间钥匙，还是问房间在哪里？",
    "paths": [
      {
        "pick": "Let us ask for our room key.",
        "zh": "我们要房间钥匙吧。",
        "choices": [
          "Let us ask for our room key.",
          "I would like to ask for our room key."
        ],
        "npc": "You can ask for our room key. Shall we do it together?",
        "npcZh": "你可以要房间钥匙。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：要房间钥匙"
      },
      {
        "pick": "Let us ask where our room is.",
        "zh": "我们问房间在哪里吧。",
        "choices": [
          "Let us ask where our room is.",
          "I would like to ask where our room is."
        ],
        "npc": "You can ask where our room is. Shall we do it together?",
        "npcZh": "你可以问房间在哪里。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：问房间在哪里"
      }
    ]
  },
  "hotel-towel": {
    "question": "Would you like to ask for one clean towel or ask for two clean towels?",
    "zh": "你想先要一条干净毛巾，还是要两条干净毛巾？",
    "paths": [
      {
        "pick": "Let us ask for one clean towel.",
        "zh": "我们要一条干净毛巾吧。",
        "choices": [
          "Let us ask for one clean towel.",
          "I would like to ask for one clean towel."
        ],
        "npc": "You can ask for one clean towel. Are you ready to start?",
        "npcZh": "你可以要一条干净毛巾。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：要一条干净毛巾"
      },
      {
        "pick": "Let us ask for two clean towels.",
        "zh": "我们要两条干净毛巾吧。",
        "choices": [
          "Let us ask for two clean towels.",
          "I would like to ask for two clean towels."
        ],
        "npc": "You can ask for two clean towels. Are you ready to start?",
        "npcZh": "你可以要两条干净毛巾。你准备好开始了吗？",
        "answer": "Yes, I am ready.",
        "answerZh": "是的，我准备好了。",
        "answers": [
          "Yes, I am ready.",
          "Yes, I am ready to start."
        ],
        "end": "Thank you for trying, UU.",
        "endZh": "谢谢你愿意尝试，UU。",
        "endAnswer": "Thank you for your help.",
        "endAnswerZh": "谢谢你的帮助。",
        "endAnswers": [
          "Thank you for your help.",
          "Thanks for helping me."
        ],
        "result": "一起完成：要两条干净毛巾"
      }
    ]
  },
  "hotel-breakfast": {
    "question": "Would you like to ask where breakfast is or ask what time breakfast starts?",
    "zh": "你想先问在哪里吃早餐，还是问早餐几点开始？",
    "paths": [
      {
        "pick": "Let us ask where breakfast is.",
        "zh": "我们问在哪里吃早餐吧。",
        "choices": [
          "Let us ask where breakfast is.",
          "I would like to ask where breakfast is."
        ],
        "npc": "You can ask where breakfast is. Would you like some help?",
        "npcZh": "你可以问在哪里吃早餐。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：问在哪里吃早餐"
      },
      {
        "pick": "Let us ask what time breakfast starts.",
        "zh": "我们问早餐几点开始吧。",
        "choices": [
          "Let us ask what time breakfast starts.",
          "I would like to ask what time breakfast starts."
        ],
        "npc": "You can ask what time breakfast starts. Would you like some help?",
        "npcZh": "你可以问早餐几点开始。你需要帮忙吗？",
        "answer": "Yes, please help me.",
        "answerZh": "好的，请帮帮我。",
        "answers": [
          "Yes, please help me.",
          "Yes, I would like some help, please."
        ],
        "end": "We did it together, UU.",
        "endZh": "我们一起完成了，UU。",
        "endAnswer": "Thank you for helping me.",
        "endAnswerZh": "谢谢你帮我。",
        "endAnswers": [
          "Thank you for helping me.",
          "Thanks for your help."
        ],
        "result": "一起完成：问早餐几点开始"
      }
    ]
  },
  "hotel-leave": {
    "question": "Would you like to check that we have our bags or return the room key?",
    "zh": "你想先检查行李是否带齐，还是归还房间钥匙？",
    "paths": [
      {
        "pick": "Let us check that we have our bags.",
        "zh": "我们检查行李是否带齐吧。",
        "choices": [
          "Let us check that we have our bags.",
          "I would like to check that we have our bags."
        ],
        "npc": "You can check that we have our bags. Shall we do it together?",
        "npcZh": "你可以检查行李是否带齐。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：检查行李是否带齐"
      },
      {
        "pick": "Let us return the room key.",
        "zh": "我们归还房间钥匙吧。",
        "choices": [
          "Let us return the room key.",
          "I would like to return the room key."
        ],
        "npc": "You can return the room key. Shall we do it together?",
        "npcZh": "你可以归还房间钥匙。我们一起做，好吗？",
        "answer": "Yes, let us do it together.",
        "answerZh": "好，我们一起做。",
        "answers": [
          "Yes, let us do it together.",
          "Yes, let us try together."
        ],
        "end": "Thank you for joining me, UU.",
        "endZh": "谢谢你和我一起，UU。",
        "endAnswer": "You are welcome.",
        "endAnswerZh": "不客气。",
        "endAnswers": [
          "You are welcome.",
          "You are very welcome."
        ],
        "result": "一起完成：归还房间钥匙"
      }
    ]
  }
};

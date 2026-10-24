(() => {
  // Each entry: identity, situation, picture, target object, first exchange, second exchange.
  const groups = [
    ['home','家里','🏡','在熟悉的小家里，把英语放进生活。',[
      ['breakfast','早餐点单','🥛','milk','牛奶','What would you like?','你想喝什么？','Milk, please.','请给我牛奶。','Anything else?','还想要什么？','An apple, please.','请再给我一个苹果。'],
      ['wardrobe','出门穿衣','👒','hat','帽子','What is this?','这是什么？','My red hat.','我的红帽子。','Are you ready?','准备好了吗？','Yes, I am!','准备好啦！'],
      ['toys','一起收玩具','🧸','ball','皮球','What is this?','这是什么？','A red ball.','一个红色皮球。','Where does it go?','它放在哪里？','In the red box.','在红色箱子里。'],
      ['birthday','生日祝福','🎂','cake','蛋糕','It is my birthday!','今天是我的生日！','Happy birthday!','生日快乐！','Would you like some cake?','你想吃点蛋糕吗？','Yes, please.','好的，谢谢。'],
      ['home-sleep','睡前道晚安','🛏️','bed','床','It is bedtime.','该睡觉了。','Good night!','晚安！','See you in the morning.','明早见。','See you tomorrow!','明天见！']
    ]],
    ['school','学校','🏫','和老师、同学打招呼，一起上课。',[
      ['school-hello','认识新同学','👋','friend','朋友','Hello! What is your name?','你好！你叫什么名字？','My name is UU.','我叫 UU。','Nice to meet you!','很高兴认识你！','Nice to meet you too!','我也很高兴认识你！'],
      ['school-pencil','借一支铅笔','✏️','pencil','铅笔','What do you need?','你需要什么？','A pencil, please.','请给我一支铅笔。','Here you are.','给你。','Thank you!','谢谢！'],
      ['school-help','请老师帮忙','🙋','teacher','老师','Do you need help?','你需要帮助吗？','Help me, please.','请帮帮我。','Let us do it together.','我们一起试试。','Thank you, teacher.','谢谢老师。'],
      ['school-water','课间喝点水','💧','water','水','Are you thirsty?','你渴了吗？','Yes, I am.','是的，我渴了。','What would you like?','你想喝什么？','Water, please.','请给我水。'],
      ['school-share','和同学分享','📚','book','书','Is this your book?','这是你的书吗？','Yes, it is.','是的。','Can I read it?','我可以读一读吗？','Here you are.','给你。']
    ]],
    ['park','公园','🌳','找宝藏、照顾植物，也和伙伴一起玩。',[
      ['park','树下寻宝','🐦','bird','小鸟','Where is the treasure?','宝藏在哪里？','Under the tree.','在树下面。','Can you find it?','你能找到吗？','Yes! Here it is!','能！它在这里！'],
      ['garden','种子小园丁','🌱','seed','种子','What do we plant?','我们种什么？','A little seed.','一颗小种子。','What shall we say?','我们对它说什么？','Grow, little seed!','长大吧，小种子！'],
      ['weather','雨天带好伞','☔','umbrella','雨伞','What is the weather like?','天气怎么样？','It is raining.','正在下雨。','What do you need?','你需要什么？','My umbrella, please.','请给我我的雨伞。'],
      ['park-picnic','一起去野餐','🧺','apple','苹果','Would you like an apple?','你想吃苹果吗？','Yes, please.','好的，谢谢。','Is it yummy?','好吃吗？','It is yummy!','真好吃！'],
      ['park-play','邀请一起玩','⚽','ball','皮球','What do you want to do?','你想做什么？','Let us play!','我们一起玩吧！','Can I play too?','我也可以玩吗？','Come and join us!','来加入我们吧！']
    ]],
    ['amusement','游乐园','🎡','坐小火车、排队，和朋友分享快乐。',[
      ['fun-ticket','买游乐园门票','🎟️','ticket','门票','How many tickets?','要几张票？','One ticket, please.','请给我一张票。','Are you ready for some fun?','准备好去玩了吗？','Yes, I am!','准备好啦！'],
      ['fun-wheel','坐上摩天轮','🎡','wheel','摩天轮','What do you want to ride?','你想坐什么？','The big wheel, please.','我想坐摩天轮。','Can you see the park?','你看得见公园吗？','Yes! It is beautiful!','看得见！真漂亮！'],
      ['fun-queue','排队等一等','🚶','line','队伍','Where do we wait?','我们在哪里等？','In this line.','在这条队伍里。','Is it our turn?','轮到我们了吗？','Not yet. Let us wait.','还没有，我们等一等。'],
      ['fun-train','乘坐游乐小火车','🚂','train','小火车','What do you want to ride?','你想坐什么？','The little train, please.','我想坐小火车。','Shall we go?','我们出发吗？','Let us go!','出发吧！'],
      ['fun-balloon','挑一个气球','🎈','balloon','气球','Which balloon do you like?','你喜欢哪个气球？','The red one, please.','请给我红色的那个。','Do you like it?','你喜欢它吗？','I love it!','我太喜欢啦！']
    ]],
    ['mall','商场','🛍️','买水果、试衣服，礼貌表达自己的需要。',[
      ['market','买两个苹果','🍎','apple','苹果','What would you like?','你想买什么？','Two apples, please.','请给我两个苹果。','Here you are.','给你。','Thank you!','谢谢！'],
      ['mall-size','试试小鞋子','👟','shoes','鞋子','Can I help you?','需要帮忙吗？','Shoes, please.','我想看看鞋子。','Are they too big?','它们太大了吗？','Yes. A smaller pair, please.','是的，请给我小一点的。'],
      ['mall-price','问问多少钱','🧸','teddy','小熊玩偶','Do you like this teddy?','你喜欢这只小熊吗？','Yes. How much is it?','喜欢，它多少钱？','It is ten yuan.','十元。','Thank you!','谢谢！'],
      ['mall-toilet','找洗手间','🚻','toilet','洗手间','Can I help you?','需要帮忙吗？','Where is the toilet?','洗手间在哪里？','It is over there.','在那边。','Thank you for your help.','谢谢你的帮助。'],
      ['mall-bag','请给一个袋子','🛍️','bag','袋子','Do you need a bag?','你需要袋子吗？','Yes, please.','是的，谢谢。','A big bag or a small bag?','大袋子还是小袋子？','A small bag, please.','请给我一个小袋子。']
    ]],
    ['bus-stop','公交车站','🚏','认车、问路、上车，也学会礼貌让座。',[
      ['bus','红灯停绿灯行','🚌','bus','公交车','Where are you?','你在哪里？','On the bus.','在公交车上。','Is the light green?','绿灯亮了吗？','Yes. Let us go!','亮了，出发吧！'],
      ['bus-route','问问这辆车','🗺️','map','地图','Where do you want to go?','你想去哪里？','To the park, please.','我想去公园。','This bus goes to the park.','这辆车去公园。','Thank you!','谢谢！'],
      ['bus-wait','等车不着急','⌚','clock','时钟','Is the bus here?','公交车来了吗？','Not yet.','还没有。','What shall we do?','我们做什么呢？','Let us wait here.','我们在这里等吧。'],
      ['bus-seat','礼貌让个座','💺','seat','座位','Is this seat free?','这个座位有人吗？','Please sit here.','请坐这里。','Thank you!','谢谢你！','You are welcome.','不客气。'],
      ['bus-stop-here','到站下车啦','🔔','bell','铃铛','Where do you get off?','你在哪里下车？','At the next stop.','在下一站。','This is your stop.','你到站啦。','Thank you. Goodbye!','谢谢，再见！']
    ]],
    ['subway','地铁站','🚇','买票、找站台，听懂乘车中的小交流。',[
      ['metro-ticket','买一张地铁票','🎫','ticket','车票','Where are you going?','你要去哪里？','To the zoo, please.','我想去动物园。','How many tickets?','要几张票？','One ticket, please.','请给我一张票。'],
      ['metro-platform','找到站台','🚉','platform','站台','Do you need help?','需要帮忙吗？','Where is the platform?','站台在哪里？','Please go this way.','请走这边。','Thank you!','谢谢！'],
      ['metro-line','看看路线图','🗺️','map','地图','Which line do you need?','你要坐哪条线？','Line one, please.','一号线。','Here is the map.','地图在这里。','Thank you for your help.','谢谢你的帮助。'],
      ['metro-door','先下车再上车','🚪','door','车门','Can we get on now?','现在能上车吗？','Let us wait.','我们等一等。','Now it is our turn.','现在轮到我们啦。','Let us get on.','我们上车吧。'],
      ['metro-exit','从哪个出口走','↗️','exit','出口','What are you looking for?','你在找什么？','Where is the exit?','出口在哪里？','The exit is over there.','出口在那边。','Thank you!','谢谢！']
    ]],
    ['train-station','火车站','🚉','准备车票和行李，找到座位再出发。',[
      ['train-ticket','出示小车票','🎫','ticket','车票','Your ticket, please.','请出示车票。','Here is my ticket.','这是我的车票。','Thank you. Come in.','谢谢，请进。','Thank you!','谢谢！'],
      ['train-bag','找到自己的行李','🧳','bag','行李包','Which bag is yours?','哪个包是你的？','The blue bag is mine.','蓝色的包是我的。','Is this your bag?','这是你的包吗？','Yes, it is.','是的。'],
      ['train-seat','找到我的座位','💺','seat','座位','Can I help you?','需要帮忙吗？','Where is my seat?','我的座位在哪里？','Your seat is here.','你的座位在这里。','Thank you!','谢谢！'],
      ['train-time','火车几点出发','🕙','clock','时钟','What do you want to know?','你想问什么？','What time is the train?','火车几点出发？','At ten o’clock.','十点。','Thank you!','谢谢！'],
      ['train-window','看看窗外风景','🪟','window','窗户','What can you see?','你看见了什么？','I can see a tree.','我看见一棵树。','Can you see a river?','你看见河了吗？','Yes! A blue river!','看见啦，一条蓝色的河！']
    ]],
    ['restaurant','餐厅','🍽️','点餐、要水、表达喜好，吃完说谢谢。',[
      ['cafe-menu','看看菜单','📋','menu','菜单','What do you need?','你需要什么？','The menu, please.','请给我菜单。','Here you are.','给你。','Thank you!','谢谢！'],
      ['cafe-noodles','点一碗面条','🍜','noodles','面条','What would you like?','你想吃什么？','Noodles, please.','请给我面条。','Anything to drink?','想喝点什么吗？','Water, please.','请给我水。'],
      ['cafe-water','请加一点水','🥤','water','水','Would you like more water?','你还想要点水吗？','Yes, please.','好的，谢谢。','Here is your water.','这是你的水。','Thank you!','谢谢！'],
      ['cafe-taste','说说我喜欢什么','🍚','rice','米饭','Do you like rice?','你喜欢米饭吗？','Yes, I do.','是的，我喜欢。','Is it yummy?','好吃吗？','It is yummy!','真好吃！'],
      ['cafe-finish','吃好啦说谢谢','🥄','spoon','勺子','Are you finished?','你吃好了吗？','Yes, thank you.','吃好了，谢谢。','Did you enjoy your meal?','你喜欢这顿饭吗？','Yes. It was yummy!','喜欢，真好吃！']
    ]],
    ['library','图书馆','📚','找书、借书、归还，轻声交流。',[
      ['library-find','找一本动物书','📗','book','书','What book would you like?','你想看什么书？','An animal book, please.','我想看动物书。','Here is a book for you.','给你一本书。','Thank you!','谢谢！'],
      ['library-borrow','我能借这本吗','📕','book','书','Do you like this book?','你喜欢这本书吗？','Yes. Can I borrow it?','喜欢，我可以借吗？','Yes, you can.','可以。','Thank you!','谢谢！'],
      ['library-quiet','轻一点说话','🤫','voice','声音','Let us use a quiet voice.','我们轻声说话吧。','Okay. I will be quiet.','好的，我会轻一点。','Thank you for being kind.','谢谢你的体贴。','You are welcome.','不客气。'],
      ['library-read','邀请一起阅读','📖','book','书','What shall we do?','我们做什么呢？','Let us read together.','我们一起读书吧。','Which book do you like?','你喜欢哪本书？','The picture book, please.','我喜欢图画书。'],
      ['library-return','把书还回去','📚','book','书','Can I help you?','需要帮忙吗？','I want to return this book.','我想归还这本书。','Put it here, please.','请放在这里。','Here you are. Thank you!','给你，谢谢！']
    ]],
    ['clinic','医院','🏥','说说哪里不舒服，也表达自己的感受。',[
      ['clinic-hello','和医生打招呼','🩺','doctor','医生','Hello! How are you?','你好，你怎么样？','Hello, doctor.','医生你好。','What is your name?','你叫什么名字？','My name is UU.','我叫 UU。'],
      ['clinic-tummy','肚子不舒服','🤕','tummy','肚子','How do you feel?','你感觉怎么样？','My tummy hurts.','我的肚子疼。','Can you point to your tummy?','你能指指肚子吗？','Right here.','就在这里。'],
      ['clinic-head','头有一点疼','🤒','head','头','What is wrong?','哪里不舒服？','My head hurts.','我的头疼。','Would you like to sit down?','你想坐下吗？','Yes, please.','好的，谢谢。'],
      ['clinic-scared','我有一点害怕','🧸','teddy','小熊玩偶','How do you feel?','你感觉怎么样？','I feel scared.','我有点害怕。','Would you like your teddy?','你想抱着小熊吗？','Yes, please.','好的，谢谢。'],
      ['clinic-thanks','谢谢你的照顾','💐','flower','花','How do you feel now?','你现在感觉怎么样？','I feel better.','我感觉好些了。','I am glad to hear that.','听到这个真好。','Thank you, doctor.','谢谢医生。']
    ]],
    ['zoo','动物园','🦁','认识动物朋友，问候、观察、爱护它们。',[
      ['animals','动物朋友小食堂','🐰','rabbit','兔子','Are you hungry?','你饿了吗？','Yes, I am!','是呀！','Would you like a carrot?','你想吃胡萝卜吗？','Yes, please.','好的，谢谢。'],
      ['zoo-panda','看看大熊猫','🐼','panda','熊猫','What can you see?','你看见了什么？','I can see a panda.','我看见一只熊猫。','What color is it?','它是什么颜色的？','Black and white.','黑白色。'],
      ['zoo-monkey','小猴子在做什么','🐒','monkey','猴子','What is the monkey doing?','猴子在做什么？','It is climbing.','它正在爬。','Do you like monkeys?','你喜欢猴子吗？','Yes, I do.','是的，我喜欢。'],
      ['zoo-giraffe','长颈鹿好高呀','🦒','giraffe','长颈鹿','What is that animal?','那是什么动物？','It is a giraffe.','那是一只长颈鹿。','Is it tall?','它高吗？','It is very tall!','它非常高！'],
      ['zoo-kind','爱护动物朋友','🦆','duck','鸭子','Can we give it our food?','我们能把自己的食物给它吗？','Let us ask the keeper.','我们问问饲养员吧。','Please watch quietly.','请安静地观察。','Okay. I will be quiet.','好的，我会安静一点。']
    ]]
  ];
  groups.push(
    ['airport','机场','✈️','准备登机牌，找到登机口，和家人安心出发。',[
      ['airport-pass','出示登机牌','🎫','boarding pass','登机牌','Your boarding pass, please.','请出示登机牌。','Here you are.','给你。','Are you traveling with your family?','你和家人一起出行吗？','Yes, I am.','是的。'],
      ['airport-bag','托运行李','🧳','bag','行李包','Which bag is yours?','哪个包是你的？','The blue bag is mine.','蓝色的包是我的。','Is it heavy?','它重吗？','Yes. Help me, please.','重，请帮帮我。'],
      ['airport-gate','寻找登机口','🚪','gate','登机口','Do you need help?','需要帮忙吗？','Where is gate five?','五号登机口在哪里？','It is this way.','在这边。','Thank you!','谢谢！'],
      ['airport-plane','看飞机起飞','🛫','plane','飞机','What can you see?','你看见了什么？','I can see a plane.','我看见一架飞机。','Is it big or small?','它大还是小？','It is very big!','它非常大！'],
      ['airport-seat','飞机上找座位','💺','seat','座位','Can I help you?','需要帮忙吗？','Where is my seat?','我的座位在哪里？','Your seat is by the window.','你的座位靠窗。','Thank you for your help.','谢谢你的帮助。']
    ]],
    ['car','汽车','🚗','系好安全带，和家人一起去兜风。',[
      ['car-belt','出发先系安全带','🔒','seat belt','安全带','Is your seat belt on?','你系好安全带了吗？','Yes. I am ready!','是的，我准备好啦！','Where shall we go?','我们去哪里？','To the park, please.','我想去公园。'],
      ['car-window','看看车窗外','🪟','window','车窗','What can you see?','你看见了什么？','I can see a tree.','我看见一棵树。','Can you see a bus?','你看见公交车了吗？','Yes! A yellow bus!','看见啦，一辆黄色公交车！'],
      ['car-water','路上想喝水','🥤','water','水','Are you thirsty?','你渴了吗？','Water, please.','请给我水。','Let us stop in a safe place.','我们在安全的地方停车吧。','Okay. Thank you!','好的，谢谢！'],
      ['car-color','认认家里的车','🚙','car','汽车','Which car is ours?','哪辆是我们的车？','The blue car.','蓝色的车。','Is it over there?','它在那边吗？','Yes. There it is!','是的，它在那里！'],
      ['car-arrive','我们到了吗','🅿️','sign','标志牌','Are we there yet?','我们到了吗？','Not yet.','还没有。','Now we are here!','现在我们到啦！','Let us get out!','我们下车吧！']
    ]],
    ['body','身体','👐','做动作、玩猜谜，认识自己的身体。',[
      ['body-eyes','眼睛看一看','👀','eyes','眼睛','What do you use to see?','你用什么看东西？','My eyes.','我的眼睛。','Can you close your eyes?','你能闭上眼睛吗？','Yes, I can!','我能！'],
      ['body-ears','耳朵听一听','👂','ear','耳朵','What do you use to hear?','你用什么听声音？','My ears.','我的耳朵。','Can you hear the music?','你听见音乐了吗？','Yes. I can hear it!','听见啦！'],
      ['body-nose','鼻子闻一闻','👃','nose','鼻子','What is this?','这是什么？','My nose.','我的鼻子。','Can you smell the flower?','你能闻闻花吗？','It smells nice!','它真香！'],
      ['body-hands','洗洗小手','👐','hands','手','What do we wash before eating?','吃饭前我们要洗什么？','Our hands.','我们的手。','Are your hands clean now?','现在你的手干净了吗？','Yes. Nice and clean!','是的，干干净净！'],
      ['body-feet','小脚动起来','🦶','foot','脚','Can you stamp your feet?','你能跺跺脚吗？','Yes, I can!','我能！','Can you jump?','你能跳一跳吗？','Look! I can jump!','看，我会跳！']
    ]],
    ['animal-friends','动物','🐾','遇见宠物和农场朋友，问一问、学一学。',[
      ['pet-cat','遇见小猫','🐱','cat','猫','What animal is this?','这是什么动物？','It is a cat.','这是一只猫。','What does a cat say?','猫怎么叫？','Meow, meow!','喵，喵！'],
      ['pet-dog','和小狗打招呼','🐶','dog','狗','Is this your dog?','这是你的狗吗？','Yes, it is.','是的。','What is its name?','它叫什么名字？','Its name is Coco.','它叫可可。'],
      ['farm-cow','农场里的奶牛','🐄','cow','奶牛','What can you see on the farm?','你在农场看见了什么？','I can see a cow.','我看见一头奶牛。','What does a cow say?','奶牛怎么叫？','Moo, moo!','哞，哞！'],
      ['farm-duck','小鸭在游泳','🦆','duck','鸭子','What animal is swimming?','什么动物正在游泳？','A little duck.','一只小鸭子。','Can you swim too?','你也会游泳吗？','Yes, I can.','我会。'],
      ['pet-rabbit','照顾小兔子','🐰','rabbit','兔子','What does the rabbit like?','兔子喜欢什么？','It likes carrots.','它喜欢胡萝卜。','Is the rabbit hungry?','兔子饿了吗？','Yes. Let us ask the keeper.','是的，我们问问饲养员吧。']
    ]],
    ['fruit','水果','🍉','挑选水果、分享味道，把喜欢说出来。',[
      ['fruit-apple','分享一个苹果','🍎','apple','苹果','Would you like an apple?','你想吃苹果吗？','Yes, please.','好的，谢谢。','What color is it?','它是什么颜色的？','It is red.','它是红色的。'],
      ['fruit-banana','剥一根香蕉','🍌','banana','香蕉','What fruit do you like?','你喜欢什么水果？','I like bananas.','我喜欢香蕉。','Can you peel this banana?','你能剥这根香蕉吗？','Yes, I can!','我能！'],
      ['fruit-orange','尝尝小橙子','🍊','orange','橙子','What is this fruit?','这是什么水果？','It is an orange.','这是一个橙子。','Is it sweet?','它甜吗？','Yes. It is sweet!','是的，它很甜！'],
      ['fruit-grapes','一起吃葡萄','🍇','grapes','葡萄','Would you like some grapes?','你想吃点葡萄吗？','Yes, please.','好的，谢谢。','Let us wash them first.','我们先洗一洗吧。','Okay. Let us wash them!','好，我们来洗吧！'],
      ['fruit-watermelon','切开大西瓜','🍉','watermelon','西瓜','Is this watermelon big?','这个西瓜大吗？','It is very big!','它非常大！','Would you like a piece?','你想吃一块吗？','A small piece, please.','请给我一小块。']
    ]],
    ['vegetables','蔬菜','🥦','认认菜篮里的新朋友，一起准备一顿饭。',[
      ['veg-carrot','找到胡萝卜','🥕','carrot','胡萝卜','What vegetable is this?','这是什么蔬菜？','It is a carrot.','这是一根胡萝卜。','What color is it?','它是什么颜色的？','It is orange.','它是橙色的。'],
      ['veg-tomato','挑选小番茄','🍅','tomato','番茄','What would you like?','你想要什么？','Two tomatoes, please.','请给我两个番茄。','Do you like tomatoes?','你喜欢番茄吗？','Yes, I do.','是的，我喜欢。'],
      ['veg-potato','帮忙洗土豆','🥔','potato','土豆','Can you help me?','你能帮帮我吗？','Yes. What can I do?','能，我可以做什么？','Please wash this potato.','请洗洗这个土豆。','Okay. I can do it!','好，我能做到！'],
      ['veg-cucumber','清脆的小黄瓜','🥒','cucumber','黄瓜','What is this?','这是什么？','It is a cucumber.','这是一根黄瓜。','Is it green?','它是绿色的吗？','Yes. It is green.','是的，它是绿色的。'],
      ['veg-broccoli','尝尝西兰花','🥦','broccoli','西兰花','Would you like some broccoli?','你想吃点西兰花吗？','A little, please.','请给我一点。','What does it look like?','它看起来像什么？','A little tree!','一棵小树！']
    ]],
    ['colors','颜色','🎨','用颜色找东西、选画笔，画出彩色世界。',[
      ['color-red','找找红色','🔴','red','红色','What color do you like?','你喜欢什么颜色？','I like red.','我喜欢红色。','Can you find something red?','你能找到红色的东西吗？','Look! A red apple!','看，一个红苹果！'],
      ['color-blue','天空是什么颜色','🔵','blue','蓝色','What color is the sky?','天空是什么颜色的？','It is blue.','它是蓝色的。','Would you like the blue pencil?','你想要蓝色铅笔吗？','Yes, please.','好的，谢谢。'],
      ['color-yellow','画个小太阳','🟡','yellow','黄色','What are you drawing?','你在画什么？','A yellow sun.','一个黄色的太阳。','Can I have the yellow pencil?','我能用黄色铅笔吗？','Here you are.','给你。'],
      ['color-green','树叶的颜色','🟢','green','绿色','What color are the leaves?','树叶是什么颜色的？','They are green.','它们是绿色的。','Do you like green?','你喜欢绿色吗？','Yes, I do.','是的，我喜欢。'],
      ['color-purple','选一支紫色画笔','🟣','purple','紫色','Which pencil would you like?','你想要哪支铅笔？','The purple one, please.','请给我紫色的那支。','What will you draw?','你要画什么？','A purple flower.','一朵紫色的花。']
    ]]
  );
  groups.push(
    ["kitchen", "厨房", "🥣", "摆好餐具，和家人一起准备开饭。", [
      ["kitchen-spoon", "请给一把勺子", "🥄", "spoon", "勺子", "What do you need?", "你需要什么？", "A spoon, please.", "请给我一把勺子。", "Is this one okay?", "这把可以吗？", "Yes. Thank you!", "可以，谢谢！"],
      ["kitchen-bowl", "选一只小碗", "🥣", "bowl", "碗", "Which bowl would you like?", "你想要哪只碗？", "The small bowl, please.", "请给我小碗。", "What is it for?", "用它盛什么呢？", "It is for my soup.", "用它盛我的汤。"],
      ["kitchen-cup", "帮忙摆杯子", "☕", "cup", "杯子", "Can you help set the table?", "你能帮忙摆餐桌吗？", "Yes. Here are the cups.", "能，杯子在这里。", "Where do they go?", "它们放在哪里？", "On the table.", "放在桌子上。"],
      ["kitchen-plate", "请递一个盘子", "🍽️", "plate", "盘子", "Can you pass me a plate?", "你能递给我一个盘子吗？", "Here you are.", "给你。", "Would you like some bread?", "你想吃点面包吗？", "Yes, please.", "好的，谢谢。"],
      ["kitchen-bottle", "带上我的水瓶", "🍼", "bottle", "瓶子", "Where is your water bottle?", "你的水瓶在哪里？", "It is in my bag.", "在我的包里。", "Is it full?", "它装满了吗？", "Yes. I am ready!", "是的，我准备好了！"]
    ]],
    ["bathroom", "浴室", "🪥", "洗手、刷牙、梳头，把英语放进每天的好习惯。", [
      ["bathroom-soap", "用肥皂洗手", "🧼", "soap", "肥皂", "What do you need to wash your hands?", "洗手要用什么？", "Some soap, please.", "请给我一些肥皂。", "Are your hands clean?", "手洗干净了吗？", "Yes. Nice and clean!", "是的，干干净净！"],
      ["bathroom-towel", "找我的小毛巾", "🧺", "towel", "毛巾", "Which towel is yours?", "哪条毛巾是你的？", "The yellow towel.", "黄色的毛巾。", "Can you dry your hands?", "你能擦干手吗？", "Yes, I can.", "我能。"],
      ["bathroom-teeth", "早晚刷刷牙", "🪥", "toothbrush", "牙刷", "Where is your toothbrush?", "你的牙刷在哪里？", "It is by the sink.", "在洗手池旁边。", "Shall we brush our teeth?", "我们刷牙吧？", "Yes. Let us brush!", "好，我们刷牙吧！"],
      ["bathroom-comb", "自己梳梳头", "🪮", "comb", "梳子", "Can you comb your hair?", "你会梳头吗？", "Yes. I can do it.", "会，我能自己来。", "Do you need a mirror?", "你需要镜子吗？", "Yes, please.", "好的，谢谢。"],
      ["bathroom-tissue", "需要一张纸巾", "🧻", "tissue", "纸巾", "Do you need a tissue?", "你需要纸巾吗？", "Yes, please.", "好的，谢谢。", "Where does the used tissue go?", "用过的纸巾放哪里？", "In the bin.", "放进垃圾桶里。"]
    ]],
    ["bedroom", "卧室", "🛏️", "准备衣服、整理房间，轻松迎接新一天。", [
      ["bedroom-bed", "起床整理小床", "🛏️", "bed", "床", "Are you awake?", "你醒了吗？", "Good morning!", "早上好！", "Shall we make the bed?", "我们整理床铺吧？", "Yes. Let us do it!", "好，我们来整理！"],
      ["bedroom-shirt", "挑一件上衣", "👕", "shirt", "上衣", "What will you wear today?", "你今天穿什么？", "My blue shirt.", "我的蓝色上衣。", "Is it clean?", "它干净吗？", "Yes, it is.", "是的，很干净。"],
      ["bedroom-window", "打开小窗户", "🪟", "window", "窗户", "Is it sunny outside?", "外面有太阳吗？", "Yes. It is sunny!", "有，是晴天！", "Shall we open the window?", "我们打开窗户吧？", "Yes, please.", "好呀。"],
      ["bedroom-clock", "看看现在几点", "⏰", "clock", "时钟", "What time is it?", "现在几点了？", "It is seven.", "七点了。", "Is it time to get up?", "该起床了吗？", "Yes. I am ready!", "是的，我准备好了！"],
      ["bedroom-story", "选本睡前故事", "📖", "book", "书", "Which book shall we read?", "我们读哪本书？", "The animal book, please.", "读动物书吧。", "Are you sleepy now?", "你现在困了吗？", "Yes. Good night!", "是的，晚安！"]
    ]],
    ["playroom", "玩具房", "🧸", "搭积木、玩拼图，轮流玩也学会礼貌商量。", [
      ["playroom-teddy", "找到小熊玩偶", "🧸", "teddy", "小熊玩偶", "Where is your teddy?", "你的小熊玩偶在哪里？", "Under the chair.", "在椅子下面。", "Can you find it?", "你能找到吗？", "Yes! Here it is!", "能，在这里！"],
      ["playroom-blocks", "一起搭积木", "🧱", "blocks", "积木", "What shall we build?", "我们搭什么？", "A tall tower!", "一座高高的塔！", "Can I have a red block?", "能给我一块红积木吗？", "Here you are.", "给你。"],
      ["playroom-robot", "机器人动起来", "🤖", "robot", "机器人", "What can your robot do?", "你的机器人会做什么？", "It can walk.", "它会走路。", "Can it dance too?", "它也会跳舞吗？", "Yes! Look at it!", "会！快看！"],
      ["playroom-kite", "选好风筝去公园", "🪁", "kite", "风筝", "Which kite do you like?", "你喜欢哪个风筝？", "The green kite.", "绿色的风筝。", "Shall we go to the park?", "我们去公园吧？", "Let us go!", "出发吧！"],
      ["playroom-puzzle", "一起完成拼图", "🧩", "puzzle", "拼图", "Can you help me with this puzzle?", "你能帮我拼图吗？", "Yes. Let us try!", "能，我们试试！", "Where does this piece go?", "这块放在哪里？", "Right here.", "就在这里。"]
    ]],
    ["sports-ground", "运动场", "🏀", "约伙伴运动，练习邀请、轮流和相互鼓励。", [
      ["sport-soccer", "一起踢足球", "⚽", "soccer ball", "足球", "Would you like to play soccer?", "你想踢足球吗？", "Yes. Let us play!", "想，我们一起玩吧！", "Can you kick the ball?", "你能踢球吗？", "Yes, I can!", "我能！"],
      ["sport-basketball", "拍拍小篮球", "🏀", "basketball", "篮球", "Is this your basketball?", "这是你的篮球吗？", "Yes, it is.", "是的。", "Can I have a turn?", "可以让我玩一会儿吗？", "Of course. Here you are.", "当然，给你。"],
      ["sport-tennis", "来回接个球", "🎾", "tennis ball", "网球", "Are you ready to catch?", "准备好接球了吗？", "Yes. I am ready!", "准备好了！", "Did you catch it?", "你接住了吗？", "Yes! I did it!", "接住了！我做到了！"],
      ["sport-badminton", "约好打羽毛球", "🏸", "racket", "球拍", "What do you want to play?", "你想玩什么？", "Badminton, please.", "我想打羽毛球。", "Do you have a racket?", "你有球拍吗？", "Yes. Here it is.", "有，在这里。"],
      ["sport-swimming", "游泳前先热身", "🥽", "goggles", "泳镜", "Do you have your goggles?", "你带泳镜了吗？", "Yes, I do.", "带了。", "Shall we warm up first?", "我们先热身吧？", "Yes. Let us warm up!", "好，我们先热身！"]
    ]],
    ["beach", "海边", "🏖️", "看海、找贝壳、堆沙堡，和家人一起探索。", [
      ["beach-sea", "第一次看大海", "🌊", "sea", "大海", "What can you see?", "你看见了什么？", "I can see the sea!", "我看见了大海！", "What color is it?", "它是什么颜色？", "It is blue.", "是蓝色的。"],
      ["beach-sand", "一起堆个沙堡", "🏖️", "sand", "沙子", "What are you making?", "你在做什么？", "A sandcastle.", "一座沙堡。", "Can I help?", "我能帮忙吗？", "Yes. Thank you!", "能，谢谢！"],
      ["beach-shell", "找到漂亮贝壳", "🐚", "shell", "贝壳", "What did you find?", "你找到了什么？", "A little shell.", "一枚小贝壳。", "May I have a look?", "我能看看吗？", "Of course. Here you are.", "当然，给你。"],
      ["beach-bucket", "借一个小桶", "🪣", "bucket", "桶", "What do you need?", "你需要什么？", "A bucket, please.", "请给我一个桶。", "The red one or the blue one?", "红色的还是蓝色的？", "The blue one, please.", "请给我蓝色的。"],
      ["beach-shade", "到遮阳伞下休息", "⛱️", "umbrella", "遮阳伞", "Are you hot?", "你热吗？", "Yes. I need some shade.", "热，我想找阴凉处。", "Shall we sit under the umbrella?", "我们坐到遮阳伞下面吧？", "Yes. Water, please.", "好，请给我水。"]
    ]]
  );
  if(window.BEAR_EXTRA_CONTENT)groups.push(...window.BEAR_EXTRA_CONTENT.sceneGroups);
  const categorySections=window.BEAR_EXTRA_CONTENT?.sceneSections||[["在家生活", ["home", "bedroom", "bathroom", "kitchen", "playroom"]], ["认识身边", ["body", "colors", "fruit", "vegetables", "animal-friends"]], ["学校与社交", ["school", "library", "sports-ground", "clinic"]], ["周末探索", ["park", "zoo", "amusement", "beach", "restaurant", "mall"]], ["交通出行", ["car", "bus-stop", "subway", "train-station", "airport"]]];
  const categoryOrder=categorySections.flatMap(([,ids])=>ids);
  groups.sort((a,b)=>categoryOrder.indexOf(a[0])-categoryOrder.indexOf(b[0]));
  window.BEAR_CATEGORY_SECTIONS=categorySections.map(([title,ids])=>({title,ids}));
  const scenes = window.LITTLE_BEAR_SCENES;
  const categories = groups.map(([id,title,emoji,description,entries]) => ({id,title,emoji,description,games:entries.map(row=>row[0])}));
  const picture = (emoji,word='') => window.BearArtwork?.fragment(word,emoji)||`<text x="50" y="72" text-anchor="middle" font-size="65">${emoji}</text>`;
  const color = ['#e9eddf','#e6edf0','#e7efde','#f0e6ed','#f2eadb','#e5eeea','#e6eaf3','#eae6df','#f2e7dc','#e8eddf','#e6eeee','#e5ecda'];
  groups.forEach(([categoryId,categoryTitle,categoryEmoji,description,entries],categoryIndex) => {
    entries.forEach((row,index) => {
      const [id,title,emoji,word,zh,q,qzh,a,azh,q2,q2zh,a2,a2zh,q3,q3zh,a3,a3zh]=row;
      const dialogue=[{npc:q,npcZh:qzh,answer:a,zh:azh},{npc:q2,npcZh:q2zh,answer:a2,zh:a2zh},{npc:q3||'Have a nice day!',npcZh:q3zh||'祝你度过美好的一天！',answer:a3||'You too!',zh:a3zh||'你也是！'}];
      if(!scenes[id]) {
        const pool=[...entries.map(r=>[r[3],r[4],r[2]]),['pencil','铅笔','✏️'],['chair','椅子','🪑'],['ball','皮球','⚽']];
        const distractors=[...new Map(pool.filter(r=>r[0]!==word).map(r=>[r[0],r])).values()].slice(0,2);
        const options=[{id:word,en:word[0].toUpperCase()+word.slice(1),zh,art:picture(emoji,word)},...distractors.map(([id,enZh,pic])=>({id,en:id[0].toUpperCase()+id.slice(1),zh:enZh,art:picture(pic,id)}))];
        scenes[id]={id,title,emoji,station:title,subtitle:`${categoryTitle}里的日常交流：${azh} 先听、再选、再开口。`,theme:`${categoryTitle} · 日常交流`,sceneLabel:`MIMI'S ${categoryId.toUpperCase().replaceAll('-',' ')} ADVENTURE`,greeting:description,minutes:5,options,
          listen:{target:word,en:categoryId==='colors'?`Find something ${word}.`:`Find the ${word}.`,zh:`找到${zh}吧。`,title:`听一听，找到${zh}`,subtitle:'听英文，点选对应的图画',hint:`${word} 是${zh}，看看图画再选一选。`,success:'Great job!',successZh:'找对了！一起试着用英语交流。'},
          speech:{en:a,zh:azh,words:a.toLowerCase().match(/[a-z]+/g),title:`试着说：${azh}`,response:'Great job!',responseZh:'谢谢你愿意开口！接下来和米米聊一聊。'},
          final:{kind:'dialogue',title:'换你来回应，完成三轮小交流',en:q,zh:qzh,action:'收好星星，去下一关',report:'完成三轮有提示的日常对话；分别记录识别、录音或自行跟读，不评估发音。'},
          missions:[['🎧','听音找图画',`认识 ${word}`],['💬','试着开口说',a],['🤝','来回聊三轮','听对方说，再回应一句']],
          parent:{title:`一起练习 · ${categoryTitle}`,tip:`在相似生活情境里示范 “${a}”，让孩子用自己的节奏回应。`,demo:`${q} ${a} ${q2} ${a2}`},
          thanks:{en:'Thank you, my friend!',zh:'谢谢你和我一起完成小交流！'},audio:[],
          illustration:`<svg class="kitchen" viewBox="0 0 760 340" role="img" aria-label="${categoryTitle}里的${title}"><rect width="760" height="340" fill="${color[categoryIndex % color.length]}"/><rect y="264" width="760" height="76" fill="#d7cdb6"/><rect x="55" y="51" width="172" height="181" rx="20" fill="#fffcf2"/><text x="141" y="160" text-anchor="middle" font-size="84">${categoryEmoji}</text><path d="M80 198h122" stroke="#d4cbb7" stroke-width="7" stroke-linecap="round"/><ellipse cx="375" cy="312" rx="75" ry="12" fill="#73805d20"/><rect x="327" y="204" width="98" height="109" rx="35" fill="#c99a70"/><path d="M338 220h78l15 83H323Z" fill="#f1d58f"/><use href="#bear-head" x="295" y="83" width="160" height="160"/><g transform="translate(557 210)">${picture(emoji,word)}</g></svg>`};
      }
      Object.assign(scenes[id],{categoryId,categoryTitle,catalogTitle:title,dialogue});
      const phrases=[...dialogue.flatMap(t=>[t.npc,t.answer]),scenes[id].listen.en,scenes[id].speech.en,scenes[id].parent.demo];
      scenes[id].audio.push(...[...new Set(phrases)].map((text,i)=>[text,`catalog-${id}-${i}`]));
    });
  });
  window.BEAR_CATEGORIES=categories;
  window.LITTLE_BEAR_ROUTE=categories.flatMap(category=>category.games);
  window.BEAR_PICTURE=picture;
})();

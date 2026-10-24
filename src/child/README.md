# 儿童端

`app.js` 组合页面模块并提供 `BearFeatures` 跨页入口；`hub.js` 管理学习分类、场景选择和模拟，`growth.js` 组合起点、听力游戏和阅读互动接口。各页面拥有自己的交互状态。

## 功能模块

以下路径均位于 `modules/`：

| 路径 | 职责 |
| --- | --- |
| today/、explore/、library/ | 每日任务、探索入口、搜索／收藏／最近学过 |
| foundation/ | 字母、音标、单词、双语播放与跟读 |
| phonics/、sentences/ | 自然拼读、句型积木 |
| scenes/ | catalog.js 统一场景目录，app.js 管理关卡和交流，challenge.js 管理等级与奖励效果 |
| roleplay/ | UU 发起、米米回应的三轮角色互换 |
| themes/、review/ | 主题路线、儿童离线入口、混合复习与词卡测验 |
| reading/ | reading.js 管理书架和阅读；activities.js 管理找词、排序与复述 |
| rewards/ | 小家装饰、奖励与解锁任务 |
| assessment/、listening-games/ | 起点建议及三个听指令游戏 |
| activities/、practice/ | 活动页面导航、练习监听器清理 |

## 协作与扩展

- 页面工厂接收 root、标题渲染和跨页回调；私有状态留在模块内。
- 课程读取 `data/`，进度统一通过 `BearLearning` 记录，不另建存储 key。
- 示范音频由共享播放器处理，`BearLesson` 保留调用入口；场景通过回调记录播放证据。
- 绘本沿用全局语速，连续朗读页间停顿 1 秒；离开时释放定时器、录音与连续播放状态。
- 新模块在 `index.html` 中声明依赖顺序，保持课程 ID、导航键及存储事件稳定。

排序、跟读、复述分别记录练习尝试，不作为发音评分或独立会话能力。相关回归命令见[测试说明](../../tests/README.md)。

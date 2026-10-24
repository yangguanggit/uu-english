# 课程数据

随版本发布的只读教材，不存孩子档案或学习进度。通过 `window.BEAR_*` 等既有数据结构加载。

| 文件 | 内容 |
| --- | --- |
| [foundation-data.js](foundation/foundation-data.js) | 26 字母、24 入门音标、40 类 500 个单词及中文、IPA、媒体引用 |
| [phonics-data.js](foundation/phonics-data.js) | 500 词的显式拼读拆解与声音映射 |
| [phonics-course.js](foundation/phonics-course.js) | 拼读课程和 100 个不同示例词 |
| scenes/scenes.js、scenes-extra.js、content-extra.js | 50 类场景，每类 5 个任务 |
| [branch-dialogues.js](scenes/branch-dialogues.js) | 250 关的双分支三轮交流，共 500 条路径 |
| [reply-variants.js](scenes/reply-variants.js) | 保持对象、数量及意图的有限等义回应 |
| [reply-audio.js](scenes/reply-audio.js) | 精确英文整句的音频映射 |
| [sentence-patterns.js](scenes/sentence-patterns.js) | 10 类句型、100 个合法例句（每类 10 句）、积木、译文与关联场景 |
| [books-data.js](reading/books-data.js) | 10 级、每级 10 本绘本，共 600 页及配图、问题、答案 |
| [reading-activities.js](reading/reading-activities.js) | 引用原文的找词、理解、排序与分级讨论 |
| [learning-themes.js](themes/learning-themes.js) | 50 条路线，关联单词、场景、主绘本及扩展阅读 |

## 内容维护

- 保持资源 ID 稳定。显示顺序、下一关与模拟池统一由 `src/child/modules/scenes/catalog.js` 生成。
- 新词成组检查英文、中文、IPA、配图、拼读及双音色录音；新句子同步精确录音映射与媒体清单，不能只加文字。
- 分支的 `pick/choices` 是首轮选择，`npc/answer/answers` 是第二轮，`end/endAnswer/endAnswers` 是第三轮；中英文与结果同时维护。角色互换由共享课程逻辑调整称呼。
- 句型只组合已编写的合法例句；语音识别使用当前轮白名单，不是开放聊天。
- 绘本默认音频名为 `story-{id}-{页序号}.wav`，页面覆盖文件优先；配图、问题及答案须与原文一致。十级为应用内梯度，不代表外部认证。
- 主题引用同时影响每日任务、家长选择、儿童入口与离线包，关联词汇由 `BearCurriculum` 解释。

修改后重新构建，按[测试说明](../tests/README.md)验证，并试听相关音频。来源与许可见[文档索引](../docs/README.md)及[音频说明](../audio/README.md)；自动检查不代替人工内容审校。

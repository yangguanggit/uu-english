# 测试与回归

在项目根目录运行。音色导入专项含真实编码检查，需要构建工具 FFmpeg（或设置 FFMPEG_BIN）；普通发布构建不需要。浏览器测试需先启动 `python3 scripts/serve.py`（localhost:8080），并提供 Chrome 与 Playwright；无需给 H5 安装运行依赖。

| 命令 | 覆盖范围 |
| --- | --- |
| `npm run test:server` | 隔离服务验证资源白名单、GET/HEAD、编码路径、隐藏文件、符号链接及诊断内外网隔离、慢请求与并发恢复、日志限频／轮转、磁盘异常、可选／严格启动；无需启动服务 |
| `npm run test:audio-layout` | 音色分目录与离线清单一致、成人／儿童逻辑映射、模块目录、同音色去重和无孤立媒体、逻辑 ID 不变、标准单音共用及维护清单不进入发布包 |
| `npm run test:release-browser` | 正式资源全量浏览器解码／非静音／时长，双音色双语及三档语速，离线重载／校验和 MP3 Range MIME；默认 localhost:5181，可通过 BEAR_RELEASE_URL 指向 Nginx |
| `npm run test:release` | dist 全部音频／shell 哈希、双音色映射、源码与产物逐字节一致及字母／标准单音不变；先执行 build |
| `npm run test:build` | 隔离微型项目运行真实构建，验证额外文件排除、许可保留、输入／输出链接（含悬空链接）拒绝、非构建 dist 保护、失败保留项目外文件及原发布包、发布失败恢复旧目录与恢复失败保留备份、私有 umask／源码权限下发布目录 0755 和文件 0644 |
| `npm run test:session` | 三端基础学习／绘本计时、模态弹窗暂停、隐藏侧栏不阻断、休息边界与重复提醒 |
| `npm test` | JS 语法、入口及离线清单、模块顺序、dist 一致性、字母音标映射和媒体哈希 |
| `npm run test:server-browser` | 在线／旧缓存离线导航响应头、跨源 iframe 拦截与本源嵌入；先启动 localhost:8080 |
| `npm run test:categories` | 基础／拼读／句型顺序，内容区按最下层分类真实触摸切换、边界／嵌套隔离、垂直滚动、50 场景与刷新、三端单行布局 |
| `npm run test:hub` | 250 关流程、模拟、基础学习、录音、响应式布局；固定成人音色核对文件名 |
| `npm run test:storage` | 清除实际日志与迁移副本、跨标签页未保存事件隔离、自动合并与备份、压缩后延迟旧事件的字段顺序、累计计数与复习日期；跨页面档案增删／改名／切换／恢复与 20 人上限（含 IndexedDB 回退）、超过 5 MB 的中文备份实际下载恢复及 64 MiB 字节边界、检查点写入失败／删除中断、清除失败提示及无 Web Locks 回退 |
| `npm run test:regression` | 档案隔离、并发、备份迁移、返回、家长验证、离线重试与删除；跨页面延迟跨情境证据／练习轮换合并、每日任务计划绑定与刷新／混合复习恢复、离线包下载与删除互斥；虚拟麦克风验证录音保存去重、重录／取消／失败清理及刷新持久化 |
| `npm run test:phonics` | 500 词拼读、40 个声音解码、挑战、奖励、搜索与布局 |
| `npm run test:voices` | 默认音色迁移、完整音色包导入、编码一次／MP3 原样复用、制作清单与解码时长同步、逻辑／实体计数一致性、共享去重、清单／注册表提交失败完整回滚、路由、按孩子保存与离线引用 |
| `npm run test:child-audio` | 儿童媒体文本／哈希／格式校验，真实双语、语速、离线下载与重载 |
| `npm run test:playback` | 双标签页中途变速，完整播放长句与后续队列 |
| `npm run test:parents` | 家长 tab、自定义下拉框的标签来源与选中值、二级页恢复、受限存储、下载跨页回传与损坏包移除 |
| `npm run test:practice` | 100 句排序、每类数量、双音色完整性、角色互换、三轮边界、审校、问题拦截、重审及备份 |
| `npm run test:growth` | 起点任务、故事互动、听力游戏、证据、计时、纠错和备份 |
| `npm run test:progression` | 500 条路径、刷新续玩、听完门禁、题目轮换、分级讨论及更新前备份 |
| `npm run test:branches` | 分支语义、等义白名单、双音色映射、规范记录与离线关联 |
| `npm run test:learning-links` | 分支交流到复习、活动次数去重、完成页帮助、异常旧备份修复、绘本答题去重与辅助状态恢复、基础分类导航、练习计时及休息边界 |
| `python3 -B tests/verify-child-voice-generation.py` | 离线检查候选生成脚本、文本缓存键及截断／静音拒绝；已纳入 test:voices，不请求在线服务 |

构建后运行 `npm test`，其 dist 一致性检查要求产物与源码同步。按改动选择对应专项；历史脚本统一放在 `legacy/`，不作为当前验收入口。

## 目录与入口

- 根目录 `verify-*.cjs` / `verify-*.py`：当前回归，优先通过上表 npm 命令执行。
- `helpers/`：浏览器适配与项目／产物路径工具。
- `legacy/`：6 个历史验收或转发脚本（初版早餐、五场景、旧语音流程等）；未纳入当前回归，不代表与现有 UI 或默认音色兼容。当前替代入口分别是 `test:hub`、`test:child-audio`、`test:regression` 与 `test:voices`。

这些脚本与测试产物都不进入发布目录。仅移动测试文件时不需要重新构建页面。

## 工具与输出

- [helpers/browser.cjs](helpers/browser.cjs)：优先加载环境中的 Playwright，可通过 `BEAR_PLAYWRIGHT_MODULE` 指定模块路径，并支持已配置的桌面运行时。
- [helpers/paths.cjs](helpers/paths.cjs)：按文件位置解析根目录，统一输出路径；新测试不要硬编码项目绝对路径。
- 默认产物在项目外 `../english-learning-diagnostics/current/`，可用 `BEAR_VERIFY_OUTPUT` 指定。

所有用例使用隔离浏览器或临时项目，不读写真实孩子档案；音色导入测试不安装到正式项目。自动解码、静音播放和合成识别事件不能替代人工音质、发音或真实儿童识别准确率验收。

`npm run test:layout`：隔离浏览器档案检查六类页面的三端布局、卡片弹层与焦点、分类吸顶、绘本续读和家长设置。

`test:regression` 中的 `verify-favorite-offline-recovery.cjs` 使用真实双页面与缓存故障注入，覆盖旧收藏按钮的幂等意图、收藏列表同步、延迟事件与检查点、下载配额耗尽后的刷新／删除、更新失败保留标记、重试、删除失败恢复、旧版无记录音频的页面清理、其他主题媒体保护，以及听音／收藏更新时基础卡片节点与键盘焦点的保留。

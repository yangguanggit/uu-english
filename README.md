# UU说英语

面向儿童的英语启蒙静态 H5，当前版本 **1.0.0**。使用原生 JavaScript，通过 `index.html` 按顺序加载脚本，无前端框架或打包依赖。

学习资源：26 个字母、24 个入门音标、500 个常用单词及对应拼读（分级路线精选其中 100 个示例词）、50 类场景（250 个小游戏、500 条分支）、100 本绘本（10 级）、50 条主题路线，以及 10 类句型积木（每类 10 句，共 100 句）。支持每日任务、复习、角色互换、亲子陪练和内容审校。

## 目录与文档

```text
uu-english/
├── index.html             # 页面入口及依赖顺序
├── src/
│   ├── child/             # 儿童端入口与学习功能模块
│   ├── parent/            # 家长空间与管理模块
│   └── shared/            # 导航、音频、存储、学习与审校逻辑
├── data/                  # 随版本发布的课程数据
├── styles/                # 基础、功能与成长互动样式
├── audio/                 # adult/、child/、standard/ 按功能细分；metadata/ 存清单
├── Dockerfile             # 内置 dist 的非 root Nginx 镜像
├── .dockerignore          # 镜像构建上下文白名单
├── deploy/nginx/          # 容器完整配置及独立 vhost
├── scripts/               # 预览、构建和音色制作工具
├── tests/                 # 当前回归、helpers/、legacy/ 历史脚本
├── docs/                  # 来源说明与更新日志
├── sw.js                  # 根作用域 Service Worker
├── offline-assets.json    # 自动生成的离线清单
└── dist/                  # 自动生成的部署目录
```

源码只维护以下 **9 份 README**，小目录说明合并到所属文档：

| 文档 | 内容 |
| --- | --- |
| 本文档 | 项目总览、运行、部署、数据位置 |
| [儿童端](src/child/README.md) | 学习模块与页面协作 |
| [家长端](src/parent/README.md) | 页面分组、档案、备份、离线管理 |
| [共享工具](src/shared/README.md) | 公共接口与扩展规则 |
| [课程数据](data/README.md) | 教材结构与内容维护 |
| [音频资源](audio/README.md) | 媒体清单、音色与许可 |
| [脚本](scripts/README.md) | 构建与音色接入流程 |
| [测试](tests/README.md) | 验证命令与覆盖范围 |
| [文档索引](docs/README.md) | 来源与更新记录 |

## 运行与部署

在项目根目录执行，需 Python 3 和 Node.js，无需 `npm install`：

```bash
python3 scripts/serve.py                         # 本地预览：http://localhost:8080/
node scripts/build.cjs                           # 更新清单并生成 dist/
python3 scripts/serve.py --root dist --port 5181 --disable-diagnostics # 并行预览发布产物
```

可直接运行公共镜像 `ghcr.io/yangguanggit/uu-english:1.0.0`；自行构建时先使用 `npm run build` 生成 dist，再通过根目录 Dockerfile 打包。也可由现有 Nginx 挂载持久化目录提供静态服务。两种方式均无需 Python 或 FFmpeg。公共镜像运行命令、本地构建、GHCR 推送、集群配置及发布／回滚步骤见[部署说明](docs/DEPLOYMENT.md)，独立目录发布使用 [vhost 模板](deploy/nginx/uu-english.conf)。正式 MP3 在资源目录直接维护，字母及标准单音保留 WAV；原始录音归档到项目外。

部署 **`dist/` 的全部内容**，站点根目录指向其中的 `index.html`。使用 HTTPS，保留 `audio/` 相对地址及根路径 `sw.js`。构建只替换自己生成的 `dist/`，请勿在其中存放手工维护文件。

HTML、脚本、样式、Service Worker 和离线清单应允许重新验证更新；音频并非全部采用内容哈希文件名，不要统一设置永久不可变缓存。发布时保留上一版以便回滚。

服务默认监听 `0.0.0.0:8080`，支持 `--port` 覆盖；配置修改后需重启。只允许访问离线清单内的运行资源、入口、Service Worker 和版权说明；禁止目录浏览、隐藏文件、脚本、测试、未登记文件及符号链接。`/__health` 仅返回版本和服务名。更新运行资源后先执行构建，再重启服务加载新清单。

诊断采集与页面使用独立监听器：默认仅 `127.0.0.1:8081/__diagnostics` 接受 POST；公网页面端口始终拒绝诊断写入。需要其他内网机器访问时，用 `--diagnostics-host <服务器实际内网IPv4>` 绑定 RFC1918 地址，并在安全组仅向指定运维来源开放 8081；**不要将诊断端口配置到公网 CLB、端口映射或反向代理**。接口验证实际连接来源，不信任 `X-Forwarded-For`；它不提供账号鉴权，内网也需限制来源。可用 `--diagnostics-port` 改端口，或 `--disable-diagnostics` 关闭采集。浏览器诊断改为本页 `bear:diagnostic` 事件，不再上传到公网端口；该接口不采集录音或孩子档案。诊断与测试产物保存在项目外 `../english-learning-diagnostics/`。每个诊断监听地址使用独立的 `runtime/<IPv4>-<端口>/` 日志目录，避免多个实例互相轮转日志。仅部署静态文件时，这些 Python 接口均不存在。

页面端口最多同时处理 64 条连接，诊断端口最多 8 条；超额连接直接关闭。每条连接空闲读写超时 10 秒，总时限 60 秒（持续少量发送也不能无限占用）；超时需重试。诊断每个来源每 60 秒最多 30 条，总计最多 300 条，超限返回 429。每份日志最多 1 MiB，保留 3 份轮转，单个采集实例合计最多 4 MiB；存储失败返回 503。进程重启后限频窗口重新计数，已有轮转日志保留。外部重定向的控制台／访问日志由部署环境另行配置轮转。

诊断监听默认是可选功能：绑定失败会输出明确警告，页面服务继续运行；`--require-diagnostics` 切换为绑定失败即退出，不能与 `--disable-diagnostics` 同用。多实例预览请禁用多余的采集器，或使用不同诊断端口。

Python 服务返回 `Content-Security-Policy: frame-ancestors 'self'`、`X-Frame-Options: SAMEORIGIN` 和 `X-Content-Type-Options: nosniff`；禁止跨源嵌入，允许本源页面嵌入。离线导航也会补齐限制，包括旧缓存。若改由 Nginx、对象存储或其他服务器提供静态文件，须在该服务器上配置相同响应头（含错误响应），仅复制 dist 无法替服务器设置响应头。

浏览器按域名和端口隔离本地进度。从旧端口迁移时，先在原地址的家长空间导出备份，再在新地址导入；原端口可临时用 `--port` 启动以导出数据。

## 数据与进度

| 数据 | 位置与范围 |
| --- | --- |
| 课程、配图、媒体 | `data/`、`src/shared/ui/`、`audio/`，随程序发布 |
| 档案索引 | 浏览器 localStorage：`bear-profiles-v1` |
| 档案互斥锁（Web Locks 不可用时） | IndexedDB：`bear-profile-locks`，仅用于串行操作，不存孩子信息 |
| 孩子记录、收藏、设置 | localStorage：`bear-child:<档案ID>:` 命名空间 |
| 页面位置 | 浏览器 sessionStorage |
| 共享离线包 | 浏览器 Cache Storage |
| 原始练习录音 | 页面内存，仅用于回听，不进入备份 |

无服务端账号或云同步，不同设备、浏览器、域名和端口不自动共享进度。换设备、换站点或清理浏览器前，从「家长空间 → 孩子与设置 → 备份与恢复」导出，再在目标浏览器导入；离线包需要重新下载。备份导出为紧凑 JSON，导入与导出统一按 UTF-8 字节限制为 64 MiB；能否恢复还取决于目标浏览器的本地剩余空间。

清除学习记录会移除当前孩子的旧日志及迁移副本，并恢复学习偏好；其他孩子与共享离线包保留。学习日志定期合并为检查点，备份仍导出完整状态。

删除孩子档案须二次确认，仅清除该孩子记录；删除最后一个后创建空白档案。恢复默认新增档案，仅可替换未使用的默认档案。详细行为见[家长端说明](src/parent/README.md)。

## 维护约定

新增功能按端和职责归类，脚本在 `index.html` 中先加载依赖再加载使用方。保持课程 ID、存储事件和导航恢复键稳定；新增媒体后重新构建。共享样式修改后检查手机、平板和桌面布局。

版本以 `package.json` 为准，变更时同步入口资源版本、场景诊断、离线模块、Service Worker 和本地服务；构建校验一致性。`app-revision` 标识具体内容，独立于产品版本。

`.gitignore` 排除部署产物、依赖、缓存、日志和本地配置；课程、正式媒体、许可及离线清单需保留。验证入口见[测试说明](tests/README.md)，变更历史见 [CHANGELOG](docs/CHANGELOG.md)。

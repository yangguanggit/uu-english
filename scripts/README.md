# 脚本

| 文件 | 用途 |
| --- | --- |
| [serve.py](serve.py) | 静态资源白名单服务，默认 `0.0.0.0:8080`；独立诊断默认 `127.0.0.1:8081`，可用 `--diagnostics-host` 指定内网 IPv4、`--disable-diagnostics` 关闭；支持 `--root dist`、`--port`，`--require-diagnostics` 可要求采集器必须启动，否则默认失败警告后继续页面服务；内置连接限额、超时、日志限频与轮转，修改后重启；不是反向代理 |
| [generate-offline.cjs](generate-offline.cjs) | 生成离线媒体清单、内容 revision 和 shell 哈希 |
| [build.cjs](build.cjs) | 校验音色、更新清单，仅复制登记的运行资源、媒体与许可到 dist/ |
| [audio-layout.cjs](audio-layout.cjs) | 功能分类、合法物理路径、同音色字节去重和共用录音规划；保留每个逻辑引用的 baseRate |
| [runtime-files.cjs](runtime-files.cjs) | 构建／清单共用文件校验，拒绝符号链接和非普通文件 |
| [voice-pack.cjs](voice-pack.cjs) | 导出音色制作计划、检查并导入完整音色包 |
| [generate-child-voice.py](generate-child-voice.py) | 生成候选静态音频，支持样音、去重和断点续做 |
| [requirements-voice.txt](requirements-voice.txt) | 可选制作端依赖，不随 H5 发布 |

静态发布只需 `npm run build`，不会转码，也不需要 FFmpeg。发布步骤见[部署说明](../docs/DEPLOYMENT.md)。音色导入使用 FFmpeg 完成 WAV 转换和 MP3 解码时长核验（MP3 字节不转码）；`FFMPEG_BIN` 可指定可执行文件绝对路径。

运行与部署命令见[项目说明](../README.md#运行与部署)。构建排除测试、日志、历史文档和音频目录内未登记的附加文件；运行输入和生成的 index／离线清单均拒绝符号链接，包括悬空链接。构建统一设置发布目录 0755、文件 0644，保留源码权限不变；发布前权限设置失败也会保留旧 dist。已有 dist 必须是普通目录且包含本构建脚本的有效标记，校验失败保留已有发布文件。发布前将旧 dist 暂存为 `.dist-build-*-previous`，新目录发布失败时恢复旧目录；恢复也失败时保留备份并在错误中给出路径，需人工恢复。revision 按运行文件及媒体摘要计算，排除自身 meta，重复构建结果稳定。

## 新音色接入

现有教材保留逻辑媒体 ID，成人文件在 audio/adult/，儿童在 audio/child/，共用单音在 audio/standard/；维护清单在 audio/metadata/。新音色按 audio/<id>/<功能模块>/ 存储，注册表位于 `src/shared/audio/voice-packs.js`。制作计划与候选文件放到项目外；以下路径按本机环境替换。

```bash
node scripts/voice-pack.cjs --plan /项目外目录/voice-plan.json
# 制作、填写并校对音色包后：
node scripts/voice-pack.cjs --import /项目外目录/reviewed-pack.json
node scripts/voice-pack.cjs --check
npm run build
npm test
npm run test:voices
```

计划目标不能已存在。使用 `sourceText` 制作，字母只读名称。包需填写 `id`、`label`、`source`、`speakers.en/zh` 及全部 `clips`；文件路径相对清单目录，不允许绝对路径或 `..`。字母录音须为 16–48 kHz、16/24-bit PCM WAV。其他录音可为 PCM WAV 或完整 MP3；导入 WAV 时转换为 64 kbps、24 kHz 单声道 MP3 一次，导入 MP3 不重复转码。候选原始录音保留在项目外。

`baseRate` 表示录音自身的制作语速；正常速度录音填 `1`，旧 slow 引用可共用原速录音，不能提前套用播放器默认 0.75×。完成试听和内容校对才设 `reviewed:true`，可在 `reviewScope` 记录实际审听范围。

导入先验证整包，拒绝缺失映射、无效 WAV／MP3、未确认审听或直接复制成人文件（包括原始归档摘要）的包。写入前逐层检查音频根目录、目标音色目录、全部录音目标及注册表路径，拒绝目录／文件符号链接（含同内容及悬空链接）和越出项目的路径；预检失败不写媒体或注册表。按音色和功能模块保存；同音色相同字节只存一份，跨模块共用资源放 shared，各逻辑引用保留自己的 baseRate。成人和儿童发声不互相合并。完整哈希存入注册表校验，不覆盖成人原音。同时更新 `audio/metadata/<id>-voice-manifest.json`，记录制作文本、说话人、输入文件与摘要、最终路径／摘要／语速及解码时长；检查和构建会拒绝与注册表不一致的制作清单。更新后删除不再引用的旧录音；提交异常时恢复媒体和制作清单，注册表最后提交。此回滚不保证断电或进程被强制终止后的自动恢复。设置页自动读取注册表；主题包需更新后才能离线切换新音色。音标与拼读单音继续使用标准真人录音。

## 候选音频制作

可选脚本使用第三方 `edge-tts` 联网生成静态文件，无需在 H5 放入服务密钥；不保证在线服务持续可用。现有儿童包采用英文 Ana、中文云夏，中英文是不同说话人。

```bash
python3 -m venv /项目外目录/tts-env
/项目外目录/tts-env/bin/python -m pip install -r scripts/requirements-voice.txt
/项目外目录/tts-env/bin/python scripts/generate-child-voice.py --samples --output /项目外目录/audition
```

试听确认后，去掉 `--samples` 并使用另一输出目录制作全量。需要 macOS `afconvert` 或已安装的 `ffmpeg`，输出为 24 kHz 单声道 PCM WAV；准确数量以导出计划和媒体清单为准。

生成报告记录文本、音源、哈希、时长与失败条目；候选包始终默认 `reviewed:false`，不会自动注册。连续失败或返回 401/403/429 时停止，不绕过限制。密钥仅由制作端保管；格式、非静音检查不代表发音准确。

新增句子须同步 `audio/metadata/learning-manifest.json`、`audio/metadata/child-voice-manifest.json`、音色注册表和整句映射，再构建并运行[相关验证](../tests/README.md)。

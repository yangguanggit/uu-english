# 音频资源

正式音频直接维护压缩文件，打包只复制，不重复转码。教材继续使用稳定的逻辑 WAV ID，由 `src/shared/audio/voice-packs.js` 映射到实际 MP3／WAV 路径；孩子学习进度不受目录变化影响。

```text
audio/
├── adult/、child/          # 两种音色分别保存
│   ├── letters/           # 字母名称，原始 WAV
│   ├── words/             # 常用单词与中文释义
│   ├── phonemes/          # 音标例词
│   ├── sentences/         # 句型积木示例
│   ├── scenes/            # 场景、分支、替代表达及陪练
│   ├── stories/           # 绘本朗读
│   └── shared/            # 被多个功能复用的同一录音
├── standard/
│   ├── phonemes/          # 24 个标准音标
│   └── phonics/           # 补充拼读单音与组合音
└── metadata/              # 来源、逻辑映射、哈希和授权
```

自然拼读整词共用 words，单音共用 standard/phonics 或 standard/phonemes；主题路线、复习、场景模拟共用对应内容，不复制独立音频。字母和标准单音保留原始 WAV，其他现有语音为 64 kbps、24 kHz 单声道 MP3。

同音色内仅合并字节完全相同的文件；相同文本但不同录音保留，成人和儿童不混用。一个物理文件可对应多个教材 ID，各引用的 baseRate 独立保存。跨模块重复录音归入 shared，共用文件名选自原逻辑 ID；因此成人、儿童实际文件名不一定一一对应，逻辑 ID 仍保持一致。离线包按物理路径去重，共享哈希缓存继续复用。

本次由 13,126 个实体文件整理为 10,935 个，减少 2,191 份副本，正式音频约 212.5 MiB。数量以清单为准；制作清单中 logicalClips 表示逻辑引用数，installedFiles 表示去重后的实体文件数；构建会核对两者与映射一致。检查入口 `npm run test:audio-layout` 会验证无同音色重复文件、无孤立媒体且所有逻辑引用可解析。

| 清单 | 用途 |
| --- | --- |
| [learning-manifest.json](metadata/learning-manifest.json) | 成人及标准音频：file 为逻辑 ID，asset 为物理路径，module 为教材所属模块；sourceAsset/sourceSha256 记录原始录音 |
| [child-voice-manifest.json](metadata/child-voice-manifest.json) | 每个逻辑引用保留 logicalFile、文本、音源及语速；file/sha256 指向可共用的物理录音，sourceAsset/sourceSha256 指向原始归档 |
| [foundation-voice.json](metadata/foundation-voice.json) | 字母和标准音标的原始来源、字节摘要与新路径 |
| [CHILD-VOICE-CREDITS.txt](metadata/CHILD-VOICE-CREDITS.txt) | 儿童音源及制作说明 |
| [PHONEME-CREDITS.txt](metadata/PHONEME-CREDITS.txt) | 标准单音来源和许可，含非商业使用限制 |

原始 WAV 已归档到项目外 `/Users/lilei/go/src/outputs/uu-audio-archive/20261022-original-wav/audio/`，不进入源码资源包或部署目录。重新制作时从原始录音开始；归档需要另行备份，不应当作可随意清理的临时目录。

新增音色使用[脚本流程](../scripts/README.md#新音色接入)：WAV 在导入时转换一次（字母除外），MP3 原样导入，再自动分类和去重。导入自动同步对应音色制作清单，记录输入来源和最终录音摘要、解码时长；许可仍需人工核实。`npm run build` 生成完整发布资源，已下载主题需联网更新一次。

当前儿童包使用英文 Ana、中文云夏；音标／拼读单音共享标准真人录音。格式、哈希、解码和非静音检查不能代替人工发音审校，发布前核对音源许可。仅本层保留 README。

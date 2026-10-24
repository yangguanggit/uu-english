# 测试环境静态部署

最简单的方案：**现有 Nginx + 持久化目录，只发布 dist/**。不需要自建镜像、推送镜像仓库或部署 Python；使用集群已有可用的 Nginx 镜像即可。本文不包含已执行的集群变更，示例域名、路径和对象名需要按实际环境填写。

## 1. 生成发布目录

本机只需 Node.js，无需 npm install 或 FFmpeg。正式资源已经编码、分目录并去重，构建不会再次转码。

```bash
# 在项目根目录运行：
npm run build
npm test
npm run test:release
```

构建在临时目录完成复制和校验后才替换 dist；校验失败保留上次发布产物。发布目录统一为 0755、普通文件为 0644，不继承制作端的私有 umask；上传后仍需确认 Nginx 用户可遍历上级目录、读取文件，且符合目标存储的 ACL／安全策略。成人、儿童的普通语音使用 **MP3、64 kbps、24 kHz、单声道**；字母及标准音标／拼读单音保留 WAV。音频按 `audio/<音色>/<功能模块>/<文件>` 存放，同音色内字节完全相同的录音共用一份，跨功能共用录音归入 shared。具体结构见[音频说明](../audio/README.md)。

原始 WAV 已移到项目外归档，不随源码资源包或 dist 分发；需要重新编码时从原始归档制作，不对 MP3 重复压缩。音色导入需要制作端 FFmpeg：WAV 只转换一次，已有 MP3 保持原字节、不再次转码，但仍需解码核验时长；普通发布构建不需要 FFmpeg。旧的 `build:compressed` 命令和构建时压缩脚本已移除。

教材逻辑 ID 和孩子进度键不变，音色注册表负责转换实际物理路径。离线清单按新路径生成大小、SHA-256、shell 哈希和内容 revision；已有离线主题需要联网更新，进度保留。只移动路径且录音摘要未变的媒体可以复用共享哈希缓存，原 WAV 改为 MP3 的媒体需下载新文件。离线 Range 响应区分 MP3/WAV MIME。

本次整理后：13,126 条原始实体资源合并为 **10,935 个文件**，减少 2,191 份重复副本；音频实际大小约 **212.5 MiB**，完整 dist 约 **218.7 MiB**（原始 WAV 约 1421.0 MiB）。以最新 offline-assets.json 的 audio 字节总和为准，磁盘占用可能包含文件系统块开销。`dist/.build.json` 的 audioEncoding 为 pre-encoded；源码和发布资源字节相同。

## 2. 准备 Nginx 和存储

Vhost 配置：[deploy/nginx/uu-english.conf](../deploy/nginx/uu-english.conf)。它是 `http {}` 内的 server 配置，通常挂到 `/etc/nginx/conf.d/uu-english.conf`，不能直接作为整个 nginx.conf。修改 server_name 为实际测试域名，路径与下面挂载保持一致。

推荐目录布局（容器内）：

```text
/srv/uu-english/
├── releases/
│   ├── 1.0.0-build001/    # 本次 dist 的全部内容
│   └── 1.0.0-build002/
└── current -> releases/1.0.0-build002
```

Nginx 将整个 `/srv/uu-english` 挂为只读；发布任务通过同一 PVC 或共享文件系统的写入口上传文件。多副本需所有副本都能读到的存储，或分别分发并核对 revision。**不要把源码根目录挂成站点根目录，也不要只用 kubectl cp 写入容器临时层**，Pod 重建后会丢失。

使用现有 Deployment：挂载上述 PVC、将 vhost 作为 ConfigMap 单文件挂到 conf.d、Service 的 targetPort 指向 8080，已有 Ingress/CLB 路由到该 Service。无需把所有音频塞进 ConfigMap，也无需重新制作应用镜像。若镜像自带默认站点，移除或禁用冲突的 default.conf，确认实际请求命中本 vhost。

配置保留 `0.0.0.0:8080` 内部监听。对外用 **HTTPS**，由现有 Ingress/CLB 终止 TLS；远程 HTTP 不满足麦克风、Service Worker 等安全上下文要求。应用部署在独立域名根路径 `/`，暂不按 `/english/` 子路径部署。

## 3. 上传与切换

把本次 dist 的**全部内容**上传到新的唯一 release 目录，先核对文件数量、offline-assets.json 的 revision 和音频摘要，切勿覆盖正在服务的目录。下面仅为共享文件系统所在 Linux 机器上的操作模板；先将中文占位值替换为真实目录名：

```bash
# 先将本地 dist/ 的内容同步到：
# /srv/uu-english/releases/本次唯一发布目录/
# 文件完整且 Nginx 用户可读后，在 /srv/uu-english 下：
ln -s releases/本次唯一发布目录 current.next
mv -Tf current.next current
```

切换链接需在同一文件系统，current 必须是受控符号链接而非真实目录。挂载整个父目录，避免只挂载 current 后无法看到链接更新。这里 `mv -T` 为 Linux 用法。首次发布也使用此流程；若上次失败遗留 current.next，先核查目标再处理，不盲目覆盖。

vhost 中 `disable_symlinks on from=$document_root` 允许运维控制的根链接，禁止站点内部额外符号链接。只上传构建生成的普通文件，发布用户对上级目录的写权限需收紧。

修改 Nginx 配置后在目标实例先执行 `nginx -t`，成功再 `nginx -s reload`。ConfigMap 用 subPath 挂载时不会自动热更新，应按现有集群流程更新并滚动重启 Pod；单纯切换共享目录 current 不需要重新加载配置。执行 kubectl 前确认 context、namespace 和 Deployment 名称，不使用默认环境推断目标。

## 4. 验收与回滚

通过实际 HTTPS 域名检查：

- 首页、深层页面刷新、成人／儿童英文和中文、字母及标准音标能播放；三档语速正确。
- 下载一个主题，断网后重新打开并播放，确认 MP3 与标准 WAV 均正常；已有离线主题在家长空间更新。
- `GET /__health` 返回 200；该健康检查只说明 Nginx 响应，不代表课程完整。
- 音频请求 MIME 为 audio/mpeg 或 audio/wav，Range 请求返回 206；HTML、sw.js、offline-assets.json、JS/CSS、音频都带 no-cache 允许重新验证，不能设置 immutable。
- `/.build.json`、`/scripts/serve.py`、`/package.json`、`/audio/metadata/learning-manifest.json` 返回 404；`/__diagnostics` 返回 403；非 GET/HEAD 请求返回 405。错误响应也带 frame-ancestors、X-Frame-Options、nosniff。
- 主题更新检测读取的新 revision 与本次 dist 一致，页面无资源 404 和控制台错误。

回滚时把 current 切回上一版的完整 release，不混用两版的 index、注册表、音频和清单。已下载主题及打开的旧页面仍可能持有浏览器缓存，回滚后重新打开页面并检查／更新离线主题。上一版先保留，确认完成后再按维护策略清理。

## 数据及诊断

孩子档案、设置、进度在用户浏览器 localStorage，离线媒体在 Cache Storage，均不保存在 Nginx 发布目录。保持域名、协议与端口不变；若更换访问来源，先在旧地址导出备份再导入新地址。

纯静态部署没有 Python 的诊断采集监听器，vhost 也不会反代诊断接口。如以后确需采集，应独立部署并绑定内网地址、限制访问来源；不要加入公网 Ingress。

配置参考 Nginx 官方文档：[响应头继承](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)、[符号链接限制](https://nginx.org/en/docs/http/ngx_http_core_module.html#disable_symlinks)。已有全站配置可能改变行为，最终必须在目标 Nginx 执行语法及实际请求验收。

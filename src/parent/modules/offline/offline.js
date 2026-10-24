(() => {
  'use strict';
  const esc = (s) => BearGrowth.esc(s);
  // Offline work outlives any one parent page render. Only the mounted view receives updates.
  const offlineTask = { running: false, message: '' };
  let offlineView = null;
  function offlineMessage(message) {
    offlineTask.message = message;
    offlineView?.update();
  }
  async function runOffline(work, initial, success, failure) {
    if (offlineTask.running) return;
    offlineTask.running = true;
    offlineMessage(initial);
    try {
      await work();
      offlineMessage(success);
    } catch (e) {
      offlineMessage(e.message + failure);
    } finally {
      offlineTask.running = false;
      offlineView?.update();
      await offlineView?.refresh();
    }
  }

  window.BearParentOffline = {
    mount(section) {
      const offline = document.createElement('section');
      offline.className = 'offline-tools';
      offline.innerHTML = `<section class="feature-card" data-parent-home="offline"><h3>已下载的主题</h3><p id="offline-summary" role="status">正在检查本机离线包…</p><p id="offline-downloaded-names"></p><div class="parent-menu"><button data-parent-open="downloads"><span><strong>浏览与管理主题包</strong><small>搜索主题、下载、更新或移除</small></span><b aria-hidden="true">›</b></button><button data-parent-open="storage"><span><strong>存储与空间</strong><small>查看占用，申请保留本机存储</small></span><b aria-hidden="true">›</b></button></div><details class="parent-more"><summary>了解离线学习</summary><p>先下载主题，断网后仍可听单词、玩对应场景、读绘本。语音识别需要联网，可改用自行跟读或本机录音。</p><p>离线包由本浏览器的所有孩子共享；清理浏览器后可能需要重新下载。</p></details></section><section class="feature-card storage-tools" data-parent-detail="storage"><h3>存储与空间</h3><p id="storage-estimate">正在读取本机存储情况…</p><button id="protect-storage">申请保留本机学习存储</button><p id="storage-status" role="status"></p><p>主动清理浏览器仍可能删除记录，请定期导出进度备份。</p></section><section class="feature-card" data-parent-detail="downloads"><h3>主题离线包</h3><div class="offline-filters"><label>搜索主题<input id="offline-search" type="search" placeholder="输入主题名称"></label><label class="chinese-setting"><input id="offline-downloaded-only" type="checkbox">只看已下载</label></div><p id="offline-filter-count" role="status"></p><div id="offline-list" class="offline-list"></div><p id="offline-status" role="status"></p></section>`;
      section.after(offline);
      const cleanup = document.createElement('div');
      cleanup.innerHTML = '<p>清理失败下载遗留的音频，保留已下载主题和学习记录。</p><button id="cleanup-offline-media">清理残留音频</button><p id="offline-cleanup-status" role="status"></p>';
      offline.querySelector('[data-parent-detail=storage]').append(cleanup);
      cleanup.querySelector('button').onclick = () =>
        runOffline(
          () => BearOffline.cleanup(),
          '正在清理残留音频…',
          '已清理未被主题引用的音频，已下载主题和学习记录保留。',
          '；清理未完成，请重试。',
        );
      const storage = offline.querySelector('#storage-estimate');
      navigator.storage
        ?.estimate?.()
        .then(
          (e) =>
            (storage.textContent = `本站使用约 ${((e.usage || 0) / 1048576).toFixed(1)} MB / 可用配额约 ${((e.quota || 0) / 1048576).toFixed(0)} MB；清理浏览器会影响本机记录。`),
        )
        .catch(() => (storage.textContent = '浏览器未提供空间统计，请定期备份。'));
      if (!navigator.storage?.estimate) storage.textContent = '浏览器未提供空间统计，请定期备份。';
      offline.querySelector('#protect-storage').onclick = async () => {
        const label = offline.querySelector('#storage-status');
        try {
          label.textContent = (await navigator.storage?.persist?.())
            ? '浏览器已允许持久保留。主动清理浏览器仍可能删除记录，请保留备份。'
            : '浏览器未授予持久保留，请定期导出备份。';
        } catch {
          label.textContent = '当前浏览器不支持此操作，请定期备份。';
        }
      };
      const list = offline.querySelector('#offline-list'),
        status = offline.querySelector('#offline-status');
      function filter() {
        const query = offline.querySelector('#offline-search').value.trim().toLowerCase(),
          only = offline.querySelector('#offline-downloaded-only').checked;
        let count = 0;
        for (const row of list.querySelectorAll('[data-theme-title]')) {
          row.hidden = !(
            row.dataset.themeTitle.includes(query) &&
            (!only || row.dataset.downloaded === 'true')
          );
          if (!row.hidden) count++;
        }
        offline.querySelector('#offline-filter-count').textContent = `展示 ${count} 个主题`;
      }
      offline.querySelector('#offline-search').oninput = filter;
      offline.querySelector('#offline-downloaded-only').onchange = filter;
      function update() {
        if (!offline.isConnected) return;
        status.textContent = offlineTask.message;
        cleanup.querySelector('#offline-cleanup-status').textContent = offlineTask.message;
        cleanup.querySelector('button').disabled = offlineTask.running;
        list.querySelectorAll('button').forEach((b) => (b.disabled = offlineTask.running));
      }
      let refreshVersion = 0;
      async function refresh() {
        if (!offline.isConnected) return;
        const version = ++refreshVersion,
          active = () => offline.isConnected && version === refreshVersion;
        try {
          const downloaded = await BearOffline.status(),
            rows = document.createDocumentFragment(),
            available = [];
          for (const t of BEAR_LEARNING_THEMES) {
            if (!active()) return;
            const pack = await BearOffline.bundle(t.id),
              saved = downloaded.find((r) => r.id === t.id),
              exists = !!saved,
              ready = exists && (await BearOffline.verify(t.id));
            if (!active()) return;
            const row = document.createElement('div');
            row.dataset.themeTitle = t.title.toLowerCase();
            row.dataset.downloaded = String(exists);
            if (ready) available.push(t.title);
            row.innerHTML = `<span>${t.emoji} ${t.title}<small>约 ${(pack.bytes / 1048576).toFixed(1)} MB · ${ready ? '已可离线' : saved?.incomplete ? '未完成 · 可重试或删除' : exists ? '待更新 · 将复用未变化的音频' : '未下载'}</small></span><button data-download="${t.id}">${ready ? '检查 / 更新' : saved?.incomplete ? '重试' : exists ? '更新' : '下载'}</button>${ready ? `<button data-offline-open="${t.id}">进入主题</button>` : ''}${exists ? `<button data-offline-remove="${t.id}" aria-label="删除${t.title}离线包">删除</button>` : ''}`;
            row.querySelector('[data-download]').onclick = () =>
              runOffline(
                () =>
                  BearOffline.download(t.id, (i, n) =>
                    offlineMessage(`正在下载 ${t.title}：${i} / ${n}`),
                  ),
                `正在准备下载 ${t.title}…`,
                `${t.title} 已下载完整，可以离线使用。`,
                '；此主题尚未完成下载，请重试。',
              );
            row
              .querySelector('[data-offline-open]')
              ?.addEventListener('click', () => BearFeatures.openTheme(t.id));
            row
              .querySelector('[data-offline-remove]')
              ?.addEventListener('click', () =>
                runOffline(
                  () => BearOffline.remove(t.id),
                  `正在删除 ${t.title}…`,
                  '已删除该主题的离线内容，学习记录保留。',
                  '；删除未完成，请重试。',
                ),
              );
            rows.append(row);
          }
          if (!active()) return;
          list.replaceChildren(rows);
          offline.querySelector('#offline-summary').textContent =
            `${available.length} / ${BEAR_LEARNING_THEMES.length} 个主题已可离线学习`;
          offline.querySelector('#offline-downloaded-names').textContent = available.length
            ? available.join(' · ')
            : downloaded.length
              ? '已有主题包待更新，请进入主题管理更新或删除。'
              : '还没有下载主题，先选择一个喜欢的主题吧。';
          filter();
          update();
        } catch (e) {
          if (!active()) return;
          offline.querySelector('#offline-summary').textContent =
            '离线包状态暂不可用，请进入主题管理重试。';
          status.textContent = e.message + '，请点击重试。';
          const retry = document.createElement('button');
          retry.id = 'offline-retry';
          retry.textContent = '重新加载主题列表';
          retry.disabled = offlineTask.running;
          retry.onclick = () => {
            status.textContent = '';
            refresh();
          };
          list.replaceChildren(retry);
        }
      }
      offlineView = { update, refresh };
      update();
      refresh();
    },
  };
})();

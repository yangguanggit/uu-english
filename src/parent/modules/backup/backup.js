(() => {
  'use strict';
  window.BearParentBackup = {
    mount(section, report) {
      section
        .querySelector('#family-status')
        .insertAdjacentHTML(
          'beforebegin',
          `<section class="feature-card" data-parent-detail="backup"><h3>进度备份与恢复</h3><div class="feature-note backup-reminder" id="backup-reminder"></div><div class="family-actions"><button id="export-backup">导出全部孩子的进度</button><label class="file-button">选择备份恢复<input id="import-backup" type="file" accept=".json,application/json"></label></div><div id="restore-preview" hidden><p id="restore-description"></p><button id="confirm-restore">确认恢复这些档案</button><button id="cancel-restore">取消</button></div><small>备份包含本机学习记录，不含原始录音。恢复会新增档案，保留已有学习记录。满额备份可替换未使用的默认档案；离线音频包需在新设备重新下载。</small></section>`,
        );
      const $ = (id) => section.querySelector('#' + id);
      function backupReminder() {
        let last = 0;
        try {
          last = Number(localStorage.getItem('bear-backup-last-export') || 0);
        } catch {
          $('backup-reminder').textContent =
            '当前浏览器无法保存备份提醒，请及时导出并妥善保存进度文件。';
          return;
        }
        $('backup-reminder').textContent = last
          ? `最近生成备份：${new Date(last).toLocaleString('zh-CN')}。${Date.now() - last > 7 * 86400000 ? '已超过七天，建议再导出一次。' : '请确认文件已保存到浏览器之外。'}`
          : '还没有生成过进度备份。建议每周导出一次，换设备或清理浏览器前也请备份。';
      }
      backupReminder();
      $('export-backup').onclick = () => {
        try {
          const blob = new Blob([BearProfiles.backupText()], {
              type: 'application/json',
            }),
            url = URL.createObjectURL(blob),
            a = document.createElement('a');
          a.href = url;
          a.download = `UU说英语-学习进度-${BearLearning.today()}.json`;
          a.click();
          try {
            localStorage.setItem('bear-backup-last-export', String(Date.now()));
          } catch {}
          backupReminder();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          report('备份已生成，请妥善保存下载文件。');
        } catch (e) {
          report(e);
        }
      };
      let pending = null;
      $('import-backup').onchange = async (e) => {
        pending = null;
        $('restore-preview').hidden = true;
        try {
          const file = e.target.files[0];
          if (!file) return;
          BearProfiles.checkBackupSize(file.size);
          const text = await file.text(),
            rows = BearProfiles.inspect(text),
            info = BearProfiles.restoreInfo(text);
          pending = text;
          $('restore-description').textContent =
            `将恢复 ${rows.length} 个孩子档案：${rows.map((c) => c.name).join('、')}。${info.replacesEmptyDefault ? '本机未使用的默认档案将被这些档案替换。' : '现有档案与学习记录不会覆盖。'}`;
          $('restore-preview').hidden = false;
        } catch (error) {
          report(error);
        } finally {
          e.target.value = '';
        }
      };
      $('cancel-restore').onclick = () => {
        pending = null;
        $('restore-preview').hidden = true;
      };
      $('confirm-restore').onclick = async () => {
        if (!pending || $('confirm-restore').disabled) return;
        $('confirm-restore').disabled = true;
        $('cancel-restore').disabled = true;
        try {
          const previous = BearProfiles.current().id,
            n = await BearProfiles.import(pending);
          pending = null;
          if (previous !== BearProfiles.current().id) {
            location.reload();
            return;
          }
          BearFeatures.openParents('profiles', 'backup');
          document.getElementById('family-status').textContent =
            `已恢复 ${n} 个档案，请从上方切换查看。`;
        } catch (e) {
          report(e);
        } finally {
          $('confirm-restore').disabled = false;
          $('cancel-restore').disabled = false;
        }
      };
    },
  };
})();

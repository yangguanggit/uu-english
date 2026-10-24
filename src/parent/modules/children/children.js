(() => {
  'use strict';
  const esc = (s) => BearGrowth.esc(s);
  window.BearParentChildren = {
    mount(section, report) {
      const child = BearProfiles.current();
      section.insertAdjacentHTML(
        'afterbegin',
        `<div class="feature-card parent-child-card" data-parent-home="profiles"><h3>当前孩子</h3><p>当前：<strong>${esc(child.name)}</strong>。每个孩子的任务、跟读、奖励、语速与阅读进度独立保存。</p><label>切换孩子 <select id="child-select" aria-label="切换孩子">${BearProfiles.list()
          .map(
            (c) =>
              `<option value="${c.id}" ${c.id === child.id ? 'selected' : ''}>${esc(c.name)}</option>`,
          )
          .join(
            '',
          )}</select></label></div><section class="feature-card" data-parent-detail="children"><h3>管理孩子档案</h3><div class="family-form"><input id="child-name" maxlength="20" placeholder="孩子昵称，不必填写真名" aria-label="孩子昵称"><button id="add-child">新增档案</button><button id="rename-child">修改当前昵称</button><details class="parent-more parent-danger"><summary>删除当前档案…</summary><p>只删除当前孩子，其他档案与共享离线包保留。</p><button id="delete-child" class="danger-button">删除当前档案</button></details></div><p class="profile-storage-note">昵称与进度只保存在当前浏览器中，不会上传服务器。删除档案会同时删除该孩子的本机学习记录、收藏和设置；其他孩子与共享离线包保留。</p><dialog id="delete-child-dialog" class="parent-gate delete-profile-dialog" aria-labelledby="delete-child-title"><h2 id="delete-child-title">删除这个档案？</h2><p id="delete-child-description"></p><p>删除后无法撤销，建议先取消并导出备份。</p><button id="cancel-delete-child" class="continue-button">取消，保留档案</button><button id="confirm-delete-child" class="danger-button">确认删除档案和进度</button><p id="delete-child-error" role="alert"></p></dialog></section>`,
      );
      const $ = (id) => section.querySelector('#' + id);
      let saving = false;
      const setSaving = (value) => {
        saving = value;
        for (const control of section.querySelectorAll('#child-select, .family-form button, #confirm-delete-child')) control.disabled = value;
      };
      $('child-select').onchange = async (e) => {
        if (saving) return;
        setSaving(true);
        try {
          BearLesson.pause();
          BearFeatures.pause();
          BearFoundation.pause();
          await BearProfiles.switchTo(e.target.value);
        } catch (error) {
          report(error);
          e.target.value = child.id;
        } finally {
          setSaving(false);
        }
      };
      $('add-child').onclick = async () => {
        if (saving) return;
        setSaving(true);
        try {
          const id = await BearProfiles.add($('child-name').value);
          await BearProfiles.switchTo(id);
        } catch (e) {
          report(e);
        } finally {
          setSaving(false);
        }
      };
      $('rename-child').onclick = async () => {
        if (saving) return;
        setSaving(true);
        try {
          await BearProfiles.rename($('child-name').value);
          BearFeatures.openParents('profiles', 'children');
        } catch (e) {
          report(e);
        } finally {
          setSaving(false);
        }
      };
      const deletion = $('delete-child-dialog');
      $('delete-child').onclick = () => {
        $('delete-child-description').textContent =
          `即将删除「${child.name}」的全部本机学习记录。${BearProfiles.list().length === 1 ? '这是最后一个档案，删除后会创建一个空白档案。' : ''}`;
        $('delete-child-error').textContent = '';
        deletion.showModal();
        $('cancel-delete-child').focus();
      };
      $('cancel-delete-child').onclick = () => deletion.close();
      $('confirm-delete-child').onclick = async () => {
        if (saving) return;
        setSaving(true);
        try {
          BearLesson.pause();
          BearFeatures.pause();
          BearFoundation.pause();
          await BearProfiles.remove(child.id);
          deletion.close();
          location.reload();
        } catch (e) {
          $('delete-child-error').textContent = e.message;
        } finally {
          setSaving(false);
        }
      };
    },
  };
})();

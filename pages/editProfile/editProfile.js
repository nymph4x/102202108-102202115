// pages/editProfile/editProfile.js
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {},
    newAvatarUrl: '',
    newNickName: '',
    newName: '',
    newStudentId: '',
    newSchool: '',
    newMajor: '',
    newEmail: '',
    newPhone: '',
    newLanguages: '',
    newDataTools: '',
    newVisualTools: '',
    newMLTechniques: '',
    newIntroduction: '',
    newProjects: ''
  },

  onLoad() {
    const that = this;
    const userInfo = getApp().globalData.userInfo;

    // 从数据库中获取用户信息并初始化数据
    this.setData({
      userInfo: userInfo,
      newAvatarUrl: userInfo.avatarUrl,
      newNickName: userInfo.nickName || '',
      newName: userInfo.name,
      newStudentId: userInfo.studentId,
      newSchool: userInfo.school,
      newMajor: userInfo.major,
      newEmail: userInfo.email || '', // 如果数据库中没有存储值，默认空字符串
      newPhone: userInfo.phone || '',
      newLanguages: userInfo.skills?.languages || '',
      newDataTools: userInfo.skills?.dataTools || '',
      newVisualTools: userInfo.skills?.visualTools || '',
      newMLTechniques: userInfo.skills?.mlTechniques || '',
      newIntroduction: userInfo.introduction || '',
      newProjects: userInfo.projects || ''
    });
  },

  // 更新各个字段值
  updateNickName(e) { this.setData({ newNickName: e.detail.value }); },
  updateName(e) { this.setData({ newName: e.detail.value }); },
  updateStudentId(e) { this.setData({ newStudentId: e.detail.value }); },
  updateSchool(e) { this.setData({ newSchool: e.detail.value }); },
  updateMajor(e) { this.setData({ newMajor: e.detail.value }); },
  updateEmail(e) { this.setData({ newEmail: e.detail.value }); },
  updatePhone(e) { this.setData({ newPhone: e.detail.value }); },
  updateLanguages(e) { this.setData({ newLanguages: e.detail.value }); },
  updateDataTools(e) { this.setData({ newDataTools: e.detail.value }); },
  updateVisualTools(e) { this.setData({ newVisualTools: e.detail.value }); },
  updateMLTechniques(e) { this.setData({ newMLTechniques: e.detail.value }); },
  updateIntroduction(e) { this.setData({ newIntroduction: e.detail.value }); },
  updateProjects(e) { this.setData({ newProjects: e.detail.value }); },

  // 上传头像
  uploadAvatar() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: `avatar/${Date.now()}-${Math.floor(Math.random() * 1000)}.png`,
          filePath: tempFilePath,
          success: uploadRes => {
            that.setData({
              newAvatarUrl: uploadRes.fileID
            });
          },
          fail: err => {
            console.error('Failed to upload avatar:', err);
          }
        });
      }
    });
  },

  // 保存个人信息
  saveProfile() {
    const updatedUserInfo = {
      avatarUrl: this.data.newAvatarUrl,
      nickName: this.data.newNickName,
      name: this.data.newName,
      studentId: this.data.newStudentId,
      school: this.data.newSchool,
      major: this.data.newMajor,
      email: this.data.newEmail,
      phone: this.data.newPhone,
      skills: {
        languages: this.data.newLanguages,
        dataTools: this.data.newDataTools,
        visualTools: this.data.newVisualTools,
        mlTechniques: this.data.newMLTechniques
      },
      introduction: this.data.newIntroduction,
      projects: this.data.newProjects
    };

    wx.cloud.callFunction({
      name: 'getUserOpenid',
      success: res => {
        const openid = res.result.openid;
        db.collection('users').where({ _openid: openid }).update({
          data: updatedUserInfo,
          success: () => {
            wx.showToast({
              title: '更新成功',
              icon: 'success'
            });
            getApp().globalData.userInfo = updatedUserInfo;
            wx.navigateBack(); // 返回个人中心页面
          },
          fail: err => {
            console.error('Failed to update profile:', err);
          }
        });
      }
    });
  }
});


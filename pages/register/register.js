Page({

  data: {
    userInfo: null,
    studentId: '',
    name: '',
    school: '',
    major: '',
    zh: '',
    ps1: '',
    ps2: '',
    avatarUrl: ''  // Store the uploaded avatar URL here
  },

  getUserProfile(e) {
    var that = this;
    wx.getUserProfile({
      desc: '获取用户头像及昵称', 
      success: (res) => {
        console.log(res);
        that.setData({
          userInfo: res.userInfo,
          avatarUrl: res.userInfo.avatarUrl // Save avatar URL
        });
      }
    });
  },

  getStudentId(e) {
    this.setData({
      studentId: e.detail.value
    });
  },

  getName(e) {
    this.setData({
      name: e.detail.value
    });
  },

  getSchool(e) {
    this.setData({
      school: e.detail.value
    });
  },

  getMajor(e) {
    this.setData({
      major: e.detail.value
    });
  },

  getZh(e) {
    this.setData({
      zh: e.detail.value
    });
  },

  getPassword(e) {
    this.setData({
      ps1: e.detail.value
    });
  },

  getPassword2(e) {
    this.setData({
      ps2: e.detail.value
    });
  },

  uploadAvatar() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePath = res.tempFilePaths[0];
        wx.cloud.uploadFile({
          cloudPath: `avatar/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}.png`,
          filePath: tempFilePath,
          success: (uploadRes) => {
            console.log('Avatar uploaded:', uploadRes.fileID);
            that.setData({
              avatarUrl: uploadRes.fileID
            });
          },
          fail: console.error
        });
      }
    });
  },

  // New function to navigate to the login page
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login' 
    });
  },

  register() {
    // Validate password
    if (this.data.ps1 !== this.data.ps2) {
      wx.showToast({
        title: '密码不一致',
        icon: 'error'
      });
      return;
    }

    // Check if all fields are filled
    if (!this.data.studentId || !this.data.name || !this.data.school || !this.data.major || !this.data.zh || !this.data.ps1 || !this.data.avatarUrl) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error'
      });
      return;
    }

    var that = this;
    wx.cloud.database().collection("users").add({
      data: {
        studentId: that.data.studentId,
        name: that.data.name,
        school: that.data.school,
        major: that.data.major,
        admin: that.data.zh,
        password: that.data.ps1,
        avatarUrl: that.data.avatarUrl,
        registrationDate: Date.now()
      },
      success(res) {
        wx.showToast({
          title: '注册成功',
        });
        console.log(res);

        // Redirect to the login page after successful registration
      wx.navigateTo({
        url: '/pages/login/login'  // Adjust the path to your login page if necessary
      });
      },
      fail(err) {
        wx.showToast({
          title: '注册失败',
          icon: 'error'
        });
        console.error(err);
      }
    });
  }

});

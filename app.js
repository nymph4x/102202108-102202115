// app.js
App({
  globalData: {
    openid: null,       // 存储用户 openid
  },

  onLaunch() {
    const that = this;

    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'projectpartner-9g3x4y5p1f7bacfc',  // 云开发环境 ID
        traceUser: true
      });
    }

    // 调用云函数获取 openid
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      success: res => {
        console.log('获取用户 openid 成功: ', res.result.openid);
        that.globalData.openid = res.result.openid;  // 存储到全局变量
      },
      fail: err => {
        console.error('获取 openid 失败: ', err);
      }
    });

  },

   
});

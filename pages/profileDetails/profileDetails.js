// pages/profileDetails/profileDetails.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
  }
});

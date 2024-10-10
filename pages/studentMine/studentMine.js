// pages/studentMine/studentMine.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    userInfo: {} // 用户信息
  },

  onLoad() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const that = this;
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      success(res) {
        console.log("cloud function getUserOpenid result:",res);
        const openid = res.result.openid;
        db.collection('users').where({ _openid: openid }).get({
          success(dbRes) {
            console.log("database Response:", dbRes);
            if (dbRes.data.length > 0) {
              that.setData({
                userInfo: dbRes.data[0]
              });
              console.log("User Info Set:", that.data.userInfo);
            }
          },
          fail(err) {
            console.error('Failed to load user info:', err);
          }
        });
      }
    });
  },

  // 跳转到我的项目页面
  goToMyProjects() {
    wx.navigateTo({
      url: '/pages/myProjects/myProjects'
    });
  },

  // 跳转到我的帖子页面
  // 跳转到我的帖子页面
goToMyPosts() {
  const username = this.data.userInfo.username; // 假设用户名存储在 userInfo 对象中
  wx.navigateTo({
    url: '/pages/myPosts/myPosts'
  });
},


  // 跳转到详情页
  viewDetails() {
    wx.navigateTo({
      url: '/pages/profileDetails/profileDetails'
    });
  },
  // 跳转到编辑页面
  editProfile() {
    wx.navigateTo({
      url: '/pages/editProfile/editProfile'  // 跳转到编辑页面
    });
  },
});
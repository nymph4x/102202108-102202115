// pages/login/login.js
Page({
  data: {
    account: '',
    password: ''
  },

  // Get user input for account
  getAccount(e) {
    this.setData({
      account: e.detail.value
    });
  },

  // Get user input for password
  getPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // Handle login
  login() {
    const account = this.data.account;
    const password = this.data.password;

    // Ensure the user has inputted both account and password
    if (!account || !password) {
      wx.showToast({
        title: '请输入账号和密码',
        icon: 'error'
      });
      return;
    }

    // Query the database to check if the account and password match
    wx.cloud.database().collection("users")
      .where({
        admin: account,
        password: password
      })
      .get({
        success: (res) => {
          if (res.data.length > 0) {
            // Login success
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            });
            // Redirect to the home page or dashboard
            wx.switchTab({
              url: '/pages/studentHome/studentHome'  
            });
          } else {
            // Login failure
            wx.showToast({
              title: '账号或密码错误',
              icon: 'error'
            });
          }
        },
        fail: (err) => {
          console.error(err);
          wx.showToast({
            title: '登录失败',
            icon: 'error'
          });
        }
      });
  },

  // Redirect to the registration page
  goToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'  // Adjust the path if necessary
    });
  }
});

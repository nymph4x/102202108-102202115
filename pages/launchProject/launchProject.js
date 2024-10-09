Page({
 
  submitForm: function(event) {
    const formData = event.detail.value;

    console.log('表单数据：', formData)

    // 存储数据到本地
    wx.setStorageSync('projectData', formData);

    // 提示用户
    wx.showToast({
      title: '项目发起成功',
      icon: 'success',
      duration: 2000
    });

    // 可选: 跳转到项目列表或其他页面
    // wx.navigateTo({ url: '/pages/projectList/projectList' });
  }
});

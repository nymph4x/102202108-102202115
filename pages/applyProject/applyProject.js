// pages/applyProject/applyProject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  formSubmit: function(e) {  
    const formData = e.detail.value;  
    // 在这里处理表单数据，例如发送到服务器
    
    console.log("申请数据", formData);

    wx.showToast({  
      title: '申请提交成功',  
      icon: 'success',  
      duration: 2000  
    });  
    // 可以添加代码将formData发送到服务器进行进一步处理  
    // 例如：wx.request({...})  
  },  
  
  formReset: function() {  
    // 重置表单  
    this.setData({  
      // 如果需要，可以在这里重置data中的表单数据  
    });  
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
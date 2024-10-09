// pages/invoProjectDetails/invoProjectDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: '城市智能交通分析',
    projectImage: 'images/project_image.png',
    projectIntro: '通过大数据分析优化城市交通流量，提供实时交通信息和建议。',
    projectMembers: [
      { name: '李四', avatar: 'images/student_photo.png' },
      { name: '王五', avatar: 'images/student_photo.png' },
      { name: '赵六', avatar: 'images/student_photo.png' }
    ],
    teacher: '张栋',
    teacherAvatar: 'images/teacher_photo.png',
    leader: '张三',
    leaderAvatar: 'images/student_photo.png',
    progress: 5, // 示例进度
    projectStatus: '招募中'
  },
  
  updateStatus(event) {
    this.setData({
      projectStatus: event.detail.value
    });
  },

  // 聊天按钮点击事件处理  
  onChatTap: function() {  
    // 这里可以跳转到聊天页面，或者打开聊天窗口  
    // 例如使用 wx.navigateTo 跳转到聊天页面  
    wx.navigateTo({  
      url: '/pages/chatting/chatting' // 假设你有一个聊天页面  
    });  
  }  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
// pages/projectDetail/projectDEtail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: '机器学习的图像与几何基础实践',
    projectImage: 'images/project_image.png',
    projectIntro: '该项目结合机器学习与几何学，提升图像处理的能力。',
    projectMembers: [
      { name: '成员A', avatar: 'images/student_photo.png' },
      { name: '成员B', avatar: 'images/student_photo.png' },
      { name: '成员C', avatar: 'images/student_photo.png' }
    ],
    teacher: '张栋',
    teacherAvatar: 'images/teacher_photo.png',
    leader: '张三',
    leaderAvatar: 'images/student_photo.png',
    progress: 5, // 示例进度
    projectStatus: '招募中'
  },
  
  applyToProject() {  
    wx.navigateTo({  
      url: '/pages/applyProject/applyProject', // 假设的申请页面路径  
    });  
  },  
  
  updateStatus(event) {
    this.setData({
      projectStatus: event.detail.value
    });
  },

    // 这里可以添加其他逻辑，如更新项目状态等  
  

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
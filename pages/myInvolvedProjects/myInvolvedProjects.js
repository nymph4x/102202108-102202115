// pages/myInvolvedProjects/myInvolvedProjects.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    projects: [  
      {  
        id: 1,
        name: '机器视觉图像与几何基础实践',  
        brief: '通过实践学习机器视觉中的图像处理和几何基础，帮助学生掌握相关理论与应用技术，培养解决实际问题的能力。',
        // 可以添加更多项目属性，如id、图片等  
      }, 
      {
        id: 2,
        name: '教育数据分析平台',  
        brief: '建立一个平台，通过分析学生学习数据，帮助教师优化教学策略。',
        // 可以添加更多项目属性，如id、图片等  
      } 
      // 可以添加更多项目数据  
    ] ,
    
    selectedButton:'' 
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app = getApp();  
    // 这里可以检查app.globalData.selectedProjectType，但通常不需要做额外操作，  
    // 因为返回页面1时，页面1的onLoad会处理状态更新。  
  },

  onReturnToPage1: function() {  
    wx.navigateBack(); // 返回页面1  
  }  ,

  navigateToProjectDetails: function(event) {  
    const project = event.currentTarget.dataset.project;  
    // 这里假设项目详情页面通过项目名称作为参数进行跳转  
    // 在实际应用中，应该使用唯一标识符（如id）作为参数  
    wx.navigateTo({  
      url: `/pages/pactiProjectDetails/pactiProjectDetails?id=${project.id}`  
    });  
  } , 

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
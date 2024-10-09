// pages/myPosts/myPosts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    posts: [  
      { id: 2, name:'张三', title: '我是数据科学与大数据专业的学生，最近想要加入与本人专业相符的项目...', time: '12月14日23:36' },  
      // 可以添加更多项目数据  
    ] ,
    
    selectedButton:'' 
  },  

  onLoad: function() {  
    const app = getApp();  
    this.setData({  
      selectedButton: app.globalData.selectedProjectType  
    });  
  },  
  onButtonClick: function(event) {  
    const buttonType = event.currentTarget.dataset.type;  
    const app = getApp();  
    app.globalData.selectedProjectType = buttonType; // 更新全局状态  
  
    if (buttonType === 'initiated') {  
      // 如果已经在页面1，则不需要跳转  
      // 但如果需要刷新数据，可以在这里调用相关函数  
    } else if (buttonType === 'participated') {  
      wx.navigateTo({  
        url: '/pages/historyposts/historyposts', // 跳转到页面
        success: function() {  
          // 可以在这里做一些额外的操作，比如发送数据到页面 
        }  
      });  
    }  
  },
  
  navigateTopostDetails: function(event) {  
  
    wx.navigateTo({  
      url: '/pages/Postcontent4/Postcontent4'
    });  
  } , 

  
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
// pages/historyposts/historyposts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    posts: [  
      { id: 1, name:'会飞的鱼', title: '寻求编程高手！一起打造学习管理系统', time: '12月13日23:36' },  
      { id: 2, name:'天成小王子', title: '设计专业学生，寻求跨专业合作机会！', time: '12月13日23:10' }, 
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
        url: '/pages/myPosts/myPosts', // 跳转到页面
        success: function() {  
          // 可以在这里做一些额外的操作，比如发送数据到页面 
        }  
      });  
    }  
  },
  
  navigateToPost: function(e) {  
    const postId = e.currentTarget.dataset.id;  
    
    let url;  
    if (postId === 1) {  
      url = `/pages/Postcontent1/Postcontent1`;  
    } else if (postId === 2) {  
      url = `/pages/Postcontent2/Postcontent2`;  
    } else if (postId === 3) {  
      url = `/pages/Postcontent3/Postcontent3`;  
    } else {  
      // 处理未知或无效的 postId  
      wx.showToast({  
        title: '无效的帖子ID',  
        icon: 'none'  
      });  
      return;  
    }  
    
    wx.navigateTo({  
      url: url  
    });  
  },

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
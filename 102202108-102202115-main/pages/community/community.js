// pages/community/community.js
Page({ 
  // 当搜索框输入内容变化时触发  
  onSearchInput: function(e) {  
    this.setData({  
      searchInput: e.detail.value  
    });  
  },  
  
  // 当搜索按钮被点击时触发  
  onSearchTap: function() {  
    const searchInput = this.data.searchInput;  
    if (searchInput) {  
      // 在这里执行搜索操作，例如调用API  
      wx.showToast({  
        title: '搜索中...',  
        icon: 'loading',  
        duration: 2000 // 假设搜索操作需要2秒  
      });  
  
      // 模拟搜索操作完成后的回调  
      setTimeout(() => {  
        wx.hideToast();  
        wx.showToast({  
          title: '搜索完成！',  
          icon: 'success'  
        });  
        // 这里可以添加跳转到搜索结果页面的代码，例如：  
         wx.navigateTo({ url: `/pages/search-results/search-results?query=${searchInput}` });  
      }, 2000);  
    } else {  
      wx.showToast({  
        title: '请输入搜索关键词',  
        icon: 'none'  
      });  
    }  
  },  
  data: { 
    searchInput: '', // 用于存储搜索框中的文本 
    posts: [  
      { id: 1, name:'会飞的鱼', title: '寻求编程高手！一起打造学习管理系统', time: '12月13日23:36' },  
      { id: 2, name:'天成小王子', title: '设计专业学生，寻求跨专业合作机会！', time: '12月13日23:10' },  
      { id: 3, name:'沉迷代码', title: '分享我在“智能校园”项目中的经验', time: '12月13日23:00' }  
    ]  
  },  
  onLoad: function(options) {  
    const postId = options.id;  
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
  navigateToPostPage: function() {  
    // 跳转到发帖页面  
    wx.navigateTo({  
      url: '/pages/setPost/setPost'  
    });  
  }  
});

  

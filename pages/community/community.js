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
    searchInput: '',
    posts: [],
    limit: 10,
    skip: 0,
  },

  onLoad() {
    this.loadPosts();
  },

  loadPosts() {
    const db = wx.cloud.database();
    db.collection('posts').skip(this.data.skip).limit(this.data.limit).get().then(res => {
      this.setData({
        posts: this.data.posts.concat(res.data),
        skip: this.data.skip + this.data.limit
      });
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
  },

  viewPostDetail(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/postDetail/postDetail?id=${postId}`
    });
  },

  loadMore() {
    this.loadPosts();
  },
  navigateToPostPage: function() {  
    // 跳转到发帖页面  
    wx.navigateTo({  
      url: '/pages/setPost/setPost'  
    })
  }  
});

  

// pages/postDetail/postDetail.js
Page({
  data: {
    post: {}
  },

  onLoad(options) {
    const postId = options.id;
    this.getPostDetail(postId);
  },

  getPostDetail(postId) {
    const db = wx.cloud.database();
    db.collection('posts').doc(postId).get().then(res => {
      const post = res.data;
      post.createTime = this.formatTime(post.createTime);
      this.setData({
        post: post
      });
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
    });
  },

  formatTime(time) {
    const date = new Date(time);
    return date.toLocaleString();
  },

  goBack() {
    wx.navigateBack();
  },

  goToProfile(e) {
    const username = e.currentTarget.dataset.username;
    wx.navigateTo({
      url: `/pages/myPosts/myPosts?username=${username}`
    });
  }
});

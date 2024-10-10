// pages/postDetail/postDetail.js
Page({
  data: {
    post: {},
    author: {
      username: '',
      avatarUrl: ''
    }
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
        post: post,
        'author.username': post.username, // 设置发帖人用户名
        'author.avatarUrl': post.avatarUrl // 设置发帖人头像
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

  goToProfile() {
    const username = this.data.author.username;
    wx.navigateTo({
      url: `/pages/myPosts/myPosts?username=${username}`
    });
  }
});

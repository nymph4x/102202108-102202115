// pages/myPosts/myPosts.js
Page({
  data: {
    user: {
      username: '',
      avatarUrl: ''
    },
    posts: []
  },

  onLoad(options) {
    const username = options.username;
    this.setData({
      'user.username': username
    });
    this.getUserProfile(username);
  },

  getUserProfile(username) {
    const db = wx.cloud.database();
    db.collection('posts').where({
      username: username
    }).get().then(res => {
      const posts = res.data.map(post => {
        post.createTime = this.formatTime(post.createTime);
        return post;
      });
      this.setData({
        posts: posts
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

  goToPostDetail(event) {
    const postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/postDetail/postDetail?id=${postId}`
    });
  }
});

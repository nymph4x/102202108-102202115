Page({
  data: {
    title: '',
    content: '',
    tags: []
  },

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },

  onTagsInput(e) {
    const tags = e.detail.value.split(' ');
    this.setData({
      tags: tags
    });
  },

  submitPost() {
    const { title, content, tags } = this.data;

    if (!title || !content) {
      wx.showToast({
        title: '请填写标题和内容',
        icon: 'none'
      });
      return;
    }

    const db = wx.cloud.database();
    db.collection('posts').add({
      data: {
        username: "张三", // 假定为当前用户
        avatarUrl: "/images/avatar.png", // 默认头像路径
        title: title,
        content: content,
        tags: tags,
        createTime: new Date()
      },
      success: () => {
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        });
        wx.navigateBack();  // 发布成功后返回
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: '发布失败',
          icon: 'none'
        });
      }
    });
  }
});

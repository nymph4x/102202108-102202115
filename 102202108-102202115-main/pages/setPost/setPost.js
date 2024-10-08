// pages/setPost/setPost.js
// pages/post/post.js  
Page({  
  data: {  
    title: '', // 标题  
    content: '', // 内容  
    selectedTag: '', // 选中的标签  
    tags: ['技术', '编程', '学习', '分享', '招募伙伴', '寻找项目', '跨专业'] // 标签列表  
  },  
  
  // 处理标题输入  
  handleTitleInput(e) {  
    this.setData({  
      title: e.detail.value  
    });  
  },  
  
  // 处理内容输入  
  handleContentInput(e) {  
    this.setData({  
      content: e.detail.value  
    });  
  },  
  
  // 处理标签选择  
  handleTagChange(e) {  
    const selectedTag = this.data.tags[e.detail.value];  
    this.setData({  
      selectedTag: selectedTag  
    });  
  },  
  
  // 发布帖子  
  handlePublish() {  
    // 这里应该添加发布帖子的逻辑，比如发送到服务器  
    // 为了示例，我们仅仅打印出数据  
    console.log('发布帖子:', {  
      title: this.data.title,  
      content: this.data.content,  
      tag: this.data.selectedTag  
    });  
  
    // 跳转页面（假设发布成功后跳转到帖子列表页面）  
    wx.navigateTo({  
      url: '/pages/postList/postList' // 需要根据实际页面路径调整  
    });  
  },  
  
  // 页面加载时的初始化逻辑（可选）  
  onLoad() {  
    // 可以在这里做一些初始化工作，比如获取标签列表等  
  }  
});
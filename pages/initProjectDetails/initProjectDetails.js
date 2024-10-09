// pages/initProjectDetails/initProjectDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: '城市智能交通分析',
    projectImage: 'images/project_image.png',
    projectIntro: '通过大数据分析优化城市交通流量，提供实时交通信息和建议。',
    projectMembers: [
      { name: '李四', avatar: 'images/student_photo.png' },
      { name: '王五', avatar: 'images/student_photo.png' },
      { name: '赵六', avatar: 'images/student_photo.png' }
    ],
    teacher: '张栋',
    teacherAvatar: 'images/teacher_photo.png',
    leader: '张三',
    leaderAvatar: 'images/student_photo.png',
    progress: 5, // 示例进度
    projectStatus: '招募中',
    statusOptions: ['招募中', '进行中', '已完成'], // 项目状态选项  
    selectedStatus: 0 // 初始选中的状态索引  
  },
  
  // 更新项目进度  
  updateProgress(event) {  
    this.setData({  
      progress: event.detail.value  
    });  
  },  
  
  // 更新项目状态  
  updateStatus(event) {  
    this.setData({  
      selectedStatus: event.detail.value,  
      projectStatus: this.data.statusOptions[event.detail.value]  
    });  
  }  ,

  // 聊天按钮点击事件处理  
  onChatTap: function() {  
    // 这里可以跳转到聊天页面，或者打开聊天窗口  
    // 例如使用 wx.navigateTo 跳转到聊天页面  
    wx.navigateTo({  
      url: '/pages/chatting/chatting' // 假设你有一个聊天页面  
    });  
  }  ,

  
})
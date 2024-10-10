// pages/message/message.js
const db = wx.cloud.database();  // 初始化数据库

Page({
  data: {
    selectedTab: 'group',  // 默认选中“群聊”
    chatGroups: [],        // 群聊列表
    notifications: []      // 通知列表
  },

  onLoad() {
    // 加载群聊和通知数据
    this.loadChatGroups();
    this.loadNotifications();
  },

  // 切换选项卡
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      selectedTab: tab
    });
  },

  // 加载群聊数据
  loadChatGroups() {
    const that = this;

    // 从数据库 chat-groups 中获取群聊数据
    db.collection('chat-groups').get({
      success: res => {
        console.log('获取群聊数据成功:', res.data);
        that.setData({
          chatGroups: res.data  // 将群聊数据设置到页面
        });
      },
      fail: err => {
        console.error('获取群聊数据失败:', err);
      }
    });
  },

  // 加载通知数据
  loadNotifications() {
    // 模拟从数据库获取通知数据
    const notifications = [
      { id: 1, message: '您已申请加入健康监测项目，等待项目负责人审批。' },
      { id: 2, message: '您收到了一条新的项目邀请，请查看。' }
    ];
    this.setData({
      notifications: notifications
    });
  },
  // 点击群聊项，跳转到聊天界面
  goToChat(e) {
    const chatId = e.currentTarget.dataset.id;
    const chatName = e.currentTarget.dataset.name;
    
    // 使用 wx.navigateTo 跳转到聊天界面，并传递群聊的相关信息
    wx.navigateTo({
      url: `/pages/chatting/chatting?groupId=${chatId}&groupName=${chatName}`  // 传递群聊ID和名称
    });
  }
});

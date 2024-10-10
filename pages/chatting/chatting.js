const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    groupId: '',         // 群组ID
    groupName: '',       // 群聊名称
    currentUserOpenId: '', // 当前用户的 openid
    currentUserAvatar: '', // 当前用户的头像
    currentUserName: '', // 当前用户的名字
    messages: [],        // 聊天记录
    inputMessage: '',    // 输入框中的消息
  },

  // 页面加载时获取群聊信息和用户openID
  onLoad(options) {
    const groupId = options.groupId;
    const groupName = options.groupName;
    
    // 直接从 options 获取传递过来的 groupId 和 groupName
    this.setData({
      groupId: groupId,  // 设置群组ID
      groupName: groupName  // 设置群聊名称
    });

    this.getUserInfo();  // 获取当前用户信息
  },

  // 获取当前用户的头像和昵称
  getUserInfo() {
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      success: res => {
        const openid = res.result.openid;

        // 从 users 数据库获取用户信息
        db.collection('users').where({
          _openid: openid
        }).get().then(userRes => {
          if (userRes.data.length > 0) {
            const userInfo = userRes.data[0];  // 假设每个 openid 只对应一个用户
            this.setData({
              currentUserOpenId: openid,
              currentUserAvatar: userInfo.avatarUrl,  // 用户头像
              currentUserNickname: userInfo.name  // 用户名字
            });
            // 开始监听消息
            this.listenToMessages();
          } else {
            console.error('用户信息不存在');
          }
        }).catch(err => {
          console.error('获取用户信息失败', err);
        });
      },
      fail: err => {
        console.error('获取 openid 失败', err);
      }
    });
  },

  // 实时监听聊天记录
  listenToMessages() {
    const that = this;
    db.collection('chat-record').where({
      groupId: this.data.groupId
    }).orderBy('timestamp', 'asc').watch({
      onChange: function(snapshot) {
        console.log('收到新的聊天消息', snapshot);
        that.setData({
          messages: snapshot.docs
        });
        that.scrollToBottom();  // 滚动到底部显示最新消息
      },
      onError: function(err) {
        console.error('监听聊天记录失败', err);
      }
    });
  },

  // 输入框事件处理
  onInputChange(e) {
    this.setData({
      inputMessage: e.detail.value
    });
  },

  // 发送消息
  sendMessage() {
    if (!this.data.inputMessage.trim()) {
      return;
    }

    // 构造消息内容
    const message = {
      groupId: this.data.groupId,
      senderOpenId: this.data.currentUserOpenId,  // 当前用户的 openid
      message: this.data.inputMessage,  // 消息内容
      timestamp: new Date(),  // 时间戳
      avatarUrl: this.data.currentUserAvatar,  // 发送者头像
      name: this.data.currentUserName  // 发送者昵称
    };

    // 将消息存储到 chat-record 数据库中
    db.collection('chat-record').add({
      data: message,
      success: res => {
        console.log('消息发送成功', res);
        this.setData({
          inputMessage: ''  // 清空输入框
        });
      },
      fail: err => {
        console.error('消息发送失败', err);
      }
    });
  },

  // 滚动到最底部（新消息时调用）
  scrollToBottom() {
    wx.createSelectorQuery().select('.chat-box').boundingClientRect(function(rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom
      });
    }).exec();
  }
});

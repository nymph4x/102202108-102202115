const db = wx.cloud.database();

Page({
  data: {
    chatId: 1,  // 群聊 ID
    chatName: '机器视觉图像与几何基础实践',  // 群聊名称
    inputValue: '', // 输入的消息内容
    messages: [],  // 消息记录
    userInfo: {},  // 当前用户信息
  },

  onLoad(options) {
    //const chatId = options.chatId;
    //const chatName = options.chatName;

    // 设置页面标题
    wx.setNavigationBarTitle({
      title: chatName
    });

    this.setData({
      chatId: chatId,
      chatName: chatName
    });

    // 获取当前用户 openid 和信息
    this.getUserInfo();
    
    // 加载聊天记录
    this.loadMessages();
  },

  // 获取当前用户的 openid 和信息
  getUserInfo() {
    const that = this;

    // 调用云函数获取当前用户的 openid
    wx.cloud.callFunction({
      name: 'getUserOpenid',
      success(res) {
        const openid = res.result.openid;
        // 从 users 数据库中获取用户信息
        db.collection('users').where({
          _openid: openid
        }).get({
          success(dbRes) {
            if (dbRes.data.length > 0) {
              that.setData({
                userInfo: dbRes.data[0]
              });
            }
          }
        });
      }
    });
  },

  // 从 chat-record 数据库加载聊天记录
  loadMessages() {
    const that = this;

    // 查询该群聊的所有消息
    db.collection('chat-record').where({
      chatId: this.data.chatId
    }).orderBy('timestamp', 'asc').get({
      success(res) {
        const messages = res.data.map(message => {
          // 判断是否是当前用户发的消息
          return {
            ...message,
            isMe: message.userId === that.data.userInfo._openid
          };
        });

        that.setData({
          messages: messages
        });
      }
    });
  },

  // 处理输入框的输入
  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  sendMessage() {
    const that = this;
    const messageContent = this.data.inputValue;

    if (messageContent.trim() === '') {
      return;  // 空消息不发送
    }

    const newMessage = {
      //chatId: this.data.chatId,
      userId: this.data.userInfo._openid,
      avatarUrl: this.data.userInfo.avatarUrl,
      userName: this.data.userInfo.name,
      content: messageContent,
      timestamp: new Date().getTime()
    };

    // 将消息保存到 chat-record 数据库
    db.collection('chat-record').add({
      data: newMessage,
      success() {
        // 清空输入框
        that.setData({
          inputValue: ''
        });
        // 重新加载聊天记录
        that.loadMessages();
      }
    });
  }
});

const app = getApp();
const db = wx.cloud.database();
const _ = db.command;

Page({
  data: {
    messages: [],  // Array to hold chat messages
    inputValue: '', // Value of the input box
    currentUserOpenId: '', // Current user's openid
    currentUserAvatar: '', // Current user's avatar
  },

  onLoad() {
    const that = this;

    // Get the user's openid and avatar from global data after login/registration
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        that.setData({
          currentUserOpenId: res.result.openid, // Assign the openid
          currentUserAvatar: app.globalData.userInfo.avatarUrl // Assume the avatar URL is stored globally after login/registration
        });
      },
      fail: err => {
        console.error('Failed to get openid: ', err);
      }
    });

    // Watch for real-time updates in the 'chat-record' collection
    this.initWatch();
  },

  initWatch() {
    const that = this;
    db.collection('chat-record')
      .orderBy('timestamp', 'asc')
      .watch({
        onChange: function (snapshot) {
          // Update the messages array when a new message is added
          if (snapshot.type === 'init' || snapshot.docChanges.length > 0) {
            that.setData({
              messages: snapshot.docs
            });
            // Scroll to the bottom of the chat
            that.scrollToBottom();
          }
        },
        onError: function (err) {
          console.error('Watch error: ', err);
        }
      });
  },

  onInput(event) {
    // Update input value
    this.setData({
      inputValue: event.detail.value
    });
  },

  sendMessage() {
    const content = this.data.inputValue;
    const that = this;

    // Ensure the message isn't empty
    if (content.trim() === '') {
      wx.showToast({
        title: 'Message cannot be empty',
        icon: 'none'
      });
      return;
    }

    // Add the message to the cloud database in the 'chat-record' collection
    db.collection('chat-record').add({
      data: {
        content: content,
        senderOpenId: this.data.currentUserOpenId,
        timestamp: new Date(),
        avatarUrl: this.data.currentUserAvatar
      },
      success(res) {
        // Clear the input after the message is sent
        that.setData({
          inputValue: ''
        });
        that.scrollToBottom();
      },
      fail(err) {
        console.error('Failed to send message: ', err);
      }
    });
  },

  // Scroll to the bottom of the chat
  scrollToBottom() {
    const query = wx.createSelectorQuery();
    query.select('.chat-area').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].scrollHeight,
        duration: 300
      });
    });
  },

  loadMoreMessages() {
    // Load previous messages if you want pagination
    // You can implement a paginated message load here
  }
});

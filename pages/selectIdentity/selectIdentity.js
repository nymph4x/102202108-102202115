// pages/selectIdentity/selectIdentity.js
Page({  
  data: {  
    identities: [  
      {  
        name: '学生',  
        icon: 'images/select-student.png',  
        fontSize: 25  
      },  
      {  
        name: '导师',  
        icon: 'images/select-teacher.png',  
        fontSize: 25   
      },  
      {  
        name: '管理员',  
        icon: 'images/select-admin.png',  
        fontSize: 25  
      }  
    ]  
  },  
  
  onLoad: function() {  
    // 在这里可以模拟一些项目数据，如果有需要的话  
    // 但在这个例子中，我们已经在data中初始化了所需的数据  
    // 因此，这里可以不做额外处理  
  },  
  
  // 身份点击事件处理函数  
  onTapIdentity: function(event) {  
    // 获取被点击的身份名称  
    const identityName = event.currentTarget.dataset.name;  
  
    // 根据身份名称跳转到不同页面  
    switch (identityName) {  
      case '学生':  
        wx.navigateTo({  
          url: '/pages/studentHome/studentHome' // 假设学生主页的路径是这个  
        });  
        break;  
      case '导师':  
        wx.navigateTo({  
          url: '/pages/teacherHome/teacherHome' // 假设导师主页的路径是这个  
        });  
        break;  
        case '管理员':  
        wx.navigateTo({  
          url: '/pages/adminHome/adminHome' // 假设管理员主页的路径是这个  
        });  
        break; 
      // 可以添加更多case来处理其他身份  
      default:  
        // 处理未知身份  
        wx.showToast({  
          title: '未知身份',  
          icon: 'none'  
        });  
        break;  
    }  

  }  

})
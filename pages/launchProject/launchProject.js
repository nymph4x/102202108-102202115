const db = wx.cloud.database();  // 云数据库实例

Page({
  data: {
    projectName: '',
    leader: '',
    date: '',
    skills: '',
    field: '',
    teacher: '',
    targetPeople: '',
    intro: ''
  },

  // 输入框处理函数
  onInputProjectName(e) {
    this.setData({ projectName: e.detail.value });
  },
  
  onInputLeader(e) {
    this.setData({ leader: e.detail.value });
  },

  onInputDate(e) {
    this.setData({ date: e.detail.value });
  },

  onInputSkills(e) {
    this.setData({ skills: e.detail.value });
  },

  onInputField(e) {
    this.setData({ field: e.detail.value });
  },

  onInputTeacher(e) {
    this.setData({ teacher: e.detail.value });
  },

  onInputTargetPeople(e) {
    this.setData({ targetPeople: e.detail.value });
  },

  onInputIntro(e) {
    this.setData({ intro: e.detail.value });
  },

  // 发起项目按钮
  launchProject() {
    const projectData = {
      projectName: this.data.projectName,
      leader: this.data.leader,
      date: this.data.date,
      skills: this.data.skills,
      field: this.data.field,
      teacher: this.data.teacher,
      targetPeople: this.data.targetPeople,
      intro: this.data.intro,
      createTime: new Date()
    };

    // 验证表单输入
    if (!this.data.projectName || !this.data.leader || !this.data.date) {
      wx.showToast({
        title: '请填写所有必填项',
        icon: 'none'
      });
      return;
    }

    // 将数据上传到项目数据库
    db.collection('projects').add({
      data: projectData,
      success: (res) => {
        console.log('项目已成功添加到projects数据库:', res);
        
        // 将项目也添加到 my-launched-projects
        db.collection('my-launched-projects').add({
          data: projectData,
          success: (res) => {
            console.log('项目已成功添加到my-launched-projects数据库:', res);
            wx.showToast({
              title: '项目发起成功',
              icon: 'success'
            });

            // 跳转到我的项目页面，或者更新项目列表
            wx.redirectTo({
              url: '/pages/myProjects/myProjects',
            });
          },
          fail: (err) => {
            console.error('项目添加到my-launched-projects失败:', err);
          }
        });
      },
      fail: (err) => {
        console.error('项目添加到projects数据库失败:', err);
      }
    });
  }
});

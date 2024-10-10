const db = wx.cloud.database();

Page({
  data: {
    currentTab: 0,  // 当前选中的 Tab，0 为“我发起的项目”，1 为“我参与的项目”
    myLaunchedProjects: [],  // 我发起的项目
    myParticipatedProjects: []  // 我参与的项目
  },

  // 页面加载时默认获取“我发起的项目”
  onLoad() {
    this.loadLaunchedProjects();
  },

  // 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    console.log("按钮index:",index);
    this.setData({ currentTab: index });

    if (index === 0) {
      this.loadLaunchedProjects();  // 加载我发起的项目
    } else {
      this.loadParticipatedProjects();  // 加载我参与的项目
    }
  },

  // 加载我发起的项目
  loadLaunchedProjects() {
    const that = this;
    db.collection('my-launched-projects').get({
      success(res) {
        console.log("获取我发起的项目成功：",res.data);
        that.setData({
          myLaunchedProjects: res.data
        });
      },
      fail(err) {
        console.error('获取我发起的项目失败', err);
      }
    });
  },

  // 加载我参与的项目
  loadParticipatedProjects() {
    const that = this;
    db.collection('my-participated-projects').get({
      success(res) {
        console.log('获取我参与的项目成功:', res.data);
        that.setData({
          myParticipatedProjects: res.data,
          myLaunchedProjects: []  // 清空发起的项目，避免之前显示错误数据
        });
      },
      fail(err) {
        console.error('获取我参与的项目失败', err);
      }
    });
  },

  // 跳转到发起项目详情页面
  goToLaunchedProjectDetail(e) {
    const projectId = e.currentTarget.dataset.id;  // 获取项目ID
    wx.navigateTo({
      url: `/pages/initProjectDetails/initProjectDetails`  // 跳转到发起项目详情页面，传递项目ID
    });
  },

  // 跳转到参与项目详情页面
  goToParticipatedProjectDetail(e) {
    const projectId = e.currentTarget.dataset.id;  // 获取项目ID
    wx.navigateTo({
      url: `/pages/invoProjectDetails/invoProjectDetails`  // 跳转到参与项目详情页面，传递项目ID
    });
  }
});

// pages/studentHome/studentHome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    searchQuery: '', // 搜索框的输入内容  
    projects: [], // 项目列表（初始化为空，实际项目中会从服务器获取）  
    filteredProjects: [], // 过滤后的项目列表（基于搜索框的内容）
    projectStatusColors: { // 定义状态与背景颜色的映射  
      '招募中': '#ffeb3b', // 黄色  
      '进行中': '#4caf50', // 绿色  
      '已完成': '#ff5722', // 橙色（或红色，根据需要）  
      // 可以添加更多状态与颜色的映射  
    },     
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 模拟从服务器获取数据  
    const simulatedData = [  
      {  
        id: 1,  
        title: '机器视觉图像与几何基础实践', 
        status: '招募中' ,
        description: '通过实践学习机器视觉中的图像处理和几何基础，帮助学生掌握相关理论与应用技术，培养解决实际问题的能力。'
      },  
      {  
        id: 2,  
        title: '健康监测应用开发',  
        status: '进行中',
        description:  '开发一款健康监测APP，利用数据科学技术实时跟踪用户的健康指标（如心率、步数、睡眠等）。'    
      },  
      // ... 可以添加更多模拟数据  
    ];  
      
    // 将模拟数据赋值给projects，并同时更新filteredProjects为相同数据  
    this.setData({  
      projects: simulatedData,  
      filteredProjects: simulatedData,   
    });  
  },   
    
  // 搜索框输入事件处理  
  onSearchInput: function(event) {  
    const searchQuery = event.detail.value;  
    this.setData({  
      searchQuery: searchQuery,  
    });  
      
    // 调用过滤函数  
    this.filterProjects(searchQuery);  
  },  

  // 设置状态过滤器的方法（可以是一个按钮点击事件或其他触发方式）  
  setStatusFilter: function(status) {  
    this.setData({  
      statusFilter: status,  
    });  
  
    // 调用过滤函数以应用新的状态过滤器  
    this.filterProjects(this.data.searchQuery);  
  },  
    
  // 根据输入内容过滤项目列表的方法  
  filterProjects: function(query) {  
    const projectsList = this.data.projects;  
    const filteredProjects = projectsList.filter(project => {  
      return project.title.toLowerCase().includes(query.toLowerCase()) ||  
             project.description.toLowerCase().includes(query.toLowerCase());  
    });  
    this.setData({  
      filteredProjects: filteredProjects,  
    });  

  },

  // 根据状态返回背景颜色的方法  
  getProjectBackgroundColor: function(status) {  
    return this.data.projectStatusColors[status] || '#ffffff'; // 默认白色，如果状态不在映射中  
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  navigateToProjectDetail: function(event) {  
    const projectId = event.currentTarget.dataset.id;  
    wx.navigateTo({  
      url: `/pages/projectDetail/projectDetail?id=${projectId}`  
    });  
  },  
  navigateToInitiateProject: function() {  
    // 这里可以添加跳转到发起项目页面的逻辑  
    wx.showToast({  
      title: '发起项目功能暂未实现',  
      icon: 'none'  
    });  
  }  
});

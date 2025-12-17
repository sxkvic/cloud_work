const authService = require('./services/authService');
const orderService = require('./services/orderService');

App({
  onLaunch() {
    // 初始化工单数据
    orderService.initOrders();
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const isLoggedIn = authService.isLoggedIn();
    
    if (!isLoggedIn) {
      // 未登录，跳转到登录页
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  },

  globalData: {
    userInfo: null
  }
});

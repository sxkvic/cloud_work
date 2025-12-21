const orderService = require('./services/orderService');

App({
  onLaunch() {
    // 初始化工单数据
    orderService.initOrders();
  },

  globalData: {
    userInfo: null
  }
});

const orderService = require('../../services/orderService');
const { ORDER_STATUS, STATUS_LIST } = require('../../utils/constants');
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    activeTab: 0,
    orders: [],
    loading: false
  },

  onLoad() {
    this.loadOrders(STATUS_LIST[0]);
  },

  onShow() {
    // 每次显示页面时刷新当前 Tab 的数据
    this.loadOrders(STATUS_LIST[this.data.activeTab]);
  },

  onTabChange(e) {
    const index = e.detail.index;
    this.setData({ activeTab: index });
    this.loadOrders(STATUS_LIST[index]);
  },

  loadOrders(status) {
    this.setData({ loading: true });
    try {
      const orders = orderService.getOrdersByStatus(status);
      this.setData({ orders, loading: false });
    } catch (error) {
      Toast.fail('加载失败');
      this.setData({ loading: false });
    }
  },

  onOrderClick(e) {
    const orderId = e.currentTarget.dataset.orderId;
    wx.navigateTo({
      url: `/pages/detail/detail?orderId=${orderId}`
    });
  },

  onActionClick(e) {
    const { orderId, action } = e.currentTarget.dataset;
    
    switch (action) {
      case 'accept':
        this.handleAccept(orderId);
        break;
      case 'start':
        this.handleStart(orderId);
        break;
      case 'rework':
        this.handleRework(orderId);
        break;
    }
  },

  handleAccept(orderId) {
    Dialog.confirm({
      title: '确认接单',
      message: '确定要接受这个工单吗？'
    }).then(() => {
      const success = orderService.updateOrderStatus(orderId, ORDER_STATUS.ACCEPTED);
      if (success) {
        Toast.success('接单成功');
        this.loadOrders(STATUS_LIST[this.data.activeTab]);
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  },

  handleStart(orderId) {
    Dialog.confirm({
      title: '开始实施',
      message: '确定要开始实施这个工单吗？'
    }).then(() => {
      const success = orderService.updateOrderStatus(orderId, ORDER_STATUS.IMPLEMENTING);
      if (success) {
        Toast.success('已开始实施');
        wx.navigateTo({
          url: `/pages/detail/detail?orderId=${orderId}`
        });
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  },

  handleRework(orderId) {
    Dialog.confirm({
      title: '处理返工',
      message: '确定要开始处理返工吗？'
    }).then(() => {
      const success = orderService.handleRework(orderId);
      if (success) {
        Toast.success('已进入实施状态');
        wx.navigateTo({
          url: `/pages/detail/detail?orderId=${orderId}`
        });
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  }
});

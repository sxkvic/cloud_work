const orderService = require('../../services/orderService');
const { ORDER_STATUS } = require('../../utils/constants');
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    active: 'pending',
    reworkCount: 0,
    list: []
  },

  onLoad() {
    this.filterList();
    this.updateReworkCount();
  },

  onShow() {
    this.filterList();
    this.updateReworkCount();
  },

  onTabChange(e) {
    this.setData({ active: e.detail.name });
    this.filterList();
  },

  filterList() {
    const targetStatus = this.data.active;
    const allOrders = orderService.getAllOrders();
    const filtered = allOrders.filter(item => item.status === targetStatus);
    this.setData({ list: filtered });
  },

  updateReworkCount() {
    const allOrders = orderService.getAllOrders();
    const reworkCount = allOrders.filter(item => item.status === ORDER_STATUS.REWORK).length;
    this.setData({ reworkCount });
  },

  goDetail(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail/detail?orderId=${item.orderId}`
    });
  },

  handleAccept(e) {
    const id = e.currentTarget.dataset.id;
    
    Dialog.confirm({
      title: '接单确认',
      message: '确认接收此派单？',
      confirmButtonColor: '#1989fa'
    }).then(() => {
      const success = orderService.updateOrderStatus(id, ORDER_STATUS.ACCEPTED);
      if (success) {
        Toast.success('接单成功');
        this.setData({ active: 'accepted' });
        this.filterList();
        this.updateReworkCount();
      } else {
        Toast.fail('操作失败');
      }
    }).catch(() => {});
  },

  noop() {} // 空函数防止冒泡
});

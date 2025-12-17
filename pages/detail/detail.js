const orderService = require('../../services/orderService');
const { ORDER_STATUS } = require('../../utils/constants');
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    order: null,
    currentStep: 0,
    steps: [
      { text: '待接单' },
      { text: '接单中' },
      { text: '实施中' },
      { text: '已完工' }
    ],
    remark: '',
    photos: [],
    showActionBar: true
  },

  orderId: '',

  onLoad(options) {
    this.orderId = options.orderId;
    this.loadOrder();
  },

  onShow() {
    this.loadOrder();
  },

  loadOrder() {
    const order = orderService.getOrderById(this.orderId);
    if (order) {
      const currentStep = this.getStepIndex(order.status);
      const showActionBar = order.status !== ORDER_STATUS.COMPLETED;
      
      this.setData({ 
        order,
        currentStep,
        showActionBar,
        remark: order.remark || '',
        photos: (order.photos || []).map((url, index) => ({
          url,
          name: `photo_${index}`
        }))
      });
    } else {
      Toast.fail('工单不存在');
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  },

  getStepIndex(status) {
    const statusMap = {
      [ORDER_STATUS.PENDING]: 0,
      [ORDER_STATUS.ACCEPTED]: 1,
      [ORDER_STATUS.IMPLEMENTING]: 2,
      [ORDER_STATUS.COMPLETED]: 3,
      [ORDER_STATUS.REWORK]: 2
    };
    return statusMap[status] || 0;
  },

  onBack() {
    wx.navigateBack();
  },

  callPhone() {
    const phone = this.data.order.customer.phone.replace(/\*/g, '');
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        fail: () => {}
      });
    }
  },

  onRemarkChange(e) {
    this.setData({ remark: e.detail });
  },

  onPhotoUpload(e) {
    const { file } = e.detail;
    const photos = this.data.photos;
    
    if (photos.length >= 9) {
      Toast.fail('最多上传9张照片');
      return;
    }

    // 模拟上传，实际项目中需要上传到服务器
    const newPhoto = {
      url: file.url || file.path,
      name: `photo_${Date.now()}`
    };
    
    this.setData({
      photos: [...photos, newPhoto]
    });
  },

  onPhotoDelete(e) {
    const { index } = e.detail;
    const photos = this.data.photos;
    photos.splice(index, 1);
    this.setData({ photos });
  },

  onPhotoPreview(e) {
    const { index } = e.detail;
    const urls = this.data.photos.map(p => p.url);
    wx.previewImage({
      current: urls[index],
      urls
    });
  },

  previewCompletedPhoto(e) {
    const url = e.currentTarget.dataset.url;
    const urls = this.data.order.photos;
    wx.previewImage({
      current: url,
      urls
    });
  },

  handleAccept() {
    Dialog.confirm({
      title: '确认接单',
      message: '确定要接受这个工单吗？'
    }).then(() => {
      const success = orderService.updateOrderStatus(this.orderId, ORDER_STATUS.ACCEPTED);
      if (success) {
        Toast.success('接单成功');
        this.loadOrder();
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  },

  handleStart() {
    Dialog.confirm({
      title: '开始实施',
      message: '确定要开始实施这个工单吗？'
    }).then(() => {
      const success = orderService.updateOrderStatus(this.orderId, ORDER_STATUS.IMPLEMENTING);
      if (success) {
        Toast.success('已开始实施');
        this.loadOrder();
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  },

  handleComplete() {
    const { photos, remark } = this.data;
    
    if (photos.length === 0) {
      Toast.fail('请至少上传一张照片');
      return;
    }

    Dialog.confirm({
      title: '确认完工',
      message: '确定要提交完工吗？'
    }).then(() => {
      const photoUrls = photos.map(p => p.url);
      const success = orderService.submitCompletion(this.orderId, remark, photoUrls);
      
      if (success) {
        Toast.success('提交成功');
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      } else {
        Toast.fail('提交失败，请重试');
      }
    }).catch(() => {});
  },

  handleRework() {
    Dialog.confirm({
      title: '处理返工',
      message: '确定要开始处理返工吗？之前的照片将被清空。'
    }).then(() => {
      const success = orderService.handleRework(this.orderId);
      if (success) {
        Toast.success('已进入实施状态');
        this.loadOrder();
      } else {
        Toast.fail('操作失败，请重试');
      }
    }).catch(() => {});
  }
});

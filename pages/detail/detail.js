const orderService = require('../../services/orderService');
const { ORDER_STATUS } = require('../../utils/constants');
import Toast from '@vant/weapp/toast/toast';
import Dialog from '@vant/weapp/dialog/dialog';

Page({
  data: {
    info: {},
    statusText: '',
    statusTip: '',
    // 表单数据
    formAccount: '',
    formSn: '',
    formPower: '',
    fileList: [],
    // 预约时间相关
    showPicker: false,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    appointTime: ''
  },

  orderId: '',

  onLoad(options) {
    if (options.orderId) {
      this.orderId = options.orderId;
      this.loadOrder();
    }
  },

  onShow() {
    if (this.orderId) {
      this.loadOrder();
    }
  },

  loadOrder() {
    const order = orderService.getOrderById(this.orderId);
    if (order) {
      this.setData({ 
        info: order,
        appointTime: order.appointmentTime || ''
      });
      this.updateStatusUI(order.status);
      
      // 如果是返工，回填数据
      if (order.status === ORDER_STATUS.REWORK) {
        this.setData({ 
          formAccount: order.formAccount || '',
          formSn: order.formSn || '',
          formPower: order.formPower || ''
        });
      }
    } else {
      Toast.fail('工单不存在');
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }
  },

  updateStatusUI(status) {
    const textMap = {
      pending: '待接单',
      accepted: '接单中',
      implementing: '实施中',
      rework: '需整改',
      completed: '已完工'
    };
    const tipMap = {
      pending: '公司已派单，请确认接收',
      accepted: '请尽快联系客户预约上门时间',
      implementing: '到达现场，请录入信息并拍照',
      rework: '审核未通过，请根据意见修改',
      completed: '工单已归档'
    };
    this.setData({
      statusText: textMap[status] || '',
      statusTip: tipMap[status] || ''
    });
  },

  // 1. 接单
  doAccept() {
    Dialog.confirm({ 
      title: '确认接单',
      message: '确定要接收这个工单吗？',
      confirmButtonColor: '#1989fa'
    }).then(() => {
      const success = orderService.updateOrderStatus(this.orderId, ORDER_STATUS.ACCEPTED);
      if (success) {
        this.loadOrder();
        Toast.success('已接单');
      } else {
        Toast.fail('操作失败');
      }
    }).catch(() => {});
  },

  // 2. 预约
  showPopup() {
    this.setData({ showPicker: true });
  },

  onClosePopup() {
    this.setData({ showPicker: false });
  },

  onConfirmDate(event) {
    const date = new Date(event.detail);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const timeStr = `${month}月${day}日 ${hours}:${minutes}`;
    
    this.setData({
      appointTime: timeStr,
      showPicker: false
    });

    Dialog.confirm({
      title: '预约确认',
      message: `预约时间：${timeStr}\n是否立即转入实施状态？`,
      confirmButtonColor: '#1989fa'
    }).then(() => {
      // 更新预约时间并转入实施状态
      orderService.updateOrderAppointment(this.orderId, timeStr);
      const success = orderService.updateOrderStatus(this.orderId, ORDER_STATUS.IMPLEMENTING);
      if (success) {
        this.loadOrder();
        Toast.success('已转入实施');
      }
    }).catch(() => {});
  },

  // 3. 扫码
  scanCode() {
    wx.scanCode({
      success: (res) => {
        this.setData({ formSn: res.result });
        Toast.success('扫码成功');
      },
      fail: () => {
        // 用户取消扫码，不提示
      }
    });
  },

  // 表单输入
  onAccountChange(e) {
    this.setData({ formAccount: e.detail });
  },

  onSnChange(e) {
    this.setData({ formSn: e.detail });
  },

  onPowerChange(e) {
    this.setData({ formPower: e.detail });
  },

  // 4. 图片上传
  afterRead(event) {
    const { file } = event.detail;
    const { fileList = [] } = this.data;
    
    if (fileList.length >= 5) {
      Toast('最多上传5张照片');
      return;
    }

    const newFile = {
      url: file.url || file.path,
      name: `photo_${Date.now()}`
    };
    
    this.setData({
      fileList: [...fileList, newFile]
    });
  },

  onPhotoDelete(e) {
    const { index } = e.detail;
    const fileList = this.data.fileList;
    fileList.splice(index, 1);
    this.setData({ fileList });
  },

  // 5. 提交
  doSubmit() {
    const { formAccount, formSn, fileList } = this.data;

    if (!formAccount || !formSn) {
      Toast('请填写必填项');
      return;
    }

    if (fileList.length === 0) {
      Toast('请至少上传一张照片');
      return;
    }

    Dialog.confirm({
      title: '提交确认',
      message: '确定要提交完工吗？',
      confirmButtonColor: '#1989fa'
    }).then(() => {
      Toast.loading({ message: '提交中...', forbidClick: true });

      setTimeout(() => {
        const photoUrls = fileList.map(f => f.url);
        const success = orderService.submitCompletion(this.orderId, this.data.formAccount, photoUrls);
        
        Toast.clear();
        if (success) {
          Toast.success('提交成功');
          setTimeout(() => {
            wx.navigateBack();
          }, 1000);
        } else {
          Toast.fail('提交失败');
        }
      }, 1000);
    }).catch(() => {});
  },

  // 拨打电话
  makeCall() {
    const phone = this.data.info.customer?.phone;
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone.replace(/\*/g, '0'), // 替换脱敏字符
        fail: () => {}
      });
    }
  }
});

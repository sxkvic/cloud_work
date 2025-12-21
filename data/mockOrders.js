/**
 * 模拟工单数据
 */
const mockOrders = [
  {
    orderId: 'WO2023102901',
    orderNo: 'WO2023102901',
    status: 'pending',
    customer: {
      name: '张先生',
      phone: '138****1111',
      address: '阳光小区 3栋 201'
    },
    assignTime: '10:00',
    appointmentTime: '',
    tasks: ['宽带安装', '光猫调试'],
    equipment: [
      { name: '光猫', model: 'HG8145V5', sn: '' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-10-29 10:00',
    updatedAt: '2023-10-29 10:00'
  },
  {
    orderId: 'WO2023102902',
    orderNo: 'WO2023102902',
    status: 'accepted',
    customer: {
      name: '李女士',
      phone: '139****2222',
      address: '科技园 B座 1205'
    },
    assignTime: '09:00',
    appointmentTime: '',
    tasks: ['宽带安装', '路由器配置'],
    equipment: [
      { name: '光猫', model: 'HG8145V5', sn: '' },
      { name: '路由器', model: 'AX3000', sn: '' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-10-29 09:00',
    updatedAt: '2023-10-29 09:30'
  },
  {
    orderId: 'WO2023102903',
    orderNo: 'WO2023102903',
    status: 'implementing',
    customer: {
      name: '王总',
      phone: '136****3333',
      address: '万达商铺 88号'
    },
    assignTime: '08:00',
    appointmentTime: '今天 14:00',
    tasks: ['企业宽带安装', '网络布线', '设备调试'],
    equipment: [
      { name: '企业光猫', model: 'HG8245H', sn: 'SN88881234' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-10-28 08:00',
    updatedAt: '2023-10-29 14:00'
  },
  {
    orderId: 'WO2023102904',
    orderNo: 'WO2023102904',
    status: 'rework',
    customer: {
      name: '赵大爷',
      phone: '150****4444',
      address: '老街 5号'
    },
    assignTime: '07:00',
    appointmentTime: '昨天 10:00',
    tasks: ['宽带维修', '光猫更换'],
    equipment: [
      { name: '光猫', model: 'HG8145V5', sn: 'SN44441234' }
    ],
    reworkReason: 'SN码照片不清晰，请重新拍摄',
    remark: '已完成安装',
    photos: [],
    formAccount: 'KD_OLD_123',
    formSn: 'SN44441234',
    formPower: '-18.5',
    createdAt: '2023-10-27 07:00',
    updatedAt: '2023-10-28 16:00'
  },
  {
    orderId: 'WO2023102905',
    orderNo: 'WO2023102905',
    status: 'completed',
    customer: {
      name: '陈姐',
      phone: '180****5555',
      address: '碧桂园 1期 8栋 1501'
    },
    assignTime: '06:00',
    appointmentTime: '前天 09:00',
    tasks: ['宽带安装', '电视盒子配置'],
    equipment: [
      { name: '光猫', model: 'HG8145V5', sn: 'SN55551234' },
      { name: 'IPTV盒子', model: 'EC6108V9', sn: 'SN55555678' }
    ],
    reworkReason: '',
    remark: '安装顺利，客户满意',
    photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    createdAt: '2023-10-26 06:00',
    updatedAt: '2023-10-26 11:00',
    completedAt: '2023-10-26 11:00'
  },
  {
    orderId: 'WO2023102906',
    orderNo: 'WO2023102906',
    status: 'pending',
    customer: {
      name: '刘先生',
      phone: '188****6666',
      address: '恒大名都 2期 5栋 802'
    },
    assignTime: '11:30',
    appointmentTime: '',
    tasks: ['宽带升级', '更换光猫'],
    equipment: [
      { name: '千兆光猫', model: 'HG8546M', sn: '' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-10-29 11:30',
    updatedAt: '2023-10-29 11:30'
  }
];

module.exports = mockOrders;

/**
 * 模拟工单数据
 */
const mockOrders = [
  {
    orderId: 'WO20231201001',
    status: 'pending',
    customer: {
      name: '张先生',
      phone: '138****1234',
      address: '上海市浦东新区陆家嘴金融中心88号1201室'
    },
    appointmentTime: '2023-12-05 09:00',
    tasks: ['安装空调挂机', '打孔', '管道包扎'],
    equipment: [
      { name: '格力空调挂机', model: 'KFR-35GW', sn: 'SN20231201001' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-12-01 10:00',
    updatedAt: '2023-12-01 10:00'
  },
  {
    orderId: 'WO20231201002',
    status: 'pending',
    customer: {
      name: '李女士',
      phone: '139****5678',
      address: '上海市徐汇区漕河泾开发区科技大厦A座502室'
    },
    appointmentTime: '2023-12-05 14:00',
    tasks: ['安装中央空调', '风管连接', '调试'],
    equipment: [
      { name: '大金中央空调', model: 'FXDP50QVCP', sn: 'SN20231201002' },
      { name: '室外机', model: 'RXP50QV2C', sn: 'SN20231201003' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-12-01 11:00',
    updatedAt: '2023-12-01 11:00'
  },
  {
    orderId: 'WO20231130001',
    status: 'accepted',
    customer: {
      name: '王经理',
      phone: '137****9012',
      address: '上海市静安区南京西路1266号恒隆广场1808室'
    },
    appointmentTime: '2023-12-04 10:00',
    tasks: ['安装空调柜机', '电源线路检查', '调试'],
    equipment: [
      { name: '美的空调柜机', model: 'KFR-72LW', sn: 'SN20231130001' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-11-30 09:00',
    updatedAt: '2023-11-30 15:00'
  },
  {
    orderId: 'WO20231129001',
    status: 'implementing',
    customer: {
      name: '赵总',
      phone: '136****3456',
      address: '上海市黄浦区外滩中心18号2301室'
    },
    appointmentTime: '2023-12-03 09:00',
    tasks: ['安装空调挂机', '打孔', '高空作业', '管道包扎'],
    equipment: [
      { name: '海尔空调挂机', model: 'KFR-26GW', sn: 'SN20231129001' },
      { name: '海尔空调挂机', model: 'KFR-26GW', sn: 'SN20231129002' }
    ],
    reworkReason: '',
    remark: '',
    photos: [],
    createdAt: '2023-11-29 14:00',
    updatedAt: '2023-12-03 09:30'
  },
  {
    orderId: 'WO20231128001',
    status: 'completed',
    customer: {
      name: '孙小姐',
      phone: '135****7890',
      address: '上海市长宁区虹桥路1号港汇广场1502室'
    },
    appointmentTime: '2023-12-02 14:00',
    tasks: ['安装空调挂机', '打孔'],
    equipment: [
      { name: '奥克斯空调挂机', model: 'KFR-35GW', sn: 'SN20231128001' }
    ],
    reworkReason: '',
    remark: '安装顺利，客户满意',
    photos: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
      'https://img.yzcdn.cn/vant/cat.jpeg'
    ],
    createdAt: '2023-11-28 10:00',
    updatedAt: '2023-12-02 16:30'
  },
  {
    orderId: 'WO20231127001',
    status: 'completed',
    customer: {
      name: '周先生',
      phone: '134****2345',
      address: '上海市普陀区中山北路2000号中环广场1201室'
    },
    appointmentTime: '2023-12-01 10:00',
    tasks: ['安装空调挂机', '管道包扎', '调试'],
    equipment: [
      { name: '格力空调挂机', model: 'KFR-50GW', sn: 'SN20231127001' }
    ],
    reworkReason: '',
    remark: '已完成安装和调试',
    photos: [
      'https://img.yzcdn.cn/vant/cat.jpeg'
    ],
    createdAt: '2023-11-27 09:00',
    updatedAt: '2023-12-01 12:00'
  },
  {
    orderId: 'WO20231126001',
    status: 'rework',
    customer: {
      name: '吴经理',
      phone: '133****6789',
      address: '上海市闵行区虹桥商务区申长路988号虹桥天地A座1601室'
    },
    appointmentTime: '2023-11-30 09:00',
    tasks: ['安装空调挂机', '打孔', '管道包扎'],
    equipment: [
      { name: '大金空调挂机', model: 'FTXS35JV2CW', sn: 'SN20231126001' }
    ],
    reworkReason: '管道包扎不美观，需重新包扎处理',
    remark: '',
    photos: [],
    createdAt: '2023-11-26 11:00',
    updatedAt: '2023-12-01 09:00'
  }
];

module.exports = mockOrders;

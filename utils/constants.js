/**
 * 工单状态枚举
 */
const ORDER_STATUS = {
  PENDING: 'pending',           // 待接单
  ACCEPTED: 'accepted',         // 接单中
  IMPLEMENTING: 'implementing', // 实施中
  COMPLETED: 'completed',       // 已完工
  REWORK: 'rework'              // 需返工
};

/**
 * 状态列表（按Tab顺序）
 */
const STATUS_LIST = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.IMPLEMENTING,
  ORDER_STATUS.REWORK,
  ORDER_STATUS.COMPLETED
];

/**
 * 状态到UI的映射配置
 */
const STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: {
    text: '待接单',
    tagType: 'warning',
    tagColor: '#ff976a',
    buttonText: '立即接单',
    buttonType: 'warning'
  },
  [ORDER_STATUS.ACCEPTED]: {
    text: '接单中',
    tagType: 'primary',
    tagColor: '#1989fa',
    buttonText: '开始实施',
    buttonType: 'primary'
  },
  [ORDER_STATUS.IMPLEMENTING]: {
    text: '实施中',
    tagType: 'primary',
    tagColor: '#1989fa',
    buttonText: '继续实施',
    buttonType: 'primary'
  },
  [ORDER_STATUS.COMPLETED]: {
    text: '已完工',
    tagType: 'success',
    tagColor: '#07c160',
    buttonText: null,
    buttonType: null
  },
  [ORDER_STATUS.REWORK]: {
    text: '需返工',
    tagType: 'danger',
    tagColor: '#ee0a24',
    buttonText: '处理返工',
    buttonType: 'danger'
  }
};

/**
 * 合法的状态流转规则
 */
const VALID_TRANSITIONS = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.ACCEPTED],
  [ORDER_STATUS.ACCEPTED]: [ORDER_STATUS.IMPLEMENTING],
  [ORDER_STATUS.IMPLEMENTING]: [ORDER_STATUS.COMPLETED],
  [ORDER_STATUS.COMPLETED]: [ORDER_STATUS.REWORK],  // 审核不通过时
  [ORDER_STATUS.REWORK]: [ORDER_STATUS.IMPLEMENTING]
};

/**
 * 存储键常量
 */
const STORAGE_KEYS = {
  USER: 'master_user',
  ORDERS: 'master_orders',
  LOGIN_STATUS: 'master_logged'
};

module.exports = {
  ORDER_STATUS,
  STATUS_LIST,
  STATUS_CONFIG,
  VALID_TRANSITIONS,
  STORAGE_KEYS
};

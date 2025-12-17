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
 * 状态列表（按 Tab 顺序）
 */
const STATUS_LIST = [
  ORDER_STATUS.PENDING,
  ORDER_STATUS.ACCEPTED,
  ORDER_STATUS.IMPLEMENTING,
  ORDER_STATUS.COMPLETED,
  ORDER_STATUS.REWORK
];

/**
 * 状态到 UI 的映射配置
 */
const STATUS_UI_MAP = {
  [ORDER_STATUS.PENDING]: {
    label: '待接单',
    color: '#ff976a',
    tagType: 'warning',
    buttonText: '立即接单',
    buttonType: 'warning'
  },
  [ORDER_STATUS.ACCEPTED]: {
    label: '接单中',
    color: '#1989fa',
    tagType: 'primary',
    buttonText: '开始实施',
    buttonType: 'primary'
  },
  [ORDER_STATUS.IMPLEMENTING]: {
    label: '实施中',
    color: '#1989fa',
    tagType: 'primary',
    buttonText: '继续实施',
    buttonType: 'primary'
  },
  [ORDER_STATUS.COMPLETED]: {
    label: '已完工',
    color: '#07c160',
    tagType: 'success',
    buttonText: '',
    buttonType: ''
  },
  [ORDER_STATUS.REWORK]: {
    label: '需返工',
    color: '#ee0a24',
    tagType: 'danger',
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
  [ORDER_STATUS.COMPLETED]: [ORDER_STATUS.REWORK],
  [ORDER_STATUS.REWORK]: [ORDER_STATUS.IMPLEMENTING]
};

/**
 * 本地存储键
 */
const STORAGE_KEYS = {
  USER: 'master_user',
  ORDERS: 'master_orders',
  LOGIN_STATUS: 'master_logged'
};

/**
 * 获取状态 UI 配置
 */
function getStatusUI(status) {
  return STATUS_UI_MAP[status] || STATUS_UI_MAP[ORDER_STATUS.PENDING];
}

/**
 * 检查状态流转是否合法
 */
function isValidTransition(fromStatus, toStatus) {
  const validTargets = VALID_TRANSITIONS[fromStatus] || [];
  return validTargets.includes(toStatus);
}

module.exports = {
  ORDER_STATUS,
  STATUS_LIST,
  STATUS_UI_MAP,
  VALID_TRANSITIONS,
  STORAGE_KEYS,
  getStatusUI,
  isValidTransition
};

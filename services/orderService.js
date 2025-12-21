const storageService = require('./storageService');
const { STORAGE_KEYS, ORDER_STATUS, VALID_TRANSITIONS } = require('../utils/constants');
const mockOrders = require('../data/mockOrders');

/**
 * 工单服务
 */
const orderService = {
  /**
   * 初始化工单数据
   */
  initOrders() {
    const existingOrders = storageService.get(STORAGE_KEYS.ORDERS);
    if (!existingOrders || existingOrders.length === 0) {
      storageService.set(STORAGE_KEYS.ORDERS, mockOrders);
    }
  },

  /**
   * 获取所有工单
   * @returns {Array} 工单列表
   */
  getAllOrders() {
    this.initOrders();
    return storageService.get(STORAGE_KEYS.ORDERS) || [];
  },

  /**
   * 按状态获取工单列表
   * @param {string} status 工单状态
   * @returns {Array} 工单列表
   */
  getOrdersByStatus(status) {
    const orders = this.getAllOrders();
    return orders.filter(order => order.status === status);
  },

  /**
   * 根据ID获取工单详情
   * @param {string} orderId 工单ID
   * @returns {Object|null} 工单对象
   */
  getOrderById(orderId) {
    const orders = this.getAllOrders();
    return orders.find(order => order.orderId === orderId) || null;
  },

  /**
   * 验证状态流转是否合法
   * @param {string} currentStatus 当前状态
   * @param {string} newStatus 目标状态
   * @returns {boolean} 是否合法
   */
  isValidTransition(currentStatus, newStatus) {
    const validNextStatuses = VALID_TRANSITIONS[currentStatus] || [];
    return validNextStatuses.includes(newStatus);
  },

  /**
   * 更新工单状态
   * @param {string} orderId 工单ID
   * @param {string} newStatus 新状态
   * @returns {boolean} 是否更新成功
   */
  updateOrderStatus(orderId, newStatus) {
    const orders = this.getAllOrders();
    const index = orders.findIndex(order => order.orderId === orderId);
    
    if (index === -1) {
      return false;
    }

    const order = orders[index];
    
    // 验证状态流转
    if (!this.isValidTransition(order.status, newStatus)) {
      console.warn(`Invalid status transition: ${order.status} -> ${newStatus}`);
      return false;
    }

    orders[index] = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    storageService.set(STORAGE_KEYS.ORDERS, orders);
    return true;
  },

  /**
   * 更新工单预约时间
   * @param {string} orderId 工单ID
   * @param {string} appointmentTime 预约时间
   * @returns {boolean} 是否更新成功
   */
  updateOrderAppointment(orderId, appointmentTime) {
    const orders = this.getAllOrders();
    const index = orders.findIndex(order => order.orderId === orderId);
    
    if (index === -1) {
      return false;
    }

    orders[index] = {
      ...orders[index],
      appointmentTime,
      updatedAt: new Date().toISOString()
    };

    storageService.set(STORAGE_KEYS.ORDERS, orders);
    return true;
  },

  /**
   * 提交完工信息
   * @param {string} orderId 工单ID
   * @param {string} remark 备注
   * @param {Array} photos 照片列表
   * @returns {boolean} 是否提交成功
   */
  submitCompletion(orderId, remark, photos) {
    const orders = this.getAllOrders();
    const index = orders.findIndex(order => order.orderId === orderId);
    
    if (index === -1) {
      return false;
    }

    const order = orders[index];
    
    // 只有实施中或返工状态可以提交完工
    if (order.status !== ORDER_STATUS.IMPLEMENTING && order.status !== ORDER_STATUS.REWORK) {
      return false;
    }

    orders[index] = {
      ...order,
      status: ORDER_STATUS.COMPLETED,
      remark,
      photos,
      completedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storageService.set(STORAGE_KEYS.ORDERS, orders);
    return true;
  },

  /**
   * 处理返工
   * @param {string} orderId 工单ID
   * @returns {boolean} 是否处理成功
   */
  handleRework(orderId) {
    const orders = this.getAllOrders();
    const index = orders.findIndex(order => order.orderId === orderId);
    
    if (index === -1) {
      return false;
    }

    const order = orders[index];
    
    if (order.status !== ORDER_STATUS.REWORK) {
      return false;
    }

    // 清空之前的照片，进入实施状态
    orders[index] = {
      ...order,
      status: ORDER_STATUS.IMPLEMENTING,
      photos: [],
      remark: '',
      updatedAt: new Date().toISOString()
    };

    storageService.set(STORAGE_KEYS.ORDERS, orders);
    return true;
  }
};

module.exports = orderService;

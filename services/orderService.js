/**
 * 工单服务 - 处理工单相关逻辑
 */
const storageService = require('./storageService');
const { ORDER_STATUS, STORAGE_KEYS, isValidTransition } = require('../utils/constants');
const mockOrders = require('../data/mockOrders');

const OrderService = {
  /**
   * 初始化工单数据（如果本地没有数据则使用 Mock 数据）
   */
  initOrders() {
    const orders = storageService.get(STORAGE_KEYS.ORDERS, null);
    if (!orders || orders.length === 0) {
      storageService.set(STORAGE_KEYS.ORDERS, mockOrders);
    }
  },

  /**
   * 获取所有工单
   * @returns {Array} 工单列表
   */
  getAllOrders() {
    this.initOrders();
    return storageService.get(STORAGE_KEYS.ORDERS, []);
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
   * 根据 ID 获取工单详情
   * @param {string} orderId 工单 ID
   * @returns {object|null} 工单对象
   */
  getOrderById(orderId) {
    const orders = this.getAllOrders();
    return orders.find(order => order.orderId === orderId) || null;
  },

  /**
   * 更新工单状态
   * @param {string} orderId 工单 ID
   * @param {string} newStatus 新状态
   * @returns {boolean} 是否更新成功
   */
  updateOrderStatus(orderId, newStatus) {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return false;
    }

    const order = orders[orderIndex];
    
    // 验证状态流转是否合法
    if (!isValidTransition(order.status, newStatus)) {
      console.error(`Invalid transition: ${order.status} -> ${newStatus}`);
      return false;
    }

    // 更新状态
    orders[orderIndex] = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    // 保存到本地存储
    return storageService.set(STORAGE_KEYS.ORDERS, orders);
  },

  /**
   * 提交完工信息
   * @param {string} orderId 工单 ID
   * @param {string} remark 安装备注
   * @param {Array} photos 照片列表
   * @returns {boolean} 是否提交成功
   */
  submitCompletion(orderId, remark, photos) {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return false;
    }

    const order = orders[orderIndex];
    
    // 只有实施中状态才能提交完工
    if (order.status !== ORDER_STATUS.IMPLEMENTING) {
      return false;
    }

    // 更新工单
    orders[orderIndex] = {
      ...order,
      status: ORDER_STATUS.COMPLETED,
      remark,
      photos,
      updatedAt: new Date().toISOString()
    };

    // 保存到本地存储
    return storageService.set(STORAGE_KEYS.ORDERS, orders);
  },

  /**
   * 处理返工（清空照片，进入实施状态）
   * @param {string} orderId 工单 ID
   * @returns {boolean} 是否处理成功
   */
  handleRework(orderId) {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return false;
    }

    const order = orders[orderIndex];
    
    // 只有返工状态才能处理
    if (order.status !== ORDER_STATUS.REWORK) {
      return false;
    }

    // 清空照片，进入实施状态
    orders[orderIndex] = {
      ...order,
      status: ORDER_STATUS.IMPLEMENTING,
      photos: [],
      remark: '',
      updatedAt: new Date().toISOString()
    };

    // 保存到本地存储
    return storageService.set(STORAGE_KEYS.ORDERS, orders);
  },

  /**
   * 更新工单数据
   * @param {string} orderId 工单 ID
   * @param {object} updates 更新的字段
   * @returns {boolean} 是否更新成功
   */
  updateOrder(orderId, updates) {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return false;
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    return storageService.set(STORAGE_KEYS.ORDERS, orders);
  }
};

module.exports = OrderService;

/**
 * 存储服务 - 封装本地存储操作
 */
const StorageService = {
  /**
   * 保存数据到本地存储
   * @param {string} key 存储键
   * @param {any} value 存储值
   */
  set(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      wx.setStorageSync(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },

  /**
   * 从本地存储读取数据
   * @param {string} key 存储键
   * @param {any} defaultValue 默认值
   * @returns {any} 存储的值或默认值
   */
  get(key, defaultValue = null) {
    try {
      const jsonValue = wx.getStorageSync(key);
      if (jsonValue) {
        return JSON.parse(jsonValue);
      }
      return defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },

  /**
   * 从本地存储删除数据
   * @param {string} key 存储键
   */
  remove(key) {
    try {
      wx.removeStorageSync(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  /**
   * 清空所有本地存储
   */
  clear() {
    try {
      wx.clearStorageSync();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

module.exports = StorageService;

/**
 * 认证服务 - 处理登录相关逻辑
 */
const storageService = require('./storageService');
const { STORAGE_KEYS } = require('../utils/constants');

const AuthService = {
  /**
   * 验证手机号格式
   * @param {string} phone 手机号
   * @returns {boolean} 是否有效
   */
  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
      return false;
    }
    // 中国大陆手机号：11位数字，以1开头
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  },

  /**
   * 发送验证码（模拟）
   * @param {string} phone 手机号
   * @returns {boolean} 是否发送成功
   */
  sendVerificationCode(phone) {
    if (!this.validatePhone(phone)) {
      return false;
    }
    // 模拟发送验证码
    console.log(`验证码已发送至 ${phone}`);
    return true;
  },

  /**
   * 登录验证
   * @param {string} phone 手机号
   * @param {string} code 验证码
   * @returns {Promise<boolean>} 是否登录成功
   */
  async login(phone, code) {
    if (!this.validatePhone(phone)) {
      return false;
    }

    if (!code || code.length < 4) {
      return false;
    }

    // 模拟登录验证（实际项目中应调用后端 API）
    // 这里简单模拟：任何4位以上验证码都视为有效
    return new Promise((resolve) => {
      setTimeout(() => {
        // 保存用户信息
        const user = {
          phone,
          name: '李师傅',
          token: `token_${Date.now()}`,
          loginTime: new Date().toISOString()
        };
        
        storageService.set(STORAGE_KEYS.USER, user);
        storageService.set(STORAGE_KEYS.LOGIN_STATUS, true);
        
        resolve(true);
      }, 500);
    });
  },

  /**
   * 检查是否已登录
   * @returns {boolean} 是否已登录
   */
  isLoggedIn() {
    return storageService.get(STORAGE_KEYS.LOGIN_STATUS, false);
  },

  /**
   * 获取当前用户信息
   * @returns {object|null} 用户信息
   */
  getCurrentUser() {
    return storageService.get(STORAGE_KEYS.USER, null);
  },

  /**
   * 登出
   */
  logout() {
    storageService.remove(STORAGE_KEYS.USER);
    storageService.remove(STORAGE_KEYS.LOGIN_STATUS);
  }
};

module.exports = AuthService;

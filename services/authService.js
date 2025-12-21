const storageService = require('./storageService');
const { STORAGE_KEYS } = require('../utils/constants');

/**
 * 认证服务
 */
const authService = {
  /**
   * 验证手机号格式
   * @param {string} phone 手机号
   * @returns {boolean} 是否有效
   */
  validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
      return false;
    }
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
   * 登录验证（手机号+验证码）
   * @param {string} phone 手机号
   * @param {string} code 验证码
   * @returns {Promise<boolean>} 登录是否成功
   */
  login(phone, code) {
    return new Promise((resolve) => {
      // 模拟验证码验证，实际项目中应调用后端接口
      if (code === '123456' || code.length >= 4) {
        const user = {
          phone,
          name: '李师傅',
          token: 'mock_token_' + Date.now(),
          loginTime: new Date().toISOString()
        };
        storageService.set(STORAGE_KEYS.USER, user);
        storageService.set(STORAGE_KEYS.LOGIN_STATUS, true);
        resolve(true);
      } else {
        resolve(false);
      }
    });
  },

  /**
   * 工号密码登录
   * @param {string} jobId 工号
   * @param {string} password 密码
   * @returns {boolean} 登录是否成功
   */
  loginWithJobId(jobId, password) {
    // 模拟登录验证
    const user = {
      jobId,
      name: '装维师傅',
      token: 'mock_token_' + Date.now(),
      loginTime: new Date().toISOString()
    };
    storageService.set(STORAGE_KEYS.USER, user);
    storageService.set(STORAGE_KEYS.LOGIN_STATUS, true);
    return true;
  },

  /**
   * 检查登录状态
   * @returns {boolean} 是否已登录
   */
  isLoggedIn() {
    return storageService.get(STORAGE_KEYS.LOGIN_STATUS) === true;
  },

  /**
   * 获取当前用户信息
   * @returns {Object|null} 用户信息
   */
  getCurrentUser() {
    return storageService.get(STORAGE_KEYS.USER);
  },

  /**
   * 登出
   */
  logout() {
    storageService.remove(STORAGE_KEYS.USER);
    storageService.remove(STORAGE_KEYS.LOGIN_STATUS);
  }
};

module.exports = authService;

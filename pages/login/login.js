const authService = require('../../services/authService');
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    phone: '',
    code: '',
    countdown: 0,
    loading: false,
    canLogin: false
  },

  timer: null,

  onPhoneChange(e) {
    const phone = e.detail;
    this.setData({ 
      phone,
      canLogin: this.checkCanLogin(phone, this.data.code)
    });
  },

  onCodeChange(e) {
    const code = e.detail;
    this.setData({ 
      code,
      canLogin: this.checkCanLogin(this.data.phone, code)
    });
  },

  checkCanLogin(phone, code) {
    return phone.length === 11 && code.length >= 4;
  },

  sendCode() {
    const { phone } = this.data;
    
    // 验证手机号格式
    if (!authService.validatePhone(phone)) {
      Toast.fail('请输入正确的手机号');
      return;
    }

    // 发送验证码
    const success = authService.sendVerificationCode(phone);
    if (success) {
      Toast.success('验证码已发送');
      this.startCountdown();
    } else {
      Toast.fail('验证码发送失败，请重试');
    }
  },

  startCountdown() {
    this.setData({ countdown: 60 });
    
    this.timer = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(this.timer);
        this.setData({ countdown: 0 });
      } else {
        this.setData({ countdown: this.data.countdown - 1 });
      }
    }, 1000);
  },

  async login() {
    const { phone, code } = this.data;

    // 验证手机号格式
    if (!authService.validatePhone(phone)) {
      Toast.fail('请输入正确的手机号');
      return;
    }

    // 验证码不能为空
    if (!code) {
      Toast.fail('请输入验证码');
      return;
    }

    this.setData({ loading: true });

    try {
      const success = await authService.login(phone, code);
      
      if (success) {
        Toast.success('登录成功');
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/workbench/workbench'
          });
        }, 500);
      } else {
        Toast.fail('验证码错误');
      }
    } catch (error) {
      Toast.fail('登录失败，请检查网络');
    } finally {
      this.setData({ loading: false });
    }
  },

  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
});

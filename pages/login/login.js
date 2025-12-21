const authService = require('../../services/authService');
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    jobId: '',
    password: '',
    loading: false,
    canLogin: false
  },

  onJobIdChange(e) {
    const jobId = e.detail;
    this.setData({ 
      jobId,
      canLogin: this.checkCanLogin(jobId, this.data.password)
    });
  },

  onPasswordChange(e) {
    const password = e.detail;
    this.setData({ 
      password,
      canLogin: this.checkCanLogin(this.data.jobId, password)
    });
  },

  checkCanLogin(jobId, password) {
    return jobId.length >= 4 && password.length >= 4;
  },

  handleLogin() {
    const { jobId, password } = this.data;

    if (!jobId || !password) {
      Toast('请输入工号和密码');
      return;
    }

    this.setData({ loading: true });
    Toast.loading({ message: '登录中...', forbidClick: true });

    // 模拟登录请求
    setTimeout(() => {
      Toast.clear();
      
      // 模拟登录成功，保存用户信息
      authService.loginWithJobId(jobId, password);
      
      Toast.success('登录成功');
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/workbench/workbench'
        });
      }, 500);
    }, 1000);
  }
});

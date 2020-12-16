import userAPI from '../../core/api/user.api';
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  // 获取用户信息
  async getUserInfo (data) {
    if (data.detail.errMsg === 'getUserInfo:ok') {
      console.log('data', data);
      let registerInfo = await userAPI.isRegister();
      if (!registerInfo.isRegister) {
        const userInfo = data.detail.userInfo;
        userAPI.addUser(userInfo);
      }
      this.setData({
        isLogin: true,
        userInfo: data.detail.userInfo
      });
    }
  },
  // 判断是否已授权登录
  handleCheck () {
    wx.cloud.callFunction({
      name: 'user_isRegister'
    }).then(resp => {
      if (resp.type === 'success') {
        wx.showToast({
          title: resp.msg + ': ' + resp.isRegister,
        })
      }
      console.log('resp', resp);
    });
  },
  // 联系客服
  handleContact (e) {
    console.log('联系客服', e.detail.path);
    console.log('联系客服', e.detail.query);
  },
  async onLoad () {
    const loginResp =  await wx.getStorage({
      key: 'isLogin',
    });
    const userResp = await wx.getStorage({
      key: 'userInfo',
    });
    if (loginResp.data) {
      this.setData({
        isLogin: loginResp.data,
        userInfo: userResp.data
      });
    }
  }
});
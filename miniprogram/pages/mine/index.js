import userAPI from '../../core/api/user.api';
Page({
  data: {
    isLogin: false,
    userInfo: {}
  },
  // 获取用户信息
  async getUserInfo (data) {
    console.log('userAPI', userAPI.addUser);
    if (data.detail.errMsg === 'getUserInfo:ok') {
      console.log('data', data);
      let registerInfo = await userAPI.isRegister();
      if (!registerInfo.isRegister) {
        const userInfo = data.detail.userInfo;
        userAPI.addUser(userInfo);
      }
    }
  },
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
  async onLoad () {
    const loginResp =  await wx.getStorage({
      key: 'isLogin',
    });
    const userResp = await wx.getStorage({
      key: 'userInfo',
    });
    console.log('userInfo', userResp);
    if (loginResp.data) {
      this.setData({
        isLogin: loginResp.data,
        userInfo: userResp.data
      });
    }
  }
});
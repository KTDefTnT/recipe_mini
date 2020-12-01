export default {
  // 检查是否已注册
  isRegister () {
    return wx.cloud.callFunction({
      name: 'user_isRegister'
    }).then(resp => resp.result);
  },
  // 新增用户
  addUser (data) {
    return wx.cloud.callFunction({
      name: 'user_addUser',
      data
    }).then(resp => resp.result);
  }
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userInfo = await db.collection('users').where({
    openId: wxContext.OPENID
  }).field({
    openId: true,
    nickName: true,
    avatarUrl: true,
    _id: false
  }).get();

  return {
    type: 'success',
    msg: '查询成功',
    userInfo: userInfo.data[0],
    isRegister: userInfo.data.length > 0
  }
}
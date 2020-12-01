// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('context', context);
  const wxContext = cloud.getWXContext()
  try {
    const userInfo = await db.collection('users').where({
      openId: wxContext.OPENID
    }).get();
    if (userInfo.data.length > 0) {
      return {
        code: 200,
        type: 'error',
        msg: '该用户已存在数据库中'
      };
    }
    const resp = await db.collection('users').add({
      data: {
        avatarUrl: event.avatarUrl,
        city: event.city,
        country: event.country,
        gender: event.gender,
        nickName: event.nickName,
        province: event.province,
        appId: event.userInfo.appId,
        openId: event.userInfo.openId
      }
    });
    return {
      code: 200,
      type: 'success',
      msg: '用户新增成功'
    };
  } catch (e) {
    console.log(e);
    return {
      type: 'error',
      code: 200,
      msg: '数据库操作失败'
    }
  }
}
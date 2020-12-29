// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  console.log('event', event);
  let id = event.id;
  let openid = wxContext.OPENID; // 获取当前用户的openid
  // 查询当前用户是否已有当前数据
  const respData = await db.collection('collection').where({
    openid,
    collectid: Number(id),
    isCollected: true
  }).get();
  return respData;
}
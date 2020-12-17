// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const respData = await db.collection('collection').where({
    openId: 'oQ48T0e4i82bL0MlzrUqbuueD-ws',
    collectId: '20'
  }).update({
    data: {
      createTime: db.serverDate()
    }
  });
  console.log(respData);
  return respData;
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { pageSize, pageNo } = event;
  const { data } = await db.collection('collection').where({
    openid: wxContext.OPENID
  })
  .skip((pageNo - 1) * pageSize)
  .limit(pageSize)
  .get();
  const totalObject = await db.collection('collection').count();
  const respData = {
    data: data,
    total: totalObject.total,
    pageSize,
    pageNo
  };
  console.log('respdYA', respData);
  return respData;
}
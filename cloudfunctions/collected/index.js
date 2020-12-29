// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { isCollected, name, classid, id: collectid, pic, content, cookingtime, preparetime, tag, peoplenum } = event;
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID;
  let respData = {
    type: 'error'
  };
  const { data } = await db.collection('collection').where({
    openid: wxContext.OPENID,
    collectid
  }).get();
  console.log('data', data);
  // 是否已存在
  if (data.length > 0) {
    // update
    const updateData = await db.collection('collection')
      .where({
        collectid
      })
      .update({
        data: {
          isCollected,
          updateTime: db.serverDate()
        }
      });
      if (updateData.stats.updated > 0) {
        respData.type = 'success';
      }
  } else {
    // add
    const addData = await db.collection('collection').add({
      data: {
        openid,
        isCollected,
        name,
        tag,
        classid,
        collectid,
        pic,
        content,
        cookingtime,
        preparetime,
        createTime: db.serverDate(),
        updateTime: db.serverDate(),
        peoplenum
      }
    });
    if (addData._id) {
      respData.type = 'success';
    }
  }
  return respData;
}
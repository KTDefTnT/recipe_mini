// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const result = await cloud.openapi.customerServiceMessage.send({
      touser: wxContext.OPENID,
      msgType: 'text',
      text: {
        content: 'hello world'
      }
    });
    return result;
  } catch (error) {
    return error;
  }
}
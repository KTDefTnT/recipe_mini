// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  const options = {
    method: 'GET',
    url: 'https://aip.baidubce.com/oauth/2.0/token',
    qs: {
      grant_type: 'client_credentials',
      client_id: 'yBUrfx7WNpqZKIQ30D9VpMG4',
      client_secret: 'CflxOboNPBDIEwG4CQvihccoj8EsivDw'
    },
    json: true
  };
  //获取get请求数据
  const respData = await request(options);
  console.log('resp', respData.access_token);
  return {
    access_token: respData.access_token
  }
}
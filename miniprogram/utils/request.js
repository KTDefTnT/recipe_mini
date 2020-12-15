const baseUrl = 'https://way.jd.com/';
const service =  function (method, url, params) {
  const data = { ...params, appkey: '3fd0070c5fbd9d0ce290f741fcb6d5ed' };
  return new Promise((reslove, reject) => {
    wx.request({
      url: baseUrl + url,
      data,
      method,
      success: resp => {
        if (resp.data.code !== '10000') {
          console.log('request', resp.code);
          wx.showToast({
            title: resp.data.msg
            // image: '../static/error.png'
          });
        } 
        reslove(resp);
      },
      fail: error => {
        wx.showToast({
          title: '请求失败'
        });
        resolve(error)
      }
    });
  });
}
const http = {
  get: function (url, data) {
    return service('GET', url, data);
  },
  post: function (url, data) {
    return service('POST', url, data);
  },
}

export default http;
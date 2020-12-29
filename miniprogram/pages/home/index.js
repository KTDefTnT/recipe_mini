// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    array: ['美国', '中国', '巴西', '日本']
  },
  onLoad: function () {
    this.getAccessToken();
  },
  // 操作数据库
  async handlePractice () {
    await wx.cloud.callFunction({
      name: 'database_practice'
    });
  },
  async onLoad () {
    const db = wx.cloud.database();
    const respData = db.collection('collection').where({
      openId: 'oQ48T0e4i82bL0MlzrUqbuueD-ws', // 填入当前用户 openid
      collectId: '20'
    }).watch({
      onChange: function(snapshot) {
        console.log('snapshot', snapshot)
      },
      onError: function(err) {
        console.error('the watch closed because of error', err)
      }
    });
  },
  async getAccessToken () {
    const respData = await wx.cloud.callFunction({
      name: 'get_baidu_token'
    });
    this.setData({
      access_token: respData.result.access_token
    });
  },
  handleChooseImg () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        let filePath = res.tempFilePaths[0];
        wx.getFileSystemManager().readFile({
          filePath,
          encoding: 'base64',
          success: (respData) => {
            this.getDishList(respData.data);
          }
        });
      }
    })
  },
  async getDishList (base64) {
    wx.request({
      method: 'POST',
      url: `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=${this.data.access_token}`,
      data: {
        image: base64,
        filter_threshold: 0.95
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: respData => {
        const resultList = respData.data.result;
        let sureItem = resultList.filter(item => Number(item.probability) > 0.7);
        // 若存在百分之六十命中则直接跳转
        if (sureItem.length > 0) {
          wx.navigateTo({
            url: `/pages/search/index?name=${sureItem[0].name}`,
          });
        } else {
          // 若不存在则用户自动选择
          let actionList = resultList.map(item => `${item.name}  概率：${(Number(item.probability)*100).toFixed(2)}%`);
          wx.showActionSheet({
            itemList: actionList,
            success: selectItem => {
              wx.navigateTo({
                url: `/pages/search/index?name=${resultList[0].name}`,
              });
            }
          });
        }
      },
      fail: error => {
        wx.showToast({
          title: error,
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
  handleFocus () {
    wx.navigateTo({
      url: '/pages/search/index',
    });
  }
})
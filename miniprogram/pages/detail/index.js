// miniprogram/pages/detail/index.js.js
import recipeAPI from '../../core/api/recipe.api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: {}
  },
  async getDetailByKeyword (keyword) {
    const respData = await recipeAPI.search({ keyword, num:1  });
    if (respData.code === '10000') {
      this.setData({
        detailInfo: respData.result.result.list.length > 0 ? respData.result.result.list[0] : {}
      });
    }
  },
  async getDetailByClassid (id) {
    const respData = await recipeAPI.getDetailByClassid(id);
    if (respData.code === '10000') {
      this.setData({
        detailInfo: respData.result.result
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log('detailoptions', options);
    wx.showLoading({
      title: '详情加载中',
    })
    if (options.name) {
      await this.getDetailByKeyword(options.name);
    } else {
      await this.getDetailByClassid(options.id)
    }
    wx.hideLoading();
  }
})
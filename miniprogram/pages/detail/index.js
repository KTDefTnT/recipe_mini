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
    console.log('getDetailByKeyword', respData);
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
  onLoad: function (options) {
    console.log('options', options);
    if (options.name) {
      this.getDetailByKeyword(options.name);
    } else {
      this.getDetailByClassid(options.id)
    }
  }
})
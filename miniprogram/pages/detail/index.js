// miniprogram/pages/detail/index.js.js
import recipeAPI from '../../core/api/recipe.api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo: {},
    collected: false
  },
  async getDetailByKeyword (keyword) {
    const respData = await recipeAPI.search({ keyword, num:1  });
    if (respData.code === '10000') {
      this.setData({
        detailInfo: respData.result.result.list.length > 0 ? respData.result.result.list[0] : {}
      }, () => {
        this.data.detailInfo.id && this.checkIsCollected(this.data.detailInfo.id);
      });
    }
  },
  async getDetailByClassid (id) {
    const respData = await recipeAPI.getDetailByClassid(id);
    if (respData.code === '10000') {
      this.checkIsCollected(id);
      this.setData({
        detailInfo: respData.result.result
      });
    }
  },
  async checkIsCollected (id) {
    let respData = await wx.cloud.callFunction({
      name: 'is_collected',
      data: {
        id
      }
    });
    if (respData.result.errMsg === 'collection.get:ok') {
      this.setData({
        collected: respData.result.data.length > 0
      });
    }
  },
  /**
   * 收藏或者取消收藏
   */
  async handleCollect (event) {
    let isCollected = event.target.dataset.collected;
    wx.cloud.callFunction({
      name: 'collected',
      data: {
        isCollected,
        ...this.data.detailInfo
      }
    }).then(() => {
      wx.showToast({
        title: isCollected ? '收藏成功' : '取消成功',
      });
      this.checkIsCollected(this.data.detailInfo.id);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
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
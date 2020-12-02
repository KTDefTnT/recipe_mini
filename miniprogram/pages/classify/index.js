// miniprogram/pages/classify/index.js
import recipeAPI from '../../core/api/recipe.api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: []
  },
  handleViewClassify (data) {
    console.log('data', data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let resp = await recipeAPI.getRecipeClassify();
    if (resp.code === '10000') {
      this.setData({
        classifyList: resp.result.result
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
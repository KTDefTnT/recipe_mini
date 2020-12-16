// miniprogram/pages/classify/index.js
import recipeAPI from '../../core/api/recipe.api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [],
    selectedId: '',
    listData: [],
    start: 0,
    noMore: false
  },
  // 详情
  handleViewDetil (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    });
  },
  // 分类
  handleViewClassify (data) {
    let classid = data.target.dataset.classid;
    this.setData({
      listData: []
    });
    this.getListByClassid(classid);
    this.setData({
      selectedId: classid
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    wx.showLoading({
      title: '数据加载中...',
    });
    let resp = await recipeAPI.getRecipeClassify();
    wx.hideLoading();
    if (resp.result.msg === 'ok') {
      let classifyList = resp.result.result.slice(1);
      let selectedId = classifyList[0].classid;
      this.getListByClassid(selectedId);
      this.setData({
        selectedId,
        classifyList
      });
    }
  },
  async getListByClassid (classid) {
    wx.showLoading({
      title: '数据加载中...',
    });
    let data = {
      classid,
      start: this.data.start,
      num: 10
    };
    let respData = await recipeAPI.getListByClassid(data);
    wx.hideLoading();
    if (respData.result.msg === 'ok') {
      let list = this.data.listData.concat(respData.result.result.list);
      this.setData({
        listData: list,
        noMore: list.length >= respData.result.result.total
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
    this.setData({
      start: this.data.start + 10
    }, () => {
      this.getListByClassid(this.data.selectedId);
    });
    console.log('onReachBottom');
  }
})
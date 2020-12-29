// miniprogram/pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: [],
    pageSize: 10,
    pageNo: 1,
    total: 0
  },
  async getCollectList (loadMore = false) {
    const respData = await wx.cloud.callFunction({
      name: 'get_collected_list',
      data: {
        pageSize: this.data.pageSize,
        pageNo: this.data.pageNo
      }
    });
    this.setData({
      collectList: loadMore ? this.data.collectList.concat(respData.result.data) : respData.result.data,
      total: respData.result.total
    });
  },
  handleViewClassify (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getCollectList();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo: 1,
      pageSize: 10
    }, () => {
      this.getCollectList();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 若未全部加载完成则继续加载
    console.log(this.data.collectList.length, this.data.total);
    this.setData({
      pageNo: this.data.pageNo + 1
    }, async () => {
      if (this.data.collectList.length < this.data.total) {
        wx.showLoading({
          title: '数据加载中...',
        });
        await this.getCollectList(true);
        wx.hideLoading();
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
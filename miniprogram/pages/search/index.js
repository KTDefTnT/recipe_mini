import recipeAPI from '../../core/api/recipe.api';
Page({
  data: {
    classifyList: [],
    focus: true,
    searchValue: ''
  },
  async getClassifyList (keyword) {
    let respData = await recipeAPI.search({ keyword, num: 20, start: 20 });
    if (respData.code === '10000' && respData.result.status === 0) {
      this.setData({
        classifyList: respData.result.result.list
      });
    }
  },
  handleSearchRecipe (event) {
    let keyword = event.detail.value;
    this.getClassifyList(keyword);
  },
  handleViewClassify (event) {
    console.log('event',event);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    });
  },
  handleClearSearch () {
    this.setData({
      classifyList: []
    });
    wx.switchTab({
      url: '/pages/home/index',
    });
  },
  onLoad (options) {
    console.log('options', options);
    if (options.name) {
      this.setData({
        searchValue: options.name
      });
      this.getClassifyList(options.name);
    }
  }
});
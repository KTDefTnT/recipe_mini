import recipeAPI from '../../core/api/recipe.api';
Page({
  data () {
    classifyList: []
  },
  async handleSearchRecipe (event) {
    let keyword = event.detail.value;
    let respData = await recipeAPI.search({ keyword, num: 20, start: 20 });
    if (respData.code === '10000') {
      this.setData({
        classifyList: respData.result.result.list
      });
    }
    console.log(respData)
  }
});
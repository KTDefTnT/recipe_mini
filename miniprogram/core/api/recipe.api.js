import http from '../../utils/request.js';
export default {
  // 获取菜谱分类
  getRecipeClassify: () => {
    return http.get('jisuapi/recipe_class').then(resp => {
      return resp.data;
    });
  },
  // 获取对应分类下的数据
  getListByClassid: (data) => {
    return http.get('jisuapi/byclass', data).then(resp => {
      return resp.data;
    });
  },
  // 获取菜谱详情
  getDetailByClassid: (id) => {
    return http.get('jisuapi/detail', { id }).then(resp => {
      return resp.data;
    });
  },
  // 搜索菜谱
  search: (data) => {
    return http.get('jisuapi/search', data).then(resp => {
      return resp.data;
    }); 
  },
  // 扫码识别
  findFood: (data) => {
    return http.get('/JDAI/FoodApi', data).then(resp => {
      return resp.data;
    }); 
  }
}
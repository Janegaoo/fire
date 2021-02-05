/*
 * @Author: Jane
 * @Date: 2020-07-31 16:34:53
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-06 10:28:56
 * @Descripttion:
 */
export default {
  getUserInfo({ commit }, userInfo) {
    commit('setUserInfo', userInfo);
  },
  getMenus({ commit }, menus) {
    commit('setMenus', menus);
  },
  getButtons({ commit }, buttons) {
    commit('setButtons', buttons);
  },
};

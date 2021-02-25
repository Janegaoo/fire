/*
 * @Author: Jane
 * @Date: 2020-06-10 09:00:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-23 10:20:05
 * @Descripttion:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex);
// console.log(JSON.parse(sessionStorage.getItem('state')));
export default new Vuex.Store({
  // state: {
  //   userInfo: {},
  // },
  state: {
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {},
    menus: localStorage.getItem('menus') ? JSON.parse(localStorage.getItem('menus')) : {},
    buttons: localStorage.getItem('buttons') ? JSON.parse(localStorage.getItem('buttons')) : {},
    activeMenu: localStorage.getItem('activeMenu') ? JSON.parse(localStorage.getItem('activeMenu')) : { actKey: [0], id: null },
  },
  getters: {
    getUserInfo: (state) => state.userInfo,
    getMenus: (state) => state.menus,
    getButtons: (state) => state.buttons,
    getActiveMenu: (state) => state.activeMenu,
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log('-----');
      console.log(userInfo);
      state.userInfo = userInfo;
    },
    setMenus(state, menus) {
      // console.log(menus);
      state.menus = menus;
      localStorage.setItem('menus', JSON.stringify(menus));
    },
    setButtons(state, buttons) {
      // console.log(menus);
      state.buttons = buttons;
      localStorage.setItem('buttons', JSON.stringify(buttons));
    },
    setActiveMenu(state, activeMenu) {
      state.activeMenu = activeMenu;
      localStorage.setItem('activeMenu', JSON.stringify(activeMenu));
    },
  },
  actions,
  modules: {
  },
});

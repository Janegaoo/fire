/*
 * @Author: Jane
 * @Date: 2020-08-03 11:01:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 14:51:40
 * @Descripttion:
 */
import store from '@/store';
import router from './route';

// todo

// router.beforeEach((to, from, next) => {
//   const whiteList = ['Login', 'Main', '404'];
//   // console.log(to.path);
//   // console.log(to.path.indexOf(whiteList[1]) <= -1);
//   if (whiteList.indexOf(to.name) === -1) {
//     // if (store.getters.getMenus.findIndex((item) => item.path === to.path) > -1) {
//     if (store.getters.getMenus.findIndex((item) => item.code === to.meta.code) > -1) {
//       next();
//     } else {
//       next({ path: '/404' });
//     }
//   } else {
//     next();
//   }
// });

export default router;

/*
 * @Author: Jane
 * @Date: 2020-07-31 14:57:50
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 16:05:31
 * @Descripttion:
 */
const route = [
  {
    path: 'home',
    name: 'Home',
    meta: {
      code: 'home',
    },
    component: () => import(/* webpackChunkName: "home" */ './Index.vue'),
  },
];

export default route;

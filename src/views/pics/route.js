/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 15:33:40
 * @Descripttion:
 */
const route = [
  {
    path: 'pics',
    name: 'Pics',
    meta: {
      code: 'pics',
    },
    component: () => import(/* webpackChunkName: "pics" */ './Index.vue'),
  },
];

export default route;

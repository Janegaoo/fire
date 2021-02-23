/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 13:45:23
 * @Descripttion:
 */
const route = [
  {
    path: 'news',
    name: 'News',
    meta: {
      code: 'news',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './Index.vue'),
  },
];

export default route;

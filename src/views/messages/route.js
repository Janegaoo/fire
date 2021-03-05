/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-04 11:32:55
 * @Descripttion:
 */
const route = [
  {
    path: 'messages',
    name: 'messages',
    meta: {
      code: 'messages',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './Index.vue'),
  },
];

export default route;

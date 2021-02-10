/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-08 11:54:41
 * @Descripttion:
 */
const route = [
  {
    path: 'policeList',
    name: 'PoliceList',
    meta: {
      code: 'police',
    },
    component: () => import(/* webpackChunkName: "pics" */ './Index.vue'),
  },
];

export default route;

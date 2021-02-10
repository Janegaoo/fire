/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-10 11:00:25
 * @Descripttion:
 */
const route = [
  {
    path: 'fireStationInfo',
    name: 'FireStationInfo',
    meta: {
      code: 'station',
    },
    component: () => import(/* webpackChunkName: "pics" */ './FireStationInfo.vue'),
  },
];

export default route;

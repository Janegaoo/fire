/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 13:20:58
 * @Descripttion:
 */
const route = [
  {
    path: 'fireStationInfo',
    name: 'FireStationInfo',
    meta: {
      code: 'station',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './FireStationInfo.vue'),
  },
  {
    path: 'stationGroup',
    name: 'StationGroup',
    meta: {
      code: 'station',
    },
    component: () => import(/* webpackChunkName: "StationGroup" */ './StationGroup.vue'),
  },
  {
    path: 'stationInfo',
    name: 'StationInfo',
    meta: {
      code: 'station',
    },
    component: () => import(/* webpackChunkName: "stationInfo" */ './componets/StationInfo.vue'),
  },
];

export default route;

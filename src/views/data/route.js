/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 13:55:32
 * @Descripttion:
 */
const route = [
  {
    path: 'policeRecord',
    name: 'PoliceRecord',
    meta: {
      code: 'data',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './PoliceRecord.vue'),
  },
  {
    path: 'maintainReport',
    name: 'MaintainReport',
    meta: {
      code: 'data',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './MaintainReport.vue'),
  },
  {
    path: 'trackQuery',
    name: 'TrackQuery',
    meta: {
      code: 'data',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './TrackQuery.vue'),
  },
];

export default route;

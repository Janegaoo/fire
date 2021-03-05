/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 11:05:24
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
  {
    path: 'policeInfo',
    name: 'PoliceInfo',
    meta: {
      code: 'data',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './PoliceInfo.vue'),
  },
  {
    path: 'maintainReportInfo',
    name: 'MaintainReportInfo',
    meta: {
      code: 'data',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './MaintainReportInfo.vue'),
  },
];

export default route;

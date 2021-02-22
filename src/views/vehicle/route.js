/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 13:42:37
 * @Descripttion:
 */
const route = [
  {
    path: 'vehicleConfig',
    name: 'VehicleConfig',
    meta: {
      code: 'vehicle',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './VehicleConfig.vue'),
  },
  {
    path: 'vehicleDepot',
    name: 'VehicleDepot',
    meta: {
      code: 'vehicle',
    },
    component: () => import(/* webpackChunkName: "vehicleDepot" */ './VehicleDepot.vue'),
  },
];

export default route;

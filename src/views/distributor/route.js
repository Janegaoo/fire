/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 15:29:29
 * @Descripttion:
 */
const route = [
  {
    path: 'distributorList',
    name: 'DistributorList',
    meta: {
      code: 'distributor',
    },
    component: () => import(/* webpackChunkName: "distributor" */ './Index.vue'),
  }, {
    path: 'distributorInfo',
    name: 'DistributorInfo',
    meta: {
      code: 'distributor',
    },
    component: () => import(/* webpackChunkName: "DistributorInfo" */ './Info.vue'),
  },
];

export default route;

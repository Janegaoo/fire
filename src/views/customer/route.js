/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 14:47:32
 * @Descripttion:
 */
const route = [
  {
    path: 'customerList',
    name: 'CustomerList',
    meta: {
      code: 'customer',
    },
    component: () => import(/* webpackChunkName: "user" */ './Index.vue'),
  }, {
    path: 'customerInfo',
    name: 'CustomerInfo',
    meta: {
      code: 'customer',
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ './Info.vue'),
  },
];

export default route;

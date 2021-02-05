/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 15:33:59
 * @Descripttion:
 */
const route = [
  {
    path: 'codeList',
    name: 'CodeList',
    meta: {
      code: 'codeManage',
    },
    component: () => import(/* webpackChunkName: "code" */ './Index.vue'),
  }, {
    path: 'codeInfo',
    name: 'CodeInfo',
    meta: {
      code: 'codeManage',
    },
    component: () => import(/* webpackChunkName: "CodeInfo" */ './Info.vue'),
  },
];

export default route;

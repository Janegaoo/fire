/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 14:27:25
 * @Descripttion:
 */
const route = [
  {
    path: 'userManage',
    name: 'UserManage',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './UserManage.vue'),
  },
  {
    path: 'authorManage',
    name: 'AuthorManage',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './AuthorManage.vue'),
  },
  {
    path: 'cooperateManage',
    name: 'CooperateManage',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "FireStationInfo" */ './CooperateManage.vue'),
  },
];

export default route;

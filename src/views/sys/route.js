/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 17:07:46
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
  }, {
    path: 'userInfo',
    name: 'UserInfo',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ './Info.vue'),
  }, {
    path: 'authInfo',
    name: 'AuthInfo',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ './AuthInfo.vue'),
  }, {
    path: 'cooperateInfo',
    name: 'CooperateInfo',
    meta: {
      code: 'sys',
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ './CooperateInfo.vue'),
  },
];

export default route;

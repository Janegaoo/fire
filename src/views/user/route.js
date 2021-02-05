/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 15:33:27
 * @Descripttion:
 */
const route = [
  {
    path: 'userList',
    name: 'UserList',
    meta: {
      code: 'user',
    },
    component: () => import(/* webpackChunkName: "user" */ './Index.vue'),
  }, {
    path: 'userInfo',
    name: 'UserInfo',
    meta: {
      code: 'user',
    },
    component: () => import(/* webpackChunkName: "UserInfo" */ './Info.vue'),
  },
];

export default route;

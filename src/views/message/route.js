/*
 * @Author: Jane
 * @Date: 2020-08-06 10:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-14 15:04:34
 * @Descripttion:
 */
const route = [
  {
    path: 'messageList',
    name: 'MessageList',
    meta: {
      code: 'message',
    },
    component: () => import(/* webpackChunkName: "message" */ './Index.vue'),
  },
  {
    path: 'addMessage',
    name: 'AddMessage',
    meta: {
      code: 'message',
    },
    component: () => import(/* webpackChunkName: "message" */ './AddMessage.vue'),
  },
  {
    path: 'messageInfo',
    name: 'MessageInfo',
    meta: {
      code: 'message',
    },
    component: () => import(/* webpackChunkName: "message" */ './Info.vue'),
  },
];

export default route;

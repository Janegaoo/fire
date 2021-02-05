/*
 * @Author: Jane
 * @Date: 2020-07-31 15:31:41
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 11:45:02
 * @Descripttion:
 */
const route = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error-page/404'),
  },
];

export default route;

/*
 * @Author: Jane
 * @Date: 2020-05-20 18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 17:42:46
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  sysUserLogin(params) {
    return http.post(`${SERVER_CONFIG.FRAME_BASE_API}/sysu/sysUserLogin`, params);
  },
  routes() {
    return http.get(`${SERVER_CONFIG.FRAME_BASE_API}/sysu/routes`);
  },
};

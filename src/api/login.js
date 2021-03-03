/*
 * @Author: Jane
 * @Date: 2020-05-20 18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-01 14:59:07
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  login(params) {
    return http.post('/api/login', params);
  },
  me() {
    return http.get('/api/me');
  },
  routes() {
    return http.get(`${SERVER_CONFIG.FRAME_BASE_API}/sysu/routes`);
  },
};

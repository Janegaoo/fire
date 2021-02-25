/*
 * @Author: Jane
 * @Date: 2020-05-20 18:10:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-23 09:36:49
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  login(params) {
    return http.post('/api/login', params);
  },
  routes() {
    return http.get(`${SERVER_CONFIG.FRAME_BASE_API}/sysu/routes`);
  },
};

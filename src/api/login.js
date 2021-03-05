/*
 * @Author: Jane
 * @Date: 2020-05-20 18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-03 11:08:17
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
  sms(params) {
    return http.post('/api/sms', params);
  },
};

/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 11:41:49
 * @Descripttion:
 */
// import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  customers(params) {
    return http.get('/api/customers', params);
  },
};

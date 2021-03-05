/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-04 13:52:06
 * @Descripttion:
 */
import http from '@/utils/axios/http';

export default {
  messages(params) {
    return http.get(`api/messages`, params);
  },
  delMessages(params) {
    return http.delete(`api/messages/${params.id}`);
  },
};

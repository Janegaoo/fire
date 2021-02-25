/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-25 13:58:13
 * @Descripttion:
 */
// import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  firehouses(params) {
    return http.get('/api/firestations/firehouses', params);
  },
  addFirehouses(params) {
    return http.post('/api/firestations/firehouses', params);
  },
  infoFirehouses(params) {
    return http.get(`/api/firestations/firehouses/${params.id}`, params);
  },
  updateFirehouses(params) {
    return http.post(`/api/firestations/firehouses/${params.id}`, params);
  },
  delFirehouses(params) {
    return http.delete(`/api/firestations/firehouses/${params.id}`);
  },
  fireengines(params) {
    return http.get(`/api/firestations/firehouses/${params.id}/fireengines`);
  },
  addFireengines(params) {
    return http.post(`/api/firestations/firehouses/${params.id}/fireengines`);
  },
  // infoFireengines(params) {
  //   return http.get(`/api/firestations/firehouses/${params.id}`, params);
  // },
};

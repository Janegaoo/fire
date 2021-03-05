/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 14:56:35
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
    return http.post(`/api/firestations/firehouses/${params.id}/fireengines`, params);
  },
  infoFireengines(params) {
    return http.get(`/api/firestations/firehouses/${params.id}/fireengines/${params.fireengineId}`, params);
  },
  firestations(params) {
    return http.get('/api/firestations', params);
  },
  addFirestations(params) {
    return http.post('/api/firestations', params);
  },
  infoFirestations(params) {
    return http.get(`/api/firestations/${params.id}`);
  },
  // 消防人员
  fireman(params) {
    return http.get(`/api/firestations/firehouses/${params.id}/fireman`, params);
  },
  addFireman(params) {
    return http.post(`firestations/firehouses/${params.id}/fireman`, params);
  },
  infoFireman(params) {
    return http.get(`api/firestations/firehouses/${params.id}/fireman/${params.firemanId}`, params);
  },
  updateFireman(params) {
    return http.post(`api/firestations/firehouses/${params.id}/fireman/${params.firemanId}`, params);
  },
  delFireman(params) {
    return http.delete(`api/firestations/firehouses/${params.id}/fireman/${params.firemanId}`, params);
  },
  // 排班计划
  scheduling(params) {
    return http.get(`api/firestations/firehouses/${params.id}/scheduling`, params);
  },
  addScheduling(params) {
    return http.post(`firestations/firehouses/${params.id}/scheduling`, params);
  },
  // infoScheduling(params) {
  //   return http.get(`api/firestations/firehouses/${params.id}/scheduling/${params.firemanId}`, params);
  // },
  // updateScheduling(params) {
  //   return http.post(`api/firestations/firehouses/${params.id}/scheduling/${params.firemanId}`, params);
  // },
  // delScheduling(params) {
  //   return http.delete(`api/firestations/firehouses/${params.id}/scheduling/${params.firemanId}`, params);
  // },
};

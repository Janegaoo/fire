/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 11:19:08
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  firealarms(params) {
    return http.get(`api/datas/firealarms`, params);
  },
  infoFirealarms(params) {
    return http.get(`api/datas/firealarms/${params.id}`);
  },
  checkingrecord(params) {
    return http.get(`api/datas/checkingrecord`, params);
  },
  infoCheckingrecord(params) {
    return http.get(`api/datas/checkingrecord/${params.id}`);
  },
  trajectory(params) {
    return http.get(`api/datas/trajectory`, params);
  },
  infoTrajectory(params) {
    return http.get(`api/datas/trajectory/${params.id}`);
  }
};

/*
 * @Author: Jane
 * @Date: 2020-05-20 18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 17:17:26
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  sysStatistics(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/sysStatistics`, params);
  },
  sysSortInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/sysSortInfo`, params);
  },
  sysAlbumTotalByDate(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/sysAlbumTotalByDate`, params);
  },
  sysViewTotalByDate(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/sysViewTotalByDate`, params);
  },
  sysMemberTotalByDate(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/sysMemberTotalByDate`, params);
  },
};

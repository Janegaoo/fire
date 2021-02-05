/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 17:37:11
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  getCreateCodeList(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getCreateCodeList`, params);
  },
  generateCodeList(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/generate-code`, params);
  },
  getCodeListByCreateId(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getCodeListByCreateId`, params);
  },
  getExportSubmit(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/export/submit`, params);
  },
  getExportDownload(params) {
    return http.get(`${SERVER_CONFIG.BASE_API}/export/download`, params);
  },
  getUserLabel(params) {
    return http.get(`${SERVER_CONFIG.BASE_API}/sysu/userLabel`, params);
  },
  getAllUsers(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/searchAllUsers`, params);
  },
  getCompanyListForCreateCode(params) {
    return http.get(`${SERVER_CONFIG.BASE_API}/sysu/getCompanyListForCreateCode`, params);
  },
};

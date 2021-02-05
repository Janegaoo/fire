/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 17:37:19
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  getAllCompany(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getCompanyListForTotalCodeInfo`, params);
  },
  checkCompanyInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/checkCompanyInfo`, params);
  },
  createCompanyInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/createCompanyInfo`, params);
  },
  updateCompanyInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/updateCompanyInfo`, params);
  },
  delCompanyInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/delCompanyInfo`, params);
  },
  getOneCompanyInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getOneCompanyInfo`, params);
  },
};

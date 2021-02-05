/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-03 17:37:45
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  getUserLabel(params) {
    return http.get(`${SERVER_CONFIG.BASE_API}/sysu/userLabel`, params);
  },
  getAllUsers(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/searchAllUsers`, params);
  },
  getOneMemberInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getOneMemberInfo`, params);
  },
  getSearchAlbumInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/searchAlbumInfo`, params);
  },
};

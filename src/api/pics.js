/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-19 15:55:49
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  getSearchAlbumInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/searchAlbumInfo`, params);
  },
  enableAlbumInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/enableAlbumInfo`, params);
  },
  getOneAlbumPhotoList(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getOneAlbumPhotoList`, params);
  },
};

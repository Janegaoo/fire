/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 16:57:56
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  users(params) {
    return http.get(`api/systems/users`, params);
  },
  addUsers(params) {
    return http.post(`api/systems/users`, params);
  },
  infoUsers(params) {
    return http.get(`api/systems/users/${params.id}`);
  },
  updateUsers(params) {
    return http.post(`api/systems/users/${params.id}`, params);
  },
  delUsers(params) {
    return http.delete(`api/systems/users/${params.id}`);
  },
  role() {
    return http.get(`api/systems/role`);
  },
  addRole(params) {
    return http.post(`api/systems/role`, params);
  },
  updateRole(params) {
    return http.post(`api/systems/role/${params.id}`, params);
  },
  cooperate(params) {
    return http.get(`api/systems/cooperate`, params);
  },
};

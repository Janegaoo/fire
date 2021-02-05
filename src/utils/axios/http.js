/*
 * @Author: Jane
 * @Date: 2020-05-21 13:52:09
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-28 15:03:38
 * @Descripttion:
 */
import request from './request';

const http = {
  /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
  get(url, params, configs) {
    const config = {
      method: 'get',
      url,
    };
    if (params) config.params = params;
    return request(Object.assign(config, configs));
  },
  post(url, params, configs) {
    const config = {
      method: 'post',
      url,
    };
    if (params) config.data = params;
    return request(Object.assign(config, configs));
  },
  put(url, params, configs) {
    const config = {
      method: 'put',
      url,
    };
    if (params) config.params = params;
    return request(Object.assign(config, configs));
  },
  delete(url, params, configs) {
    const config = {
      method: 'delete',
      url,
    };
    if (params) config.params = params;
    return request(Object.assign(config, configs));
  },
};
// 导出
export default http;

/*
 * @Author: Jane
 * @Date: 2020-06-15   18:10:36
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-17 10:56:48
 * @Descripttion:
 */
import SERVER_CONFIG from '@build/config';
import http from '@/utils/axios/http';

export default {
  // 创建系统消息
  createSystemMessageInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/createSystemMessageInfo`, params);
  },
  // 删除单个消息信息
  deleteMessageInfoById(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/deleteMessageInfoById`, params);
  },
  // 获取消息类型
  getMessageCategory(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getMessageCategory`, params);
  },
  // 获取单个消息信息
  getOneMessageInfoById(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getOneMessageInfoById`, params);
  },
  // 获取消息列表
  getWebMessageList(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/getWebMessageList`, params);
  },
  // 修改未发布消息
  updateMessageInfo(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/updateMessageInfo`, params);
  },
  // 上传图片资源文件
  uploadMessagePicture(params) {
    return http.post(`${SERVER_CONFIG.BASE_API}/sysu/uploadMessagePicture`, params);
  },
};

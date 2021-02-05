/*
 * @Author: Jane
 * @Date: 2020-05-21 13:47:10
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-17 15:20:56
 * @Descripttion:
 */
// 导入axios
import axios from 'axios';
import store from '@/store/index';

// 1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: '',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  // timeout: 6 * 1000,
});
// 2.请求拦截器
service.interceptors.request.use((config) => {
  // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
  // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
  const selfConfig = config;
  // selfConfig.data = JSON.stringify(config.data);
  // if (!selfConfig.head) {
  //   selfConfig.headers['Content-Type'] = 'application/json';
  // } else {
  //   selfConfig.headers['Content-Type'] = selfConfig.head;
  // }

  // console.log(selfConfig);

  // selfConfig.headers['Content-Type'] = 'application/json';
  if (Object.prototype.toString.call(config.data) !== '[object FormData]' && config.method === 'post') {
    // 请求拦截器处理
    selfConfig.data = JSON.stringify(config.data);
    selfConfig.headers['Content-Type'] = 'application/json';
  }

  if (store.getters.getUserInfo.token) {
    selfConfig.headers.token = store.getters.getUserInfo.token;
  }

  // selfConfig.headers = {
  //   // 'Content-Type': 'application/x-www-form-urlencoded',
  // };
  // if(token){
  //   config.params = {'token':token}
  // }
  return selfConfig;
}, (error) => {
  Promise.reject(error);
});

// 3.响应拦截器
// eslint-disable-next-line arrow-body-style
service.interceptors.response.use((response) => {
// 接收到响应数据并成功后的一些共有的处理，关闭loading等
  // console.log(response);
  if (response.data.status === 403) {
    window.location.href = '/login';
  }
  return response;
},
(errors) => {
  /** *** 接收到异常响应的处理开始 **** */
  if (errors && errors.data) {
    const error = errors;
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.data.status) {
      case 400:
        error.message = '错误请求';
        break;
      case 401:
        error.message = '未授权，请重新登录';
        break;
      case 403:
        error.message = '拒绝访问';
        window.location.href = '/login';
        break;
      case 404:
        error.message = '请求错误,未找到该资源';
        // window.location.href = '/NotFound';
        break;
      case 405:
        error.message = '请求方法未允许';
        break;
      case 408:
        error.message = '请求超时';
        break;
      case 500:
        error.message = '服务器端出错';
        break;
      case 501:
        error.message = '网络未实现';
        break;
      case 502:
        error.message = '网络错误';
        break;
      case 503:
        error.message = '服务不可用';
        break;
      case 504:
        error.message = '网络超时';
        break;
      case 505:
        error.message = 'http版本不支持该请求';
        break;
      default:
        error.message = `连接错误${error.response.status}`;
    }
  } else {
    // 超时处理
    if (JSON.stringify(errors).includes('timeout')) {
      console.log('服务器响应超时，请刷新当前页');
    }
    console.log('连接服务器失败');
  }

  console.log(errors.message);
  /** *** 处理结束 **** */
  // 如果不需要错误处理，以上的处理过程都可省略
  // return Promise.resolve(errors.response);
  return Promise.reject(errors);
});
// 4.导入文件
export default service;

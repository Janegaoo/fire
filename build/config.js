/*
 * @Author: Jane
 * @Date: 2020-05-21 14:09:55
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-25 10:47:39
 * @Descripttion:
 */
/**
 * 开发环境
 */
const dev = {
  BASE_API: '/api',
  FRAME_BASE_API: '/hz-admin-sys',
  ENV: 'dev',
  URL: 'http://192.168.12.181/',
  downloadUrl: 'http://192.168.12.181:8082/',
};

/**
 * 测试环境
 */
const test = {
  BASE_API: '/api',
  FRAME_BASE_API: '/hz-admin-sys',
  ENV: 'prod',
  URL: 'http://192.168.12.181/',
  downloadUrl: 'http://192.168.12.181:8082/',
};

/**
 * 华为环境
 */
const staging = {
  BASE_API: '/api',
  FRAME_BASE_API: '/hz-admin-sys',
  ENV: 'prod',
  URL: 'https://staging1-web.xiaohongwu.com/webapp/',
  downloadUrl: 'http://admin-staging.xiaohongwu.com/',
};

/**
 * 生产环境
 */
const prod = {
  BASE_API: '/api',
  FRAME_BASE_API: '/hz-admin-sys',
  ENV: 'prod',
  // URL: 'https://cloud.xiaohongwu.com:8086/webapp/',
  URL: 'https://web.xiaohongwu.com/webapp/',
  downloadUrl: 'http://cloud.xiaohongwu.com:18980/',
};

let SERVER = null;
switch (process.env.VUE_APP_CURRENTMODE) {
  case 'dev':
    SERVER = dev;
    break;
  case 'staging':
    SERVER = staging;
    break;
  case 'prod':
    SERVER = prod;
    break;
  case 'test':
    SERVER = test;
    break;
  default:
    SERVER = test;
    break;
}

const SERVER_CONFIG = SERVER;

export default SERVER_CONFIG;

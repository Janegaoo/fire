/*
 * @Author: Jane
 * @Date: 2020-06-10 09:00:30
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-09 11:22:40
 * @Descripttion:
 */
import Vue from 'vue';
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
// @import './antd-theme.scss';
// import 'ant-design-vue/dist/antd.css';
// ant-design-vue/dist/antd.less

import * as filter from '@/utils/fliters';
// import echarts from 'echarts';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/icons/index';


// 引入基本模板
const echarts = require('echarts/lib/echarts');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入折线图组件
require('echarts/lib/chart/line');


Vue.prototype.$echarts = echarts;


Vue.config.productionTip = false;

Object.keys(filter).forEach((key) => {
  Vue.filter(key, filter[key]);
});

Vue.use(Ant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

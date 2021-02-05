/*
 * @Author: Jane
 * @Date: 2020-05-18 14:01:07
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-20 17:10:00
 * @Descripttion:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/login/Index.vue';

Vue.use(VueRouter);

const routeFiles = require.context('../', true, /^\.\/views\/((?!\/)[\s\S])+\/route\.js$/);
const routeArr = [];

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    redirect: '/',
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "main" */ '@/views/layout/Index.vue'),
    children: routeFiles.keys().reduce((modules, modulePath) => {
      // const moduleName = modulePath.replace(/^.\/(.*)\.js/, '$1');
      const value = routeFiles(modulePath);
      // modules[moduleName] = value.default;
      routeArr.push(value.default);
      return routeArr.flat();
    }, {}),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

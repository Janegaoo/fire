/*
 * @Author: Jane
 * @Date: 2020-05-27 18:02:02
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-12 18:10:04
 * @Descripttion:
 */
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

Vue.component('svg-icon', SvgIcon);
// requires and returns all modules that match
const requireAll = (requireContext) => requireContext.keys().map(requireContext);

// import all svg
// const req = require.context('./svg', true, /\.svg$/);
const req = require.context('!svg-sprite-loader?{"symbolId":"icon-[name]"}!./svg', false, /.svg$/);
requireAll(req);

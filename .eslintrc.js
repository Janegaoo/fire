/*
 * @Author: Jane
 * @Date: 2020-05-02 11:35:37
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-10 18:20:26
 * @Descripttion:
 */
// const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    BMapGL: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'javascript.validate.enable': 0,
    'max-len': ['error', { code: 300 }],
    'linebreak-style': [0, 'error', 'windows'],
    // "enforceInMethodNames": 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'global-require': 0,
    'no-useless-escape': 0,
  },
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [
  //         ['@', path.resolve(__dirname, './src')],
  //         ['@assets', path.resolve(__dirname, './src/assets/')],
  //         ['@components', path.resolve(__dirname, './src/components/')],
  //         ['@pub', path.resolve(__dirname, './src/pub/')],
  //         ['@build', path.resolve(__dirname, './src/build/')],
  //       ],
  //     },
  //   },
  // },

};

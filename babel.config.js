/*
 * @Author: Jane
 * @Date: 2020-05-18 14:01:07
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-11 17:08:02
 * @Descripttion:
 */
// 配置 TerserPlugin console.log 不生效

const plugins = [];
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
  plugins.push('transform-remove-console');
}
// plugins.push(['import', { libraryName: 'vant', style: true }]);

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins,
};

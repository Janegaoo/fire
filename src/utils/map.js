/*
 * @Author: Jane
 * @Date: 2020-06-10 13:59:57
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-10 17:56:26
 * @Descripttion:
 */

// const URL = '//api.map.baidu.com/api?type=webgl&v=1.0&ak=u4yi1iahr5qnxzIeI3GGS6IBRcAyFy9T&callback=init';

// function loadJs() {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.onload = () => {
//       resolve();
//     };
//     script.onerror = () => {
//       reject();
//     };
//     script.src = URL;
//     document.getElementsByTagName('body')[0].appendChild(script);
//   });
// }

// export default loadJs;


export default {
  init() {
    // console.log("初始化百度地图脚本...");
    const AK = 'u4yi1iahr5qnxzIeI3GGS6IBRcAyFy9T';
    const BMapURL = `//api.map.baidu.com/api?v=2.0&ak=${AK}&s=1&callback=onBMapCallback`;
    // eslint-disable-next-line consistent-return
    return new Promise((resolve, reject) => {
      console.log(reject);
      // 如果已加载直接返回
      if (typeof BMap !== 'undefined') {
        // eslint-disable-next-line no-undef
        resolve(BMap);
        return true;
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = () => {
        console.log('百度地图脚本初始化成功...');
        // eslint-disable-next-line no-undef
        resolve(BMap);
      };

      // 插入script脚本
      const scriptNode = document.createElement('script');
      scriptNode.setAttribute('type', 'text/javascript');
      scriptNode.setAttribute('src', BMapURL);
      document.body.appendChild(scriptNode);
    });
  },
};

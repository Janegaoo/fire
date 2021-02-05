/*
 * @Author: Jane
 * @Date: 2020-05-29 09:32:35
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-21 13:42:29
 * @Descripttion:
 */
import store from '../store';

export default {
  EscapeHtml(string) {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '‘': '&#39;',
      '/': '&#x2F;',
    };
    return String(string).replace(/[&<>"‘\/]/g, (s) => entityMap[s]);
  },
  IsInArr() {
    const arr = [];
    // if (store.state.buttons.findIndex((item) => item.parentId === +store.state.activeMenu.id) > -1) {
    //   return true;
    // }
    // store.state.buttons.findIndex((item) => {
    //   if (item.parentId === +store.state.activeMenu.id) {
    //     arr.push(item.name);
    //   }
    // });
    store.state.buttons.map((item) => {
      if (item.id === +store.state.activeMenu.id) {
        item.children.map((v) => {
          arr.push(v.code);
          return true;
        });
        return true;
      }
      return false;
    });
    return arr;
  },
  gblen(str) {
    let len = 0;
    for (let i = 0; i < str.length; i += 1) {
      if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  },
  IsURL(strUrl) {
    // const strRegex = /^((https?:\/\/)?(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/;
    // const strRegex = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    const strRegex = /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
    if (strRegex.test(strUrl)) {
      return true;
    }
    return false;
  },
  // urlRule(route: any) {
  //   const appId = Number(store.state.activeModuleId);
  //   const menuId = Number(store.state.activeMenuId);
  //   const type = AUTH.TYPE.TWO;
  //   const menus = store.state.menus;
  //   const res = getMenuAuth(menus, appId, menuId, type);
  //   return {
  //     menuRule: res.map(element => element.menuName),
  //   };
  // }
};

// export default {
//   EscapeHtml,
//   IsInArr,
// };

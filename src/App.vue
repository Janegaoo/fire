<!--
 * @Author: Jane
 * @Date: 2020-05-18 14:01:07
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-17 17:28:28
 * @Descripttion:
-->

<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';

export default {
  name: 'Main',
  data() {
    return {
      locale: zhCN,
    };
  },
  mounted() {
    window.addEventListener('unload', this.saveUserInfo);

    window.addEventListener('load', () => {
      // sessionStorage.clear();
      sessionStorage.removeItem('userInfo');
    });
  },
  methods: {
    saveUserInfo() {
      sessionStorage.setItem('userInfo', JSON.stringify(this.$store.state.userInfo));
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/index.scss";
html, body {
  height: 100%;
}
body {
  margin: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-variant: tabular-nums;
  line-height: 1.5;
  background-color: #fff;
  font-feature-settings: 'tnum';
  .ant-select-dropdown-menu-item {
    color: #484E5B;
  }
  .ant-select-dropdown-menu-item-selected {
    color: #484E5B;
  }
}
</style>

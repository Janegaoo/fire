<!--
 * @Author: Jane
 * @Date: 2020-06-12 14:22:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-10 13:36:11
 * @Descripttion:
-->
<template>
  <a-layout id="components-layout-demo-custom-trigger" class="layout">
    <a-layout-sider width=230 v-model="collapsed" :trigger="null" collapsed>
      <!-- <div class="logo" /> -->
      <svg-icon
        :iconName="!collapsed ? 'bigLogo' : 'smallLogo' "
        :class="!collapsed ? 'icon-logo-big' : 'icon-logo-small'"
      />
      <a-menu
        mode="inline"
        theme="dark"
        @click="menuClick" :default-selected-keys="defaultSelectedkeys"
      >
        <template v-for="(v, i) in getMenus">
          <a-menu-item v-if="!v.children" :key="i" :attr-path="v.path" :attr-id="v.id">
            <a-icon :type="v.source" />
            <span>{{ v.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="i" :menu-info="v">
          </sub-menu>
        </template>
      </a-menu>
      <!-- <a-menu theme="dark" mode="inline" @click="menuClick" :default-selected-keys="defaultSelectedkeys">
        <template v-for="(v, i) in getMenus">
          <a-menu-item v-if="!v.children" :key="i" :attr-path="v.path" :attr-id="v.id">
            <a-icon :type="v.source" />
            <span>{{ v.name }}</span>
          </a-menu-item>
          <a-sub-menu v-if="v.children" :key="i">
            <span slot="title">
              <a-icon :type="v.source" />
              <span>{{ v.name }}</span>
            </span>
            <template v-for="(c1v, c1i) in v.children">
              <a-menu-item :key="c1i" :attr-path="c1v.path" :attr-id="c1v.id">
                <a-icon :type="c1v.source" />
                <span>{{ c1v.name }}</span>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu> -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :span="12">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => (collapsed = !collapsed)"
            />
            <span class="trigger-name">后台管理系统</span>
          </a-col>
          <a-col :span="12" class="right">
            <a-avatar :size="30" :src="getUserInfo.headImage" />
            <span class="user-name">{{ getUserInfo.userName}}</span>
            <span class="logout" @click="logoutFn">
              <svg-icon
                iconName="logout"
                class="icon-logout"
              />
            </span>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content
        class="layout-content"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mapGetters } from 'vuex';
import { Menu } from 'ant-design-vue';


const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.id" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon :type="menuInfo.source" /><span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.id" :attr-path="item.path" :attr-id="item.id">
            <a-icon :type="item.source" />
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};


export default {
  data() {
    return {
      defaultSelectedkeys: (this.getActiveMenu && this.getActiveMenu.actKey) || [0],
      collapsed: false,
    };
  },
  components: {
    'sub-menu': SubMenu,
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getMenus', 'getActiveMenu']),
  },
  watch: {
    collapsed(v, n) {
      console.log(v, n);
    },
  },
  created() {
    this.defaultSelectedkeys = this.getActiveMenu && this.getActiveMenu.actKey;
  },
  mounted() {
    console.log(this.getMenus);
    // todo
    // if (!this.getUserInfo.id) {
    //   this.$router.push({ name: 'Login' });
    // }
  },
  methods: {
    menuClick(item) {
      console.log(item.item.$el.getAttribute('attr-id'));
      this.$store.commit('setActiveMenu', { actKey: [item.key], id: item.item.$el.getAttribute('attr-id') });
      this.$router.push({
        path: item.item.$el.getAttribute('attr-path'),
        // params: {
        //   activeMenu: item.key,
        // },
      });
    },
    logoutFn() {
      const self = this;
      this.$confirm({
        title: '是否确认退出?',
        content: '',
        okText: '确认',
        // okType: 'primary',
        cancelText: '取消',
        onOk() {
          self.$store.dispatch('getUserInfo', {});
          self.$router.push({ name: 'Login' });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.layout {
  .icon-logo-big {
    height: 54px;
    width: 168px;
  }
  .icon-logo-small {
    height: 54px;
    width: 66px;
  }
  .trigger-name {
    font-size: 20px;
    font-weight: bold;
    color: #001529;
  }
  .layout-content {
    // margin: 24px 16px;
    // padding: 16px;
    // background: #fff;
    background: #f0f2f5;
    min-height: 280px;
    height: 80vh;
    overflow: auto;
    // overflow: 'initial';
  }
}
.layout {
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent;
  }
}
.right {
  text-align: right;
}
.icon-logout {
  font-size: 18px;
  margin-right: 35px;
}
.user-name {
  padding-left: 8px;
  padding-right: 40px;
  font-size: 14px;
  color: #001529;
}
.logout {
  cursor: pointer;
}
</style>
<style lang="scss">
  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: transparent;
  }
</style>

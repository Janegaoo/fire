<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 09:59:46
 * @Descripttion:
-->
<template>
  <div class="main">
    <!-- <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      消防站详情
    </a-card> -->
    <div class="list">
      <a-row>
        <a-col :span="12" class="left">消防站详情</a-col>
      </a-row>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" tab="消防站基本信息">
          <tab-1></tab-1>
        </a-tab-pane>
        <a-tab-pane key="2" tab="消防车管理">
          <tab-2></tab-2>
        </a-tab-pane>
        <a-tab-pane key="3" tab="消防人员管理">
          <tab-3></tab-3>
        </a-tab-pane>
        <a-tab-pane key="4" tab="排班计划管理">
          <tab-4></tab-4>
        </a-tab-pane>
        <a-tab-pane key="5" tab="点检计划管理">
          <tab-5></tab-5>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import HTTP from '@/api/distributor';
import Tab1 from './Tab1.vue';
import Tab2 from './Tab2.vue';
import Tab3 from './Tab3.vue';
import Tab4 from './Tab4.vue';
import Tab5 from './Tab5.vue';

export default {
  props: [
  ],
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
  },
  data() {
    return {

    };
  },
  mounted() {
    console.log('ddd');
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  .tit {
    padding-right: 20px;
    display: inline-block;
  }
  .list {
    background-color: #fff;
    margin-top: 10px;
    .left {
      text-align: left;
      color: #001529;
      font-size: 18px;
      padding: 16px 32px;
    }
  }
}
</style>

<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 12:05:51
 * @Descripttion:
-->
<template>
  <div>
    <div style="text-align: right; padding-right: 10px;">
      <a-button type="primary" @click="add">添加</a-button>
    </div>
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
        <div class="main">
          <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
            <a-row class="top">
              <a-col :span="22">
                <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
                  <a-form-model-item label="请选择点检车型">
                    <a-select default-value="0">
                      <a-select-option value="0">值班</a-select-option>
                      <a-select-option value="1">休息</a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item label="点检时间">
                    <a-input v-model="站点名称" placeholder="输入日期，如'1'、‘1，3，5，7’，为1-31的日期数" />
                  </a-form-model-item>
                </a-form-model>
              </a-col>
              <a-col :span="2">
                <a-button type="primary" class="blueBtn" @click="handleSubmit">搜索</a-button>
              </a-col>
            </a-row>
          </a-card>
          <div class="pic-list">
            <a-row>
              <a-col :span="12" class="left"></a-col>
              <a-col :span="12" class="right">
                <a-button type="primary" class="btn" @click="add">发布</a-button>
              </a-col>
            </a-row>
            <a-table
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              :data-source="tableData"
              :rowKey="(record, index) => index"
              :pagination="pagination"
              class="userTable"
              @change="handleChange">
              <a-table-column key="id" title="序号" data-index="id" :width="88">
                <template slot-scope="id">
                  <span style="padding-left:20px">{{id}}</span>
                </template>
              </a-table-column>
              <a-table-column key="headImage" title="点检项" data-index="headImage" :width="75" align="center">
                <template slot-scope="headImage">
                  <span style="padding-left:20px">{{headImage}}</span>
                </template>
              </a-table-column>
              <a-table-column key="headImage" title="点检要求" data-index="headImage" :width="75" align="center">
                <template slot-scope="headImage">
                  <span style="padding-left:20px">{{headImage}}</span>
                </template>
              </a-table-column>
              <!-- <a-table-column key="headImage" title="点检结果" data-index="headImage" :width="75" align="center">
                <template slot-scope="headImage">
                  <span style="padding-left:20px">{{headImage | dateFormat}}</span>
                </template>
              </a-table-column> -->
              <a-table-column-group>
                <span slot="title">点检结果</span>
                <a-table-column :width="80" key="firstName" data-index="firstName">
                  <span slot="title">符合</span>
                </a-table-column>
                <a-table-column :width="80" key="lastName" title="不符合" data-index="lastName" />
              </a-table-column-group>
            </a-table>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import HTTP from '@/api/distributor';

export default {
  props: [
    'companyName',
    'comments',
    'companyId',
  ],
  data() {
    return {
      visible: true,
      confirmLoading: false,
      form: {
        companyName: '',
        comments: '',
      },
      rules: {
        companyName: [{
          required: true, message: '请输入分销商名称', trigger: 'blur', whitespace: true,
        }],
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      selectedRowKeys: [],
      panes: [
        { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
        { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
        { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
      ],
      activeKey: '1',
      newTabIndex: 0,
    };
  },
  watch: {
    form: {
      handler(n) {
        if (n.companyName || n.comments) {
          this.confirmLoading = false;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.form = {
      companyName: this.companyName,
      comments: this.comments,
      companyId: this.companyId,
    };
  },
  methods: {
    pos() {
      console.log('pos');
    },
    handleSubmit() {

    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const { panes } = this;
      const l = this.panes.length + 1;
      const activeKey = `上海虹桥消防站点检计划表${l}`;
      panes.push({
        title: `${activeKey}`,
        content: `Content of new Tab ${activeKey}`,
        key: activeKey,
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let { activeKey } = this;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter((pane) => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
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
  .top {
    border-bottom: 1px solid #eee;
    padding-bottom: 28px;
  }
  .pic-list {
    background-color: #fff;
    margin-top: 10px;
    // height: 80vh;
    // overflow: auto;
    .left {
      text-align: left;
      color: #001529;
      font-size: 18px;
      padding: 16px 32px;
    }
    .right {
      text-align: right;
      // color: #001529;
      // font-size: 18px;
      // padding-top: 16px;
    }
    .btn {
      margin-left: 10px;
      margin-right: 10px;
    }
    .green {
      background: green;
      border: 1px solid green;
    }
  }
}
</style>

<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 09:11:33
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="客户姓名">
              <a-input v-model="name" placeholder="请输入姓名" />
            </a-form-model-item>
            <a-form-model-item label="手机号码">
              <a-input v-model="mobile" placeholder="请输入手机号" />
            </a-form-model-item>
            <a-form-model-item label="归属站点">
              <a-input v-model="firehouseId" placeholder="请输入站点名称" />
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
        <a-col :span="12" class="left">客户管理</a-col>
        <a-col :span="12" class="right">
          <a-button type="danger" class="btn" @click="del">批量删除</a-button>
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
        <a-table-column key="name" title="姓名" data-index="name" :width="75" align="center">
          <template slot-scope="name">
            <span>{{name}}</span>
          </template>
        </a-table-column>
        <a-table-column key="mobile" title="手机号" data-index="mobile" :width="75" align="center">
          <template slot-scope="mobile">
            <span>{{mobile}}</span>
          </template>
        </a-table-column>
        <a-table-column key="firehouseId" title="归属站点" data-index="firehouseId" :width="75" align="center">
          <template slot-scope="firehouseId">
            <span>{{firehouseId}}</span>
          </template>
        </a-table-column>
        <a-table-column key="registerTime" title="归属站点" data-index="registerTime" :width="75" align="center">
          <template slot-scope="registerTime">
            <span>{{registerTime}}</span>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" :width="80">
          <template slot-scope="record">
            <span class="eye-w" @click="infoFn(record)">
              <svg-icon iconName="view" class="eye" />
              <span class="action">详情</span>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <group-pop v-if="showPop" ref="editChild" :companyId="companyId" :companyName="companyName" :comments="comments" @on-confirm="onConfirm" @on-cancel="onCancel"></group-pop>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/customer';
import PageInfo from '@/utils/page';
import GroupPop from './componets/Pop.vue';


export default {
  name: 'UserList',
  props: [],
  components: {
    GroupPop,
  },
  data() {
    return {
      formInline: {},
      inputType: '',
      searchInput: '',
      tableData: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      params: {},
      showPop: false,
      companyId: '',
      companyName: '',
      comments: '',
      selectedRowKeys: [],
      firehouseId: '',
      mobile: '',
      name: '',
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    add() {
      this.showPop = true;
    },
    del() {
      console.log('del');
    },
    expor() {
      console.log('export');
    },
    info() {
      console.log('info');
      this.$router.push({ name: 'StationInfo', query: {} });
    },
    handleSubmit() {
      console.log(this.formInline);
      // id
      // userId
      // colTitle
      // nickName
      this.params = {};
      this.params[this.formInline.searchType] = this.formInline.searchValue;
      this.getData();
    },
    resetFn() {
      this.formInline = {};
      this.params = {};
      this.getData();
    },
    getData() {
      const params = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        firehouseId: 15,
        // sort: 'ASC',
      };
      HTTP.customers(params)
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.records;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    // eslint-disable-next-line no-unused-vars
    pageChange(current) {
      this.pagination.current = current;
      // 下面再请求分页接口，重新渲染数据
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      // 请求分页接口，重新渲染数据
      this.pagination.current = 1;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    handleChange(sorter) {
      if (sorter.order) {
        this.params.order = sorter.columnKey;
        this.params.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      } else {
        this.params.order = '';
        this.params.sort = '';
      }
      this.getData();
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
      padding-top: 16px;
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

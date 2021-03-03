<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 16:40:55
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-form-model layout="inline" :modal="searchInfo">
        <a-form-model-item label="登录名">
          <a-input v-model="name" placeholder="登录名" />
        </a-form-model-item>
        <a-form-model-item label="消防站">
          <a-select placeholder="请选择消防站" style="margin-right:8px; width: 160px" v-model="searchInfo.inputType">
            <a-select-option value="id">用户ID</a-select-option>
            <a-select-option value="nikeName">用户昵称</a-select-option>
            <a-select-option value="phoneNumber">联系电话</a-select-option>
          </a-select>
        </a-form-model-item>      
        <!-- <a-select placeholder="请选择用户标签" style="margin-right: 8px; width: 320px" v-model="searchInfo.userLabel">
          <a-select-option v-for="item in labelArr" :key="item" :value="item">{{item}}</a-select-option>
        </a-select> -->
        <a-button type="primary" style="margin-right: 8px" @click="getData()">查询</a-button>
        <a-button type="defult" @click="resetSearch()">重置</a-button>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" :bodyStyle="{padding: '0 0'}">
      <a-row>
        <a-col :span="12" class="left">用户管理</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" class="btn" icon="plus" @click="add">添加</a-button>
          <a-button type="danger" class="btn" icon="minus" @click="del">删除</a-button>
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
        <a-table-column key="username" title="用户名" data-index="username" :width="75" align="center">
          <template slot-scope="username">
            <span>{{username}}</span>
          </template>
        </a-table-column>
        <a-table-column key="loginName" title="登录名" data-index="loginName" :width="75" align="center">
          <template slot-scope="loginName">
            <span>{{loginName}}</span>
          </template>
        </a-table-column>
        <a-table-column key="mobile" title="手机号" data-index="mobile" :width="75" align="center">
          <template slot-scope="mobile">
            <span>{{mobile}}</span>
          </template>
        </a-table-column>
        <a-table-column key="attached" title="归属" data-index="attached" :width="75" align="center">
          <template slot-scope="attached">
            <span>{{attached ? attached.name : '平台'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="role" title="用户角色" data-index="role" :width="75" align="center">
          <template slot-scope="role">
            <span>{{role.roleName}}</span>
          </template>
        </a-table-column>
        <a-table-column key="registerTime" title="用户角色" data-index="registerTime" :width="75" align="center">
          <template slot-scope="registerTime">
            <span>{{registerTime | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" :width="220">
          <template slot-scope="record">
            <a-button type="primary" icon="eye" class="sbtn" size="small" @click="info(record)">查看</a-button>
            <a-button type="primary" class="sbtn orange" size="small" @click="edit(record)">编辑</a-button>
            <a-button type="primary" class="sbtn red" size="small" @click="disable(record)">禁用</a-button>
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/sys';
import PageInfo from '@/utils/page';

export default {
  name: 'UserList',
  props: [],
  data() {
    return {
      searchInfo: {
        inputType: undefined,
        searchInput: '',
        userLabel: undefined,
      },
      order: '',
      sort: '',
      labelArr: [],
      tableData: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      selectedRowKeys: [],
      name: '',
    };
  },
  mounted() {
    // this.getLabel();
    this.getData();
  },
  methods: {
    del() {
      const params = {
        id: this.selectedRows[0].id,
      };
      HTTP.delUsers(params)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
            this.getData();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    add() {
      this.$router.push({ name: 'UserInfo', query: { type: 3 } });
    },
    info(v) {
      this.$router.push({ name: 'UserInfo', query: { tab: 1, type: 2, id: v.id } });
    },
    edit(v) {
      console.log(v);
      // localStorage.setItem('stationList', JSON.stringify(v));
      this.$router.push({ name: 'UserInfo', query: { tab: 1, type: 3, id: v.id } });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    getLabel() {
      HTTP.getUserLabel({})
        .then((res) => {
          if (res.data.status === 200) {
            this.labelArr = res.data.labelInfos || [];
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getData() {
      const { searchInfo, order, sort } = this;
      const params = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        firehouseId: 15,
      };
      if (searchInfo.inputType && searchInfo.searchInput) {
        params[searchInfo.inputType] = searchInfo.searchInput;
      }
      HTTP.users(params)
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data.data;
            this.pagination.total = res.data.totalCount;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    resetSearch() {
      this.searchInfo = {
        inputType: undefined,
        searchInput: '',
        userLabel: undefined,
      };
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.order = '';
      this.sort = '';
      this.getData();
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
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
    handleChange(pagination, filters, sorter) {
      if (sorter.order) {
        this.order = sorter.columnKey;
        this.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      } else {
        this.order = '';
        this.sort = '';
      }
      this.getData();
    },
    infoFn(data) {
      this.$router.push({ name: 'UserInfo', query: { userId: data.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  .listName {
    padding: 16px 32px;
    color: rgba(0, 21, 41, 1);
    font-size: 18px;
  }
  .headImage {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  ::v-deep .ant-table-thead > tr:first-child > th:first-child {
    padding-left: 32px;
  }
  ::v-deep .ant-table-pagination.ant-pagination {
    padding-right: 30px;
  }
  .action {
    color: #f03947;
    padding-left: 6px;
    font-size: 9px;
    font-style: normal;
  }
  .eye {
    color: #f03947;
    font-size: 14px;
  }
  .eye-w {
    cursor: pointer;
  }
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
}
</style>

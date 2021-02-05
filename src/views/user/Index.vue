<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-09 11:14:19
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-form-model layout="inline" :modal="searchInfo">
        <a-select placeholder="请选择查询类型" style="margin-right:8px; width: 160px" v-model="searchInfo.inputType">
          <a-select-option value="id">用户ID</a-select-option>
          <a-select-option value="nikeName">用户昵称</a-select-option>
          <a-select-option value="phoneNumber">联系电话</a-select-option>
        </a-select>
        <a-input
          placeholder="请输入查询内容"
          style="width: 320px; margin-right: 8px"
          v-model="searchInfo.searchInput"
        />
        <a-select placeholder="请选择用户标签" style="margin-right: 8px; width: 320px" v-model="searchInfo.userLabel">
          <a-select-option v-for="item in labelArr" :key="item" :value="item">{{item}}</a-select-option>
        </a-select>
        <a-button type="primary" style="margin-right: 8px" @click="getData()">查询</a-button>
        <a-button type="defult" @click="resetSearch()">重置</a-button>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" :bodyStyle="{padding: '0 0'}">
      <div class="listName">用户列表</div>
      <a-table
      :data-source="userList"
      :rowKey="(record, index) => index"
      :pagination="pagination"
      class="userTable"
      @change="handleChange">
      <a-table-column key="id" title="ID" data-index="id" :width="88">
        <template slot-scope="id">
          <span style="padding-left:20px">{{id}}</span>
        </template>
      </a-table-column>
      <a-table-column key="headImage" title="头像" data-index="headImage" :width="75" align="center">
        <template slot-scope="headImage">
          <img :src="headImage" alt='用户头像' class="headImage" />
        </template>
      </a-table-column>
      <a-table-column key="nikeName" title="昵称" data-index="nikeName">
        <template slot-scope="nikeName, record">
          <div>{{nikeName || '--'}}</div>
          <div style="font-size: 12px;color: rgba(153,160,170,1)">{{record.mobilePhone || '--'}}</div>
        </template>
      </a-table-column>
      <a-table-column key="bindStatus" title="微信绑定" data-index="bindStatus" :width="110">
        <template slot-scope="bindStatus">
          <span :style="bindStatus? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{bindStatus ? '已绑定' : '未绑定'}}</span>
        </template>
      </a-table-column>
      <a-table-column key="packageName" title="用户类型" data-index="packageName" :width="110">
        <template slot-scope="packageName">
          <span :style="packageName? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{packageName || '免费用户'}}</span>
        </template>
      </a-table-column>
      <a-table-column key="userLabel" title="用户标签" data-index="userLabel">
        <template slot-scope="userLabel">
          <span style="whiteSpace: nowrap;min-width:80px;display:inline-block">{{userLabel || '- -'}}</span>
        </template>
      </a-table-column>
      <a-table-column key="albumCount" title="作品数量" sorter="true" data-index="albumCount" :width="110">
        <template slot-scope="albumCount">
          <span>{{toThousands(albumCount)}}</span>
        </template>
      </a-table-column>
      <a-table-column key="viewCount" title="作品浏览量" sorter="true" data-index="viewCount" :width="130">
        <template slot-scope="viewCount">
          <span>{{toThousands(viewCount)}}</span>
        </template>
      </a-table-column>
      <a-table-column key="endTime" title="会员到期日" sorter="true" data-index="endTime" :width="120">
        <template slot-scope="endTime">
          <span style="color:rgba(153, 160, 170, 1)">{{ endTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="createTime" title="注册时间" sorter="true" data-index="createTime" :width="105">
        <template slot-scope="createTime">
          <span style="color:rgba(153, 160, 170, 1)">{{ createTime | dateFormat }}</span>
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
    </a-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/code';
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
      userList: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
    };
  },
  mounted() {
    this.getLabel();
    this.getData();
  },
  methods: {
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
        userLabel: searchInfo.userLabel,
        page: this.pagination.current,
        rows: this.pagination.pageSize,
        order,
        sort,
      };
      if (searchInfo.inputType && searchInfo.searchInput) {
        params[searchInfo.inputType] = searchInfo.searchInput;
      }
      HTTP.getAllUsers(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.userList = res.data.rows || [];
            this.pagination.total = res.data.records || 0;
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
}
</style>

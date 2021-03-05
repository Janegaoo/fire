<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-04 13:50:58
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="发送人">
              <a-input v-model="senderName" placeholder="请输入发送人姓名" />
            </a-form-model-item>
            <a-form-model-item label="接收人">
              <a-input v-model="receiverName" placeholder="请输入接收人姓名" />
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
        <a-col :span="12" class="left">消息管理</a-col>
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
        <a-table-column key="senderName" title="发送人" data-index="senderName" :width="75" align="center">
          <template slot-scope="senderName">
            <span style="padding-left:20px">{{senderName}}</span>
          </template>
        </a-table-column>
        <a-table-column key="receiverName" title="接收人" data-index="receiverName" :width="75" align="center">
          <template slot-scope="receiverName">
            <span style="padding-left:20px">{{receiverName}}</span>
          </template>
        </a-table-column>
        <a-table-column key="time" title="时间" data-index="time" :width="75" align="center">
          <template slot-scope="time">
            <span style="padding-left:20px">{{time | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="content" title="消息内容" data-index="content" :width="110">
          <template slot-scope="content">
            <a-tooltip placement="top">
              <template slot="title">
                <div class="addr">{{content}}</div>
              </template>
                <div class="addr">{{content}}</div>
            </a-tooltip>
          </template>
          
        </a-table-column>
        <a-table-column key="headImage" title="状态" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
        <!-- <a-table-column key="action" title="操作" :width="80">
          <template slot-scope="record">
            <span class="eye-w" @click="infoFn(record)">
              <svg-icon iconName="view" class="eye" />
              <span class="action">详情</span>
            </span>
          </template>
        </a-table-column> -->
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/messages';
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
      formInline: {},
      order: '',
      sort: '',
      labelArr: [],
      tableData: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      senderName: '',
      receiverName: '',
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  mounted() {
    // this.getLabel();
    this.getData();
  },
  methods: {
    handleSubmit() {
      
    },
    del() {
      const params = {
        id: this.selectedRows[0].id,
      };
      console.log(params);
      HTTP.delMessages(params)
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
      };
      if (searchInfo.inputType && searchInfo.searchInput) {
        params[searchInfo.inputType] = searchInfo.searchInput;
      }
      HTTP.messages(params)
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

<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 11:16:43
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="站点编号">
              <a-input v-model="站点名称" placeholder="请输入站点编号" />
            </a-form-model-item>
            <a-form-model-item label="消防车编号">
              <a-input v-model="站点名称" placeholder="请输入消防车编号" />
            </a-form-model-item>
            <a-form-model-item label="车速">
              <a-input v-model="站点名称" placeholder="请输入车速" />
            </a-form-model-item>
            <a-form-model-item label="时间段">
              <a-range-picker
                :disabled-date="disabledDate"
                :disabled-time="disabledRangeTime"
                :show-time="{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                }"
                format="YYYY-MM-DD HH:mm:ss"
              />
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
        <a-col :span="20" class="left">轨迹查询</a-col>
        <a-col :span="4" class="right">
          <div class="pos">
            <a-icon type="environment" />
            <div>查看轨迹</div>
          </div>
          <!-- <a-button type="danger" class="btn" @click="del">批量删除</a-button> -->
        </a-col>
      </a-row>
      <a-table
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
        <a-table-column key="headImage" title="时间" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="时速（km/h）" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="消防员" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="bindStatus" title="消防车编号" data-index="bindStatus" :width="110">
          <template slot-scope="bindStatus">
            <span :style="bindStatus? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{bindStatus ? '已绑定' : '未绑定'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="轨迹描述" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/data';
import PageInfo from '@/utils/page';
import moment from 'moment';

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
      callerMobile: '',
      caller: '',
      selectedRowKeys: [],
      selectedRows: [],
    };
  },
  // 0.待处理/未接警 1.已接警/处理中 2. 处理完毕
  filters: {
    statusFormat: (v) => {
      if (!v) return ''
      if (v === 0) {
        return '待处理';
      } else if (v === 1) {
        return '处理中';
      } else {
        return  '处理完毕';
      }
    },
    msTot(v) {
      if (!v) return 0;
      const tempTime = moment.duration(v);
      const y = tempTime.hours() + '小时' + tempTime.minutes() + '分';
      return y
    },
  },
  mounted() {
    // this.getLabel();
    this.getData();
  },
  methods: {
    handleSubmit() {
      
    },
    info(v) {
      this.$router.push({ name: 'PoliceInfo', query: { id: v.id } });
    },
    del() {
      const params = {
        id: this.selectedRows[0].id,
      };
      console.log(params);
      HTTP.delFirealarms(params)
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
    getData() {
      const { searchInfo, order, sort } = this;
      const params = {
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
      };
      if (searchInfo.inputType && searchInfo.searchInput) {
        params[searchInfo.inputType] = searchInfo.searchInput;
      }
      HTTP.trajectory(params)
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

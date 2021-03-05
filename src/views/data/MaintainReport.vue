<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 11:05:42
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="车辆型号">
              <a-input v-model="model" placeholder="请输入车辆型号" />
            </a-form-model-item>
            <a-form-model-item label="车辆编号">
              <a-input v-model="number" placeholder="请输入车辆编号" />
            </a-form-model-item>
            <a-form-model-item label="点检状态">
              <a-select default-value="0">
                <a-select-option value="0">待上传</a-select-option>
                <a-select-option value="1">合格</a-select-option>
                <a-select-option value="2">不合格</a-select-option>
              </a-select>
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
        <a-col :span="12" class="left">维护报告</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" class="btn green" icon="download" @click="expor">导出</a-button>
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
        <a-table-column key="checkingplanBatchNo" title="点检单批次号" data-index="checkingplanBatchNo" :width="75" align="center">
          <template slot-scope="checkingplanBatchNo">
            <span style="padding-left:20px">{{checkingplanBatchNo}}</span>
          </template>
        </a-table-column>
        <a-table-column key="number" title="车辆型号" data-index="fireengine" :width="75" align="center">
          <template slot-scope="fireengine">
            <span style="padding-left:20px">{{fireengine.vin}}</span>
          </template>
        </a-table-column>
        <a-table-column key="vin" title="车辆编号" data-index="fireengine" :width="75" align="center">
          <template slot-scope="fireengine">
            <span style="padding-left:20px">{{fireengine.number}}</span>
          </template>
        </a-table-column>
        <a-table-column key="image" title="车型照片" data-index="fireengine" :width="75" align="center">
          <template slot-scope="fireengine">
            <img :src="fireengine.image" alt="">
          </template>
        </a-table-column>
        <a-table-column key="username" title="点检人员" data-index="checkingFireman" :width="75" align="center">
          <template slot-scope="checkingFireman">
            <span style="padding-left:20px">{{checkingFireman.username}}</span>
          </template>
        </a-table-column>
        <a-table-column key="status" title="点检状态" data-index="checkingFireman" :width="75" align="center">
          <template slot-scope="checkingFireman">
            <span style="padding-left:20px">{{checkingFireman.status}}</span>
          </template>
        </a-table-column>
        <a-table-column key="checkTime" title="点检时间" data-index="checkTime" :width="75" align="center">
          <template slot-scope="checkTime">
            <span style="padding-left:20px">{{checkTime | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="repair" title="维护结果" data-index="repair" :width="75" align="center">
          <template slot-scope="repair">
            <span style="padding-left:20px">{{repair === 1 ? '无需维护' : '已维护'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="repairTime" title="维护时间" data-index="repairTime" :width="75" align="center">
          <template slot-scope="repairTime">
            <span style="padding-left:20px">{{repairTime | dateFormat}}</span>
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
      number: '',
      model: '',
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
      this.$router.push({ name: 'MaintainReportInfo', query: { id: v.id } });
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
      HTTP.checkingrecord(params)
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

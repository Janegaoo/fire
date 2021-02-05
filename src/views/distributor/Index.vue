<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-11 17:40:18
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-form-model layout="inline" :modal="searchInfo">
        <!-- <a-select placeholder="请选择查询类型" style="margin-right:8px; width: 160px" v-model="searchInfo.inputType">
          <a-select-option value="companyName">分销商名称</a-select-option>
        </a-select> -->
        <a-input
          placeholder="请输入查询内容"
          style="width: 320px; margin-right: 8px"
          v-model="searchInfo.searchInput"
        />
        <a-button type="primary" style="margin-right: 8px" @click="getData()">查询</a-button>
        <a-button type="defult" @click="resetSearch()">重置</a-button>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" :bodyStyle="{padding: '0 0'}">
      <a-row>
        <a-col :span="12" class="left">分销商列表</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" @click="addFn">新增分销商</a-button>
        </a-col>
      </a-row>
      <a-table
      :data-source="companyList"
      :rowKey="(record, index) => index"
      :pagination="pagination"
      class="userTable"
      @change="handleChange">
      <a-table-column key="companyId" title="分销商ID" data-index="companyId" :width="105">
        <template slot-scope="companyId">
          <span style="padding-left:20px">{{companyId}}</span>
        </template>
      </a-table-column>
      <a-table-column key="companyName" title="分销商名称" data-index="companyName" />
      <a-table-column key="usedCount" title="已兑换" sorter="true" data-index="usedCount" :width="100">
        <template slot-scope="usedCount">
          <span>{{usedCount}}个</span>
        </template>
      </a-table-column>
      <a-table-column key="codeQuantity" title="兑换码总数量" sorter="true" data-index="codeQuantity" :width="130">
        <template slot-scope="codeQuantity">
          <span>{{codeQuantity}}个</span>
        </template>
      </a-table-column>
      <a-table-column key="createTime" title="创建时间" data-index="createTime" :width="165">
        <template slot-scope="createTime">
          <span style="color:rgba(153, 160, 170, 1)">{{ createTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="comments" title="备注" data-index="comments" :width="180">
        <template slot-scope="comments">
          <span>{{ comments || '- -' }}</span>
        </template>
      </a-table-column>
      <a-table-column key="action" title="操作"  :width="250">
        <template slot-scope="record">
          <span class="eye-w" @click="infoFn(record)">
            <svg-icon iconName="view" class="eye" />
            <span class="action">详情</span>
          </span>
          <span class="eye-w" @click="editFn(record)" style="margin-left: 32px">
            <svg-icon iconName="edit" class="edit" />
            <span class="action">修改</span>
          </span>
          <span class="delete-w" style="margin-left: 32px" v-if="!record.codeQuantity">
            <a-popconfirm title="确定删除该经销商？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record.companyId)">
              <svg-icon iconName="delete" class="delete" />
              <span class="action">删除</span>
            </a-popconfirm>
          </span>
        </template>
      </a-table-column>
    </a-table>
    </a-card>
    <edit-distributor v-if="showPop" ref="editChild" :companyId="companyId" :companyName="companyName" :comments="comments" @on-confirm="onConfirm" @on-cancel="onCancel"></edit-distributor>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/distributor';
import PageInfo from '@/utils/page';
import EditDistributor from './EditDistributor.vue';

export default {
  name: 'DistributorList',
  props: [],
  components: { EditDistributor },
  data() {
    return {
      searchInfo: {
        inputType: undefined,
        searchInput: '',
      },
      order: '',
      sort: '',
      companyList: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      showPop: false,
      companyId: '',
      companyName: '',
      comments: '',
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const { searchInfo, order, sort } = this;
      const params = {
        page: this.pagination.current,
        rows: this.pagination.pageSize,
        order,
        sort,
      };
      // if (searchInfo.inputType && searchInfo.searchInput) {
      //   params[searchInfo.inputType] = searchInfo.searchInput;
      // }
      if (searchInfo.searchInput) {
        params.companyName = searchInfo.searchInput;
      }
      HTTP.getAllCompany(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.companyList = res.data.rows || [];
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
      this.$router.push({ name: 'DistributorInfo', query: { companyId: data.companyId } });
    },
    editFn(data) {
      this.companyId = data.companyId;
      this.companyName = data.companyName;
      this.comments = data.comments;
      this.showPop = true;
    },
    addFn() {
      this.showPop = true;
    },
    onConfirm() {
      this.onCancel();
      this.getData();
    },
    onCancel() {
      this.showPop = false;
      this.companyName = '';
      this.comments = '';
      this.companyId = '';
    },
    confirmDelete(id) {
      const params = {
        id,
      };
      console.log(params);
      HTTP.delCompanyInfo(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
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
  .left {
    text-align: left;
    color: #001529;
    font-size: 18px;
    padding: 16px 32px
  }
  .right {
    text-align: right;
    padding: 16px 32px
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
  .delete-w {
    cursor: pointer;
    .action {
      color: rgba(72,78,91,1) !important;
    }
  }
}
</style>

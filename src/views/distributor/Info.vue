/* eslint-disable no-unused-vars */
<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-11 17:40:33
 * @Descripttion:
-->

<template>
  <div class="user-info">
    <a-row>
      <a-col :span="12" class="left">分销商详情</a-col>
    </a-row>
    <div class="info-content">
      <div class="info-detail">
        <div>
          <div class="user-name">{{companyInfo.companyName}}<span class="user-id">（ID：{{companyInfo.companyId}}）</span></div>
        </div>
        <div class="user-detail">创建于 {{companyInfo.createTime | dateFormat}}</div>
        <div class="user-detail">备注：{{companyInfo.comments || '- -'}}</div>
      </div>
      <div class="pic-detail">
        <div class="count">{{companyInfo.codeQuantity}}</div>
        <div class="title">兑换码总数</div>
      </div>
      <div class="pic-detail" style="margin-right: 32px">
        <div class="count">{{companyInfo.usedCount}}</div>
        <div class="title">已兑换总数</div>
      </div>
    </div>
    <div>
      <div class="tableTitle">兑换码分配记录</div>
      <code-table :tableData="tableData" pageName="distributor" :pagination="pagination" @getData="getOneCompanyInfo" @pageChange="pageChange" @onShowSizeChange="onShowSizeChange" @handleChange="handleChange"></code-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import AesUtil from '@/utils/aesUtil';
import PageInfo from '@/utils/page';
import HTTP from '@/api/distributor';
import CodeTable from '@/components/CodeTable.vue';

export default {
  name: 'DistributorInfo',
  props: [],
  components: {
    CodeTable,
  },
  data() {
    return {
      tableData: [],
      companyId: +this.$route.query.companyId,
      companyInfo: {
        companyName: 0,
        companyId: 0,
        createTime: '',
        comments: '',
        usedCount: 0,
        codeQuantity: 0,
      },
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      params: {},
      order: '',
      sort: '',
    };
  },
  mounted() {
    this.getOneCompanyInfo();
  },
  methods: {
    getOneCompanyInfo() {
      const {
        pagination, order, sort, companyId,
      } = this;
      const params = {
        page: pagination.current,
        rows: pagination.pageSize,
        order,
        sort,
        companyId,
      };
      HTTP.getOneCompanyInfo(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.records;
            this.companyInfo.companyName = res.data.companyInfo.companyName;
            this.companyInfo.companyId = res.data.companyInfo.companyId;
            this.companyInfo.createTime = res.data.companyInfo.createTime;
            this.companyInfo.comments = res.data.companyInfo.comments;
            this.companyInfo.usedCount = res.data.companyInfo.usedCount;
            this.companyInfo.codeQuantity = res.data.companyInfo.codeQuantity;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    pageChange(current) {
      this.pagination.current = current;
      // 下面再请求分页接口，重新渲染数据
      this.getOneCompanyInfo();
    },
    onShowSizeChange(current, pageSize) {
      // 请求分页接口，重新渲染数据
      this.pagination.current = 1;
      this.pagination.pageSize = pageSize;
      this.getOneCompanyInfo();
    },
    handleChange(sorter) {
      if (sorter.order) {
        this.order = sorter.columnKey;
        this.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      } else {
        this.order = '';
        this.sort = '';
      }
      this.getOneCompanyInfo();
    },
  },
};
</script>
<style lang="scss" scoped>
$darkColor: #001529;
.user-info {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 16px 32px;
  background: #fff;
  .left {
    text-align: left;
    color: $darkColor;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .info-content {
    padding: 24px 0;
    border-bottom: 1px solid rgba(227,229,233,1);
    border-top: 1px solid rgba(227,229,233,1);
    margin-bottom: 12px;
    overflow: hidden;
    .info-detail {
      float: left;
      .user-name {
        color: rgba(0,21,41,1);
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
      }
      .user-id {
        color: rgba(72,78,91,1);
        font-size: 14px;
        font-weight: normal;
        margin-left: 5px;
      }
      .user-detail {
        font-size: 14px;
        color: rgba(72,78,91,1);
        line-height: 24px;
        margin: 4px 0;
      }
    }
    .pic-detail {
      float: right;
      width: 160px;
      height: 80px;
      border-radius: 4px;
      box-shadow: rgba(0,0,0,0.08) 0 4px 8px;
      text-align: center;
      padding-top: 15px;
      .count {
        color: rgba(0,21,41,1);
        font-size: 18px;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .title {
        color: rgba(72,78,91,1);
        font-size: 14px;
      }
    }
  }
  .tableTitle {
      color: rgba(0,21,41,1);
      font-size: 16px;
      margin: 24px 0 16px 0;
    }
  ::v-deep .ant-tabs-bar{
    border-bottom: none;
  }
}
</style>

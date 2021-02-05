<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-11 17:39:41
 * @Descripttion:
-->

<template>
  <div class="code">
    <a-row style="padding: 0 32px">
      <a-col :span="12" class="left">兑换码列表</a-col>
      <a-col :span="12" class="right">
        <a-button type="primary" @click="createCodeFn">生成兑换码</a-button>
      </a-col>
    </a-row>
    <code-table style="margin-top:12px" :tableData="tableData" pageName="code" :pagination="pagination" @getData="getData" @pageChange="pageChange" @onShowSizeChange="onShowSizeChange" @handleChange="handleChange"></code-table>
    <create-code v-if="showPop" :companyList="companyList" @on-confirm="onConfirm" @on-cancel="onCancel"></create-code>
  </div>
</template>

<script>
// @ is an alias to /src
// import AesUtil from '@/utils/aesUtil';
import HTTP from '@/api/code';
import { mapGetters } from 'vuex';
import PageInfo from '@/utils/page';
import CodeTable from '@/components/CodeTable.vue';
import CreateCode from './CreateCode.vue';

export default {
  name: 'Code',
  props: [],
  components: {
    CreateCode,
    CodeTable,
  },
  data() {
    return {
      showPop: false,
      tableData: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      order: '',
      sort: '',
      companyList: [],
      // pagination: {
      // // 默认当前页，每页显示数量，总数
      //   size: 'small',
      //   current: 1,
      //   total: 0,
      //   pageSize: 10,
      //   showSizeChanger: true,
      //   onChange: this.pageChange,
      //   onShowSizeChange: this.onShowSizeChange,
      //   showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
      // },
    };
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
  },
  mounted() {
    this.getData();
    this.getCompanyListForCreateCode();
  },
  methods: {
    getData() {
      const params = {
        userId: this.getUserInfo.id,
        page: this.pagination.current,
        rows: this.pagination.pageSize,
        order: this.order,
        sort: this.sort,
      };
      HTTP.getCreateCodeList(params)
        .then((res) => {
          if (res.data.status === 200) {
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
    getCompanyListForCreateCode() {
      HTTP.getCompanyListForCreateCode({})
        .then((res) => {
          if (res.data.status === 200) {
            this.companyList = res.data.rows;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    // eslint-disable-next-line no-unused-vars
    pageChange(current, pageSize) {
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
    createCodeFn() {
      this.showPop = true;
    },
    onConfirm() {
      this.showPop = false;
      this.getData();
    },
    onCancel() {
      this.showPop = false;
    },
    infoFn(data) {
      this.$router.push({ name: 'CodeInfo', query: { id: data.id, userId: this.getUserInfo.id } });
    },
    handleChange(sorter) {
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
$darkColor: #001529;
$lightColor: #99a0aa;
.code {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 16px 0;
  background: #fff;
  .left {
    text-align: left;
    color: $darkColor;
    font-size: 18px;
  }
  .right {
    text-align: right;
  }
  .action {
    color: #f03947;
    padding-left: 6px;
    font-size: 12px;
    font-style: normal;
  }
  .eye {
    color: #f03947;
    font-size: 14px;
  }
  .date {
    color: $lightColor;
  }
  .ant-table {
    color: #001529;
  }
  .codeTable {
    margin-top: 10px;
  }
  .eye-w {
    cursor: pointer;
  }
}

</style>

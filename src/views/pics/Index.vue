<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-14 18:22:17
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
        <a-select placeholder="请选择查询类型" v-model="formInline.searchType" style="margin-right:8px; width: 160px">
          <a-select-option value="id">作品ID</a-select-option>
          <a-select-option value="userId">用户ID</a-select-option>
          <a-select-option value="colTitle">作品标题</a-select-option>
          <a-select-option value="nickName">用户昵称</a-select-option>
        </a-select>
        <a-input v-model="formInline.searchValue" type="text" placeholder="请输入查询内容" style="width: 320px; margin-right: 8px" />
        <a-button type="primary" style="margin-right: 8px" @click="handleSubmit">查询</a-button>
        <a-button type="defult" @click="resetFn()">重置</a-button>
      </a-form-model>
    </a-card>
    <div class="pic-list">
      <a-row>
        <a-col :span="12" class="left">图集作品</a-col>
      </a-row>
      <pic-table :tableData="tableData" :pagination="pagination" @getData="getData" @pageChange="pageChange" @onShowSizeChange="onShowSizeChange" @handleChange="handleChange"></pic-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/pics';
import PageInfo from '@/utils/page';
import PicTable from '@/components/PicTable.vue';

export default {
  name: 'UserList',
  props: [],
  components: {
    PicTable,
  },
  data() {
    return {
      formInline: {},
      inputType: '',
      searchInput: '',
      tableData: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      params: {},
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
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
        page: this.pagination.current,
        rows: this.pagination.pageSize,
        order: this.params.order,
        sort: this.params.sort,
        id: this.params.id,
        userId: this.params.userId,
        colTitle: this.params.colTitle,
        nickName: this.params.nickName,
      };
      HTTP.getSearchAlbumInfo(params)
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
  }
}
</style>

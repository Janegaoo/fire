<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-25 15:08:37
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row class="top">
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="消防车编号">
              <a-input v-model="name" placeholder="请输入消防车编号" />
            </a-form-model-item>
            <a-form-model-item label="消防车型号">
              <a-input v-model="number" placeholder="请输入消防车型号" />
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
        <a-col :span="12" class="left"></a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" class="btn" icon="plus" @click="add">添加</a-button>
          <a-button type="danger" class="btn" icon="minus" @click="del">删除</a-button>
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
        <a-table-column key="headImage" title="消防车图片" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="消防车型号" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="消防车编号" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="bindStatus" title="消防车描述" data-index="bindStatus" :width="110">
          <template slot-scope="bindStatus">
            <span :style="bindStatus? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{bindStatus ? '已绑定' : '未绑定'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" :width="80">
          <template slot-scope="record">
            <span class="eye-w" @click="infoFn(record)">
              <svg-icon iconName="view" class="eye" />
              <span class="action">查看</span>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// http://dev.fire.njyunzhi.com/api/firestations/firehouses/list
import HTTP from '@/api/station';
import PageInfo from '@/utils/page';


export default {
  name: 'UserList',
  props: [],
  components: {
  },
  data() {
    return {
      id: +this.$route.query.id,
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
      contactMobile: '',
      region: '',
      city: '',
      province: '',
      number: '',
      name: '',
      selectedRowKeys: [],
      selectedRows: [],
      localData: {},
    };
  },
  beforeMount() {
    const v = JSON.parse(localStorage.getItem('stationList'));
    console.log('-----');
    console.log(v);
    this.localData = v;
  },
  mounted() {
    this.getData();
    // const map = new AMap.Map('container', {
    //   zoom: 12,
    // });
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      console.log(selectedRows);
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
    },
    add() {
      // this.showPop = true;
      // localStorage.setItem('stationList', JSON.stringify(v));
      this.$router.push({ name: 'FireInfo', query: { tab: 2, type: 3, id: this.id } });
    },
    del() {
      console.log('del');
      const params = {
        id: this.selectedRows[0].id,
      };
      HTTP.delFirehouses(params)
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
    expor() {
      console.log('export');
    },
    info(v) {
      this.$router.push({
        name: 'FireInfo',
        query: {
          tab: 1, type: 2, id: v.id, fireengineId: v.fireengineId,
        },
      });
    },
    disable() {

    },
    edit(v) {
      console.log(v);
      // localStorage.setItem('stationList', JSON.stringify(v));
      this.$router.push({
        name: 'FireInfo',
        query: {
          tab: 1, type: 2, id: v.id, fireengineId: v.fireengineId,
        },
      });
      // this.$router.push({ name: 'FireInfo', query: { tab: 1, type: 2 } });
    },
    onConfirm() {
      this.showPop = false;
      this.getData();
    },
    onCancel() {
      this.showPop = false;
    },
    handleSubmit() {
      console.log(this.formInline);
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
        id: this.localData.id,
      };
      HTTP.fireengines(params)
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
  .addr {
    font-size: 14px;
    color: #001529;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
    .sbtn {
      margin-left: 4px;
      margin-right: 4px;
    }
    .orange {
      background: rgba(252, 96, 54, 1);
      border: 1px solid rgba(252, 96, 54, 1);
    }
    .red {
      background: rgba(162, 20, 20, 1);
      border: 1px solid rgba(162, 20, 20, 1);
    }
    .green {
      background: green;
      border: 1px solid green;
    }
  }
}
</style>

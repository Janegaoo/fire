<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-05 11:25:07
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
        <a-col :span="22">
          <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item label="站点名称">
              <a-input v-model="name" placeholder="请输入站点名称" />
            </a-form-model-item>
            <a-form-model-item label="联系人">
              <a-input v-model="contactMobile" placeholder="请输入联系人电话" />
            </a-form-model-item>
            <a-form-model-item label="站点编号">
              <a-input v-model="number" placeholder="请输入站点编号" />
            </a-form-model-item>
            <a-form-model-item label="站点地">
              <a-input-group compact>
                <a-select default-value="Option1-1">
                  <a-select-option value="Option1-1">
                    Option1-1
                  </a-select-option>
                  <a-select-option value="Option1-2">
                    Option1-2
                  </a-select-option>
                </a-select>
                <a-select default-value="Option2-2">
                  <a-select-option value="Option2-1">
                    Option2-1
                  </a-select-option>
                  <a-select-option value="Option2-2">
                    Option2-2
                  </a-select-option>
                </a-select>
                <a-select default-value="Option2-2">
                  <a-select-option value="Option2-1">
                    Option2-1
                  </a-select-option>
                  <a-select-option value="Option2-2">
                    Option2-2
                  </a-select-option>
                </a-select>
              </a-input-group>
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
        <a-col :span="12" class="left">站点管理</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" class="btn" icon="plus" @click="add">添加</a-button>
          <a-button type="danger" class="btn" icon="minus" @click="del">删除</a-button>
          <a-button type="primary" class="btn green" icon="download" @click="expor">导出</a-button>
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
            <span>{{id}}</span>
          </template>
        </a-table-column>
        <a-table-column key="number" title="站点编号" data-index="number" align="center">
          <template slot-scope="number">
            <span>{{number}}</span>
          </template>
        </a-table-column>
        <a-table-column key="name" title="站点名称" data-index="name" align="center">
          <template slot-scope="name">
            <span>{{name}}</span>
          </template>
        </a-table-column>
        <a-table-column key="address" title="地址" data-index="address" align="center" :ellipsis=true>
          <template slot-scope="address">
            <a-tooltip placement="top">
              <template slot="title">
                <div class="addr">{{address}}</div>
              </template>
                <div class="addr">{{address}}</div>
            </a-tooltip>
          </template>
        </a-table-column>
        <a-table-column key="contactPerson" title="联系人" data-index="contactPerson" :width="90" align="center">
          <template slot-scope="contactPerson">
            <span>{{contactPerson}}</span>
          </template>
        </a-table-column>
        <a-table-column key="contactMobile" title="联系电话"  :width="120" data-index="contactMobile">
          <template slot-scope="contactMobile">
            <span>{{contactMobile}}</span>
          </template>
        </a-table-column>
        <a-table-column key="fireengineCount" data-index="fireengineCount" title="消防车" :width="80">
          <template slot-scope="fireengineCount">
            <span>{{fireengineCount}}</span>
          </template>
        </a-table-column>
        <a-table-column key="firemanCount" title="消防员"  :width="80" data-index="firemanCount" align="center">
          <template slot-scope="firemanCount">
            <span>{{firemanCount}}</span>
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
    </div>
    <pop v-if="showPop" ref="editChild" :companyId="companyId" :companyName="companyName" :comments="comments" @on-confirm="onConfirm" @on-cancel="onCancel"></pop>
  </div>
</template>

<script>
// @ is an alias to /src
// http://dev.fire.njyunzhi.com/api/firestations/firehouses/list
import HTTP from '@/api/station';
import PageInfo from '@/utils/page';
import Pop from './componets/Pop.vue';


export default {
  name: 'UserList',
  props: [],
  components: {
    Pop,
  },
  data() {
    return {
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
    };
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
      this.showPop = true;
    },
    del() {
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
      this.$router.push({ name: 'StationInfo', query: { tab: 1, type: 2, id: v.id } });
    },
    disable() {

    },
    edit(v) {
      console.log(v);
      // localStorage.setItem('stationList', JSON.stringify(v));
      this.$router.push({ name: 'StationInfo', query: { tab: 1, type: 2, id: v.id } });
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
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        order: this.params.order,
        // sort: 'ASC',
        name: this.name,
        address: this.address,
        contactPerson: this.contactPerson,
        contactMobile: this.contactMobile,
        // longitude: this.longitude,
        // latitude: this.latitude,
      };
      HTTP.firehouses(params)
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
  }
}
</style>

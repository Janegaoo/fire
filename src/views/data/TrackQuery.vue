<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 14:20:05
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
    <pop v-if="showPop" ref="editChild" :companyId="companyId" :companyName="companyName" :comments="comments" @on-confirm="onConfirm" @on-cancel="onCancel"></pop>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/pics';
import PageInfo from '@/utils/page';
import moment from 'moment';
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    },

    disabledRangeTime(_, type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      };
    },
    add() {
      this.showPop = true;
    },
    del() {
      console.log('del');
    },
    expor() {
      console.log('export');
    },
    info() {
      console.log('info');
      this.$router.push({ name: 'StationInfo', query: {} });
    },
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
  .tit {
    padding-right: 20px;
    display: inline-block;
  }
  .pos {
    text-align: center;
    div {
      font-size: 12px;
    }
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
    .green {
      background: green;
      border: 1px solid green;
    }
  }
}
</style>

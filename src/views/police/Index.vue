<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-09 11:38:39
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <!-- <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
        <a-select placeholder="请选择查询类型" v-model="formInline.searchType" style="margin-right:8px; width: 160px">
          <a-select-option value="id">作品ID</a-select-option>
          <a-select-option value="userId">用户ID</a-select-option>
          <a-select-option value="colTitle">作品标题</a-select-option>
          <a-select-option value="nickName">用户昵称</a-select-option>
        </a-select>
        <a-input v-model="formInline.searchValue" type="text" placeholder="请输入查询内容" style="width: 320px; margin-right: 8px" />
        <a-button type="primary" style="margin-right: 8px" @click="handleSubmit">查询</a-button>
        <a-button type="defult" @click="resetFn()">重置</a-button>
      </a-form-model> -->
      <a-row>
        <a-col :span="22">
          <span class="tit">报警时</span>
          <a-range-picker
            :disabled-date="disabledDate"
            :disabled-time="disabledRangeTime"
            :show-time="{
              hideDisabledOptions: true,
              defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
            }"
            format="YYYY-MM-DD HH:mm:ss"
          />
        </a-col>
        <a-col :span="2">
          <a-button type="primary" class="blueBtn">
            搜索
          </a-button>
        </a-col>
      </a-row>
    </a-card>
    <div class="pic-list">
      <a-row>
        <a-col :span="12" class="left">图集作品</a-col>
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
        <a-table-column key="headImage" title="火警编号" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="火警状态" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="报警时间" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="bindStatus" title="报警人" data-index="bindStatus" :width="110">
          <template slot-scope="bindStatus">
            <span :style="bindStatus? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{bindStatus ? '已绑定' : '未绑定'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="packageName" title="报警人手机号" data-index="packageName" :width="110">
          <template slot-scope="packageName">
            <span :style="packageName? 'color:rgba(0,21,41,1)' : 'color: rgba(153,160,170,1)'">{{packageName || '免费用户'}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="操作时间" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage | dateFormat}}</span>
          </template>
        </a-table-column>
        <a-table-column key="albumCount" title="备注" data-index="albumCount" :width="110">
          <template slot-scope="albumCount">
            <span>{{albumCount}}</span>
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
import HTTP from '@/api/pics';
import PageInfo from '@/utils/page';
import moment from 'moment';

export default {
  name: 'UserList',
  props: [],
  components: {
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

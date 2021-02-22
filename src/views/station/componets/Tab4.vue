<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 10:46:47
 * @Descripttion:
-->
<template>
  <div class="main">
    <div class="pic-list">
      <a-row>
        <a-col :span="12" class="left">排班计划</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" class="btn" icon="plus" @click="add">保存</a-button>
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
        <a-table-column key="headImage" title="消防车编号" data-index="headImage" :width="75" align="center">
          <template slot-scope="headImage">
            <span style="padding-left:20px">{{headImage}}</span>
          </template>
        </a-table-column>
        <a-table-column key="headImage" title="图片" data-index="headImage" :width="75" align="center">
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
    <pop v-if="showPop" ref="editChild" :companyId="companyId" :companyName="companyName" :comments="comments" @on-confirm="onConfirm" @on-cancel="onCancel"></pop>
  </div>
</template>
<script>
import HTTP from '@/api/distributor';

export default {
  props: [
    'companyName',
    'comments',
    'companyId',
  ],
  data() {
    return {
      visible: true,
      confirmLoading: false,
      form: {
        companyName: '',
        comments: '',
      },
      rules: {
        companyName: [{
          required: true, message: '请输入分销商名称', trigger: 'blur', whitespace: true,
        }],
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  },
  watch: {
    form: {
      handler(n) {
        if (n.companyName || n.comments) {
          this.confirmLoading = false;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.form = {
      companyName: this.companyName,
      comments: this.comments,
      companyId: this.companyId,
    };
  },
  methods: {
    pos() {
      console.log('pos');
    },
    handleSubmit() {
      
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
  .top {
    border-bottom: 1px solid #eee;
    padding-bottom: 28px;
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
      // padding-top: 16px;
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

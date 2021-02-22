<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 09:55:08
 * @Descripttion:
-->
<template>
  <div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="站点名称" prop="companyName" placeholder="请输入站点名称">
        <a-input v-model="form.companyName" />
      </a-form-model-item>
      <a-form-model-item label="地理位置" prop="companyName" placeholder="请输入地理位置">
        <a-input v-model="form.companyName" />
      </a-form-model-item>
      <a-form-model-item label="联系人姓名" prop="companyName" placeholder="请输入联系人姓名">
        <a-input v-model="form.companyName" />
      </a-form-model-item>
      <a-form-model-item label="联系人电话" prop="companyName" placeholder="请输入联系人电话">
        <a-input v-model="form.companyName" />
      </a-form-model-item>
      <a-form-model-item label="经纬度" prop="companyName" placeholder="请输入经纬度">
        <a-input v-model="form.companyName">
        <a-icon slot="suffix" type="environment"
        style="color: rgba(0,0,0,.45)"
        @click="pos"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="站点地址" prop="companyName" placeholder="请输入站点地址">
        <a-input v-model="form.companyName" />
      </a-form-model-item>
      <a-form-model-item label="消防车">
        <span class="decoration">6台</span>
      </a-form-model-item>
      <a-form-model-item label="消防员数量">
        <span class="decoration">6人</span>
      </a-form-model-item>
      <a-form-model-item label="用户数量">
        <span class="decoration">58人</span>
      </a-form-model-item>
    </a-form-model>
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
  },
};
</script>
<style lang="scss" scoped>
.ant-input,
.ant-input-affix-wrapper {
  width: 70%;
}
.decoration {
  text-decoration: underline;
}
</style>

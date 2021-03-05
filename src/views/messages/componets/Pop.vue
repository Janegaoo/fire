<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-22 09:51:50
 * @Descripttion:
-->
<template>
  <div>
    <a-modal
      :title="companyId ? '新增站点' : '编辑站点'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
      okType="primary"
      ok-text="确定"
      cancel-text="取消"
      dialogClass="edit-distributor-dialog"
    >
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
        <a-form-model-item label="站点地址" prop="companyName" placeholder="请输入站点地址">
          <a-input v-model="form.companyName" />
        </a-form-model-item>
        <a-form-model-item label="站点联系人" prop="companyName" placeholder="请输入站点联系人名称">
          <a-input v-model="form.companyName" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="companyName" placeholder="请输入联系人电话">
          <a-input v-model="form.companyName" />
        </a-form-model-item>
        <!-- <a-form-model-item label="备注" prop="comments" placeholder="请输入备注信息">
          <a-input v-model="form.comments" type="textarea" />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
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
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (!this.form.companyId) {
            const params = {
              companyName: this.form.companyName,
              comments: this.form.comments,
            };
            HTTP.createCompanyInfo(params)
              .then((res) => {
                this.confirmLoading = false;
                if (res.data.status === 200) {
                  this.$message.success(res.data.message);
                  this.visible = false;
                  this.$emit('on-confirm');
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch((res) => {
                this.confirmLoading = false;
                this.$message.error(res.message);
              });
          } else {
            const params = {
              companyName: this.form.companyName,
              comments: this.form.comments,
              id: this.form.companyId,
            };
            HTTP.updateCompanyInfo(params)
              .then((res) => {
                this.confirmLoading = false;
                if (res.data.status === 200) {
                  this.$message.success(res.data.message);
                  this.visible = false;
                  this.$emit('on-confirm');
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch((res) => {
                this.confirmLoading = false;
                this.$message.error(res.message);
              });
          }
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.$emit('on-cancel');
    },
  },
};
</script>

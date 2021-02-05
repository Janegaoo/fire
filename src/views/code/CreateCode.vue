<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-06 10:28:46
 * @Descripttion:
-->
<template>
  <div>
    <a-modal
      title="生成兑换码"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okType="primary"
      ok-text="确定"
      cancel-text="取消"
      dialogClass="create-code-dialog"
      :maskClosable="false"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="分销商" prop="companyId">
          <a-select v-model="form.companyId" placeholder="请选择分销商">
            <a-select-option v-for="item in companyList" :key="item.companyId" :value='item.companyId'>{{item.companyName}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="会员类型" prop="packageId">
          <a-select v-model="form.packageId" placeholder="请选择类型">
            <a-select-option value=2>红V会员</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="兑换码类型" prop="validType">
          <a-select v-model="form.validType" placeholder="请选择兑换码类型">
            <a-select-option value='0'>固定期限</a-select-option>
            <a-select-option value='1'>指定期限</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="有效期" prop="validValue" v-if="form.validType === '0'">
          <a-select v-model="form.validValue" placeholder="请选择有效期">
            <a-select-option v-for="item in 12" :value="item" :key="item">{{item}}月</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="有效期" prop="fixedExpireDate" v-if="form.validType === '1'">
          <a-date-picker style="width: 100%" placeholder="请选择有效期" type="date" :disabled-date="disabledDate" v-model="form.fixedExpireDate" :showToday="false" />
        </a-form-model-item>
        <a-form-model-item label="数量" prop="codeQuantity">
          <a-input-number style="width: 100%" v-model="form.codeQuantity" placeholder="请输入兑换码数量" :min="1" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="comments">
          <a-input v-model="form.comments" type="textarea" placeholder="请输入备注信息" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import HTTP from '@/api/code';
import moment from 'moment';

export default {
  props: [
    'companyList',
  ],
  data() {
    return {
      visible: true,
      confirmLoading: false,
      form: {
        companyId: undefined,
        packageId: undefined,
        validType: '0',
        validValue: undefined,
        validValueType: 0,
        fixedExpireDate: undefined,
        codeQuantity: undefined,
        comments: '',
      },
      rules: {
        companyId: [{ required: true, message: '请选择分销商', trigger: 'blur' }],
        packageId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        validType: [{ required: true, message: '请选择兑换码类型', trigger: 'blur' }],
        validValue: [{ required: true, message: '请选择有效期', trigger: 'blur' }],
        fixedExpireDate: [{ required: true, message: '请选择有效期', trigger: 'change' }],
        codeQuantity: [{ required: true, message: '请输入兑换码数量', trigger: 'blur' }],
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      dateFormat: 'YYYY-MM-DD',
    };
  },
  watch: {
    form: {
      handler(n) {
        if (n.codeQuantity || n.packageId || n.validDate || n.comments) {
          this.confirmLoading = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today
      return current && current < moment().startOf('day');
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.confirmLoading = true;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = {
            createUser: 1,
            packageId: +this.form.packageId,
            companyId: +this.form.companyId,
            codeType: 1,
            codeQuantity: +this.form.codeQuantity,
            comments: this.form.comments,
            validType: +this.form.validType,
          };
          if (this.form.validType === '0') {
            // 固定期限
            params.validValue = +this.form.validValue;
            params.validValueType = 0;
          } else {
            params.fixedExpireDate = moment(this.form.fixedExpireDate).format();
          }
          HTTP.generateCodeList(params)
            .then((res) => {
              if (res.data.status === 200) {
                this.visible = false;
                this.confirmLoading = false;
                this.$emit('on-confirm');
              } else {
                this.visible = false;
                this.confirmLoading = false;
                this.$emit('on-cancel');
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {
              this.visible = false;
              this.confirmLoading = false;
              this.$emit('on-cancel');
              this.$message.error('请求失败！');
            });
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

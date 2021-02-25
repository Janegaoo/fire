<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-24 10:32:01
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
        <a-form-model-item label="站点名称" prop="name" placeholder="请输入站点名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="站点编号" prop="number" placeholder="请输入站点编号">
          <a-input v-model="form.number" />
        </a-form-model-item>
        <a-form-model-item label="站点地址" prop="address" placeholder="请输入站点地址">
          <a-input v-model="form.address" />
        </a-form-model-item>
        <a-form-model-item label="站点联系人" prop="contactPerson" placeholder="请输入站点联系人名称">
          <a-input v-model="form.contactPerson" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactMobile" placeholder="请输入联系人电话">
          <a-input v-model="form.contactMobile" />
        </a-form-model-item>
        <a-form-model-item label="经纬度" prop="itude" placeholder="点击选择地理位置">
          <a-input v-model="form.itude" readOnly>
            <a-icon @click="posFn" slot="suffix" type="environment" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </a-form-model-item>
        <!-- <a-form-model-item label="备注" prop="comments" placeholder="请输入备注信息">
          <a-input v-model="form.comments" type="textarea" />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      width="800"
      :closable="false"
      :visible="showMap"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <div id="l-container" style="width: 800px; height: 800px;"></div>
    </a-drawer>
  </div>
</template>
<script>
import HTTP from '@/api/station';

export default {
  props: [
    'companyName',
    'comments',
    'companyId',
  ],
  components: {
  },
  data() {
    return {
      visible: true,
      showMap: false,
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
    posFn() {
      this.showMap = true;
    },
    afterVisibleChange(val) {
      console.log('visible', val);
      const map = new AMap.Map('l-container', {
        zoom: 12,
      });
      map.on('click', (e) => {
        this.form.itude = `${e.lnglat.getLng()},${e.lnglat.getLat()}`;
        this.form.longitude = e.lnglat.getLng();
        this.form.latitude = e.lnglat.getLat();
        this.showMap = false;
      });
    },
    onClose() {
      this.showMap = false;
    },
    // onConfirm() {
    //   this.showMap = false;
    // },
    // onCancel() {
    //   this.showMap = false;
    // },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          if (!this.form.companyId) {
            const params = {
              name: this.form.name,
              address: this.form.address,
              contactPerson: this.form.contactPerson,
              contactMobile: this.form.contactMobile,
              longitude: this.form.longitude,
              latitude: this.form.latitude,
              number: this.form.number,
            };
            HTTP.addFirehouses(params)
              .then((res) => {
                this.confirmLoading = false;
                if (res.status === 200) {
                  this.$message.success(res.data.message);
                  this.visible = false;
                  this.$emit('on-confirm');
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch((res) => {
                this.confirmLoading = false;
                this.$message.error(res.message);
              });
          } else {
            const params = {
              name: this.form.name,
              address: this.form.address,
              contactPerson: this.form.contactPerson,
              contactMobile: this.form.contactMobile,
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

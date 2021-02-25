<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-25 10:58:25
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
      <a-form-model-item label="站点名称" prop="name" placeholder="请输入站点名称">
        <a-input v-model="form.name" :disabled="type === 1" />
      </a-form-model-item>
      <a-form-model-item label="站点编号" prop="number" placeholder="请输入站点编号">
        <a-input v-model="form.number" :disabled="type === 1" />
      </a-form-model-item>
      <a-form-model-item label="地理位置" prop="address" placeholder="请输入地理位置">
        <a-input v-model="form.address" :disabled="type === 1" />
      </a-form-model-item>
      <a-form-model-item label="联系人姓名" prop="contactPerson" placeholder="请输入联系人姓名">
        <a-input v-model="form.contactPerson" :disabled="type === 1" />
      </a-form-model-item>
      <a-form-model-item label="联系人电话" prop="contactMobile" placeholder="请输入联系人电话">
        <a-input v-model="form.contactMobile" :disabled="type === 1" />
      </a-form-model-item>
      <a-form-model-item label="经纬度" prop="itude" placeholder="点击选择地理位置">
        <a-input v-model="form.itude" readOnly  :disabled="type === 1">
          <a-icon @click="posFn" slot="suffix" type="environment" style="color: rgba(0,0,0,.45)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="消防车">
        <span class="decoration">{{ this.form.fireengineCount }}台</span>
      </a-form-model-item>
      <a-form-model-item label="消防员数量">
        <span class="decoration">{{ this.form.firemanCount }}人</span>
      </a-form-model-item>
      <a-form-model-item label="用户数量">
        <span class="decoration">{{  }}人</span>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
        <a-button @click="back()">取消</a-button>
        <a-button type="primary" style="margin-left: 40px;" @click="onSubmit" :disabled="type === 1">保存</a-button>
      </a-form-model-item>
    </a-form-model>
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
  data() {
    return {
      showMap: false,
      visible: true,
      confirmLoading: false,
      type: +this.$route.query.type,
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
  beforeMount() {
    const v = JSON.parse(localStorage.getItem('stationList'));
    Object.keys(v).forEach((key) => {
      this.form[key] = v[key];
    });
    this.form.itude = `${this.form.longitude},${this.form.latitude}`;
  },
  mounted() {

  },
  methods: {
    posFn() {
      if (this.type !== 1) {
        this.showMap = true;
      }
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
    back() {
      this.$router.go(-1);
    },
    onSubmit() {
      console.log(1111);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          const params = {
            id: this.form.id,
            name: this.form.name,
            address: this.form.address,
            contactPerson: this.form.contactPerson,
            contactMobile: this.form.contactMobile,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            number: this.form.number,
          };
          HTTP.updateFirehouses(params)
            .then((res) => {
              this.confirmLoading = false;
              if (res.status === 200) {
                this.$message.success(res.data.message);
                this.$router.push({ name: 'FireStationInfo' });
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((res) => {
              this.confirmLoading = false;
              this.$message.error(res.message);
            });
        }
      });
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

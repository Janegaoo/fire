<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-26 10:41:48
 * @Descripttion:
-->
<template>
<div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
      </a-row>
    </a-card>
    <div class="pic-list">
      <a-row>
        <a-col :span="12" class="left">消防车详情</a-col>
        <a-col :span="12" class="right">
        </a-col>
      </a-row>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="站组名称" prop="name" placeholder="请输入站组名称">
          <a-input v-model="form.name" :disabled="type !== 1" />
        </a-form-model-item>
        <a-form-model-item label="地址" prop="address" placeholder="请输入地址">
          <a-input v-model="form.address" :disabled="type !== 1" />
        </a-form-model-item>
        <a-form-model-item label="联系人" prop="contactPerson" placeholder="请输入联系人">
          <a-input v-model="form.contactPerson" :disabled="type !== 1" />
        </a-form-model-item>
        <a-form-model-item label="联系电话" prop="contactMobile" placeholder="请输入联系电话">
          <a-input v-model="form.contactMobile" :disabled="type !== 1" />
        </a-form-model-item>
        <a-form-model-item label="站点" prop="firehouses" placeholder="请输入站点">
          <a-textarea v-model="form.firehouses" :disabled="type !== 1" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button @click="back()">取消</a-button>
          <a-button type="primary" style="margin-left: 40px;" @click="onSubmit" :disabled="type !== 1">保存</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
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
      id: +this.$route.query.id,
      fireengineId: this.$route.query.fireengineId,
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
    // const v = JSON.parse(localStorage.getItem('stationList'));
    // Object.keys(v).forEach((key) => {
    //   this.form[key] = v[key];
    // });
    // this.form.itude = `${this.form.longitude},${this.form.latitude}`;
  },
  mounted() {
    if (this.type !== 3) {
      this.getInfo();
    }
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          const params = {
            id: this.id,
            image: this.form.image,
            number: this.form.number,
            vin: this.form.vin,
            licensePlateNumber: this.form.licensePlateNumber,
            description: this.form.description,
          };
          HTTP.addFirestations(params)
            .then((res) => {
              this.confirmLoading = false;
              if (res.status === 200) {
                this.$message.success(res.data.message);
                this.$router.push({ name: 'StationGroup' });
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
    getInfo() {
      const params = {
        id: this.id,
        fireengineId: this.fireengineId,
      };
      HTTP.infoFirehouses(params)
        .then((res) => {
          if (res.status === 200) {
            // Object.keys(v).forEach((key) => {
            //   this.form[key] = v[key];
            // });
            this.form = res.data;
            this.form.itude = `${this.form.longitude},${this.form.latitude}`;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((res) => {
          this.confirmLoading = false;
          this.$message.error(res.message);
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

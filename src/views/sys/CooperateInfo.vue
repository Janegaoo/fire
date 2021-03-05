<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-04 11:25:54
 * @Descripttion:
-->
<template>
<div class="main">
    <!-- <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <a-row>
      </a-row>
    </a-card> -->
    <div class="pic-list">
      <a-row>
        <a-col :span="12" class="left">协作详情</a-col>
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
        <a-form-model-item label="站点登陆账号" prop="loginName" placeholder="请输入站点登陆账号">
          <a-input-search v-model="form.firehouse.loginName" @search="onSearch" />
        </a-form-model-item>
        <a-form-model-item label="消防站名称" prop="name" placeholder="请输入地址">
          <a-input v-model="form.firehouse.name" readOnly />
        </a-form-model-item>
        <a-form-model-item label="协作站点登陆账号" placeholder="请输入协作站点登陆账号">
          <a-input-search v-model="form.cooperateFirehouse.loginName" @search="onSearch2" />
        </a-form-model-item> 
        <a-form-model-item label="协作消防站名称" prop="attached" placeholder="请输入协作消防站名称">
          <a-input v-model="form.cooperateFirehouse.name" readOnly />
        </a-form-model-item>
        <a-form-model-item label="协作站点联系人" prop="contactMobile" placeholder="请输入联系电话">
          <a-input class="code-input" v-model="form.cooperateFirehouse.contactMobile" readOnly />
          <a-button class="code-btn" @click="getCode">{{ SendCode_text }}</a-button>
        </a-form-model-item>
        <a-form-model-item label="协作站点验证码" prop="smsCode" placeholder="请输入验证码">
          <a-input v-model="form.smsCode" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button @click="back()">取消</a-button>
          <a-button type="primary" style="margin-left: 40px;" @click="onSubmit" :disabled="type === 2">保存</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import HTTP from '@/api/sys';
import HTTPs from '@/api/station';
import HTTP_Login from '@/api/login';

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
        role: {},
        cooperateFirehouse: {},
        firehouse: {},
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
      SendCode_text: '获取验证码',
      time_count: 60,
      timer: null,
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
    if (this.type !== 1) {
      this.getInfo();
    }
  },
  methods: {
    getCode() {
      if (!this.timer && this.form.cooperateFirehouse.contactMobile) {
        this.timer = setInterval(() => {
            if (this.time_count > 0) {
                this.time_count--
                this.SendCode_text = '重新发送' + this.time_count + 's'
            } else {
                this.SendCode_text = '获取验证码'
                clearInterval(this.timer)
                this.timer = null
                this.time_count = 60
            }
        }, 1000);
        this.sms()
      }
    },
    async sms() {
      const params = {
        mobile: this.form.cooperateFirehouse.contactMobile
      };
      HTTP_Login.sms(params)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    onSearch(value) {
      this.firehouses(1,value);
    },
    onSearch2(value) {
      this.firehouses(2, value);
    },
    async firehouses(type, v) {
      const params = {
        pageNo: 1,
        pageSize: 100,
        loginName: v,
      };
      const res = await HTTPs.firehouses(params);
      const data = res.data.data[0];
      console.log(data);
      if (type === 1) {
        // this.form.firehouse = data;
        this.form = Object.assign(this.form, {firehouse: data})
      } else {
        // this.form.cooperateFirehouse = data;
        this.form = Object.assign(this.form, {cooperateFirehouse: data})
      }
      console.log(this.form);
      this.form = Object.assign({},this.form)
      console.log(res);
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
          if (this.type === 1) {
            const params = {
              // id: this.id,
              cooperateFirehouse: this.form.cooperateFirehouse,
              firehouse: this.form.firehouse,
              smsCode: this.form.smsCode,
            };
            console.log(params);
            HTTP.addCooperate(params)
              .then((res) => {
                this.confirmLoading = false;
                if (res.status === 200) {
                  this.$message.success(res.data.message);
                  this.$router.push({ name: 'UserManage' });
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch((res) => {
                this.confirmLoading = false;
                this.$message.error(res.message);
              });
          } else {//
            const params = {
              id: this.id,
              cooperateFirehouse: this.form.cooperateFirehouse,
              firehouse: this.form.firehouse,
              smsCode: this.form.smsCode,
            };
            console.log(params);
            HTTP.updateCooperate(params)
              .then((res) => {
                this.confirmLoading = false;
                if (res.status === 200) {
                  this.$message.success(res.data.message);
                  this.$router.push({ name: 'UserManage' });
                } else {
                  this.$message.error(res.message);
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
    getInfo() {
      const params = {
        id: this.id,
        fireengineId: this.fireengineId,
      };
      HTTP.infoCooperate(params)
        .then((res) => {
          if (res.status === 200) {
            // Object.keys(v).forEach((key) => {
            //   this.form[key] = v[key];
            // });
            this.form = res.data;
            console.log('----');
            console.log(this.form);
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
.ant-input-affix-wrapper,
.ant-select {
  width: 70%;
}
.code-input {
  width: 46%;
}
.code-btn {
  // margin-left: 4px;
  width: 24%;
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

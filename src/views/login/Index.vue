<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 09:56:38
 * @Descripttion:
-->

<template>
  <div class="main">
    <div class="container">
      <div class="login-img">
        <div class="login-logo"></div>
      </div>
      <div class="login-form">
        <div class="login-title">Hello</div>
        <div class="login-sub-title">欢迎登录小红屋管理系统</div>
        <div style="position: relative">
          <div class="form-content">
            <a-form :form="form" class="user-form">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'account',
                    { rules: [{ required: true, message: '请输入用户名' }] },
                  ]"
                  placeholder="请输入用户名"
                  class="login-input"
                >
                <a-icon slot="prefix" type="user" class="icon-input" />
                </a-input>
                <!-- <a-input v-model="form.account" placeholder="请输入用户名" prefix-icon="el-icon-user"></a-input> -->
              </a-form-item>
              <a-form-item>
                <a-input
                  v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入密码' }] },
                  ]"
                  type="password"
                  placeholder="请输入密码"
                  class="login-input"
                  @pressEnter="submitFn"
                >
                <a-icon slot="prefix" type="lock" class="icon-input" />
                </a-input>
                <!-- <a-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  show-password
                  prefix-icon="el-icon-unlock"
                ></a-input> -->
              </a-form-item>
            </a-form>
          </div>
          <a-button type="primary" class="form-submit" @click="submitFn">登录</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import AesUtil from '@/utils/aesUtil';
import md5 from 'js-md5';
import HTTP from '@/api/login';
import db from '@/mock/db.json';

export default {
  name: 'Login',
  props: [],
  data() {
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
      formRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          // { required: true, validator: validateServiceName, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
      errorMsg: '',
    };
  },
  mounted() {
    // console.log(121212);
  },
  methods: {
    submitFn() {
      this.form.validateFields((err, values) => {
        if (!err) {
          // const AesPwd = AesUtil.Encrypt(values.password, 1);
          const params = {
            loginName: values.account,
            password: md5(values.password),
          };
          // zhangeryue 123456
          HTTP.login(params)
            .then((res) => {
              if (res.status === 200) {
                this.routes();
                console.log(res.data);
                this.$store.dispatch('getUserInfo', res.data);
                this.me();
                // this.$store.dispatch('getUserInfo', {});
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(() => {
              this.$message.error('请求失败！');
            });
        }
      });
    },
    async me() {
      const res = await HTTP.me();
      console.log(res);
    },
    async routes() {
      // const res = await HTTP.routes();
      const res = {};
      res.data = db;
      console.log(res);
      this.$store.dispatch('getMenus', res.data.routes);
      this.$store.dispatch('getButtons', res.data.userButtons);
      this.$store.commit('setActiveMenu', { actKey: [0], id: res.data.routes[0].id });
      this.$router.push({ path: res.data.routes[0].path });
      // console.log(res);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: #001529;
  position: relative;

  .icon-input {
    color:rgba(0,0,0,.65);
    font-size: 18px;
  }

  .container {
    width: 1040px;
    height: 480px;
    position: absolute;
    top: 50%;
    margin-top: -240px;
    left: 50%;
    margin-left: -520px;
    background-color: #fff;
    overflow: hidden;
    .login-img {
      width: 640px;
      height: 480px;
      position: relative;
      background: url(~@/assets/icons/png/loginImg.png) no-repeat;
      background-size: 100% 100%;
      float: left;
      .login-logo {
        width: 240px;
        height: 240px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -120px;
        margin-left: -120px;
        background: url(~@/assets/icons/png/loginlogo.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .login-form {
      width: 400px;
      height: 480px;
      background-color: rgba(37, 56, 74, 1);
      float: right;
      padding: 100px 80px 0 80px;
      box-sizing: border-box;

      .login-title {
        font-size: 32px;
        color: #fff;
        font-weight: bold;
      }
      .login-sub-title {
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
      }
      .error-msg {
        position: absolute;
        color: rgba(240, 57, 71, 1);
        font-size: 14px;
        top: -25px;
      }
      .a-input {
        input {
          border: none;
          font-size: 14px;
          padding-left: 38px;
          background-color: transparent;
        }
      }
      .form-content {
        width: 100%;
        // height: 40px;
        // background-color: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        .form-user {
          background: url(~@/assets/icons/png/username.png) no-repeat 10px 10px;
          background-size: 18px 18px;
        }
        .form-password {
          background: url(~@/assets/icons/png/password.png) no-repeat 10px 10px;
          background-size: 18px 18px;
        }
      }
      .form-submit {
        width: 100%;
        height: 40px;
        background-color: rgba(240, 57, 71, 1);
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>
<style lang="scss">
  .login-input {
    input {
      border: none;
      font-size: 14px;
      padding-left: 38px!important;
      height: 40px!important;
      background-color: #fff!important;
    }
  }
</style>

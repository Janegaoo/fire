<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-03 09:48:18
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
        <a-form-model-item label="站点登陆账号" prop="username" placeholder="请输入站点登陆账号">
          <a-input v-model="form.username" :disabled="type === 1">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item label="消防站名称" prop="mobile" placeholder="请输入地址">
          <a-input v-model="form.mobile" :disabled="type === 1" />
        </a-form-model-item>
        <a-form-model-item label="协作站点登陆账号">
          <!-- 1.超级管理员 2.消防站组管理员 3.消防站点管理员 4.消防员 -->
          <a-select placeholder="请选择角色" v-model="form.role.id" @change="roleSelect">
            <a-select-option v-for="(item, i) in roles" :value="item.id" :key="i">{{ item.roleName }}</a-select-option>
          </a-select>
        </a-form-model-item> 
        <a-form-model-item label="协作消防站名称" prop="attached" placeholder="请输入联系人">
          <a-select placeholder="请选择角色" v-model="form.attached.id"  @change="attSelect">
              <a-select-option v-for="(item, i) in form.attacheds" :key="i" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="协作站点联系人" prop="loginName" placeholder="请输入联系电话">
          <a-input class="code-input" v-model="form.loginName" :disabled="type === 1" />
          <a-button class="code-btn">获取验证码</a-button>
        </a-form-model-item>
        <a-form-model-item label="协作站点验证码" prop="loginName" placeholder="请输入联系电话">
          <a-input v-model="form.loginName" :disabled="type === 1" />
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
        attached: {},
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
    //  1.超级管理员 2.消防站组管理员 3.消防站点管理员 4.消防员 
      roles: [
        {id: 1, roleName: '超级管理员'},
        {id: 2, roleName: '消防站组管理员'},
        {id: 3, roleName: '消防站点管理员'},
        {id: 4, roleName: '消防员'},
      ],
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
    attSelect(v, i) {
      console.log('[[[[[');
      console.log(v, i);
      for (let i = 0; i < this.form.attacheds.length; i = i + 1) {
        if (v === this.form.attacheds[i].id) {
          this.form.attached = this.form.attacheds[i];
        }
      }
    },
    roleSelect(v, i) {
      console.log(v, i);
      //  1.超级管理员 2.消防站组管理员 3.消防站点管理员 4.消防员
      for (let i = 0; i < this.roles.length; i = i + 1) {
        if (v === this.roles[i].id) {
          this.form.role = this.roles[i];
        }
      }
      this.attc(v);
    },
    attc(v) {
      if (v === 2) {
        this.firestations();
      } else if (v === 1) {
        this.form.attacheds = null;
      } else {
         this.firehouses();
      }
    },
    async firehouses() {
      const params = {
        pageNo: 1,
        pageSize: 100,
      };
      const res = await HTTPs.firehouses(params);
      this.form.attacheds = res.data.data;
      console.log(res);
    },
    async firestations() {
      const params = {
        pageNo: 1,
        pageSize: 100,
      };
      const res = await HTTPs.firestations(params);
      this.form.attacheds = res.data.data;
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
          if (this.type === 3) {
            const params = {
              // id: this.id,
              loginName: this.form.loginName,
              mobile: this.form.mobile,
              username: this.form.username,
              attached: this.form.attached,
              role: this.form.role,
            };
            console.log(params);
            HTTP.addUsers(params)
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
              loginName: this.form.loginName,
              mobile: this.form.mobile,
              username: this.form.username,
              attached: this.form.attached,
              role: this.form.role,
            };
            console.log(params);
            HTTP.updateUsers(params)
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
      HTTP.infoUsers(params)
        .then((res) => {
          if (res.status === 200) {
            // Object.keys(v).forEach((key) => {
            //   this.form[key] = v[key];
            // });
            this.form = res.data;
            console.log('----');
            console.log(this.form);
            this.attc(+this.form.role.id);
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

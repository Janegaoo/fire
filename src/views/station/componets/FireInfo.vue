<!--
 * @Author: Jane
 * @Date: 2020-06-15 15:35:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-25 15:14:37
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
        <a-form-model-item label="图片" prop="vin" placeholder="请输入站点名称">
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleChange"
            accept=".bmp,.jpg,.png,.jpeg,.tif"
          >
            <img v-if="imageUrl" :src="imageUrl" class="head-img" alt="avatar" />
            <div v-else>
              <a-icon type="plus" style="color: #1890ff;" />
              <div class="ant-upload-text">请选择图片</div>
            </div>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="消防车型号" prop="vin" placeholder="请输入站点名称">
          <a-input v-model="form.vin" :disabled="type === 1" />
        </a-form-model-item>
        <a-form-model-item label="消防车编号" prop="number" placeholder="请输入站点编号">
          <a-input v-model="form.number" :disabled="type === 1" />
        </a-form-model-item>
        <a-form-model-item label="消防车车牌" prop="licensePlateNumber" placeholder="请输入地理位置">
          <a-input v-model="form.licensePlateNumber" :disabled="type === 1" />
        </a-form-model-item>
        <a-form-model-item label="消防车描述" prop="description" placeholder="请输入联系人电话">
          <a-textarea v-model="form.description" :disabled="type === 1" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button @click="back()">取消</a-button>
          <a-button type="primary" style="margin-left: 40px;" @click="onSubmit" :disabled="type === 1">保存</a-button>
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
      imageUrl: '',
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
    beforeUpload(file) {
      // this.imageInfo = this.getImageInfo(file);
      // return false;
    },
    async handleChange(info) {
      // console.log(info);
      // const imgInfo = await this.getImageInfo(info.file);
      const size = 1 * 1024 * 1024;
      if (info.file.size > size) {
        this.$message.error('单张图片大小不超过1M');
      } else {
        // this.getBase64(info.fileList[0].originFileObj, (imageUrl) => {
        //   this.imageUrl = imageUrl;
        // });
        this.uploadMessagePicture({
          sourceType: 0,
          // sourceWidth: imgInfo.w,
          // sourceHeight: imgInfo.h,
          fileSize: info.file.size,
          file: info.file,
        }, 2);
      }
    },
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
          HTTP.addFireengines(params)
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

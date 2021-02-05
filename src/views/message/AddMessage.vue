<!--
 * @Author: Jane
 * @Date: 2020-08-11 10:15:22
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-28 16:44:16
 * @Descripttion:
-->

<template>
  <div class="main">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item><router-link to="/main/messageList">消息管理</router-link></a-breadcrumb-item>
        <a-breadcrumb-item>{{ id ? '修改消息' : '发布消息' }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="content">
      <a-card :bordered="false" :bodyStyle="{padding: '0 0'}">
        <a-row>
          <a-col :span="22" :push="1" :pull="1" class="listName">{{ id ? '修改消息' : '发布消息' }}</a-col>
        </a-row>
      </a-card>
      <a-row>
        <a-col :span="16" :push="4" :pull="4">
          <a-form-model
          ref="ruleForm"
          :rules="rules"
          :model="form">
            <div class="se-message-type-wrap">
              <span class="label">消息类型：</span>
              <a-select placeholder="请选择消息类型" class="se-message-type" v-model="form.messageCategory" @select="messageCategorySelect">
                <a-select-option v-for="(v, i) in configInfoList" :key="i" :value="v.sort">{{ v.value }}</a-select-option>
              </a-select>
            </div>
            <div>
              <a-form-model-item ref="messageTitle" prop="messageTitle">
                <a-input
                  class="in-title"
                  placeholder="请输入标题，必填（5-64个字）"
                  v-model="form.messageTitle"
                />
              </a-form-model-item>
            </div>
            <div v-if="form.messageCategory === 1">
              <a-form-model-item ref="messageBody" prop="messageBody">
                <a-textarea class="text-content" placeholder="请输入内容，必填，最多2000个字" v-model="form.messageBody" :rows="8" />
              </a-form-model-item>
            </div>
            <div v-else>
              <a-form-model-item ref="messageUrl" prop="messageUrl">
                <a-textarea class="text-content" placeholder="请输入或粘贴文章链接，必填（例如：公众号文章）" @keyup="keyUp" v-model.trim="form.messageUrl" :rows="1" />
              </a-form-model-item>
            </div>
            <div class="pics" v-if="form.messageCategory === 1">
              <a-upload
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                :before-upload="beforeUpload"
                @change="handleChange"
                :remove="removeImg"
                accept=".bmp,.jpg,.png,.jpeg,.tif"
              >
                <div v-if="fileList.length < 5">
                  <a-icon type="plus" style="color: #F03947;" />
                  <div class="ant-upload-text">选择图片</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null"
              :closable=false
              @cancel="handleCancel" class="view-pic-modal">
                <a-icon type="close" @click="previewVisible = false" style="cursor: pointer; position: absolute; top: 4px; right: 4px; font-size: 18px;" />
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
              <div class="tip">最多上传5张图片，单张图片大小不超过2M</div>
            </div>
            <div class="pic">
              <div style="padding-bottom: 6px;">
                <span class="label">封面：</span>
                <span class="tip">建议上传尺寸210*264，图片大小不超过1M</span>
              </div>
              <div style="display: flex;">
                <div>
                  <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="beforeUpload2"
                    @change="handleChange2"
                    accept=".bmp,.jpg,.png,.jpeg,.tif"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="head-img" alt="avatar" />
                    <div v-else>
                      <a-icon type="plus" style="color: #F03947;" />
                      <div class="ant-upload-text">选择封面</div>
                    </div>
                  </a-upload>
                </div>
                <div style="flex: auto;"  v-if="form.messageCategory !== 1">
                  <a-form-model-item ref="messageProfiles" prop="messageProfiles">
                    <a-textarea class="text-content text-content-sub" placeholder="选填，摘要信息会在分享转发时显示，帮助读者快速了解文章内容，如不填写，将默认显示“小红屋，便携式8K全景相机”.（最多120个汉字）" v-model="form.messageProfiles" :rows="2" />
                  </a-form-model-item>
                </div>
              </div>
            </div>
            <div class="push-wrap">
              <span class="label">推送设置：</span>
              <a-checkbox @change="pushOnChange" :checked="form.isPush === 1">
              </a-checkbox>
              <span class="label" style="padding-left: 8px;">推送</span>
            </div>
            <div class="set-wrap">
              <a-row type="flex">
                <a-col>
                  <span class="label">定时设置：</span>
                </a-col>
                <a-col>
                  <div>
                    <a-checkbox @change="setOnChange"  :checked="form.delayedSending === 1"></a-checkbox>
                    <span class="label" style="padding-left: 8px;">设定发布时间</span>
                  </div>
                  <div v-if="form.delayedSending === 1">
                    <div class="tip">可选择2小时后~7天范围内的时间</div>
                    <div>
                      <a-date-picker
                      :show-today='showToday'
                      :show-time="showTime"
                      format="YYYY-MM-DD HH:mm"
                      placeholder="请选择定时时间"
                      :disabled-date="disabledDate"
                      :disabled-time="disabledDateTime"
                      :default-value="moment(form.pushTime)"
                      @change="timeOnChange" @ok="onOk" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="btn-wrap">
              <a-button @click="cancel()">取消</a-button>
              <a-button style="margin-left: 20px;" type="primary" @click="onSubmit">发布</a-button>
            </div>
          </a-form-model>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/message';
import Tools from '@/utils/tools';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'Message',
  props: [],
  components: { },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
  },
  data() {
    const validateTitle = (rule, value, callback) => {
      // const rgx = /^[\u4E00-\u9FA5]+$/;
      if ((value && value.trim() === '') || value === undefined || value === null) {
        callback(new Error('请输入标题，必填（5-64个字）'));
      // } else if (!rgx.test(value)) {
        // callback(new Error('请输入标题，必填（5-64个汉字）'));
      } else if (Tools.gblen(value) < 10 || Tools.gblen(value) > 128) {
        callback(new Error('标题长度应在5-64个字之间'));
      } else {
        callback();
      }
    };
    const validateMessageBody = (rule, value, callback) => {
      if ((value && value.trim() === '') || value === undefined || value === null) {
        callback(new Error('请输入内容，必填，最多2000个字'));
      } else if (Tools.gblen(value) > 2000) {
        callback(new Error('内容长度应在2000个字之内'));
      } else {
        callback();
      }
    };
    const validateMessageUrl = (rule, value, callback) => {
      if ((value && value.trim() === '') || value === undefined || value === null) {
        callback(new Error('请输入或粘贴文章链接，必填（例如：公众号文章）'));
      } else if (!Tools.IsURL(value)) {
        callback(new Error('请输入正确的文章链接'));
      } else if (Tools.gblen(value) > 8182) {
        callback(new Error('链接长度太长，请输入正确的文章链接'));
      } else {
        callback();
      }
    };
    const validateMessageProfiles = (rule, value, callback) => {
      if (value !== null && Tools.gblen(value) > 240) {
        callback(new Error('摘要最多120个字'));
      } else {
        callback();
      }
    };
    return {
      configInfoList: [],
      form: {
        messageCategory: 1,
        isPush: 0,
        delayedSending: 0,
        messageBody: null,
        messageUrl: null,
        messageTitle: null,
        messageProfiles: null,
      },
      showToday: false,
      rules: {
        messageTitle: [
          { required: true, validator: validateTitle, trigger: 'blur' },
        ],
        messageBody: [
          { validator: validateMessageBody, trigger: 'blur' },
        ],
        messageUrl: [
          { validator: validateMessageUrl, trigger: 'blur' },
        ],
        messageProfiles: [
          { validator: validateMessageProfiles, trigger: 'blur' },
        ],
      },
      id: +this.$route.query.id,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      showTime: {
        format: 'HH:mm',
        // defaultValue: moment().add(2, 'hours').format('YYYY-MM-DD HH:mm'),
      },
      dateString: null,
      currentDate: null,
      currentHour: null,
      currentMinute: null,
      selectDate: null,
      selectHour: null,
      selectMinute: null,
      uploadPictureInfo: [],
      imageInfo: {},
      canPublish: true,
    };
  },
  mounted() {
    this.getMessageCategory();
    if (this.id) {
      this.getOneMessageInfoById();
    }
  },
  methods: {
    moment,
    getMessageCategory() {
      HTTP.getMessageCategory()
        .then((res) => {
          if (res.data.status === 200) {
            this.configInfoList = res.data.configInfoList;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getOneMessageInfoById() {
      const params = {
        id: this.id,
      };
      HTTP.getOneMessageInfoById(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.form = { ...res.data.messageInfo };
            // const reg = new RegExp('<br>', 'g');
            // this.form.messageBody = this.form.messageBody.replace(/&nbsp;/g, ' ').replace(reg, '\r\n');
            // this.form.messageBody = AesUtil.parseBase64(this.form.messageBody);
            this.form = JSON.parse(JSON.stringify(this.form));
            this.dateString = this.form.pushTime;
            this.fileList = [];
            for (let i = 0; i < this.form.messagePictureList.length; i += 1) {
              if (this.form.messagePictureList[i].picType === 0) {
                this.form.coverPictureInfo = this.form.messagePictureList[i];
                this.imageUrl = this.form.messagePictureList[i].url;
              } else {
                const data = { ...this.form.messagePictureList[i] };
                data.uid = data.id;
                data.status = 'done';
                data.name = 'pic';
                this.fileList.push(data);
              }
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    messageCategorySelect() {
      this.$refs.ruleForm.resetFields();
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      // console.log(file);
      if (!file.url && !file.preview) {
        // eslint-disable-next-line no-param-reassign
        file.preview = await this.getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    removeImg(v) {
      this.fileList.splice(this.fileList.findIndex((item) => item === v), 1);
    },
    async handleChange({ file }) {
      // console.log(file, fileList);
      const imgInfo = await this.getImageInfo(file);
      const size = 2 * 1024 * 1024;
      if (file.size > size) {
        this.$message.error('单张图片大小不超过2M');
      } else {
        // this.fileList = fileList;
        // console.log(this.fileList);
        this.uploadMessagePicture({
          sourceType: 1,
          sourceWidth: imgInfo.w,
          sourceHeight: imgInfo.h,
          fileSize: file.size,
          file,
        }, 1);
      }
    },
    beforeUpload(file) {
      // this.fileList = [...this.fileList, file];
      console.log('beforeUpload中：', file);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   const image = new Image();
      //   image.src = reader.result;
      //   image.onload = () => {
      //     const w = image.width;
      //     const h = image.height;
      //     console.log('宽高：', w, h);
      //   };
      // };
      return false;
    },
    async handleChange2(info) {
      // console.log(info);
      const imgInfo = await this.getImageInfo(info.file);
      const size = 1 * 1024 * 1024;
      if (info.file.size > size) {
        this.$message.error('单张图片大小不超过1M');
      } else {
        // this.getBase64(info.fileList[0].originFileObj, (imageUrl) => {
        //   this.imageUrl = imageUrl;
        // });
        this.uploadMessagePicture({
          sourceType: 0,
          sourceWidth: imgInfo.w,
          sourceHeight: imgInfo.h,
          fileSize: info.file.size,
          file: info.file,
        }, 2);
      }
    },
    async getImageInfo(file) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            const w = image.width;
            const h = image.height;
            const obj = {};
            obj.w = w;
            obj.h = h;
            resolve(obj);
          };
        };
      });
    },
    beforeUpload2(file) {
      this.imageInfo = this.getImageInfo(file);
      return false;
    },
    pushOnChange(e) {
      if (e.target.checked) {
        this.form.isPush = 1;
      } else {
        this.form.isPush = 0;
      }
    },
    setOnChange(e) {
      if (e.target.checked) {
        this.form.delayedSending = 1;
        // test
        if (!this.id) {
          this.form.pushTime = moment().add('hours', 2);
          this.dateString = this.form.pushTime;
        }
      } else {
        this.form.delayedSending = 0;
      }
      this.form = JSON.parse(JSON.stringify(this.form));
    },
    onSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.delayedSending === 1) {
            this.selectDate = moment(this.dateString).get('date');
            this.selectHour = moment(this.dateString).get('hour');
            this.selectMinute = moment(this.dateString).get('minute');
            const s = (this.selectHour) * 60 + this.selectMinute;
            const c = (moment().get('hour') + 2) * 60 + moment().get('minute');
            // test
            if (moment().get('date') === this.selectDate && s < c) {
              this.$message.error('请选择2小时候后~7天范围内的时间');
              return false;
            }
          }
          this.createSystemMessageInfo();
        }
        // return true;
      });
    },
    createSystemMessageInfo() {
      if (this.canPublish) {
        const messagePictureList = this.fileList.concat();
        // for (let i = 0; i < this.fileList.length; i += 1) {
        //   messagePictureList.push({
        //     id: this.fileList[i].id,
        //     picType: 1,
        //   });
        // }
        if (this.form.coverPictureInfo) {
          messagePictureList.push(this.form.coverPictureInfo);
        }
        const params = {
          messagePictureList,
          messageCategory: this.form.messageCategory,
          messageTitle: this.form.messageTitle,
          messageProfiles: this.form.messageProfiles,
          // messageBody: (this.form.messageBody && this.form.messageBody.replace(/\n|\r\n/g, '<br>').replace(/\s/g, '&nbsp;')) || '',
          messageBody: this.form.messageBody,
          messageUrl: (this.form.messageUrl && encodeURI(this.form.messageUrl)) || '',
          createUserid: this.getUserInfo.id,
          isPush: this.form.isPush,
          delayedSending: this.form.delayedSending,
          pushTime: this.dateString ? moment(this.dateString).format('YYYY-MM-DD HH:mm:ss') : '',
        };
        this.canPublish = false;
        if (this.id) {
          this.updateMessageInfo(params);
        } else {
          this.createMessage(params);
        }
      }
    },
    createMessage(params) {
      HTTP.createSystemMessageInfo(params)
        .then((res) => {
          this.canPublish = true;
          if (res.data.status === 200) {
            this.$router.push({ name: 'MessageList' });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    updateMessageInfo(params) {
      HTTP.updateMessageInfo(Object.assign(params, { id: this.id }))
        .then((res) => {
          this.canPublish = true;
          if (res.data.status === 200) {
            this.$router.push({ name: 'MessageList' });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    uploadMessagePicture(params, type) {
      const fd = new FormData();
      fd.append('sourceType', params.sourceType);
      fd.append('sourceWidth', params.sourceWidth);
      fd.append('sourceHeight', params.sourceHeight);
      fd.append('fileSize', params.fileSize);
      fd.append('file', params.file);

      HTTP.uploadMessagePicture(fd)
        .then((res) => {
          if (res.data.status === 200) {
            const data = res.data.messagePicture;
            if (type === 2) {
              this.form.coverPictureInfo = data;
              this.imageUrl = data.url;
            } else {
              data.uid = data.id;
              data.status = 'done';
              data.name = 'pic';
              this.fileList.push(data);
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    timeOnChange(value, dateString) {
      this.dateString = dateString;
    },
    onOk(value) {
      console.log('onOk: ', value);
    },
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i += 1) {
        result.push(i);
      }
      return result;
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current < moment().startOf('day') || current > moment().add(6, 'day');
    },
    disabledDateTime() {
      this.currentDate = moment().get('date');
      this.currentHour = moment().get('hour');
      this.currentMinute = moment().get('minute');
      this.selectDate = moment(this.dateString).get('date');
      this.selectHour = moment(this.dateString).get('hour');
      this.selectMinute = moment(this.dateString).get('minute');
      return {
        disabledHours: () => {
          // test
          if (this.currentDate === this.selectDate) {
            return this.range(0, 24).splice(0, this.currentHour + 2);
          } if (this.currentDate + 6 === this.selectDate) {
            return this.range(0, 24).splice(23 - this.currentHour, 24);
          }
          return this.range(0, 0);
        },
        disabledMinutes: () => {
          // test
          if (this.currentDate === this.selectDate && this.currentHour + 2 === this.selectHour) {
            return this.range(0, this.currentMinute);
          } if (this.currentDate + 6 === this.selectDate && this.currentHour === this.selectHour) {
            return this.range(this.currentMinute + 1, 60);
          }
          return this.range(0, 0);
        },
      };
    },
    cancel() {
      this.$router.back(-1);
    },
    // defaultVaule() {
    //   return moment().add(2, 'hours').format('YYYY-MM-DD HH:mm');
    // },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    keyUp() {
      this.form.messageUrl = this.form.messageUrl.replace(/[, ]/g, '');
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 1px;
  .breadcrumb {
    padding: 12px 16px;
    background-color: #fff;
  }
  ::v-deep .ant-breadcrumb {
    font-size: 12px;
  }
  .content {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
    background-color: #fff;
    .listName {
      padding: 16px 0;
      color: #001529;
      font-size: 18px;
      border-bottom: 1px solid #e3e5e9;
    }
    .se-message-type-wrap {
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e3e5e9;
      .se-message-type {
        width: 180px;
      }
    }
    .in-title {
      height: 30px;
      font-size: 20px;
      font-weight: 700;
      text-align: left;
      padding-left: 0;
      // line-height: 18px;
      border: none;
      margin-top: 20px;
      margin-bottom: 20px;
      &:focus {
        border: none;
        box-shadow: none;
      }
      &:focus {
        border: none;
        box-shadow: none;
      }
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #99a0aa;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
       color: #99a0aa;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #99a0aa;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #99a0aa;
      }
    }
    .text-content {
      padding: 16px 20px;
      font-size: 14px;
    }
    .text-content-sub {
      height: 80px;
      width: 100%;
    }
    .pics {
      padding-top: 14px;
      ::v-deep .ant-upload.ant-upload-select-picture-card {
        background-color: #fff;
        width: 80px;
        height: 80px;
      }
      ::v-deep .ant-upload-list-picture-card .ant-upload-list-item {
        width: 80px;
        height: 80px;
      }
      ::v-deep .ant-upload-list-picture-card-container {
        width: 80px;
        height: 80px;
      }
      .tip {
        font-size: 12px;
        color: #99a0aa;
        margin-top: -4px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e3e5e9;
      }
    }
    .pic {
      padding-top: 16px;
      .tip {
        font-size: 12px;
        color: #99a0aa;
        line-height: 22px;
      }
      ::v-deep .ant-upload.ant-upload-select-picture-card {
        background-color: #fff;
        width: 100px;
        height: 80px;
      }
      .head-img {
        width: 100px;
        height: 80px;
      }
    }
    .push-wrap {
      padding-top: 16px;
      padding-bottom: 6px;
    }
    .set-wrap {
      padding-top: 6px;
      padding-bottom: 28px;
      border-bottom: 1px solid #e3e5e9;
      .tip {
        padding-top: 6px;
        padding-bottom: 4px;
        font-size: 12px;
        color: #f03947;
      }
    }
    .label {
      font-size: 14px;
      color: #001529;
    }
    .btn-wrap {
      text-align: right;
    }
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #F03947;
    }
    .btn-wrap {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
}
</style>

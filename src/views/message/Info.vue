<!--
 * @Author: Jane
 * @Date: 2020-08-11 10:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-09-01 13:56:03
 * @Descripttion:
-->

<template>
  <div class="main">
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item><router-link to="/main/messageList">消息管理</router-link></a-breadcrumb-item>
        <a-breadcrumb-item>消息详情</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <a-row class="content-wrap">
      <a-col :span="12" :offset="6">
        <div>
          <div class="title">{{ info.messageTitle }}</div>
          <div class="tip">{{ info.pushTime }} · {{ info.messageCategory | messageCategoryFormat }}</div>
          <!-- <div class="content" style="white-space: pre-wrap;" v-html="info.messageBody"></div> -->
          <!-- <div class="content" style="white-space: pre-wrap;">{{ messageBody }}</div> -->
          <div class="content" style="white-space: pre-wrap;">{{ info.messageBody }}</div>
          <div v-for="(v, k) in info.messagePictureList" :key="k" class="cover">
            <img v-if="v.picType === 1" :src="v.url">
          </div>
        </div>
        <!-- <iframe :src="src" frameborder="0" width="100%" height="100%"></iframe> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/message';

export default {
  name: 'Info',
  data() {
    return {
      id: +this.$route.query.id,
      info: {},
      messageBody: '',
    };
  },
  filters: {
    messageCategoryFormat(value) {
      if (value === 1) {
        return '系统消息';
      } if (value === 2) {
        return '运营活动';
      } if (value === 3) {
        return '行业资讯';
      } if (value === 4) {
        return '使用教程';
      }
      return '- -';
    },
  },
  mounted() {
    this.getOneMessageInfoById();
  },
  methods: {
    // contentFormat(value) {
    //   console.log(value);
    //   return value && value.replace(/\n/g, '<br/>');
    // },
    getOneMessageInfoById() {
      const params = {
        id: this.id,
      };
      HTTP.getOneMessageInfoById(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.info = res.data.messageInfo;
            // this.messageBody = this.info.messageBody;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
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
  .content-wrap {
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
    padding-bottom: 60px;
    background-color: #fff;
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #222222;
      line-height: 26px;
      padding-top: 30px;
    }
    .tip {
      padding-top: 6px;
      padding-bottom: 10px;
      font-size: 14px;
      color: #858a97;
      line-height: 22px;
    }
    .content {
      font-size: 16px;
      color: #484e5b;
      line-height: 24px;
      word-wrap: break-word;
    }
    .cover {
      // padding-top: 4px;
      // padding-bottom: 4px;
      text-align: center;
      img {
        display: block;
        width: 70%;
        // margin: 10px auto;
      }
    }
  }
}
</style>

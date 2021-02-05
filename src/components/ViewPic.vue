<!--
 * @Author: Jane
 * @Date: 2020-05-18 14:01:07
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-21 11:20:36
 * @Descripttion:
-->
<template>
  <a-modal
    title="Title"
    :visible="visible"
    :confirm-loading="confirmLoading"
    :footer="null"
    @cancel="cancelFn"
    width=100%
    :centered=true
  >
    <div class="preview-wrap">
      <img @click="leftFn" :src="previewLeft" class="preview-img left" />
      <img :src="photoList && photoList[idx] && photoList[idx].sourceUrl" class="img">
      <img @click="rightFn" :src="previewRight" class="preview-img right" />
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    visible: {
      type: Boolean,
      // required: true,
    },
    idx: {
      type: Number,
      // required: true,
    },
    photoList: {
      type: Array,
      // required: true,
    },
  },
  data() {
    return {
      ModalText: 'Content of the modal',
      confirmLoading: false,
      previewLeft: this.idx === 0 ? require('@/assets/icons/png/preview_left2.png') : require('@/assets/icons/png/preview_left1.png'),
      previewRight: this.idx === this.photoList.length - 1 ? require('@/assets/icons/png/preview_right2.png') : require('@/assets/icons/png/preview_right1.png'),
    };
  },
  computed: {
  },
  watch: {
    idx(n) {
      // console.log(n, o);
      this.previewLeft = n === 0 ? require('@/assets/icons/png/preview_left2.png') : require('@/assets/icons/png/preview_left1.png');
      this.previewRight = n === this.photoList.length - 1 ? require('@/assets/icons/png/preview_right2.png') : require('@/assets/icons/png/preview_right1.png');
    },
  },
  mounted() {
    console.log(this.photoList);
  },
  methods: {
    leftFn() {
      if (this.idx === 0) {
        return;
      }
      this.$emit('updateIdx', 'left');
    },
    rightFn() {
      if (this.idx === this.photoList.length - 1) {
        return;
      }
      this.$emit('updateIdx', 'right');
    },
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.ModalText = 'The modal will be closed after two seconds';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.visible = false;
    },
    cancelFn() {
      this.$emit('on-close', { visible: false });
    },
  },
};
</script>

<style scoped lang="scss">
  ::v-deep .ant-modal-header {
    border-bottom: 0;
  }
  ::v-deep .ant-modal-footer {
    border-top: 0;
    background-color: rgba(0, 0, 0, .8);
    height: 100px;
  }
  ::v-deep .ant-modal-header {
    background-color: rgba(0, 0, 0, .8);
    height: 100px;
  }
  ::v-deep .ant-modal-close-x {
    width: 56px;
    height: 56px;
    font-size: 26px;
    color: rgba(255, 255, 255, .7);
    line-height: 80px;
  }

  .preview-wrap {
    position: relative;
    .img {
      display: block;
      width: 100%;
      height: 75vh;
      // opacity: 1;
      // position: absolute;
      // top: 0px;
      // left: 0px;
      // height: 100%;
      // width: 100%;
      // animation-name: cf4FadeInOut;
      // animation-timing-function: ease-in-out;
      // animation-iteration-count: infinite;
      // animation-duration: 3s;
      // animation-direction: alternate;
      // animation-iteration-count:1;
      // animation-fill-mode: forwards;
    }
    @keyframes cf4FadeInOut {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    .preview-img {
      width: 44px;
      height: 44px;
      position: absolute;
      top: 50%;
      margin-top: -22px;
      cursor: pointer;
    }
    .left {
      left: 10px;
    }
    .right {
      right: 10px;
    }
  }
  // ::v-deep .ant-modal {
  //   top: 0;
  // }
</style>

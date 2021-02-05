<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-24 10:08:44
 * @Descripttion:
-->

<template>
  <div class="pic-table">
    <a-table
      :data-source="tableData"
      :rowKey="(record, index) => index"
      :pagination="pagination"
      class="codeTable"
      @change="handleChange"
    >
      <a-table-column key="id" title="ID" data-index="id" width="88px">
        <template slot-scope="id">
          <span style="padding-left:20px">{{id}}</span>
        </template>
      </a-table-column>
      <a-table-column key="thumbUrl" title="封面" data-index="thumbUrl" :width="120">
        <template slot-scope="thumbUrl, record">
          <div class="head-img">
            <div v-if="record.colStatus === 3" class="img-status">
              <div>已禁用</div>
            </div>
            <img class="thumb-img" :src="thumbUrl" alt />
          </div>
        </template>
      </a-table-column>
      <a-table-column key="colInfo" title="作品信息">
        <template slot-scope="colInfo">
          <a-tooltip placement="topLeft">
            <template slot="title">
              <div class="col-title">{{ colInfo.colTitle }}</div>
              <div
                class="col-desc"
                v-html="colInfo.colDescription ? colInfo.colDescription : '- -'"
              ></div>
              <div class="nick-name">作者：{{ colInfo.nickName }}</div>
            </template>
            <div class="col-title">{{ colInfo.colTitle }}</div>
            <div class="col-desc" v-html="colInfo.colDescription ? colInfo.colDescription : '- -'"></div>
            <div class="nick-name">作者：{{ colInfo.nickName }}</div>
          </a-tooltip>
        </template>
      </a-table-column>
      <a-table-column key="picCountInfo" title="图片数量">
        <template slot-scope="picCountInfo">
          <span class="pic-count" @click="showModal(picCountInfo)">{{ picCountInfo.picCount }}</span>
          <!-- <span class="pic-count">{{ picCountInfo.picCount }}</span> -->
        </template>
      </a-table-column>
      <a-table-column key="positionInfo" title="位置" :ellipsis="true">
        <template slot-scope="positionInfo">
          <a-tooltip placement="topLeft">
            <template slot="title">
              <div
                class="pos-title"
              >{{ positionInfo.positionName ? positionInfo.positionName : '- -' }}</div>
              <div
                class="pos-desc"
              >{{ positionInfo.colDescription ? positionInfo.positionInfo : '- -' }}</div>
            </template>
            <div
              class="pos-title"
            >{{ positionInfo.positionName ? positionInfo.positionName : '- -' }}</div>
            <div
              class="pos-desc"
            >{{ positionInfo.colDescription ? positionInfo.positionInfo : '- -' }}</div>
          </a-tooltip>
        </template>
      </a-table-column>
      <a-table-column key="telContact" title="联系电话" data-index="telContact" />
      <a-table-column key="viewCount" title="作品浏览量" sorter="true" data-index="viewCount" />
      <a-table-column key="createTime" title="创建时间" sorter="true" data-index="createTime">
        <template slot-scope="createTime">
          <span class="date">{{ createTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column key="phoneNumber" title="作品链接" data-index="phoneNumber" /> -->
      <a-table-column key="phoneNumber" title="作品链接" :width="90">
        <template slot-scope="record">
          <div @click="view(record)" class="view">
            <svg-icon iconName="view" />
            <span>查看</span>
          </div>
          <div v-if="record.colStatus == 3" @click="setStatus(record)" class="prohibit">
            <svg-icon iconName="recovery" />
            <span>恢复</span>
          </div>
          <div v-else @click="setStatus(record)" class="recovery">
            <svg-icon iconName="prohibit" />
            <span>禁用</span>
          </div>
        </template>
      </a-table-column>
    </a-table>
    <a-modal
      :title="modalTitle"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
      width="700px"
    >
      <div style="max-height: 400px; overflow-y: auto;">
        <ul class="pic-list-wrap">
          <li v-for="(v, k) in photoList" :key="k">
            <img @click="viewPicFn(k)" :src="v.thumbUrl" class="pic-img" />
            <div class="tit">{{ v.picTitle }}</div>
          </li>
        </ul>
      </div>
    </a-modal>
    <view-pic v-if="showPic" :photoList="photoList" :idx="idx" :visible="showPic" @on-close="onClose" @updateIdx="updateIdx"></view-pic>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/pics';
import SERVER_CONFIG from '@build/config';
import viewPic from './ViewPic.vue';

export default {
  name: 'UserList',
  props: ['tableData', 'pagination'],
  components: {
    viewPic,
  },
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      modalTitle: '',
      photoList: [],
      showPic: false,
      idx: 0,
    };
  },
  methods: {
    updateIdx(v) {
      console.log(v);
      if (v === 'left') {
        this.idx -= 1;
      } else if (v === 'right') {
        this.idx += 1;
      }
    },
    viewPicFn(idx) {
      this.idx = idx;
      this.showPic = true;
    },
    onClose() {
      this.showPic = false;
    },
    showModal(data) {
      this.modalTitle = data.colTitle;
      this.getOneAlbumPhotoList(data.id);
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
    // eslint-disable-next-line no-unused-vars
    pageChange(current) {
      this.$emit('pageChange', current);
    },
    onShowSizeChange(current, pageSize) {
      this.$emit('onShowSizeChange', current, pageSize);
    },
    handleChange(pagination, filters, sorter) {
      this.$emit('handleChange', sorter);
    },
    view(v) {
      window.open(
        `${SERVER_CONFIG.URL}hotspot/index.html#/preview?userId=${v.userId}&id=${v.id}&isFrom=2&v=1`,
      );
    },
    setStatus(v) {
      const params = {
        id: v.id,
      };
      HTTP.enableAlbumInfo(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success('操作成功！');
            this.$emit('getData');
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getOneAlbumPhotoList(id) {
      const params = {
        id,
      };
      HTTP.getOneAlbumPhotoList(params)
        .then((res) => {
          if (res.data.status === 200) {
            // this.$message.success('操作成功！');
            this.photoList = res.data.photoList;
            this.visible = true;
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
::v-deep .ant-modal-footer {
  border-top: 0px solid #e8e8e8;
  padding: 0;
}
.pic-table {
  ::v-deep .ant-table-thead > tr:first-child > th:first-child {
    padding-left: 32px;
  }
  ::v-deep .ant-table-pagination.ant-pagination {
    padding-right: 15px;
  }
  .view {
    margin-bottom: 10px;
    cursor: pointer;
    svg {
      color: #f03947;
      font-size: 14px;
    }
    span {
      color: #f03947;
      padding-left: 8px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
  .prohibit,
  .recovery {
    cursor: pointer;
    svg {
      font-size: 14px;
      color: #99a0aa;
    }
    span {
      color: #99a0aa;
      padding-left: 8px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
  .head-img {
    position: relative;
    width: 104px;
    height: 80px;
    border-radius: 4px;
    .img-status {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      div {
        width: 42px;
        height: 36px;
        position: absolute;
        top: 50%;
        margin-top: -18px;
        left: 50%;
        margin-left: -21px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        background: url(~@/assets/icons/png/imgStatus.png) top center no-repeat;
        padding-top: 16px;
      }
    }
  }
  .pic-count {
    color: #f03947;
    cursor: pointer;
  }
  .thumb-img {
    width: 104px;
    height: 80px;
    border-radius: 4px;
  }
  .col-title,
  .pos-title {
    font-size: 14px;
    color: #001529;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .col-desc,
  .pos-desc {
    font-size: 14px;
    color: #99a0aa;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nick-name {
    font-size: 12px;
    color: #99a0aa;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    color: #99a0aa;
  }
}
.pic-list-wrap {
  width: 100%;
  // height: 400px;
  display: flex;
  flex-flow:row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  li {
    width: 108px;
    height: 80px;
    margin-left: 10px;
    margin-bottom: 32px;
    text-align: center;
    img {
      width: 108px;
      height: 80px;
    }
    .tit {
      padding-top: 4px;
      padding-bottom: 8px;
      font-size: 12px;
      text-align: left;
      color: #001529;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

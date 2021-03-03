/* eslint-disable no-unused-vars */
<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2021-03-02 16:33:19
 * @Descripttion:
-->

<template>
  <div class="user-info">
    <a-row>
      <a-col :span="12" class="left">用户详情</a-col>
    </a-row>
    <div class="info-content">
      <a-avatar :size="80" :src="userInfo.headImage" class="user-avatar" />
      <div class="info-detail">
        <div>
          <div class="user-name">{{userInfo.nikeName}}<span class="user-id">（ID：{{userId}}）</span></div>
        </div>
        <div class="user-detail">注册于 {{userInfo.createTime | dateFormat}}
          <a-divider type="vertical" v-if="userInfo.userLabel"/>
          <span v-if="userInfo.userLabel">{{userInfo.userLabel}}</span>
          <a-divider type="vertical"  v-if="userInfo.phoneNumber"/>
          <span v-if="userInfo.phoneNumber">{{userInfo.phoneNumber}}</span>
        </div>
        <div>
          <span v-if="levelInfo.memberLevel==1 && levelInfo.memberStatus==1" class="vip-users" />
          <span v-else-if="levelInfo.memberLevel==1 && levelInfo.memberStatus==0" class="expired-users" />
          <span v-else class="free-users">免费用户</span>
          <span class="userPhone" v-if="userInfo.mobilePhone">手机账号：{{userInfo.mobilePhone}}</span>
          <span class="userWechat">{{userInfo.bindStatus ? `已绑定 ${userInfo.wxNickName}` : '微信未绑定'}}</span>
        </div>
      </div>
      <div class="pic-detail" style="margin-left: 32px">
        <div class="count">{{picInfo.allTotalView}}</div>
        <div class="title">作品浏览量</div>
      </div>
      <div class="pic-detail">
        <div class="count">{{picInfo.allTotal}}</div>
        <div class="title">作品数量</div>
      </div>
    </div>
    <a-tabs defaultActiveKey="0">
        <a-tab-pane tab="用户作品" key="0">
          <pic-table :tableData="tableData" :pagination="pagination" @getData="getSearchAlbumInfo" @pageChange="pageChange" @onShowSizeChange="onShowSizeChange" @handleChange="handleChange"></pic-table>
        </a-tab-pane>
        <a-tab-pane tab="会员开通记录" key="1">
          <a-table :data-source="levelList" :pagination="false" :rowKey="(record, index) => index">
            <a-table-column key="packageName" title="会员类型" data-index="packageName">
              <template slot-scope="packageName">
                <span v-if="packageName">{{packageName}}</span>
                <span v-else>免费用户</span>
              </template>
            </a-table-column>
            <a-table-column key="openingType" title="开通方式" data-index="openingType">
              <template slot-scope="openingType">
                <span v-if="openingType">{{openType[openingType - 1]}}</span>
                <span v-else>未开通</span>
              </template>
            </a-table-column>
            <a-table-column key="companyName" title="分销商" data-index="companyName" />
            <a-table-column key="startTime" title="兑换时间" data-index="activateTime">
              <template slot-scope="activateTime">
                <span>{{activateTime | dateFormat}}</span>
              </template>
            </a-table-column>
            <a-table-column key="endTime" title="到期时间" data-index="endTime">
              <template slot-scope="endTime">
                <span>{{endTime | dateFormat}}</span>
              </template>
            </a-table-column>
          </a-table>
        </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
// import AesUtil from '@/utils/aesUtil';
import PageInfo from '@/utils/page';
import HTTP from '@/api/sys';
import PicTable from '@/components/PicTable.vue';

export default {
  name: 'UserInfo',
  props: [],
  components: {
    PicTable,
  },
  data() {
    return {
      tableData: [],
      userId: +this.$route.query.userId,
      levelList: [],
      levelInfo: {
        memberLevel: 0,
        memberStatus: 0,
      },
      picInfo: {
        allTotalView: 0,
        allTotal: 0,
      },
      userInfo: {
        headImage: '',
      },
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      params: {},
      order: '',
      sort: '',
      openType: ['兑换码'],
    };
  },
  mounted() {
    this.getUserData();
    this.getSearchAlbumInfo();
  },
  methods: {
    getUserData() {
      const params = {
        userId: this.userId,
      };
      HTTP.getOneMemberInfo(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.levelList = res.data.memberLevelList;
            this.levelInfo = res.data.memberLevel || { memberLevel: 0, memberStatus: 0 };
            this.picInfo = res.data.picTotal;
            this.userInfo = res.data.userInfo;
            this.userInfo.bindStatus = res.data.bindStatus;
            console.log(this.userInfo);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getSearchAlbumInfo() {
      const {
        pagination, order, sort, userId,
      } = this;
      const params = {
        page: pagination.current,
        rows: pagination.pageSize,
        order,
        sort,
        userId,
      };
      HTTP.getSearchAlbumInfo(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data.rows;
            this.pagination.total = res.data.records;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    pageChange(current) {
      this.pagination.current = current;
      // 下面再请求分页接口，重新渲染数据
      this.getSearchAlbumInfo();
    },
    onShowSizeChange(current, pageSize) {
      // 请求分页接口，重新渲染数据
      this.pagination.current = 1;
      this.pagination.pageSize = pageSize;
      this.getSearchAlbumInfo();
    },
    handleChange(sorter) {
      if (sorter.order) {
        this.order = sorter.columnKey;
        this.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      } else {
        this.order = '';
        this.sort = '';
      }
      this.getSearchAlbumInfo();
    },
  },
};
</script>
<style lang="scss" scoped>
$darkColor: #001529;
.user-info {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 16px 32px;
  background: #fff;
  .left {
    text-align: left;
    color: $darkColor;
    font-size: 18px;
    margin-bottom: 15px;
  }
  .info-content {
    padding: 24px 0;
    border-bottom: 1px solid rgba(227,229,233,1);
    border-top: 1px solid rgba(227,229,233,1);
    margin-bottom: 12px;
    overflow: hidden;
    .user-avatar {
      float: left;
      margin-right: 16px;
    }
    .info-detail {
      float: left;
      .user-name {
        color: rgba(0,21,41,1);
        font-size: 18px;
        font-weight: bold;
        line-height: 24px;
      }
      .user-id {
        color: rgba(72,78,91,1);
        font-size: 14px;
        font-weight: normal;
        margin-left: 5px;
      }
      .user-detail {
        font-size: 14px;
        color: rgba(72,78,91,1);
        line-height: 24px;
        margin: 4px 0;
      }
      .vip-users {
        width: 72px;
        height: 23px;
        display: block;
        background: url(~@/assets/icons/png/vipUsers.png) no-repeat;
        background-size: 100% 100%;
        float: left;
      }
      .expired-users {
        width: 66px;
        height: 23px;
        display: block;
        background: url(~@/assets/icons/png/expiredUsers.png) no-repeat;
        background-size: 100% 100%;
        float: left;
      }
      .free-users {
        width: 58px;
        height: 20px;
        background: rgba(153,160,170,1);
        border-radius: 2px;
        color: #fff;
        font-size: 12px;
        display: inline-block;
        text-align: center;
        line-height: 20px;
      }
      .userPhone {
        margin-left: 10px;
        background: url(~@/assets/icons/png/phone.png) no-repeat left center/16px 16px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(72,78,91,1);
      }
      .userWechat {
        margin-left: 10px;
        background: url(~@/assets/icons/png/wechat.png) no-repeat left center/16px 16px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(72,78,91,1);
      }
    }
    .pic-detail {
      float: right;
      width: 160px;
      height: 80px;
      border-radius: 4px;
      box-shadow: rgba(0,0,0,0.08) 0 4px 8px;
      text-align: center;
      padding-top: 15px;
      .count {
        color: rgba(0,21,41,1);
        font-size: 18px;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .title {
        color: rgba(72,78,91,1);
        font-size: 14px;
      }
    }
  }
  ::v-deep .ant-tabs-bar{
    border-bottom: none;
  }
}
</style>

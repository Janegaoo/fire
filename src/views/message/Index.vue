<!--
 * @Author: Jane
 * @Date: 2020-08-06 10:15:22
 * @LastEditors: Yawen
 * @LastEditTime: 2020-09-17 17:26:19
 * @Descripttion:
-->

<template>
  <div class="main">
    <a-card style="margin-bottom: 8px;" :bordered="false" :bodyStyle="{padding: '16px 32px'}">
      <!-- <a-form-model layout="inline" :modal="searchInfo">
        <a-input
          placeholder="请输入查询内容"
          style="width: 320px; margin-right: 8px"
          v-model="searchInfo.searchInput"
        />
        <a-button type="primary" style="margin-right: 8px" @click="getData()">查询</a-button>
        <a-button type="defult" @click="resetSearch()">重置</a-button>
      </a-form-model> -->
      <a-form-model layout="inline" :modal="searchInfo">
        <a-select placeholder="请选择消息类型" style="margin-right:8px; width: 160px" v-model="searchInfo.messageCategory">
          <a-select-option v-for="(v, i) in configInfoList" :key="i" :value="v.sort">{{ v.value }}</a-select-option>
          <!-- <a-select-option value="nikeName">运营活动</a-select-option>
          <a-select-option value="phoneNumber">行业资讯</a-select-option>
          <a-select-option value="phoneNumber2">使用教程</a-select-option> -->
        </a-select>
        <a-select placeholder="请选择查询类型" style="margin-right:8px; width: 160px" v-model="searchInfo.inputType2">
          <a-select-option value="id">标题</a-select-option>
        </a-select>
        <a-input
          placeholder="请输入查询内容"
          style="width: 320px; margin-right: 8px"
          v-model="searchInfo.searchInput"
        />
        <a-button type="primary" style="margin-right: 8px" @click="getData()">查询</a-button>
        <a-button type="defult" @click="resetSearch()">重置</a-button>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" :bodyStyle="{padding: '0 0'}">
      <a-row>
        <a-col :span="12" class="left">消息列表</a-col>
        <a-col :span="12" class="right">
          <a-button type="primary" @click="addFn">发布消息</a-button>
        </a-col>
      </a-row>
      <a-table
      :data-source="messageList"
      :rowKey="(record, index) => index"
      :pagination="pagination"
      class="userTable"
      @change="handleChange">
      <a-table-column key="id" title="ID" data-index="id" :width="105">
        <template slot-scope="id">
          <span style="padding-left:20px">{{id}}</span>
        </template>
      </a-table-column>
      <a-table-column key="coverPictureInfo" title="封面" :width="120">
        <template slot-scope="coverPictureInfo">
          <img class="head-img" :src="getImg(coverPictureInfo)" alt="">
        </template>
      </a-table-column>
      <a-table-column key="messageInfo" title="标题" :ellipsis=true>
        <template slot-scope="messageInfo">
          <a-tooltip placement="topLeft">
          <template slot="title">
            <div class="pos-title">{{ messageInfo.messageTitle ? messageInfo.messageTitle : '- -' }}</div>
            <div class="pos-desc" style="white-space: pre-wrap;" v-html="contentFormat(messageInfo.messageBody)"></div>
          </template>
          <div class="pos-title">{{ messageInfo.messageTitle ? messageInfo.messageTitle : '- -' }}</div>
          <div class="pos-desc">{{ messageInfo.messageBody ? messageInfo.messageBody : '- -' }}</div>
        </a-tooltip>
        </template>
      </a-table-column>
      <a-table-column key="messageCategory" title="类型" data-index="messageCategory">
         <template slot-scope="messageCategory">
          <span>{{ messageCategory | messageCategoryFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="pushStatusInfo" title="发布状态">
         <template slot-scope="pushStatusInfo">
           <span v-if="pushStatusInfo.messageStatus === 2" class="date">已删除</span>
          <span v-else :class="pushStatusInfo.pushStatus === 1 ? 'date' : ''">{{ pushStatusInfo.pushStatus | pushStatusFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="pushTime" title="发布时间" data-index="pushTime" :width="180" sorter="true">
        <template slot-scope="pushTime">
          <span class="date">{{ pushTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <!-- <a-table-column key="comments" title="阅读量" sorter="true" data-index="comments" /> -->
      <a-table-column key="isPush" title="是否推送" data-index="isPush">
        <template slot-scope="isPush">
          <span class="isPush">{{ isPush === 0 ? '/' : '推送' }}</span>
        </template>
      </a-table-column>
      <a-table-column key="action" title="操作"  :width="250">
        <template slot-scope="record">
          <span class="eye-w" @click="infoFn(record)" v-if="viewBtn">
            <svg-icon iconName="view" class="eye" />
            <span class="action">查看</span>
          </span>
          <span class="eye-w" @click="editFn(record)" style="margin-left: 32px" v-if="updateBtn && record.messageStatus !== 2 && record.pushStatus === 0">
            <svg-icon iconName="edit" class="edit" />
            <span class="action">修改</span>
          </span>
          <span class="delete-w" style="margin-left: 32px" v-if="delBtn && record.messageStatus !== 2">
            <a-popconfirm title="确定删除该消息？" ok-text="确定" cancel-text="取消" @confirm="confirmDelete(record.id)">
              <svg-icon iconName="delete" class="delete" />
              <span class="action">删除</span>
            </a-popconfirm>
          </span>
        </template>
      </a-table-column>
    </a-table>
    </a-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HTTP from '@/api/message';
import PageInfo from '@/utils/page';
import Tools from '@/utils/tools';

export default {
  name: 'Message',
  props: [],
  components: { },
  computed: {
  },
  data() {
    return {
      searchInfo: {
        inputType: undefined,
        searchInput: '',
      },
      order: '',
      sort: '',
      configInfoList: [],
      messageList: [],
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      // showPop: false,
      companyId: '',
      companyName: '',
      comments: '',
      btnRules: Tools.IsInArr(),
      viewBtn: false,
      updateBtn: false,
      delBtn: false,
    };
  },
  mounted() {
    this.getData();
    this.getMessageCategory();
    this.viewBtn = this.btnRules && this.btnRules.indexOf('btn_view') > -1;
    this.updateBtn = this.btnRules && this.btnRules.indexOf('btn_edit') > -1;
    this.delBtn = this.btnRules && this.btnRules.indexOf('btn_delete') > -1;
  },
  filters: {
    pushStatusFormat(value) {
      if (value === 0) {
        return '未发送';
      } if (value === 1) {
        return '已发送';
      } if (value === -1) {
        return '发送失败';
      }
      return '- -';
    },
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
  methods: {
    contentFormat(value) {
      // console.log(value);
      return value && value.replace(/\n/g, '<br/>');
    },
    getImg(value) {
      if (value.coverPictureUrl) {
        return value.coverPictureUrl;
      }
      // eslint-disable-next-line import/no-dynamic-require
      return require(`@/assets/icons/png/cover${value.messageCategory}.png`);
    },
    getData() {
      const { searchInfo, order, sort } = this;
      const params = {
        page: this.pagination.current,
        rows: this.pagination.pageSize,
        messageCategory: this.searchInfo.messageCategory,
        order,
        sort,
      };
      // if (searchInfo.inputType && searchInfo.searchInput) {
      //   params[searchInfo.inputType] = searchInfo.searchInput;
      // }
      if (searchInfo.searchInput) {
        params.messageTitle = searchInfo.searchInput;
      }
      HTTP.getWebMessageList(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.messageList = res.data.rows || [];
            this.pagination.total = res.data.records || 0;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
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
    resetSearch() {
      this.searchInfo = {
        inputType: undefined,
        searchInput: '',
      };
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.order = '';
      this.sort = '';
      this.getData();
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    },
    pageChange(current) {
      this.pagination.current = current;
      // 下面再请求分页接口，重新渲染数据
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      // 请求分页接口，重新渲染数据
      this.pagination.current = 1;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    handleChange(pagination, filters, sorter) {
      if (sorter.order) {
        this.order = sorter.columnKey;
        this.sort = sorter.order === 'ascend' ? 'asc' : 'desc';
      } else {
        this.order = '';
        this.sort = '';
      }
      this.getData();
    },
    infoFn(data) {
      if (data.messageCategory === 1) {
        this.$router.push({ name: 'MessageInfo', query: { id: data.id } });
      } else {
        window.open(decodeURI(data.messageUrl));
      }
    },
    editFn(data) {
      this.$router.push({ name: 'AddMessage', query: { id: data.id } });
    },
    addFn() {
      this.$router.push({ name: 'AddMessage' });
    },
    onConfirm() {
      this.onCancel();
      this.getData();
    },
    onCancel() {
      // this.showPop = false;
      this.companyName = '';
      this.comments = '';
      this.companyId = '';
    },
    confirmDelete(id) {
      console.log(id);
      const params = {
        id,
      };
      // console.log(params);
      HTTP.deleteMessageInfoById(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message.success(res.data.message);
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  .listName {
    padding: 16px 32px;
    color: rgba(0, 21, 41, 1);
    font-size: 18px;
  }
  .headImage {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  ::v-deep .ant-table-thead > tr:first-child > th:first-child {
    padding-left: 32px;
  }
  ::v-deep .ant-table-pagination.ant-pagination {
    padding-right: 30px;
  }
  .left {
    text-align: left;
    color: #001529;
    font-size: 18px;
    padding: 16px 32px
  }
  .right {
    text-align: right;
    padding: 16px 32px
  }
  .action {
    color: #f03947;
    padding-left: 6px;
    font-size: 9px;
    font-style: normal;
  }
  .eye {
    color: #f03947;
    font-size: 14px;
  }
  .eye-w {
    cursor: pointer;
  }
  .delete-w {
    cursor: pointer;
    .action {
      color: rgba(72,78,91,1) !important;
    }
  }
  .head-img {
    position: relative;
    width: 104px;
    height: 80px;
    border-radius: 4px;
  }
  .date {
    color: #99a0aa;
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
}
</style>

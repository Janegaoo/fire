/* eslint-disable no-unused-vars */
<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-11 17:39:59
 * @Descripttion:
-->

<template>
  <div class="code-info">
    <a-row>
      <a-col :span="12" class="left">兑换码详情</a-col>
      <a-col :span="12" class="right">
        <span class="tip">导出为Excel格式文件</span>
        <a-button type="primary" @click="expotExcelFn">导出兑换码</a-button>
      </a-col>
    </a-row>
    <a-descriptions title="基本信息">
      <a-descriptions-item label="分销商">{{ createCodeInfo.companyName }}</a-descriptions-item>
      <a-descriptions-item label="会员类型">{{ createCodeInfo.packageName }}</a-descriptions-item>
      <a-descriptions-item label="兑换/数量">{{ createCodeInfo.exchanged }}/{{ createCodeInfo.codeQuantity }} 个</a-descriptions-item>
      <a-descriptions-item label="兑换码ID">{{ createCodeInfo.id }}</a-descriptions-item>
      <a-descriptions-item label="兑换码类型">{{ createCodeInfo.createCodeType }}</a-descriptions-item>
      <a-descriptions-item label="兑换码生成时间">{{ createCodeInfo.createTime | dateFormat }}</a-descriptions-item>
      <a-descriptions-item label="备注">{{ createCodeInfo.comments }}</a-descriptions-item>
      <a-descriptions-item label="有效期" v-if="createCodeInfo.validType === 0">{{ createCodeInfo.duration }}</a-descriptions-item>
      <a-descriptions-item label="有效期" v-else>{{ createCodeInfo.fixedExpireDate | dateFormat }}</a-descriptions-item>
    </a-descriptions>
    <div class="tab-tit">激活码明细</div>
    <a-table
      :data-source="tableData.rows"
      :rowKey="(record, index) => index"
      :pagination="pagination" class="codeTable">
      <a-table-column key="activationCode" title="兑换码" data-index="activationCode" />
      <a-table-column key="codeStatus" title="兑换状态" data-index="codeStatus">
        <template slot-scope="codeStatus">
          <span>{{ codeStatus === 1 ? '已兑换' : '未兑换' }}</span>
        </template>
      </a-table-column>
      <a-table-column key="nickName" title="兑换用户" data-index="nickName">
        <template slot-scope="nickName">
          <span>{{ nickName || '- -' }}</span>
        </template>
      </a-table-column>
      <a-table-column key="startTime" title="兑换日期" data-index="startTime">
        <template slot-scope="startTime">
          <span class="date">{{ startTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="endTime" title="到期日期" data-index="endTime">
        <template slot-scope="endTime">
          <span class="date">{{ endTime | dateFormat }}</span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import PageInfo from '@/utils/page';
import HTTP from '@/api/code';
import moment from 'moment';

export default {
  name: 'Info',
  props: [],
  components: { },
  data() {
    return {
      showPop: false,
      tableData: [],
      createCodeInfo: {},
      id: +this.$route.query.id,
      userId: +this.$route.query.userId,
      pagination: new PageInfo(this.pageChange, this.onShowSizeChange),
      downloadId: '',
      filedata: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        userId: this.userId,
        id: this.id,
        page: this.pagination.current,
        rows: this.pagination.pageSize,
      };
      HTTP.getCodeListByCreateId(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.tableData = res.data;
            this.createCodeInfo = res.data.createCodeInfo;
            this.pagination.total = res.data.records;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    // eslint-disable-next-line no-unused-vars
    pageChange(current, pageSize) {
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
    expotExcelFn() {
      const params = {
        userId: this.userId,
        id: this.id,
        reportType: 1,
      };
      HTTP.getExportSubmit(params)
        .then((res) => {
          if (res.data.status === 900000) {
            this.downloadId = res.data.message;
            setTimeout(() => {
              // this.download();
              window.open(`/api/export/download?userId=${this.userId}&id=${this.downloadId}`);
            }, 1000);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    exportFile() {
      console.log(this.filedata);
      const text = this.filedata.data;
      const name = `兑换码列表${moment(new Date().getTime()).utcOffset(480).format('YYYYMMDD')}.xlsx`;
      // 下载文件
      const content = new Blob([text], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(content, name);
      } else {
        // const url = window.URL.createObjectURL(content);
        // const a = document.createElement('a');
        // a.style.display = 'none';
        // a.href = url;
        // a.download = name;
        // document.body.appendChild(a);
        // a.click();
        // window.URL.revokeObjectURL(url);
        // document.body.removeChild(a);
        Window.open(text);
      }
    },
    download() {
      const params = {
        userId: this.userId,
        id: this.downloadId,
      };
      HTTP.getExportDownload(params)
        .then((res) => {
          if (res.status === 200) {
            this.filedata = res;
            this.exportFile();
          } else {
            this.$message.error(res.statusText);
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
$darkColor: #001529;
$lightColor: #99a0aa;
.code-info {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding: 16px 32px;
  background: #fff;
  .left {
    text-align: left;
    color: $darkColor;
    font-size: 18px;
  }
  .right {
    text-align: right;
  }
  .tip {
    color: $lightColor;
    font-size: 12px;
    padding-right: 12px;
  }
  .action {
    color: #f03947;
    padding-left: 6px;
    font-size: 9px;
  }
  .eye {
    color: #f03947;
    width: 14px;
    height: 9px;
  }
  .date {
    color: $lightColor;
  }
  .ant-table {
    color: #001529;
  }
  .codeTable {
    margin-top: 10px;
  }
  .tab-tit {
    font-size: 16px;
    color: rgba(0,21,41,1);
    border-top: 1px solid #e3e5e9;
    padding-top: 20px;
    padding-bottom: 8px;
  }
}

</style>

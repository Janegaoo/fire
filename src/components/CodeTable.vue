<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Jane
 * @LastEditTime: 2020-08-24 16:32:54
 * @Descripttion:
-->

<template>
  <div :class="pageName === 'code'? 'code-table pad-class' : 'code-table'">
    <a-table
      :data-source="tableData"
      :rowKey="(record, index) => index"
      :pagination="pagination"
      @change="handleChange">
      <a-table-column key="id" title="分销商ID" data-index="id" v-if="pageName === 'code'" :width="105">
        <template slot-scope="id">
          <span style="padding-left:20px">{{id}}</span>
        </template>
      </a-table-column>
      <a-table-column key="companyName" title="分销商" data-index="companyName"  v-if="pageName === 'code'"/>
      <a-table-column key="packageName" title="会员类型" data-index="packageName" />
      <a-table-column key="validType" title="兑换码类型" data-index="validType" :width="110">
        <template slot-scope="validType">
          <span>{{codeType[validType]}}</span>
        </template>
      </a-table-column>
      <a-table-column key="validValue" title="有效期" data-index="validValue">
        <template slot-scope="validValue, record">
          <span v-if="record.validType === 0">{{validValue}}{{dateType[record.validValueType]}}</span>
          <span v-else>{{record.fixedExpireDate | dateFormatShort}}</span>
        </template>
      </a-table-column>
      <a-table-column key="exchanged" title="已兑换" sorter="true"  data-index="exchanged" :width="100">
        <template slot-scope="exchanged">
          <span>{{ exchanged }}个</span>
        </template>
      </a-table-column>
      <a-table-column key="codeQuantity" title="总数量" sorter="true" data-index="codeQuantity" :width="100">
        <template slot-scope="codeQuantity">
          <span>{{ codeQuantity }}个</span>
        </template>
      </a-table-column>
      <a-table-column key="createTime" title="生成时间" sorter="true" data-index="createTime">
        <template slot-scope="createTime">
          <span class="date">{{ createTime | dateFormat }}</span>
        </template>
      </a-table-column>
      <a-table-column key="comments" title="备注" data-index="comments" />
      <a-table-column key="action" title="操作">
        <template slot-scope="record">
          <span class="eye-w" @click="infoFn(record)">
            <svg-icon iconName="view" class="eye" />
            <span class="action">详情</span>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
// @ is an alias to /src
import SERVER_CONFIG from '@build/config';
import { mapGetters } from 'vuex';

export default {
  name: 'CodeTable',
  props: [
    'tableData',
    'pagination',
    'pageName',
  ],
  data() {
    return {
      codeType: ['固定期限', '指定期限'],
      dateType: ['个月', '年'],
    };
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
  },
  methods: {
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
      window.open(`${SERVER_CONFIG.URL}hotspot/index.html#/preview?userId=${v.userId}&id=${v.id}&isFrom=2`);
    },
    infoFn(data) {
      this.$router.push({ name: 'CodeInfo', query: { id: data.id, userId: this.getUserInfo.id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.code-table {
  ::v-deep .ant-table-pagination.ant-pagination {
    padding-right: 15px;
  }
  .view {
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
  .date {
    color: #99a0aa;
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
    .action {
      color: rgba(72,78,91,1) !important;
    }
  }
}
.pad-class {
  ::v-deep .ant-table-thead > tr:first-child > th:first-child {
    padding-left: 32px;
  }
}
</style>

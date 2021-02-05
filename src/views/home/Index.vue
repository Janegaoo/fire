<!--
 * @Author: Jane
 * @Date: 2020-06-11 17:15:22
 * @LastEditors: Yawen
 * @LastEditTime: 2020-08-31 16:24:27
 * @Descripttion:
-->

<template>
  <div class="home">
    <a-row :gutter="12">
      <a-col class="gutter-row" :span="6">
        <div class="analysis-info">
          <div class="top-title">总作品量</div>
          <div class="top-value">{{ this.total.allAlbum }}</div>
          <a-divider />
          <div class="bottom">
            今日新增作品
            <span>{{ this.total.todayAlbum }}</span>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="analysis-info">
          <div class="top-title">总用户数</div>
          <div class="top-value">{{ this.total.allUser }}</div>
          <a-divider />
          <div class="bottom">
            今日新增用户
            <span>{{ this.total.todayUser }}</span>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="analysis-info">
          <div class="top-title">总浏览量</div>
          <div class="top-value">{{ this.total.allView }}</div>
          <a-divider />
          <div class="bottom">
            今日浏览量
            <span>{{ this.total.todayView }}</span>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="analysis-info">
          <div class="top-title">会员用户数</div>
          <div class="top-value">{{ this.total.allMember }}</div>
          <a-divider />
          <div class="bottom">
            今日新增会员用户
            <span>{{ this.total.todayMember }}</span>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="analysis-content">
      <a-tabs defaultActiveKey="0" @change="tabChange">
        <a-tab-pane v-for="(items, key) in DATAS" :tab="items.tab" :key="key">
          <div class="tab-content">
            <a-layout>
              <a-layout-content>
                <div id="chartsContent" class="charts-content">
                  <div class="tab-parent">
                    <div class="tab-name">{{ items.tabName1 }}</div>
                    <div class="tab-select">
                      <a-select v-model="items.totalType" style="width: 160px;" @change="selectChange">
                        <a-select-option value="7">最近一周</a-select-option>
                        <a-select-option value="30">最近一个月</a-select-option>
                        <a-select-option value="90">最近三个月</a-select-option>
                        <a-select-option value="365">最近一年</a-select-option>
                        <a-select-option value="0">自定义时间段</a-select-option>
                      </a-select>
                      <div id="viewDatePicker" style="float: right;">
                        <a-range-picker style="width: 240;marginLeft:8px;" :value="[moment(items.timeString[0], dateFormat),moment(items.timeString[1], dateFormat)]" @openChange="openChange" @change="viewDateChange" :allowClear="false" :open="items.isOpenF">
                          <a-icon slot="suffixIcon" type="calendar" />
                        </a-range-picker>
                        </div>
                    </div>
                  </div>
                  <div class="tab-charts">
                      <div :id="items.chartId" style="height: 380px;"></div>
                  </div>
                </div>
              </a-layout-content>
              <a-layout-sider width="240" v-if="items.userImg">
                <div class="tab-name">{{ items.tabName2 }}</div>
                <a-row class="tab-sort" :gutter="[0, 6]" v-for="(v, i) in items.sortData" :key="i">
                  <a-col :span="3" :class="i <= 2 ? 'tab-id' : ''">
                    {{ i + 1 }}
                  </a-col>
                  <a-col :span="3">
                    <img class="head-image" :src="v.headImage">
                  </a-col>
                  <a-col :span="12">
                    <span class="nike-name">{{ v.nikeName }}</span>
                  </a-col>
                  <a-col :span="6" style="text-align: right;">
                    {{ v.count }}
                  </a-col>
                </a-row>
              </a-layout-sider>
              <a-layout-sider width="240" v-else>
                <div class="tab-name">{{ items.tabName2 }}</div>
                <a-row class="tab-sort" :gutter="[0, 6]" v-for="(v, i) in items.sortData" :key="i">
                  <a-col :span="3" :class="i <= 2 ? 'tab-id' : ''">
                    {{ i + 1 }}
                  </a-col>
                  <a-col :span="15">
                    <span class="company-name">{{ v.companyName }}</span>
                  </a-col>
                  <a-col :span="6" style="text-align: right;">
                    {{ v.usedCount }}
                  </a-col>
                </a-row>
              </a-layout-sider>
            </a-layout>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import HTTP from '@/api/home';
import moment from 'moment';

export default {
  name: 'Home',
  props: [],
  data() {
    return {
      total: {
      },
      tab: 0,
      viewData: [],
      memberData: [],
      dateFormat: 'YYYY-MM-DD',
      DATAS: [
        {
          tab: '作品量',
          tabName1: '作品发布量趋势',
          tabName2: '总作品量排名',
          chartId: 'albumChart',
          sortData: [],
          isOpenF: false,
          totalType: '7',
          timeString: [moment(new Date((new Date()).setDate((new Date()).getDate() - 6)), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')],
          myChart: {},
          userImg: true,
        }, {
          tab: '浏览量',
          tabName1: '作品浏览量趋势',
          tabName2: '总浏览量排名',
          chartId: 'viewChart',
          sortData: [],
          isOpenF: false,
          totalType: '7',
          timeString: [moment(new Date((new Date()).setDate((new Date()).getDate() - 6)), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')],
          myChart: {},
          userImg: true,
        }, {
          tab: '会员用户数',
          tabName1: '会员用户数趋势',
          tabName2: '分销商会员排名',
          chartId: 'memberChart',
          sortData: [],
          isOpenF: false,
          totalType: '7',
          timeString: [moment(new Date((new Date()).setDate((new Date()).getDate() - 6)), 'YYYY-MM-DD'), moment(new Date(), 'YYYY-MM-DD')],
          myChart: {},
          userImg: false,
        },
      ],
      initChartF: false,
      dateArr: [],
      valueArr: [],
    };
  },
  computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
  },
  mounted() {
    const loadEcharts = setInterval(() => {
      if (document.getElementById('albumChart')) {
        this.getSysAlbumTotalByDate();
        clearInterval(loadEcharts);
      }
    }, 500);
    this.getSysStatistics();
    this.getSysSortInfo();
  },
  methods: {
    moment,
    selectChange(v) {
      if (this.tab === 0) {
        this.DATAS[0].totalType = v;
        if (v === '0') {
          this.DATAS[0].isOpenF = true;
        } else {
          this.getSysAlbumTotalByDate();
        }
      } else if (this.tab === 1) {
        this.DATAS[1].totalType = v;
        if (v === '0') {
          this.DATAS[1].isOpenF = true;
        } else {
          this.getSysViewTotalByDate();
        }
      } else if (this.tab === 2) {
        this.DATAS[2].totalType = v;
        if (v === '0') {
          this.DATAS[2].isOpenF = true;
        } else {
          this.getSysMemberTotalByDate();
        }
      }
    },
    viewDateChange(time, timeString) {
      if (timeString) {
        if (this.tab === 0) {
          this.DATAS[0].totalType = '0';
          this.DATAS[0].timeString = timeString;
          this.getSysAlbumTotalByDate();
        } else if (this.tab === 1) {
          this.DATAS[1].totalType = '0';
          this.DATAS[1].timeString = timeString;
          this.getSysViewTotalByDate();
        } else if (this.tab === 2) {
          this.DATAS[2].totalType = '0';
          this.DATAS[2].timeString = timeString;
          this.getSysMemberTotalByDate();
        }
      }
    },
    openChange(v) {
      if (this.tab === 0) {
        this.DATAS[0].isOpenF = v;
      } else if (this.tab === 1) {
        this.DATAS[1].isOpenF = v;
      } else if (this.tab === 2) {
        this.DATAS[2].isOpenF = v;
      }
    },
    tabChange(key) {
      this.tab = key;
      if (key === 1 && this.viewData.length <= 0) {
        this.getSysViewTotalByDate();
      } else if (key === 2 && this.memberData.length <= 0) {
        this.getSysMemberTotalByDate();
      }
    },
    getSysStatistics() {
      HTTP.sysStatistics()
        .then((res) => {
          if (res.data.status === 200) {
            this.total = res.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getSysSortInfo() {
      HTTP.sysSortInfo()
        .then((res) => {
          if (res.data.status === 200) {
            this.DATAS[0].sortData = res.data.webAlbumSort;
            this.DATAS[1].sortData = res.data.webViewSort;
            this.DATAS[2].sortData = res.data.webCompanySort;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getSysAlbumTotalByDate() {
      let params = {
        sysUserId: this.getUserInfo.id,
        totalType: +this.DATAS[0].totalType,
        type: 0,
      };
      if (this.DATAS[0].totalType === '0') {
        params = {
          ...params,
          startDate: this.DATAS[0].timeString[0],
          endDate: this.DATAS[0].timeString[1],
        };
        this.DATAS[0].isOpenF = false;
      }
      HTTP.sysAlbumTotalByDate(params)
        .then((res) => {
          if (res.data.status === 200) {
            this.dateArr = [];
            this.valueArr = [];
            (res.data.TotalByDay).map((item) => {
              this.dateArr.push(item.days);
              this.valueArr.push(item.count);
              return item;
            });
            if (this.DATAS[0].totalType !== '0') {
              this.DATAS[0].timeString = [this.dateArr[0], this.dateArr[this.dateArr.length - 1]];
            }
            this.DATAS[0].myChart = this.$echarts.init(document.getElementById('albumChart'));
            this.DATAS[0].myChart.clear();
            const option = this.getOption(this.dateArr, this.valueArr, '作品量');
            this.DATAS[0].myChart.setOption(option);
            window.onresize = () => {
              this.DATAS[0].myChart.resize();
            };
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    getSysViewTotalByDate() {
      let params = {
        sysUserId: this.getUserInfo.id,
        totalType: +this.DATAS[1].totalType,
        type: 0,
      };
      if (this.DATAS[1].totalType === '0') {
        params = {
          ...params,
          startDate: this.DATAS[1].timeString[0],
          endDate: this.DATAS[1].timeString[1],
        };
        this.DATAS[1].isOpenF = false;
      }
      HTTP.sysViewTotalByDate(params)
        .then((res) => {
          if (res.data.status === 200) {
            const dateArr = [];
            const valueArr = [];
            (res.data.TotalByDay).map((item) => {
              dateArr.push(item.days);
              valueArr.push(item.count);
              return item;
            });
            if (this.DATAS[1].totalType !== '0') {
              this.DATAS[1].timeString = [dateArr[0], dateArr[dateArr.length - 1]];
            }
            this.viewData = res.data.TotalByDay;
            this.DATAS[1].myChart = this.$echarts.init(document.getElementById('viewChart'));
            this.DATAS[1].myChart.clear();
            const option = this.getOption(dateArr, valueArr, '浏览量');
            this.DATAS[1].myChart.setOption(option);
            window.onresize = () => {
              this.DATAS[1].myChart.resize();
            };
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getSysMemberTotalByDate() {
      let params = {
        sysUserId: this.getUserInfo.id,
        totalType: +this.DATAS[2].totalType,
        type: 0,
      };
      if (this.DATAS[2].totalType === '0') {
        params = {
          ...params,
          startDate: this.DATAS[2].timeString[0],
          endDate: this.DATAS[2].timeString[1],
        };
        this.DATAS[2].isOpenF = false;
      }
      HTTP.sysMemberTotalByDate(params)
        .then((res) => {
          if (res.data.status === 200) {
            const dateArr = [];
            const valueArr = [];
            (res.data.TotalByDay).map((item) => {
              dateArr.push(item.days);
              valueArr.push(item.count);
              return item;
            });
            if (this.DATAS[2].totalType !== '0') {
              this.DATAS[2].timeString = [dateArr[0], dateArr[dateArr.length - 1]];
            }
            this.memberData = res.data.TotalByDay;
            this.DATAS[2].myChart = this.$echarts.init(document.getElementById('memberChart'));
            this.DATAS[2].myChart.clear();
            const option = this.getOption(dateArr, valueArr, '新增会员用户');
            this.DATAS[2].myChart.setOption(option);
            window.onresize = () => {
              this.DATAS[2].myChart.resize();
            };
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(() => {
          this.$message.error('请求失败！');
        });
    },
    getOption(date, value, type) {
      const option = {
        color: ['rgba(88, 175, 255, 1)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: 'rgba(rgba(0,21,41,1)',
              width: 2,
              opacity: 0.4,
            },
          },
          backgroundColor: 'rgba(0, 21, 41, 0.7)',
          formatter(params) {
            let result = '';
            params.forEach((item) => {
              result += `<div style='padding:2px 10px'><div style='font-size:12px;color:rgba(153, 160, 170, 1);margin-bottom:1px'>${item.name}</div><div>${item.marker} <span style='margin-right:35px'>${item.seriesName}</span><span>${item.value}</span></div></div>`;
            });
            return result;
          },
        },
        grid: {
          left: 65,
          right: 40,
          top: 20,
          bottom: 30,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: date,
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(227, 229, 233, 1)',
              },
            },
            axisLabel: {
              color: 'rgba(153, 160, 170, 1)',
              fontSize: 12,
              formatter(params) {
                if (date.length > 89) {
                // 需要换行
                  const newName = `${params.slice(0, 5)}\n${params.slice(5, 10)}`;
                  // let newName= "<div><div>" + params.slice(0,5) + "</div><div>" + params.slice(5,10) + "</div></div>";
                  return newName;
                }
                return params;
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(227, 229, 233, 1)',
              },
            },
            axisLabel: {
              color: 'rgba(153, 160, 170, 1)',
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(227, 229, 233, 1)',
              },
            },
          },
        ],
        series: [
          {
            name: type,
            type: 'line',
            smooth: 0.5,
            symbol: 'image://http://kr-test.xiaohongwu.com/images/symbol.svg',
            symbolSize: [20, 20],
            showSymbol: false,
            lineStyle: {
              color: 'rgba(88, 175, 255, 1)',
              width: 4,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(88, 175, 255, 0.2)', // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(88, 175, 255, 0)', // 100% 处的颜色
                }],
                global: false, // 缺省为 false
              },
            },
            data: value,
          },
        ],
      };
      return option;
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
}
.analysis-info {
  padding: 16px 32px;
  background: #fff;
  border-radius: 2px;
  .top-title {
    font-size: 14px;
    color: rgba(153, 160, 170, 1);
    margin-bottom: 5px;
  }
  .top-value {
    font-size: 24px;
    color: rgba(0, 21, 41, 1);
  }
  .bottom {
    font-size: 14px;
    color: rgba(72, 78, 91, 1);
    span {
      margin-left: 15px;
      // float: right;
    }
  }
  :global(.ant-divider-horizontal) {
    margin: 9px 0 15px 0;
    color: rgba(227, 229, 233, 1);
  }
}
.analysis-content{
  margin-top: 16px;
  border-radius: 2px;
  background-color: #fff;
  :global{
    .ant-tabs-nav .ant-tabs-tab{
      padding: 16px 12px 10px 16px;
      margin-right: 0;
      font-size: 14px;
    }
    .ant-tabs-nav .ant-tabs-tab-active{
      font-size: 16px;
    }
    .ant-tabs-ink-bar{
      width: 32px !important;
      left: 22px !important;
      height: 4px;
    }
    .ant-tabs-bar{
      margin: 0 0 8px 0;
    }
  }
}
.tab-content{
  padding: 16px;
  .charts-content{
    padding-right: 30px;
    overflow-y: hidden;
  }
  .tab-name{
    color: rgba(72, 78, 91, 1);
    font-size: 14px;
    margin-bottom: 30px;
  }
  .tab-parent{
    padding-right: 14px;
    overflow: hidden;
    .tab-name{
      float: left;
    }
    .tab-select{
      float: right;
    }
  }
  .tab-sort {
    font-size: 12px;
    line-height: 24px;
    .tab-id {
      color: #F03947;
    }
  }
  .head-image{
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  .red{
    color: rgba(240, 57, 71, 1);
  }
  .another{
    color: rgba(153, 160, 170, 1);
  }
  .nike-name{
    display: inline-block;
    max-width: 112px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .company-name{
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tab-charts{
    width: 100%;
  }
}
</style>

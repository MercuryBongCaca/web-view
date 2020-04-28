<template>
  <div class="index-container">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card class="div1" shadow="never" align="center">
          <byui-icon
            :icon="['fas', 'address-book']"
            style="margin-top: 25%;"
          ></byui-icon>

          <br /><span class="ct1">合同办理</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="div1" shadow="never" align="center">
          <byui-icon
            :icon="['fas', 'shopping-cart']"
            style="margin-top: 25%;"
          ></byui-icon>

          <br /><span class="ct1">商品销售</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="div1" shadow="never" align="center">
          <byui-icon
            :icon="['fas', 'table']"
            style="margin-top: 25%;"
          ></byui-icon>
          <br /><span class="ct1">课程约课</span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="div1" shadow="never" align="center">
          <byui-icon
            :icon="['fas', 'users']"
            style="margin-top: 25%;"
          ></byui-icon>
          <br /><span class="ct1">学员管理</span>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>售课量/消课量</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="xsl"
          />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>课程总量统计</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="option"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>今日收入</span>
          </div>
          <div align="center" class="cbody">
            <h1>50,000</h1>
            <div align="right" style="padding: 0px 0px 0px 0px;">
              <span class="t1">▼</span> 1.5%
            </div>
          </div>

          <span>课程合同40,000</span>
          <el-progress :percentage="80"></el-progress>
          <span>商品10,000</span>
          <el-progress :percentage="20" color="#1989fa"></el-progress>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ByuiChart from "@/plugins/echarts";

export default {
  name: "Index",
  components: {
    ByuiChart,
  },
  data() {
    return {
      option: {
        title: {
          text: "总量3000",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["消课", "存课"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: 335,
                name: "消课",
              },
              {
                value: 310,
                name: "存课",
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },

      //销售量
      xsl: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        grid: {
          top: "4%",
          left: "2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "售课量",
            type: "line",
            data: [10, 52, 20, 33, 39, 33, 22, 10, 22, 23, 13, 29],
            smooth: true,
            areaStyle: {},
          },
          {
            name: "消课量",
            type: "line",
            data: [20, 12, 30, 23, 31, 13, 32, 12, 12, 13, 13, 29],
            smooth: true,
            areaStyle: {},
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.cbody {
  color: #28a745 !important;
}

.div1 {
  font-size: 2rem;
}

.ct1 {
  font-size: 1rem;
}

.div1:hover {
  font-size: 2.5rem;
}

.index-container {
  ::v-deep {
    .el-card__body {
      min-height: 200px;

      .echarts {
        width: 100%;
        height: 140px;
      }
    }
  }

  .bottom {
    margin-top: 5px;
    height: 40px;
    padding-top: 20px;
    border-top: 1px solid $base-border-color;
    text-align: left;
    color: #595959;
  }

  .table {
    width: 100%;
    background-color: #fff;
    color: #666;
    border-collapse: collapse;

    td {
      border-width: 1px;
      border-style: solid;
      border-color: #e6e6e6;
      position: relative;
      padding: 9px 15px;
      min-height: 20px;
      line-height: 20px;
      font-size: 14px;

      &:first-child {
        text-align: right;
        width: 50%;
      }
    }
  }

  .t1 {
    color: #28a745;
  }

  .bottom-btn {
    float: right;
    margin-top: 5px;

    button {
      margin: 5px 0 5px 10px;
    }
  }
}
</style>

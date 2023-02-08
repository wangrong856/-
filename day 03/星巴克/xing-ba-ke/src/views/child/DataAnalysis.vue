<!-- 数据分析 -->
<template>
  <div class="analysis">
    <div class="title">数据分析</div>
    <div class="data_top">
      <div class="data_top_left" id="piebox"></div>
      <div class="data_top_right" id="bardata"></div>
    </div>
    <div class="data_bottom" id="linebox"></div>
    <div class="tab">
      <div
        class="tab_item"
        v-for="(item, index) in caipinArr"
        :key="index"
        @click="changeColor(item, index)"
        :class="[itemIndex == index ? 'changColor' : '']"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "@/utils/api";
import * as echarts from "echarts";
export default {
  name: "Com",
  data() {
    return {
      caipinArr: ["素菜类", "荤菜类", "酒水类", "龙虾"],
      itemIndex: 0,
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 请求所有数据
    this.getData();
  },

  methods: {
    // 请求所有数据
    async getData() {
      let res = await API.Analysis();
      // console.log(res, "数据");
      let {
        data: { data },
      } = res;
      // 调用饼图
      this.pieData(data);
      // 调用柱状图
      this.barData(data);
      // 折线图
      this.lineData(data[2]);
    },
    // 请求饼图数据
    pieData(data) {
      var chartDom = document.getElementById("piebox");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "菜品销量排行榜",
          left: 10,
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: 10,
          bottom: 50,
        },
        series: [
          {
            name: "Access From",
           
            type: "pie",
            radius: "50%",
            data: data[0],
            
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 请求柱状图
    barData(data) {
      // console.log(data[1]);
      var XList = [];
      var YList = [];
      data[1].forEach((item) => {
        // console.log(item);
        XList.push(item.age);
        YList.push(item["sales-volume"]);
      });
      var chartDom = document.getElementById("bardata");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "客户年龄分布",
          left: 10,
        },
        xAxis: {
          type: "category",
          data: XList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: YList,
            label: {
              show: true,
              position: "inside",
            },
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 请求折线图数据
    lineData(data) {
      let XList = [];
      let YList = [];
      data.forEach((item) => {
        XList.push(item.month);
        YList.push(item["sales-volume"]);
      });
      var chartDom = document.getElementById("linebox");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "菜品分类销量趋势",
          left: 10,
        },
        xAxis: {
          type: "category",
          data: XList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: YList,
            type: "line",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 点击切换
    async changeColor(item, index) {
      console.log(item, index);
      this.itemIndex = index;
      let res = await API.SwitchCate({ cateid: item });
      console.log(res);
      let {
        data: { data },
      } = res;
      this.lineData(data);
    },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.analysis {
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .data_top {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    .data_top_left {
      width: 49%;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
    }
    .data_top_right {
      width: 49%;
      height: 400px;
      padding: 20px;
      box-sizing: border-box;
      background-color: #fff;
    }
  }
  .data_bottom {
    width: 100%;
    height: 500px;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 16px;
  }
  .tab {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 400px;
    .tab_item {
      border: 2px solid #ccc;
      width: 90px;
      height: 36px;
      text-align: center;
      line-height: 36px;
      border-left: 0;
    }
    .tab_item:first-child {
      border-left: 2px solid #ccc;
    }
    .changColor {
      background-color: #5a99f6;
      color: #fff;
    }
  }
}
</style>

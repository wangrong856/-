<!--
 * @Author: SHI SHUAI
 * @Date: 2022-12-13 08:29:41
 * @LastEditTime: 2022-12-14 14:49:43
 * @email: 18749045979@163.com
 * @Description: 订单管理
 -->

<template>
  <div class="order">
    <div class="order_title">订单管理</div>
    <!-- 查询 -->
    <el-row>
      <el-col :span="16">
        <span class="lable">交易时间 : </span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>

        <span class="zhuohao">桌号</span>
        <el-select v-model="value" placeholder="">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="success" @click="filterList">查询</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <div class="table">
      <el-table :data="orderData" border style="width: 100%">
        <el-table-column prop="order_time" label="交易时间"></el-table-column>
        <el-table-column prop="table_number" label="桌号"></el-table-column>
        <el-table-column
          prop="number_of_diners"
          label="用餐人数"
        ></el-table-column>
        <el-table-column label="菜品详情">
          <template slot-scope="{ row }">
            <el-button @click="changeBox(row)">详细菜单</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="sett_amount" label="交易金额"> </el-table-column>
        <el-table-column label="交易状态">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              :class="scope.row.transac_status == 'success' ? 'btnColor' : ''"
              @click="handleDelete(scope.$index, scope.row)"
              >{{
                scope.row.transac_status == "success" ? "已结账" : "未结账"
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 菜单详情弹框 -->
    <el-dialog :visible.sync="dialogTableVisible" width="500px">
      <div class="big_box" v-for="(item, index) in goodList" :key="index">
        <div class="title_name namecas">第{{ index + 1 }}次下单</div>
        <div class="as">
          <div
            class="centent_box"
            v-for="(item_a, index_a) in item.goods_list"
            :key="index_a"
          >
            <div class="centent_left">{{ item_a.name }}</div>
            <div class="centent">{{ item_a.good_specs }}</div>
            <div class="centent_right">
              {{ item_a.quantity }}{{ item_a.unit }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "OrderList",
  data() {
    return {
      // 桌号
      value: "",
      options: [],
      // 表格数据
      orderData: [],
      total: 0,
      // 请求数据参数
      orderGet: {
        page: 0,
        table_number: "",
        order_time: "[]",
      },
      // 模态框显隐
      dialogTableVisible: false,

      // 开始时间和结束时间
      value1: [],

      // 菜单详细数组
      goodList: [],
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getData();
    this.getBel();
  },

  methods: {
    // 请求数据
    async getData() {
      let res = await API.ObtainOrder(this.orderGet);
      // console.log(res, "数据");
      let {
        data: {
          data: { result, total },
        },
      } = res;
      this.orderData = result;
      this.total = total;
    },
    // 桌号级联选择器
    async getBel(value) {
      let res = await API.Gettable();
      let {
        data: { data },
      } = res;
      this.options = data;
    },
    // 菜单详细
    async changeBox(row) {
      this.dialogTableVisible = true;
      // console.log(row);
      let res = await API.ViewOrder({ id: row._id });
      // console.log(res,'菜单详细');
      let {
        data: { data: data },
      } = res;
      console.log(data);
      this.goodList = data;
    },
    // 按桌号筛选
    async filterList() {
      console.log(this.value, "valiue");
      let res = await API.ObtainOrder({
        page: 0,
        table_number: this.value,
        order_time: JSON.stringify(this.value1),
      });
      // console.log(res, "数据");
      let {
        data: {
          data: { result, total },
        },
      } = res;
      this.orderData = result;
      this.total = total;
    },
    // // 获取时间 筛选
    // async getTime() {
    //   let res = await API.ObtainOrder({
    //     page: 0,
    //     table_number: "",
    //     order_time: JSON.stringify(this.value1),
    //   });
    //   // console.log(res, "数据");
    //   let {
    //     data: {
    //       data: { result, total },
    //     },
    //   } = res;
    //   this.orderData = result;
    //   this.total = total;
    // },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.order {
  .order_title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .el-date-editor {
    border: 0;
  }
  .zhuohao {
    margin: 0 10px;
  }
  // 表格
  .table {
    margin-top: 20px;
  }
  .btnColor {
    background-color: green;
    border: 0;
  }
  .title_name {
    font-weight: bold;
    font-size: 17px;
    padding-bottom: 10px;
  }
  .centent_box {
    display: flex;
    line-height: 30px;
    justify-content: space-between;
  }
  .el-dialog {
    width: 30%;
  }
  .namecas {
    margin-top: 20px;
  }
  .cidbox {
    width: 100%;
    .cidList {
      width: 100%;
      .cid_item {
        line-height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>

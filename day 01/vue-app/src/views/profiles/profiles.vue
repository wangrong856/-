<template>
  <div class="profiles">
    <el-card class="box-card">
      <el-form ref="form" :model="form" :inline="true" size="small">
        <el-form-item label="时间筛选:">
          <el-date-picker
            v-model="form.data1"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div class="line" :span="1">--</div>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.data2"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
        <el-form-item style="width: 323px; padding-left: 343px">
          <el-button type="primary" @click="addEdit" v-manager>提交</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        border
        style="min-width: 1058px; max-width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center">
          <template v-slot="{ row }">
            <div><i class="el-icon-time"></i>{{ row.date | momentGs }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align="center"
        ></el-table-column>
        <el-table-column label="收入" align="center">
          <template v-slot="{ row }">
            <div style="color: rgb(228, 121, 117)">+ {{ row.income }}</div>
          </template>
        </el-table-column>
        <el-table-column label="支出" align="center">
          <template v-slot="{ row }">
            <div style="color: rgb(105, 208, 113)">- {{ row.expend }}</div>
          </template></el-table-column
        >
        <el-table-column
          prop="cash"
          label="账号现金"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template v-slot="{ row }">
            <div>
              <el-button
                v-manager
                size="mini"
                type="danger"
                @click="deleteProfiles(row._id)"
                >删除</el-button
              >
              <el-button
                v-manager
                size="mini"
                type="warning"
                @click="editProfiles(row)"
                >编辑</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.page_num"
        :page-sizes="pageObj.page_sizes"
        :page-size="pageObj.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <edit-dailog
      :dialogObj="dialogObj"
      :addBody="addBody"
      @submitAddEdit="submitAddEdit"
    ></edit-dailog>
  </div>
</template>

<script>
// 引入请求数据的方法
import {
  getProfiles,
  deleteProfile,
  addProfile,
  editProfile,
} from "@/api/profiles";
import EditDailog from "@/components/header/EditDailog.vue";
export default {
  components: { EditDailog },
  name: "Day02Profiles",

  data() {
    return {
      // 时间区间的数据
      form: {
        data1: "",
        data2: "",
      },
      // 渲染的数据
      tableData: [],
      // 全部数据
      allList: [],
      // 过滤的数据
      cloneData: [],
      // 分页数据
      pageObj: {
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        page_num: 1,
      },
      // 总条数
      total: 0,
      // 修改数据
      dialogObj: {
        show: false,
        title: " 添加自定义信息",
        option: "add",
      },
      // 添加数据
      addBody: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
      },
    };
  },

  mounted() {
    // 页面开始时调用
    this.getTab();
  },

  methods: {
    // 过滤点击事件触发函数
    onSubmit() {
      // 非空校验
      if (this.form.data1 == "" || this.form.data2 == "") {
        return this.$message({
          message: "时间区间不能为空",
          type: "warning",
        });
      }
      // 每次点击的时候让他重新从一页5条开始
      this.pageObj.page_num = 1;
      this.pageObj.page_size = 5;
      // 调用筛选函数
      this.tableList();
    },
    // 请求所有数据的方法
    async getTab() {
      // 请求所有数据
      const data = await getProfiles();
      // 对所有数据进行赋值
      this.allList = data;
      // 对渲染数据进行赋值
      this.tableData = data;
      // 获取所有数据的总条数
      this.total = this.allList.length;
      // 调用判断函数
      this.switchSearch();
    },
    // 条数变化的时候触发
    handleSizeChange(val) {
      // 对当前条数进赋值
      this.pageObj.page_size = val;
      // 调用判断函数
      this.switchSearch();
    },
    // 页数变化的时候触发
    handleCurrentChange(val) {
      // 对当前页数进赋值
      this.pageObj.page_num = val;
      // 调用判断函数
      this.switchSearch();
    },
    // 筛选函数
    tableList() {
      // 拿到选择的时间戳
      const data1 = new Date(this.form.data1).getTime() || "";
      const data2 = new Date(this.form.data2).getTime() || "";
      // // 判断是否为空
      if (data1 == "" && data2 == "") {
        // 未空就返回全部数据 赋值总条数
        this.total = this.allList.length;
        // 调用判断函数
        return this.switchSearch();
      }
      // 对筛选的数据进行过滤
      this.tableData = this.allList.filter((item) => {
        // 获取所有数据的时间戳
        const time = new Date(item.date).getTime();
        // 返回判断条件成立的数据
        return time >= data1 && time <= data2;
      });
      // 对筛选的数据赋值给总数据
      this.total = this.tableData.length;
      // 对数据进行复制
      this.cloneData = this.tableData;
      // 调用判断函数
      this.switchSearch();
    },
    // 拿到当前页渲染的函数
    pageList(data) {
      // 每页的第一条
      var a = (this.pageObj.page_num - 1) * this.pageObj.page_size;
      // 每页的第二条
      var b = this.pageObj.page_num * this.pageObj.page_size;
      // 1.在这里使用 slice截取不影响源数组
      this.tableData = data.slice(a, b);
      // 2.这里使用的是filter过滤
      // this.tableData = data.filter((item, index) => {
      // return index > (this.pageObj.page_num - 1) * this.pageObj.page_size && index < this.pageObj.page_num * this.pageObj.page_size
      // })
    },
    // 判断是不是筛选函数
    switchSearch(data) {
      // 判断是不是筛选的数据
      if (
        this.total < this.allList.length ||
        this.allList.length < this.tableData.length
      ) {
        // 将筛选的数据传递到页面渲染的函数
        this.pageList(this.cloneData);
        // 返回数据不执行
      } else {
        this.pageList(this.allList);
      }
    },
    async deleteProfiles(id) {
      await deleteProfile(id).catch((err) => err);
      this.$message.success("删除成功");
      this.getTab();
    },
    addEdit() {
      this.dialogObj.title = "添加自定义信息";
      this.dialogObj.option = "add";
      this.dialogObj.show = true;
      this.addBody = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
      };
    },
    async submitAddEdit(v) {
      if (v._id || this.dialogObj.option == "edit") {
        await editProfile(v).catch((err) => err);
        this.$message.success("修改成功");
      } else {
        await addProfile(v).catch((err) => err);
        this.$message.success("添加成功");
      }
      this.dialogObj.show = false;
      this.getTab();
    },
    editProfiles(row) {
      this.dialogObj.title = "修改信息";
      this.dialogObj.option = "edit";
      this.addBody = { ...row };
      this.dialogObj.show = true;
    },
  },

  computed: {},
};

// https://img0.baidu.com/it/u=2915911931,592907800&fm=253&fmt=auto&app=138&f=GIF?w=560&h=315
</script>

<style lang="scss" scoped>
.profiles {
  width: 100%;
  height: 100%;
  background: rgb(234, 238, 242);
  // overflow: auto;
  .line {
    text-align: center;
  }
  ::v-deep .el-card {
    max-height: 560px;
    .el-table__body-wrapper {
      min-width: 1135px;
      min-height: 385px;
      max-height: 385px;
      overflow: auto;
    }
  }
}
</style>

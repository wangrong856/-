<template>
  <div class="user">
    <div class="user_title">用户列表</div>
    <div class="table">
      <el-table :data="userData" border style="width: 100%">
        <el-table-column prop="time" label="注册时间"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="{ row }">
            <el-image
              style="width: 50px; height:50px"
              :src="row.head"
              :preview-src-list="srcList"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column prop="position" label="职业"> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="fenye">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "Com",
  data() {
    return {
      userData: [],
      pageNum: 0,
      pageSize: 10,
      total: 0,
      srcList:[]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getData();
  },

  methods: {
    // 请求数据
    async getData() {
      let res = await API.PullUserList({ page: this.pageNum  });
      console.log(res, "用户数据");
      let {
        data: {
          data: { result, total },
        },
      } = res;
      this.userData = result;
      this.total = total;
      this.srcList = result.map((item) => {
        console.log(item);
        return item.head
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getData();
    },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.user {
  .user_title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
}
</style>

<!-- 菜品管理 -->
<template>
  <div class="variety">
    <div class="variety_title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/varietylist' }">菜品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="btn_box">
      <el-button type="success" class="btn" @click="addList"
        >添加菜品</el-button
      >
    </div>
    <div class="table">
      <el-table :data="varietyData" border style="width: 100%">
        <el-table-column prop="time" label="创建时间"></el-table-column>
        <el-table-column prop="category" label="类目"></el-table-column>
        <el-table-column prop="name" label="菜品名称"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="{ row }">
            <el-image
              v-for="(item,index) in row.image"
              :key="index"
              style="width: 50px; height: 50px"
              :src="item.url"
              :preview-src-list="srcList"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="unitprice" label="价格"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.onsale ? false : true"
              @click="handleDelete(scope.$index, scope.row)"
              >{{scope.row.onsale ? '下架' : '已下架'}}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "Com",
  data() {
    return {
      varietyData: [],
      pageNum: 0,
      total: 0,
      // 图片数组
      srcList: [],
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
      let res = await API.Obtaindishes({ page: this.pageNum });
      console.log(res);
      let {
        data: {
          data: { result, total },
        },
      } = res;
      this.varietyData = result;
      this.srcList = result.map((item) => item.image);
      this.total = total;
    },
    // 添加菜品
    addList() {
      this.dialogTableVisible = true;
      this.$router.push("/upload");
    },
    // 修改
    handleEdit(index, row) {
      console.log(index, row);
      let item = JSON.stringify(row)
      this.$router.push(`/upload?item=${item}&id=${row._id}`);
    },
    // 下架
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确定要下架此菜品吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          let res = await API.Fromsale({id:row._id})
          console.log(res,'删除');
          let {status,data:{msg} } = res
          if(status == 200){
            this.$message.success(msg)
            this.getData()
            
          }else{
            this.$message.error(msg)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.variety {
  .variety_title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .btn_box {
    margin-bottom: 20px;
    text-align: right;
  }
  .input_box {
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>

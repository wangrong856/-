<!-- 员工管理 -->
<template>
  <div class="userinfo">
    <div class="user_title">员工详情</div>
    <div class="btn_box" style="margin: 20px 0">
      <el-button type="success" @click="addUser">添加员工</el-button>
      <el-button type="danger" @click="delUser">批量删除</el-button>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{
            scope.row.time
          }}</template></el-table-column
        >
        <el-table-column prop="jobnumber" label="工号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
        <el-table-column prop="address" label="是否离职">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.quit"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeState(row._id, row.quit)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹框 -->
    <el-dialog :visible.sync="dialogVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="工号">
          <el-input v-model="form.jobnumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="001">男</el-radio>
          <el-radio v-model="form.sex" label="002">女</el-radio>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="是否离职">
          <el-radio v-model="form.quit" label="001">在职</el-radio>
          <el-radio v-model="form.quit" label="002">已离职</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "UserInfo",
  data() {
    return {
      tableData: [],
      pageNum: 0,
      dialogVisible: false,
      form: {
        jobnumber: "",
        name: "",
        sex: "",
        position: "",
        quit: "",
      },
      // 删除id数组.
      DelId:[],
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
      let res = await API.Getemployees({ page: this.pageNum });
      console.log(res, "员工数据");
      let {
        data: {
          data: { result, total },
        },
      } = res;
      this.tableData = result;
    },
    // 添加员工按钮
    addUser() {
      this.dialogVisible = true;
      // console.log(this.form);
    },
    // 添加员工
    async onSubmit() {
      let res = await API.Addem(this.form);
      console.log(res, "添加");
      let {
        data: { msg },
        status,
      } = res;
      if (status == 200) {
        this.$message.success(msg);
        this.dialogVisible = false;
        this.form = {}
        // 从新请求
        this.getData();
      }
    },
    // 修改状态
    async changeState(id, quit) {
      console.log(id,quit);
      let res = await API.Modifyresi({ id, quit });
      console.log(res, "修改");
      let {
        data: { msg },
        status,
      } = res;
      if (status == 200) {
        this.$message.success(msg);
      }else{
        this.$message.error(msg);
      }
    },
    // 点击选中触发
    handleSelectionChange(event){
      // console.log(event,'组');
      this.DelId = event.map((item => item._id))
      console.log(this.DelId);
    },
    // 删除触发
     delUser(){
      this.$confirm('此操作将永久删除这些员工吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async() => {
          let res = await API.Deleteemp({arrayid:this.DelId})
      // console.log(res,'删除');
      let {status,data:{msg}} = res
      if(status == 200){
        this.$message.success(msg)

        this.getData()
      }else{
        this.$message.error(msg)
      }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    }
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.user_title{
  font-size: 20px;
  font-weight: 700;
}
</style>

<!--
 * @Author: SHISHUAI 11608972+shishuai_ss@user.noreply.gitee.com
 * @Date: 2022-12-13 15:01:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-15 16:26:00
 * @FilePath: \xing-ba-ke\src\views\child\Upload.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-=>
<!--  -->
<template>
  <div>
    <div class="variety_title" style="margin: 20px 0">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/varietylist' }"
          >菜品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ruleForm.id == '' ?  '添加菜品' : '编辑菜品' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜品类目">
        <el-select v-model="ruleForm.category" placeholder="">
          <el-option
            v-for="item in optionsList"
            :label="item.label"
            :value="item.value"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜品名称">
        <el-input v-model="ruleForm.name" placeholder=""></el-input>
      </el-form-item>

      <el-form-item label="菜品价格(元)" class="input_box">
        <el-input v-model="ruleForm.unitprice" placeholder=""></el-input>
        <el-select v-model="ruleForm.unit" placeholder="">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜品图片">
        <el-upload
          :action="upLoadUrl"
          :headers="headerObj"
          list-type="picture-card"
          :on-success="changeFile"
          :file-list="ruleForm.image"
          name="file"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "Com",
  data() {
    return {
      ruleForm: {
        id: "",
        category: "",
        name: "",
        unitprice: "",
        unit: "",
        image: [],
      },
      rules: {},
      // 菜品分数
      value: "",
      options: [],
      // 菜品类目
      valueName: "",
      optionsList: [],
      // 上传图片地址
      upLoadUrl: "https://meituan.thexxdd.cn/apit/uploadres",
      // 配置请求头
      headerObj: {
        Authorization: localStorage.getItem("Token"),
      },

      itemId: "",
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 调用获取类目
    this.getvarieyList();
    // 获取菜品单位
    this.getObtainunit();
    console.log(this.$route.query.id, "luyou ");
    this.itemId = this.$route.query.id;
    this.ruleForm = JSON.parse(this.$route.query.item);
    this.ruleForm.id = this.itemId;
  },

  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // alert("submit!");

          if (this.ruleForm.id == "") {
            // console.log(this.ruleForm);
            let res = await API.Putdishes(this.ruleForm);
            // console.log(res, "添加");
            let {
              data: { msg },
              status,
            } = res;
            if (status == 200) {
              this.$message.success(msg);
              this.$router.push("/varietylist");
            } else {
              this.$message.error(msg);
            }
          } else {
            // 修改
            console.log(this.ruleForm, "000000");
            let res = await API.Editdishes(this.ruleForm);
            console.log(res, "修改");
            let {
              data: { msg },
              status,
            } = res;
            if (status == 200) {
              this.$message.success(msg);
              this.$router.push("/varietylist");
            } else {
              this.$message.error(msg);
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取菜品类目
    async getvarieyList() {
      let res = await API.Obtaincate();
      // console.log(res,'leimu');
      let {
        data: { data },
      } = res;
      this.optionsList = data;
    },
    // 获取菜品单位
    async getObtainunit() {
      let res = await API.Obtainunit();
      // console.log(res, "单位");
      let {
        data: { data },
      } = res;
      this.options = data;
    },
    // 图片上传成功是触发
    changeFile(response, file, filterList) {
      console.log(response, file, filterList);
      const { data, msg } = response;
      this.$message.success(msg);
      let objImg = {
        url: data,
        uid: file.uid,
      };
      this.ruleForm.image.push(objImg);
    },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  padding: 20px 40px 20px 20px;
  background-color: #fff;
}
.input_box {
  .el-input {
    width: 200px;
    margin-right: 10px;
  }
}
</style>

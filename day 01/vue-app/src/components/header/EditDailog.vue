<template>
  <div class="EditDailog">
    <p class="p_footer">EditDailog</p>
    <el-dialog
      :title="dialogObj.title"
      :visible.sync="dialogObj.show"
      width="50%"
    >
      <el-form
        :model="addBody"
        status-icon
        :rules="addBodyRules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        :hide-required-asterisk="true"
      >
        <el-form-item label="收支类型" prop="type">
          <el-select
            v-model="addBody.type"
            placeholder="请选择收支类型"
            style="width: 100%"
          >
            <el-option
              v-for="(t, i) in formList"
              :key="i"
              :label="t"
              :value="t"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述" prop="describe">
          <el-input
            type="text"
            v-model="addBody.describe"
            placeholder="请填写描述信息"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input
            type="number"
            v-model="addBody.income"
            placeholder="请填写支出"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input
            type="number"
            v-model="addBody.expend"
            placeholder="请填写收入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户现金" prop="cash">
          <el-input
            type="number"
            v-model="addBody.cash"
            placeholder="请填写账户现金"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="text"
            v-model="addBody.remark"
            placeholder="请填写备注"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: flex-end">
          <el-button @click="dialogObj.show = false">取 消</el-button>
          <el-button type="primary" @click="submitAddEdit">确 定</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer"> </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditDailog",

  data() {
    return {
      addBodyRules: {
        type: [{ required: true, message: "请选择收支类型", trigger: "blur" }],
        describe: [
          { required: true, message: "请填写描述信息", trigger: "blur" },
        ],
        income: [{ required: true, message: "请填写支出", trigger: "blur" }],
        expend: [{ required: true, message: "请填写收入", trigger: "blur" }],
        cash: [{ required: true, message: "请填写账户现金", trigger: "blur" }],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },
      formList: [
        "提现",
        "提现手续费",
        "充值",
        "充值优惠券",
        "优惠礼券",
        "转账",
      ],
    };
  },

  props: {
    dialogObj: {
      type: Object,
      require: true,
    },
    addBody: {
      type: Object,
    },
  },

  mounted() {},

  methods: {
    submitAddEdit() {
      this.$refs.ruleForm.validate((v) => {
        if (!v) {
          return this.$message.error("校验失败");
        }
      });
      this.$emit("submitAddEdit", this.addBody);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  margin-top: 1vh !important;
}
.p_footer {
  color: #cecece;
  text-align: center;
  font-size: 12px;
  font-family: monospace;
  font-weight: 300;
  line-height: 50px;
}
</style>

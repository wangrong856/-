<template>
  <div class="login">
    <login-header></login-header>
    <!-- <div class="avatar_box">
        <img src="@/assets/logo.png" />
      </div> -->
    <div class="center_box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        style="padding: 6% 0.25rem"
        label-width="100px"
        :hide-required-asterisk="true"
      >
        <el-form-item prop="name" label="用户名">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            placeholder="请输入确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="员工" value="员工"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="box_login">
            <el-button
              type="primary"
              @click="submitForm"
              :loading="switchLogin"
              >{{ !switchLogin ? "注册" : "注册中" }}</el-button
            >
            <!-- <el-button @click="$refs.ruleForm.resetFields()">重置</el-button> -->
          </div>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>是否跳转到登录页？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button
        ><el-button @click="navLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { register } from "@/api/user";
export default {
  components: { loginHeader },
  name: "VueAppLogin",

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        identity: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      centerDialogVisible: false,
      switchLogin: false,
    };
  },

  mounted() {},

  methods: {
    async submitForm() {
      this.$refs.ruleForm.validate((v) => {
        if (!v) {
          return this.$message.error("校验失败");
        }
      });
      let res = await register(this.ruleForm).catch((err) => err);
      if (res.__v === 0) {
        this.$message.success("注册成功");
        this.centerDialogVisible = true;
      } else {
        if (res.response.status === 400 || res.response.status === 502) {
          return this.$message.error(res.response.data.msg || "邮箱已被注册");
        }
        this.$message.error("注册失败");
      }
    },
    navLogin() {
      this.centerDialogVisible = false;
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: linear-gradient(
    to right top,
    #b381dc80,
    #eb81c080,
    #ff8ea180,
    #ffa88980,
    #ffc68280,
    #e6d88780,
    #c8e89b80,
    #a9f5bc80,
    #81f2e280,
    #7deafe80,
    #9ddeff80,
    #c4d0ff80
  );
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #ffff;
    border-radius: 50%;
    padding: 10px;
    -webkit-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
    // background-color: #fff;
    background-image: linear-gradient(
      to right top,
      #b381dc,
      #eb81c0,
      #ff8ea1,
      #ffa889,
      #ffc682,
      #e6d887,
      #c8e89b,
      #a9f5bc,
      #81f2e2,
      #7deafe,
      #9ddeff,
      #c4d0ff
    );
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, -120%);
    transform: translate(-50%, -120%);
    opacity: 0;
    animation-name: identifier;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .center_box {
    width: 28.125rem;
    // height: 18.75rem;
    padding: 0px 0px;
    border-radius: 0.4375rem;
    opacity: 0;
    animation-name: identifier;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
    // background-image: linear-gradient(to right top, #f3ae8e, #e0c288, #c2d699, #a2e5bd, #8cf0e9);
  }
}

::v-deep .el-form-item__content {
  flex: 1;
  display: flex;
  // justify-content: flex-end; //去右边
  .box_register {
    position: absolute;
    left: 0;
    font-size: 1rem;
    color: #eee;
  }
}

::v-deep .el-select {
  width: 100%;
}

@keyframes identifier {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
</style>

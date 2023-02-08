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
        style="padding: 18% 1.25rem"
      >
        <el-form-item prop="email">
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
            prefix-icon="iconfont icon-user"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            prefix-icon="iconfont icon-3702mima"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="box_register">
            点击去<router-link
              style="color: rgb(120, 175, 249); cursor: pointer"
              to="/register"
              >注册</router-link
            >
          </div>
          <div class="box_login">
            <el-button
              type="primary"
              @click="submitForm"
              :loading="switchLogin"
              >{{ !switchLogin ? "登录" : "登录中" }}</el-button
            >
            <el-button @click="$refs.ruleForm.resetFields()">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "VueAppLogin",

  data() {
    return {
      ruleForm: {
        email: "2@163.com",
        password: "123456",
      },
      rules: {
        email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      switchLogin: false,
    };
  },

  mounted() {},

  methods: {
    ...mapActions("login", ["userLogin"]),
    submitForm() {
      this.switchLogin = true;
      this.$refs.ruleForm.validate((v) => {
        if (!v) {
          return this.$message.error("校验失败");
        }
      });
      this.userLogin(this.ruleForm).catch(err=>err).finally((e) => {
        this.switchLogin = false;
        return e
      });
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

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #ffff;
    border-radius: 50%;
    padding: 10px;
    -webkit-box-shadow: 0 0 10px #ddd;
    box-shadow: 0 0 10px #ddd;
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
    height: 18.75rem;
    padding: 0px 0px;
    border-radius: 0.4375rem;
    opacity: 0;
    animation-name: identifier;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
  }
}

::v-deep .el-form-item__content {
  flex: 1;
  display: flex;
  justify-content: flex-end; //去右边
  .box_register {
    position: absolute;
    left: 0;
    font-size: 1rem;
    color: #605d5d;
  }
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

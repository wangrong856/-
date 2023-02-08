<template>
  <div class="login_box">
    <div class="login_from">
      <div class="login_header"></div>
      <el-form :model="loginForm" :rules="rulesFrom" ref="loginFrom">
        <el-form-item prop="mobile">
          <el-input
            type="text"
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
          >
            <template>
              <i
                slot="prefix"
                class="el-input__icon"
                style="position: absolute; top: 3px"
              >
                <svg-icon iconClass="user" color="#8b99a3" size="16" />
              </i> </template
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="!switchEyes ? 'password' : 'text'"
            v-model="loginForm.password"
            placeholder="请输入密码"
          >
            <template>
              <div slot="prefix">
                <i
                  class="el-input__iconÍ"
                  style="position: absolute; top: 6px; left: 10px"
                >
                  <svg-icon iconClass="password" color="#8b99a3" />
                </i>
              </div>
            </template>
            <template>
              <div slot="suffix">
                <i
                  style="
                    position: absolute;
                    top: 8px;
                    right: 6px;
                    cursor: pointer;
                  "
                  @click="switchEyes = !switchEyes"
                  v-show="!switchEyes"
                >
                  <svg-icon iconClass="eye" color="#8b99a3" />
                </i>
                <i
                  style="
                    position: absolute;
                    top: 8px;
                    right: 6px;
                    cursor: pointer;
                  "
                  @click="switchEyes = !switchEyes"
                  v-show="switchEyes"
                >
                  <svg-icon iconClass="eye-open" color="#8b99a3" />
                </i>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginBtn" :loading="loginLoad">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",

  data() {
    const validateMobile = (rule, val, callback) => {
      const regexp = /^1[2-9]\d{9}$/;
      regexp.test(val) ? callback() : callback(new Error("手机号格式不正确"));
    };
    return {
      loginForm: {
        mobile: "13800000002",
        password: "123456",
      },
      rulesFrom: {
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "密码长度应该为6-16位",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            validator: validateMobile,
            trigger: "blur",
          },
        ],
      },
      switchEyes: false,
      loginLoad: false,
    };
  },

  methods: {
    ...mapActions(["login/Login"]),
    loginBtn() {
      this.$refs.loginFrom
        .validate()
        .then(() => {
          this["login/Login"](this.loginForm)
            .then(() => {
              this.$message.success("登录成功");
              this.$router.push("/");
            })
            .finally(() => {
              this.loginLoad = false;
            });
        })
        .catch(() => {
          this.$message.error("用户名或密码校验失败");
        })
        .finally(() => {
          this.loginLoad = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_box {
  width: 100%;
  height: 100%;
  background: url(@/assets/common/login.jpg) no-repeat;
  background-position: 50%;
  position: relative;
  .login_from {
    position: absolute;
    width: 450px;
    height: 56%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .login_header {
      width: 97%;
      margin-left: 4px;
      height: 44px;
      background: url(@/assets/common/login-logo.png);
      margin-bottom: 43px;
    }
    ::v-deep .el-input {
      input {
        width: 450px;
        background-color: rgb(217, 227, 253);
        height: 52px;
        border: none;
        color: #fff;
        padding-left: 45px;
      }
      .el-input__icon {
        margin: 1px 5px;
      }
    }
    ::v-deep .el-button {
      width: 450px;
      height: 64px;
      background: rgb(80, 125, 246);
      color: #fff;
      border: none;
      font-size: 20px;
      font-family: serif;
    }
    ::v-deep .el-form-item__error {
      color: #fff;
    }
  }
}
</style>

<!--登录  -->
<template>
  <div class="login">
    <div class="login_content">
      <div class="login_title">扫码点餐客户端</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password></el-input>
        </el-form-item>
        <div class="login_text" @click="changeLogin">
          {{ islogin ? "注册" : "登录" }}
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="btn"
            >{{ islogin ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {API} from '@/utils/api'
import jwt_decode from 'jwt-decode'
export default {
  name: "Login",
  data() {
    return {
      islogin: true,
      ruleForm: {
        account: "17600000000",
        password: "s123456",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  components: {},

  computed: {},

  mounted() {
    // console.log(API,'API');
  },

  methods: {
    // 登录和注册文字切换切换
    changeLogin(){
        this.islogin = !this.islogin;
    },
    // 登录和注册
    submitForm(formName) {
        this.$refs[formName].validate( async(valid) => {
          if (valid) {
            // alert('submit!');
            if(this.islogin){
                // 登录
                let res = await API.Login(this.ruleForm)
                console.log(res ,'登录');
                let {status,data:{msg,data:{token}}} = res
                if(status == 200){
                    this.$message.success(msg)
                    console.log(token);
                    // 存储到本地
                    localStorage.setItem('Token',token)
                     // 跳转到首页
                     this.$router.push('/home')
                    // 存储到vuex中
                    this.$store.dispatch('setUser',this.ruleForm)
                }else{
                    this.$message.error(msg)
                }
            }else{
                // 注册
                console.log('注册');
                let res = await API.Register(this.ruleForm)
                console.log(res,'注册');
                let {status,data:{msg}} = res
                if(status === 200){
                    this.$message.success(msg)
                    // 注册成功切换为登录
                    this.islogin = true
                }else{
                    this.$message.error(msg)
                }
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background: url("../assets/背景.webp") no-repeat center center;
  background-size: 100% auto;
  position: relative;
  .login_content {
    width: 500px;
    height: 300px;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 20px;
    background-color: #efdb8c;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .login_title {
      text-align: center;
      font-size: 30px;
      margin: 0 0 20px 0;
    }
    .demo-ruleForm {
      .login_text {
        text-align: right;
      }
      .btn {
        width: 240px;
        height: 36px;
        margin-left: 50px;
        background-color: #7ebe50;
      }
    }
  }
}
</style>

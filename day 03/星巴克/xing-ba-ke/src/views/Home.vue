<!-- 主页 -->
<template>
  <div class="home">
    <el-container class="qqq">
      <el-header>
        <div class="title">星巴克后台管理</div>
        <div class="btn"><el-button type="primary" @click="loginOut">退出</el-button></div>
      </el-header>
      <el-container class="www">
        <my-aside></my-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyAside from "@/components/MyAside.vue";
export default {
  name: "Com",
  data() {
    return {};
  },

  components: { MyAside },

  computed: {},

  mounted() {},

  methods: {
    loginOut(){
      localStorage.removeItem('Token')
      this.$router.push('/login')
    }
  },
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .qqq{
    height: 100%;
  }
  .el-header {
    background: url("../assets/条.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .title {
      color: #fff;
      line-height: 60px;
      font-size: 20px;
      letter-spacing: 4px;
      font-weight: 700;
    }
    .btn{
      margin-top: 10px;
    }
  }

  .el-aside {
    background-color: #fdfdfd;
    color: #333;
  }

  .el-main {
    background-color: #f5f6f8;
    color: #333;
  }
}
.www{
  height: calc(100% - 60px);
}
</style>

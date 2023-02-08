<template>
  <el-container>
    <el-aside :width="!switchMenu ? '200px' : '64px'">
      <left-menu :switchMenu.sync="switchMenu"></left-menu>
    </el-aside>
    <el-container>
      <el-header>
        <home-header :switchMenu.sync="switchMenu"></home-header>
      </el-header>
      <el-main>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "./components/HomeHeader.vue";
import LeftMenu from "./components/LeftMenu.vue";
export default {
  components: { HomeHeader, LeftMenu },
  name: "VueAppIndex",

  data() {
    return {
      switchMenu: false,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
    position: relative;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
  }
  .el-header {
    height: 50px !important;
    background: -webkit-linear-gradient(bottom, #3d6df8, #5b8cff);
    padding: 0;
  }
  .el-main {
    // padding: 0;
  }
}
::v-deep .el-menu-item:hover {
  background: #fff !important;
  color: #5b8cff !important;
  .activeIcon {
    fill: #5b8cff !important;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-scrollbar {
  height: 100%;
  font-weight: 300;
}
::v-deep .el-scrollbar__wrap {
  overflow-y: scroll !important;
  overflow: visible;
}
</style>

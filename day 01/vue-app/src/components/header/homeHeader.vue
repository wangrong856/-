<template>
  <div class="homeHeader">
    <div class="header_left">
      <img src="../../assets/logo.png" alt="蓝图后台管理" />
      蓝图在线后台管理系统
    </div>
    <div class="header_right">
      <el-dropdown @command="commandOptions">
        <span class="el-dropdown-link">
          <div class="link_left">
            欢迎
            <span class="user_span">{{ userInfos.name }}</span>
          </div>
          <div class="link_right">
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rmoveToken } from "@/utils/autoToken";

export default {
  name: "HomeHeader",
  methods: {
    commandOptions(v) {
      switch (v) {
        case "info":
          this.userInfo();
          break;
        case "logout":
          this.navLogin();
          break;
      }
    },
    navLogin() {
      rmoveToken();
      this.$router.push("/login");
    },
    userInfo() {
      console.log("个人信息");
    },
  },

  computed: {
    ...mapGetters(["userInfos"]),
  },
};
</script>

<style lang="scss" scoped>
.homeHeader {
  padding: 2px;
  padding-left: 10px;
  background-color: rgb(53, 64, 85);
  display: flex;
  .header_left {
    width: 89%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 25px;
    letter-spacing: 2px;
    color: #fff;
    font-family: serif;
    img {
      height: 55px;
      vertical-align: middle;
    }
  }
  .header_right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-dropdown-link {
      color: #fff;
      display: flex;
      align-items: center;
      .link_left {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50px;
        .user_span {
          width: 100%;
          text-align: center;
          color: rgb(88, 153, 241);
          font-weight: bolder;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .el-dropdown {
      margin-left: 55px;
    }
  }
}
</style>

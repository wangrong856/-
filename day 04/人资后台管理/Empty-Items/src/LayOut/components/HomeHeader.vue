<template>
  <div class="homeHeader">
    <div class="h_svg">
      <svg-icon
        className="_menu"
        iconClass="hamburger2"
        color="#fff"
        v-show="!switchMenu"
        @click.stop.native="switchIcon()"
      ></svg-icon>
      <svg-icon
        className="_menu"
        iconClass="hamburger"
        color="#fff"
        v-show="switchMenu"
        @click.stop.native="switchIcon()"
      ></svg-icon>
    </div>
    <div class="h_con">
      <span class="user_select">*******{{ $t('route.company') }}</span>
      <div class="con_c">体验版</div>
      <div style="flex: 1"></div>
    </div>
    <div class="h_right">
      <div class="right_left">
        <el-dropdown @command="commandLang">
          <span>
            <svg-icon
              iconClass="language"
              style="width: 1.2rem; height: 1.5rem; margin: 0 10px"
              color="#fff"
            ></svg-icon>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="!langDisabled" command="zh">简体中文</el-dropdown-item>
            <el-dropdown-item :disabled="langDisabled" command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="fullscreen" @click="switchFull" v-if="!fullAction">
          <svg-icon
            iconClass="fullscreen"
            style="width: 1.2rem; height: 1.5rem; margin: 0 10px"
            color="#fff"
          ></svg-icon>
        </div>
        <div class="fullscreen" @click="switchFull" v-else>
          <svg-icon
            iconClass="exit-fullscreen"
            style="width: 1.2rem; height: 1.5rem; margin: 0 10px"
            color="#fff"
          ></svg-icon>
        </div>
      </div>
      <el-dropdown @command="commandSwitch">
        <span class="el-dropdown-link">
          <img :src="userimg" v-imgError="defaultImg" />
          <span class="p_username">{{ username }}</span
          ><i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="dashboard">首页</el-dropdown-item>
          <!-- <el-dropdown-item command="git">项目地址</el-dropdown-item> -->
          <el-dropdown-item divided command="out">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapGetters, mapMutations } from "vuex";
import screenfull from "screenfull";

export default {
  name: "HomeHeader",
  data() {
    return {
      fullAction: false,
      defaultImg: require("@/assets/logo.png"),
      langDisabled:false
    };
  },
  props: {
    switchMenu: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["login/removeVtoken"]),
    switchIcon() {
      this.$emit("update:switchMenu", !this.switchMenu);
    },
    commandLang(command) {
      if(command === 'zh'){
        this.$i18n.locale = 'zh'
        this.langDisabled = false
      }else{
        this.$i18n.locale = 'en'
        this.langDisabled = true
      }
    },
    switchFull() {
      if (!screenfull.isEnabled) {
        return this.$message.warning("当前全屏不可用")
      }
      this.fullAction = !this.fullAction;
      screenfull.toggle()
    },
    commandSwitch(command) {
      if (command === "dashboard") {
        router.push("/");
      } else {
        this["login/removeVtoken"]();
        router.push("/login");
      }
    },
  },
  computed: {
    ...mapGetters(["username", "userimg"]),
  },
};
</script>

<style lang="scss" scoped>
.homeHeader {
  width: 100%;
  height: 100%;
  display: flex;
  background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  .h_svg {
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    ._menu {
      font-size: 21px;
      cursor: pointer;
    }
  }
  .h_con {
    width: 70%;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    .con_c {
      width: 68px;
      height: 28px;
      background: #8ba7f7;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      border-radius: 9px;
      font-weight: 349;
      font-size: 13px;
    }
    .user_select {
      width: 178.64px;
      user-select: none;
    }
  }
  .h_right {
    width: 23%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .right_left {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .fullscreen {
        width: 48%;
      }
    }
    img {
      width: 30px;
      height: 30px;
      // vertical-align: middle;
      border-radius: 50px;
      margin-right: 4px;
    }
    .el-dropdown {
      color: #fff;
      user-select: none;
      .p_username {
        display: inline-block;
        width: 72px;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 6px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
::v-deep .el-dropdown-menu__item {
  width: 100px;
}
</style>

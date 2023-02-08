<template>
  <div class="leftnavBg">
    <div class="leftnavBg_header">
      <img
        src="@/assets/common/logo.png"
        :width="!switchMenu ? '127px' : '36px'"
      />
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :style="{ minWidth: !switchMenu ? '200px' : '56px' }"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#fff"
        :collapse="switchMenu"
        router
      >
        <div v-for="(t,i) in routersList" :key="i">
          <el-menu-item :index="t.path" v-if="!t.hidden">
            <svg-icon
              :iconClass="t.meta.icon"
              class="iconMenu"
              className="activeIcon"
              color="#fff"
            />
            <span slot="title">{{$t(`route.${t.name}`)}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LeftMenu",

  data() {
    return {};
  },

  props: {
    switchMenu: {
      type: Boolean,
      required: true,
    },
  },

  mounted() {},

  computed: {
    ...mapGetters(["routersList"]),
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.leftnavBg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(@/assets/common/leftnavBg.png) no-repeat 100% 100%;
  display: flex;
  flex-direction: column;
  .leftnavBg_header {
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7px;
    img {
      height: 90%;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .el-menu {
    border: none;
    .iconMenu {
      margin: 0px 20px 0px 3px;
      font-size: 18px;
    }
    span {
      font-weight: 300;
      margin-left: 4px;
    }
  }
}
</style>

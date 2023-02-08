<template>
  <div class="HomeAside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#354055"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item
        index="/home"
        :style="{ color: $route.path == '/home' ? '#ffd04b' : '#fff' }"
      >
        <template slot="title">
          <i
            class="el-icon-menu"
            :style="{
              color: $route.path == '/home' ? '#ffd04b' : 'rgb(145, 147, 152)',
            }"
          ></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu v-for="t in menuList" :key="t.id" :index="t.index + ''">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ t.name }}</span>
        </template>
        <el-menu-item
          v-for="ite in t.children"
          :key="ite.id"
          :index="ite.index + ''"
          :style="{ color: $route.path == ite.index ? '#ffd04b' : '#fff' }"
        >
          <i
            class="el-icon-menu"
            :style="{
              color:
                $route.path == ite.index ? '#ffd04b' : 'rgb(145, 147, 152)',
            }"
          ></i>
          <span slot="title">{{ ite.c_name }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HomeAside",

  data() {
    return {
      menuList: [
        {
          name: "资金管理",
          index: 1,
          id: 123,
          children: [
            {
              c_name: "资金流水",
              index: "/profiles",
              id: 1248,
            },
          ],
        },
        {
          name: "信息管理",
          index: 2,
          id: 134,
          children: [
            {
              c_name: "信息管理",
              index: 2.1,
              id: 1394,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.HomeAside {
  width: 200px;
  ::v-deep .el-menu {
    border: none;
  }
}
</style>

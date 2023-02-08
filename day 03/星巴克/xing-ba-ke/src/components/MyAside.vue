<!-- 菜单兰 -->
<template>
  <el-aside width="200px">
    <el-menu default-active="1" class="el-menu-vertical-demo" router>
      <el-menu-item
        :index="item.path"
        v-for="(item, index) in menuArr"
        :key="index"
        text-color="#000"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.text }}</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>员工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userinfo">员工详情</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="404">其他页面</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Com",
  data() {
    return {
      menuArr: [
        {
          text: "数据分析",
          icon: "el-icon-s-data",
          path: "/dataanalysis",
        },
        {
          text: "用户列表",
          icon: "el-icon-s-check",
          path: "/userlist",
        },
        {
          text: "订单管理",
          icon: "el-icon-folder",
          path: "/orderlist",
        },
        {
          text: "菜品管理",
          icon: "el-icon-food",
          path: "/varietylist",
        },
      ],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {},
  watch: {},
  mixins: [],
};
</script>
<style lang="scss" scoped>
.el-aside {
  color: #000;
}
</style>

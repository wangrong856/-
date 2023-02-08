


import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  
  // 登录
  
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login"),
  },
  // 首页
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home"),
    redirect: "/dataanalysis",
    children: [
      // 数据分析
      {
        path: "/dataanalysis",
        name: "dataanalysis",
        component: () => import("../views/child/DataAnalysis"),
      },
      // 用户列表
      {
        path: "/userlist",
        name: "userlist",
        component: () => import("../views/child/UserList"),
      },
      // 订单管理
      {
        path: "/orderlist",
        name: "orderlist",
        component: () => import("../views/child/OrderList"),
      },
      // 菜品管理
      {
        path: "/varietylist",
        name: "varietylist",
        component: () => import("../views/child/VarietyList"),
      },
      // 添加图片
      {
        path:"/upload",
        name: "upload",
        component: () => import("../views/child/Upload")
      },
      // 用户管理
      {
        path: "/userinfo",
        name: "userinfo",
        component: () => import("../views/child/UserInfo"),
      },
    ],
  },
  // 404
  {
    path: "*",
    name: "404",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

// //全局路由守卫的 前置钩子
// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   const isLogin = localStorage.getItem('Token') ? true : false;
//   //1:判断是否为登陆注册
//   if (to.path === "/login") {
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// });

export default router;

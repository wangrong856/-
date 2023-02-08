import Vue from 'vue'
import VueRouter from 'vue-router'
import nprogress from 'nprogress'
import store from '@/store'

nprogress.configure({ showSpinner: false }) // 关闭圆圈


Vue.use(VueRouter)

export const constRoutes = [
  {
    path: "/", component: () => import("@/LayOut"),
    redirect: '/dashboard',
    name:"dashboard",
    children: [
      { path: '/dashboard', component: () => import("@/views/dashboard") }
    ],
    meta: {
      name: "首页",
      icon: "dashboard"
    }
  },
  {
    path: '/login', component: () => import("@/views/login"),
    hidden: true
  },

  {
    path: "/404",
    name: "notFound",
    component: () => import("@/views/404/notFound"),
    hidden: true
  }
]

const router = new VueRouter({
  routes: [...constRoutes]
})

const whileList = ['/404', '/login']

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      location.replace('/')
      next('/')
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('login/getUserInfos')
        const asynrouter = await store.dispatch('permission/contentRouters', roles.menus)
        router.addRoutes([...asynrouter, {
          path: '*',
          redirect: "/404",
          hidden: true
        },])
        next(to.path)
      }
      // console.log(store.getters.userId);
      next()
    }
  } else {
    if (whileList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from, next) => {
  nprogress.done()
})

export default router

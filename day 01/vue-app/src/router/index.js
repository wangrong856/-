import { getToken } from '@/utils/autoToken'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import("@/views/login") },
  { path: '/register', component: () => import("@/views/register") },
  {
    path: '/', component: () => import("@/views/MainPage"),
    redirect:"/home",
    children: [
      {
        path: "/home", component: () => import("@/views/homePages/home")
      },
      {
        path: "/profiles", component: () => import("@/views/profiles/profiles")
      },

    ]
  },
  { path: '*', redirect: '/notFound' },
  { path: '/notFound', component: () => import("@/views/404/notFound") }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path === "/login" || to.path === "/register" || to.path === "/notFound"){
    next()
  }else{
    if(getToken()){
      next()
    }else{
      next("/login")
    }
  }
})

export default router

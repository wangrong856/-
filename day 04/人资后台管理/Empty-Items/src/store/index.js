import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import permission from './modules/permission'
// import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    token: (state) => state.login.token,
    userId: (state) => state.login.userInfo.userId,
    username: (state) => state.login.userInfo.username,
    userimg: (state) => state.login.userInfo.staffPhoto,
    routersList: (state) => state.permission.routers
  },
  modules: {
    login,
    permission
  },
  // plugins: [persistedstate()]
})

import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'
import persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    userInfos: (state) => state.login.userInfo
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
  },
  plugins: [persistedstate()]
})

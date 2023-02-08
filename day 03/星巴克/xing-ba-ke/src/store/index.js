
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo:{
      account:'',
      password:'',
    }
  },
  getters: {},
  mutations: {
    SET_USER(state,value){
      state.userInfo = value;
      // console.log(state.userInfo);
    }
  },
  actions: {
    setUser(context,value){
      context.commit('SET_USER',value);
    }
  },
  modules: {},
});

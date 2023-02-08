
import { setToken, getToken, removeToken } from "@/utils/auth/token";
import { login, getUserInfo, getUserImg } from "@/api/users";

const state = () => {
    return {
        token: getToken(),
        userInfo: {}
    }
}
const mutations = {
    setVtoken(state, t) {
        state.token = t
        setToken(t)
    },
    setUser(state,user){
        state.userInfo = user
    },
    removeVtoken(state) {
        state.token = null
        removeToken()
    }
}
const actions = {
    Login({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data).then(res => {
                if (res.success) {
                    commit("setVtoken", res.data)
                    resolve()
                } else {
                    reject(res.message)
                }
            })
        })
    },
    async getUserInfos({ commit }) {
        const {data} = await getUserInfo()
        const user = await getUserImg(data.userId)
        const userContent = {...data,...user.data}
        commit("setUser",userContent)
        return userContent
    }
}





export default {
    namespaced: true,
    state,
    mutations,
    actions
}
import { getToken, setToken, rmoveToken } from "@/utils/autoToken";
import { login } from "@/api/user";
import jwtDeocode from 'jwt-decode'
import router from "@/router";
import {Message} from "element-ui"


const state = () => {
    return {
        token: getToken() || 312,
        userInfo: null
    }
}

const mutations = {
    setToken(state, data) {
        state.token = data
        state.userInfo = jwtDeocode(data)
        setToken(data)
    },
    rmoveToken(state) {
        state.userInfo = null
        state.token = null
        rmoveToken()
    },
}

const actions = {
    userLogin({ commit }, data) {
        return new Promise((resolve, reject) => {
            login(data)
                .then(res => {
                    commit("setToken", res.token)
                    Message.success("登录成功")
                    router.push("/")
                    resolve(res)
                })
                .catch(err => reject(err))
        })
    },
    loginOut({commit}){
        commit("rmoveToken")
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
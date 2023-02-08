import synRouter from '@/router/modules'
import { constRoutes } from '@/router'

const state = () => {
    return {
        routers: []
    }
}

const mutations = {
    contRouters(state,routerList){
        state.routers = [...constRoutes,...routerList]
    }
}

const actions = {
    contentRouters({ commit }, userRouter) {
        const routerList = []
        userRouter.forEach(t => {
            routerList.push(...synRouter.filter(key => key.name === t))
        });
        commit('contRouters',routerList)
        return routerList
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
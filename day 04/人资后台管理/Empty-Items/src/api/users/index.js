import axios from '@/utils/request'

// 登录
export function login(data) {
    return axios({
        url: "/sys/login",
        method: "POST",
        data
    })
}

// 获取用户信息
export function getUserInfo() {
    return axios({
        url: "/sys/profile",
        method: "POST"
    })
}

// 获取员工基本信息
export function getUserImg(id) {
    return axios({
        url: `/sys/user/${id}`,
    })
}
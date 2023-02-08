import http from '@/utils/request'


// 登录 POST
export function login(data){
    return http({
        url:"/users/login",
        method:"POST",
        data
    })
}

// 注册 POST
export function register(data){
    return http({
        url:"/users/register",
        method:"POST",
        data
    })
}
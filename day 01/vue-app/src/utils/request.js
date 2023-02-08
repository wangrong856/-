// 引入axios
import axios from 'axios'
// 引入token
import { getToken } from '@/utils/autoToken'
// 引入elementUI
import { Message, Loading } from 'element-ui'
// 创建axios实例
const instance = axios.create({
    // baseURL: '/api',
    baseURL: process.env.VUE_APP_API,
    timeout: 4000,
});
// 定义全局变量
let loadingInstance
// 封装开启loding的加载
function stateLoding() {
    // 开启loding加载
    loadingInstance = Loading.service({
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "#00000080"
    });
}
// 封装关闭loding的加载
function endLoding() {
    // 关闭loding加载
    loadingInstance.close();
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 判断token是否存在
    if (getToken()) {
        // 存在添加到请求头中
        config.headers.Authorization = getToken()
    }
    // 请求之前开启loding
    if (config.url === "/profiles" || config.url === "/users/login" || config.url === "/users/register") {
        stateLoding()
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 请求是吧结束loding的错误信息
    endLoding()
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 结构赋值进行判断
    const { data, status } = response
    // 结束loding的加载
    endLoding()
    // 判断返回的状态码
    if (status === 200) {
        // 成功返回数据
        return data
    } else {
        // 失败提示错误reject执行catch方法
        return Promise.reject();
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么a
    // 结束加载
    endLoding()
    // 提示错误信息
    Message.error(error.message)
    // 返回错误结果
    return Promise.reject(error);
});

export default instance
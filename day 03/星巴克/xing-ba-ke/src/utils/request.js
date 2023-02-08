/*
 * @Author: SHISHUAI 11608972+shishuai_ss@user.noreply.gitee.com
 * @Date: 2022-12-13 08:29:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-14 14:24:09
 * @FilePath: \xing-ba-ke\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from "axios";
// 引入提示
import { Messages, Loading } from "element-ui";
import { API } from "./api";
import store from "../store";
// 配置loading
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)",
  });
}
function endLoading() {
  loading.close();
}
// 获取token 使用base64 对token加密
import { Base64 } from "js-base64";
// 封装一个函数
function getToken() {
  const token = localStorage.getItem("Token");
  const base64_token = Base64.encode(token + ":");
  // console.log("Basic " + base64_token);
  return "Basic " + base64_token;
}
// 创建axios实例
const instance = axios.create({
  baseURL: "https://meituan.thexxdd.cn/apit",
  timeout: 50000,
});

async function fn(){
  let res = await instance()
  console.log(res);
}


// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem("Token")) {
      config.headers.Authorization = getToken();
    }
    console.log(config);
    // 开启loading加载
    startLoading();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    endLoading();
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    endLoading();
    return response;
  },
  function (error) {
    //   // 对响应错误做点什么
    endLoading();
    // console.log(error.response.status,'101302');
    // console.log(store.state.userInfo, "0000000");
    // console.log(error.response.status, "状态码");
    // token 过期实现无感刷新
    if (error.response.status == 401) {
      API.Login(store.state.userInfo).then((res) => {
        console.log(res, "登录");
        let {
          status,
          data: {
            msg,
            data: { token },
          },
        } = res;
        console.log(token, "token00000");
        console.log(token);
        // 存储到本地
        localStorage.setItem("Token", token);
      });
    } else if (error.response.status >= 500) {
      Messages.error("服务器错误");
    }
    return Promise.reject(error);
  }
);


export default instance;

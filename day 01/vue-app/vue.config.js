const { defineConfig } = require('@vue/cli-service')
// 获取端口号 node提供的环境变量
const port = process.env.port || process.env.evn_port || 8080
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: port,
    // 代理配置 通过vue-cli的服务代理请求(反向代理)
    // 本地前端 ===>本地的后端  ===>代理我们向另一个服务器发送请求
    proxy: {
      // 通过/api来触发代理
      [process.env.VUE_APP_API]: {
        // target:代理地址
        target: process.env.VUE_APP_BASE_URL,
        // 是否跨域 值true则代理请求
        changOrigin: true,
        // 路径重写
        /*
        pathRewrite: {
          // 思路是如果是开发环境，就给所有要代理的接口统一加上前缀，然后代理请求时再统一通过rewrite去掉
          ['^' + process.env.VUE_APP_API]: ''
        }
        */
      }
    }
  }
})

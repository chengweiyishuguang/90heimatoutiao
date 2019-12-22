// // 封装一个axios

// // 引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/app/v1_0'
// 请求拦截
// axios.interceptors.request.use(function (config) {
// 下方为错误代码，少Item 粗心害死人
//   let token = window.localStorage.get('user-token')
//
//   config.headers.Authorization = `Bearer ${token}`
//
//   return config
// }, function () {
//   // zhixing
// })

axios.interceptors.request.use(function (config) {
  // 执行请求
  let token = window.localStorage.getItem('user-token')// 获取token
  // config请求参数配置/统一注入token
  config.headers.Authorization = `Bearer ${token}`
  // return config表示会用config请求进行后台操作
  return config
}, function () {})
// 导出axios,然后main.js里面引入，然后把main.js里面的axios第三方的包换城request
// 把设置的常态之引入到此文件
// 把lay-header里面的手动获取令牌参数去掉

// 响应拦截器
axios.interceptors.response.use(function (response) {
// 成功时执行该函数
  return response.data ? response.data : {}
}, function () {
  // 失败时执行该函数
})
export default axios

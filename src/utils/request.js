// // 封装一个axios

// // 引入axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
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
}, function (error) {
  // 失败时执行该函数
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'

      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期或者失效
      // 跳转之前把token删除过期的
      window.localStorage.removeItem('user-token')
      router.push('/login')// 跳转到登录页
      break
    case 403:
      message = '没有设置这条评论的选项'
      break

    default:
      break
  }
  Message({ type: 'warning', message })// 提示消息，删除登录页的提示消息
})
export default axios

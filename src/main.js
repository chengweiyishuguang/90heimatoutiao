import Vue from 'vue'
import App from './App.vue'
import './permission'
import router from './router'
import ElementUI from 'element-ui' // 引入elementui
import axios from './utils/request'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'// 引入初始化样式
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/app/v1_0'
Vue.prototype.$axios = axios// axios赋值给全局属性
// 注册
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

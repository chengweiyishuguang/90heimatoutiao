import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入elementui
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'// 引入初始化样式

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/app/v1_0'
Vue.prototype.$axios = axios// axios赋值给全局属性
// 注册
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 引入组件对象 layout-aside/layout-header
import layOutAsiade from './home/layout-aside.vue'
import layOutHeader from './home/layout-header.vue'

export default {

  install (Vue) {
    //  注册组件
    Vue.component('layout-aside', { layOutAsiade })// 注册全局组件
    Vue.component('layout-header', { layOutHeader })
  }
}

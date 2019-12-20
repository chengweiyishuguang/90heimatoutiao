
// 引入组件对象 layout-aside/layout-header
// import layOutAside from './home/layout-aside'
// import layOutHeader from './home/layout-header'
import layOutAside from './home/layout-aside'
import layOutAheader from './home/layout-header'

export default {

  install (Vue) {
    // console.log(Vue)

    Vue.component('layout-aside', layOutAside)
    Vue.component('layout-header', layOutAheader)
    //  注册组件
    //     Vue.component('layout-aside', layOutAside )// 注册全局组件因为再main.js中的vue实力前引入了所以属于全局注册，以后再加组件可以引入在这注册，任何位置都能使用
    //     Vue.component('layout-header',  layOutHeader )
  }
}
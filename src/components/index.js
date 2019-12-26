
// 引入组件对象 layout-aside/layout-header
// import layOutAside from './home/layout-aside'
// import layOutHeader from './home/layout-header'
import layOutAside from './home/layout-aside'
import layOutAheader from './home/layout-header'
import breakCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'// quill编辑器的组件对象
import CoverImage from './publish/cover-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {

  install (Vue) {
    // console.log(Vue)
    // 全局注册，再任意位置都可以使用
    Vue.component('layout-aside', layOutAside)
    Vue.component('layout-header', layOutAheader)
    Vue.component('bread-crumb', breakCrumb)// 面包屑组件
    Vue.component('quill-editor', quillEditor)// 注册一个全局的富文本编辑器
    Vue.component('cover-image', CoverImage)// 注册一个封面组件
    //  注册组件
    //     Vue.component('layout-aside', layOutAside )// 注册全局组件因为再main.js中的vue实力前引入了所以属于全局注册，以后再加组件可以引入在这注册，任何位置都能使用
    //     Vue.component('layout-header',  layOutHeader )
  }
}

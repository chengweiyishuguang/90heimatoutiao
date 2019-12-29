<template>
<!-- 先放一个大容器 -->
  <el-container>
    <!-- 左边的容器 -->
    <!-- 根据状态控制样式宽度style动态绑定的用法 -->
    <el-aside :style="{width:collapse ? '60px' :'230px'}"  style="transition: all 0.2s; min-height:100vh;background-color:#353b4e;">
      <!-- 使用组件 -->
      <layout-aside :collapse="collapse"></layout-aside>
    </el-aside>
     <!-- 右侧容器 -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- 主要区域 -->
        <!-- 放二级路由容器 -->
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import eventBus from '../../utils/eventBus'
// // 引入侧边导航组件
// import layOutAside from '../../components/home/layout-aside'
// // 引入头部组件
// import layOutHeader from '../../components/home/layout-header'

export default {
  data () {
    return {
      collapse: false // 默认是展开
    }
  },
  created () {
  // 开启监听
    eventBus.$on('changeCollapse', () => {
      // 头部组件告诉折叠相关组件要改变了
      // 我们定义一个和layout-header一样的状态里面取反我们在这里面也要取反
      this.collapse = !this.collapse// 取反不是展开就是折叠
    })
  }
}
</script>

<style>
/* 默认情况下，vue单文件组件的style样式时全局的，
我们现在指向改变当前组件的样式不会影响其它用到的属性scoped
scoped属性可以控制当前组件 */
/* 这里不支持less  lang属性可以改变其默认改成less */
/* 在单文件组件中,如果需要在style标签中使用 诸如 **less** **scss**  需要在style标签上 给lang属性赋值 */

</style>

<template>
<!-- 先放一个大容器 -->
  <el-container>
    <!-- 左边的容器 -->
    <el-aside>
      <!-- 使用组件 -->
      <layout-aside style="background-color:#353b4e;height:100vh"></layout-aside>
    </el-aside>
     <!-- 右侧容器 -->
    <el-container>
      <!-- 上下布局 -->
      <el-header>
        <!-- 头部组件 -->
        <layout-header></layout-header>
      </el-header>
      <el-main>
        主要区域
      </el-main>
    </el-container>
  </el-container>

</template>

<script>

export default {

}
</script>

<style>
/* 默认情况下，vue单文件组件的style样式时全局的，
我们现在指向改变当前组件的样式不会影响其它用到的属性scoped
scoped属性可以控制当前组件 */
/* 这里不支持less  lang属性可以改变其默认改成less */
/* 在单文件组件中,如果需要在style标签中使用 诸如 **less** **scss**  需要在style标签上 给lang属性赋值 */

</style>

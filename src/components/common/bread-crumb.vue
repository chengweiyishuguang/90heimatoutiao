<template>
<!-- 面包屑组件 -->
  <el-breadcrumb separator=">">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <slot name="title"></slot>
      </el-breadcrumb-item>

  </el-breadcrumb>
  <!-- 去components/index.js下面注册 -->
</template>

<script>
export default {

}
</script>

<style>

</style>

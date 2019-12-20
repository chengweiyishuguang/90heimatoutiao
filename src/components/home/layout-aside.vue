<template>
<!-- 左侧导航组件 -->
<div class="layout-aside">
    <div class="title">
        <img src="../../assets/img/logo_admin.png" alt="">
    </div>
    <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
        <!-- 没有折叠选项 -->
        <el-menu-item>首页</el-menu-item>
        <!-- 二级折叠菜单 -->
        <el-submenu>
            <!-- 定义具名插槽让它再一级菜单显示 -->
           <template slot='title'>内容管理</template>
          <el-menu-item>发布文章</el-menu-item>
          <el-menu-item>文章列表</el-menu-item>
          <el-menu-item>评论管理</el-menu-item>
          <el-menu-item>素材管理</el-menu-item>
        </el-submenu>
        <!-- 二级插槽粉丝信息 -->
        <el-submenu>
            <!-- 定义具名插槽让它再一级菜单显示 -->
           <template slot='title'>粉丝管理</template>
          <el-menu-item>图文数据</el-menu-item>
          <el-menu-item>粉丝情况</el-menu-item>
          <el-menu-item>粉丝画像</el-menu-item>
          <el-menu-item>粉丝列表</el-menu-item>
        </el-submenu>

         <el-menu-item>账户信息</el-menu-item>
    </el-menu>

</div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside{
    width: 230px;
    .el-menu{
        border-right: null;
    }
    .title{
        background-color: #2e2f32;
        text-align: center;
        padding: 10px 0;
       img {
           height: 35px;
       }
    }

}
</style>

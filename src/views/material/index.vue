<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          素材管理

      </template>
      </bread-crumb>
      <el-tabs v-model="activeName">
          <el-tab-pane label="全部图片" name='all'></el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect"></el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// 当前选中的标签
    }
  }
}
</script>

<style>

</style>

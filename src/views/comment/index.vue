<template>
  <!-- 卡片组件/评论管理 -->
  <el-card>
    <bread-crumb slot="header">
    <template slot="title">
      评论管理
    </template>
    </bread-crumb>
    <el-table :data="list">
      <!-- 放置列组件 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column  :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope ="obj">
        <el-button type="text" size="small">修改</el-button>
        <el-button @click='openOrCloseState(obj.row)' type="text" size="small">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
<el-pagination
  background
  layout="prev, pager, next"
  :total="page.total"
  :page-size="page.pageSize"
  :current-page="page.currentPage"
  @current-change="changepage"

  >
</el-pagination>
    </el-row>

  </el-card>
</template>

<script>

export default {
  data () {
    // 定义一个数据接收返回结果
    return {
      list: [],
      page: {
        total: 0, // 总条数
        pageSize: 10, // 默认每页条数为10
        currentPage: 1// 默认页码为1

      }
    }
  },
  methods: {
    changepage (newpage) {
      this.page.currentPage = newpage
      this.getComment()
    },
    async getComment () {
      let result = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count// 总条数
    },
    formatterBoolean (row, column, cellValue, index) {
      // row:当前行数据
      // column:当前列信息
      // cellValue:当前单元格的值
      // index索引
      return cellValue ? '正常' : '关闭'
    },
    async openOrCloseState (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      try {
        await this.$confirm(`您是否确定要${mess}评论吗`, '提示')
        // 调用接口
        await this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          // 因为当前如果是打开，就要关闭，如果关闭就要打开，取反
          data: { allow_comment: !row.comment_status }
        })
        // 表示执行成功，重新加载评论管理数据
        this.getComment()
      } catch (error) {

      }
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>

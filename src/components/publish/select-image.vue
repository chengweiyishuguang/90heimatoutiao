<template>
    <el-tabs v-model="activeName" >
    <el-tab-pane label="素材库" name="material">
        <!-- 外层容器 -->
        <div class="select-image-list">
            <el-card v-for="item in list" :key="item.id" class="img-card">
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <el-row type="flex" justify="center">
             <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"

        >
        </el-pagination>
        </el-row>

    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选中素材库
      list: [], // 接收请求数据
      // 定义分页要素数据
      page: {
        total: 0, // 总页数
        pageSize: 8, // 每页显示数据
        currentPage: 1 // 当前页
      }
    }
  },
  methods: {
    // 点击图片时触发
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 调用素材接口
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-image-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card{
        width: 150px;
        height: 150px;
        margin:20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}

</style>

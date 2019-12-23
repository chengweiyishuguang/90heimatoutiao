<template>
  <el-card>
      <bread-crumb slot="header">
      <template slot="title">
          素材管理

      </template>
      </bread-crumb>
      <el-tabs v-model="activeName" @tab-click="changetab">
          <el-tab-pane label="全部图片" name='all'>
              <!-- 生成页面解构 -->
              <div class="img-list">
                  <!-- 使用v-for遍历list -->
                  <el-card  class="img-card" v-for="item in list" :key="item.id">
                      <img :src="item.url" alt="">
                      <el-row class="operate" type="flex" justify="space-around" align="middel">
                          <i class="el-icon-star-on"></i>
                          <i class="el-icon-delete-solid"></i>
                      </el-row>
                  </el-card>

              </div>

          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
                <div class="img-list">
                  <!-- 使用v-for遍历list -->
                  <el-card  class="img-card" v-for="item in list" :key="item.id">
                      <img :src="item.url" alt="">
                  </el-card>

              </div>

          </el-tab-pane>
      </el-tabs>
      <!-- 公共分页组件 -->
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前选中的标签
      // 定义一个list 接收素材数据数据
      list: [],
      page: {
        currentPage: 1, // 默认页码
        pageSize: 8, // 默认每页条数
        total: 0// 总条数

      }
    }
  },
  methods: {
    // 改变页码的方法
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getMaterial()
    },
    // 切换页签的方法
    changetab () {
      this.page.currentPage = 1// 重置回第一页
      this.getMaterial()
    },
    // 获取素材的方法
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,

          collect: this.activeName === 'collect'// 传false是获取所有数据，传true是获取收藏数据
        }
      }).then(result => {
        this.list = result.data.results// 获取所有的图片数据
        this.page.total = result.data.total_count// 总条数
      })
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    .img-card {
        width: 200px;
        height: 220px;
        margin: 20px 50px;
        position: relative;
        img {
            width: 100%;
            height:100%;
        }
        .operate {
            width: 100%;
            position: absolute;
            left:0;
            bottom: 0;
            font-size:20px;
            height:30px;
            background-color:#f4f5f6;
        }
    }
}
</style>

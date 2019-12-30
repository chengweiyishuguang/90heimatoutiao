<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
      <template slot="title">
          素材管理

      </template>
      </bread-crumb>
      <el-row type="flex" justify="end">
          <el-upload action="" :http-request="uploadImg" :show-file-list="false">
              <el-button type="primary" size="small">上传图片</el-button>
          </el-upload>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="changetab">
          <el-tab-pane label="全部图片" name='all'>
              <!-- 生成页面解构 -->
              <div class="img-list">
                  <!-- 使用v-for遍历list -->
                  <el-card  class="img-card" v-for="(item,index) in list" :key="item.id">
                      <img  @click="openDialog(index)" :src="item.url" alt="">
                      <el-row class="operate" type="flex" justify="space-around" align="middel">
                          <i @click="collectOrCancel(item)" :style="{color:item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
                          <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                      </el-row>
                  </el-card>

              </div>

          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
                <div class="img-list">
                  <!-- 使用v-for遍历list -->
                  <el-card  class="img-card" v-for="item in list" :key="item.id">
                      <img  :src="item.url" alt="">
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
         <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible = false">
           <el-carousel  ref="myCarosel" indicator-position="outside" height="500px">
           <el-carousel-item v-for="(item,index) in list" :key="index">
           <h3><img style="width:100% ;height:100%" :src="item.url" alt=""></h3>
           </el-carousel-item>
        </el-carousel>
         </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      loading: false,
      activeName: 'all', // 当前选中的标签
      // 定义一个list 接收素材数据数据
      list: [],
      page: {
        currentPage: 1, // 默认页码
        pageSize: 8, // 默认每页条数
        total: 0// 总条数

      },
      clickIndex: -1

    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarosel.setActiveItem(this.clickIndex)
    },
    openDialog (index) {
      this.dialogVisible = true
      this.clickIndex = index
    },
    // 删除用户图片素材
    async delMaterial (id) {
      await this.$confirm('您确定要删除此图片吗')
      await this.$axios({
        method: 'delete',
        url: `/user/images/${id}`

      })
      this.getMaterial()
    },
    // 取消或者收藏
    async collectOrCancel (item) {
      // 判断如果当前的item.iscollected true 取消收藏
      await this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected// 取反因为收藏就要取消收藏
        }

      })
      this.getMaterial()
    },
    // 上传图片的方法
    async uploadImg (params) {
      this.loading = true// 先弹层
      let data = new FormData()
      data.append('image', params.file)
      await this.$axios({
        method: 'post',
        url: '/user/images',
        data
      })
      // 上传成功关掉弹层
      this.loading = false
      // 直接调用拉取数据的方法重新加载
      this.getMaterial()
    },

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
    async getMaterial () {
      let result = await this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,

          collect: this.activeName === 'collect'// 传false是获取所有数据，传true是获取收藏数据
        }
      })
      this.list = result.data.results// 获取所有的图片数据
      this.page.total = result.data.total_count// 总条数
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
           i {
               cursor: pointer;
           }
        }
    }
}
</style>

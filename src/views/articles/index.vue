<template>
<el-card class="articles">
   <bread-crumb slot="header">
    <template slot="title">文章列表</template>
   </bread-crumb>
   <el-form style="padding-left:50px">
       <!-- 表单容器 -->
       <el-form-item label="文章状态:">
           <!-- 放置一个单选组件 文章状态，0-草稿 1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
           <!-- 第一种方法 -->
           <!-- <el-radio-group v-model="searchForm.status" @change="changeCondition">
               <el-radio :label="5">全部</el-radio>
               <el-radio :label="0">草稿</el-radio>
               <el-radio :label="1">待审核</el-radio>
               <el-radio :label="2">审核通过</el-radio>
               <el-radio :label="3">审核失败</el-radio>

           </el-radio-group> -->
           <!-- 第二种方法watch -->
           <el-radio-group v-model="searchForm.status">
               <el-radio :label="5">全部</el-radio>
               <el-radio :label="0">草稿</el-radio>
               <el-radio :label="1">待审核</el-radio>
               <el-radio :label="2">审核通过</el-radio>
               <el-radio :label="3">审核失败</el-radio>
           </el-radio-group>
       </el-form-item>

        <el-form-item label="频道列表:">
<!-- 第一种方法 -->
            <!-- <el-select @change="changeCondition"  placeholder="请选择频道:" v-model="searchForm.channel_id">

                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>

            </el-select> -->
            <!-- 第二种方法watch -->
             <el-select placeholder="请选择频道:" v-model="searchForm.channel_id">
                <!-- label是显示值  value是存储值 -->
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>

            </el-select>
       </el-form-item>
        <el-form-item label="时间选择：">
            <!-- elementui的日期选择器日期范围 -->
            <!-- 第一种方法 -->
           <!-- <el-date-picker @change="changeCondition" value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange"></el-date-picker> -->
           <!-- 第二种方法 -->
           <el-date-picker value-format="yyyy-MM-dd" v-model="searchForm.dateRange" type="daterange"></el-date-picker>
       </el-form-item>
   </el-form>
    <el-row class="total" type="flex" align="middle">
        <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
        <!-- 左侧 -->
      <div class="left">
          <!-- 判断如果用户没有上传头像 ，那么长度为0会执行：后面的转换的自定义图片，如果上传了那么就把下标为0的图片给它-->
        <img :src="item.cover.images.length ? item.cover.images[0] :defaultImg" alt="">
        <div class="info">
            <span>{{item.title}}</span>
            <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
            <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
        </div>

     </div>

        <!-- 右侧 -->
        <div class="right">
            <span @click="toModify(item.id)"> <i class="el-icon-edit"></i> 修改</span>
            <!-- 注册删除按钮事件 -->
            <span @click="delMaterrial(item.id)"> <i class="el-icon-delete"></i> 删除</span>
        </div>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" align="middle" style="height:60px">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        >

        </el-pagination>
    </el-row>
</el-card>
</template>

<script>
import { getArticles, getChannels } from '../../actions/articles'
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选中
        channel_id: null, // 默认不选中任何一个分类
        dateRange: []// 日期范围
      },
      channels: [], // 接收频道数据
      list: [],
      defaultImg: require('../../assets/img/loginIMG.jpg'), // 默认图片

      page: {
        currentPage: 1,
        pageSize: 10, // 黑马头条限制最低十条
        total: 0
      }
    }
  },
  watch: {
    searchForm: {
      handler: function () {
        // 此时数据已经变成最新的了
        // this指向组件实例
        // 直接调用条件改变的方法
        this.changeCondition()
      },
      deep: true
    }
  },
  filters: {
    filterStatus (value) {
      // <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      // <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 编辑文章
    // 修改页面其实就是发布页面
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章
    delMaterrial (id) {
      // 提示
      this.$confirm('是否删除该文章').then(() => {
        // 调用接口
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 重新拉取数据
          // 根据业务处理，删除了数据是否回到第一页
          this.getConditionArticle()
        })
      })
    },
    // 改变页码的方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    // 改变条件
    getConditionArticle () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端定义的标识，如果等于5表示查全部，全部应该什么都不传直接传null
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      this.getArticles(params)
    },
    // 获取所有的频道
    async getChannels () {
      let reslut = await getChannels()
      this.channels = reslut.data.channels
    },
    async getArticles (params) {
      let result = await getArticles(params)
      this.list = result.data.results// 获取文章列表数据
      this.page.total = result.data.total_count// 总页数
    }

  },

  created () {
    this.getChannels()// 获取文章数据
    this.getArticles({ page: 1, per_page: 10 })// 获取文章列表数据
  }
}
</script>

<style lang="less" scoped>
.articles{
    .total{
        height: 60px;
        border-bottom: 1px dashed #ccc;
    }
    .article-item {
        display: flex;
        justify-content: space-between;
        padding:20px 0;
        border-bottom:1px solid #f2f3f5;
        .left {
            display: flex;

        }
        img {
            width: 180px;
            height: 100px;
            border-radius: 4px;
        }
        .info{
            margin-left: 10px;
            height: 100px;
            display:flex;
            flex-direction: column;
            justify-content: space-around;
            .date{
                color:#999;
                font-size:12px;
            }
            .tag {
                text-align: center;
                width: 60px;
            }
        }
        .right {
            span {
                font-size:14px;
                margin-right: 8px;
                cursor: pointer;
            }
        }
    }
}

</style>

<template>
 <el-card v-loading="loading">
     <bread-crumb slot="header">
     <template slot="title">
         发布文章
     </template>
     </bread-crumb>
     <!-- 容器 -->
     <el-form ref="publishForm" :model="formData" :rules="publishRules" style="margin-left:50px" label-width="100px">
         <el-form-item prop="title" label="标题">
             <el-input v-model="formData.title" style="width:60%"></el-input>
         </el-form-item>
         <el-form-item  prop="content" label="内容">
             <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
         </el-form-item>
         <el-form-item  style="margin-top:150px" prop="cover" label="封面">
             <el-radio-group @change="changeType" v-model="formData.cover.type">
                 <!-- // 封装类型-1：自动，0-无图，1-1张，3-3张 -->
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
         </el-form-item>
         <!-- 封面组件 -->
         <cover-image @selectTwoImg="receiveImg" :list="formData.cover.images"></cover-image>
         <el-form-item prop="channel_id" label="频道">

             <el-select value="" v-model="formData.channel_id">
                 <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item>
             <!-- 下方@click="publishArticle()括号里面可以不写，不写值是undefined，布尔值就是false -->
             <el-button @click="publishArticle(false)" type='primary'>发布</el-button>
             <el-button @click="publishArticle(true)">存入草稿</el-button>
         </el-form-item>
     </el-form>
 </el-card>
</template>

<script>
import { getChannels } from '../../actions/articles'
export default {
  data () {
    return {
      loading: false,
      channels: [], // 接收频道数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封装类型-1：自动，0-无图，1-1张，3-3张
          images: []// 放置封面地址发数组
        },
        channel_id: null // 频道id
      },
      publishRules: {
        // 校验规则title ，content， channel_id必填
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5, max: 30, message: '标题的长度是5-30个字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  // 因为发布文章和修改文章同时使用一个组件，
  // 两个地址对应一个组件时如果相互切换时组件实例并不会被销毁
  // 也就当我再发布页面上输入的文字再切换到修改页面的时候
  // 文字也会存在，原因时因为在这种情况下不会执行钩子函数
  // 解决办法如下
  watch: {
    $route: function (to, from) {
    // 通过to里面的params判断要跳转的路径是否携带articleId，如果携带并且有参数就是修改页面
    // 如果没有那么就是发布文章页面
      if (to.params.articleId) {
        // 代表修改

      } else {
        // 代表发布页面
        // 发布的时候我们要讲整个页面的内容清空
        // 不能用this.formData={}
        // 直接复制data里面定义号的原始值
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封装类型-1：自动，0-无图，1-1张，3-3张
            images: []// 放置封面地址发数组
          },
          channel_id: null // 频道id
        }
      }
    }
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []// 无图或者自动
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']// 单图
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']// 3图
    //   }
    // }
  },
  methods: {
    //    this.formData.cover.images[index]=url//这是错误的做法，虽然数据有变化但是不是响应式的不能保证每次都成功

    // 思路是用响应式数据，也就是数据变化视图变化，数据变化是vue.js检测到了数据变化，但是vue.js对于数组的检查变化不能通过索引来处理

    // 解决办法，用替换数组的方法，我们可以生成一个新的数组去替换原来的数组这里用map方法生成一个和原来数组相等长度的新数组

    // vue.js会检测到新数组替换原数组进行响应式更新

    // 直接把新数组赋值给老数组
    receiveImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (index === i) {
          return url
        }
        return item
      })
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []// 无图或者自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']// 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']// 3图
      }
    },
    // 获取所有的频道
    async getChannels () {
      let reslut = await getChannels()
      this.channels = reslut.data.channels
    },
    // 发布文章/发布到草稿/正式文章
    // 当draft值为true的时候是草稿为false的时候是发布
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          // 判断是修改还是发布文章
          // 已知修改和发布的区别是修改有articleId,发布没有
          // 所以我们要看看是否有articleId
          let{ articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // 查询参数
            data: this.formData// 请求参数
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })
          // 如果articleId存在调用修改接口
          // if (articleId) {
          //   // 修改接口
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // 查询参数
          //     data: this.formData// 请求参数
          //   }).then(() => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     // 跳转到文章列表页
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   // 不存在调用发布接口
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // 查询参数
          //     data: this.formData // 请求体参数
          //   }).then(() => {
          //     this.$message({
          //       type: 'success',
          //       message: '保存成功'
          //     })
          //     // 跳转到文章列表页
          //     this.$router.push('/home/articles')
          //   })
          // }

          // console.log('校验通过')
          // // 调用发布接口
          // this.$axios({
          //   url: '/articles',
          //   method: 'post',
          //   params: { draft }, // 查询参数
          //   data: this.formData // 请求体参数
          // }).then(() => {
          //   this.$message({
          //     type: 'success',
          //     message: '保存成功'
          //   })
          //   // 跳转到文章列表页
          //   this.$router.push('/home/articles')
          // })
        }
      })
    },
    // 通过id查询文章数据
    getArticleId (articleId) {
      this.loading = true
      // 调用接口获取接口
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loading = false
        this.formData = result.data// 将这个数据赋值给data
      })
    }
  },
  created () {
    this.getChannels()
    // 当点击修改跳入发布文章页面的时候，也就是已进入页面的时候我们就要获取是携带参数articleId过去的
    // 我们可以用this.$route.params获取到articleId，解构赋值给articleId
    let{ articleId } = this.$route.params// 获取动态路由参数
    // 由此可以判断如果articleId 存在表示修改文章，直接查询文章数据

    // 如果articleId 为空后面就不会执行
    articleId && this.getArticleId(articleId)
  }

}
</script>

<style>

</style>

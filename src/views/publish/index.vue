<template>
 <el-card >
     <bread-crumb slot="header">
     <template slot="title">
         发布文章
     </template>
     </bread-crumb>
     <!-- 容器 -->
     <el-form ref="publishForm" :model="formDate" :rules="publishRules" style="margin-left:50px" label-width="100px">
         <el-form-item prop="title" label="标题">
             <el-input v-model="formDate.title" style="width:60%"></el-input>
         </el-form-item>
         <el-form-item  prop="content" label="内容">
             <el-input v-model="formDate.content" type="textarea" :row="4"></el-input>
         </el-form-item>
         <el-form-item prop="cover" label="封面">
             <el-radio-group v-model="formDate.cover.type">
                 <!-- // 封装类型-1：自动，0-无图，1-1张，3-3张 -->
                 <el-radio :label="1">单图</el-radio>
                 <el-radio :label="3">三图</el-radio>
                 <el-radio :label="0">无图</el-radio>
                 <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
         </el-form-item>
         <el-form-item prop="channel_id" label="频道">

             <el-select value="" v-model="formDate.channel_id">
                 <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item>
             <el-button @click="publishArticle" type='primary'>发布</el-button>
             <el-button @click="publishArticle">存入草稿</el-button>
         </el-form-item>
     </el-form>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数据
      formDate: {
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
  methods: {
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(reslut => {
        this.channels = reslut.data.channels
      })
    },
    // 发布文章
    publishArticle () {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {

        }
      })
    }
  },
  created () {
    this.getChannels()
  }

}
</script>

<style>

</style>

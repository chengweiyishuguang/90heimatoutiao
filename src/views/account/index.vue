<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">
            账户信息
        </template>
      </bread-crumb>
      <el-form ref="myForm" :model="formData" :rules="rules" style="margin-left:100px" label-width="100px">
          <el-form-item prop="name" label="用户名">
              <el-input v-model="formData.name" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item  label="简介">
              <el-input v-model="formData.intro" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
              <el-input v-model="formData.email" style="width:40%"></el-input>
          </el-form-item>
          <el-form-item  label="手机号">
              <el-input v-model="formData. mobile" disabled style="width:40%"></el-input>
          </el-form-item>
           <el-form-item >
             <el-button @click="SaveUserInfo" type="primary">保存信息</el-button>
          </el-form-item>
      </el-form>
      <el-upload :http-request="uploadImg"  class="head-upload" action="" :show-file-list="false">
          <img :src="formData.photo? formData.photo :defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      loading: false,
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''
      },
      defaultImg: require('../../assets/img/loginIMG.jpg'),
      rules: {
        // 校验用户名和邮箱
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名长度在1-7个字符之间'
        }],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }]
      }

    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      this.loading = true// 打开弹层
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
        // .then中等待上传结果
        // 因为上传图片较大我们可以给它做个弹层
      }).then(result => {
        this.loading = false// 关闭弹层
        // result.data.photo能拿到上传的头像的地址我们要把它赋值给我们显示的试图
        // 试图就是formData里面的photo
        this.formData.photo = result.data.photo
        // 认为保存成功通知header组件更新信息
        eventBus.$emit('updateUserInfo')
      })
    },
    // 手动校验
    // 首先要给el-form绑定ref然后再给按钮定义方法在此方法里面获取表单
    // myForm里面有一个方法.
    // validate()校验表单也支持promise写法成功以后会进入.then中
    // 也就是它有两种写法一种是回调函数一种是promise

    // 调用接口上传数据，得到返回结果
    // 编辑一般有两种类型的接口一种是put/另一种是patch，一般的增删改查用put这种非常规的用patch
    SaveUserInfo () {
      this.$refs.myForm.validate().then(result => {
        // 调用保存接口
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(result => {
          this.$message({
            type: 'success',
            message: '保存用户信息成功'
          })
          // 认为保存成功通知header组件更新信息
          eventBus.$emit('updateUserInfo')
        })
      })
    },
    // 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
    .head-upload {
        width: 200px;
        height: 200px;
        position: absolute;
        top:200px;
        right: 300px;
        img {
            width: 100%;
            height:100%;
            border-radius: 50%;
        }
    }

</style>

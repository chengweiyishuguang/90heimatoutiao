<template>
  <div class='login'>
      <!-- 使用elementul -->
<el-card class='login-card'>
    <!-- 引入title -->
    <div  class='title'>
        <img src="../../assets/img/logo_index.png" alt="">
    </div>
         <!-- 表单 => el-form包裹 -->
         <!-- 手机号 -->
    <el-form  ref="myform" :rules="loginRules" :model="loginForm" >
        <!-- prop校验属性，值时要校验的字段名 -->
        <el-form-item  prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 验证码输入框 -->

        <el-form-item  prop="code" >
            <el-input   v-model="loginForm.code" style="width:50%" placeholder="请输入验证码"></el-input>
            <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

    <!-- 复选框 -->
     <el-form-item  prop="check">
                 <!-- 同意选项 -->
        <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
     </el-form-item>
     <!-- 提交 -->
     <el-form-item>
                  <!-- 登录按钮 -->
        <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
    </el-form-item>
    </el-form>

</el-card>
</div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      // loginForm代表整个form表单数据对象
      loginForm: {
        // mobile代表手机输入框
        mobile: '',
        // 代表验证的输入框
        code: '',
        // 复选框
        check: false

      },
      // 验证表单对象
      loginRules: {
        // 验证规则对象key value []
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        check: [{ validator: function (rule, value, callback) {
        // validator自定义校验函数
        // 第一个参数时rule校验规则没啥用
        // 第二个参数是value要校验的字段值
        // 第三个值是callback回调函数
          if (value) {
          // 如果当前是true代表已经勾选
            callback()
          } else {
          // 如果当前为false代表没有勾选
            callback(new Error('请点击勾选'))// 如果没有勾选代表校验规则失败,应该停止
          }
        } }]

      }

    }
  },
  methods: {
    // 手动校验
    submitLogin () {
      this.$refs.myform.validate(function (isok) {
        if (isok) {
          console.log('校验成功')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background: url(../../assets/img/loginIMG.jpg);
    height:100vh;
    background-size: cover;
    display:flex;
    justify-content:center;
    align-items: center;
    .login-card{
        width: 400px;
        height: 350px;
        .title{
            text-align: center;
            img{
                height: 25px;

            }
        }
    }

}

</style>

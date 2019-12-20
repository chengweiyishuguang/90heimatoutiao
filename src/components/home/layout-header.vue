<template>
  <el-row class="layout-header" type="flex" align="middle">
      <el-col class="left" :span="12">
           <i class='el-icon-s-fold'></i>
         <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
      <el-col class="right" :span="12" >
          <el-row type="flex" justify="end" align="middle">
              <img src="../../assets/img/loginIMG.jpg" alt="">
              <el-dropdown>
                  <span>
                    成为一束光
                    {{userInfo}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                       <el-dropdown-item>git地址</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>

              </el-dropdown>
          </el-row>
         </el-col>
  </el-row>
</template>

<script>
export default {
//   data () {
//     return {
//       userInfo: {}// 定义一个用户对象

  //     }
  //   },
  //   // 已进入页面就开始查询，用生命周期的钩子函数
  //   created () {
  //     // 从前端缓存中获取令牌
  //     let token = localStorage.getItem('user-token')// 获取用户令牌
  //     this.$axios({
  //       // 地址
  //       url: 'user/profile',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }

  //     }).then(result => {
  //       this.userInfo = result.data.data
  //     })
  //   }

}
</script>

<style lang='less' scoped>
.layout-header{
    height:60px;
   .left{
       font-size:20px;
       span{
           color:#2c3e50;
           font-size:16px;
           margin-left:4px;
       }
   }
   .right {
       img{
           height: 40px;
           width: 40px;
           border-radius: 50%;
           margin-right:8px;
       }
   }
}

</style>

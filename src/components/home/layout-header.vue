<template>

  <el-row class="layout-header" type="flex" align="middle">
      <el-col class="left" :span="12">
           <i @click="collapseOrOpen" :class="{'el-icon-s-unfold': collapse , 'el-icon-s-fold':!collapse}"></i>
         <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
      <el-col class="right" :span="12" >
          <el-row type="flex" justify="end" align="middle">
            <!-- 头像区域用三元表达式确认用户是否上传了图片，如果没上传给一个默认头像 -->
              <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
              <el-dropdown @command="clickmenu">
                  <span>
                    {{userInfo.name}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="info">个人信息</el-dropdown-item>
                       <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="lgout" @click="clickmenu">退出</el-dropdown-item>
                  </el-dropdown-menu>

              </el-dropdown>
          </el-row>
         </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 默认是展开
      userInfo: {}, // 定义一个用户对象
      // 如果遇到图片需要做动态变量时先用require包裹一个地址转换成一个变量再用变量做逻辑判断
      defaultImg: require('../../assets/img/loginIMG.jpg')// 先将图片转化成了一个变量

    }
  },
  // 已进入页面就开始查询，用生命周期的钩子函数
  created () {
    // 从前端缓存中获取令牌
    // let token = localStorage.getItem('user-token')// 获取用户令牌

    this.getUserInfo()// 认为更新了数据自己也应该更新
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  },
  methods: {
    // 展开或者折叠
    collapseOrOpen () {
      this.collapse = !this.collapse// 取反不是展开就是折叠
      // 当头部图标改变的时候我们希望左侧的侧边栏宽度和显示都要跟着和改变
      // 所以我们想到了eventBus进行监听
      eventBus.$emit('changeCollapse')// 触发一个事件
    },
    // 更新用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    // 点击菜单项时触发
    clickmenu (command) {
      // this.$message('触发了' + command)
      if (command === 'info') {
        this.$router.push('/home/account')// 回到账户信息页
      } else if (command === 'git') {
        window.location.href = 'https://github.com/chengweiyishuguang/90heimatoutiao'
      } else {
        window.localStorage.removeItem('user-token')// 删除令牌
        // 回到login
        this.$router.push('/login')
      }
    }

  }

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

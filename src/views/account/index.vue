<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            账户信息
        </template>
      </bread-crumb>
      <el-form  style="margin-left:100px" label-width="100px">
          <el-form-item label="用户名">
              <el-input style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input style="width:40%"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input disabled style="width:40%"></el-input>
          </el-form-item>
      </el-form>
      <el-upload class="head-upload" action="" :show-file-list="false">
          <img src="../../assets/img/loginIMG.jpg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {

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

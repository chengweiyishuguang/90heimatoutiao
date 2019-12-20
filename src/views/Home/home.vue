<template>
  <div>
      <el-carousel :interval="4000" type="card" height="600px">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576839670541&di=3b9f4629346de5b68783697383329fb6&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fwallpaper%2F7056%2F7055706_0540.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576839670536&di=7d61bffc4b70306c638cda03d130da34&imgtype=0&src=http%3A%2F%2Ftvax1.sinaimg.cn%2Fcrop.0.0.1242.1242.1024%2F70090361ly8ft46vjri2qj20yi0yi768.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576839775471&di=98e10d9c69e352936a9db98715a71f47&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F30%2F20170830102345_LXUSz.thumb.700_0.jpeg']
    }
  }
}
</script>

<style>

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

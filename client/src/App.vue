<template>
  <div id="app">
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Design by Sina 皖ICP备14012404号-1</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body{
    background: #5e7aa1;
  }
  #app{
    background-image: url(./assets/imgs/body_bg.jpg);
    padding-top: 284px;
    background-repeat: no-repeat;
    background-position: center 0;
  }

  .el-main {
    background-color: rgba(0,0,0,0.15);
    max-width: 1000px;
    /*min-height: 680px;*/
    margin: 0 auto;
    padding: 25px 0 0 0;
    border-radius: 2px;
    box-shadow: #5d7aa1 0px 1px 5px;
  }
  .el-footer{
    text-align: center;
    color: #fff;
    line-height: 60px;
  }

</style>

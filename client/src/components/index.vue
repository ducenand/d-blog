<template>
  <div class="list-main">

      <div class="d-list" v-for="item in articleList">
        <div class="d-title">
          <router-link :to="/article/+item.id"><i class="el-icon-tickets"></i> {{item.title}}</router-link>
        </div>
        <div class="d-t-a">
          <i class="el-icon-time"></i> <time class="d-time">{{item.create_time}}</time>
          <i class="el-icon-edit-outline"></i> <span>{{item.author}}</span>
        </div>
        <div class="d-summary">{{item.summary}}</div>
        <div class="d-read-more"><router-link :to="/article/+item.id">READ MORE <i class=" el-icon-d-arrow-right color-fff"></i> </router-link></div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articleList:[]
    }
  },
  created: function() {
    var id = this.$route.params.id;
    var _this = this;
     this.axios.get('/api/getArticleList').then((response) => {

        var res = response.data
        console.log(res)
        if (res.code === 0) {
          _this.articleList = res.data;
        } else {
          alert(res.msg)
        }

      })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped >


  .d-list{
    background-color: #fff;
    box-sizing: border-box;
    max-width: 950px;
    margin: 0 auto;
    margin-bottom:25px;
    // border-radius: 2px;
    background: url(../assets/imgs/mainbg.png) repeat;
    overflow: hidden;
    box-shadow: #5d7aa1 0px 1px 10px;
    color: #fff;
    padding: 20px;
    .color-fff{
      color: #fff;
    }

  }
  .d-list:last-child{
    margin-bottom: 25px;
  }
  .d-title{
    font-size: 26px;
    line-height: 40px;
    text-shadow: 1px 1px 0 #333,1px 1px 0 #5d7aa1;
  }
  .d-title a{
    color: #fff;
  }
  .d-t-a{
    color: #bdd0db;
    text-shadow: 1px 1px 0 #5d7aa1;
  }
  .d-summary{
    // color: #222;
    font-size: 16px;
    line-height: 25px;
    margin-top: 10px;
    text-shadow: 1px 1px 0 #5d7aa1;
  }
  .d-read-more{
    margin-top: 25px;
    text-align: right;
  }
  .d-read-more a{
    display: inline-block;
    border:1px solid #fff;
    padding: 10px;
    color: #075498;
    font-size: 15px;
    font-weight: 300;
    border-radius: 2px;
    text-shadow: 1px 1px 0 #333;
  }






</style>

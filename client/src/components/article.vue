<template>
 <div class="container">
    <div class="page-header">
      <h1>{{articleData.title}}</h1>
      <div class="time-author">
        <i class="el-icon-time"></i> {{articleData.create_time}} <i class="el-icon-edit-outline"></i> {{articleData.author}}
      </div>
      <div class="menu" v-if = "articleData.toc_status == 1" v-html="articleData.toc"></div>
    </div>

    <div v-html="articleData.content" class="markdown-body"></div>
    <div id="SOHUCS" :sid="articleData.id"></div>
  </div>
</template>

<script>
require('../assets/js/changyan')
export default {
  name: 'HelloWorld',
  data () {
    return {
      articleData:{}
    }
  },
  created: function() {


    var id = this.$route.params.id;
    var _this = this;
     this.axios.get('/api/getArticle/', {
        params: {
          id: id
        }
      }).then((response) => {
        var res = response.data
        console.log(res)
        if (res.code === 0) {
          _this.articleData = res.data;
        } else {
          alert(res.msg)
        }

      })

  },mounted:function() {
    window.changyan.api.config({
      appid: 'cytoG84hF',
      conf: 'prod_f34ae27e3ef94b851f1aba48f9ae9932'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

@import '../assets/css/marked.css';
.container{
  box-sizing: border-box;
  padding: 20px 20px 40px 20px;
  background: #fff;
  margin:0 25px 25px 25px;
  max-width: 950px;
  border-radius: 2px;
  background-image: url(../assets/imgs/tiny_grid.png);
  background-repeat: repeat;
}
.page-header{
  font-size: 16px;
  text-align: center;
  margin:20px 0;
  .time-author{
    line-height: 40px;
  }
  h1{
    text-align: center;
    font-weight: 400;
    font-size: 35px;
  }
}
.menu{
  text-align: left;
  li a{
    color: #337ab7;
  }

}






</style>

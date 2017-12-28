<template>
 <div class="container">
    <div class="page-header">
      <h1>{{articleData.title}}</h1>
      <div v-if = "articleData.toc_status == 1" v-html="articleData.toc"></div>
    </div>

    <div v-html="articleData.content" class="markdown-body"></div>

  </div>
</template>

<script>
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

@import '../assets/css/marked.css';
.page-header{
  width: 1000px;
  margin:0 auto;
  /*text-align: center;*/
}

.page-header h1{
  text-align: center;
}


</style>

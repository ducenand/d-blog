<template>
  <div>
    <div v-for="item in articleList">
      <router-link :to="/article/+item.id">{{item.title}}</router-link>
      <div>{{item.summary}}</div>
      <time>{{item.create_time}}</time>
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
<style lang="less" rel="stylesheet/less" scoped>



</style>

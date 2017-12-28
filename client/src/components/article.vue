<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'artice222'
    }
  },
  created: function() {
    var id = this.$route.params.id;
     this.axios.get('/api/getArticle/', {
        params: {
          id: id
        }
      }).then((response) => {
        var res = response.data

        if (res.code === 0) {

        } else {

        }

      })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>

.hello{
  width: 200px;
  height: 200px;
  background: red;
  h1{
    color: #fff;
  }
}

</style>

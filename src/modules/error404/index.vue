<!-- Created by hudie on 2018/11/10-->
<template>
  <!--404页面 start-->
  <div class='box'>
    <div class="error404">
      <img :src="imageUrl" class="error404-image" alt="">
    </div>
  </div>
  <!--404页面 end-->
</template>

<script>
    export default {
        name: "error404",
        data() {
            return {
              imageUrl: require('../../assets/img/404.png')
              // imageUrl: ''
            }
        },
        methods: {},
        created: function () {

        },
        mounted: function () {

        },
    }
</script>

<style>
  .error404{
    margin: 1.333333rem auto;
    display: flex;
    width: 75%;
    justify-content: center;
  }
  .error404-image{
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div class="success_main">
    <p><img src="../../assets/img/success.png"></p>
     <p class="success-btn">
        <a href="https://android.myapp.com/myapp/detail.htm?apkName=com.founder.shufa&ADTAG=mobile">立即体验</a>
      </p>
  </div>

</template>
<script>
  export default {
    name:"success"
  }
</script>
<style>

.success_main img{
  width: 100%;
  margin-top: 88px;
}
.success-btn {
  width: 100%;
  text-align: center;  
 margin-top: 25px;  
  height: 50px;
  line-height: 50px;
  
}
.success-btn a {
      color: #fff;
    width: 90%;
    display: inline-block;
    text-align: center;
    background: #b4272d;
    border-radius: 4px;
}
</style>

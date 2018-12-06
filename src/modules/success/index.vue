<template>
  <div class="success_main">
    <p><img src="../../assets/img/success.png"></p>
     <van-button type="danger" size="large" class="success-btn" @click="submitRegister">
        立即体验
      </van-button>
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
  width: 90%;
  background: #b4272d;
 margin-top: 25px;
  border-radius: 4px;
}
</style>

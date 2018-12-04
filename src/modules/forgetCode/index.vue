<template>
  <div>
  <h3>输入手机号</h3>
    <van-cell-group>
      <van-field v-model="phone" placeholder="手机号" error-message="手机号格式错误" />
     
    </van-cell-group>
    <van-button type="danger" size="large">找回密码</van-button>
</div>
</template>
<script>
export default {
  name: "forgetCode"
};

</script>
<style>

</style>

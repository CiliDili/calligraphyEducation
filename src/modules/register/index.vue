<template>
  <div class="register_main">
    <h3>注册</h3>
    <van-cell-group>
      <van-field v-model="phone" placeholder="请输入手机号" error-message="手机号格式错误" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="password" type="password" placeholder="设置密码（6-18位）" required />
    </van-cell-group>
    <van-button type="danger" size="large">注册</van-button>
  </div>
</template>
<script>
export default {
  name: "register"
};

</script>

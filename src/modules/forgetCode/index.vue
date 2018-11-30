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
.login_main {
  margin: 160px auto;
  text-align: center;
  width:366px;
  background: #FFFFFF;
  border: 1px solid #CFCFCF;
  box-shadow: 0 2px 4px 0 rgba(207,207,207,0.50);
  border-radius: 8px 8px 4px 4px;
}
.login_main .login_forget_password {
  float: left;
}
.login_main .login_register {
  float: right;
}
.login_main .logo{
  margin-top:-45px;
}
.login_main .logo img{
  width:78px;
  height:85px;
}
.login_main input{
  border:none;
  border-bottom:1px solid #d8d8d8;
  border-radius:none;
}
.deal{
  height:49px;
  line-height:49px;
  margin:0;
  background:#f4f4f4;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  letter-spacing: 2px;
  /*padding:12px 16px 15px 34px;*/
}
.deal a{
  color:#b4272d;
  cursor: pointer;
}
.el-form-item__content{
  margin:0 37px;
}
.phone{
  border:none;
}
.pwd{
  border:none;
}
.adminBtn{
  width:294px;
  height:34px;
  background: #B4272D;
  border-radius: 5px;
  line-height: 34px;
  padding: 0;
}
</style>

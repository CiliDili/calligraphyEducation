<template>
  <div class="login_main">
    <!-- 登录 -->
    <h3>登录</h3>
    <form :model="loginForm" :rules="loginRules" ref="loginForm" action="" class="login_form">
    <van-cell-group>
      <van-field v-model="loginForm.phone" placeholder="手机号" class="phone" error-message="手机号格式错误" />
      <van-field v-model="loginForm.password" type="password" class="password" placeholder="密码" required />
    </van-cell-group>
    <van-button type="danger" size="large" @click="submit('loginForm',loginForm)">登录</van-button>
  </form>
    <!-- 忘记密码 注册 -->
    <van-row class="register">
      <van-col span="12"><span @click="forgetCode">忘记密码</span> </van-col>
      <van-col span="12"><span @click="toRegister">注册新用户</span></van-col>
    </van-row>
    <!-- 第三方登录 -->
    <van-row type="flex" justify="center" class="otherwise">
      <van-col span="12">以其他方式登录</van-col>
    </van-row>
    <van-row type="flex" justify="center" class="three_method">
      <van-col span="6"><img src="../../assets/img/wechat.png"></van-col>
        <van-col span="6"><img src="../../assets/img/qq.png"></van-col>
          <van-col span="6"><img src="../../assets/img/weibo.png"></van-col>
    </van-row>
  </div>
</template>
<script>
import { Field, Cell, CellGroup, Button, Icon, Row, Col } from 'vant';
import Vue from 'vue';
Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(Icon).use(Row).use(Col);

// import md5 from "blueimp-md5";
import { login } from "@/api/login";
import axios from "axios";
import Cookies from 'js-cookie';
export default {
  name: "login",
  data() {
    var validatePhone = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请输入手机号"));
      }else {
        callback();
      }
    };
    var validatePassword = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请输入密码"));
      }else{
        callback();
      }
    };
    return {
     loginRules:{
      phone:[{validator : validatePhone,trigger:"blur"}],
      password:[{validator : validatePassword,trigger:"blur"}]
     },
     loginForm:{
      phone:"",
      password:""
     },
    };
  },
  methods: {
    submit(formName){
      this.$refs[formName].validate(valid =>{
        console.log(valid)
        if(valid){
          var params = {
            user_type: "1",
            reg_from: "6",
            phone: this.loginForm.phone,
            passwd: md5(this.loginForm.password),
            device_id: "000",
            client_sys: "",
            version: "2.3.0"
          };
          login(params).then(response =>{
             if(response.data.code == 0) {
            // Cookies.set('user_id', response.data.data.id, { expires: 1 });
            // Cookies.set('commonToken', response.data.data.token, { expires: 1 });
              this.$router.push({ name: 'exchange' })
            }else {
              this.$message({
              type: 'error',
              message: response.data.message
            });
            }
          });
        }
        else {
          console.log("error submit!!");
          return false;
        }

      });
    },
    toRegister() {
      this.$router.push({
        name: "register"
      });
    },
    forgetCode() {
      this.$router.push({
        name: "forgetCode"
      })
    },
    // exchange() {
    //   this.$router.push({
    //     name: "exchange"
    //   })
    // },
  },

}

</script>
<style>
.login_main {
  font-family: PingFangSC-Regular;
}

.login_main img {
  width: 50%;
}

h3 {
  margin-top: 10px;
}

.van-cell {
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  line-height: 24px;
  position: relative;
  background-color: #fff;
  color: #323233;
  font-size: 14px;
}

.van-button--large {
  width: 90%;
  opacity: 0.3;

  border-radius: 4px;
}

.register {
  margin-top: 25px;

  font-size: 14px;
  color: #999999;
}

.otherwise {
  margin-top: 150px;
  font-size: 12px;
  color: #999999;
}

.three_method {
  margin-top: 50px;
}

</style>

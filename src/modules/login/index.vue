<template>

  <div class="login_main">
 <!-- 登录 -->
    <van-cell-group>
     <van-field
       v-model="username"
       required
       clearable
       label="用户名"
       icon="question"
       placeholder="请输入用户名"
       @click-icon="$toast('question')"
     />

     <van-field
       v-model="password"
       type="password"
       label="密码"
       placeholder="请输入密码"
       required
     />
   </van-cell-group>
   <van-cell-group>
     <van-field
       v-model="sms"
       center
       clearable
       label="短信验证码"
       placeholder="请输入短信验证码"
     >
       <van-button slot="button" size="small" type="primary">发送验证码</van-button>
     </van-field>
   </van-cell-group>
   <van-button size="large">登录</van-button>
   <!-- 忘记密码 注册 -->
   <van-row>
     <van-col span="12">忘记密码 </van-col>
     <van-col span="12">注册新用户</van-col>
   </van-row>
        <!-- 第三方登录 -->
        <van-row type="flex" justify="center">
     <van-col span="12">以其他方式登录</van-col>
   </van-row>
   <van-row type="flex" justify="center">
     <van-col span="6"><img src="../../assets/img/wechat.png"></van-col>
     <van-col span="6"><img src="../../assets/img/qq.png"></van-col>
     <van-col span="6"><img src="../../assets/img/weibo.png"></van-col>
   </van-row>
</div>

</template>
<script>
import { Field, Cell, CellGroup, Button,Icon, Row, Col } from 'vant';
import Vue from 'vue';
Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(Icon).use(Row).use(Col);

// import md5 from "blueimp-md5";
import { apiLoginByUsername} from "@/api/login";
import axios from "axios";
import Cookies from 'js-cookie';
export default {
  name: "login",
  data() {
    var validatemobileNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginRules: {
        mobileNum: [{ validator: validatemobileNum, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      loginForm: {
        mobileNum: "",
        password: ""
      },
      dialogVisible: false
    };
  },
  mounted: function () {
   axios.post("/index.php/Users/login", {
     mobileNum: "13011111111",
     password: "123456"
   }).then(function (response) {
     console.info(1, response);
   });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            user_type: "1",
            reg_from: "6",
            phone: this.loginForm.mobileNum,
            passwd: md5(this.loginForm.password),
            device_id: "000",
            client_sys: "",
            version: "2.3.0"
          };
          apiLoginByUsername(params).then(response => {
            if(response.data.code == 0) {
           Cookies.set('user_id', response.data.data.id, { expires: 1 });
            Cookies.set('commonToken', response.data.data.token, { expires: 1 });
            Cookies.set('vip_date', response.data.data.vip_date, { expires: 1 });
           Cookies.set('to_user_id', response.data.data.id, { expires: 1 });
              this.$router.push({ name: 'mybook' })
            }else {
              this.$message({
              type: 'error',
              message: response.data.message
            });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //跳转到注册页面
    toRegister() {
      this.$router.push({
        name: "register"
      });
    },
    //跳转到协议页面
    // agreement: function () {
    //     this.$router.push({name: 'agreement'})
    //   }
  }
};
</script>
<style>
.login_main{

}
.login_main img{
  width: 50%;
}
</style>

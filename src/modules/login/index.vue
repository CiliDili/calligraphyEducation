<template>
  <div class="login_main">
    <!-- 登录 -->
    <h3>登录</h3>
    <div>
      <van-cell-group class="form_item">
        <van-field v-model="loginForm.phone"
                   placeholder="请输入手机号/用户名"
                   class="phone"
                   :error-message="errorMsg.phone"
                   @focus="focusValidate('phone')"
                   @blur="blurValidate"
        />
        <van-field v-model="loginForm.password"
                   type="password"
                   class="password"
                   placeholder="密码"
                   :error-message="errorMsg.password"
                   @focus="focusValidate('password')"
                   @blur="blurValidate"
        />
      </van-cell-group>
      <van-button type="danger"
                  size="large"
                  @click="submitForm"
                  :class="dialogVisible ? 'login-btn' : 'login-btn-show'"
      >登录</van-button>
    </div>
    <!--</form>-->
    <!-- 忘记密码 注册 -->
    <van-row class="register">
      <van-col span="12"><span @click="forgetCode">忘记密码</span></van-col>
      <van-col span="12"><span @click="toRegister">注册新用户</span></van-col>
    </van-row>
    <!-- 第三方登录 -->
    <van-row type="flex" justify="center" class="otherwise">
      <van-col span="12">以其他方式登录</van-col>
    </van-row>
    <van-row type="flex" justify="center" class="three_method">
      <van-col span="6"><img src="../../assets/img/wechat.png"></van-col>
      <van-col span="6"><img src="../../assets/img/qq.png"></van-col>
      <van-col span="6"><a
        href="https://api.weibo.com/oauth2/authorize?client_id=1396355807&redirect_uri=http://m.anyew.com/login-weibo_return?borrow=1&callbackurl=aHR0cDovL20uYW55ZXcuY24vbG9naW4td2VpYm9fcmV0dXJu"><img
        src="../../assets/img/weibo.png"></a></van-col>
    </van-row>
  </div>
</template>
<script>
  import {Field, Cell, CellGroup, Button, Icon, Row, Col} from 'vant';
  import validator from '@common/utils/validator'
  import md5 from "blueimp-md5";
  import {login} from "@/api/login";
  import Cookies from 'js-cookie';
  import {Toast} from 'vant';

  export default {
    name: "login",
    data() {
      const validatephone = (rule, value, callback) => {
        if (value === "") {
          callback('请输入手机号/用户名');
        } /*else if (!/^[1][0-9]{10}$/.test(value)) {
          callback('请输入正确的手机号码');
        }*/ else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value === "") {
          callback('请输入密码');
        } else if (/^[a-zA-Z0-9]{6,18}$/.test(value)) {
          callback();
        } else {
          callback('请输入正确的6-18位密码');
        }
      };
      return {
        loginRules: {
          phone: [{validator: validatephone}],
          password: [{validator: validatePassword}]
        },
        loginForm: {
          phone: "13333653512",
          password: ""
        },
        errorMsg: {
          phone: "",
          password: ""
        },
        dialogVisible: true
      };
    },
    methods: {
      blurValidate() {
        this.validate((errors, fields) => {
          console.log(errors);
          if(!errors){
            this.dialogVisible = false;
          }else{
            this.dialogVisible = true;
          }
        })
      },
      /*输入框获取焦点后,清空页面错误数据*/
      focusValidate(obj) {
        this.errorMsg[obj] = '';
      },
      /*验证必备*/
      validate(callback, data) {
        this.validator.validate((errors, fields) => {
          this.resetField();
          if (errors) {
            fields.forEach(item => {
              this.errorMsg[item.field] = item.message
            })
          }
          callback && callback(errors, fields)
        }, data);
      },
      /**
       * 清除验证提示
       * @param attrs
       */
      resetField(attrs) {
        attrs = !attrs ? Object.keys(this.errorMsg) : (Array.isArray(attrs) ? attrs : [attrs]);
        attrs.forEach(attr => {
          this.errorMsg[attr] = ''
        })
      },
      //QQ   APP ID：101527480
      //APP Key：aad6c9fc4c4472f08ce7f6f27b9f3264
      submitForm() {
        this.validate((errors, fields) => {
         if(!errors){
           var params = {
             phone: this.loginForm.phone,
             passwd: md5(this.loginForm.password),
           };
           login(params).then(response => {
             if(response.data.code == 0) {
               Cookies.set('user_id', response.data.data.id, { expires: 1 });
               Cookies.set('commonToken', response.data.data.token, { expires: 1 });
               this.$router.push({ name: 'exchange' })
             }else{
               Toast.fail({
                 duration: 1000,       // 持续展示 toast
                 forbidClick: true, // 禁用背景点击
                 loadingType: 'circular',
                 message: response.data.message
               });
             }
           });
         }
        })
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
      exchange() {
        this.$router.push({
          name: "exchange"
        })
      },
      reset() {
        this.loginForm = {
          phone: "",
          password: ""
        };
        this.validator.setData(this.loginForm);
        this.resetField();
      },
    },
    created() {
      this.validator = validator(this.loginRules, this.loginForm);
    }
  };

</script>
<style>
  .login_main {
    font-family: PingFangSC-Regular;
  }

  .login_main img {
    width: 50%;
  }

  h3 {
    margin: 30px 0;
  }

  .form_item {
    margin-bottom: 50px;
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

  .login-btn {
    width: 90%;
    opacity: 0.3;
    border-radius: 4px;
  }
  .login-btn-show {
    width: 90%;
    border-radius: 4px;
  }

  .phone {
    line-height: 48px;
  }

  .password {
    line-height: 48px;
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

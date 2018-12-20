<template>
  <div class="register_main">
    <h3>注册</h3>
    <van-cell-group>
      <!--  <van-field
        placeholder="名称/姓名"
        v-model="data.name"
        :error-message="errorMsg.name"
      ></van-field> -->
      <van-field type="tel"
                 placeholder="手机号(仅中国大陆)"
                 v-model="data.mobile"
                 :error-message="errorMsg.mobile"
                 @click-icon="data.mobile = ''"
                 @focus="focusValidate('mobile')"
                 @blur="blurValue"
                 @keyup="getInputValue"
                 icon="clear"></van-field>
      <van-field center v-model="data.code"
                 placeholder="验证码"
                 icon="clear"
                 :error-message="errorMsg.code"
                 @focus="focusValidate('code')"
                 @click-icon="data.code = ''">
        <van-button slot="button"
                    size="small"
                    :disabled="countdown > 0"
                    @click="sendMobileCode"
                    type="danger"
                   :class="dialogVisible ? 'send_code_show' : 'send_code'">
          {{ countdown ? countdown + 's重新获取' : '发送验证码'}}
        </van-button>
      </van-field>
      <van-field v-model="data.password"
                 type="password"
                 placeholder="设置密码(6-18位)"
                 :error-message="errorMsg.password"
                 @focus="focusValidate('password')"
                 @blur="blurValue"
                 @click-icon="data.password = ''" />
    </van-cell-group>
    <div @click="register" :class="registerVisible ? 'register-btn-show' : 'register-btn'">注册</div>
  </div>
</template>
</template>
<script>
import { Field, Cell, CellGroup, Button, Icon, Row, Col } from 'vant';
import Vue from 'vue';
import md5 from "blueimp-md5";
import { register } from "@/api/register";
Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(Icon).use(Row).use(Col);
// import axios from "axios";
// import Cookies from "js-cookie";
import validator from '@common/utils/validator'

export default {
  name: 'register',
  data() {
    return {
      countdown: 0,
      dialogVisible:true,
      registerVisible:true,
      errorMsg: {
        mobile: '',
        password: '',
        code: '',
      },
      rules: {
        // name: [
        //   { required: true, message: '请输入名称' },
        //   {
        //     validator: (rule, value, callback) => {
        //       if (!value) {
        //         callback('请输入正确的用户信息');
        //       } else if (/^[1][0-9]{10}$/.test(value)) {
        //         callback();
        //       } else {
        //         callback('请输入正确的用户信息--chaibiying');
        //       }
        //     }
        //   }
        // ],
        password: [
          { required: true, message: '请输入密码' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入密码');
              } else if (/^[a-zA-Z0-9]{6,18}$/.test(value)) {
                callback();
              } else {
                callback('请输入正确的6-18位密码');
              }
            }
          }
        ],
        mobile: [{
          validator: (rule, value, callback) => {
            if (!value) {
              callback('请输入手机号码');
            } else if (/^[1][0-9]{10}$/.test(value)) {
              callback();
            } else {
              callback('请输入正确的手机号码');
            }
          }
        }],
        code: [
          { required: true, message: '请输入验证码' }
        ],
      },
      data: {
        mobile: "",
        password: "",
        code: "",
      },
    }
  },
  methods: {
    /*输入框获取焦点后,清空页面错误数据*/
    focusValidate(obj) {
      this.errorMsg[obj] = '';
    },
    blurValue(){
      console.log(221)
      // this.validate((errors) => {
      //     console.log(errors);
      //     if(!errors){
      //       this.registerVisible = false;
      //     }else{
      //       this.registerVisible = true;
      //     }
      //   })
    },
    getInputValue(){
         if(this.data.mobile.length>=1){
          this.dialogVisible = false;
          this.registerVisible = false;
        }
    },
    /*发送验证码*/
    sendMobileCode() {
      this.validate(errors => {
        if (!errors) {
          // Toast('发送成功');
          this.dialogVisible = true;
          this.countdown = 60;
          this.countdownSubtract();
        }
      }, 'mobile')
      // this.validate(errors => {
      //   if (!errors) {
      //     // Toast('yb');
      //     this.countdown = 60;
      //     this.countdownSubtract();
      //   }
      // }, 'name')

    },
    countdownSubtract() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownSubtract()
        }, 1000)
      }
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
    //验证
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
    register(formName) {
      this.validate((errors, fields) => {
        if(!errors){
          var params = {
            mobile: this.data.mobile,
            passwd: md5(this.data.password),

          };
          register(params).then(response => {
            if (response.data.code == 0) {
              console.log(111)
              this.$router.push({ name: 'login' })
            } else {

            }
          });
        }
      })
    },
  },
  created() {
    this.validator = validator(this.rules, this.data);
  },
}

</script>
<style>
h3 {
  margin: 30px 0;
}

.register_main {
  font-family: PingFangSC-Regular;
}

.register-btn,.register-btn-show  {
  width: 90%; 
  margin-top: 25px;
  border-radius: 4px;
  line-height: 48px;
  color: #fff;
  height: 48px;
  margin: 25px auto;
}
.register-btn{
   background: #b4272d;
}
.register-btn-show {
  background: #b4272d;
  opacity: 0.3
}
.send_code{
   background: #b4272d;
}
.send_code_show{
      background: #fff;
    color: #c7c7c7;
    border:1px solid #c7c7c7;
    border-radius:4px;
}
</style>

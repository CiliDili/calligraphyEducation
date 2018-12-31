<template>
  <div class="forget_main">
    <h3>找回密码</h3>
    <van-cell-group>
      <van-field type="tel" placeholder="手机号(仅中国大陆)" v-model="data.mobile" :error-message="errorMsg.mobile" @click-icon="data.mobile = ''" icon="clear" class="phone" @keyup="getInputValue"></van-field>
      <van-field center v-model="data.code" placeholder="验证码" icon="clear" :error-message="errorMsg.code" @click-icon="data.code = ''" class="code">
        <van-button slot="button" size="small" :disabled="countdown > 0" @click="sendMobileCode" type="danger" :class="dialogVisible ? 'send_code_show' : 'send_code'">
          {{ countdown ? countdown + 's重新获取' : '发送验证码'}}
        </van-button>
      </van-field>
      <van-field v-model="data.password" type="password" placeholder="设置密码(6-18位)" :error-message="errorMsg.password" @click-icon="data.password = ''" class="password" />
    </van-cell-group>
    <!-- <van-button type="danger" size="large" class="forget-btn" @click="submitNewCode('codeForm',codeForm)">找回密码</van-button> -->
    <div :class="forgetVisible ? 'forget-btn-show' : 'forget-btn'" @click="forgetCode">找回密码</div>
  </div>
</template>
<script>
import { Field, Cell, CellGroup, Button, Icon, Row, Col } from 'vant';
import Vue from 'vue';
import md5 from "blueimp-md5";
import axios from "axios";
import Cookies from "js-cookie";
import { forgetCode, sendMsg, phoneReg } from "@/api/forgetCode";
import { Toast } from 'vant';
Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(Icon).use(Row).use(Col);
import validator from '@common/utils/validator'

export default {
  name: 'forgetCode',
  data() {
    return {
      countdown: 0,
      dialogVisible: true,
      forgetVisible: true,
      errorMsg: {
        name: '',
        mobile: '',
        code: '',
      },
      rules: {
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
    getInputValue() {
      if (this.data.mobile.length >= 1) {
        this.dialogVisible = false;
        this.forgetVisible = false;
      }else{
        this.dialogVisible = true;
        this.forgetVisible = true;
      }
    },
    sendMobileCode() {
      this.validate(errors => {
        if (!errors) {
          var params = {
            phone: this.data.mobile,
          };

          sendMsg(params).then(response => {
            if (response.data.code == 0) {
              console.log("发送验证码")
            } else {
              Toast.fail({
                duration: 1000, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'circular',
                message: response.data.message
              });
            }
          });
          // Toast('发送成功');
          this.dialogVisible = true;
          this.countdown = 60;
          this.countdownSubtract();
        }
      }, 'mobile')
    },
    countdownSubtract() {
      if (this.countdown > 0) {
        setTimeout(() => {
          this.countdown -= 1;
          this.countdownSubtract()
        }, 1000)
      }
    },
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
    forgetCode(formName) {
      var params = {
        phone: this.data.mobile,
        newpasswd: md5(this.data.password),
        device_id: '000',
        verify_code:this.data.code,
      };
      axios.defaults.headers['token'] = Cookies.get('commonToken');
      phoneReg(params).then(response => {
            if (response.data.code == 0) {
              console.log("手机号是否已注册")
            } else {
               Toast.fail({
                 duration: 1000,       // 持续展示 toast
                 forbidClick: true, // 禁用背景点击
                 loadingType: 'circular',
                 message: response.data.message
               });
            }
          });
      forgetCode(params).then(response => {
        if (response.data.code == 0) {
          this.$router.push({ name: 'login' })
        } else {
          Toast.fail({
            duration: 1000, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'circular',
            message: response.data.message
          });
        }
      });
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

.forget-btn,
.forget-btn-show {
  width: 90%;
  margin-top: 25px;
  border-radius: 4px;
  line-height: 48px;
  color: #fff;
  height: 48px;
  margin: 25px auto;
}

.forget-btn {
  background: #b4272d!important;
}

.forget-btn-show {
  background: #b4272d!important;
  opacity: 0.3!important;
}

.send_code {
  background: #b4272d!important;
}

.send_code_show {
  background: #fff!important;
  color: #c7c7c7!important;
  border: 1px solid #c7c7c7;
  border-radius: 4px;
}

.form_item {
  margin-bottom: 48px;
}

.password {
  line-height: 48px;
}

.send_code {
  background: #b4272d
}

.code {
  line-height: 48px;
}

.testCode {
  background: #b4272d;
}

</style>

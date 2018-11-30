<template>
  <div class="register_main">
    <h3>注册</h3>
    <van-cell-group>
      <!--  <van-field
        placeholder="名称/姓名"
        v-model="data.name"
        :error-message="errorMsg.name"
      ></van-field> -->
      <van-field type="tel" placeholder="手机号(仅中国大陆)" v-model="data.mobile" :error-message="errorMsg.mobile" @click-icon="data.mobile = ''" icon="clear"></van-field>
      <van-field center v-model="data.code" placeholder="验证码" icon="clear" :error-message="errorMsg.code" @click-icon="data.code = ''">
        <van-button slot="button" size="small" :disabled="countdown > 0" @click="sendMobileCode" type="danger">
          {{ countdown ? countdown + 's' : '发送验证码'}}
        </van-button>
      </van-field>
      <van-field v-model="data.password" type="password" placeholder="设置密码(6-18位)" :error-message="errorMsg.password" @click-icon="data.password = ''" />
    </van-cell-group>
    <div class="pad-all mar-top">
      <van-button type="danger" size="large" class="register-btn" @click="submit">
        注册
      </van-button>
      <!-- <van-button
        block
        class="mar-top"
        @click="reset">
        重置
      </van-button> -->
    </div>
  </div>
</template>
</template>
<script>
import { Field, Cell, CellGroup, Button, Icon, Row, Col } from 'vant';
import Vue from 'vue';
import md5 from "blueimp-md5";
import { register } from "@/api/register"
Vue.use(Field).use(Cell).use(CellGroup).use(Button).use(Icon).use(Row).use(Col);
// import axios from "axios";
// import Cookies from "js-cookie";

import validator from '@common/utils/validator'
export default {
  name: 'register',
  data() {
    return {
      countdown: 0,
      data: {
        name: '',
        mobile: '',
        code: '',
      },
      errorMsg: {
        name: '',
        mobile: '',
        code: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback('请输入正确的用户信息');
              } else if (/^[1][0-9]{10}$/.test(value)) {
                callback();
              } else {
                callback('请输入正确的用户信息--chaibiying');
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
        ]
      },
    }
  },
  methods: {
    sendMobileCode() {
      this.validate(errors => {
        if (!errors) {
          // Toast('发送成功');
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
    /**
     * 验证方法
     * @param callback
     * @param data
     */
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
    submit() {
      this.validate((errors, fields) => {
        // if(fields){
        //   var params = {
        //     reg_from : "6",
        //     phone:this.data.mobile,
        //     password:md5(this.data.password),
        //     devide_id:"000",
        //     client_sys:"",
        //     version:"1.0.0"
        //   };
        //   register(params).then(response =>{
        //     if(response.data.code == 0){
        //         console.log("test")
        //     }else{
        //         this.$mewssage({
        //           type:"error",
        //           message:response.data.message
        //         });
        //     }
        //   });
        // }else{
        //   console.log("error submit!!!");
        //   return false;
        // };
      })
    },
    reset() {
      this.data = {
        name: '',
        code: '',
        mobile: '',
      };
      this.validator.setData(this.data);
      this.resetField();
    },
  },
  created() {
    this.validator = validator(this.rules, this.data);
  },
}

</script>
</script>
<style>
.register_main {
  font-family: PingFangSC-Regular;
}
.register-btn{
  width:90%;
  background: #b4272d;
  opacity: 0.3;
  color:#fff;
}
.van-button--danger{
  background: #b4272d
}
</style>

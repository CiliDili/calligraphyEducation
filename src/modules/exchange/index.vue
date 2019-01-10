<template>
  <div class="exchange_main">
    <h3>请输入兑换码</h3>
    <van-cell-group class="exchange-code">
      <van-field v-model="value" placeholder="兑换码" />
    </van-cell-group>
    <div class='exchange-btn'><span @click="getInviteCode">立即兑换</span></div>
  </div>
</template>
<script>
import Vue from 'vue';
import qs from 'qs';
import { CouponCell, CouponList } from 'vant';
import { bindInviteCode } from "@/api/bindInviteCode";
import Cookies from 'js-cookie';
import axios from "axios";
import {Toast} from 'vant';

export default {
  name: "exchange",
  data() {
    return {
      invite_code: '',
      value: '',
    }
  },

  methods: {
    getInviteCode() {
      // 正常账号密码登录获取user_id ,第三方登录获取后台存储的cookies里的user_info的user_id      
      let user_id = Cookies.get('user_id') || "";
      let user_nid = "";
      let obj = Cookies.get('user_info') || "";
      let userInfo = "";
      let user_info = "";

      if (obj == "") {
        userInfo = ""
      } else {
        Cookies.set("user_id", '');
        userInfo = JSON.parse(obj);
        user_info = userInfo.data.id || "";
      }
      //console.log(userInfo.data.id)

      if (user_id !== "") { 
        user_nid = user_id;
      } else {
        user_nid = user_info;
      }
      //console.log(user_nid)

      //取不到cookies里的user_info 目的：取到cookies里的user_info,解析其中的user_id,传到data中。
      var params = {
        user_id: user_nid,
        invite_code: this.value,
      };

      axios.defaults.headers['token'] = Cookies.get('commonToken');
      bindInviteCode(params).then(response => {
        if (response.data.code == 0) {
          this.$router.push({ name: 'success' })
        } else {
          Toast.fail({
                 duration: 1000,       // 持续展示 toast
                 forbidClick: true, // 禁用背景点击
                 loadingType: 'circular',
                 message: response.data.message
               });
        }
      })
    },
  }
}

</script>
<style>
h3 {
  margin: 30px 0;
}
html {
    background: #fff;
     -webkit-tap-highlight-color:#fff;
}

.van-hairline--top-bottom::after{
  border-bottom-width: 1px!important;
}
.exchange_main{
  padding: 0 15px;
}
.exchange-code {
  line-height: 48px;
  margin-bottom: 40px;
}

.exchange-btn {
  width: 90%;
  background: #b4272d;
  margin-top: 25px;
  border-radius: 4px;
  line-height: 48px;
  color: #fff;
  height: 48px;
  margin: 25px auto;
}

</style>

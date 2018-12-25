<template>
  <div class="exchange_main">
    <h3>请输入兑换码</h3>
    <van-cell-group class="exchange-code">
      <van-field v-model="value" placeholder="兑换码" />
    </van-cell-group>
    <div class='exchange-btn'><span @click="getInviteCode">兑换</span></div>
  </div>
</template>
<script>
import Vue from 'vue';
import { CouponCell, CouponList } from 'vant';
import {bindInviteCode} from "@/api/bindInviteCode";
import Cookies from 'js-cookie';
import axios from "axios";
 
export default {
  name: "exchange",
  data() {
    return {
      invite_code:'',
      value:'',
    }
  },

  methods: {
    getInviteCode() {
      let user_info = Cookies.get('user_info');
      let user_id = Cookies.get('user_id');
      let use_nid = user_id ? user_id:user_info;
   var strcookie = document.cookie;
  console.log(strcookie);
      var data = {
         user_nid: user_nid,         
         invite_code:this.value,
       };
     
      axios.defaults.headers['token'] = Cookies.get('commonToken');
      bindInviteCode(data).then(response => {
        if (response.data.code == 0) {
          console.log("成功了")
          this.$router.push({ name: 'success' })
        } else {
          console.log("不成功");
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

<template>
  <div class="exchange_main">
    <h3>请输入兑换码</h3>
    <van-cell-group class="exchange-code">
      <van-field v-model="value" placeholder="兑换码" />
    </van-cell-group>
   <!--  <van-button type="danger" size="large" class="exchange-btn" @click="getInviteCode">
       立即兑换
      </van-button> -->
    <div class='exchange-btn' @click="getInviteCode">立即兑换</div>
  </div>
</template>
<script>
import Vue from 'vue';
import { CouponCell, CouponList } from 'vant';
import {bindInviteCode} from "@/api/bindInviteCode";
import Cookies from 'js-cookie';
import axios from "axios";
//import { bindInviteCode } from "@/api/bindInviteCode";
 
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
      var data = {
         to_user_id: Cookies.get('to_user_id'),
         invite_code:this.value,
          reg_from: "6",
          client_sys: '',
          version: '2.3.0'
       };
       console.log(data.to_user_id)
      // axios.defaults.headers['token'] = Cookies.get('commonToken');
      bindInviteCode(data).then(response => {
        if (response.data.code == 0) {
          console.log(this.invite_code)
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

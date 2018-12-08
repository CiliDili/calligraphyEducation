<template>
  <div class="exchange_main">
    <h3>请输入兑换码</h3>
    <van-cell-group class="exchange-code">
      <van-field v-model="value" placeholder="兑换码" />
    </van-cell-group>
    <van-button type="danger" class='exchange-btn' @click="getInviteCode">立即兑换</van-button>
  </div>
</template>
<script>
import Vue from 'vue';
import { CouponCell, CouponList } from 'vant';
import * as api from "@/api/bindInviteCode";
//import { bindInviteCode } from "@/api/bindInviteCode";
 
export default {
  name: "exchange",
  data() {
    return {
      // inviteCode: {},
    }
  },

  methods: {
    getInviteCode(invite_code) {
      var data = {
        invite_code:invite_code,
      };
      api.bindInviteCode(data).then(response => {
        if (response.data.code) {
          console.log(data)
          Message({
            message: response.data.message,
            type: "error",
            duration: 5 * 1000
          });
        } else {
          console.log(11)
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
  border-radius: 4px;

}

</style>

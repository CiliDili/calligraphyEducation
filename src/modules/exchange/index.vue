<template>
  <div class="exchange_main">
    <h3>请输入兑换码</h3>
    <div class="van-cell van-cell--borderless van-field van-coupon-list__field"><!----><!----><div class="van-cell__value van-cell__value--alone"><div class="van-field__body"><input type="text" placeholder="请输入优惠码" maxlength="20" class="van-field__control"><!----><!----><div class="van-field__button"><button disabled="disabled" class="van-button van-button--danger van-button--small van-button--disabled van-button--unclickable van-coupon-list__exchange"><span class="van-button__text">兑换</span></button></div></div><!----></div><!----></div>
  </div>
</template>
<script>
import Vue from 'vue';
import { CouponCell, CouponList } from 'vant';

Vue.use(CouponCell).use(CouponList);
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  originCondition: 0,
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000
};

export default {
  data() {
    return {
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    }
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  }
}

</script>
<style>
</style>

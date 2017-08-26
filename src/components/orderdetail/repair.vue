<!-- 维修簇页面 -->
<template>
	<article class="repair">
	   <template v-if="orderStatus==11">
       <wait-prepay></wait-prepay>
    </template>
     <template v-else-if="orderStatus==12">
      <in-acceptance></in-acceptance>
    </template>
     <template v-else-if="orderStatus==13">
      <wait-service></wait-service>
    </template>
     <template v-else-if="orderStatus==14">
      <in-service></in-service>
    </template>
     <template v-else-if="orderStatus==15">
      <wait-pay></wait-pay>
    </template>
     <template v-else-if="orderStatus==17">
      <finish></finish>
    </template>
     <template v-else-if="orderStatus==19">
      <review-refund></review-refund>
    </template>
     <template v-else-if="orderStatus==39">
      <closed></closed>
    </template>
	</article>
</template>
<script>
import {mapGetters} from 'vuex'
//下单之前的等待付款
import waitPrepay from './wait-prepay'
//订单受理中
import inAcceptance from './in-acceptance'
//成功下单:等待服务
import waitService from './wait-service'
//服务中
import inService from './in-service'
//服务中的等待付款
import waitPay from './wait-pay'
//退款审核中
import reviewRefund from './review-refund'
//服务完成
import finish from './finish'
//订单关闭页
import closed from './closed'
export default{
	name:'repair',
	data(){
		return{
       /*订单状态,11：待付款 12：订单受理中 13：待服务 14：服务中 15：服务中_待付款 17：付款完成 19：退款审核中 39：订单关闭*/
      orderStatus:0
		}
	},
  components:{
      waitPay,
      waitPrepay,
      inAcceptance,
      inService,
      reviewRefund,
      finish,
      closed,
      waitService
	},
	created(){
      let getters=this.$store.getters;
      let orderId=getters.getId.orderId;
      this.$store.dispatch('updateOrder',{
        orderId:orderId,
        orderType:'RepairClusters'
      }).then((data)=>{
        if(!!data.orderStatus){
          this.orderStatus=data.orderStatus;
        }
      })
	}
}
</script>
<style>
	
</style>
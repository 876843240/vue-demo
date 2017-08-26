<!-- 退款审核中 -->
<template>
  <div class="review-refund">
     <order-state v-bind:hasDescript="false">
        <template slot="title">退款审核中</template>
     </order-state>
     <service></service>
     <master-info v-if="state>0"></master-info>
     <user-info v-if="showUserInfo"></user-info>
     <template>
         <trouble v-if="cluster=='repair'"></trouble>
         <primary-command v-else-if="cluster=='common'"></primary-command>
      </template>
     <order-info :state="state"></order-info>
     <handle-btn :orderStatus="orderStatus"></handle-btn>
  </div>
</template>

<script>
import service from './components/service'
import handleBtn from './components/handle-btn'
import orderState from './components/order-state'
import trouble from './components/trouble'
import userInfo from './components/user-info'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import currentState from './components/current-state'
export default {
  name: 'review-refund',
  props:{
    isPre:{
      type:Number,
      default:0
    },
    orderStatus:Number
  },
  data () {
    return {
      state:4,
      // 是否是无金页面。默认是true，表示是无金页面，控制服务中的详细价格和全部价格的显示
      noMoney:true,
      hasRealPrice:false,  //是否显示实付金额这一项
      hasOrderPrice:false,  //是否有订单总价这一项
      hasdoorServicePrice:false,//显示上门服务费这一项
      hasServicePrice:false, //显示服务费这一项
      showService:true, //是否显示服务组件
      showArriveTime:true, //是否显示到达时间
      showUserInfo:true, //是否显示用户信息
      cluster:this.$store.state.stateData.cluster
    }
  },
  components:{
    service,
    handleBtn,
    orderState,
    userInfo,
    orderInfo,
    currentState,
    masterInfo,
    trouble
  },
  created(){
    if(this.state==3||this.state==4){
      this.showService=true;
      this.hasRealPrice=true;
      this.showArriveTime=false;
      if(this.state==3){
        this.hasServicePrice=true;
        this.hasOrderPrice=true;
      }else{
        this.hasdoorServicePrice=true;
        this.showUserInfo=false;
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 
</style>

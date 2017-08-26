<!-- 服务中页面 -->
<template>
  	<article class="in-service">
      <order-state :hasDescript="false">
          <template slot="title">服务中</template>
      </order-state>
      <current-state :state="state"></current-state>
  	  <service></service>
  	  <master-info :hasMaster="hasMaster"></master-info>
  	  <user-info></user-info>
      <template>
         <trouble v-if="cluster=='repair'"></trouble>
         <primary-command v-else-if="cluster=='common'"></primary-command>
      </template>
  	  <order-info></order-info>
  	  <handle-btn :haslinkbtn="true" :orderStatus="orderStatus"></handle-btn>
  	</article>
</template>
<script>
import service from './components/service'
import orderState from './components/order-state'
import handleBtn from './components/handle-btn'
import trouble from './components/trouble'
import userInfo from './components/user-info'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import currentState from './components/current-state'
export default{
   name:'in-service',
   props:{
    isPre:{
      type:Number,
      default:0
    },
    orderStatus:Number
   },
   data(){
   	return {
      endTime:new Date('2017-08-12 15:00').getTime(),
      currTime:'20:00',
      timeEnd:false, //是否已经到了订单结束时间
      hasServicePrice:false,
      hasdoorServicePrice:false,
      hasRealPrice:false,
      hasOrderPrice:false,
      hasMaster:true,
      state:2,
      cluster:this.$store.state.stateData.cluster
   	}
   },
   methods:{
     
   },
   components:{
   	service,
   	handleBtn,
   	userInfo,
   	orderInfo,
    orderState,
    trouble,
    currentState,
    masterInfo
   },
   created(){
     if(this.isPre==1){
      this.hasdoorServicePrice=true;
      this.hasRealPrice=true;
    }
   }
}
</script>
<style lang="scss">
	.pay-alert{
		margin-left: 1rem;
		color:#e59a39;
		font-size: 1rem;
	}
  i.iconfont{
    display: inline;
    font-size: 1rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
</style>
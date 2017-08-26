<!-- 等待服务页面 -->
<template>
  	<article class="wait-service">
      <order-state :hasDescript="false">
          <template slot="title">待服务</template>
      </order-state>
      <current-state></current-state>
  	  <service></service>
  	  <master-info :hasMaster="hasMaster"></master-info>
  	  <user-info></user-info>
      <template>
        <trouble v-if="cluster=='repair'"></trouble>
        <primary-command v-else-if="cluster=='common'"></primary-command>
      </template>
  	  <order-info></order-info>
  	  <handle-btn :haslinkbtn="true"></handle-btn>
  	</article>
</template>
<script>
import service from './components/service'
import orderState from './components/order-state'
import currentState from './components/current-state'
import masterInfo from './components/master-info'
import handleBtn from './components/handle-btn'
import userInfo from './components/user-info'
import trouble from './components/trouble'
import orderInfo from './components/order-info'
export default{
   name:'wait-service',
   data(){
   	return {
      //是否显示师傅
      hasMaster:false,
      //哪一个簇
      cluster:''
   	}
   },
   components:{
   	service,
   	handleBtn,
   	userInfo,
   	orderInfo,
    orderState,
    trouble,
    masterInfo,
    currentState
   },
   created(){
     //从接口中获取数据
    let getters=this.$store.getters;
    let data=getters.getData;
    let stateData=getters.getOrderStatus;
    this.cluster=stateData.cluster;
    this.closeReason=data.closeReason;
    //关闭是系统原因的时候才显示右边的按钮
    if(this.closeReason==2){
      this.haslinkbtn=true;
      this.btnstate='refund';
    }
     this.orderStatus=data.orderStatus;
     //设置状态类的数据
     if(!!data.orderStatus){
       switch(data.orderStatus){
        case 13:
        case 14:
        case 15:
        case 17:
         this.hasMaster=true;
         break;
       }
     }
     if(data.isPre==1){
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
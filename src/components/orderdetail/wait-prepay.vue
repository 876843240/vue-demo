<!-- 等待预付款 -->
<template>
  	<article class="wait-prepay">
      <order-state :hasDescript="true">
          <template slot="title">待付款</template>
          <template slot="descript"><i class="iconfont icon-biao"></i>{{currTime}}分钟后系统将自动取消未支付订单</template>
      </order-state>
  		<service></service>
  	  <user-info></user-info>
      <trouble v-if="cluster=='repair'"></trouble>
	    <order-info></order-info>
	    <handle-btn :haslinkbtn="true" :orderStatus="orderStatus"></handle-btn>
  	</article>
</template>
<script>
import service from './components/service'
import orderState from './components/order-state'
import handleBtn from './components/handle-btn'
import userInfo from './components/user-info'
import trouble from './components/trouble'
import orderInfo from './components/order-info'
export default{
   name:'wait-prepay',
   data(){
   	return {
      createTime:0,
      currTime:'20:00',
      timeEnd:false, //是否已经到了订单结束时间
      hasServicePrice:false,
      hasOrderPrice:false,
      orderStatus:11,
      cluster:''
   	}
   },
   methods:{
      getTimes(){
        let differTime=new Date().getTime()-this.createTime;
        let min=Math.floor(differTime / 60000);
        let sec=Math.floor((differTime /1000) - (min*60));
        let minutes=min>=10?min:'0'+min;
        let seconds=sec>=10?sec:'0'+sec;
        //当时间没有走完之前就一秒钟修改一次
        if(minutes>=0&&seconds>=0){
           setTimeout(()=>this.getTimes(),1000);
             this.currTime=minutes+':'+seconds;
        }
        //如果时间走完了这时候就取消当前的订单
        if(minutes==0&&seconds==0){
            this.timeEnd=true; 
        }
      }
   },
   components:{
    service,
    handleBtn,
    userInfo,
    orderInfo,
    orderState,
    trouble
   },
   created(){
    //默认页面一加载就执行当前的计数函数
      let states=this.$store.getters;
      let data=states.getData;
      let stateData=states.getOrderStatus;
      this.createTime=data.createTime;
      this.cluster=stateData.cluster;
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
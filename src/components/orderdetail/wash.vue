<!-- 衣物清理 -->
<template>
	<article class="clear-clothing">
		<order-state>
		</order-state>
		<current-state></current-state>
		<service>
		</service>
		<master-info :hasMaster="hasMaster"></master-info>
		<user-info></user-info>
		<order-info></order-info>
		<handle-btn>
		</handle-btn>
	</article>
</template>
<script>
import orderState from './components/order-state'
import service from './components/service'
import currentState from './components/current-state'
import userInfo from './components/user-info'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import handleBtn from './components/handle-btn'
export default{
	name:'clear-clothing',
	data(){
		return {
         /*
          订单状态，
          11：待付款 12：订单受理中 13：待服务 14：服务中 15：服务中_待付款 17：付款完成 19：退款审核中 39：订单关闭
         */
          orderStatus:11,
          hasDescript:false,
          hasMaster:false
		}
	},
	components:{
		orderState,
		currentState,
		masterInfo,
		orderInfo,
		handleBtn,
		service,
		userInfo
	},
  computed:{
    
  },
	created(){
      let getters=this.$store.getters;
      let orderId=getters.getId.orderId;
      this.$store.dispatch('updateOrder',{
        orderId:orderId,
        orderType:'WashClusters'
      }).then((data)=>{
        if(!!data.orderStatus){
          this.orderStatus=data.orderStatus;  
        }
      });
	}
}
</script>
<style lang="scss">
	.receive-state{
		margin:1.43rem 1rem;
		position: relative;
		height:1.43rem;
		&::before{
				content:"";
				display: inline-block;
				width:100%;
				height:1px;
				position: absolute;
				top:50%;
				background-color: #b1b1b1;
		 }
		p{
			color:#b1b1b1;
			background-color: #f5f5f5;
			display: inline-block;
			padding:0 1.93rem;
			left:50%;
			position: absolute;
			top:50%;
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
		}
	}
</style>
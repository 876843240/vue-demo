<!-- 底部按钮组件 -->
<template>
	<section class="handle-btn flex onepx-top">
	   	<template>
	   	<a href="/cancleorder" v-if="cancleOrder" class="order-btn"  @click.prevent="cancleOrderEvent()">取消订单</a>
	   	<a href="/gotopay" class="link-btn" v-if="PayOrder" @click.prevent="PayOrderEvent()">去支付</a>
	   	<a href="javascript:;" v-on:click.prevent="delOrderEvent()" class="order-btn" v-if="delOrder">
			删除订单
		</a>
	    </template>
		<template v-if="hasLinkBtn">
		<a href="" class="link-btn" v-if="btnState=='evaluate'" @click.prevent="evaluate()" role="button">评价</a>
		<a href="/evaluate" class="link-btn" v-else-if="btnState=='hasevaluate'" @click.prevent="evaluate()" role="button">已评价</a>
		<a href="" class="link-btn" role="button" v-else-if="btnState=='refund'" @click.prevent="showResult()">已退款</a>
		</template>
	</section>
</template>
<script>
	export default{
		name:'handle-btn',
		data(){
			return {
				hasLinkBtn:false,
				 //是否显示右边的跳转按钮
				btnState:'evaluate',
				//是否是未支付定金页面
				notPayOrderMoney:this.notpayordermoney,
                //订单状态
				orderState:'',
				//是否处于删除按钮状态
				delOrder:false,
				//是否处于去支付按钮状态
				PayOrder:false,
				//是否处于取消订单按钮状态
				cancleOrder:false,
				//订单id
				orderId:'',
				//服务id
				serviceId:'',
				//待支付金额
				dealAmount:0,
				isIos:this.ua.isIos()
			}
		},
		methods:{
			/*支付订单按钮事件*/
			showResult(){
				this.$emit('showModel');
			},
			/*取消订单按钮事件*/
			cancleOrderEvent(){
				let pageCode=this.$route.query.pageCode;
		       if(this.isIos){
		        window.webkit.messageHandlers.cancelOrder.postMessage({orderId:this.orderId,pageCode:pageCode});
		       }else{
		       window.APP.cancelOrder(this.orderId,pageCode,this.serviceId); 
		       }
			},
			/*删除订单按钮事件*/
			delOrderEvent(){
				if(this.isIos){
		        window.webkit.messageHandlers.deleteOrder.postMessage({orderId:this.orderId});
		        }else{
		         window.APP.deleteOrder(this.orderId);
		        }
			},
			/*支付订单按钮事件*/
			PayOrderEvent(){
			  if(this.isIos){
		        window.webkit.messageHandlers.toPay.postMessage({orderId:this.orderId,dealAmount:this.dealAmount+'.00'});
		       }else{
		        window.APP.toPay(this.orderId,this.dealAmount+'.00');
		       }
			},
			/*评价*/
			evaluate(){
				if(this.isIos){
		        window.webkit.messageHandlers.evaluate.postMessage('evaluate');
		        }else{
		        window.APP.evaluate('evaluate');
		        }
			}
		},
		created(){
          /*11：待付款 12：订单受理中 13：待服务 14：服务中 15：服务中_待付款 17：付款完成 19：退款审核中 39：订单关闭*/
		  let states=this.$store.getters;
          let data=states.getData;
          let stateData=states.getOrderStatus;
          this.orderId=data.orderId;
          this.dealAmount =data.dealAmount;
          this.pageCode=data.pageCode;
          this.serviceId=data.serviceId;
          switch(stateData.orderStatus){
        	case 11:
        	  this.PayOrder=true;
        	  if(stateData.cluster!='wash'){
        	  this.cancleOrder=true;
        	  }
        	  break;
        	case 15:
        	  this.PayOrder=true;
        	  break;
        	case 12:
        	case 13:
        	case 14:
        	case 19:
        	  this.cancleOrder=true;
        	  break;
        	case 39:
        	  this.delOrder=true;
        	  break;
        	case 17:
        	 this.delOrder=true;
        	 this.hasLinkBtn=true;
        	 if(this.transfeStatus==1702){
        	  	this.btnState='evaluate';
        	 }
        	 break;
        }
	 }
   }

</script>
<style lang="scss">

	.handle-btn{
		width:100%;
        background-color: #fff;
        position: fixed;
        bottom: 0;
		line-height:3.57rem;
		a{
			flex:1 0 50%;
			-webkit-flex:1 0 50%;
			text-align: center;
			font-size: 1.21rem;
		  &.order-btn{
		  	color:#999;
		  }
		  &.link-btn{
		  	background-color:#e24c00; 
		  	color:#fff;
		  }
		}
	}
</style>
<template>
	<section class="service block">
		<section class="service-detail">
			<section class="service-title clearfix">
			 <hgroup>
        <h1>{{serviceName}}</h1>
       </hgroup>
			</section>
			<section class="service-price-list">
				<ul>
        <template v-if="hasdoorServicePrice">
        <li class="clearfix" >
           <p class="service-name">上门服务费</p>
           <span class="service-price">
           <em>{{preMoney}}.00</em>元</span>
        </li>
        </template>
				<template v-if="hasServicePrice">
          <li class="clearfix">
           <p class="service-name">
            服务费
           </p>
           <span class="service-price">
           <em>{{serviceMoney}}.00</em>元</span>
          </li>
          </template>
          <template v-if="hasOrderPrice">
          <li class="clearfix">
            <p class="service-name">
            订单总价
            </p>
            <span class="service-price">
            <em>{{orderAmount}}.00</em>元</span>
          </li>    
          </template>
				</ul>
			</section>
		</section>
		<section class="service-price-total onepx-top" v-if="hasRealPrice">
			 <h2>
         <template v-if="isRealServicePrice">
          <span>
           实付金额
           </span>
           <em>{{orderActualAmount}}.00元</em>
         </template>
         <template v-else>
           <span>
             待付金额
           </span>
           <em>{{dealAmount}}.00元</em>
         </template>
			 </h2>
		</section>
	</section>
</template>
<script>
	export default{
		name:'service',
    data(){
      return {
        state:0,
        //是否显示金额
        hasAllPrice:false,
        //是否有订单价格
        hasOrderPrice:false,
        //是否有实际价格
        hasRealPrice:true,
        //是否有服务价格
        hasServicePrice:false,
        //是否有上门服务价格
        hasdoorServicePrice:false,
        //是否显示全部服务价格
        showAllPrice:false,
        //是否显示上门服务费
        noOrderPrice:false,
        //这个状态用来确定显示实付金额还是待付金额
        isRealServicePrice:false,
        //服务名
        serviceName:'',
        //订单实付金额
        orderActualAmount:0,
        //订单待付款金额
        dealAmount:0,
        //服务费
        serviceMoney:0,
        //订单总价
        orderAmount:0,
        //上门服务费
        preMoney:0,
        //订单状态
        orderStatus:11,
      }
    },
    computed:{
      orderAllPrice(){
        return this.serviceMoney+this.preMoney+'.00'
      }
    },
    created(){
      setTimeout(()=>{
      let getters=this.$store.getters;
      let data=getters.getData;
      let stateData=getters.getOrderStatus;
      this.data=data;
      this.preMoney=data.preMoney;
      this.serviceName=data.serviceName;
      this.serviceMoney=data.serviceMoney;
      this.orderAmount=data.orderAmount;
      this.orderActualAmount=data.orderActualAmount;
      this.dealAmount=data.dealAmount;
      if(!!data.isPre){
        this.hasdoorServicePrice=true;
      }
      switch(data.orderStatus){
        case 11:
         this.isRealServicePrice=false;
         break;
        case 12:
        case 13:
        case 14:
        case 19:
          if(data.isPre==1){
            this.isRealServicePrice=true;
          }else{
            this.hasRealPrice=false;
            this.hasdoorServicePrice=false;
          }
        break;
        case 15:
          this.isRealServicePrice=false;
          this.hasServicePrice=true;
        break;
        case 17:
          this.isRealServicePrice=true;
          this.hasOrderPrice=true;
          this.hasServicePrice =true;
        break;
    }
   },0);
	}
}
</script>
<style lang="scss">
   .service{
   	padding:1.5rem 0 0;
   	text-align: left;
   	>section{
   		margin-left: 1rem;
   		&.service-detail{
   			margin-right: 1rem;
   			padding-bottom: 0.73rem;
   		}
   		.service-title{
   			line-height: 1.4rem;
        hgroup{
          float: left;
          color:#333;
          h1{
          font-size: 1.21rem;
          margin-right: 1.14rem;
           display: inline-block;
          }
          h2{
            font-size: 1rem;
            display: inline-block;
          }
        }
   			.service-num{
   				float: right;
   				font-size: 0.8rem;
   				em{
   					font-size:0.93rem;
   				}
   			}
   		}
   	}
   	.service-price-list{
   		line-height: 1.5rem;
   		font-size: 1rem;
      margin-top: 0.9rem;
      li{
        margin-bottom: 0.7rem;
      }
   		p{
   			float: left;
   		}
   		span{
   			float: right;
   		}
    }
    .service-price-total{
    	h2{
    	line-height: 4.2rem;
    	text-align: right;
    	margin-right: 1rem;
    	font-size: 1.07rem;
      vertical-align: middle;
    	em{
    		font-size:1.29rem;
    		color:#ea5412;
    		font-weight: 600;
    		margin-left: 0.5rem;
    	}
    	}
    }
   }
</style>
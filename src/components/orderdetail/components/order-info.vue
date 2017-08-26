<!-- 订单信息组件 -->
<template>
  <section class="order-info">
         <dl>
           <div>
             <dt>订单编号:</dt>
             <dd>{{orderNo}}</dd>
           </div>
           <div>
             <dt>创建时间:</dt>
             <dd>{{createTime}}</dd>
           </div>
           <template v-if="hasPayInfo">
           <div>
             <dt>支付时间:</dt>
             <dd>2016-04-21 18:20:20</dd>
           </div>
           <div>
             <dt>支付方式:</dt>
             <dd>支付宝支付</dd>
           </div>
           </template>
          <template v-if="hasClosedTime">
           <div>
             <dt>关闭时间:</dt>
             <dd>{{closeTime}}</dd>
           </div>
           </template>
         </dl>
        
      </section>
</template>
<script>
  export default{
    name:'order-info',
    
    data(){
      return {
        //订单编号
        orderNo:'',
        //订单创建时间
        createTime :'',
        //订单关闭时间
        closeTime:'',
        hasClosedTime:false,
        hasPayInfo:false
      }
    },
    created(){
      setTimeout(()=>{
      let states=this.$store.getters;
      let data=states.getData;
      let stateData=states.getOrderStatus;
      this.orderNo=data.orderNo;
      this.createTime=this.timeStamp(data.createTime,1);
      this.closeTime=this.timeStamp(data.closeTime,1);
      },0)
    }
  }
</script>
<style lang="scss">
  .order-info{
    padding:0.6rem 0;
    margin-bottom: 4.28rem;
    dl{
      margin-left: 1rem;
    }
    dt{
      margin-right: 0.2rem;
    }
    dt,dd{
      display: inline-block;
      color:#b1b1b1;
      font-size: 0.93rem;
    }
   }
</style>
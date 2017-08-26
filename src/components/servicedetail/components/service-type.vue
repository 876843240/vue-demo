<template>
  <section class="repair-type block">
    <div class="repair-type-content center">
     <div class="banner"><img :src="serviceIcon" alt="维修banner"></div>
     <div class="repair-detail">
       <h2>{{serviceName}}</h2>
       <div class="repair-price">
          <span>{{preName}}</span>
          <em class="price-text">{{preMoney}}.00元</em>
       </div>
     </div>
    </div>
  </section>
</template>
<script>
export default{
   name:'repair-type',
   props:{
    //服务名
     serviceName:{
      type:String
     },
     //服务图片
     serviceIcon:{
      type:String
     },
     //预付款名
     preName:{
      type:String
     },
     //预付款金额
     preMoney:{
      type:Number
     }
   },
   data(){
     return {
     
     }
   },
   created(){
    
   }
}
</script>
<style lang="scss">
	.repair-type{
    margin-top: 0.1rem;
    overflow: hidden;
    .repair-type-content{
      margin:0.68rem 0.57rem;
      .banner{
        height:10.93rem;
        width:100%;
        img{
          width: 100%;
          height:100%;
        }
      }
    }
    .repair-detail{
      margin-top: 0.5rem;
    }
    .repair-price{
      margin-top: 0.37rem;
      margin-bottom: 1.07rem;
      overflow: hidden;
      em{
        float: right;
        margin-right: 0.36rem;
      }
    }
  }
</style>
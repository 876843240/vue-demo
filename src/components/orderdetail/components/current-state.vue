<template>
<section class="current-state block">
 <ul class="flex center-item">
   <li>
     <div class="has-arrow">
      <div class="icon-size">
        <i class="icon cgxd-copy"></i>
      </div>
      <span>成功下单</span></div>
   </li>
   <template v-if="cluster=='common'||cluster=='repair'">
   <li>
     <div class="has-arrow" v-bind:class="{'not-finish':state<=3}">
       <div class="icon-size">
        <i class="icon fwz_1" v-bind:class="{'fwz_2':state>2}"></i>
       </div>
       <span>服务中</span></div>
   </li>
   <li>
     <div>
     <div class="icon-size">
     <i class="icon fwwc_1" v-bind:class="{'fwwc_2':state>3}"></i>
     </div>
     <span>服务完成</span></div>
   </li>
    </template>
    <template v-else-if="cluster=='nanny'">
    <li>
     <div class="has-arrow" v-bind:class="{'not-finish':state<3}">
      <div class="icon-size">
     <i class="icon ppbm_1" v-bind:class="{'ppbm_2':state>=2}"></i>
     </div>
     <span>匹配保姆</span></div>
    </li>
   <li>
     <div class="has-arrow"  v-bind:class="{'not-finish':state<4}">
     <div class="icon-size">
     <i class="icon yyms_1" v-bind:class="{'yyms_2':state>=3}"></i>
     </div>
     <span>预约面试</span></div>
   </li>
   <li>
     <div>
     <div class="icon-size">
      <i class="icon qy_1" v-bind:class="{'qy_2':state>=4}"></i>
     </div>
     <span>签约</span></div>
   </li>
    </template>
    <template v-else-if="cluster=='wash'">
      <li>
      <div class="has-arrow"  v-bind:class="{'not-finish':state<3}">
      <div class="icon-size">
       <i class="icon dqj_1" v-bind:class="{'dqj_2':state>1}"></i>
      </div>
      <span>待取件</span></div>
     </li>
      <li>
      <div class="has-arrow"  v-bind:class="{'not-finish':state<4}">
      <div class="icon-size">
       <i class="icon qxz_1" v-bind:class="{'qxz_2':state>2}"></i>
      </div>
      <span>清洗中</span></div>
     </li>
      <li>
      <div class="has-arrow"  v-bind:class="{'not-finish':state<5}">
      <div class="icon-size">
       <i class="icon psz_1" v-bind:class="{'psz_2':state>3}"></i>
      </div>
      <span>配送中</span></div>
      </li>
      <li>
       <div>
        <div class="icon-size">
         <i class="icon fwwc_1" v-bind:class="{'fwwc_2':state>4}"></i>
        </div>
        <span>服务完成</span>
       </div>
     </li>
    </template>
 </ul>
</section>
</template>
<script>
export default{
	name:'current-state',
	data(){
		return {
       hasWaitPayState:false, //是否有待付款的状态
       //当前的簇
       cluster:'',
       state:0
		}
	},
  created(){
     setTimeout(_=>{
      let getters=this.$store.getters;
      let stateData=getters.getOrderStatus;
      let data=getters.getData;
      this.cluster=stateData.cluster;
      this.transfeStatus=stateData.transfeStatus;
        //transfeStatus (integer, optional): 订单流转子状态， 1300：已接单未出发 1301：已出发未到达 1401：已达到未取件 1500：已取件清洗中待付款 1501：已清洗配送中待付款 1700：已取件清洗中已付款 1701：已清洗配送中已付款 1702：服务完成已付款 1900：退款审核中 ,
        switch(this.transfeStatus){
          case 1100:
           this.state=0;
           break;
          case 1300:
          case 1301:
          case 1400:
          case 1401:
           this.state=2;
           break;
          case 1500:
          case 1700:
          this.state=3;
          break;
          case 1501:
          case 1701:
          this.state=4;
          break;
          case 1702:
          case 1900:
          this.state=5;
          break;
       }
      },0)
    } 
}
</script>
<style lang="scss">
 .current-state{
  .icon-size{
   height:3rem;
   vertical-align: middle;
  }
  text-align: center;
  .center-item{
   height: 6rem;
   span{
    font-size: 0.86rem;
    color:#666;
   }
  }
 }
 .flex li {
   -webkit-flex: 1 0 20%;
   flex: 1 0 20%;
    &:nth-of-type(4){
      .has-arrow:after{
        right:-20%;
      }
    }
 }
</style>
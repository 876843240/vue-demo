<template>
	<section class="master-info block flex" v-if="hasMaster">
	    <div class="master-info-detail flex">
         <div class="master-logo">
           <img :src="masterHeadimg" alt="师傅头像">
         </div>
         <div class="master-other">
          <h2 class="name">{{masterName}}</h2>
          <p v-if="hasArriveTime">师傅预计到达：<em>{{arriveTime}}</em></p>	
          <p v-if="cluster=='nanny'">{{nannyState}}：<em>{{nannycurrtime}}</em></p>
         </div>
         </div>
         <div class="call-master" v-if="hasMasterPhone">
         	 <a :href="'tel:'+masterPhone" class="icon call-icon" @click.prevent="callMaster()"></a>
         </div>
      </section>
</template>
<script>
export default{
	name:'master-info',
  props:{
    hasMaster:Boolean
  },
	data(){
		return{
      //师傅的名字
      masterName:'',
      //师傅的电话号码
      masterPhone:'',
      //师傅到达时间
      arriveTime:'',
      //师傅头像
      masterHeadimg:'',
      //是否有到达时间
      hasArriveTime:false,
      //是否有师傅电话号码
      hasMasterPhone:false,
      babySitter:false,
      nannyState:'',
     //当前簇
      cluster:'',
      nannycurrtime:''
		}
	},
  methods:{
    callMaster(){
      window.APP.callMaster(this.masterPhone);
    }
  },
  created(){
   setTimeout(()=>{
    let getters=this.$store.getters;
    let data=getters.getData;
    let stateData=getters.getOrderStatus;
    this.masterName=data.masterName;
    this.masterPhone=data.masterPhone;
    this.arriveTime=data.arriveTime;
    this.masterHeadimg=data.masterHeadimg;
    this.transfeStatus=stateData.transfeStatus;
    this.cluster=stateData.cluster;
    let orderStatus=stateData.orderStatus;
    let transfeStatus=stateData.transfeStatus;
    //是否是nanny，来决定显示
    if(this.cluster!='nanny'){
      switch(orderStatus){
       case 13:
         if(this.transfeStatus==1301){
           this.hasArriveTime=true;
         }
       case 14:
       case 15:
       case 17:
          this.hasMasterPhone=true;
       break;
      }
    }else{

      switch(transfeStatus){
        case 1403:
         this.nannyState='预约面试时间';
         console.log(data.interviewTime);
         this.nannycurrtime=data.interviewTime;
          this.hasMasterPhone=true;
        break; 
        case 1703:
         this.nannyState='签约时间';
         this.nannycurrtime=data.signTime;
        break;
      }
    }
   },0);
  }
}
</script>
<style lang="scss">
  .master-info.flex{
    flex-wrap:nowrap;
    -webkit-flex-wrap:nowrap;
  }
	.master-info{
     padding:0.71rem 0;
     text-align: left;
    .master-info-detail{
     	width:60%;
     	justify-content: flex-start!important;
     	-webkit-justify-content: flex-start!important;
     	flex:1 0 70%;
     	-webkit-flex:1 0 70%;
     }
    .master-logo{
       margin-left: 1rem;
       margin-right: 0.64rem;
       display: inline-block;
       width:4.28rem;
       height:4.28rem;
       border-radius: 50%;
       -webkit-border-radius:50%;
       overflow: hidden;
       vertical-align: middle;
        img{
          width:100%;
          height:100%;
        }
    }
    .master-other{
      h2{
      display: inline-block;
      vertical-align: middle;
      color:#333;
      font-size: 1.14rem;
      }
      p{
         margin-top: 0.4rem;
      	font-size: 0.93rem;
      	color:#666;
      }
    }
    .call-master{
    	float: right;
    	margin-right: 1rem;
    	flex:1 0 25%;
     	-webkit-flex:1 0 25%;
    } 
   }
</style>
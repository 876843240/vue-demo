<template>
   <section class="user-info block">
         <dl>
           <div class="address item">
             <dt>服务地址:</dt>
             <dd>{{serviceAddress}}</dd>
           </div>
           <div class="time item">
             <dt>预约时间:</dt>
             <dd><time pubdate :datatime="dateValue">{{dateValue}}</time><time :datatime="dateWeek">({{dateWeek}})</time><time :datatime="startTime+'-'+endTime">{{startTime}}<span v-if="startTime!=endTime">-{{endTime}}</span></time></dd>
           </div>
           <div class="tel item">
             <dt>联系电话:</dt>
             <dd>{{phone}}</dd>
           </div>
         </dl>
         <section v-if="hasClearInfo" class="evaluate onepx-top">
             <div class="evaluate-detail">
               <p>{{description}}</p>
             </div>
         </section>
      </section>
</template>
<script>
  export default{
    name:"user-info",
    data(){
      return {
        hasClearInfo:false,
        //服务地址
        serviceAddress:'',
        //预约时间
        dateValue:'',
        //联系电话
        phone:'',
        //预约的周几
        dateWeek:'',
        //预约开始的时间
        startTime:'',
        //预约结束的时间
        endTime:'',
        //用户的描述
        description:''
      }
    },
    methods:{
      getStampTime(time){
        try{
          let currTime=this.timeStamp(time);
          return currTime.endHour+':'+currTime.endMinutes;
        }catch(e){
         
        }
      }
    },
    computed:{
    },
    created(){
      //根据cluster的状态来决定是否显示保洁时长
      setTimeout(()=>{
      let getters=this.$store.getters;
      let data=getters.getData;
      let stateData=getters.getOrderStatus;
      let cluster=stateData.cluster;
      let week=['一','二','三','四','五','六','日'];
      if(cluster=='common'){
         this.hasClearInfo=true;
      }
      this.serviceAddress=data.serviceAddress; 
      this.dateValue=data.dateValue;
      this.description=data.description;
      this.phone=data.phone;
      this.dateWeek='周'+week[data.dateWeek-1];
      this.startTime=this.getStampTime(data.startTime);
      this.endTime=this.getStampTime(data.endTime);
    },0);
   }
  }
</script>
<style lang="scss" scoped>
  .user-info{
    padding:0.78rem 0;
    .item{
      margin-bottom:0.86rem;
    }
    dl{
      margin-left: 1rem;
    }
    dt{
      margin-right: 0.2rem;
    }
    dd{
        time{
        margin-right: 0.8rem;
        display: inline-block;
      }
    }
    dt,dd{
      display: inline-block;
      font-size: 1rem;
      color:#666;
    }
  }
  .evaluate{
    padding:1.79rem 0;
    .evaluate-detail{
    margin:0 1.07rem;
    min-height:7.14rem;
    border:1px solid #ccc;
    p{
      margin:0.5rem 0.64rem;
      font-size: 1.07rem;
      color: #666;
      line-height: 1.3;
    }
   }
  }
  
</style>
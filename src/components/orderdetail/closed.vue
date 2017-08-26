<template>
  <article class="closed">
  <order-state :hasDescript="true">
    <template slot="title">订单关闭</template>
    <template slot="descript">
       原因:<template>
            <em v-if="closeReason==1">系统取消订单</em>
            <em v-else-if="closeReason==2">用户取消订单</em>
            <em v-else-if="closeReason==3">师傅取消订单</em>
         </template>
    </template>
  </order-state>
   <service></service>  
   <user-info></user-info>
  <trouble v-if="cluster=='repair'"></trouble>
  </article>
</template>
<script>
import service from './components/service'
import orderState from './components/order-state'
import trouble from './components/trouble'
import handleBtn from './components/handle-btn'
import userInfo from './components/user-info'
import orderInfo from './components/order-info'
import model from './components/model'
import primaryCommand from './components/primary-command'
export default {
  name: 'closed',
  data () {
    return {
      state:5, //当前时关闭订单状态
      closeReason:2, //服务状态
      //关闭时间
      closeReason:'',
      //当前的cluster
      cluster:''    
    }
  },
  components:{
    service,
    handleBtn,
    userInfo,
    orderInfo,
    orderState,
    model,
    trouble,
    primaryCommand
  },
  methods:{
    showModelEvent(){
       this.showModelState=true;
    },
    changeModelState(){
      this.showModelState=false;
    }
  },
  created(){
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
   .order-state{
     line-height: 2.86rem;
     margin:0 1rem;
     h1{
      font-size: 1.07rem;
      color:#ff5a5a;
      display: inline-block;
      margin-right: 2rem;
     }
     span{
      font-size: 0.93rem;
      color:#666;
     }
   }
</style>

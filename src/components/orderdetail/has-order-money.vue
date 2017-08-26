<!-- 有预约金页面 -->
<template>
  <div class="has-order-money">
      <template>
      <order-state>
      	 <template slot="title">{{orderState}}</template>
      </order-state>
      <current-state v-if="state!=0" :state="state"></current-state>
      </template>
      <service 
      :state="state" 
      :hasOrderPrice="hasOrderPrice" 
      :hasdoorServicePrice="hasdoorServicePrice"
      :hasServicePrice="hasServicePrice">
      </service>
      <master-info v-if="state!=0" :showArriveTime="showArriveTime"></master-info>
      <user-info></user-info>
      <trouble></trouble>
      <order-info :state="0"></order-info>
      <handle-btn :drawback="true" :state="state"></handle-btn>
  </div>
</template>
<script>
import service from './components/service'
import orderState from './components/order-state'
import handleBtn from './components/handle-btn'
import trouble from './components/trouble'
import userInfo from './components/user-info'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import currentState from './components/current-state'
export default {
  name: 'has-order-money',
  data () {
    return {
      //是否已经评价过
      btnstate:'evaluate',
      showArriveTime:true,
      state:3, //当前的状态
      orderState:'',//当前订单的状态
      hasRealPrice:true,  //是否显示实付金额这一项
      hasOrderPrice:false,  //是否有订单总价这一项
      hasdoorServicePrice:true,//显示上门服务费这一项
      hasServicePrice:false, //显示服务费这一项
    }
  },
  components:{
    service,
    handleBtn,
    userInfo,
    orderInfo,
    currentState,
    masterInfo,
    orderState,
    trouble
  },
  methods:{

  },
  created(){
    let state=this.state;
    switch(state){
      case 0:this.orderState='订单受理中';break;
      case 1:this.orderState='待服务';break;
      case 2:
        this.orderState='服务中';
        this.showArriveTime=false;
      break;
      case 3:
      this.orderState='待付款';
      this.hasServicePrice=true;
      this.showArriveTime=false;
      break;
    }
  }
}
</script>

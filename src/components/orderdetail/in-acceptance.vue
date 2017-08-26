<!-- 受理中页面 -->
<template>
  <div class="in-acceptance">
      <order-state>
      	 <template slot="title">订单受理中</template>
      </order-state>
      <service></service>
      <user-info></user-info>
      <trouble v-if="cluster=='repair'"></trouble>
      <order-info></order-info>
      <handle-btn></handle-btn>
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
  name: 'in-acceptance',
  data () {
    return {
      //是否已经评价过
      btnstate:'evaluate',
      cluster:''
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
    let states=this.$store.getters;
    let data=states.getData;
    let stateData=states.getOrderStatus;
    this.cluster=stateData.cluster;
    if(data.isPre==1){
      this.hasdoorServicePrice=true;
      this.hasRealPrice=true;
    }
  }
}
</script>

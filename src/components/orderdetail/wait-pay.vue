<!-- 等待付款页面 -->
<template>
  <div class="wait-pay">
     <order-state :hasDescript="false">
     </order-state>
     <current-state ></current-state>
     <service></service>
     <master-info :hasMaster="hasMaster"></master-info>
     <user-info></user-info>
     <trouble v-if="cluster!='common'"></trouble>
     <order-info></order-info>
     <handle-btn></handle-btn>
  </div>
</template>

<script>
import service from './components/service'
import handleBtn from './components/handle-btn'
import orderState from './components/order-state'
import trouble from './components/trouble'
import userInfo from './components/user-info'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import currentState from './components/current-state'
export default {
  name: 'wait-pay',
  data () {
    return {
      showUserInfo:true, //是否显示用户信息
      cluster:'',
      hasMaster:true
    }
  },
  components:{
    service,
    handleBtn,
    orderState,
    userInfo,
    orderInfo,
    currentState,
    masterInfo,
    trouble
  },
  created(){
    let states=this.$store.getters;
    let data=states.getData;
    let stateData=states.getOrderStatus;
    this.cluster=stateData.cluster;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 
</style>

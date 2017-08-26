<!-- 订单祥情页 -->
<template>
    <div class="myapp">
    	<router-view></router-view>
    </div>
</template>
<script>
import router from '../../router'
import layer from './components/layer'
export default {
  name:'myapp',
    beforeRouteEnter(to,from,next){
        document.title="订单详情";
        next();
        
    },
    data(){
       return {
         layerTip:'',
         hasLayer:false
       }
    },
    components:{
     layer
    },
    created(){
        let query=this.$route.query;
        let pageCode=query.pageCode;
        let orderId=query.orderId;
        let path='';
        this.$store.commit('updateOrderId',{orderId:orderId})
        switch(pageCode){
        case 'NannyClusters':
         path='/orderdetail/babysitter';
        break;
        case 'RepairClusters':
         path='/orderdetail/repair';
        break;
        case 'WashClusters':
         path='/orderdetail/wash';
        break;
        case 'CommonClusters':
          path='/orderdetail/common';
        break;
      }
      router.push({path:path,query:{orderId:orderId,pageCode:pageCode}});
    }
}
</script>
<style>
	
</style>
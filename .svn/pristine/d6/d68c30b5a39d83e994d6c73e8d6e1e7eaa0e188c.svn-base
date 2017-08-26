<template>
	<article class="evaluate">
		<order-info v-if="!hasEvaluate"></order-info>
		<evaluate-part :hasevaluate="hasEvaluate">
			<template v-if="!hasEvaluate">
				<p>匿名评价师傅</p>
			</template>
			<template v-else>
				 <p>感谢您的评价</p>
			</template>
		</evaluate-part>
	</article>
</template>
<script>
import orderInfo from './components/order-info'
import evaluatePart from './components/evaluate-part'   
export default{
	name:'evaluate',
	beforeRouteEnter(to,from,next){
          document.title="评价师傅";
          next();
    },
	data(){
	  return{
       hasEvaluate:true
	  }
	},
	components:{
		evaluatePart,
		orderInfo
	},
	created(){
		let orderId=this.$route.query.orderId;
		let deviceId=this.storageHandle().getStorage('deviceId');
        let instance = this.axios.create({
            headers:{
            	orderId:orderId
            }
        });
        instance({
        	method:'get',
        	url:'/AssessInfos?orderId='+orderId
        })
        .then(function(res){
           if(res.status==200){
           	 let data=res.data;
           	 this.$store.commit('updateData',data); 
           }
        })
        .catch(function(error){
        	console.log(error.response.data.message);
        });
	}
}
</script>
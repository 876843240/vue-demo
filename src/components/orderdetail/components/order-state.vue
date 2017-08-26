<!-- 最上面的订单状态组件 -->
<template>
	<section class="going-state flex">
        <h1>{{orderDisplayStatus}}</h1>
        <h2 v-if="hasDescript"><slot name="descript"></slot></h2>
     </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default{
	name:'going-state',
    props:{
     hasDescript:Boolean
    },
	data(){
		return {
       //订单显示状态名称 
        orderDisplayStatus:''  
		}
	},
  created(){
    setTimeout(()=>{
    let getters=this.$store.getters;
    let data=getters.getData;
    this.orderDisplayStatus=data.orderDisplayStatus;
    },0)
  }
}
</script>
<style lang="scss">
.going-state.flex{
	 flex-direction:column;
	 -webkit-flex-direction:column;
	 justify-content:center;
	 -webkit-justify-content:center;
	 align-items:flex-start;
	 -webkit-align-items:flex-start;
     height: 4.29rem;
     background-image: linear-gradient(to right,#e24c00 0,#ff9a2f 100%);
     background-image: -webkit-linear-gradient(to right,#e24c00 0,#ff9a2f 100%);
     h1,h2{
      color:#fff;
      margin-left: 2.07rem;
     }
     h1{
     	font-size: 1.14rem;
     }
     h2{
     	font-size: 0.71rem;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
     }
  }
</style>
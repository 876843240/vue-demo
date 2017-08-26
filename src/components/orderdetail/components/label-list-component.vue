<!-- 标签列表 -->
<template>
	<section class="label-list" @click="selectLabelEvent($event)">
		<ul>
		  <li v-for="item of labelLists">
		    <a href="javascript:;" class="label-item" role="button" 
		     :data-labelCode="item.labelCode"  
		     :data-labelId="item.labelId">
		     {{item.labelName}}
		    </a>
		  </li>
		</ul>
	</section>
</template>
<script>
export default{
  name:'label-list',
  props:{
   //标签列表
   labelLists:{
   	type:Array,
   	data:[]
   }
  },
  data(){
   return {
     
   }
  },
  methods:{
  	selectLabelEvent(e){
      
  	}
  }
}
</script>
<style lang="scss" scoped>
	
</style>

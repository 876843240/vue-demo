<!-- alert类型的组件 -->
<template>
  <transition name="layer">
  <article class="layer" v-show="show">
  	<div class="layer_bg"></div>
  	<section class="layer_content" v-bind:style="{width:width,height:height}">
  		<h2 class="layer_content_title">出现错误</h2>
  		<section class="layer_content_tip"><p>{{layerTip}}</p></section>
  		<section class="layer_content_btn flex onepx-top">
  		 <a href="javascript:;" class="onepx-right" role="button" v-if="layerType=='confirm'" @click="sureEvent">
  		  <slot name="sure">确定</slot>
  		 </a>
  		 <a href="javascript:;" role="button" @click="clickEvent()">
  		 	<slot name="cancle">取消</slot>
  		 </a>
  		</section>
  	</section>
  </article>
  </transition>
</template>
<script>
export default{
 name:'layer',
 props:{
  //弹出类型
  //1.alert 2.confirm
  layerType:{
  	type:String,
  	default:'alert'
  },
  //弹出的提示信息
  layerTip:{
  	type:String
  },
  width:{
    type:[Number,String]
  },
  height:{
    type:[Number,String]
  }
 },
 data(){
 	return {
 	  show:true
 	}
 },
 methods:{
 	clickEvent(){
 		this.show=false;
 	},
  //点确定按钮的事件
  sureEvent(){
     this.$emit('sureEvent');
  }
 }
}	
</script>
<style lang="scss" scoped>
.layer{
  position: fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:1;
   .layer_bg{
     width:100%;
     height:100%;
     background-color:rgba(0,0,0,0.6);
   }
   .layer_content{
   	width:70vw;
    background-color: #fff;
    position: absolute;
    top:50%;
    left:50%;
    margin-left: -35vw;
    min-height: 8rem;
    transform:translateY(-50%);
    -webkit-transform:translateY(-50%);
    text-align: center;
    padding:1rem 0;
    border-radius: 0.5rem;
    -webkit-border-radius: 0.5rem;
    overflow: hidden;
    transition:top 0.5s;
    .layer_content_title{
    	margin-bottom: 1.5rem;
    	font-size: 1.26rem;
    	color:#333;
    }
    .layer_content_btn{
    	position: absolute;
    	bottom: 0;
    	line-height: 3rem;
    	text-align: center;
    	width:100%;
    	height:3rem;
    	margin-top: 0.5rem;
    	a{
    		flex:1 0 50%;
    		-webkit-flex:1 0 50%;
    		font-size: 1.07rem;
    		color:#666;
    		&:active{
    			background-color: #ddd;
    			color:#fff;
    		}
    	}
    }
   }
 }
.layer-enter-active, .layer-leave-active {
  transition: all .5s;
}
.layer-enter, .layer-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}
.layer-enter .layer_content{
  top:45%;
}
</style>
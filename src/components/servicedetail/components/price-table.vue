<template>
  <section class="price-table block">
    <div class="price-table-content">
    <div class="title"><h2>价目表</h2></div>
  	<section class="table" :style="{height:minSize+'px'}">
  		<table :class="{'full-table':!showSlideBtn}">
  			<thead>
  				<td>维护等级</td>
  				<td>对应更换配件</td>
  				<td>价格</td>
  			</thead>
  			<tbody>
  				<tr>
  					<td>维修等级</td>
  					<td>检测出电气故障后，用户主动放弃维修时收取</td>
  					<td>30元</td>
  				</tr>
  				<tr>
  					<td>检修</td>
  					<td>不更换配件修好</td>
  					<td>60元</td>
  				</tr>
  			</tbody>
  		</table>
  		<transition name="slide">
  		<div class="slide-btn" v-if="showSlideBtn">
  		    <a href="javascript:;" class="middle-size" role="button" v-on:click="slideEvent()">展开</a>
  	     </div>
  	     </transition>
  	</section>
  	</div>
  </section>
</template>
<script>
export default{
   name:'price-table',
   data(){
     return{
        showSlideBtn:false,
        minSize:350,//显示展开按钮table最小尺寸
        tableSize:0 //table的真实尺寸  
     }
   },
   methods:{
     slideEvent(){
        this.showSlideBtn=false;
        var that=this;
        function setMinSize(){
        	that.minSize+=4;
        	if(that.minSize<that.tableSize){
        		setTimeout(setMinSize,10);
        	}
        }
        setTimeout(setMinSize,10);
     }
   },
   mounted(){
   	 //挂载dom成功后先获取table。判断table的高度。如果高度大于当前预定的高度。那就只显示预定高度。并显示展开按钮
   	 let table=this.$el.querySelector('table');
     let height=parseInt(table.clientHeight)+1;
   	 if(height>=this.minSize){
   	 	this.showSlideBtn=true;
   	 	this.tableSize=height;
   	 }else{
   	 	this.minSize=height;
   	 }
   }
}
</script>
<style lang="scss">
    .slide-enter-active,.slide-leave-active{
    	transition:opacity 0.5s;
    	-webkit-transition:opacity 0.5s;
    } 
    .slide-enter, .slide-leave-to{
       opacity: 0
     }
	.price-table-content{
		margin:1.21rem 0.43rem;
	}
	.title{
		h2{
			padding-top: 0;
			line-height: 2.81rem;
		    background-color: #edf0f7;
		    text-align: center;
		}
	}
	.table{
		position: relative;
		overflow: hidden;
		table{
		  border-collapse:collapse;
      table-layout:fixed;
		  width:100%;
		  height:400px;
		  td{
		  	height:3.42rem;
		  }
		  thead td{
		  	height:3.51rem;
		  	background-color: #f7f8fc;
		  	border-top:none;
		  	&:first-child{
		  		width:25%;
		  	}
		  	&:nth-child(2){
		  		width:50%;
		  	}
		  	&:nth-child(3){
		  		width:25;
		  	}
		  }
		  td{
		  	text-align: center;
		  	border:1px solid #ececec;
		  }
		}
		.slide-btn{
			position: absolute;
			bottom: 0;
			left:0;
			width:100%;
			height:3.14rem;
			line-height: 3.14rem;
			background-color: #fcf4e9;
			text-align: center;
		}
	}
	
</style>
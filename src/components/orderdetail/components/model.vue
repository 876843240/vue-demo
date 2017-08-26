<!-- 重下弹起的弹框 -->
<template>
<transition name="model">
	<section class="model">
		<transition class="fade">
		<div class="model-bg" v-show="show"></div>
		</transition>
		<div class="model-content" v-show="show">
			<div class="model-content-title">
				<h2 class="title onepx-bottom">退款完成</h2>
				<a href="javascript:;" role="button" class="iconfont icon-del" @click="delEvent()"></a>
			</div>
			<div class="model-content-container">
				<h3 class="price"><span>退款金额：</span>60.00元</h3>
				<h3><span>退款原因：</span><em>师傅不给修</em></h3>
				<h3><span>退款说明：</span><em>师傅不给修师傅不给修师傅不给修师傅 不给修</em></h3>
				<h3><span>申请时间：</span><em>2016-02-09 12:00</em></h3>
				<h3><span>到账时间：</span><em>预计7个工作日到账</em></p></h3>
			</div>
		</div>
	</section>
</transition>
</template>
<script>
export default{
  name:'model',
  data(){
  	return {
  		show:true
  	}
  },
  methods:{
  	delEvent(){
  		this.show=false;
  		this.$emit('changeState');
  	}
  }
}	
</script>
<style lang="scss">
    .model-enter-active{
     transition:all 0.3s ;
    }
    .model-leave-active {
     transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .model-enter, .model-leave-to
      {  transform: translateY(100px);
         opacity: 0;
      }
	.model{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		min-height:100%;
		z-index: 1;
		.model-bg{
			position: absolute;
			width:100%;
		    height:100%;
			background-color: #ababab;
		}
		.model-content{
			background-color: #fff;
			position: absolute;
			bottom: 0;
			left:0;
			width:100%;
			min-height:3.5rem;
			.model-content-title{
				height:3.5rem;
				line-height: 3.5rem;
				position: relative;
				h2{
					line-height: inherit;
					color:#ff763a;
					font-size: 1.21rem;
					text-align: center;
				}
				a{
					position: absolute;
                    right:1.08rem;
                    top:50%;
                    transform:translateY(-50%);
                    &.icon-del{
                    	font-size: 1.06rem;
                    	color:#d8d8d8;
                    }
				}
			}
		}
		.model-content-container{
			margin:1.82rem 1.43rem;
			h3{
				margin-bottom:1.93rem;
				overflow: hidden;
				span{
				   max-width:5rem;
				   float: left;
				}
				em{
					float: left;
				}
			}
		}
	}
</style>

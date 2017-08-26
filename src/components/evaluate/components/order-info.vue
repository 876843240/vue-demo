<template>
	<section class="order-info block">
		<div class="order-info-title onepx-bottom">
		  <h1>支付成功！</h1>
		</div>
		<div class="order-info-detail">
		  <h2><span>家电维修</span><em>热水器</em></h2>
		  <dl>
			<dt>实付金额：</dt>
			<dd>200.00元</dd>
		  </dl>
		</div>
	</section>
</template>
<script>
export default{
  name:'order-info'
}
</script>
<style lang="scss">
	.order-info{
		margin-top: 0.79rem;
       .order-info-title{
        	margin-left: 1rem;
       }
		h1{
			line-height: 3.29rem;
			color:#333;
			font-size: 1.43rem;
			text-align: center;
		}
		.order-info-detail{
			margin-left:1.43rem;
			overflow: hidden;
			h2{
				margin-top: 1.46rem;
				margin-bottom: 1.21rem;
				span,em{
					font-size: 1.21rem;
					margin-right: 1.43rem;
				}
				span{
					color:#666;
				}
				em{
					color:#333; 
				}
			}
			dl{
				 margin-bottom: 0.86rem;
				dt,dd{
					display: inline-block;
					font-size: 1.07rem;
				}
				dt{
					color:#666;
					margin-right: 0.6rem;
				}
				dd{
					color:#e24c00;
				}
			}
		}
	}
</style>
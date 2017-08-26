<template>
	<article class="government-detail">
		<h1>{{title}}</h1>
		<p><em>{{source}}</em><time datatime="{{publishDate}}">{{publishDate}}</time></p>
		<div class="content" v-html="context"></div>
	</article>
</template>
<script>
export default{
	name:'government-detail',
	data(){
       return{
       	 context:'',
       	 //title
       	 title:'',
       	 //内容来源
       	 source:'',

       }
	},
	beforeRouteEnter(to,from,next){
       document.title='政务详情';
       document.documentElement.style.backgroundColor="#fff";
       next();
	},
	created(){
	    let affairId=this.$route.query.affairId;
		this.$store.dispatch('updateAffairDetail',{affairId:affairId})
		.then((data)=>{
           if(!!data){
            this.title=data.title;
            this.context=this.Base64.decode(data.context);
            this.source=data.source;
            this.publishDate=this.timeStamp(data.publishDate,1);
           }
		})

	}
}	
</script>
<style lang="scss">
.government-detail{
	background-color: #fff;
	padding:0.75rem 1.43rem;
	h1{
	 font-size: 1.43rem;
	 color:#333;	
	}
	p{
		color:#999;
		font-size: 0.93rem;
		margin:1.07rem 0;
		em{
			margin-right: 0.6rem;
		}
	}
	.content {
		p{
			font-size: 1rem;
			color:#333;
			line-height:1.4;
		}
		img{
			max-width: 100%;
		}
	}
}

</style>

<template>
	<article class="system-message">
		<h1>{{title}}</h1>
		<p><em>新华网</em><time datatime="2017-05-01">2017-05-01</time></p>
		<div class="content" v-html="context"></div>
	</article>
</template>
<script>
export default{
	name:'system-message',
	data(){
       return{
       	 context:'<p>北京5U生活有限公司（以下简称“5U生活”）在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您 充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登 录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。 本协议约定5U生活与用户之间关于“5U生活”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。 本协议可由5U生活随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在5U生活修改协议条 款后，如果用户不接受修改后的条款，请立即停止使用5U生活提供的服务，用户继续使用5U生活提供的服务将被视为接受修改后的协议。</p><p> 一、帐号注册 1、用户在使用本服务前需要注册一个“5U生活”帐号。“5U生活”帐号应当使用手机号码绑定注册，请用户使用尚未与“5U生活”帐号绑定的手机号码，以及未被5U生活根据本协议封禁的手机号码注册“5U生活”帐号。易驾驶可以根据用户需求或产品需要对帐号注册和绑定的方式进行变更，而无须事先通知用户。 2、“易驾驶”系基于地理位置的移动社交产品，用户注册时应当授权易驾驶技公开及使用其地理位置信息方可成功注册“易驾驶”帐号。故用户完成注册即表明用户同意易驾驶科技提取、公开及使用用户的地理位置信息。如用户需要</p>',
       	 title:'政府部门需要低成本的灵活计算解决方案，以便完成复杂'
       }
	},
	created(){
      let headers=this.storageHandle().getStorages(['deviceId','Authorization']);
      let instance=this.axios.create({
      	headers:headers
      });
      instance({
      	method:'get',
      	url:'/Messages',
      })
      .then(function(res){
        console.log(res);
      })
      .catch(function(err){
        console.log(err.response.data.message);
      })
	},
	beforeRouteEnter(to,from,next){
       document.title='我的消息';
       document.documentElement.style.backgroundColor="#fff";
       next();
	}
}	
</script>
<style lang="scss">
.system-message{
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

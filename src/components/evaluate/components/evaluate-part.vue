<template>
	<section class="evaluate-part block no-top-border">
		<section class="avatar onepx-bottom" v-bind:class="{'has-evaluate':!!hasEvaluate}">
		   <div class="center-part">
			<div class="img">
			  <img src="/static/images/call.png" alt="master-logo">
			</div>
			<em>康师傅</em>
			</div>
		</section>
		<section class="show-result">
			<p class="tip"><slot></slot></p>
			<star-component :hasEvaluate="hasEvaluate" :starLevel="4" class="flex" v-on:getLen="getStarLevel"></star-component>
			<div class="user-comment" v-if="hasEvaluate">
			  <evaluate-label :hasEvaluate="hasEvaluate"></evaluate-label>
				<p>{{content}}</p>
			</div>
		</section>
		<template v-if="!hasEvaluate">
		<section class="evaluate onepx-top">
      <evaluate-label v-on:evaluateFinish="getEvaluateLabel"></evaluate-label>
			<div class="comment-area">
			  <textarea v-model.trim="content" placeholder="说一说:"></textarea>
			</div>
		</section>
		<section class="sure-btn">
			 <a href="javascript:;" role="button" @click="submitEvaluate()">确定</a>
		</section>
		</template>
	</section>
</template>
<script>
import evaluateLabel from './evaluate-label-component'
export default{
  name:'evaluate-part',
  props:['hasevaluate'],
  data(){
  	return {
      hasEvaluate:true,
      //如果已经评价。就使用星级
      starLevel:4,
      //用户选择的星级
      selecteLevel:0,
      //用户评价的标签
      seletedLabels:[],
      //默认获取的content
      content:'123213',
      //用户输入的评论
      newContent:''
  	}
  },
  created(){
  },
  methods:{
    //获取用户评价的星级
     getStarLevel(level){
       this.selecteLevel=level;
     },
     //获取用户评价的标签
     getEvaluateLabel(label){
       this.seletedLabels=label;
     },
     //提交评价
     submitEvaluate(){
       let stor=this.storageHandle();
       let deviceId=stor.getStorage('deviceId');
       let Authorization=stor.getStorage('Authorization');
       let instance=this.axios.create({
        headers:{
          'Content-Type':'application/json',
           Authorization:Authorization,
           deviceId:deviceId
        }
       });
       instance({
         method:'post',
         url:'/AssessInfos',
         data:{
            AssessInfo:{
              "orderId": this.orderId,
              "assessRank": this.selecteLevel,
              "AssessLabel":this.seletedLabels,
              "content": this.newContent
            }
         }
       })
       let storage=this.storageHandle();
       if(this.selecteLevel==0){
         alert('请先给师傅评分');
         return false;
       }

     }    
  },
  mounted(){
  //当页面元素已经挂载之后先判断是否已经评价过
     if(this.hasEvaluate){
  	 var height=document.documentElement.clientHeight;
     var el=this.$el;
     var margin=parseInt(document.defaultView.getComputedStyle(el)['margin-top']);
     el.style.height=height-margin+'px';
    }
  },
  components:{
    evaluateLabel,
  	starComponent:{
  		props:{
        hasEvaluate:{
          type:Boolean,
          default:false,
        },
        starLevel:{
          type:Number,
          default:4
        },
        selectedLevel:{
          type:Number,
          default:0
        }
      },
      data(){
        return {
          selecteLevel:this.selectedLevel
        }
      },
  		mounted(){
  		  if(!this.hasEvaluate){
            return false;
  		  }
          let children=this.$el.children;
          for(var i=0;i<this.starLevel;i++){
          	children[i].classList.add('hasClick');
          }
  		},
  		//为了避免多次重复写同一个标签
  		//使用render函数来代替
  		render(createElement){
  	     return createElement(
          'div',
           {
           	'class':'star',
             on:{
             	 /*当前star的click事件*/
                 '!click':(e)=>{
                 	if(this.hasEvaluate){
                 		return false;
                 	}
                 
                 	let target=e.target;
                  /*let starLevel=0;*/
                  if(target.nodeName.toLowerCase()=='span'){
                 		var curr=target;
                 		var s=target.previousElementSibling;
                    var n=target.nextElementSibling;
                    if(target.classList.contains('hasClick')){
                      while(!!n){
                         if(n.classList.contains('hasClick')){
                            n.classList.remove('hasClick');
                            this.selecteLevel--;
                         }
                         n=n.nextElementSibling;
                      }
                    }else{
                      this.selecteLevel=1;
                      while(!!s){
                          target.classList.add('hasClick');
                          s.classList.add('hasClick');
                          s=s.previousElementSibling;
                         this.selecteLevel++;
                      }
                    }
                     this.$emit('getLen',this.selecteLevel);
                  	}
                 }
              }
           },
           Array.apply(this,{length:5}).map(()=>{
          	return createElement('span',{attrs:{'class':'iconfont icon-star'}
               })
          })
  	     )
      }
  	}
  }
}
</script>
<style lang="scss">
.evaluate-part{
	margin-top:1rem;
	margin-bottom: 0;
	&:after{
		content:none;
	}
	>section{
		margin:0 1rem;
	}
}
 .avatar{
 	height:8.64rem;
 	overflow: hidden;
 	.center-part{
 		width:4.29rem;
 		margin:1.29rem auto;
 		text-align: center;
 		em{ 
 			display: block;
 			font-size: 1.07rem;
 			margin-top: 0.5rem;
 			color:#666;
 		}
 	}
 	&.has-evaluate{
      height:auto;
      .center-part{
      	margin-top: 4rem;
      }
      &:before{
      	content:none;
      }
 	}
 	.img{
 		height:4.29rem;
 		border-radius: 50%;
 		-webkit-border-radius: 50%;
 		img{
 			max-width: 100%;
 		}
 	}
 }
 .show-result{
 	margin-top: 1.54rem;
 	text-align: center;
 	.tip{
 		margin-top: 1.5rem;
 		color:#666;
 		font-size: 0.93rem;
 	}
 }
 .star{
 	margin: 1.5rem auto 2.16rem;
 	width:17.56rem;
    span{
    	display: inline-block;
    	font-size: 2rem;
    	color: #e0e0e0;
    	&.hasClick{
    		color:#ffc620;
    	}
    }
 }

 .comment-area textarea{
   width:calc(100% - 1.94rem);
   width:-webkit-calc(100% - 1.94rem);
   height:6.14rem;
   resize:none;
   border:1px solid #ccc;
   font-size: 0.86rem;
   color:#666;
   padding:0.5rem 0.97rem;
   &::-webkit-input-placeholder{
   color:#ccc;
   }
 }
 .sure-btn{
 	overflow: hidden;
 	a{
      display: block;
      margin:1.57rem 1rem 1.37rem;
      line-height: 3rem;
      background-color: #e24c00;
      color:#fff;
      border-radius: 0.3rem;
      -webkit-border-radius: 0.3rem;
      text-align: center;
 	}
 }
</style>
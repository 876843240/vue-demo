<!-- 主要需求组件 -->
<template>
	<section class="primary-command block">
	   <div class="command-detail onepx-bottom">
	    <div class="center-part">
        <h2>主要需求</h2>
	    <section class="command-label-list">
	    <command-label-list class="flex" :allLabelLists="allLabelLists" v-bind:DemandLabel="DemandLabel"></command-label-list>
	   </section>
	    <section class="command-description">
		  <p>{{describe}}</p>
	   </section>
	   </div>
	   </div>
	   <div class="center-part">
	   <section class="contact-way">
	   	  <p class="contact-tel">
	   	  	<span>联系电话：</span><em>15912312321</em>
	   	  </p>
	   	  <p class="service-place">
	   	  	<span>服务地址：</span><em>沈阳</em>
	   	  </p>
	   </section>
	   </div>
	</section>
</template>
<script>
	export default{
	  name:'primary-command',
    data(){
  	  return {
  	  	photoLists:['/static/images/arrow_1.png','/static/images/arrow_1.png','/static/images/arrow_2.png','/static/images/arrow_2.png','/static/images/arrow_2.png'],
        allLabelLists:[],
        //被选中的标签列表
        DemandLabel:[],
        //默认的服务描述
        describe:''
  	  }
    },
    created(){
      setTimeout(()=>{
      let getters=this.$store.getters;
      let data=getters.getData;
      let ids=getters.getId;
      let serviceId=ids.serviceId;
      let state=getters.getOrderStatus;
      this.selectedLabelLists=data.ServiceLabel;
      this.describe=data.describe;
      //获取label的数据
      let orderId=ids.orderId;
      this.$store.dispatch('updateLabels',{
        serviceId:serviceId,
        orderType:'NannyClusters',
        orderId:orderId
        }).then((data)=>{
        if(!!data){
          this.allLabelLists=data;
        }
      });
      },0)
    },
    components:{
    	//需求标签列表
    	'command-label-list':{
    	   props:['DemandLabel','allLabelLists'],
         render:function(createElement){
              for(var i=0,j=this.allLabelLists.length;i<j;i++){
                if(i<this.DemandLabel.length){
                this.allLabelLists[i].className='label-item has-click';
                }else{
                  this.allLabelLists[i].className='label-item';
                }
              }
           	  if(this.DemandLabel){
           	  	 return createElement('ul',{
           	  	      },this.allLabelLists.map(function(item,index,arr){
                      return createElement('li',[createElement('a',{attrs:{'href':'javascript:;','role':'button','class':item.className}},item.labelName)]) 
           	  	  })
           	  	 )}
    	   }
    	    }
        }
}
</script>
<style lang="scss">
	 .command-label-list .flex{
    -webkit-box-lines:multiple;
	  flex-wrap:wrap;
	 -webkit-flex-wrap:wrap;
	  justify-content: flex-start;
    -webkit-justify-content: flex-start;
	  -moz-justify-content: flex-start;

    }

	h2{
		font-size: 1.06rem;
		color:#666;
	}
	.command-label-list{
		margin-top: 0.93rem;
		margin-bottom: 0.36rem;
		ul{
			li{
             text-align: center;
             margin-bottom: 1.07rem;
             flex:0 0 25%;
             box-flex:1;
             -webkit-flex:0 0 25%;
             &:nth-child(4n+4){
             	margin-right: 0;
             }
             .label-item{
             	display: block;
             	border:1px solid;
                color:#ccc;
                width:5.36rem;
                margin:0 auto;
                font-size: 0.93rem;
                line-height:2rem;
                border-radius: 1rem;
                -webkit-border-radius: 1rem;
                &.has-click{
                	color:#ea5412;
                }
             }
		    }
		}
		
	}
   .command-description{
   	p{
   		font-size: 1.07rem;
   		line-height: 1.6;
   	}
   }
   .center-part{
   	 .contact-tel{
   	 	margin-bottom: 0.93rem;
   	 }

   }
</style>
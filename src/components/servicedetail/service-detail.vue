<template>
  <article class="service-detail">
  	 <service-type class="overflow" 
     :serviceName="data.serviceName"
     :serviceIcon="data.serviceIcon"
     :preMoney="data.preMoney"
     :preName="data.preName"
     >
     </service-type>
  	 <price-table class="overflow"></price-table>
  <!--    <section class="block overflow service-process">
     <div class="center-part">
     <h2 class="title">服务流程</h2>
    <ul class="flex">
      <li class="has-arrow">
          <div class="icon-size">
          <i class="icon wx_smsj"></i>
          </div>
        <p>预约上门时间</p>
      </li>
      <li class="has-arrow">
         <div class="icon-size">
        <i class="icon wx_bj"></i>
        </div>
        <p>上门检查报价</p>
      </li>
      <li class="has-arrow">
         <div class="icon-size">
          <i class="icon wx_wx"></i>
          </div>
        <p>彻底维修</p>
      </li>
      <li>
         <div class="icon-size">
          <i class="icon wx_qctj"></i>
          </div>
        <p>清场退件</p>
      </li>
    </ul>
    </div>
  </section>
  <section class="block overflow service-note">
     <div class="center-part">
     <h2 class="title">服务说明</h2>
     <p>1.服务时间: 8:00-20:00</p>
     <p>2.服务范围：沈阳市内</p>
     <p>3.预约维修后师傅会主动联系客户，确定具体服务相关信息 </p>
     <p>4.维修费用不包含配件，如需配件，可与维修师傅沟通帮忙代买 </p>
     <p>5.上门检查后，如客户不接受服务，师傅会酌情收取上门费</p>
     <p>6.服务有居家无忧合作商提供</p>
     </div>
  </section>
  <section class="block overflow service-guarantee">
    <div class="center-part">
    <h2 class="title">服务保障</h2>
    <p>价格公开透明，同收费非标准</p>
    <p>工程师专业技能培训考核上岗</p>
    <p>内容:凭保修卡，可享受3个月免费保修</p>
    </div>
  </section> -->
     <template v-html="data.serviceDescribe"></template>
  	 <section class="overflow sure-btn">
  	 	<a href="javascript:;" class="has-color-btn" role="button" @click="subscribe()">立即预约</a>
  	 </section>
  </article>	
</template>
<script>
import serviceType from './components/service-type'
import priceTable from './components/price-table'
export default{
	name:'service-detail',
	data(){
      return {
        //数据对象
        data:{}
      }
	},
	components:{
		serviceType,
		priceTable
	},
  methods:{
    subscribe(){
       let isIos=this.ua.isIos();
       if(isIos){
         window.webkit.messageHandlers.subscribe.postMessage({serviceId:this.serviceId,pageCode:this.pageCode,bespokeType:this.data.bespokeType});
       }else{
         window.APP.subscribe(this.serviceId,this.pageCode,this.data.bespokeType); 
       }
    }
  },
  created(){
    let query=this.$route.query;
    let pageCode=this.pageCode=query.pageCode||'CommonClusters';
    let serviceId=this.serviceId=query.serviceId;
    let headers=this.storageHandle().getStorages(['deviceId','Authorization']);
    let instance=this.axios.create({
      headers:headers
    });
    instance({
      method:'get',
      url:'/'+pageCode+'/ServiceDetail?serviceId='+serviceId
    })
    .then((response)=>{
       if(response.status==200){
         let data=response.data;
         data.serviceDescribe=this.Base64.decode(data.serviceDescribe);
         this.data=data;
       }
    })
    .catch((err)=>console.log(err.response.data.message));
  },
  beforeRouteEnter(to,from,next){
    document.title='服务详情';
    next();
  }
}
</script>
<style lang="scss">
	h2{
		padding-top: 1.29rem;
	}
	.flex{
		 align-items:flex-end;
		 -webkit-align-items:flex-end;
		li{
			text-align: center;
			flex:1 0 25%;
			-webkit-flex:1 0 25%;
			&.has-arrow:after{
               top:2.29rem;
               right:-5%;
	        }
	        .icon-size{
	        	height:3.7rem;
	        	vertical-align: middle;
	        }
	        p{
	        	    margin-top: 1rem;
                    margin-bottom: 1rem;
                    @media screen and (max-width: 320px){
                    	font-size: 0.8rem;
                    }
	        }
		}
	}
	.overflow{
		overflow:hidden;
	}
	.center-part{
		margin:0 1rem;
    padding:0;
		p{
			font-size: 0.86rem;
			color:#666;
		}
	}
	.service-note{
		padding-bottom: 1.29rem;
      p{
      	line-height: 1.7;
      }
	}
	.service-guarantee{
		padding-bottom: 1.79rem;
		margin-bottom: 5rem;
		p{
			margin-top: 1.29rem;
			vertical-align: middle;
			&:before{
				content:"";
				vertical-align: middle;
			    margin-right: 1.4rem;
			    display: inline-block;
			    background:no-repeat center/cover;
			}
			&:first-of-type:before{
                  background-image: url(/static/images/arrow_1.png);
                  width:1.86rem;
                  height:1.86rem;
			}
			&:nth-of-type(2):before{
                  background-image: url(/static/images/arrow_1.png);
                  width:1.86rem;
                  height:2rem;
			}
			&:last-of-type:before{
                  background-image: url(/static/images/arrow_1.png);
                  width:1.71rem;
                  height:2.14rem;
			}
		}
	}
	.sure-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width:100%;
		margin-bottom:0;
		text-align: center;
    overflow: hidden;
		a{
			display: block;
      height:3.57rem;
      line-height: 3.57rem;
			font-size: 1.29rem;
		}
	}
</style>

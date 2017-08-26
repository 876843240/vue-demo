<!-- 保姆详情页 -->
<template>
	<article class="baby-sitter">
		<order-state :hasDescript="hasDescript">
			<template slot="descript">{{stateDescript}}</template>
		</order-state>
		<current-state :cluster="'NannyClusters'" v-if="state!=5"></current-state>
		<primary-command :serviceId="serviceId"></primary-command>
      <div class="receive-state" v-if="hasreceiveState">
      <p>{{receiveState}}</p>
    </div>
		<master-info :hasMaster="hasMaster"></master-info>
		<order-info></order-info>
		<handle-btn v-if="!notAllowCancle"></handle-btn>
		<layer v-if="hasLayer" :layerTip="layerTip"></layer>
	</article>
</template>
<script>
import orderState from './components/order-state'
import currentState from './components/current-state'
import masterInfo from './components/master-info'
import orderInfo from './components/order-info'
import handleBtn from './components/handle-btn'
import primaryCommand from './components/primary-command'
import layer from './components/layer'
export default{
	name:'baby-sitter',
	data(){
		return {
		//状态只有1.3.4.5,匹配成功就直接调到预约面试阶段
          state:0,
          hasMaster:true, //是否显示保姆信息
          hasDescript:true, //是否显示状态消息描述
          stateDescript:'', //默认的状态消息描述
          receiveState:'', //当前保姆的进度
          hasreceiveState:true, //是否有当前保姆的进度
          notAllowCancle:false, //不允许用户再取消订单
          masterHeadimg:'',
          hasLayer:false,
          layerTip:'',  //错误提示信息
          layerType:'alert',//默认的layer类型
          //服务id
          serviceId:''
		}
	},
	components:{
		primaryCommand,
    orderState,
    currentState,
    masterInfo,
    orderInfo,
    handleBtn,
	},
	created(){
      let getters=this.$store.getters;
      let orderId=getters.getId.orderId;
      this.$store.dispatch('updateOrder',{
        orderId:orderId,
        orderType:'NannyClusters'
      }).then((data)=>{
        if (!!data.orderStatus) {
          this.orderStatus = data.orderStatus;
          let transfeStatus = data.transfeStatus;
          if (this.orderStatus == 39) {
            this.hasreceiveState = false;
            this.stateDescript = '用户取消订单';
          } else {
            switch (transfeStatus) {
              case 1302:
                this.hasreceiveState = false;
                this.stateDescript = '您的专属顾问将在24小时内与您联系，请保持手机畅通。';
                break;
              case 1402:
              case 1403:
                this.stateDescript = '已为您匹配保姆';
                this.receiveState = '已为您匹配保姆';
                break;
              case 1703:
                this.hasDescript = false;
                this.notAllowCancle = true;
                this.receiveState = '已成功签约';
                break;
            }
          }
        }

      });
	}
}
</script>
<style lang="scss">
	.receive-state{
		margin:1.43rem 1rem;
		position: relative;
		height:1.43rem;
		&::before{
				content:"";
				display: inline-block;
				width:100%;
				height:1px;
				position: absolute;
				top:50%;
				background-color: #b1b1b1;
		 }
		p{
			color:#b1b1b1;
			background-color: #f5f5f5;
			display: inline-block;
			padding:0 1.93rem;
			left:50%;
			position: absolute;
			top:50%;
			transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
		}
	}
</style>
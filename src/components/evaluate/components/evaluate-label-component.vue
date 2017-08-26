<!--选择标签组件 -->
<template>
	<section class="comment-label-list label-list" v-bind:class="{'comment-label':hasEvaluate==true}">
		<ul @click="setLabelStyle($event)">
			<li v-for="item of labels">
			   <em :data-id="item.labelId">{{item.labelName}}</em>
			</li>
		</ul>
	</section>
</template>
<script>
 export default{
 	name:'comment-label-list',
  props:{
    hasEvaluate:Boolean
  },
 	data(){
 		return {
 		  labels:[{
 		   labelId:'1',
           labelCode:'1234',
           labelName:'啊啊'
 	      },
 	      {
 		   labelId:'2',
           labelCode:'1234',
           labelName:'哈哈'
 	      },
 	      {
 		   labelId:'3',
           labelCode:'1234',
           labelName:'咚咚'
 	      }
 	      ],
 	      //被选中的标签id
 	      selectedArr:[],
 		}
 	},
 	methods:{
      setLabelStyle(e){
         let target=e.target;
         //如果已经评价过了。就不能点击
         if(!!this.hasEvaluate){
            return false;
         }
         if(target.nodeName.toLowerCase()=='em'){
            target.classList.toggle('has-selected');
            let isSelected=target.classList.contains('has-selected');
            let id=target.dataset.id;
            if(isSelected){
              this.selectedArr.push(id);
            }else{
               let len=this.selectedArr.length;
               for(let i=0;i<len;i++){
               	if(this.selectedArr[i]==id){
               	  this.selectedArr.splice(i,1);
                  break;	
               	}
               }
            }
         }
         this.$emit('evaluateFinish',this.selectedArr);
      }

 	}
 }
</script>
<style lang="scss" scoped>
	.comment-label-list{
 	  padding-top: 0.6rem;
 	  &.comment-label{
    display: inline-block;
    overflow: initial;
    }
  }
 .label-list{
 	overflow: hidden;
 	margin-right: -1rem;
 	li {
 	  float:left;
 	  margin-right:1rem;
 	  margin-bottom: 0.71rem;
 	  em{
 	  	font-size: 0.86rem;
 	  	color:#ccc;
 	  	border:1px solid;
 	  	padding:0.1rem 0.93rem;
 	  	border-radius: 0.7rem;
 	  	-webkit-border-radius: 0.7rem;
 	  	&.has-selected{
 	  		color:#ea5412; 
 	  	}
 	  }
 	}
 }

</style>
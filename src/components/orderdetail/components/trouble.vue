<!-- 故障模块 -->
<!-- 当服务是清洗系列的时候隐藏故障模块 -->
<template>
<section class="trouble block">
    <div class="center-part">
    <h2>故障描述</h2>
	<section class="trouble-label-list">
	    <trouble-label-list class="flex" :allLabelLists="allLabelLists" :selectedLabelLists="selectedLabelLists"></trouble-label-list>
	</section>
	<section class="trouble-description">
		<p>{{describe}}</p>
		<user-show-photo class="flex user-show-photo" :photoLists="photoLists"></user-show-photo>
	</section>
	</div>
</section>	
</template>
<script>
export default{
	name:'trouble',
    data(){
  	  return {
        //所有的故障标签
  	  	allLabelLists:[],
        //被选中的故障标签
        selectedLabelLists:[],
        //图片列表
  	  	photoLists:[],
  	  	show:false,
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
      this.$store.dispatch('updateLabels',{
        serviceId:serviceId
      }).then((data)=>{
        if(!!data){
          this.allLabelLists=data;
        }
      });
      //获取image数据
      //pictureIds:图片的id列表
      let pictureIds=data.Picture;
      this.$store.dispatch('updateImages',{
        fileIds:data.Picture
      }).then((data)=>{
        if(!!data){
          this.photoLists=data;
        }
      });
      },0)
    },
    components:{
    	//故障标签列表
    	'trouble-label-list':{
    	   props:['allLabelLists','selectedLabelLists'],
           render:function(createElement){
             let allLen=this.allLabelLists.length;
             let selectedLen=this.selectedLabelLists.length;
             for(var i=0;i<allLen;i++){
                if(i<selectedLen){
                this.allLabelLists[i].className='label-item has-click';
                }else{
                  this.allLabelLists[i].className='label-item';
                }
              }
           	  if(this.allLabelLists){
           	  	 return createElement('ul',{
           	  	 },this.allLabelLists.map(function(item,index,arr){
                      return createElement('li',[createElement('a',{attrs:{'href':'javascript:;','role':'button','class':item.className}},item.labelName)]) 
           	  	  })
           	  	 )}
    	   }
    	},
        //用户上传图片显示列表
        'user-show-photo':{
           props:['photoLists'],
    	   render(createElement){
          if(!!this.photoLists){
    	   	  let photoLists=this.photoLists;
             return createElement('div',{
             	on:{
             	'!click':(e)=>{
                 let target=e.target;
                 if(target.nodeName.toLowerCase()=='img'){
                   let bigSizeImgSrc=target.getAttribute('data-src');
                   let src=target.src;
                   let fragment=document.createDocumentFragment();
                   let imgContent=document.createElement('div');
                   let clone=target.cloneNode(true);
                       clone.src=bigSizeImgSrc;
                    //ele：获取offset的元素
                   let getOffset=(ele)=>{
                       let child=ele.offsetParent;
                       let size=ele.getBoundingClientRect();
                      return size;
                    }
                    startState();
                    function startState(){
                      let size=getOffset(target);
                      let styleText=''
                      for(let i in size){
                      if(i in size){
                       styleText+=i+':'+size[i]+'px;';
                      }
                      clone.style.cssText=styleText+'opacity:0;position:fixed;z-index:1;background-color:#fff;width:100%;height:100%';
                   } 
                    let bg=document.createElement('div');
                    imgContent.className='loading';
                    imgContent.appendChild(clone);
                    imgContent.appendChild(bg);
                    fragment.appendChild(imgContent);
                    bg.className='img-bg';
                    bg.style.cssText='position:fixed;background-color:#000;opacity:0.5;left:0;top:0;left:0;width:100%;height:100%';
                    clone.onload=function(){
                      document.body.appendChild(fragment);
                      imgContent.classList.remove('loading')
                    }
                    bg.addEventListener('click',function(){
                      document.body.removeChild(imgContent);
                    },false)
                    setPos();
                    function setPos(){
                     setTimeout(function(){
                      clone.style.cssText+='width:70vw;height:70vw;left:50%;top:50%;opacity:1;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);'
                     },100);
                    }
                  }
                  this.$emit('showUserPhoto',src); 
                 }
             	 }
             	}
             },this.photoLists.map(item=>{
             	   if(!!photoLists.length){
             	   	return createElement('div',{attrs:{'class':'img'}},[createElement('img',{attrs:{'src':item.fileIconPath,'data-src':item.filePath}})])
             	   }
              }))
    	      }
           }
          }
        }
}
</script>
<style lang="scss">
    .flex{
	   flex-wrap:wrap;
	 -webkit-flex-wrap:wrap;
	  justify-content: start;
	  -webkit-justify-content: start;
    }
	h2{
		font-size: 1.06rem;
		color:#666;
	}
	.trouble-label-list{
		margin-top: 0.93rem;
		margin-bottom: 0.36rem;
		ul{
			li{
             text-align: center;
             margin-bottom: 1.07rem;
             flex:0 0 25%;
             -webkit-flex:0 0 25%;
             .label-item{
             	display: block;
             	border:1px solid;
              width:5.36rem;
              color:#ccc;
              font-size: 0.93rem;
              line-height:2rem;
              height:2rem;
              vertical-align: middle;
              border-radius: 1rem;
              -webkit-border-radius: 1rem;
              &.has-click{
                	color:#ea5412;
              }
             }
		    }
		}
		
	}
   .trouble-description{
   	p{
   		font-size: 1.07rem;
   	}
   }
   .user-show-photo{
   	margin-top: 1.43rem;
   	margin-bottom: 0.6rem;
   	.img{
   		height:5.36rem;
   		flex:0 0 25%;
   		-webkit-flex:0 0 25%;
   		margin-bottom: 1.07rem;
   		img{
   			width:5.36rem;
   			height:5.36rem;
        max-width: 100%;
        &.animateImg{
         position: absolute;
        /*  transition:all 0.5s; */
         width:50%;
         height:50%;
         left:50%;
         top:50%;
         transform:translate(-50%,-50%);
        }
   		}
   	}
   }
</style>
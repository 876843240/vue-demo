<template>
   <div class="dialog">
     <div class="dialog_bg"></div>
     <div class="dialog_content"><img :src="src" alt=""></div>
   </div>
</template>
<script>
export default{
  name:'dialog',
  props:{
    src:{
      type:String
    },
    ele:{
      type:Object
    }
  }
}
</script>
<style lang="scss">
  .dialog{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.6);
    .dialog_content{
      position: 
    }
  }
</style>

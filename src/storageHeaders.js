function getHeaders(to){
  let query=to.query;
  let deviceId=query.deviceId;
  let Authorization=query.Authorization;
  function setStorages(para){
    if(Object.prototype.toString.call(para)!='[object Object]'){
      console.error(para +'is not a Object,need a Object');
    }
    for(var i in para){
      if(para.hasOwnProperty(i)&&!!para[i]){
         window.localStorage.setItem(i,para[i]);
      }
    }
  }
  setStorages({'deviceId':deviceId,'Authorization':Authorization});
}
export default getHeaders

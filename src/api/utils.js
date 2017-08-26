const utils={
	//把一个数组序列化成字符串
	/*
    *arr:要拼接成字符串的数组
    *key:字符串的key
    *args:可选。包含当前的split：分割符，name:要拼接的name
	*/
	changeArrToString(arr,key,args){
      let split=args.split||'&';
      let name=args.name||'';
      if(!args){
      	return arr.join(split);
      }else{
      	let len=arr.length;
      	let paraArr=[];
      	for(var i=0;i<len;i++){
           paraArr.push(key+'='+arr[i][name]);
      	}
       console.log(paraArr);
      	return paraArr.join(split);
      }
	}
}
export default utils;
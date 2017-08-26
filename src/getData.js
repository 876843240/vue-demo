 const getData = {
   getOrderDetail(orderType, orderId, successFn, errorFn) {
   	 console.log(this);
     let headers = this.storageHandle().getStorages(['deviceId', 'Authorization']);
       this.axios({
         method: 'get',
         url: '/' + orderType + '/ServiceOrderDetail?orderId=' + orderId,
         headers: headers
       })
       .then(successFn())
       .catch(errorFn())
   }
 }

 export default getData

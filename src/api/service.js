import instance from './getInstance'
import utils from './utils';
const getData = {
  instance:instance(),
  //获取订单详情
  /*
   *orderType:订单类型,
   *orderId:服务id
   *cb:成功回调，
   *errCb:失败回调
   */
  getOrderDetail(orderType, orderId, cb, errCb) {
      this.instance({
        method: 'get',
        url: '/' + orderType + '/ServiceOrderDetail?orderId='+orderId
      })
      .then(cb)
      .catch(errCb);
  },
  //获取服务详情
  /*
   *serviceType:服务类型,
   *serviceId:服务id
   *cb:成功回调，
   *errCb:失败回调
   */
  getServiceDetail(serviceType, serviceId, cb, errCb) {
    this.instance({
        method: 'get',
        url: '/' + serviceType + '/ServiceDetail?serviceId=' + serviceId
      })
      .then(cb)
      .catch(errCb)
  },
  //获取标签接口
  /*
   *serviceId:服务id,
   *cb:成功回调，
   *errCb:失败回调
   */
  getLabels(serviceId, cb, errCb) {
    this.instance({
        method: 'get',
        url: '/ServiceLabels?serviceId=' + serviceId
      })
      .then(cb)
      .catch(errCb)
  },
  //获取图片接口
  /*
   *fildIds:文件id的一个key=value的字符串,
   *cb:成功回调，
   *errCb:失败回调
   */
  getImages(fileIds, cb, errCb) {
    let fileIdsStr=utils.changeArrToString(fileIds,'fileIds',{name:'picIcon'});
    this.instance({
        methods: 'get',
        url: '/getRemoteImages?type=0&' + fileIdsStr
      })
      .then(cb)
      .catch(errCb)
  },
  //获取政务信息
  /*
   *affairId:政务信息id
   */
   getAffairInfo(affairId,cb,errCb){
     this.instance({
        methods: 'get',
        url: '/GovernmentAffairs/' + affairId
      })
      .then(cb)
      .catch(errCb)
   }
}
export default getData

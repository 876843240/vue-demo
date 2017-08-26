import service from '../../api/service'
const orderDetailModule = {
  state: {
    //订单数据
    orderData: {},
    //控制状态数据
    orderStateData: {},
    //所需要的id
    idRef: {},
    //标签数组
    Labels: [],
    //图片数组
    images: []
  },
  mutations: {
    //更新订单数据
    updateOrder(state, { data }) {
      Object.assign(state.orderData, data);
    },
    //保存orderId
    updateOrderId(state, { orderId }) {
      state.idRef.orderId = orderId;
    },
    //更新订单cluster数据
    updateOrderState_cluster(state, { orderType }) {
      let cluster = '';
      switch (orderType) {
        case 'RepairClusters':
          cluster = 'repair';
          break;
        case 'CommonClusters':
          cluster = 'common';
          break;
        case 'WashClusters':
          cluster = 'wash';
          break;
        case 'NannyClusters':
          cluster = 'nanny';
          break;
      }
      state.orderStateData.cluster = cluster;
    },
    //插入当前的state状态。用来判断当前的类型
    //提交的参数为orderStatus
    /*订单状态,11：待付款 12：订单受理中 13：待服务 14：服务中 15：服务中_待付款 17：付款完成 19：退款审核中 39：订单关闭*/
    updateOrderState_state(state, { transfeStatus, orderStatus }) {
      state.orderStateData.transfeStatus = transfeStatus;
      state.orderStateData.orderStatus = orderStatus;
    },
    updateOrderState_id(state, { serviceId }) {
      state.idRef.serviceId = serviceId;
    },
    updateLabels(state, { labels }) {
      state.Labels = labels;
    },
    updateImages(state, { images }) {
      state.images = images;
    }
  },
  getters: {
    //获取orderId
    getId(state) {
      return state.idRef
    },
    //获取orderstatus
    getOrderStatus(state) {
      return state.orderStateData
    },
    getData(state) {
      return state.orderData
    },
    getLabels(state) {
      return state.Labels
    },
    getImages(state) {
      return state.images
    }
  },
  actions: {
    //obj.参数列表
    /*
     *orderType 订单类型
     *orderId   订单id
     */
    updateOrder({ commit }, args) {
      return new Promise(function(resolve, reject) {
        const orderType = args.orderType;
        commit('updateOrderState_cluster', { orderType });
        service.getOrderDetail(args.orderType, args.orderId,
          (response) => {
            if (response.status == 200) {
              let data = response.data;
              let transfeStatus = data.transfeStatus;
              let orderStatus = data.orderStatus;
              let serviceId = data.serviceId;
              //单独保存下两个用于判断的状态，方便进行判断
              //保存主状态
              commit('updateOrderState_state', { transfeStatus, orderStatus });
              //保存下transfeStatus,方便以后的子组件来判断不同的state
              commit('updateOrderState_id', { serviceId });
              commit('updateOrder', { data });
              resolve(data);
            }
          },
          (err) => {
            alert(err);
            reject();
          }
        )
      })
    },
    //提交标签
    /*
     *args.serviceId:服务id
     */
    updateLabels({ dispatch,commit }, args) {
       return new Promise(function(resolve, reject) {
        service.getLabels(args.serviceId,
          (response) => {
            if (response.status == 200) {
              const data = response.data;
              commit('updateLabels', { data })
              resolve(data);
            }
          },
          (err) => {
            console.log(err.response.data.message);
            reject()
          }
        )
       });
    },
    //提交图片
    /*
     *args.fildIds:要获取的图片的id数组,
     */
    updateImages({ commit }, args) {
      return new Promise(function(resolve, reject) {
        service.getImages(args.fileIds, (res) => {
          if (res.status == 200) {
            let data = res.data;
            commit('updateImages', { data });
            resolve(data);
          }
          }, (err) => {
          //alert(err.response.data.message);
          reject();
        })
      })
    }
  }
}
export default orderDetailModule;

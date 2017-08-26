import service from '../../api/service'
const affairDetailModule = {
  state:{
    //政务信息
    affairDetail: {}
  },
  mutations: {
    updateAffairDetail(state,{data}) {
      state.affairDetail = data;
    }
  },
  actions: {
    updateAffairDetail({commit },affairId) {
      return new Promise(function(resolve, reject) {
        service.getAffairInfo(affairId,
          (response) => {
            if (response.status == 200) {
              const data = response.data;
              commit('updateAffairDetail', { data })
              resolve(data);
            }
          },
          (err) => {
            console.log(err.response.data.message);
            reject()
          }
        )
      });
    }
  }
}
export default affairDetailModule;
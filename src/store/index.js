import Vue from 'vue'
import Vuex from 'vuex'
import orderDetailModule from './modules/orderdetail_module'
import affairDetailModule from './modules/affairdetail_module'
import getters from './getters'
Vue.use(Vuex)
const store=new Vuex.Store({
  getters,
  modules:{
  	orderDetailModule,
  	affairDetailModule
  }
})
export default store
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import common from './common'
import storageHeaders from './storageHeaders'
import store from './store'
Vue.use(common);
Vue.config.productionTip = true;
router.beforeEach((to,from,next)=>{
   storageHeaders(to);
   Vue.prototype.axios=axios
   next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});



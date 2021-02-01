import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//import axios and vue axios for routes of backend

import axios from 'axios';
import VueAxios from 'vue-axios';


Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);

//Adding base URL for our API
axios.defaults.baseURL = 'http://localhost:5000/api';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

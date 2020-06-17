import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from  './stores'

import axios from 'axios';

// const host = process.env.NODE_ENV === "development" ? "" : "http://39.97.33.178";
// const instance = axios.create({
//   baseURL: host
// })
// Vue.prototype.axios = instance;

Vue.prototype.axios = axios;

Vue.filter('setWH', (url, arg)=>{
  let urlArr = url.split('w.h');
  return urlArr[0]+arg+urlArr[1];
  // return url.replace(/w\.h/,arg);
});

import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading' , Loading);

Vue.config.productionTip = false

window.Vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

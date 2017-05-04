// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import vueToast from '../plugin/toast/'
import VueCookie from 'vue-cookie'
// Tell Vue to use the plugin
import axios from 'axios'

import '../my-theme/dist/iview.css';
import './assets/css/base.css'
import '../plugin/toast/index.css'

Vue.use(iView)
Vue.use(VueCookie)
Vue.use(vueToast)

Vue.config.productionTip = false

axios.interceptors.response.use(  //请求拦截
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Apps.$router.push('/login')
        break;
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

/* eslint-disable no-new */
var Apps = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



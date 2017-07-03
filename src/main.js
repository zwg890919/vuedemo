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

import '../my-theme/index.less'
import './assets/css/base.css'
import '../plugin/toast/index.css'

Vue.use(iView)
Vue.use(VueCookie)
Vue.use(vueToast)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  	// if(to.path !== "/login"){
    //   // console.log(document.cookie.sweeter_cookie)
  	// 	if(!document.cookie.sweeter_cookie){
  	// 		next("/login")
  	// 	}else{
  	// 		next()
  	// 	}
  	// }else{
  	// 	next()
  	// }
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

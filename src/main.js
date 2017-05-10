// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill" //解决IE浏览器promiss

import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import iView from 'iview'
import vueToast from '../plugin/toast/'
import jycTree from '../plugin/tree'
import VueCookie from 'vue-cookie'
import axios from 'axios'

import "@/assets/js/prototype"

import '../my-theme/dist/iview.css';
import '@/assets/css/base.css'
import '../plugin/toast/index.css'

Vue.use(iView)
Vue.use(VueCookie)
Vue.use(vueToast)
Vue.use(jycTree)

Vue.config.productionTip = false

axios.interceptors.response.use(  //请求拦截
    response => {
        if (response.data.success) {
            return response;
        } else {
            Apper.$totast.error({
			    title:"错误提示",
			    message:response.data.i18nMessage
			})
            return false
        }

    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push('/login')
                    break;
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

// 路由拦截实现缺省
router.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
        next()
    } else {
        next("/app")
    }
})

/* eslint-disable no-new */
const Apper = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

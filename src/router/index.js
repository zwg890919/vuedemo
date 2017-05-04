import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/fix',
      name: 'fix',
      component: Home
    }
  ]
})

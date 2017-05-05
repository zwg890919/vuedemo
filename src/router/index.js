import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import System from '@/views/system'
import Login from '@/views/login/login'

const authUser = resolve => require(['../views/system/auth/user.vue'], resolve)

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
      component: Home,
    }, {
      path: '/fix',
      name: 'fix',
      component: System,
      children: [{
        path: '',
        redirect: 'auth',
      }, {
        path: 'auth',
        component: {
          template: "<keep-alive><router-view></router-view></keep-alive>",
        },
        children: [{
          path: '',
          redirect: 'user',
        }, {
          path: 'user',
          component: authUser
        }, {
          path: 'userpck',
          component: authUser
        }, {
          path: 'menu',
          component: authUser
        } ,{
          path: 'tenant',
          component: authUser
        }]
      }]
    }
  ]
})

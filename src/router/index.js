import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import System from '@/views/system'
import Login from '@/views/login/login'

const authUser = resolve => require(['../views/system/auth/user.vue'], resolve)
const authMenu = resolve => require(['../views/system/auth/menu/menu.vue'], resolve)

const tableStatic = resolve => require(['../views/example/table/tableStatic.vue'], resolve)
const dataTable = resolve => require(['../views/example/table/dataTable.vue'], resolve)

const slider = resolve => require(['../views/example/form/slider.vue'], resolve)
const elements = resolve => require(['../views/example/form/elements.vue'], resolve)


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
			path: '/app',
			name: 'app',
			component: Home,
			children: [{
				path: 'table',
				name: "app.table",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: 'tablestatic',
					name: "app.table.tablestatic",
					component: tableStatic
				}, {
					path: 'datatable',
					name: "app.table.datatable",
					component: dataTable
				}]
			}, {
				path: 'form',
				name: "app.form",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: 'slider',
					name: "app.form.slider",
					component: slider
				}, {
					path: 'elements',
					name: "app.form.elements",
					component: elements
				}]
			},{
                path:"ui",
                name:"app.ui",
                component:{
                    template: "<keep-alive><router-view></router-view></keep-alive>",
                },
                children:[{
                    path:"css",
                    name:"app.ui.css",
                    component:resolve => require(['../views/example/ui/css.vue'], resolve)
                }]
            }]
		}, {
			path: '/fix',
			name: 'fix',
			component: System,
			children: [{
				path: '',
				redirect: 'auth',
			}, {
				path: 'auth',
				name: "app.auth",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: '',
					redirect: 'user',
				}, {
					path: 'user',
					name: "fix.auth.user",
					component: authUser
				}, {
					path: 'userpck',
					name: "fix.auth.userpck",
					component: authUser
				}, {
					path: 'menu',
					name: "fix.auth.menu",
					component: authMenu
				}, {
					path: 'tenant',
					name: "fix.auth.tenant",
					component: authUser
				}]
			}]
		}
	]
})

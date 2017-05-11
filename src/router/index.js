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
const fileUpload = resolve => require(['../views/example/form/fileUpload.vue'], resolve)
const select = resolve => require(['../views/example/form/select.vue'], resolve)
const validation = resolve => require(['../views/example/form/validation.vue'], resolve)
const wizard = resolve => require(['../views/example/form/wizard.vue'], resolve)


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
				}, {
					path: 'fileupload',
					name: "app.form.fileupload",
					component: fileUpload
				}, {
					path: 'select',
					name: "app.form.select",
					component: select
				}, {
					path: 'validation',
					name: "app.form.validation",
					component: validation
				}, {
					path: 'wizard',
					name: "app.form.wizard",
					component: wizard
				}]
			}, {
				path: "ui",
				name: "app.ui",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: "css",
					name: "app.ui.css",
					component: resolve => require(['../views/example/ui/css.vue'], resolve)
				}, {
					path: "timeline",
					name: "app.ui.timeline",
					component: resolve => require(['../views/example/ui/timeline.vue'], resolve)
				}]
			}, {
				path: "tree",
				name: "app.tree",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: "navtree",
					name: "app.tree.navtree",
					component: resolve => require(['../views/example/tree/navtree.vue'], resolve)
				}]
			}, {
				path: "ui",
				name: "app.ui",
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: "css",
					name: "app.ui.css",
					component: resolve => require(['../views/example/ui/css.vue'], resolve)
				}, {
					path: "timeline",
					name: "app.ui.timeline",
					component: resolve => require(['../views/example/ui/timeline.vue'], resolve)
				}, {
					path: "buttons",
					name: "app.ui.buttons",
					component: resolve => require(['../views/example/ui/buttons.vue'], resolve)
				}, {
					path: "dialog",
					name: "app.ui.dialog",
					component: resolve => require(['../views/example/ui/dialog.vue'], resolve)
				}, {
					path: "toaster",
					name: "app.ui.toaster",
					component: resolve => require(['../views/example/ui/toaster.vue'], resolve)
				}, {
					path: "grids",
					name: "app.ui.grids",
					component: resolve => require(['../views/example/ui/grids.vue'], resolve)
				}, {
					path: "fonts",
					name: "app.ui.fonts",
					component: resolve => require(['../views/example/ui/fonts.vue'], resolve)
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
					component: resolve => require(['../views/system/auth/userpck/userpck.vue'], resolve)
				}, {
					path: 'menu',
					name: "fix.auth.menu",
					component: authMenu
				}, {
					path: 'tenant',
					name: "fix.auth.tenant",
					component: resolve => require(['../views/system/auth/tenant/tenant.vue'], resolve)
				}]
			}]
		}
	],
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			const position = {}
			if (to.hash) {
				position.selector = to.hash
			}
			if (to.matched.some(m => m.meta.scrollToTop)) {
				position.x = 0
				position.y = 0
			}
			return position
		}
	}
})

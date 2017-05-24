import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import System from '@/views/system'
import Login from '@/views/login/login'

const authUser = resolve => require(['../views/system/auth/user/user.vue'], resolve)
const authMenu = resolve => require(['../views/system/auth/menu/menu.vue'], resolve)

const tableStatic = resolve => require(['../views/example/table/tableStatic.vue'], resolve)
const dataTable = resolve => require(['../views/example/table/dataTable.vue'], resolve)

const slider = resolve => require(['../views/example/form/slider.vue'], resolve)
const elements = resolve => require(['../views/example/form/elements.vue'], resolve)
const fileUpload = resolve => require(['../views/example/form/fileUpload.vue'], resolve)
const select = resolve => require(['../views/example/form/select.vue'], resolve)
const validation = resolve => require(['../views/example/form/validation.vue'], resolve)
const wizard = resolve => require(['../views/example/form/wizard.vue'], resolve)
const editor = resolve => require(['../views/example/form/editor.vue'], resolve)
const imageCrop = resolve => require(['../views/example/form/imageCrop.vue'], resolve)

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
			component: Home,
			children: [
				{
					path: '/',
					name: 'app',
					component: require('../views/example/index.vue')
				},
				{
					path: 'table',
					name: "app.table",
					component: {
						template: "<keep-alive><router-view></router-view></keep-alive>",
					},
					children: [{
						path: 'tablestatic',
						name: "app.table.静态表格",
						component: tableStatic
					}, {
						path: 'datatable',
						name: "app.table.Datatable",
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
						name: "app.form.滑动拉杆",
						component: slider
					}, {
						path: 'elements',
						name: "app.form.表单元素",
						component: elements
					}, {
						path: 'fileupload',
						name: "app.form.文件上传",
						component: fileUpload
					}, {
						path: 'select',
						name: "app.form.选择下拉",
						component: select
					}, {
						path: 'validation',
						name: "app.form.表单验证",
						component: validation
					}, {
						path: 'wizard',
						name: "app.form.向导表单",
						component: wizard
					}, {
						path: 'editor',
						name: "app.form.文本编辑",
						component: editor
					}, {
						path: 'imageCrop',
						name: "app.form.头像裁剪",
						component: imageCrop
					}]
				}, {
					path: "tree",
					name: "app.tree",
					component: {
						template: "<keep-alive><router-view></router-view></keep-alive>",
					},
					children: [{
						path: "navtree",
						name: "app.tree.树型组件",
						component: resolve => require(['../views/example/tree/navtree.vue'], resolve)
					}]
				}, {
					path: "chart",
					name: "app.统计图表",
					component: resolve => require(['../views/example/chart/chart.vue'], resolve),
				}, {
					path: "calendar",
					name: "app.记事日历",
					component: resolve => require(['../views/example/calendar/calendar.vue'], resolve),
				}, {
					path: "ui",
					name: "app.ui",
					component: {
						template: "<keep-alive><router-view></router-view></keep-alive>",
					},
					children: [{
						path: "css",
						name: "app.ui.CSSBase3",
						component: resolve => require(['../views/example/ui/css.vue'], resolve)
					}, {
						path: "timeline",
						name: "app.ui.Timeline",
						component: resolve => require(['../views/example/ui/timeline.vue'], resolve)
					}, {
						path: "portlet",
						name: "app.ui.Portlet",
						component: resolve => require(['../views/example/ui/portlet.vue'], resolve)
					}, {
						path: "sortable",
						name: "app.ui.sortable",
						component: resolve => require(['../views/example/ui/sortable.vue'], resolve)
					}, {
						path: "buttons",
						name: "app.ui.Buttons",
						component: resolve => require(['../views/example/ui/buttons.vue'], resolve)
					}, {
						path: "dialog",
						name: "app.ui.Dialog",
						component: resolve => require(['../views/example/ui/dialog.vue'], resolve)
					}, {
						path: "toaster",
						name: "app.ui.Toaster",
						component: resolve => require(['../views/example/ui/toaster.vue'], resolve)
					}, {
						path: "grids",
						name: "app.ui.Grids",
						component: resolve => require(['../views/example/ui/grids.vue'], resolve)
					}, {
						path: "fonts",
						name: "app.ui.Fonts",
						component: resolve => require(['../views/example/ui/fonts.vue'], resolve)
					}, {
						path: "bootstrap",
						name: "app.ui.Bootstrap",
						component: resolve => require(['../views/example/ui/bootstrap.vue'], resolve)
					}]
				}]
		}, {
			path: '/fix',
			component: System,
			children: [{
				path: '',
				name: 'fix',
				redirect: 'auth',
			}, {
				path: 'auth',
				component: {
					template: "<keep-alive><router-view></router-view></keep-alive>",
				},
				children: [{
					path: '',
					name: "app.auth",
					redirect: 'user',
				}, {
					path: 'user',
					name: "fix.auth.用户管理",
					component: authUser
				}, {
					path: 'userpck',
					name: "fix.auth.权限分配",
					component: resolve => require(['../views/system/auth/userpck/userpck.vue'], resolve)
				}, {
					path: 'menu',
					name: "fix.auth.菜单管理",
					component: authMenu
				}, {
					path: 'tenant',
					name: "fix.auth.租户管理",
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

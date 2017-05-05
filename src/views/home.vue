<template>
	<div class="layout" :class="{'minLayout':container}">
		<layout-nav :asideIndent="asideIndent" :headerFixed="headerFixed" :asidefixed="Asidefixed"></layout-nav>
		<layout-aside :asideIndent="asideIndent" :headerFixed="headerFixed" :Asidefixed="Asidefixed"></layout-aside>
		<div class="layout-content" style="height:1500px;">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>
<script>
import layoutNav from "../components/nav.vue"
import layoutAside from "../components/aside.vue"
import { mapState } from 'vuex'
import api from "../api"

export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState({
			headerFixed: state => state.systemSetting.headerFixed,
			Asidefixed: state => state.systemSetting.Asidefixed,
			container: state => state.systemSetting.container,
			asideIndent: state => state.systemSetting.asideIndent,
		}),
	},
	components: {
		layoutNav,
		layoutAside
	},
	created() {
		this.getMenu()
	},
	methods: {
		async getMenu() {
			const data = await api.get(api.config.getMenu);
			var applist = [];
			data.datas.result.childrens.forEach(function (node, index) {
				if (node.id > 10019) {
					applist.push(node)
				}
			}, this);
			const currentApp = applist[0]
			var state = { applist, currentApp }
			this.$store.dispatch("getMenu", state)
		}
	}
}
</script>
<style lang="scss">
@import "../assets/css/layout.scss";
</style>


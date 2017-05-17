<template>
	<div class="layout" :class="{'minLayout':container}">
		<layout-nav :asideIndent="asideIndent" :headerFixed="headerFixed" :asidefixed="Asidefixed"></layout-nav>
		<layout-aside :asideIndent="asideIndent" :headerFixed="headerFixed" :Asidefixed="Asidefixed"></layout-aside>
		<div class="layout-content" :class="{'extend-content':asideIndent}">
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
		this.$store.dispatch("getMenu", state)
	}
}
</script>
<style lang="scss">
@import "../assets/css/layout.scss";
.jyc-wrap {
	// ivew样式覆盖
	.ivu-card{
		margin:20px;
		position:relative;
	}
    h2 {
        padding: 20px;
        color: #58666e;
        font-size: 24px;
        font-weight: normal;
        border-bottom: 1px solid #dee5e7;
        background: #f6f8f8;
    }
    .card-box{
    	padding:20px;
    }
    .line{
    	display: block;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 50%;
	    border: 1px dashed #eee;
    }
    .comp-box{
    	padding:0 50px;
    }
    h3{
    	padding-left:20px;
    	padding-top: 20px;
    	font-size:30px;
    }
    p{
        font-size:14px;
        padding-top:20px;
        padding-left:20px;
        padding-right: 20px;
    }
}
</style>


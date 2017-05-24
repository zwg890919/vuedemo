<template>
    <div class="layout" :class="{'minLayout':container}">
        <layout-nav :asideIndent="asideIndent" :headerFixed="true" :asidefixed="true"></layout-nav>
        <layout-aside :asideIndent="asideIndent" :headerFixed="true" :Asidefixed="true"></layout-aside>
        <div class="layout-content" :class="{'extend-content':asideIndent}">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<style scoped>
.layout-content {
    position: absolute;
    top:50px;
    bottom: 5px;
    left: 200px;
    right: 0px;
    overflow-y: auto;
}
.extend-content{
    left:60px;
}
</style>
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
    beforeRouteUpdate (to, from, next) {
        if(!from.name) return;
        if(this.hisRoute.length == 2){
            this.hisRoute.shift();
        }
        this.hisRoute.push({
            name:from.name,
            url:'3'
        });
        console.log(this.hisRoute)
        next();
    },
    computed: {
        ...mapState({
            container: state => state.systemSetting.container,
            asideIndent: state => state.systemSetting.asideIndent,
            hisRoute: state => state.systemSetting.hisRoute
        }),
    },
    components: {
        layoutNav,
        layoutAside
    },
    created() {
		this.$store.dispatch("getMenu")
	}
}
</script>

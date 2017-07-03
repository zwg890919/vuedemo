<template>
  <div class="layout" :class="{'minLayout':container}">
    <layout-nav   :asideIndent="asideIndent" :headerFixed="headerFixed"></layout-nav>
    <layout-aside :asideIndent="asideIndent" :Asidefixed="Asidefixed"></layout-aside>
    <div class="layout-content" style="height:1500px;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import layoutNav from "../components/nav.vue"
  import layoutAside from "../components/aside.vue"
  import { mapState } from 'vuex'

  export default{
    data(){
      return {

      }
    },
    computed:{
      ...mapState({
        headerFixed: state => state.systemSetting.headerFixed,
        Asidefixed: state => state.systemSetting.Asidefixed,
        container: state => state.systemSetting.container,
        asideIndent: state => state.systemSetting.asideIndent,
      }),
    },
    components:{
      layoutNav,
      layoutAside
    }
  }
</script>
<style lang="scss">
  @import "../assets/css/layout.scss";
</style>


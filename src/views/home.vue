<template>
  <div class="layout">
    <layout-nav></layout-nav>
    <layout-aside></layout-aside>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import layoutNav from "../components/nav.vue"
  import layoutAside from "../components/aside.vue"

  export default{
    data(){
      return {

      }
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


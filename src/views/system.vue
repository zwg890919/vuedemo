<template>
  <div class="layout" :class="{'minLayout':container}">
    <layout-nav   :asideIndent="asideIndent" :headerFixed="true" :asidefixed="true"></layout-nav>
    <layout-aside :asideIndent="asideIndent" :headerFixed="true" :Asidefixed="true"></layout-aside>
    <div class="layout-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<style scoped>
  .layout-content{
    position: absolute;
    top:50px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow-y: auto
  }
</style>
<script>
  import layoutNav from "../components/nav.vue"
  import layoutAside from "../components/aside.vue"
  import { mapState } from 'vuex'
  import api from "../api"

  export default{
    data(){
      return {

      }
    },
    computed:{
      ...mapState({
        container: state => state.systemSetting.container,
        asideIndent: state => state.systemSetting.asideIndent,
      }),
    },
    components:{
      layoutNav,
      layoutAside
    },
    created(){
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
        const currentApp = applist[1]
        var state = {applist,currentApp}
        this.$store.dispatch("getMenu",state)
      }
    }
  }
</script>

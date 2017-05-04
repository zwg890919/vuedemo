<template>
  <div class="layout-nav" :class="{'layout-fixed':headerFixed}">
    <div class="layout-nav__header" :class="{'layout-indent':asideIndent,'layout-fixed':asidefixed||headerFixed}">
      <a href="" class="navbar-brand">
        <Icon type="ionic"></Icon>
        <span v-show="!asideIndent">聚有财理财</span>
      </a>
    </div>
    <div class="layout-nav__con" :class="{'layout-indent':asideIndent}">
      <a class="nav-btn" @click="changeIndent">
        <Icon type="navicon"></Icon>
      </a>
      <a class="nav-btn">
        <Icon type="ios-person-outline"></Icon>
      </a>
      <div class="layout-nav-dropdown" :class="{active : dropdown}">
        <a @click="dropdown = !dropdown">
          应用
          <Icon type="arrow-down-b"></Icon>
        </a>
        <div class="dropdown-area" v-show="dropdown">
          <div @click="changeMenu(userapp)" v-for="userapp in applist">
            <p>{{userapp.name}}</p>
            <img :src="'../../static'+userapp.menuIconclass" width="100" height="100" alt="">
          </div>
        </div>
      </div>
      <div class="navbar-right">
        <a class="nav-btn">
          <Icon type="ios-bell-outline"></Icon>
        </a>
        <a class="nav-btn" @click="settingshow = !settingshow">
          <Icon type="ios-cog"></Icon>
        </a>
      </div>
    </div>
    <setting :settingshow="settingshow"></setting>
  </div>
</template>
<script>
import setting from "./setting"
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      dropdown: false,
      settingshow: false,
    }
  },
  props: ["asideIndent", 'headerFixed', 'asidefixed'],
  computed: {
    applist: v => v.$store.state.appMenu.applist
  },
  methods: {
    changeIndent() {
      this.$store.commit("changeSetting", 4)
    },
    // changeMenu(type){
    //   console.log(type)
    // },
    ...mapActions([
      'changeMenu' // 映射 this.increment() 为 this.$store.dispatch('increment')
    ]),
  },
  components: {
    setting
  }
}
</script>
<style lang="scss">
.navbar-right {
  float: right;
}
</style>

<template>
  <div class="layout-nav">
    <div class="layout-nav__header" :class="{'layout-indent':!asideShow}">
      <a href="" class="navbar-brand">
        <Icon type="ionic"></Icon>
        <span v-show="asideShow">聚有财理财</span>
      </a>
    </div>
    <div class="layout-nav__con" :class="{'layout-indent':!asideShow}">
      <a class="nav-btn" @click="asideIndent">
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
          <div>
            <p>实例演示</p>
            <img src="../assets/image/app_monitor.png" width="100" height="100"  alt="">
          </div>
          <div>
            <p>后台设置</p>
            <img src="../assets/image/app_setting.png" width="100" height="100"  alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  export default{
    data(){
      return {
        dropdown : false,
        asideShow : true
      }
    },
    methods:{
      asideIndent(){
        this.asideShow = !this.asideShow;
      }
    }
  }
</script>

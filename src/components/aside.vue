<template>
  <div class="layout-aside" :class="{'asideIndent':asideIndent,'layout-fixed':Asidefixed,'aside-fixed':!Asidefixed&&headerFixed}">
    <!--<p class="asideTitle"></p>-->
    <Menu theme="dark" :open-names="['1']" accordion width="200px" @on-select="changeRoute">
      <Menu-group :title="currentMenu.name">
        <Submenu v-for="item in currentMenu.childrens" :name="item.id" v-if="item.childrens[0].menuType==1">
          <template slot="title">
            <Icon type="ios-paper"></Icon>
            {{item.name}}
          </template>
          <Menu-item v-for="subitem in item.childrens" :name="subitem.id">{{subitem.name}}{{subitem.menuHref}}</Menu-item>
        </Submenu>
        <Menu-item v-for="item in currentMenu.childrens" :name="item.id" v-if="item.childrens[0].menuType>1">
            <Icon type="ios-paper"></Icon>
            {{item.name}}{{item.menuHref}}
        </Menu-item>
      </Menu-group>
    </Menu>
  </div>
</template>
<style lang="scss" scoped>
  .asideTitle{
    color: #5c798f;
    margin:15px 15px 10px;
  }
</style>
<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    currentMenu: v => v.$store.state.appMenu.currentApp
  },
  props: ['asideIndent', 'Asidefixed', 'headerFixed'],
  methods:{
    changeRoute(stt){
      console.log(stt)
    }
  }
}
</script>

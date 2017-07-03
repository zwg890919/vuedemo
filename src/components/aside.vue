<template>
  <div class="layout-aside" :class="{'asideIndent':asideIndent,'layout-fixed':Asidefixed}">
    <div style="width:100%;height:50px;background:#ff0000"></div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  export default{
    data(){
      return{

      }
    },
    props:['asideIndent','Asidefixed']
  }
</script>

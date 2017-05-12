<template>
    <div class="cell">
        <div class="scroll-cell">
            <!--<Tree :data="menuList" show-checkbox class="tree-wrap"></Tree>-->
        </div>
    </div>
</template>
<script>
export default {
    name:'userpck-tree',
    data(){
        return{

        }
    }
}
</script>

<style lang="scss" scoped>
.cell {
    display: table-cell;
    float: none;
    height: 100%;
    vertical-align: top;
    position: relative;
    background-color: #fff;
}

.scroll-cell {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
}
</style>

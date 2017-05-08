<template>
    <div class="gobal-menu">
        <div>
            <ul>
                <li class="row-row">
                    <!--<tree :treedata="treedata.childrens"></tree>-->
                    <div class="scroll-cell">
                        <jyc-tree v-if="false"
                            :treedata="treedata.childrens"
                            :showCheckbox="false"
                            @tree-dbclick="treedbclick"
                            @tree-click="treeClick"
                            @tree-close="treeClose"
                            @tree-extend="treeExtend"
                            @tree-check="treeCheck">
                        </jyc-tree>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button type="success">
                        <Icon type="plus" size="16px"></Icon>
                        新增菜单
                    </Button>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="row-row bg-white">
                    <menu-info :data="currentData"></menu-info>
                </li>
                <li class="menu-bottom ltr">
                    <Button type="success">
                        <Icon type="plus" size="16px"></Icon>
                        新增功能
                    </Button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import api from "@/api/"
import menuInfo from "@/views/system/auth/menu/menuinfo"
export default {
    data() {
        return {
            treedata:{},
            currentData:{}
        }
    },
    created() {
        this.getMenu()
    },
    methods: {
        async getMenu() {
            const data = await api.get(api.config.globalMenu)
            this.treedata = data.datas.result;
        },
        treedbclick(){
            console.log("双击")
        },
        treeClick(data){
            console.log(data)
        },
        treeClose(){
            console.log("删除")
        },
        treeExtend(){
            console.log("展开")
        },
        treeCheck(data){
            // console.log(data)
        }
    },
    components:{
        menuInfo
    }
}
</script>
<style lang="scss" scoped>
.gobal-menu {
    color: #58666e;
    background-color: #edf1f2;
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    div {
        display: table-cell;
        float: none;
        height: 100%;
        vertical-align: top;
        &:first-child {
            width: 360px;
            border-right: 1px solid #dee5e7;
        }
        ul {
            position: relative;
            display: table;
            width: 100%;
            height: 100%;
            min-height: 240px;
            border-spacing: 0;
            .row-row {
                display: table-row;
                height: 100%;
                background: #edf1f2;
                &.bg-white {
                    background: #fff;
                }
                .scroll-cell{
                    position: absolute;
                    top:0px;
                    left:0px;
                    right:0px;
                    bottom:0px;
                    overflow: auto
                }
            }
            .menu-bottom {
                border-top: 1px solid #dee5e7;
                padding: 15px;
                &.ltr {
                    background-color: #f6f8f8;
                }
            }
        }
    }
}
</style>

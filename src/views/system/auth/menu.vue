<template>
    <div class="gobal-menu">
        <div>
            <ul>
                <li class="row-row">
                    <tree :treedata="treedata.childrens"></tree>
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
                    12312313
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
import tree from "@/components/tree"

export default {
    data() {
        return {
            treedata:{}
        }
    },
    created() {
        this.getMenu()
    },
    methods: {
        async getMenu() {
            const data = await api.get(api.config.globalMenu)
            // console.log(data)
            this.treedata = data.datas.result;
        }
    },
    components:{
        tree
    }
}
</script>
<style lang="scss">
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

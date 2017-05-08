<template>
    <div class="gobal-menu">
        <div>
            <ul>
                <li class="row-row">
                    <div>
                        <div class="scroll-cell">
                            <jyc-tree :treedata="treedata.childrens" :showCheckbox="false" @tree-dbclick="treedbclick" @tree-click="treeClick" @tree-close="treeClose">
                            </jyc-tree>
                        </div>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button type="success" @click="addMenu = true">
                        <Icon type="plus" size="16px"></Icon>
                        新增菜单
                    </Button>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="row-row bg-white">
                    <div>
                        <div class="scroll-cell">
                            <menu-info :data="currentData"></menu-info>
                        </div>
                    </div>
                </li>
                <li class="menu-bottom ltr">
                    <Button type="success">
                        <Icon type="plus" size="16px"></Icon>
                        新增功能
                    </Button>
                </li>
            </ul>
        </div>
        <Modal title="新增菜单" v-model="addMenu" width="600">
            <div class="model-wrap">
                <Row :gutter="20">
                    <Col span="12">
                    <p>菜单名称</p>
                    <Input v-model="currentData.name" placeholder="请输入..."></Input>
                    <p>排序号</p>
                    <Input v-model="currentData.menuSerialNo" placeholder="请输入..."></Input>
                    <p>菜单类型</p>
                    <Select v-model="currentData.menuType">
                        <Option :value="1" >框架菜单</Option>
                        <Option :value="2" >页面菜单</Option>
                        <Option :value="3" >功能菜单</Option>
                    </Select>
                    </Col>
                    <Col span="12">
                    <p>父级菜单</p>
                    <Input v-model="currentData.menuParentName" placeholder="请输入..."></Input>
                    <p>菜单图标</p>
                    <Input v-model="currentData.menuIconclass" placeholder="请输入..."></Input>
                    <p>菜单路径</p>
                    <Input v-model="currentData.menuHref" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="24">
                    <p>关联功能{{currentData.type}}</p>
                    <Select v-model="currentData.type" filterable>
                        <Option value="不关联功能" key="">不关联功能</Option>
                        <Option v-for="item in itemList" :value="item.itemId">{{item.itemId}}**{{item.itemTab}} {{item.itemAllDesc}}</Option>
                    </Select>
                    </Col>
                </Row>
            </div>
        </Modal>

    </div>
</template>
<script>
import api from "@/api/"
import menuInfo from "@/views/system/auth/menu/menuinfo"
export default {
    data() {
        return {
            treedata: {},
            currentData: {},
            addMenu: false,
            itemList: {}
        }
    },
    created() {
        this.getMenu()
        this.getItemList()
    },
    methods: {
        async getMenu() {
            const data = await api.get(api.config.globalMenu)
            this.treedata = data.datas.result
        },
        async getItemList() {
            const data = await api.post(api.config.itemList)
            this.itemList = data.datas.result
        },
        treedbclick(data) {
            this.currentData = data
            console.log(this.currentData)
            this.addMenu = true
        },
        treeClick(data) {
            this.currentData ={};
            this.currentData.menuParentName = data.name
        },
        treeClose(data) {
            console.log(data)
        },
    },
    components: {
        menuInfo
    }
}
</script>
<style lang="scss" scoped>
.model-wrap {
    P {
        margin: 8px 0px 5px;
        color: #98a6ad;
    }
    .ivu-input {
        font-size: 16px;
    }
}

.gobal-menu {
    color: #58666e;
    background-color: #edf1f2;
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    &>div {
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
                width: 100%;
                height: 100%;
                background: #edf1f2;
                &.bg-white {
                    background: #fff;
                }
                &>div {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                .scroll-cell {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    right: 0px;
                    bottom: 0px;
                    overflow: hidden;
                    &:hover {
                        overflow-y: auto;
                    }
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

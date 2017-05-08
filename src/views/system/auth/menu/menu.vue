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
                    <Button type="success" @click="resetCurrentData">
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
                            <menu-info :data="itemList"></menu-info>
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
        <Modal title="新增菜单" v-model="addMenu" width="600" @on-ok="submitMenu">
            <div class="model-wrap">
                <Row :gutter="20">
                    <Col span="12">
                    <p>菜单名称</p>
                    <Input v-model="currentData.name" placeholder="请输入..."></Input>
                    <p>排序号</p>
                    <Input v-model="currentData.menuSerialNo" placeholder="请输入..."></Input>
                    <p>菜单类型</p>
                    <Select v-model="currentData.menuType">
                        <Option :value="1">框架菜单</Option>
                        <Option :value="2">页面菜单</Option>
                        <Option :value="3">功能菜单</Option>
                    </Select>
                    </Col>
                    <Col span="12">
                    <p>父级菜单</p>
                    <input type="hidden" v-model="currentData.menuParentId" />
                    <Input v-model="currentData.menuParentName" placeholder="请输入..."></Input>
                    <p>菜单图标</p>
                    <Input v-model="currentData.menuIconclass" placeholder="请输入..."></Input>
                    <p>菜单路径</p>
                    <Input v-model="currentData.menuHref" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="24">
                    <p>关联功能</p>
                    <Select v-model="currentData.menuItemId" filterable>
                        <Option value="不关联功能" key="">不关联功能</Option>
                        <Option v-for="item in itemList" :key="item.itemId" :value="item.itemId">{{item.itemTab}} {{item.itemAllDesc}}</Option>
                    </Select>
                    </Col>
                    <Col span="24">
                    <p>
                        <Checkbox v-model="currentData.menuVisibility">此菜单不用分配权限即任何成员可见</Checkbox>
                    </p>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Button type="text" @click="cancle">取消</Button>
                <Button type="primary" @click="submitMenu">提交</Button>
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
            itemList: {},
            modalType:"add"
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
            this.modalType = "edit"
            var _this = this
            this.eachNode(this.treedata, function (item) {
                if (item.id == data.parentId) {
                    _this.currentData.menuParentName = item.name;
                    _this.currentData.menuParentId = item.id
                }
            })
            this.addMenu = true
        },
        treeClick(data) {
            this.currentData = {};
            this.currentData.menuParentName = data.name
            this.currentData.menuParentId = data.id
        },
        treeClose(data) {
            this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除'删除用户组'，及下属所有的菜单?</p>",
                onOk: () => {
                    this.delMenu(data)
                },
            });
        },
        eachNode(data, callback) {
            var that = this
            callback(data)
            data.childrens.map(item => {
                that.eachNode(item, callback);
            })
        },
        resetCurrentData() {
            const parentName = this.currentData.name
            const parentId = this.currentData.id;
            this.currentData = {};
            this.currentData.menuParentName = parentName
            this.currentData.menuParentId = parentId
            this.addMenu = true
            this.modalType = "add"
        },
        submitMenu(){
            var param ={
                menuName : this.currentData.name,
                menuParentId : this.currentData.menuParentId,
                menuType : this.currentData.menuType,
                menuAuthLevel : this.currentData.menuAuthLevel,
                menuVisibility : this.currentData.menuVisibility,
                menuSerialNo : this.currentData.menuSerialNo,
                menuIconClass : this.currentData.menuIconclass,
                menuItemId : this.currentData.menuItemId,
                menuHref : this.currentData.menuHref
            }
            if(this.modalType =="edit"){
                param.menuId = this.currentData.id;
                this.updateMenu(param)
            }else{
                this.submitAddMenu(param)
            }
        },
        async submitAddMenu(param){
            const data = await api.post(api.config.authMenu,param)
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"提交成功"
                })
                this.addMenu = false
            }
        },
        async updateMenu(param){
            const data = await api.put(api.config.authMenu,param)
            if(data){
                this.$totast.success({
                    title:"系统提示",
                    message:"提交成功"
                })
                this.addMenu = false
            }
        },
        async delMenu(data){
            const param = {
                menuId : data.id
            };
            const resdata = await api.delete(api.config.authMenu,param)
            this.$totast.success({
                title:"系统提示",
                message:"删除成功"
            })
        },
        cancle(){
            this.addMenu = false;
        }
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

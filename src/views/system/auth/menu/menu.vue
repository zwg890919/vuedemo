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
                    <Tooltip placement="top" class="tips">
                        <Icon type="help" size="20px"></Icon>
                        <div slot="content">
                            <p>双击编</p>
                            <p>辑菜单</p>
                        </div>
                    </Tooltip>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="row-row bg-white">
                    <div>
                        <menu-info v-on:resetItemlist="getItemList" v-on:closeMenuModal="closeMenuModal" :modalOpen="functionType" :itemdata="itemList" :selectItem="selectData"></menu-info>
                    </div>
                </li>
                <li class="menu-bottom ltr">
                    <Button type="success" @click="addFunction">
                        <Icon type="plus" size="16px"></Icon>
                        新增功能
                    </Button>
                    <Tooltip placement="top" class="tips">
                        <Icon type="help" size="20px"></Icon>
                        <div slot="content">
                            <p>双击编</p>
                            <p>辑功能</p>
                        </div>
                    </Tooltip>
                </li>
            </ul>
        </div>
        <Modal :title="modalType == 'add'? '新建菜单' : '修改菜单'" v-model="addMenu" width="600" @on-ok="submitMenu" @on-cancel="cancel" :mask-closable="false">
            <div class="model-wrap">
                <Form ref="currentData" label-position="top" :model="currentData" :rules="ruleCustom">
                    <Row :gutter="20">
                        <Col span="12">
                        <Form-item label="菜单名称" prop="name">
                            <Input v-model="currentData.name" placeholder="请输入..."></Input>
                        </Form-item>
                        <Form-item label="排序号" prop="menuSerialNo">
                            <Input v-model="currentData.menuSerialNo" placeholder="请输入..."></Input>
                        </Form-item>
                        <Form-item label="菜单类型" prop="menuType">
                            <Select v-model="currentData.menuType">
                                <Option :value="1">显示菜单</Option>
                                <Option :value="2">隐藏菜单</Option>
                                <Option :value="3">功能按钮</Option>
                            </Select>
                        </Form-item>
                        </Col>
                        <Col span="12">
                        <Form-item label="父级菜单" prop="menuParentName">
                            <input type="hidden" v-model="currentData.menuParentId" />
                            <Input v-if="modalType == 'add'" v-model="currentData.menuParentName" placeholder="请输入..."></Input>
                            <Select v-if="modalType != 'add'" v-model="currentData.menuParentId" filterable>
                                <Option v-for="item in menus" :value="item.value" :key="item">{{ item.label }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="菜单图标" prop="menuIconclass">
                            <Input type="text" v-model="currentData.menuIconclass" number></Input>
                        </Form-item>
                        <Form-item label="菜单路径" prop="menuHref">
                            <Input type="text" v-model="currentData.menuHref" number></Input>
                        </Form-item>
                        </Col>
                        <Col span="24">
                        <Form-item label="相关按钮code" prop="menuCode">
                            <Input type="text" v-model="currentData.menuCode"></Input>
                        </Form-item>
                        </Col>
                        <Col span="24">
                        <Form-item label="关联功能" prop="menuItemId">
                            <Select v-model="currentData.menuItemId" filterable>
                                <Option value="2" key="">不关联功能</Option>
                                <Option v-for="item in itemList" :key="item.itemId" :value="item.itemId">{{item.itemTab}} {{item.itemAllDesc}}</Option>
                            </Select>
                        </Form-item>
                        </Col>
                        <Col span="24">
                        <Checkbox v-model="currentData.menuVisibility">此菜单不用分配权限即任何成员可见</Checkbox>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" @click="cancel">取消</Button>
                <Button type="primary" @click="submitMenu('currentData')">提交</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/"
import menuInfo from "@/views/system/auth/menu/menuinfo"
import { eachAllChild } from '@/assets/js/common'
export default {
    data() {
        const validateMenuItemId = (rule, value, callback) => {
            if (this.currentData.menuType === 3) {
                if (!value || value === 2) {
                    callback(new Error('功能按钮必须关联功能'));
                } else {
                    callback()
                }
            } else {
                callback()
            }
        };
        const validateMenuType = (rule, value, callback) => {
            if (value === 3) {
                if (this.currentData.menuItemId) {
                    this.$refs.currentData.validateField('menuItemId');
                }
            } else {
                this.$refs.currentData.validateField('menuItemId');
            }
            callback();
        }
        return {
            treedata: {},
            currentData: {
                name: '',
                menuSerialNo: '',
                menuType: '1',
                menuParentName: '',
                menuIconclass: '',
                menuHref: '',
                menuCode: '',
                menuItemId: '',
                menuVisibility: ''
            },
            selectData: {},
            addMenu: false,
            itemList: {},
            modalType: "add",
            functionType: false,
            ruleCustom: {
                name: [
                    { required: true, message: '菜单名称不能为空', trigger: 'blur' }
                ],
                menuType: [
                    { validator: validateMenuType, trigger: 'change' }
                ],
                menuItemId: [
                    { validator: validateMenuItemId, trigger: 'change' }
                ]
            },
            menus: []
        }
    },
    created() {
        this.getMenu()
        this.getItemList()
    },
    methods: {
        addFunction() {
            this.functionType = true;
        },
        closeMenuModal() {
            this.functionType = false
        },
        async getMenu() {
            const data = await api.get(api.config.globalMenu)
            this.treedata = data.datas.result
            eachAllChild(this.treedata, item => {
                this.menus.push({
                    label: item.name,
                    value: item.id
                })
            })
        },
        async getItemList() {
            const data = await api.post(api.config.itemList)
            this.itemList = data.datas.result
        },
        // remoteMethod(query) {
        //     this.currentData.menuParentName = ""
        //     if (query) {
        //         const list = []
        //         eachAllChild(this.treedata, item => {
        //             list.push({
        //                 label: item.name,
        //                 value: item.id
        //             })
        //         })
        //         this.menus = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
        //     } else {
        //         this.menus = []
        //     }
        // },
        treedbclick(data) {
            Object.assign(this.currentData, data)
            this.modalType = "edit"
            var _this = this
            this.eachNode(this.treedata, function (item) {
                if (item.id == data.parentId) {
                    Object.assign(_this.currentData, {
                        menuParentName: item.name,
                        menuParentId: item.id
                    })
                }
            })
            this.addMenu = true
        },
        treeClick(data) {
            this.currentData = {};
            this.selectData = data;
            window.location.hash = "#" + data.menuItemId
        },
        treeClose(data) {
            this.$Modal.confirm({
                title: '操作确认',
                content: `<p>您确定要删除${data.name}，及下属所有的菜单?</p>`,
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
            this.$refs['currentData'].resetFields();
            Object.assign(this.currentData, {
                menuParentName: this.selectData.name,
                menuParentId: this.selectData.id
            })
            this.addMenu = true
            this.modalType = "add"
        },
        submitMenu(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var param = {
                        menuName: this.currentData.name,
                        menuParentId: this.currentData.menuParentId,
                        menuType: this.currentData.menuType,
                        menuAuthLevel: this.currentData.menuAuthLevel,
                        menuVisibility: this.currentData.menuVisibility,
                        menuSerialNo: this.currentData.menuSerialNo,
                        menuIconclass: this.currentData.menuIconclass,
                        menuItemId: this.currentData.menuItemId,
                        menuHref: this.currentData.menuHref
                    }
                    if (this.modalType == "edit") {
                        param.menuId = this.currentData.id;
                        // console.log(param)
                        this.updateMenu(param)
                    } else {
                        this.submitAddMenu(param)
                    }
                }
            })

        },
        async submitAddMenu(param) {
            const data = await api.post(api.config.authMenu, param)
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: data.i18nMessage
                })
                this.getMenu()
                this.addMenu = false
            }
        },
        async updateMenu(param) {
            const data = await api.put(api.config.authMenu, param)
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: data.i18nMessage
                })
                this.getMenu()
                this.addMenu = false
            }
        },
        async delMenu(data) {
            const param = {
                menuId: data.id
            };
            const resdata = await api.delete(api.config.authMenu, param)
            if (resdata) {
                this.getMenu()
            }
        },
        cancel() {
            this.$refs['currentData'].resetFields();
            this.addMenu = false;
        },
        selectMenuParent(item) {
            this.currentData.menuParentId = item
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
                .search-item {
                    padding: 5px;
                    height: 40px;
                    border-bottom: #dee5e7 1px solid;
                    background: #f6f8f8;
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
                .tips {
                    float: right;
                    margin-top: 10px;
                    margin-right: 30px;
                }
            }
        }
    }
}
</style>

<template>
    <div class="gobal-menu">
        <div>
            <ul>
                <li class="row-row">
                    <div @click="addOrg = true">
                        <div class="scroll-cell">
                            <jyc-tree
                                :data="treedata"
                                :options="treeOptions"
                                @node-click="selectOrg"
                                @node-delete="treeClose">
                            </jyc-tree>
                            <!--<jyc-tree
                                :data="treedata"
                                :options="treeOptions"
                                :selectNode="selectData"
                                @node-click="treeClick"
                                @tree-dbclick="treedbclick"
                                @node-delete="treeClose"
                            >
                            </jyc-tree>-->
                        </div>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button v-show="addOrg" type="success" @click="changAddState">
                        <Icon type="plus" size="16px"></Icon>
                        新增部门
                    </Button>
                    <div v-show="!addOrg">
                        <Input v-model="addDept.orgName" placeholder="请输入..." style="width: 260px"></Input>
                        <Button type="primary" @click="submitDept">提交</Button>
                    </div>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="row-row">
                    <div>
                        <div class="search-item">
                            <span>
                                <Icon type="ios-search-strong" size="22" style=""></Icon>
                            </span>
                            <input type="text" placeholder="输入关键字查询" v-model="userFilter">
                        </div>
                        <div class="l-list">
                            <a v-for="user in filtrate(userList)" @click="userClick(user)" v-show="(user.userOrgId == currentOrg.id || showAll) && !user.userIsdel" :class="{select: currentUser.userId== user.userId,userClose: !user.userStatus}">
                                {{user.userName}}
                                <em style="color:#98a6ad">({{user.userCode}})</em>
                            </a>
                        </div>
                    </div>
                </li>
                <li class="menu-bottom">
                    <Button type="success" @click="addUser">
                        <Icon type="plus" size="16px"></Icon>
                        新增联系人
                    </Button>
                </li>
            </ul>
        </div>
        <div>
            <user-info :userdata="currentUser" :state="editStatus" :deptlist="deptList" @changstate="editUser" @changUserstate="changUser" @editDone="editDone" @delDone="getUserList" @cancle="cancleStatus"></user-info>
        </div>
    </div>
</template>
<script>
import api from "@/api/"
import userInfo from "@/views/system/auth/user/userinfo"
import {transformTree} from '@/assets/js/common'
export default {
    data() {
        return {
            treedata: [],
            deptList: [],
            addOrg: true,
            addDept: {
                orgId: '',
                orgName: '',
            },
            showAll: true,
            currentOrg: {},
            userList: [],
            userFilter: '',
            currentUser: {},
            editStatus: 1, //1为展示 2为新增 3为编辑
            treeOptions:{
                showCheckbox : false,
                selected : true,
                showIcon : true,
                halfCheckedStatus:false
            }
        }
    },
    created() {
        this.getOrg();
        this.getUserList();
    },
    methods: {
        async getOrg() {  //获取公司组织结构
            let arr = new Array();
            const data = await api.get(api.config.orgTree)
            if (data) {
                arr[0] = data.datas.result
                arr[0].level = 1;
                for (let x of arr[0].childrens) {
                    x.level = 2;
                    for (let y of x.childrens) {
                        y.level = 3;
                    }
                }
                this.getDeptList(arr[0].childrens)
                this.treedata = transformTree(arr)
                // this.treedata = arr;
            }
        },
        getDeptList(data) { //编译为tree适合的数据格式
            for (let x of data) {
                this.deptList.push({
                    label: x.name,
                    value: x.id
                })
                for (let y of x.childrens) {
                    this.deptList.push({
                        label: y.name,
                        value: y.id
                    })
                }
            }
        },
        async editDone(user) {
            this.currentUser = user
            var userList = [];
            for (let item of this.userList) {
                if (item.userId != this.currentUser.userId) {
                    userList.push(item)
                } else {
                    userList.push(user)
                }
            }
            this.userList = userList
        },
        async submitDept() {  // 新增部门提交
            if (this.addDept.orgId == '') {
                this.$totast.warning({
                    title: "操作提示",
                    message: "请先选择一个父级部门"
                })
            } else if (this.addDept.orgName == '') {
                this.$totast.warning({
                    title: "操作提示",
                    message: "请先输入组织名称，后提交"
                })
            } else {
                const data = await api.post(api.config.orgBattch, this.addDept);
                if (data) {
                    this.$totast.success({
                        title: "系统提示",
                        message: data.i18nMessage
                    });
                    this.changAddState()
                    this.getMenu()
                }
            }
        },
        changAddState() { //变更添加组织状态
            this.addOrg = !this.addOrg
            this.addDept.orgName = ""
        },
        selectOrg(data) { //选择查看部门员工
            // 新增部门上级id
            this.addDept.orgId = data.id;
            // 浙江聚有财金融服务外包有限公司
            if (data.id == 2) {
                this.showAll = true;
                return;
            } else {
                this.showAll = false;
            }
            this.currentOrg = data
            for (let item of this.userList) {
                if (item.userOrgId == this.currentOrg.id) {
                    this.currentUser = item;
                    return;
                }
            }
        },
        async getUserList() {
            const data = await api.post(api.config.userList)
            if (data) {
                this.userList = data.datas.result;
                this.currentUser = this.userList[0];
            }
        },
        filtrate(itemlist) {
            var CurrentArray = [];
            if (itemlist.length > 0 && this.userFilter != "") {
                var searchRegex = new RegExp(this.userFilter, 'i');
                for (var item of itemlist) {
                    if (searchRegex.test(item.userCode) || searchRegex.test(item.userName)) {
                        CurrentArray.push(item)
                    }
                }
                return CurrentArray
            } else {
                return itemlist
            }
        },
        userClick(user) { // 点击用户列表
            this.currentUser = user;
            this.editStatus = 1;
        },
        addUser() {
            this.editStatus = 2
        },
        editUser() {
            this.editStatus = 3
        },
        cancleStatus() {
            this.editStatus = 1
        },
        changUser(status) {
            this.currentUser.userStatus = status;
        },
        treeClose(data) {
            this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除" + data.name + "，及下属所有的用户?</p>",
                onOk: () => {
                    this.delMenu(data)
                },
            });
        },
        // 删除部门
        async delMenu(obj) {
            const param = {
                userDel: true,
                orgId: obj.id
            };
            const data = await api.delete(api.config.authOrg, param);
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: "操作成功"
                });
            }
            this.getMenu();
        },
    },
    components: {
        userInfo
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
        &:nth-child(2) {
            border-right: 1px solid #dee5e7;
            width: 200px;
            background: #f6f8f8;
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
            }
        }
    }
}

.search-item {
    display: table;
    width: 100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: #f6f8f8;
    span {
        display: table-cell;
        vertical-align: middle;
        padding: 0px 10px;
        width: 40px;
    }
    input {
        display: table-cell;
        height: 30px;
        padding: 5px 10px;
        float: left;
        font-size: 12px;
        line-height: 1.5;
        width: 100%;
        background: none;
        border: none
    }
}

.l-list {
    overflow: scroll;
    position: absolute;
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    a {
        display: inline-block;
        width: 100%;
        padding: 15px;
        color: #555;
        font-size: 16px;
        border-bottom: 1px solid #e7ecee;
        &.userClose {
            color: #98a6ad
        }
    }
    a.select {
        background: #dbeef9;
    }
}
</style>

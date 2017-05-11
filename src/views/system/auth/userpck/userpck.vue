<template>
    <div class="userpck-wrap">
        <div class="cell">
            <div class="search-item">
                <span>
                    <Icon type="ios-search-strong" size="22" style=""></Icon>
                </span>
                <input type="text" placeholder="输入关键字查询" v-model="userFilter">
            </div>
            <div class="userlist">
                <div class="userlist-wrap">
                    <p v-for="item in userFilte(userList)" @click="selectUser(item)" :class="{'active':currentUser.userId == item.userId}">
                        {{item.userName}}
                        <em>({{item.userCode}})</em>
                        <Tooltip content="平台管理员" class="fr" placement="left" v-if="item.userRole==1">
                            <Icon type="flag" size="18" color="#f05050"></Icon>
                        </Tooltip>
                        <Tooltip content="管理员" class="fr" placement="left" v-if="item.userRole==2">
                            <Icon type="flag" size="18" color="#f05050"></Icon>
                        </Tooltip>
                        <Tooltip content="操作员" class="fr" placement="left" v-if="item.userRole==3">
                            <Icon type="flag" size="18" color="#f05050"></Icon>
                        </Tooltip>
                    </p>
                </div>
            </div>
        </div>
        <div class="cell">
            <div class="search-item">
                <span>
                    <Icon type="ios-search-strong" size="22" style=""></Icon>
                </span>
                <input type="text" placeholder="输入关键字查询" v-model="groupFilter">
            </div>
            <div class="grouplist">
                <div class="grouplist-wrap">
                    <p v-for="item in itempckFilte(itempackList)" :class="{'active':currentUser.userRole == item.pckId}" @click="selectGroup(item)">
                        {{item.pckName}}
                    </p>
                </div>
            </div>
            <div class="menu-bottom ltr">
                <Input v-model="pckName" v-focus="addPck" placeholder="请输入..." v-show="!addPck" @on-blur="pckNameAdd"></Input>
                <Button type="success" @click="addPck = false" v-show="addPck">
                    <Icon type="plus" size="16px"></Icon>
                    新增用户组
                </Button>
            </div>
        </div>
        <div class="cell">
            <div class="scroll-cell">
                <Tree :data="menuList" show-checkbox></Tree>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api"
import common from "@/assets/js/common.js"
export default {
    data() {
        return {
            pckName: "",
            addPck: true,
            userFilter: "",
            groupFilter: "",
            userList: [],
            currentUser: {},
            itempackList: [],
            menuList: [{
                expand: true,
                title: 'parent 1',
                children: [{
                    title: 'parent 1-0',
                    expand: true,
                    disabled: true,
                    children: [{
                        title: 'leaf',
                        disableCheckbox: true
                    }, {
                        title: 'leaf',
                    }]
                }, {
                    title: 'parent 1-1',
                    expand: true,
                    checked: true,
                    children: [{
                        title: '<span style="color: red">leaf</span>',
                    }]
                }]
            }]
        }
    },
    created() {
        this.getUserList()
        this.getItempckList()
        this.getMenuList()
    },
    directives: {
        focus: {
            update(el, binding, vnode, oldVnode) {
                var elinput = el.getElementsByTagName("input")
                if (!binding.value) {
                    setTimeout(() => {
                        elinput[0].focus()
                    }, 100);
                    elinput[0].value = ""
                }
            }
        }
    },
    methods: {
        selectGroup(item) {
            this.currentUser = {}
            this.currentUser.userRole = item.pckId
        },
        async getUserList() {
            const data = await api.post(api.config.userList)
            this.userList = data.datas.result
        },
        async getItempckList() {
            const data = await api.post(api.config.itempckList)
            this.itempackList = data.datas.result
            // console.log(data)
        },
        async pckNameAdd() {
            const data = await api.post(api.config.authItempck, {
                pckName: this.pckName
            })
            this.addPck = true
        },
        async getMenuList() {
            const data = await api.get(api.config.menuTeant)
            const menuData = [data.datas.result]
            // this.menuList = common.convertTreedata(menuData)
            console.log(this.menuList)
        },
        userFilte(userlist) {
            var filterList = []
            if (!this.userFilter) {
                return userlist
            }
            var searchRegex = new RegExp(this.userFilter, 'i');
            userlist.map(item => {
                if (item.userCode.indexOf(this.userFilter) >= 0) {
                    filterList.push(item)
                }
                if (searchRegex.test(item.userName)) {
                    filterList.push(item)
                }
            })
            return filterList
        },
        itempckFilte(groupList) {
            var filterList = []
            return groupList
            // var searchRegex = new RegExp(this.groupFilter, 'i');
            // userlist.map(item => {
            //     if(searchRegex.test(item.userName)){
            //         filterList.push(item)
            //     }
            // })
            // return filterList
        },
        selectUser(item) {
            this.currentUser = item
        }
    }
}
</script>
<style lang="scss" scoped>
.userpck-wrap {
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    background-color: #edf1f2;
    .cell {
        display: table-cell;
        float: none;
        height: 100%;
        vertical-align: top;
        position: relative;
        &:nth-child(1),
        &:nth-child(2) {
            width: 240px;
        }
        &:nth-child(2) {
            background-color: #f6f8f8;
        }
        &:nth-child(3) {
            background-color: #fff;
        }
    }
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

.search-item {
    display: table;
    width: 100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: transparent;
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

.menu-bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #dee5e7;
    padding: 10px;
    text-align: center;
}

.grouplist,
.userlist {
    position: absolute;
    top: 40px;
    bottom: 60px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    &-wrap {
        width: 258px;
        height: 100%;
        overflow-y: auto;
        p {
            padding: 15px;
            font-size: 16px;
            cursor: pointer;
            border-bottom: 1px solid #e7ecee;
            &.active {
                background: #c5e4f5;
            }
            em {
                color: #98a6ad;
            }
        }
    }
}

.userlist {
    bottom: 0px;
}
</style>

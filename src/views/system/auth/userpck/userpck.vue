<template>
    <div class="userpck-wrap">
        <userpck-user></userpck-user>
        <userpck-group></userpck-group>
        <userpck-tree></userpck-tree>
    </div>
</template>
<script>

import userpckUser from "./userpck-user.vue"
import userpckGroup from "./userpck-group.vue"
import userpckTree from "./userpck-tree.vue"

export default{
    name:'userpcl',
    data(){
        return {
        }
    },
    components:{
        userpckUser,
        userpckGroup,
        userpckTree
    }
}
// import userpckGroup from "./userpck-group.vue"
// import userpckTree from "./userpck-tree.vue"
// export default {
//     data() {
//         return {
//             pckName: "",
//             addPck: true,
//             userFilter: "",
//             groupFilter: "",
//             userList: [],
//             currentUser: {},
//             itempackList: [],
//             currentItempck: [],
//             menuList: [],
//             menuData:[]
//         }
//     },
//     components:{
//         userpckUser,
//         // userpckGroup,
//         // userpckTree
//     },
//     created() {
//         this.getUserList()
//         this.getItempckList()
//         this.getMenuList()
//     },
//     directives: {
//         focus: {
//             update(el, binding, vnode, oldVnode) {
//                 var elinput = el.getElementsByTagName("input")
//                 if (!binding.value) {
//                     setTimeout(() => {
//                         elinput[0].focus()
//                     }, 100);
//                     elinput[0].value = ""
//                 }
//             }
//         }
//     },
//     methods: {
//         selectGroup(item) {
//             this.currentUser = {}
//             this.currentUser.userRole = item.pckId
//             this.itempackList.map(xitem => {
//                 if(xitem.pckId == this.currentUser.userRole){
//                     this.currentItempck = xitem.pckMenuId.split(",")
//                 }
//             })
//             this.menuList = common.convertTreedata(this.menuData,this.currentItempck)
//         },
//         async getUserList() {
//             const data = await api.post(api.config.userList)
//             this.userList = data.datas.result
//         },
//         async getItempckList() {
//             const data = await api.post(api.config.itempckList)
//             this.itempackList = data.datas.result
//             // this.currentItempck = this.itempackList[0]
//             // console.log(data)
//         },
//         async pckNameAdd() {
//             const data = await api.post(api.config.authItempck, {
//                 pckName: this.pckName
//             })
//             this.addPck = true
//         },
//         async getMenuList() {
//             const data = await api.get(api.config.menuTeant)
//             this.menuData = [data.datas.result]
//             this.menuList = common.convertTreedata(this.menuData,this.currentItempck)
//             // console.log(this.menuList)
//         },
//         userFilte(userlist) {
//             var filterList = []
//             if (!this.userFilter) {
//                 return userlist
//             }
//             var searchRegex = new RegExp(this.userFilter, 'i');
//             userlist.map(item => {
//                 if (item.userCode.indexOf(this.userFilter) >= 0) {
//                     filterList.push(item)
//                 }
//                 if (searchRegex.test(item.userName)) {
//                     filterList.push(item)
//                 }
//             })
//             return filterList
//         },
//         itempckFilte(groupList) {
//             var filterList = []
//             return groupList
//             // var searchRegex = new RegExp(this.groupFilter, 'i');
//             // userlist.map(item => {
//             //     if(searchRegex.test(item.userName)){
//             //         filterList.push(item)
//             //     }
//             // })
//             // return filterList
//         },
//         selectUser(item) {
//             this.currentUser = item
//             this.itempackList.map(xitem => {
//                 if(xitem.pckId == this.currentUser.userRole){
//                     console.log(xitem)
//                     this.currentItempck = xitem.pckMenuId.split(",")
//                 }
//             })
//             this.menuList = common.convertTreedata(this.menuData,this.currentItempck)
//         }
//     }
// }
</script>
<style lang="scss" scoped>
.userpck-wrap {
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    background-color: #edf1f2;
}
</style>
<style lang="scss">
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

.tree-wrap {
    padding: 8px 15px;
    font-size: 16px;
    .ivu-tree-arrow {
        padding: 0px 5px 0px 0px;
        vertical-align: middle;
        i{
            font-size:16px;
        }
    }
    .ivu-tree-title{
        font-size:14px;
        margin-top:-2px;
    }
    .ivu-checkbox-wrapper{
        margin-right:0px;
    }
}
</style>


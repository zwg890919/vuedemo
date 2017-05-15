<template>
    <div class="cell">
        <div class="search-item">
            <span>
                <Icon type="ios-search-strong" size="22" style=""></Icon>
            </span>
            <input type="text" placeholder="输入关键字查询" v-model="groupFilter">
        </div>
        <div class="grouplist">
            <div class="grouplist-wrap">
                <p v-for="item in filterBy(itempackList,groupFilter,'pckName')" :class="{'active':currentUser.userRole == item.pckId}" @click="selectGroup(item)" @dblclick="modifyGroup(item)">
                    {{item.pckName}}
                    <Icon type="close-round" size="16px" class="fr" @click.native="delPck(item)"></Icon>
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
</template>
<script>
import api from "@/api"
import { mapState } from 'vuex'

export default {
    name: 'userpck-group',
    data() {
        return {
            groupFilter: "",
            pckName: "",
            addPck: true,
        }
    },
    computed: mapState({
        currentUser: state => state.userPck.currentUser,
        currentGroup: state => state.userPck.currentGroup,
        itempackList: state => state.userPck.itempackList,
        checkDisable: state => state.userPck.checkDisable,
    }),
    created() {
        this.getItempckList()
    },
    methods: {
        selectGroup(item) {
            this.$store.dispatch('selectUser', {
                userRole: item.pckId
            })
            this.currentUser.userRole = item.pckId
            this.$store.dispatch('selectGroup', item)
            this.$store.commit("modifiyMenu",true)
        },
        async getItempckList() {
            const data = await api.post(api.config.itempckList)
            this.$store.commit("setItempackList",data.datas.result)
        },
        async pckNameAdd() {
            const data = await api.post(api.config.authItempck, {
                pckName: this.pckName
            })
            this.addPck = true
        },
        async delPck(item) {
            const data = await api.delete(api.config.authItempck, {
                pckId: item.pckId
            })
            if (data) {
                this.getItempckList()
            }
        },
        modifyGroup(item){
            this.$store.dispatch('selectGroup', item)
            this.$store.commit("modifiyMenu",false)

        }
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
}
</script>
<style lang="scss" scoped>
.cell {
    display: table-cell;
    float: none;
    height: 100%;
    vertical-align: top;
    position: relative;
    width: 240px;
    background: #f6f8f8;
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

.grouplist {
    &-wrap {
        p {
            color: #98a6ad;
            i {
                margin-right: 15px;
                margin-top: 3px;
                display: none;
            }
            &:hover {
                i {
                    display: block
                }
            }
        }
    }
}
</style>

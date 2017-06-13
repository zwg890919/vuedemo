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
                <Checkbox-group v-model="modifyGroup">
                    <p v-for="item in filterBy(itempackList,groupFilter,'pckName')" :class="{'active':userGroup.indexOf(item.pckId) >= 0}" @click="selectGroup(item)" @dblclick="modifyPck(item)">
                        <Checkbox :label="item.pckId" v-show="modifyState">
                            <span>
                                {{item.pckName}}
                            </span>
                        </Checkbox>
                        <span v-show="!modifyState">
                            {{item.pckName}}
                        </span>
                        <Icon type="close-round" size="16px" class="fr" @click.native="delGroup(item)"></Icon>
                    </p>
                </Checkbox-group>
            </div>
        </div>
        <div class="menu-bottom ltr">
            <Input v-model="pckName" placeholder="请输入..." v-show="!addPck" @on-blur="pckNameAdd"></Input>
            <Button type="success" @click="addPck = false;pckName = ''" v-show="addPck && !modifyState">
                <Icon type="plus" size="16px"></Icon>
                新增用户组
            </Button>
            <Button type="success" @click="modifyUser" v-show="modifyState">
                确认修改
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
            modifyGroup: [],
            userGroup: [],
        }
    },
    computed: mapState({
        currentUser: state => state.userPck.currentUser,
        itempackList: state => state.userPck.itempackList,
        checkDisable: state => state.userPck.checkDisable,
        modifyState: state => state.userPck.modifyState,
    }),
    watch: {
        currentUser(state) {
            if (state.userId) {
                this.getUserpck()
            }
        },
        modifyState(state) {
            if (state) {
                this.getUserpck()
                this.$store.commit('changeGroup', {})
            }
        },
        modifyGroup(state) {
            this.userGroup = state
        }
    },
    created() {
        this.getItempckList()
    },
    methods: {
        async getItempckList() {
            const data = await api.post(api.config.itempckList)
            this.$store.commit("setItempackList", data.datas.result)
        },
        async getUserpck() {
            const data = await api.get(api.config.userPckList, {
                userId: this.currentUser.userId,
            })
            if (data) {
                this.userGroup = []
                data.datas.result.map(item => {
                    this.userGroup.push(item.pckId)
                })
                if(this.userGroup.length > 0){
                    this.$store.commit('changeGroup', this.userGroup[0])
                }
            } else {
                this.userGroup = []
                this.$store.commit('changeGroup', {})
            }
            this.modifyGroup = this.userGroup
        },
        async modifyUser() {
            var str = `userId=${this.currentUser.userId}`
            for (var item in this.modifyGroup) {
                str += `&pckid=${this.modifyGroup[item]}`
            }
            var data = await api.post(`${api.config.userPckList}?${str}`)
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: data.i18nMessage
                })
                this.$store.commit("modifiyUser", false)
            }
        },
        selectGroup(item) {
            this.userGroup = [item.pckId]
            this.$store.commit('changeGroup', item)
            this.$store.commit("modifiyMenu", true)
            if(!this.modifyState){
                this.$store.dispatch('selectUser', {})
            }
        },
        submitModify() {
            this.modifyUser()
        },
        // 添加功能组
        async pckNameAdd() {
            const data = await api.post(api.config.authItempck, {
                pckName: this.pckName
            })
            if (data) {
                this.addPck = true
                this.getItempckList()
            }

        },
        // 删除功能组
        async delPck(item) {
            const data = await api.delete(api.config.authItempck, {
                pckId: item.pckId
            })
            if (data) {
                this.getItempckList()
            }
        },
        //确认删除
        delGroup(itempck) {
            this.$store.commit("modifiyUser",false)
            this.$Modal.confirm({
                title: '操作确认',
                content: `<p>您确定要删除${itempck.pckName}组吗?</p>`,
                onOk: () => {
                    this.delPck(itempck)
                },
            });
        },
        modifyPck(item) {
            this.$store.dispatch('selectUser', {})
            this.$store.commit("modifiyUser",false)
            // this.$store.dispatch('selectGroup', item)
            this.$store.commit("modifiyMenu", false)
            this.userGroup = [item.pckId]
            this.$store.commit('changeGroup', item)
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

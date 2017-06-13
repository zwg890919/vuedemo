<template>
    <div class="cell">
        <div class="scroll-cell">
            <div class="tree-title" v-show="!checkDisable">
                <Input v-model="pckName" placeholder="请输入..." style="width: 300px"></Input>
                <span class="fr">
                    <Button type="success" size="small" @click="updataItempck">确认提交</Button>
                    <Button type="info" size="small">取消</Button>
                </span>
            </div>
            <jyc-tree
                :data="treeList"
                :options="treeOptions"
                >
            </jyc-tree>
        </div>
    </div>
</template>
<script>
import api from "@/api"
import { mapState, mapGetters } from 'vuex'
import {findComponentsDownward,transformTree} from '@/assets/js/common'
export default {
    name: 'userpck-tree',
    data() {
        return {
            treeList: [],
            pckName: "",
            treeOptions:{
                showCheckbox : true,
                selected : false,
                showIcon : false,
                hideDel: true,
                halfCheckedStatus:false,
                disableCheckbox:true
            }
        }
    },
    computed: {
        ...mapState({
            currentUser: state => state.userPck.currentUser,
            currentGroup: state => state.userPck.currentGroup,
            menuData: state => state.userPck.menuData,
            checkDisable: state => state.userPck.checkDisable,
            groupPckname: state => state.userPck.currentGroup.pckName,
        }),
    },
    watch: {
        currentGroup(value) {
            this.pckName = value.pckName || this.groupPckname
            // console.log(this.currentGroup.pckMenuId.split(","),indexOf())
            this.treeList = transformTree(this.treeList,this.currentGroup.pckMenuId.split(","))
            console.log(this.treeList)
        },
        checkDisable(state){
            this.treeOptions.disableCheckbox = state
        }
    },
    activated() {
        this.getMenuList()
    },
    methods: {
        async getMenuList() {
            const data = await api.get(api.config.menuTeant)
            this.treeList = transformTree(data.datas.result.childrens)
            // this.$store.commit('setMenuData', [data.datas.result])
        },
        async updataItempck() {
            var menuIds = String(findComponentsDownward(this.$refs.tree, 'TreeNode'))
            if(this.pckName == ""){
                return false
            }
            const data = await api.put(api.config.authItempck, {
                pckId: this.currentGroup.pckId,
                pckName: this.pckName,
                pckMenuId: menuIds
            })
            if(data){
                this.$store.commit('updataGroup', {
                    pckName: this.pckName,
                    pckMenuId: menuIds
                })
                this.$store.commit("modifiyMenu",true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.cell {
    display: table-cell;
    float: none;
    height: 100%;
    vertical-align: top;
    position: relative;
    background-color: #fff;
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

.tree-title {
    border-bottom: 1px solid #dee5e7;
    padding: 10px;
    span {
        padding-top: 5px;
        button {
            margin-right: 10px;
        }
    }
}
</style>

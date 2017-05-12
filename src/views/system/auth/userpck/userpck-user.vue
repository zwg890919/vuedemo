<template>
    <div class="cell">
        <div class="search-item">
            <span>
                <Icon type="ios-search-strong" size="22" style=""></Icon>
            </span>
            <input type="text" placeholder="输入关键字查询" v-model="userFilter">
        </div>
        <div class="userlist">
            <div class="userlist-wrap">
                <p v-for="item in filterBy(userList,userFilter,'userCode','userName')" @click="selectUser(item)" :class="{'active':currentUser.userId == item.userId}">
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
</template>
<script>
import api from "@/api"
import { mapState } from 'vuex'

export default {
    name:'userpck-user',
    data() {
        return {
            userFilter: "",
            userList: [],
        }
    },
    computed: mapState({
        currentUser: state => state.userPck.currentUser
    }),
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const data = await api.post(api.config.userList)
            this.userList = data.datas.result
        },
        selectUser(item) {
            this.$store.dispatch('selectUser', item)
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
    width: 240px;
}
</style>


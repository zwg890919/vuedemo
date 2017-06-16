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

export default {
    name: 'userpcl',
    data() {
        return {
        }
    },
    components: {
        userpckUser,
        userpckGroup,
        userpckTree
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit("modifiyMenu",false)
        next()
    },
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
            span {
                font-size: 16px;
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
        i {
            font-size: 16px;
        }
    }
    .ivu-tree-title {
        font-size: 14px;
        margin-top: 2px;
    }
    .ivu-checkbox-wrapper {
        margin-right: 0px;
    }
}
</style>


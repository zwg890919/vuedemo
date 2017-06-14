<template>
    <div class="menu-warp">
        <tree-node :nodeData="data" :selectNode="selectData" :options="options" @tree-dbclick="dbclick"></tree-node>
    </div>
</template>
<script>
import treeNode from './node.vue'
import { changeCheckStatus, eachAllChild, allCheckStatus } from './funStore.js'
import eventHub from "./event.js"

export default {
    name: 'jycTree',
    data() {
        return {
            selectData: {},
        }
    },
    props: ['data', 'options'],
    components: {
        treeNode
    },
    created() {
        this.isTree = true
    },
    mounted() {
        eventHub.$on("node-click", data => {
            this.$emit("node-click", data)
            this.selectData = data
        })
        eventHub.$on("node-delete", data => {
            this.$emit("node-delete", data)
        })
        eventHub.$on("tree-check", data => {
            this.treeCheck(data)
        })
    },
    methods: {
        dbclick(data) {
            this.$emit("tree-dbclick", data)
        },
        treeCheck(data) {
            if (this.options.halfCheckedStatus) {
                changeCheckStatus(data, this.data)
            } else {
                allCheckStatus(data, this.data)
            }
        },
        getChecked() {
            var checkedList = []
            eachAllChild(this.data, item => {
                if (item.checked) {
                    checkedList.push(item)
                }
            })
            return checkedList
        }
    }
}
</script>
<style lang="scss">
.menu-warp {
    padding: 10px;
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    &:hover {
        overflow: visible !important;
        overflow-y: auto !important;
    }
    ul {
        li {
            a {
                position: relative;
                display: block;
                padding: 4px 10px;
                cursor: pointer;
                font-size: 0px;
                &.active {
                    color: #fff !important;
                    background-color: #23b7e5;
                    border-radius: 4px;
                }
                &>span {
                    display: block;
                }
                span {
                    vertical-align: middle;
                    display: inline-block;
                    font-size: 14px;
                    &.checked {
                        color: #23b7e5
                    }
                }
                .tree-checkbox {
                    margin: 2px 0px 0px 5px;
                    vertical-align: top;
                    &.ml-n {
                        margin-left: 16px;
                    }
                    &.ml-r {
                        margin-right: 5px;
                        margin-top: 0px
                    }
                }
                i {
                    vertical-align: middle;
                    font-size: 14px;
                }
                .menu-folder {
                    color: #fad733;
                    font-size: 20px;
                    margin: 0px 3px 0px 8px;
                }
                .menu-document {
                    color: #51c6ea;
                    font-size: 20px;
                    margin: 0px 8px 0px 10px;
                    &.ml-m {
                        margin-left: 10px;
                    }
                }
                .delMenu {
                    float: right;
                    display: none;
                    margin-top: 4px;
                    vertical-align: middle;
                }
                &:hover {
                    .delMenu {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>

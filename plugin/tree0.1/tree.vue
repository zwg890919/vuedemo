<template>
    <div class="menu-warp">
        <tree-node v-for="item in extend(treedata)" :selectNode="selectNode" :key="item" :itemdata="item" :indeterminate="false" :showCheckbox="showCheckbox">
        </tree-node>
    </div>
</template>
<script>
import treeNode from "./node"
import eventHub from "./event.js"
export default {
    name: "jycTree",
    data() {
        return {
            selectNode: "",
            checkData: []
        }
    },
    props: {
        treedata: {
            type: Array,
            default() {
                return [];
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        treedata() {
            this.$nextTick(() => {
                eventHub.$emit("indeterminate");
            });
        }
    },
    mounted() {
        this.updateData();
        eventHub.$on('on-selected', (data) => {
            this.selectNode = data.id;
            this.$emit("tree-click", data)
            // this.$emit('on-select-change', this.getSelectedNodes());
        });
        eventHub.$on("tree-dbclick", (data) => {
            this.$emit("tree-dbclick", data)
        }),
        eventHub.$on("tree-del", (data) => {
            this.$emit("tree-close", data)
        }),
        eventHub.$on("tree-extend", (data) => {
            this.$emit("tree-extend", data)
        }),
        eventHub.$on("checked",() => {
            this.updateData(false)
        })
        eventHub.$on("tree-check", (data, state) => {
            if (state) {
                this.checkData.push(data)
            } else {
                var dataindex = this.checkData.indexOf(data);
                this.checkData.splice(dataindex, 1)
            }
            this.$emit("tree-check", this.checkData)
        })
    },
    methods: {
        updateData(isInit = true) {
            function forwadCheck(data) {
                if (data.childrens) {
                    let checkedLength = 0;
                    data.childrens.forEach(node => {
                        if (node.childrens) node = forwadCheck(node);
                        if (node.checkState) checkedLength++;
                    });
                    if (isInit) {
                        if (checkedLength >= data.childrens.length) data.checkState = true;
                    } else {
                        data.checkState = checkedLength >= data.childrens.length;
                    }
                    // console.log(data)
                    return data;
                } else {
                    return data
                }
            }
            this.treedata.map(node => {
                forwadCheck(node)
            })
            eventHub.$emit("indeterminate");
        },
        extend(data) {
            var _this = this
            if (data) {
                data.map(function (item) {
                    _this.$set(item,"checkState",false)
                })
                return data
            }
        },
    },
    components: {
        treeNode
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
                padding: 3px 10px;
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
                }
                .tree-checkbox {
                    margin: 0px 0px 0px 5px;
                    vertical-align: top;
                    &.ml-n {
                        margin-left: 20px;
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

<template>
    <ul>
        <li v-for="(item,index) in nodeData" :key="item.id">
            <a :style="{'padding-left': item.level!=1?(item.level-1)*30+'px':'10px'}" @click="nodeClick(item)" @dblclick="dnodeClick(item)" :class="{active:item.id == selectNode.id && options.selected}">
                <Icon :type="item.extendType" v-if="item.childrens.length>0" @click.native="extendMenu(item)"></Icon>
                <Checkbox
                    class="tree-checkbox"
                    v-if="options.showCheckbox"
                    v-model="item.checked"
                    :disabled="options.disableCheckbox"
                    :class="{'ml-n': item.childrens.length==0,'ml-r':!options.showIcon}"
                    @on-change="treeCheck(item)"
                >
                </Checkbox>
                <span>
                    <Icon type="folder" class="menu-folder" v-if="item.childrens.length>0 && options.showIcon"></Icon>
                    <Icon type="android-document" :class="{'ml-m':options.showCheckbox}" class="menu-document" v-if="item.childrens.length==0 && options.showIcon"></Icon>
                    <span :class="{'checked':item.checked}">{{item.name}}</span>
                </span>
                <Icon v-if="!options.hideDel" type="close" class="delMenu" @click.native="delMenu(item,index)"></Icon>
            </a>
            <tree-node v-if="item.childrens && item.childrens.length>0" v-show="item.open" :nodeData="item.childrens" :selectNode="selectNode" :options="options"></tree-node>
        </li>
    </ul>
</template>
<script>
import eventHub from './event.js'
export default {
    name: 'treeNode',
    props: {
        nodeData: [Array],
        options: [Object],
        selectNode: [Object]
    },
    created() {
        const parent = this.$parent
        if (parent.isTree) {
            this.tree = parent
        } else {
            this.tree = parent.tree
        }
    },
    methods: {
        extendMenu(node) {
            node.open = !node.open;
            if (node.extendType == "plus-round") {
                node.extendType = "minus-round"
            } else {
                node.extendType = "plus-round"
            }
        },
        nodeClick(data) {
            eventHub.$emit("node-click", data)
        },
        treeCheck(data) {
            eventHub.$emit("tree-check", data)
        },
        delMenu(data, index) {
            this.$Modal.confirm({
                title: '操作确认',
                content: `<p>您确定要删除${data.name}，及下属所有的菜单?</p>`,
                onOk: () => {
                    this.nodeData.splice(index, 1)
                    eventHub.$emit("node-delete", data)
                },
            });
        },
        dnodeClick(data) {
            console.log(this.tree)
            this.tree.$emit('tree-dbclick', data)
            // eventHub.$emit("tree-dbclick", data)
        }
    }
}
</script>
<style lang="scss">

</style>

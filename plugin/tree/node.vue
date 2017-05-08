<template>
    <ul>
        <li >
            <a :style="{'padding-left': (itemdata.level-1)*25+'px'}" @dblclick="dnodeClick" :class="{active:itemdata.id == selectNode}" >
                <Icon :type="extendType" @click.native="extendMenu()" v-if="itemdata.childrens.length>0"></Icon>
                <Checkbox class="tree-checkbox"
                    v-if="showCheckbox"
                    :value="itemdata.checkState"
                    @on-change="treeCheck"
                    :indeterminate = indeterminate
                    :class="{'ml-n': itemdata.childrens.length==0}"></Checkbox>
                <span  @click="nodeClick">
                    <Icon type="folder" class="menu-folder" v-if="itemdata.childrens.length>0"></Icon>
                    <Icon type="android-document" :class="{'ml-m':showCheckbox}" class="menu-document" v-if="itemdata.childrens.length==0"></Icon>
                    <span>{{itemdata.name}}</span>
                </span>
                <Icon type="close" class="delMenu" @click.native="delMenu()"></Icon>
            </a>
            <tree-node v-for="item in extend(itemdata.childrens)"
                :selectNode="selectNode"
                v-show="extendShow"
                :indent="1"
                :key="item"
                :showCheckbox="showCheckbox"
                :itemdata="item">
            </tree-node>
        </li>
    </ul>
</template>
<script>
import eventHub from "./event.js"

export default {
    name: "treeNode",
    data() {
        return {
            extendType: "minus-round",
            extendShow: true,
            indeterminate:false
        }
    },
    props: ['itemdata', 'indent','selectNode','showCheckbox'],
    methods: {
        extend(data) {
            var _this = this
            if (data) {
                data.map(function (item) {
                    _this.$set(item,"checkState",false)
                })
                return data
            }
        },
        nodeClick() {
            eventHub.$emit("on-selected",this.itemdata)
        },
        dnodeClick() {
            eventHub.$emit("tree-dbclick",this.itemdata)
        },
        delMenu() {
            eventHub.$emit("tree-del",this.itemdata)
        },
        extendMenu() {
            eventHub.$emit("tree-extend",this.itemdata)
            this.extendShow = !this.extendShow;
            if(this.extendType == "plus-round"){
                this.extendType = "minus-round"
            }else{
                this.extendType = "plus-round"
            }

        },
        treeCheck(){
            const checked = !this.itemdata.checkState;

            if(!checked){
                findComponet(this).forEach(item => {
                    item.itemdata.checkState = false
                    // console.log(1,item.itemdata.name,item.itemdata.checkState)
                })
            }else{
                findComponet(this).forEach(item => {
                     item.itemdata.checkState = true
                    //  console.log(2,item.itemdata.name,item.itemdata.checkState)
                })
            }
            this.itemdata.checkState = checked
            eventHub.$emit("tree-check",this.itemdata,checked)
            eventHub.$emit("checked")
        },
        setIndeterminate () {
            // console.log(11)
            this.indeterminate = this.itemdata.checkState ? false : findComponet(this).some(node => {
                // console.log(node.itemdata.checkState)
                node.itemdata.checkState
            });
        }
    },
    mounted () {
        eventHub.$on('indeterminate', () => {
            // eventHub.$emit("indeterminate")
            this.setIndeterminate();
        });
    }
}

function findComponet(context,components=[]){
    const childrens = context.$children
    if (childrens.length) {
        childrens.forEach(child => {
            const name = child.$options.name
            const childs = child.$children;

            if(name == "treeNode"){
                components.push(child)
            }

            if (childs.length) {
                const findChilds = findComponet(child,components);
                if (findChilds) components.concat(findChilds);
            }
        })
    }
    return components
}
</script>

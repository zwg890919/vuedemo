<template>
    <div class="menu-warp">
        <ul>
            <li v-for="item in data">
                <a @click="nodeClick(item)" @dblclick="dnodeClick" :class="{active:item.id == selectNode}">
                    <Icon type="minus-round" @click.native="extendMenu()"></Icon>
                    <Icon type="folder" class="menu-folder"></Icon>
                    <span>{{item.name}}</span>
                    <Icon type="close" class="delMenu" @click.native="delMenu()"></Icon>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: {},
            selectNode: ""
        }
    },
    props: ['treedata'],
    watch: {
        treedata(val) {
            this.data = val.childrens
            console.log(this.data)
        }
    },
    methods: {
        nodeClick(item) {
            this.selectNode = item.id
            console.log(1)
        },
        dnodeClick() {
            console.log(2)
        },
        delMenu(){
            console.log(3)
        },
        extendMenu(){
            console.log(4)
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
                padding: 3px 10px;
                cursor: pointer;
                font-size: 0px;
                &.active {
                    color: #fff !important;
                    background-color: #23b7e5;
                    border-radius: 4px;
                }
                span {
                    vertical-align: middle;
                    display: inline-block;
                    font-size: 14px;
                }
                i {
                    vertical-align: middle;
                    font-size: 14px;
                }
                .menu-folder {
                    color: #fad733;
                    font-size: 20px;
                    margin: 0px 8px;
                }
                .delMenu {
                    float: right;
                    display: none;
                    margin-top:3px;
                    vertical-align: middle;
                }
                &:hover {
                    .delMenu {
                        display: block;
                    }
                }
            }
        }
    }
}
</style>


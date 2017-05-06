<script>
export default {
    data() {
        return {
            selectNode: ""
        }
    },
    props: {
        treedata: {
            type: Array,
            default: function () { return [] }
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
        delMenu() {
            console.log(3)
        },
        extendMenu() {
            console.log(4)
        }
    },
    render: function (h, context) {
        if (this.treedata.length > 0) {
            var treeNode = [];
            this.treedata.map(function (item) {
                treeNode.push(drawNode(item, h))
                item.childrens.map(function (subItem) {
                    treeNode.push(drawNode(subItem, h))
                    subItem.childrens.map(function (childItem) {
                        treeNode.push(drawNode(childItem, h))
                        childItem.childrens.map(function (xchildItem) {
                            treeNode.push(drawNode(xchildItem, h))
                        })
                    })
                })
            })
            return h(
                'div', {
                    attrs: {
                        class: "menu-warp"
                    }
                }, [h("ul", treeNode
                )]
            )
        }
    }
}
var drawNode = function (item, h) {

    var _this = this
    item.IconType = "minus-round"
    if (item.childrens.length > 0) {
        var menuType = "folder"
        var menuTypeClass = "menu-folder"
        var treePlue = h("Icon", {
            attrs: {
                type: item.IconType
            },
            nativeOn: {
                click: function (event) {
                    console.log(31)
                    item.IconType = "plus-round"
                }
            }
        })
    } else {
        var menuType = "android-document"
        var menuTypeClass = "menu-document"
        var treePlus = ""
    }
    return h("li", {
        class: "level-" + item.level,
    }, [
            h("a", [
                treePlue,
                h("Icon", {
                    attrs: {
                        type: menuType
                    },
                    class: menuTypeClass
                }),
                h("span", item.name),
                h("Icon", {
                    attrs: {
                        type: "close",
                    },
                    class: "delMenu"
                })
            ])
        ])
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
            &.level-1 {
                position: relative;
                left: 0;
            }
            &.level-2 {
                position: relative;
                left: 20px;
            }
            &.level-3 {
                position: relative;
                left: 60px;
            }
            &.level-4 {
                position: relative;
                left: 80px;
            }
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
                .menu-document {
                    color: #51c6ea;
                    font-size: 20px;
                    margin: 0px 8px;
                }
                .delMenu {
                    float: right;
                    display: none;
                    margin-top: 3px;
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

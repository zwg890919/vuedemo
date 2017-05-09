<template>
    <div>
        <div class="search-item">
            <span>
                <Icon type="ios-search-strong" size="22" style=""></Icon>
            </span>
            <input type="text" placeholder="输入关键字查询" v-model="itemFilter">
        </div>
        <div class="scroll-cell">
            <div class="api-details">
                <a v-for="item in filtrate(currentList)" :id="item.itemId" :class="{select:item.itemId == selectItem.menuItemId}" @dblclick="editItem(item)">
                    <div>
                        <span class="label">{{item.itemTab}}组</span> /**
                        <br>&nbsp;*&nbsp;<span>{{item.itemAllDesc}}</span>
                        <br>
                        <span v-for="param in item.params">
                                    &nbsp;* <span class="text-muted">@param</span>
                        <span class="hightLight">{{param}}</span>
                        <br>
                        </span>
                        &nbsp;*/<br>
                        <span class="api-delete fr" @click="delItem(item)">
                            <Icon type="trash-a" size="24"></Icon>
                        </span>
                        @RequestMapping(value="<span class="hightLight">/{{item.itemUrl}}</span>"
                        <span v-if="item.itemRequestmethod">, method=RequestMethod.<span class="hightLight"><em>{{item.itemRequestmethod}}</em></span></span>)
                    </div>
                </a>
            </div>
        </div>
        <Modal :title="modalModify == 'add'? '新增功能' : '修改功能'" v-model="addFunction" width="600" @on-ok="submitMenu">
            <div class="model-wrap">
                <Row :gutter="20" style="margin-bottom:15px">
                    <Col span="8">
                    <p class="modal-title">标签分类</p>
                    <Input v-model="currentData.itemTab" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="8">
                    <p class="modal-title">功能URL</p>
                    <Input v-model="currentData.itemUrl" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="8">
                    <p class="modal-title">请求类型</p>
                    <Select v-model="currentData.itemRequestmethod">
                        <Option value="">无限制</Option>
                        <Option value="post">POST</Option>
                        <Option value="GET">GET</Option>
                        <Option value="DELETE">DELETE</Option>
                        <Option value="PUT">PUT</Option>
                    </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p class="modal-title">功能详细说明</p>
                    <Input v-model="currentData.itemDescription" type="textarea" :rows="2" placeholder="例如：更新租户名称等信息{tenantId}{shortName:简称}"></Input>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
import api from "@/api/"
export default {
    data() {
        return {
            itemFilter: "",
            modalModify: "add",
            addFunction: false,
            currentList:{},
            currentData: {}
        }
    },
    props: ["itemdata", "selectItem", "modalOpen"],
    watch: {
        itemdata(val){
            this.currentList = val
        },
        modalOpen(val) {
            this.modalModify = "add"
            this.addFunction = true
            this.currentData = {}
        },
        addFunction(val) {
            this.$emit("closeMenuModal")
        }
    },
    methods: {
        async delItem(item) {
            // console.log(item.itemId)
            const data = await api.delete(api.config.authItem,item)
        },
        editItem(item) {
            this.modalModify = "edit"
            console.log(item)
            this.addFunction = true;
            this.currentData = item
        },
        submitMenu() {
            this.$emit("closeMenuModal")
            if(this.modalModify == "add"){
                this.submiteItem(this.currentData)
            }else{
                this.updateItem(this.currentData)
            }
        },
        async submiteItem(param){
            const data = await api.post(api.config.authItem,param)
        },
        async updateItem(param){
            const data = await api.put(api.config.authItem,param)
        },
        filtrate(itemlist){
            var CurrentArray = [];
            if(itemlist.length>0 && this.itemFilter != ""){
                var searchRegex = new RegExp(this.itemFilter, 'i');
                for (var item of itemlist) {
                    if(searchRegex.test(item.itemAllDesc)){
                        CurrentArray.push(item)
                    }
                }
                return CurrentArray
            }else{
                return itemlist
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.search-item {
    display: table;
    width: 100%;
    padding: 5px;
    height: 40px;
    border-bottom: #dee5e7 1px solid;
    background: #f6f8f8;
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

.modal-title {
    margin-bottom: 5px;
}

.scroll-cell {
    position: absolute;
    top: 40px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    overflow-y: auto;
}

.api-details {
    a {
        display: block;
        padding: 15px 20px;
        border-bottom: #e7ecee 1px solid;
        color: #555;
        font-size: 14px;
        &:hover {
            color: #555;
            .api-delete {
                display: block;
            }
        }
        .text-muted {
            color: #98a6ad;
        }
        .hightLight {
            color: #19a9d5
        }
        .label {
            color: #f4f3f9;
            background-color: #7266ba;
            float: right;
            font-size: 12px;
            padding: 2px 5px;
            border-radius: 5px;
            font-weight: bold;
        }
        &.select {
            position: relative;
            z-index: 1;
            background-color: #dbeef9 !important;
            border-color: #c5e4f5;
        }
        .api-delete {
            display: none
        }
    }
}
</style>

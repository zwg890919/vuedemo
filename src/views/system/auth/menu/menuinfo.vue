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
                        <span class="label">{{item.itemTab}}</span> /**
                        <br>&nbsp;*
                        <span class="text-xs">{{item.itemAllDesc}}</span>
                        <br>
                        <span v-for="param in item.params">
                            &nbsp;*
                            <span class="text-muted">@param</span>
                            <span class="hightLight text-xs">{{param}}</span>
                            <br>
                        </span>
                        &nbsp;*/
                        <br>
                        <span class="api-delete fr" @click="delMenuItem(item.itemId)">
                            <i class="fa fa-trash-o" aria-hidden="true" style="font-size:18px;"></i>
                        </span>
                        @RequestMapping(value="
                        <span class="hightLight">/{{item.itemUrl}}</span>"
                        <span v-if="item.itemRequestmethod">, method=RequestMethod.
                            <span class="hightLight">
                                <em>{{item.itemRequestmethod | uppercase}}</em>
                            </span>
                        </span>)
                    </div>
                </a>
            </div>
        </div>
        <Modal :title="modalModify == 'add'? '新增功能' : '修改功能'" v-model="addFunction" width="600" @on-ok="submitMenu" @on-cancel="cancle" :mask-closable="false">
            <div class="model-wrap">
                <Form ref="modalItem" label-position="top" :model="currentData" :rules="ruleCustom">
                    <Row :gutter="20">
                        <Col span="8">
                        <Form-item label="标签分类" prop="itemTab">
                            <Input v-model="currentData.itemTab" placeholder="请输入..."></Input>
                        </Form-item>
                        </Col>
                        <Col span="8">
                        <Form-item label="功能URL" prop="itemUrl">
                            <Input v-model="currentData.itemUrl" placeholder="请输入..."></Input>
                        </Form-item>
                        </Col>
                        <Col span="8">
                        <Form-item label="请求类型" prop="itemRequestmethod">
                            <Select v-model="currentData.itemRequestmethod">
                                <Option value="">无限制</Option>
                                <Option value="post">POST</Option>
                                <Option value="GET">GET</Option>
                                <Option value="DELETE">DELETE</Option>
                                <Option value="PUT">PUT</Option>
                            </Select>
                        </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form-item label="功能详细说明" prop="itemDescription">
                            <Input v-model="currentData.itemDescription" type="textarea" :rows="2" placeholder="例如：更新租户名称等信息{tenantId}{shortName:简称}"></Input>
                        </Form-item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button type="text" @click="cancle">取消</Button>
                <Button type="primary" @click="submitMenu('currentData')">提交</Button>
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
            currentList: {},
            currentData: {
                itemTab: '',
                itemUrl: '',
                itemDescription: '',
                itemRequestmethod: '',
            },
            ruleCustom: {
                itemTab: [
                    { required: true, message: '标签分类不能为空', trigger: 'blur' }
                ],
                itemUrl: [
                    { required: true, message: '功能URL不能为空', trigger: 'blur' }
                ],
                itemDescription: [
                    { required: true, message: '功能详细说明不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    props: ["itemdata", "selectItem", "modalOpen"],
    watch: {
        itemdata(val) {
            this.currentList = val
        },
        modalOpen(val) {
            this.modalModify = "add"
            this.addFunction = val
            // console.log(this.currentData)
            for (var key in this.currentData) {
                this.currentData[key] = ''
            }
        },
        addFunction(val) {
            if(!val){
                this.$emit("closeMenuModal")
            }
        }
    },
    methods: {
        delMenuItem(itemId) {
            this.$Modal.confirm({
                title: '操作确认',
                content: "<p>您确定要删除此项功能?</p>",
                onOk: () => {
                    this.delItem(itemId)
                },
            });
        },
        async delItem(itemId) {
            const data = await api.delete(api.config.authItem, {
                itemId: itemId
            })
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: "删除成功"
                })
                this.$emit("resetItemlist")
            }
        },
        editItem(item) {
            this.modalModify = "edit"
            this.addFunction = true;
            Object.assign(this.currentData, item)
        },
        submitMenu() {
            this.$refs['modalItem'].validate((valid) => {
                if (valid) {
                    // this.$emit("closeMenuModal")
                    if (this.modalModify == "add") {
                        this.submiteItem(this.currentData)
                    } else {
                        this.updateItem(this.currentData)
                    }
                }
            })

        },
        cancle() {
            this.$refs['modalItem'].resetFields();
            this.addFunction = false;
        },
        async submiteItem(param) {
            const data = await api.post(api.config.authItem, param)
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: data.i18nMessage
                })
                this.addFunction = false
                this.$emit("resetItemlist")
                this.$emit("closeMenuModal")
            }

        },
        async updateItem(param) {
            const data = await api.put(api.config.authItem, param)
            if (data) {
                this.$totast.success({
                    title: "系统提示",
                    message: data.i18nMessage
                })
                this.addFunction = false
                this.$emit("resetItemlist")
                this.$emit("closeMenuModal")
            }

        },
        filtrate(itemlist) {
            // console.log(itemlist)
            var CurrentArray = [];
            if (itemlist.length > 0 && this.itemFilter != "") {
                var searchRegex = new RegExp(this.itemFilter, 'i');
                for (var item of itemlist) {
                    if (searchRegex.test(item.itemAllDesc)) {
                        CurrentArray.push(item)
                    }
                }
                return CurrentArray
            } else {
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
    font-family: Consolas;
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
        .text-xs{
            font-size:12px;
        }
    }
}
</style>

<template>
    <div class="tenant-wrap">
        <div class="cell">
            <div class="wrapper">
                <Card :shadow="true">
                    <div slot="title">
                        <Button type="success">新增</Button>
                        <Button type="ghost" @click="delTenant">删除</Button>
                        <span class="fr">
                            <Input v-model="value" placeholder="请输入账号" style="width: 150px"></Input>
                            <Input v-model="value" placeholder="请输入名称" style="width: 150px"></Input>
                            <Button type="ghost">查询</Button>
                        </span>
                    </div>
                    <div class="tenant-table__wrap">
                        <Table @on-select="selectTable" :context="self" stripe :columns="columns" size="small" :data="tenantData" @on-row-click="rowClick"></Table>
                        <Page :current="pageConf.pageNum" :total="pageConf.total" :page-size="pageConf.pageSize" class-name="tentant-page" @on-change="changCurrentPage"></Page>
                        <select v-model="pageConf.pageSize" class="tenant-page__select" @change="changPage">
                            <option :value="5">每页显示5条</option>
                            <option :value="10">每页显示10条</option>
                            <option :value="15">每页显示15条</option>
                            <option :value="20">每页显示20条</option>
                            <option :value="30">每页显示30条</option>
                            <option :value="50">每页显示50条</option>
                        </select>
                    </div>
                </Card>
            </div>
        </div>
        <div class="cell">
            <div class="wrapper b-b">
                <h5>{{currentData.tenantName}}</h5>
            </div>
            <div class="wrapper tenant-info">
                <p>
                    <label>租户帐号</label>{{currentData.tenantCode}}
                </p>
                <p>
                    <label>租户简称</label>{{currentData.tenantShortname}}
                </p>
                <p>
                    <label>联系电话</label>{{currentData.tenantPhone}}
                </p>
                <p>
                    <label>详细地址</label>{{currentData.tenantAddress}}
                </p>
                <p>
                    <label>注册时间</label>{{currentData.tenantCreatedon}}
                </p>
                <p>
                    <label>更新时间</label>{{currentData.tenantModifiedon}}
                </p>
                <p>
                    <label>当前状态</label>
                    <i-switch v-model="currentData.tenantStatus" @on-change="changeStatus">
                    </i-switch>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api"
export default {
    data() {
        return {
            self: this,
            show: false,
            value: "",
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '账号',
                    width: 90,
                    key: 'tenantCode',
                    sortable: true
                },
                {
                    title: '简称',
                    key: 'tenantShortname',
                    sortable: true,
                    ellipsis:true,
                },
                {
                    title: '全称',
                    key: 'tenantName',
                    className:'tenantName',
                    sortable: true,
                    ellipsis:true,
                },
                {
                    title: '电话',
                    key: 'tenantPhone',
                    width: 100,
                    sortable: true
                },
                {
                    title: '注册时间',
                    key: 'tenantCreatedon',
                    sortable: true,
                    width: 90,
                    render(row, column, index) {
                        return new Date(row.tenantCreatedon).format('yyyy-MM-dd');
                    }
                },
                {
                    title: '状态',
                    key: 'tenantStatus',
                    sortable: true,
                    width: 80,
                    render(row, column, index) {
                        if (row.tenantStatus) {
                            return '<Tag color="blue">启用中</Tag>'
                        } else {
                            return '<Tag>已禁用</Tag>'
                        }
                    }
                },
                {
                    title: '操作',
                    key: 'tenantId',
                    width: 60,
                    render(row, column, index) {
                        return `<a style="cursor:pointer;color:#7266ba" @click="selectRow(${index})" >菜单</a>`;
                    }

                },
            ],
            tenantData: [],
            currentData: {},
            pageConf: {
                pageSize: 10,
                pageNum: 1,
            }
        }
    },
    created() {
        this.getTenantList()
    },
    methods: {
        async getTenantList() {
            const data = await api.post(api.config.tenantList, this.pageConf)
            this.tenantData = data.datas.result
            this.currentData = data.datas.result[0]
            this.pageConf = data.datas.pagebar
        },
        changPage() {
            this.pageConf.pageNum = 1
            this.getTenantList()
        },
        changCurrentPage(page) {
            this.pageConf.pageNum = page
            this.getTenantList()
        },
        selectRow(index) {
            this.currentData = this.tenantData[index]
        },
        rowClick(item) {
            this.currentData = item
        },
        async changeStatus(val){
            const data = await api.put(api.config.tenantStatus,{
                tenantId : this.currentData.tenantId,
                tenantStatus : val
            })
            this.tenantData.map(item =>{
                if(this.currentData.tenantId == item.tenantId){
                    item.tenantStatus = val
                }
            })
        },
        async delTenant(){
            const data = await api.delete(api.config.authTenant,{
                tenantId : this.currentData.tenantId,
            })
        },
        selectTable(selection,row){
            console.log(selection)
        },
    }
}
</script>
<style lang="scss">
.tenant-wrap {
    display: table;
    width: 100%;
    height: 100%;
    border-spacing: 0;
    table-layout: fixed;
    background-color: #edf1f2;
    .cell {
        display: table-cell;
        float: none;
        height: 100%;
        vertical-align: top;
        &:nth-child(2) {
            width: 280px;
            background: #f3f5f6;
            .b-b {
                border-bottom: 1px solid #dee5e7;
            }
            h5 {
                font-size: 14px;
                font-weight: 500;
                line-height: 1.1;
                color: #58666e;
            }
        }
        .wrapper {
            padding: 15px;
        }
        .tenant-info {
            p {
                margin-bottom:15px;
                &>label {
                    color: #98a6ad;
                    width: 60px;
                    margin-right:15px;
                }
            }
        }
    }
    .tentant-page {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        margin: 15px auto;
    }
    .tenant-page__select {
        position: absolute;
        right: 25px;
        bottom: 30px;
        width: 200px;
        height: 30px;
        line-height: 30px;
    }
}
.tenantName{
    min-width:220px!important;
}
.ivu-table-cell{
    padding-left:10px;
    padding-right:10px;
}
</style>

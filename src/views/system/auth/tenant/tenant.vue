<template>
    <div class="tenant-wrap">
        <div class="cell">
            <div class="wrapper">
                <Card :shadow="true">
                    <div slot="title">
                        <Button type="success" @click="showtao">新增</Button>
                        <Button type="ghost">删除</Button>
                        <span class="fr">
                            <Input v-model="value" placeholder="请输入账号" style="width: 150px"></Input>
                            <Input v-model="value" placeholder="请输入名称" style="width: 150px"></Input>
                            <Button type="ghost">查询</Button>
                        </span>
                    </div>
                    <div>
                        <Table stripe :columns="columns" size="small" :data="tenantData"></Table>
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
        <div class="cell"></div>
    </div>
</template>
<script>
import api from "@/api"
export default {
    data() {
        return {
            show: false,
            value: "",
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '账号',
                    width: 70,
                    key: 'tenantCode',
                    sortable: true
                },
                {
                    title: '简称',
                    width: 130,
                    key: 'tenantShortname',
                    sortable: true
                },
                {
                    title: '全称',
                    width:240,
                    key: 'tenantName',
                    sortable: true
                },
                {
                    title: '电话',
                    width:120,
                    key: 'tenantPhone',
                    sortable: true
                },
                {
                    title: '注册时间',
                    width:115,
                    key: 'tenantCreatedon',
                    sortable: true,
                    render (row, column, index) {
                        return new Date(row.tenantCreatedon).format('yyyy-MM-dd');
                    }
                },
                {
                    title: '状态',
                    key: 'tenantStatus',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'tenantId'
                },
            ],
            tenantData:[],
            pageConf:{
                pageSize : 10,
		        pageNum : 1,
            }
        }
    },
    created() {
        this.getTenantList()
    },
    methods: {
        async getTenantList() {
            const data = await api.post(api.config.tenantList,this.pageConf)
            this.tenantData = data.datas.result
            this.pageConf = data.datas.pagebar
            // console.log(this.pageConf)
        },
        showtao() {
            this.$totast.success({
                title: "123",
                message: "1231"
            })
        },
        changPage(){
            this.pageConf.pageNum = 1
            this.getTenantList()
        },
        changCurrentPage(page){
            this.pageConf.pageNum = page
            this.getTenantList()
        }
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
    .cell {
        display: table-cell;
        &:nth-child(2) {
            width: 280px;
            background: #ff0000
        }
        .wrapper {
            padding: 15px;
        }
    }
    .tentant-page {
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        margin: 15px auto;

    }
    .tenant-page__select{
        position: absolute;
        right:25px;
        bottom:30px;
        width:200px;
        height:30px;
        line-height: 30px;
    }
}
</style>

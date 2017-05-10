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
                        <Table stripe :columns="columns4" size="small" :data="data1"></Table>
                        <Page :total="100" class-name="tentant-page"></Page>
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
            columns4: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '账号',
                    key: 'name',
                    sortable: true
                },
                {
                    title: '简称',
                    key: 'age',
                    sortable: true
                },
                {
                    title: '全称',
                    key: 'address',
                    sortable: true
                },
                {
                    title: '电话',
                    key: 'address',
                    sortable: true
                },
                {
                    title: '注册时间',
                    key: 'address',
                    sortable: true
                },
                {
                    title: '状态',
                    key: 'address',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'address'
                },
            ],
            data1: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居'
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道'
                }
            ]
        }
    },
    created() {
        this.getTenantList()
    },
    methods: {
        async getTenantList() {
            const data = await api.get(api.config.tenantList)
            console.log(data)
        },
        showtao() {
            this.$totast.success({
                title: "123",
                message: "1231"
            })
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
        width:-webkit-fit-content;
        margin-top:15px;
        width:fit-content;
    }
}
</style>

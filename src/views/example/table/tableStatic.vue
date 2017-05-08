<template>
    <div class="wrap">
        <h2>Static Table</h2>
        <!--基本-->
        <div class="table">
            <Table border stripe highlight-row :columns="columns" :data="data" @on-row-click="rowClick"></Table>
        </div>
        <!--固定列-->
        <div class="table" style="width: 100%;">
            <Table :columns="columns2" :data="data2"></Table>
        </div>
        <!--导出-->
        <div class="table">
            <Table :columns="columns3" :data="data3" size="small" ref="table"></Table>
            <div class="table-btn">
                <Button type="primary" size="large" @click="exportData(1)">
                    <Icon type="ios-download-outline"></Icon> 导出原始数据
                </Button>
                <Button type="primary" size="large" @click="exportData(2)">
                    <Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据
                </Button>
                <Button type="primary" size="large" @click="exportData(3)">
                    <Icon type="ios-download-outline"></Icon> 导出自定义数据
                </Button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: [
                {
                    width: 60,
                    type: 'selection'
                },
                {
                    title: '姓名',
                    key: 'name',
                    render(row, column, index) {
                        return `<Icon type="person"></Icon> <strong>${row.name}</strong>`;
                    }
                },
                {
                    title: '年龄(排序)',
                    key: 'age',
                    sortable: true
                },
                {
                    title: '地址(筛选)',
                    key: 'address',
                    filters: [
                        {
                            label: '北京',
                            value: '北京'
                        },
                        {
                            label: '深圳',
                            value: '深圳'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render(row, column, index) {
                        return `<i-button type="primary" size="small" @click.stop="show(${index})">查看</i-button> <i-button type="error" size="small" @click.stop="remove(${index})">删除</i-button>`;
                    }
                }
            ],
            columns2: [
                {
                    title: '姓名',
                    key: 'name',
                    width: 200,
                    fixed: 'left'
                },
                {
                    title: '年龄',
                    key: 'age',
                    width: 200,
                },
                {
                    title: '省份',
                    key: 'province',
                    width: 200
                },
                {
                    title: '市区',
                    key: 'city',
                    width: 500
                },
                {
                    title: '地址',
                    key: 'address',
                    width: 500
                },
                {
                    title: '邮编',
                    key: 'zip',
                    width: 400
                }
            ],
            columns3: [
                { "title": "名称", "key": "name", "fixed": "left", "width": 200 }, {
                    "title": "展示", "key": "show", "width": 150, "sortable": true, filters: [{ label: '大于4000', value: 1 }, { label: '小于4000', value: 2 }], filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            returnrow.show > 4000;
                        } else if (value === 2) {
                            returnrow.show < 4000;
                        }
                    }
                }, { "title": "唤醒", "key": "weak", "width": 150, "sortable": true }, { "title": "登录", "key": "signin", "width": 150, "sortable": true }, { "title": "点击", "key": "click", "width": 150, "sortable": true }, { "title": "激活", "key": "active", "width": 150, "sortable": true }, { "title": "7日留存", "key": "day7", "width": 150, "sortable": true }, { "title": "30日留存", "key": "day30", "width": 150, "sortable": true }, { "title": "次日留存", "key": "tomorrow", "width": 150, "sortable": true }, { "title": "日活跃", "key": "day", "width": 150, "sortable": true }, { "title": "周活跃", "key": "week", "width": 150, "sortable": true }, { "title": "月活跃", "key": "month", "width": 150, "sortable": true }
            ],
            data: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    _checked: true
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    _disabled: true
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
                },
                {
                    name: '阿萨德',
                    age: 22,
                    address: '深圳市南山区深南大道',
                    _highlight: true
                }
            ],
            data2: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    province: '北京市',
                    city: '朝阳区',
                    zip: 100000
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    province: '北京市',
                    city: '海淀区',
                    zip: 100000
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    province: '上海市',
                    city: '浦东新区',
                    zip: 100000
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    province: '广东',
                    city: '南山区',
                    zip: 100000
                }
            ],
            data3: [
                { "name": "推广名称1", "fav": 0, "show": 7302, "weak": 5627, "signin": 1563, "click": 4254, "active": 1438, "day7": 274, "day30": 285, "tomorrow": 1727, "day": 558, "week": 4440, "month": 5610 }, { "name": "推广名称2", "fav": 0, "show": 4720, "weak": 4086, "signin": 3792, "click": 8690, "active": 8470, "day7": 8172, "day30": 5197, "tomorrow": 1684, "day": 2593, "week": 2507, "month": 1537 }, { "name": "推广名称3", "fav": 0, "show": 7181, "weak": 8007, "signin": 8477, "click": 1879, "active": 16, "day7": 2249, "day30": 3450, "tomorrow": 377, "day": 1561, "week": 3219, "month": 1588 }, { "name": "推广名称4", "fav": 0, "show": 9911, "weak": 8976, "signin": 8807, "click": 8050, "active": 7668, "day7": 1547, "day30": 2357, "tomorrow": 7278, "day": 5309, "week": 1655, "month": 9043 }, { "name": "推广名称5", "fav": 0, "show": 934, "weak": 1394, "signin": 6463, "click": 5278, "active": 9256, "day7": 209, "day30": 3563, "tomorrow": 8285, "day": 1230, "week": 4840, "month": 9908 }, { "name": "推广名称6", "fav": 0, "show": 6856, "weak": 1608, "signin": 457, "click": 4949, "active": 2909, "day7": 4525, "day30": 6171, "tomorrow": 1920, "day": 1966, "week": 904, "month": 6851 }, { "name": "推广名称7", "fav": 0, "show": 5107, "weak": 6407, "signin": 4166, "click": 7970, "active": 1002, "day7": 8701, "day30": 9040, "tomorrow": 7632, "day": 4061, "week": 4359, "month": 3676 }, { "name": "推广名称8", "fav": 0, "show": 862, "weak": 6520, "signin": 6696, "click": 3209, "active": 6801, "day7": 6364, "day30": 6850, "tomorrow": 9408, "day": 2481, "week": 1479, "month": 2346 }, { "name": "推广名称9", "fav": 0, "show": 567, "weak": 5859, "signin": 128, "click": 6593, "active": 1971, "day7": 7596, "day30": 3546, "tomorrow": 6641, "day": 1611, "week": 5534, "month": 3190 }, { "name": "推广名称10", "fav": 0, "show": 3651, "weak": 1819, "signin": 4595, "click": 7499, "active": 7405, "day7": 8710, "day30": 5518, "tomorrow": 428, "day": 9768, "week": 2864, "month": 5811 }
            ]
        }
    },
    methods: {
        rowClick(currentRow) {
            if (!currentRow._disabled) {
                alert(currentRow.name);
            }
        },
        show(index) {
            alert('查看第' + (index + 1) + '行');
        },
        remove(index) {
            this.data.splice(index, 1);
        },
        exportData(type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: '原始数据'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: '排序和过滤后的数据',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: '自定义数据',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data7.filter((data, index) => index < 4)
                });
            }
        }
    }
}
</script>
<style scope lang="scss">
.wrap {
    h2 {
        padding: 20px;
        color: #58666e;
        font-size: 24px;
        font-weight: normal;
        border-bottom: 1px solid #dee5e7;
        background: #f6f8f8;
    }
    .table {
        padding: 20px;
        .table-btn {
            margin-top: 20px;
        }
    }
}
</style>
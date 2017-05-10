<template>
    <div class="jyc-wrap">
        <Card>
            <Row>
                <Col span="16">
                    <div class="jyc-wrap-space">
                        <Select v-model="model11" filterable>
                            <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div class="jyc-wrap-space">
                        <Select v-model="model12" filterable multiple placeholder="多选">
                            <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                model11: '',
                model12: []
            }
        }
    }
</script>
<style scoped lange="scss">
.jyc-wrap-space{
    margin-bottom: 20px;
}
</style>
<template>
    <div class="jyc-wrap">
        <h2>Form Elements</h2>
        <Card>
            <Row :gutter="16">
                <Col span="16">
                    <Row :gutter="16">
                        <Col span="10">
                            <div class="jyc-wrap-space">
                                <Input v-model="value1" placeholder="default size"></Input>
                            </div>
                            <div class="jyc-wrap-space">
                                <Input v-model="value2" disabled placeholder="不可用状态"></Input>
                            </div>
                            <div class="jyc-wrap-space">
                                <Input v-model="value3" icon="ios-clock-outline" placeholder="带Icon的输入框">
                                </Input>
                            </div>
                            <div class="jyc-wrap-space">
                                <Input v-model="value4" type="textarea" :rows="4" placeholder="文本域"></Input>
                            </div>
                        </Col>
                        <Col span="14">
                            <div class="jyc-wrap-space">
                                <Input v-model="value5" placeholder="复合型输入框">
                                    <span slot="prepend">http://</span>
                                    <span slot="append">.com</span>
                                </Input>
                            </div>
                            <div class="jyc-wrap-space">
                                 <Input v-model="value6" placeholder="复合型输入框">
                                    <Select v-model="select1" slot="prepend" style="width: 80px">
                                        <Option value="http">http://</Option>
                                        <Option value="https">https://</Option>
                                    </Select>
                                    <Select v-model="select2" slot="append" style="width: 70px">
                                        <Option value="com">.com</Option>
                                        <Option value="org">.org</Option>
                                        <Option value="io">.io</Option>
                                    </Select>
                                </Input>
                            </div>
                            <div class="jyc-wrap-space">
                                <Input v-model="value7" placeholder="复合型输入框">
                                    <Select v-model="select3" slot="prepend" style="width: 80px">
                                        <Option value="day">日活</Option>
                                        <Option value="month">月活</Option>
                                    </Select>
                                    <Button slot="append" icon="ios-search"></Button>
                                </Input>
                            </div>
                            <div class="jyc-wrap-space">
                                <Radio-group v-model="button2" type="button">
                                    <Radio label="北京"></Radio>
                                    <Radio label="上海"></Radio>
                                    <Radio label="深圳"></Radio>
                                    <Radio label="杭州"></Radio>
                                </Radio-group>
                            </div>
                            <div class="jyc-wrap-space">
                                <i-switch size="large"></i-switch>
                                <i-switch></i-switch>
                                <i-switch size="small"></i-switch>
                                <i-switch size="large" :value="true">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span="8">
                    <div class="jyc-wrap-space">
                        <Select v-model="model1" clearable>
                            <Option 
                                v-for="item in cityList" 
                                :value="item.value" 
                                :key="item">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div class="jyc-wrap-space">
                         <Select v-model="model2" disabled>
                            <Option value="beijing">北京市</Option>
                            <Option value="shanghai">上海市</Option>
                            <Option value="shenzhen">深圳市</Option>
                        </Select>
                    </div>
                    <div class="jyc-wrap-space">
                        <Select v-model="model3" multiple>
                            <Option 
                                v-for="item in cityList" 
                                :value="item.value" 
                                :key="item">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </div>
                    <div class="jyc-wrap-space">
                            <Checkbox-group v-model="fruit">
                            <Checkbox label="香蕉"></Checkbox>
                            <Checkbox label="苹果"></Checkbox>
                            <Checkbox label="西瓜" disabled></Checkbox>
                        </Checkbox-group>
                    </div>
                    <div class="jyc-wrap-space">
                        <Radio-group v-model="phone">
                            <Radio label="apple">
                                <Icon type="social-apple"></Icon>
                                <span>Apple</span>
                            </Radio>
                            <Radio label="android">
                                <Icon type="social-android"></Icon>
                                <span>Android</span>
                            </Radio>
                            <Radio label="windows" disabled>
                                <Icon type="social-windows"></Icon>
                                <span>Windows</span>
                            </Radio>
                        </Radio-group>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row :gutter="16">
                <Col span="12">
                    <Row :gutter="16">
                        <Col span="12">
                            <div class="jyc-wrap-space">
                                <Date-picker type="date" placeholder="选择日期"></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="daterange" placement="bottom-end" placeholder="选择日期范围"></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="date" :options="options1" placeholder="带有快捷选项"></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="daterange" :options="options2" placeholder="带有快捷选项日期范围"></Date-picker>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="jyc-wrap-space">
                                <Date-picker type="year" placeholder="选择年" ></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="month" placeholder="选择月" ></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="date" :options="options3" placeholder="禁用日期范围"></Date-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Date-picker type="date" :options="options4" placeholder="禁用某一天"></Date-picker>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span="12">
                    <Row :gutter="16">
                        <Col span="12">
                            <div class="jyc-wrap-space">
                                <Cascader :data="Cascader" v-model="cVal" placeholder="Cascader级联选择"></Cascader>
                            </div>
                            <div class="jyc-wrap-space">
                                <Cascader :data="Cascader" v-model="cVal2" placeholder="Cascader级联选择"></Cascader>
                            </div>
                            <div class="jyc-wrap-space">
                                <Time-picker type="time" format="HH点mm分ss秒" placeholder="选择时间"></Time-picker>
                            </div>
                            <div class="jyc-wrap-space">
                                <Time-picker type="timerange" placeholder="选择时间范围" :value="['09:41:00', '12:00:00']"></Time-picker>
                            </div>
                        </Col>
                        <Col span="12"></Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row :gutter="16">
                <Col span="12">
                    <div class="jyc-wrap-space">
                        <Transfer
                            :data="data1"
                            :target-keys="targetKeys1"
                            :render-format="render1"
                            @on-change="handleChange1">
                        </Transfer>
                    </div>
                </Col>
                <Col span="12">
                    <Row :gutter="16">
                        <Col span="24">
                            <div class="jyc-wrap-space">
                                <Input-number :max="10" :min="0" :step="1.2" v-model="value8"></Input-number>
                            </div>
                            <div class="jyc-wrap-space">
                                <Rate show-text v-model="valueText"></Rate>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row :gutter="16">
                <Col span="16">
                    <Form :model="formLeft" label-position="left" :label-width="100">
                        <Form-item label="标题">
                            <Input v-model="formLeft.input1"></Input>
                        </Form-item>
                        <Form-item label="标题名称">
                            <Input v-model="formLeft.input2"></Input>
                        </Form-item>
                        <Form-item label="标题名称对齐">
                            <Input v-model="formLeft.input3"></Input>
                        </Form-item>
                    </Form>
                    <Form :model="formRight" label-position="right" :label-width="100">
                        <Form-item label="标题">
                            <Input v-model="formRight.input1"></Input>
                        </Form-item>
                        <Form-item label="标题名称">
                            <Input v-model="formRight.input2"></Input>
                        </Form-item>
                        <Form-item label="标题名称对齐">
                            <Input v-model="formRight.input3"></Input>
                        </Form-item>
                    </Form>
                    <Form :model="formTop" label-position="top">
                        <Form-item label="标题">
                            <Input v-model="formTop.input1"></Input>
                        </Form-item>
                        <Form-item label="标题名称">
                            <Input v-model="formTop.input2"></Input>
                        </Form-item>
                        <Form-item label="标题名称对齐">
                            <Input v-model="formTop.input3"></Input>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Card>
    </div>
</template>
    </div>
<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                value7: '',
                value8: 0,
                select1: 'http',
                select2: 'com',
                select3: 'day',
                phone: 'apple',
                button2: '北京',
                fruit: ['苹果'],
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
                model1: '',
                model2: '',
                model3: [],
                options1: {
                    shortcuts: [
                        {
                            text: '今天',
                            value () {
                                return new Date();
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了今天');
                            }
                        },
                        {
                            text: '昨天',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了昨天');
                            }
                        },
                        {
                            text: '一周前',
                            value () {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                return date;
                            },
                            onClick: (picker) => {
                                this.$Message.info('点击了一周前');
                            }
                        }
                    ]
                },
                options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                },
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                options4: {
                    disabledDate (date) {
                        const disabledDay = date.getDate();
                        return disabledDay === 12;
                    }
                },
                cVal: [],
                cVal2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
                Cascader: [{value:'beijing',label:'北京',children:[{value:'gugong',label:'故宫'},{value:'tiantan',label:'天坛'},{value:'wangfujing',label:'王府井'}]},{value:'jiangsu',label:'江苏',children:[{value:'nanjing',label:'南京',children:[{value:'fuzimiao',label:'夫子庙',}]},{value:'suzhou',label:'苏州',children:[{value:'zhuozhengyuan',label:'拙政园',},{value:'shizilin',label:'狮子林',}]}],}],
                data1: this.getMockData(),
                targetKeys1: this.getTargetKeys(),
                valueText: 3,
                formLeft: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                formRight: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                formTop: {
                    input1: '',
                    input2: '',
                    input3: ''
                }
            }
        },
        methods: {
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: '内容' + i,
                        description: '内容' + i + '的描述信息',
                        disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key);
            },
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {
                console.log(newTargetKeys);
                console.log(direction);
                console.log(moveKeys);
                this.targetKeys1 = newTargetKeys;
            }
        }
    }
</script>
<style scoped lang="scss">
textarea {
    resize: none;
}
.jyc-wrap-space{
    margin-bottom: 20px;
}
.ivu-picker-panel-sidebar{
    font-size: 12px;
}
</style>
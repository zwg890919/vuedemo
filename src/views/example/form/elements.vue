<template>
    <div class="wrap">
        <h2>Form Elements</h2>
        <div class="input-wrap">
            <Row type="flex">
                <Col span="12">col-12</Col>
                <Col span="12">col-12</Col>
            </Row>
        </div>
        <div class="input-wrap input-wrap__complex">
                <Input v-model="value11" placeholder="复合型输入框">
                <span slot="prepend">http://</span>
                <span slot="append">.com</span>
                </Input>
                <Input v-model="value12" placeholder="复合型输入框">
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
                <Input v-model="value13" placeholder="复合型输入框">
                <Select v-model="select3" slot="prepend" style="width: 80px">
                    <Option value="day">日活</Option>
                    <Option value="month">月活</Option>
                </Select>
                <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <div class="radio-wrap">
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
            <div class="radio-wrap">
                <Radio-group v-model="phone" vertical>
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
            <div class="radio-wrap">
                <Radio-group v-model="button1" type="button" size="large">
                    <Radio label="北京"></Radio>
                    <Radio label="上海"></Radio>
                    <Radio label="深圳"></Radio>
                    <Radio label="杭州"></Radio>
                </Radio-group>
                <Radio-group v-model="button2" type="button">
                    <Radio label="北京"></Radio>
                    <Radio label="上海"></Radio>
                    <Radio label="深圳"></Radio>
                    <Radio label="杭州"></Radio>
                </Radio-group>
                <Radio-group v-model="button3" type="button" size="small">
                    <Radio label="北京"></Radio>
                    <Radio label="上海"></Radio>
                    <Radio label="深圳"></Radio>
                    <Radio label="杭州"></Radio>
                </Radio-group>
            </div>
            <div class="checkbox-wrap">
                <Checkbox-group v-model="fruit">
                    <Checkbox label="香蕉"></Checkbox>
                    <Checkbox label="苹果"></Checkbox>
                    <Checkbox label="西瓜" disabled></Checkbox>
                </Checkbox-group>
            </div>
            <div class="switch-wrap">
                <i-switch size="large"></i-switch>
                <i-switch></i-switch>
                <i-switch size="small"></i-switch>
            </div>
            <div class="switch-wrap">
                <i-switch size="large" :value="true">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
                <i-switch size="large" disabled>
                    <span slot="open">ON</span>
                    <span slot="close">OFF</span>
                </i-switch>
            </div>
            <div class="select-wrap">
                <Select v-model="model1">
                    <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </div>
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
                value11: '',
                value12: '',
                value13: '',
                select1: 'http',
                select2: 'com',
                select3: 'day',
                phone: 'apple',
                button1: '北京',
                button2: '北京',
                button3: '北京',
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
                model1: ''
            }
        }
    }
</script>
<style scope lang="scss">
.wrap {
    textarea {
        resize: none;
    }
    h2 {
        padding: 20px;
        color: #58666e;
        font-size: 24px;
        font-weight: normal;
        border-bottom: 1px solid #dee5e7;
        background: #f6f8f8;
    }
    .input-wrap {
        padding: 20px;
        margin: 20px;
        background: #fff;
    }
    .select-wrap {
        .ivu-select {
            width: 20%;
        }
    }
    .input-wrap__complex {
        .ivu-input-wrapper {
            width: 60%;
            margin-top: 20px;
        }
    }
    .radio-wrap,
    .checkbox-wrap,
    .switch-wrap,
    .select-wrap {
        padding: 20px;
    }
}
</style>
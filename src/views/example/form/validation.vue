<template>
    <div class="jyc-wrap">
        <Card>
            <Row>
                <Col span="16">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <Form-item prop="user">
                            <Input type="text" v-model="formInline.user" placeholder="Username">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="Password">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                            </Input>
                        </Form-item>
                        <Form-item>
                            <Button type="info" @click="handleSubmit('formInline')">登录</Button>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Card>
        <Card>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="邮箱" prop="mail">
                    <Input v-model="formValidate.mail" placeholder="请输入邮箱"></Input>
                </Form-item>
                <Form-item label="城市" prop="city">
                    <Select v-model="formValidate.city" placeholder="请选择所在地">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item label="选择日期">
                    <Row>
                        <Col span="11">
                            <Form-item prop="date">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <Form-item prop="time">
                                <Time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>
                            </Form-item>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="性别" prop="gender">
                    <Radio-group v-model="formValidate.gender">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="爱好" prop="interest">
                    <Checkbox-group v-model="formValidate.interest">
                        <Checkbox label="吃饭"></Checkbox>
                        <Checkbox label="睡觉"></Checkbox>
                        <Checkbox label="跑步"></Checkbox>
                        <Checkbox label="看电影"></Checkbox>
                    </Checkbox-group>
                </Form-item>
                <Form-item label="介绍" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="info" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
        <Card>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <Form-item label="密码" prop="passwd">
                    <Input type="password" v-model="formCustom.passwd"></Input>
                </Form-item>
                <Form-item label="确认密码" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck"></Input>
                </Form-item>
                <Form-item label="年龄" prop="age">
                    <Input type="text" v-model="formCustom.age" number></Input>
                </Form-item>
                <Form-item>
                    <Button type="info" @click="handleSubmit('formCustom')">提交</Button>
                    <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
        <Card>
            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                <Form-item
                    v-for="(item, index) in formDynamic.items"
                    :key="item"
                    :label="'项目' + (index + 1)"
                    :prop="'items.' + index + '.value'"
                    :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button type="ghost" @click="handleRemove(index)">删除</Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item>
                    <Button type="info" @click="handleSubmit('formDynamic')">提交</Button>
                    <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };

            return {
                formDynamic: {
                    items: [
                        {
                            value: ''
                        }
                    ]
                },
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    age: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.formDynamic.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formDynamic.items.splice(index, 1);
            }
        }
    }
</script>
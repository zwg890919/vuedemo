<template>
    <div class="jyc-wrap">
        <Card>
            <Tabs type="card" :value="name">
                <Tab-pane label="标签一" name="name1">
                    <Progress :percent="percent" hide-info style="margin: 20px 0;"></Progress>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
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
                            <Button type="info" @click="handleSubmit('formInline',2)">NEXT</Button>
                        </Form-item>
                    </Form>
                </Tab-pane>
                <Tab-pane label="标签二" name="name2" :disabled="disabled2">
                    <Progress :percent="percent" hide-info style="margin: 20px 0;"></Progress>
                    <Form ref="formAge" :model="modelAge" :rules="ruleAge">
                        <Form-item prop="age">
                            <Input type="text" v-model="modelAge.age" placeholder="Your age"></Input>
                        </Form-item>
                        <Form-item>
                            <Button type="info" @click="prev(1)">PREV</Button>
                            <Button type="info" @click="handleSubmit('formAge',3)">NEXT</Button>
                        </Form-item>
                    </Form>
                </Tab-pane>
                <Tab-pane label="标签三" name="name3" :disabled="disabled3">
                    <Progress :percent="percent" hide-info style="margin: 20px 0;"></Progress>
                    <Button type="info" @click="prev(2)">PREV</Button>
                    <Button type="info" @click="Finish()">Click me to Finish</Button>
                </Tab-pane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                disabled2: true,
                disabled3: true,
                name: 'name1',
                percent: 25,
                formInline: {
                    user: '',
                    password: ''
                },
                modelAge: {
                    age: ''
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
                ruleAge: {
                    age: [
                        { required: true, message: '请填写年龄', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name,index) {
                let that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        that.name = 'name' + index;
                        that['disabled' + index] = false;
                        that.percent = index * 25;
                    }
                })
            },
            Finish() {
                this.percent = 100;
            },
            prev(index) {
                this.name = 'name' + index;
                this.percent = index * 25;
            }
        }
    }
</script>
<template>
    <div class="jyc-wrap">
        <h2>Buttons</h2>
        <Card>
            <Row :gutter="16">
                <Col span="12">
                <div class="jyc-wrap-space">
                    <Button>Default</Button>
                    <Button type="primary">Primary</Button>
                    <Button type="ghost">Ghost</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="text">Text</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button type="info">信息按钮</Button>
                    <Button type="success">成功按钮</Button>
                    <Button type="warning">警告按钮</Button>
                    <Button type="error">错误按钮</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button type="primary" shape="circle" icon="ios-search"></Button>
                    <Button type="primary" icon="ios-search">搜索</Button>
                    <Button type="primary" shape="circle" icon="ios-search">搜索</Button>
                    <Button type="primary" shape="circle">圆角按钮</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button type="ghost" shape="circle" icon="ios-search"></Button>
                    <Button type="ghost" icon="ios-search">搜索</Button>
                    <Button type="ghost" shape="circle" icon="ios-search">搜索</Button>
                    <Button type="ghost" shape="circle">圆角按钮</Button>
                    <Button type="ghost" shape="circle" disabled>Disabled</Button>
                </div>
                </Col>
                <Col span="10">
                <div class="jyc-wrap-space">
                    <Button type="primary" loading>Loading...</Button>
                    <Button type="primary" :loading="loading" @click="toLoading">
                        <span v-if="!loading">Click me!</span>
                        <span v-else>Loading...</span>
                    </Button>
                    <Button type="primary" :loading="loading2" icon="checkmark-round" @click="toLoading2">
                        <span v-if="!loading2">Click me!</span>
                        <span v-else>Loading...</span>
                    </Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button-group>
                        <Button>取消</Button>
                        <Button type="primary">确定</Button>
                    </Button-group>
                    <Button-group>
                        <Button disabled>昨日</Button>
                        <Button disabled>今日</Button>
                        <Button disabled>明日</Button>
                    </Button-group>
                </div>
                <div class="jyc-wrap-space">
                    <Button-group>
                        <Button type="primary" :disabled="testCode('testCode')">
                            <Icon type="chevron-left" ></Icon>
                            前进
                        </Button>
                        <Button type="primary" :disabled="testCode('testCode3')">
                            后退
                            <Icon type="chevron-right" ></Icon>
                        </Button>
                    </Button-group>
                    <Button-group>
                        <Button type="primary" icon="ios-skipbackward"></Button>
                        <Button type="primary" icon="ios-skipforward"></Button>
                    </Button-group>
                </div>
                <div class="jyc-wrap-space">
                    <Button type="success" long :disabled="testCode('testCode')">确认提交</Button>
                </div>
                </Col>
                <Col span="2">
                <Button-group vertical>
                    <Button type="ghost" icon="social-facebook"></Button>
                    <Button type="ghost" icon="social-twitter"></Button>
                    <Button type="ghost" icon="social-googleplus"></Button>
                    <Button type="ghost" icon="social-tumblr"></Button>
                </Button-group>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            loading2: false
        }
    },
    computed: {
        codeList: vm => vm.$store.state.appMenu.codeList || [],
    },
    methods: {
        toLoading() {
            this.loading = true;
        },
        toLoading2() {
            this.loading2 = true;
        },
        testCode(code) {
            return this.codeList.indexOf(code) > -1
        }
    }
}
</script>
<style scoped lang="scss">
.jyc-wrap-space {
    margin-bottom: 20px;
}
</style>

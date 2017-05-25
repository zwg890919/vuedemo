<template>
	<div class="jyc-wrap">
        <h2>Dialog</h2>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	<Button type="info" @click="modal1 = true">显示对话框</Button>
                        <Modal
                            v-model="modal1"
                            title="普通的Modal对话框标题"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Button @click="modal2 = true">自定义页头和页脚</Button>
                        <Modal v-model="modal2" width="360">
                            <p slot="header" style="color:#f60;text-align:center">
                                <Icon type="information-circled"></Icon>
                                <span>删除确认</span>
                            </p>
                            <div style="text-align:center">
                                <p>此任务删除后，下游 10 个任务将无法执行。</p>
                                <p>是否继续删除？</p>
                            </div>
                            <div slot="footer">
                                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
                            </div>
                        </Modal>
                        <Button @click="modal3 = true">不带标题栏</Button>
                        <Modal v-model="modal3">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                        <Button @click="modal4 = true">国际化</Button>
                        <Modal
                            v-model="modal4"
                            title="Modal Title"
                            ok-text="OK"
                            cancel-text="Cancel">
                            <p>Something...</p>
                            <p>Something...</p>
                            <p>Something...</p>
                        </Modal>
                        <Button @click="modal5 = true">设置宽度</Button>
                        <Modal
                            v-model="modal5"
                            title="自定义宽度"
                            width="300">
                            <p>自定义宽度，单位 px，默认 520px。</p>
                            <p>对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动<code>auto</code>。</p>
                        </Modal>
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	<Button type="info" @click="modal6 = true">显示对话框</Button>
                        <Modal
                            v-model="modal6"
                            title="对话框标题"
                            :loading="loading"
                            @on-ok="asyncOK">
                            <p>点击确定后，对话框将在 2秒 后关闭。</p>
                        </Modal>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Button @click="modal7 = true">禁用右上角关闭（含Esc键）</Button>
                        <Modal
                            title="对话框标题"
                            v-model="modal7"
                            :closable="false">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                        <Button @click="modal8 = true">禁用遮罩层关闭</Button>
                        <Modal
                            title="对话框标题"
                            v-model="modal8"
                            :mask-closable="false">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                        <Button @click="modal9 = true">距离顶部 20px</Button>
                        <Modal
                            title="对话框标题"
                            v-model="modal9"
                            :styles="{top: '20px'}">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                        <Button @click="modal10 = true">垂直居中</Button>
                        <Modal
                            title="对话框标题"
                            v-model="modal10"
                            class-name="vertical-center-modal">
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                            <p>对话框内容</p>
                        </Modal>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Button @click="instance('info')">消息</Button>
                        <Button @click="instance('success')">成功</Button>
                        <Button @click="instance('warning')">警告</Button>
                        <Button @click="instance('error')">错误</Button>
                    </div>
                </Col>
        	</Row>
    	</Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                        <Button @click="confirm">标准</Button>
                        <Button @click="custom">自定义按钮文字</Button>
                        <Button @click="async">异步关闭</Button>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        
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
                modal1: false,
                modal2: false,
                modal_loading: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                loading: true,
                modal7: false,
                modal8: false,
                modal9: false,
                modal10: false,
            }
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.success('删除成功');
                }, 2000);
            },
            asyncOK () {
                setTimeout(() => {
                    this.modal6 = false;
                }, 2000);
            },
            instance (type) {
                const title = '对话框的标题';
                const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';
                switch (type) {
                    case 'info':
                        this.$Modal.info({
                            title: title,
                            content: content
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
            confirm () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
            },
            custom () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    okText: 'OK',
                    cancelText: 'Cancel'
                });
            },
            async () {
                this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>对话框将在 2秒 后关闭</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.remove();
                            this.$Message.info('异步关闭了对话框');
                        }, 2000);
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
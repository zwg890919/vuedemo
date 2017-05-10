<template>
	<div class="jyc-wrap">
        <h2>Dialog</h2>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	<Button type="primary" @click="modal1 = true">显示对话框</Button>
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
                    	 1
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        2
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	 1
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        2
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
                modal5: false
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
            }
        }
    }
</script>
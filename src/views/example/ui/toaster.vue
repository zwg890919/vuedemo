<template>
    <div class="jyc-wrap">
        <h2>Toaster</h2>
        <Card>
            <Row :gutter="16">
                <Col span="12">
                <div class="jyc-wrap-space">
                    <Button type="info" @click="open(false)">打开提醒</Button>
                    <Button @click="open(true)">打开提醒（仅标题）</Button>
                </div>
                <div class="jyc-wrap-space">
                    <div>带描述信息</div>
                    <Button @click="info(false)">消息</Button>
                    <Button @click="success(false)">成功</Button>
                    <Button @click="warning(false)">警告</Button>
                    <Button @click="error(false)">错误</Button>
                </div>
                <div class="jyc-wrap-space">
                    <div>仅标题</div>
                    <Button @click="info(true)">消息</Button>
                    <Button @click="success(true)">成功</Button>
                    <Button @click="warning(true)">警告</Button>
                    <Button @click="error(true)">错误</Button>
                </div>
                <div class="jyc-wrap-space">
                    <div>不会自动关闭</div>
                    <Button type="info" @click="time">打开提醒</Button>
                </div>
                </Col>
                <Col span="12">
                <div class="jyc-wrap-space">
                    <Button type="info" @click="messageInfo">显示普通提醒</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button @click="messageSuccess">显示成功提示</Button>
                    <Button @click="messageWarning">显示警告提示</Button>
                    <Button @click="messageError">显示错误提示</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button @click="messageLoading">显示加载中...</Button>
                </div>
                <div class="jyc-wrap-space">
                    <Button type="success" @click="messageOther(1)">success</Button>
                    <Button type="info" @click="messageOther(2)">info</Button>
                    <Button @click="messageOther(3)">wait</Button>
                    <Button type="error" @click="messageOther(4)">error</Button>
                    <Button type="warning" @click="messageOther(5)">warning</Button>
                </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    methods: {
        open(nodesc) {
            this.$Notice.open({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        info(nodesc) {
            this.$Notice.info({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        success(nodesc) {
            this.$Notice.success({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        warning(nodesc) {
            this.$Notice.warning({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        error(nodesc) {
            this.$Notice.error({
                title: '这是通知标题',
                desc: nodesc ? '' : '这里是通知描述这里,是通知描述这里是通知描述这里,是通知描述这里,是通知描述这里是通知描述这里是通知描述'
            });
        },
        time() {
            this.$Notice.open({
                title: '这是通知标题',
                desc: '这条通知不会自动关闭，需要点击关闭按钮才可以关闭。',
                duration: 0
            });
        },
        messageInfo() {
            this.$Message.info('这是一条普通的提醒');
        },
        messageSuccess() {
            this.$Message.success('这是一条成功的提示');
        },
        messageWarning() {
            this.$Message.warning('这是一条警告的提示');
        },
        messageError() {
            this.$Message.error('对方不想说话，并且向你抛出了一个异常');
        },
        messageLoading() {
            const msg = this.$Message.loading('正在加载中...', 0);
            setTimeout(msg, 3000);
        },
        messageOther(type) {
            switch (type) {
                case 1:
                    this.$totast.success({
                        title: 'title',
                        message: 'message'
                    });
                    break;
                case 2:
                    this.$totast.info({
                        title: 'title',
                        message: 'message'
                    });
                    break;
                case 3:
                    this.$totast.wait({
                        title: 'title',
                        message: 'message'
                    });
                    break;
                case 4:
                    this.$totast.error({
                        title: 'title',
                        message: 'message'
                    });
                    break;
                case 5:
                    this.$totast.warning({
                        title: 'title',
                        message: 'message'
                    });
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.jyc-wrap-space {
    margin-bottom: 20px;
}
</style>

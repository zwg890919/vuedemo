<template>
    <div class="jyc-wrap">
        <h2>Image Crop</h2>
        <Card>
            <Row style="margin: 10px 0;">
                <Col span="24">
                    <a href="http://vanthink-ued.github.io/vue-core-image-upload/index.html#/cn/home">详细文档http://vanthink-ued.github.io/vue-core-image-upload/index.html#/cn/home</a>
                </Col>
            </Row>
            <Row>
                <Col span="4">
                    <Button type="success" @click="toggleShow">选择图片</Button>
                    <my-upload field="img"
                        @crop-success="cropSuccess"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="show"
                        :width="200"
                        :height="200"
                        url="/upload"
                        :params="params"
                        :headers="headers"
                        img-format="png">
                    </my-upload>
                </Col>
                <Col span="20">
                    <img :src="imgDataUrl">
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
    data() {
        return {
            show: false,
            params: {
                token: '123456798',
                name: 'avatar'
            },
            headers: {
                smail: '*_~'
            },
            imgDataUrl: ''
        }
    },
    components: {
        'my-upload': myUpload
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field){
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
        },
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    }
}
</script>


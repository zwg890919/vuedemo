<template>
    <div class="wrap">
        <h2>Form Elements</h2>
        <div class="input-wrap">
            <Input v-model="value1" size="large" placeholder="large size"></Input>
            <Input v-model="value2" placeholder="default size"></Input>
            <Input v-model="value3" size="small" placeholder="small size"></Input>
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
                value3: ''
            }
        }
    }
</script>
<style scope lang="scss">
.wrap {
    h2 {
        padding: 20px;
        color: #58666e;
        font-size: 24px;
        font-weight: normal;
        border-bottom: 1px solid #dee5e7;
        background: #f6f8f8;
    }
    .ivu-input-wrapper{
        width: 20%;
    }
}
</style>
<template>
    <div class="api-details">
        <p class="api-details__title">基本信息</p>
        <div class="api-base__info">
            <p>请求类型: HTTP</p>
            <p>请求方式: GET</p>
            <p>数据类型: X-WWW-FORM-URLENCODED</p>
            <p>响应类型: JSON</p>
            <p>接口状态: 启用</p>
        </div>
        <p class="api-details__title">接口描述</p>
        <p class="api-details__title">请求头</p>
        <p class="api-details__title">请求参数</p>
        <p class="api-details__title">相应数据</p>
    </div>
</template>
<script>

</script>
<style lang="scss">
.api-details {
    padding: 10px 20px;
    &__title {
        font-size: 16px;
        font-weight: bold;
        margin: 10px 0 8px 0;
        color:#333;
    }
}
.api-base__info{
    p{
        line-height:25px;
        font-size:14px;
        color:#333;
        // font-family: 'Microsoft Yahei',tahoma,sans-serif;
    }
}
</style>

<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'app',
}
</script>

<style>
html {
    background: url("../static/images/bg.jpg");
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
}

body {
    background-color: none;
}

#app {
    font-family: "Microsoft YaHei", 微软雅黑, STXihei, 华文细黑, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
</style>

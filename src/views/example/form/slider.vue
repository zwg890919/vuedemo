<template>
    <div class="wrap">
        <h2>Slider</h2>
        <div class="slider">
            <!--基础用法-->
            <div class="slider-item">
                <span>基础用法</span>
                <Slider v-model="value1"></Slider>
                <Slider v-model="value2" range></Slider>
                <Slider v-model="value3" disabled></Slider>
            </div>
            <!--离散值-->
            <div class="slider-item">
                <span>控制每次滑动的间隔</span>
                <Slider v-model="value4" :step="10"></Slider>
            </div>
            <!--带有输入框-->
            <div class="slider-item">
                <span>带有输入框</span>
                <Slider v-model="value1" show-input></Slider>
            </div>
            <!--自定义提示-->
            <div class="slider-item">
                <span>自定义提示</span>
                <Slider v-model="value5" :tip-format="format"></Slider>
                <Slider v-model="value6" :tip-format="hideFormat"></Slider>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: 25,
                value2: [20, 50],
                value3: 40,
                value4: 30,
                value5: 60,
                value6: 40
            }
        },
        methods: {
            format (val) {
                return '进度' + val + '%';
            },
            hideFormat () {
                return null;
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
    .slider {
        padding: 20px;
        .slider-item {
            padding-top: 40px;
        }
    }
}
</style>
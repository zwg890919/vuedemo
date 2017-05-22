<template>
    <transition name="fadex">
        <div :class="'jyc-toast-'+type" class="jyc-toast">
            <button class="toast-close-button" @click="closeToast">×</button>
            <p class="toast-title">{{title}}</p>
            <p class="toast-message">{{message}}</p>
        </div>
    </transition>
</template>
<script>
export default {
    props:{
        duration: {
            type: Number,
            default: 2.5
        },
        type: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
    },
    mounted () {
        this.clearCloseTimer();
        if (this.duration !== 0 ) {
            this.closeTimer = setTimeout(() => {
                this.closeToast();
            }, this.duration * 1000);
        }
    },
    methods:{
        clearCloseTimer () {
            if (this.closeTimer) {
                clearTimeout(this.closeTimer);
                this.closeTimer = null;
            }
        },
        closeToast(){
            this.clearCloseTimer();
            this.$parent.close(this.name);
        }
    },
    beforeDestroy () {
        this.clearCloseTimer();
    }
}
</script>

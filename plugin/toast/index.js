var Toast = {};
var toastInt = function (type, tips, Vue) {
    if (document.getElementsByClassName('jyc-toast').length) {
        return;
    }
    let toastTpl = Vue.extend({
        data() {
            return {
                toastshow: true
            }
        },
        mounted() {
            var _this = this;
            setTimeout(function () {        // 4、延迟2.5秒后移除该提示
                _this.toastshow = false;
            }, 2500)
        },
        template: '<transition name="fade"><div class="jyc-toast jyc-toast-' + type + '" v-if="toastshow"><button class="toast-close-button" @click="toastshow= false">×</button><p class="toast-title">' + tips.title + '</p><p class="toast-message">' + tips.message + '</p></div></transition>'
    });
    let tpl = new toastTpl().$mount().$el;
    document.body.appendChild(tpl);
}
Toast.install = function (Vue) {

    Vue.prototype.$totast = {
        success: (tips) => {
            toastInt("success", tips, Vue);
        },
        info: (tips) => {
            toastInt("info", tips, Vue);
        },
        wait: (tips) => {
            toastInt("wait", tips, Vue);
        },
        error: (tips) => {
            toastInt("error", tips, Vue);
        },
        warning: (tips) => {
            toastInt("warning", tips, Vue);
        },
    }
}

module.exports = Toast;

import Toaster from './toastlist.vue'
import Vue from 'vue';

var Toast = {};
let top = 24;
let defaultDuration = 4.5;
let toasteInstance;
let name = 1;

function getToastInstance() {
    toasteInstance = toasteInstance || Toaster.newInstance({
        styles: {
            top: `${top}px`,
            right: 0
        }
    });

    return toasteInstance;
}

Toaster.newInstance = props => {
    const div = document.createElement('div');
    div.innerHTML = `<toaster>${props}></toaster>`;
    document.body.appendChild(div);

    const toastion = new Vue({
        el: div,
        data: props,
        components: { Toaster }
    }).$children[0];
    return {
        notice(toastProps) {
            toastion.add(toastProps);
        },
        component: toastion,
    };
}


function notice(type, options, duration) {
    const title = options.title
    const message = options.message || '';
    name++;
    let instance = getToastInstance();

    instance.notice({
        name: name.toString(),
        type: type,
        options: options,
        styles: {},
        duration: duration
        // onClose: onClose,
    });
}

Toast.install = function (Vue) {

    Vue.prototype.$totast = {
        success(tips, duration) {
            notice("success", tips, duration);
        },
        info(tips, duration) {
            notice("info", tips, duration);
        },
        wait(tips, duration) {
            notice("wait", tips, duration);
        },
        error(tips, duration) {
            notice("error", tips, duration);
        },
        warning(tips, duration) {
            notice("warning", tips, duration);
        },
    }
}

export default Toast;

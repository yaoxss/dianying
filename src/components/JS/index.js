import Vue from 'vue';
import MessageBox from './MessageBox';

export var messageBox = (function(){
    return function (opts) {
        var defaults = {
            title: '',
            content: '',
            cancel: '',
            ok: '',
            handleCancel: null,
            handleOk: null
        };
        // 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
        var MyComponent = Vue.extend(MessageBox);

        for(let attr in opts){
            defaults[attr] = opts[attr];
        }

        // createElement创建一个div
        var vm = new MyComponent({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok
            },
            methods: {
                handleCancel(){
                    // call()、apply()、bind() 都是用来重定义 this 这个对象的！
                    defaults.handleCancel && defaults.handleCancel.call(this);
                    document.body.removeChild( vm.$el );
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.bodu.removeChild( vm.$el );
                }
            }
        });

        document.body.appendChild(vm.$el);
    }
})();
//插件式封装
import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
    //创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    //根据组件构造器通过new来创建一个组件对象
    const toast = new toastConstructor()

    //将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    //将toast.$el添加到body中
    document.body.appendChild(toast.$el)

    //在Vue的原型上添加toast
    Vue.prototype.$toast = toast;
}

export default obj
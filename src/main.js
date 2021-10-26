import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//给$bus赋值一个vue实例作为事件总线
Vue.prototype.$bus = new Vue()
//安装toast插件,本质就是调用其对象(也就是obj，因为用default导出可以改名为toast)的install函数
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

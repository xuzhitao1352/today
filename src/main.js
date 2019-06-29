import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.css'
import '../public/font/iconfont.css'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

// 将axios放到Vue实例的原型中
Vue.prototype.$http = axios

// vue中间键
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

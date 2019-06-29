import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import { getUser } from './utils/auth'
import JSONbig from 'json-bigint'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.css'
import '../public/font/iconfont.css'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
// axios统一配置路径 
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 拦截器
axios.defaults.transformResponse = [function(data) {
  // 返回参数太大，用原始JSON.parse(data)转换有失精度
  // 所以需要使用第三方npm i json-bigint
  // JSONbig.parse(data)
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch(err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]
// 请求
axios.interceptors.request.use(config => {
  const user = getUser()
  if(user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应
axios.interceptors.response.use(response => {
  if(response.data.data) {
    return response.data.data
  }else {
    return response.data
  }
}, err => {
  return Promise.reject(err)
})

// 将axios放到Vue实例的原型中
Vue.prototype.$http = axios

// vue中间键
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

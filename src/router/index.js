import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    // { name: 'home', path: '/', component: () => import('@/views/home') },
    // 自动获取layout文件下的index
    { name : 'layout', path:'/', component: () => import('@/views/layout') },
    { name: 'login', path: '/login', component: () => import('@/views/login') }
  ]
})

router.beforeEach((to, from, next) => {
	nprogress.start()
	console.log(getUser())
	if(to.path !== "/login"){
		if(!getUser()){
			alert("请先登录")
			next({ name:'login' })
		}else {
			next()
		}
	}else {
		if(!getUser()){
			next()
		}else {
			next({ name:'home' })
			window.location.href = "http://localhost:8080/#/"
			window.location.reload()
		}
	}
})
router.afterEach((to,from) => {
	nprogress.done()
})
export default router
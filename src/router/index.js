import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    // { name: 'home', path: '/', component: () => import('@/views/home') },
    // 自动获取layout文件下的index
    { name: 'login', path: '/login', component: () => import('@/views/login') },
    {
      name : 'layout',
      path:'/',
      component: () => import('@/views/layout'),
      // 子路由
      children:[
        {
          name: 'home',
          path: '', // 父路由的默认内容
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'followers',
          path: '/followers',
          component: () => import('@/views/followers')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
	nprogress.start()
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
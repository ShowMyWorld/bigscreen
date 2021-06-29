import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

/**
 * 路由拦截
 * 权限验证
 */
 router.beforeEach((to, from, next) => {
  // // 进度条
  // NProgress.start()
  // // 关闭搜索面板
  // store.commit('d2admin/search/set', false)
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    //const token = util.cookies.get('token')
    // if (token && token !== 'undefined') {
    //   next()
    // } else {
      // 将当前预计打开的页面完整地址临时存储 登录后继续跳转
      // 这个 cookie(redirect) 会在登录后自动删除
      //util.cookies.set('redirect', to.fullPath)
      // 没有登录的时候跳转到登录界面
      next()
  //   }
  // } else {
  //   // 不需要身份校验 直接通过
  //   next()
  }
 
})

// router.beforeEach(function (to, from, next) {
//     if (to.matched.some(record => record.meta.requireAuth)) {
//     //   const token = store.getters.token
//     //   if (!token) {
//     //     next({name: 'Login'})
//     //     return
//     //   }
//     }
//     next()
//   })

router.afterEach(to => {
  const app = router.app
  const { name, params, query } = to
  app.$store.dispatch("page/open", { name, params, query })
})

export default router
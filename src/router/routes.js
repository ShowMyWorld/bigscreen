const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    name: 'commercial',
    redirect:'/commercial/home',
    component: () => import('@/views/commercial/commercial.vue'),
      children:[
        {
          path: '/commercial/home',
          name: 'home',
          component: () => import('@/views/commercial/sys/home/home.vue'),
          meta:{...meta,name:'首页'}
        },
        {
          path: '/commercial/bill',
          name: 'bill',
          component: () => import('@/views/commercial/sys/bill/bill.vue'),
          meta:{...meta,name:'账单'}
        }
      ]
  },
]

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 页面重定向使用 必须保留
    {
      path: '/redirect/:path*',
      component: () => import('@/views/redirect')
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    }
]

/**
 * 错误页面
 */
// const errorPage = [
//   // 404
//   {
//     path: '*',
//     name: '404',
//     component: () => import('@/pages/error-page-404')
//   }
// ]


// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut
  // ...errorPage
]

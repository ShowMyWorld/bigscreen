import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes=[
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/login/login.vue'),
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/views/main/main.vue'),
      children:[
        {
          path: '/commercial',
          name: 'commercial',
          redirect:'/commercial/home',
          component: () => import('@/views/commercial/commercial.vue'),
            children:[
              {
                path: '/commercial/home',
                name: 'home',
                component: () => import('@/views/commercial/sys/home/home.vue'),
                meta:{name:'首页'}
              },
              {
                path: '/commercial/bill',
                name: 'bill',
                component: () => import('@/views/commercial/sys/bill/bill.vue'),
                meta:{name:'账单'}
              }
            ]
        },
        {
          path: '/stationmon',
          name: 'stationmon',
          component: () => import('@/views/station-mon/station-mon.vue'),
        },
        {
          path: '/useranalysis',
          name: 'useranalysis',
          component: () => import('@/views/user-analysis/user-analysis.vue'),
        }
      ],
      meta: {
        requireAuth: false
      }
      
  },
]

const router = new VueRouter({
 
    routes,
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

export const frameInRoutes = routes
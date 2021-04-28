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
          component: () => import('@/views/commercial/commercial.vue'),
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
export default router
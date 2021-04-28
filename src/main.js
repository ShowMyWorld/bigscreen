import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueParticles from 'vue-particles'
import 'element-ui/lib/theme-chalk/index.css';
import Vcom from './components'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.use(Vcom)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
import particles from './common/particles.vue'
// import databox from './common/databox.vue'
// import heat from './common/heat.vue'
// import bsButton from './common/bs-button.vue'
// import slidenav from './common/slidenav.vue'
// import loginbg from './login/loginbg.vue'
// import icon from './icon/icon'

const components = {
  particles
  // loginbg,
  // databox,
  // heat,
  // bsButton,
  // slidenav,
  // icon
}
//const install = (Vue, options = {})
const install = (Vue) => {
  if (install.installed) return
  Object.keys(components).forEach(component => {
    Vue.component(components[component].name, components[component])
  })
  Vue.prototype.$notice = Notification
  install.installed = true
}
install.installed = false
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  install.installed = true
}

const Vcomp = {
  install
}

export default Vcomp

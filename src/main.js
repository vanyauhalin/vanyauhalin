import Vue from 'vue'
import JamIcons from 'scripts/jam-icons'

// import { gsap } from 'gsap'

import App from './App.vue'
import store from './store'

import 'styles'

Vue.config.productionTip = false

Vue.use(JamIcons)
// Vue.use(gsap)

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')

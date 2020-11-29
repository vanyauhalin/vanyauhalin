import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import isMobile from 'scripts/isMobile'
import JamIcons from 'scripts/jam-icons'

import App from './components/desktop/App.vue'
import AppMobile from './components/mobile/AppMobile.vue'
import store from './store'

import 'styles'

Vue.config.productionTip = false

Vue.use(VueScrollTo)
Vue.use(JamIcons)

new Vue({
  store,
  render: (h) => h(isMobile() ? AppMobile : App)
}).$mount('#app')

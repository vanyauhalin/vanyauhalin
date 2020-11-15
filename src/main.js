import Vue from 'vue'
import JamIcons from 'scripts/jam-icons'

import App from './App.vue'
import store from './store'

import 'styles'

Vue.config.productionTip = false

Vue.use(JamIcons)

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')

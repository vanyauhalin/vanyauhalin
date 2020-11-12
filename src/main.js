import Vue from 'vue'

import JamIcons from 'js/jam-icons'

import App from './App.vue'

// Base styles
import 'scss/base/colors.scss'
import 'scss/base/fonts.scss'
import 'scss/base/normalize.scss'

// Block styles
import 'scss/blocks/btn.scss'
import 'scss/blocks/hd.scss'
import 'scss/blocks/pg.scss'
import 'scss/blocks/sr-only.scss'

Vue.config.productionTip = false

Vue.use(JamIcons)

new Vue({
  render: (h) => h(App)
}).$mount('#app')

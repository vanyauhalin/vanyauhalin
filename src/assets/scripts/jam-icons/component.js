import JamIcons from './JamIcons.vue'

export default {
  install(Vue, options = {}) {
    Vue.component(JamIcons.name, JamIcons)

    Object.entries(options).forEach((key, value) => {
      if (JamIcons.props[key]) JamIcons.props[key].default = value
    })
  },
  add(icons) {
    JamIcons.add(icons)
  }
}

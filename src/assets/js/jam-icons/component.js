import JamIcons from 'components/JamIcons.vue'

export default {
  install(Vue, options = {}) {
    Vue.component(JamIcons.name, JamIcons)

    Object.entries(options).forEach((k, v) => {
      if (JamIcons.props[k]) JamIcons.props[k].default = v
    })
  },
  add(icons) {
    JamIcons.add(icons)
  }
}

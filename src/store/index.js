import Vue from 'vue'
import Vuex from 'vuex'

import about from './modules/about'
import contacts from './modules/contacts'
import experience from './modules/experience'
import skills from './modules/skills'
import projects from './modules/projects'

Vue.use(Vuex)

function getModule(state, name) {
  return state[Object.keys(state).find((item) => item === name)]
}
function getTag(filter) {
  return Object.keys(filter)[0]
}

const store = new Vuex.Store({
  modules: {
    about,
    contacts,
    experience,
    skills,
    projects
  },
  getters: {
    GET_TITLE: (state) => (name) => getModule(state, name).title,
    GET_CTX: (state) => (name) => {
      const mod = getModule(state, name)
      const tag = { name: getTag(mod.filter) }
      tag.selected = mod.filter[tag.name].selected

      if (tag.selected.length === 0) return mod.ctx

      const ctx = []

      mod.ctx.forEach((item) => {
        let amount = 0

        for (amount; amount < tag.selected.length; amount += 1) {
          if (!item.tags[tag.name].includes(tag.selected[amount])) break
        }

        if (amount === tag.selected.length) ctx.push(item)
      })

      return ctx
    },
    GET_TAG: (state) => (name) => {
      const mod = getModule(state, name)

      return mod.filter[getTag(mod.filter)].items
    }
  },
  mutations: {
    FILTERING_CTX: (state, payload) => {
      const mod = getModule(state, payload.name)

      mod.filter[getTag(mod.filter)].selected = payload.selected
    }
  }
})

export default store

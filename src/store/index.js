import Vue from 'vue'
import Vuex from 'vuex'

import about from './modules/about'
import contacts from './modules/contacts'
import experience from './modules/experience'
import skills from './modules/skills'
import projects from './modules/projects'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    about,
    contacts,
    experience,
    skills,
    projects
  }
})

export default store

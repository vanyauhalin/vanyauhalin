<template>
  <div id="app">
    <aside class="m-app__navbar">
      <TheNavbar />
    </aside>
    <main class="app__main m-app__main">
      <SectionsAbout />
      <hr class="line line_gap_minified">
      <SectionsSkills />
      <hr class="line">
      <SectionsTemplate
        v-for="section in sections"
        :key="section.name"
        :name="section.name"
        :filter="section.filter"
      />
      <SectionsContacts />
    </main>
  </div>
</template>

<script>
import app from 'mixins/app'

import SectionsSkills from 'default/sections/skills/index.vue'
import SectionsContacts from 'default/sections/Contacts.vue'

import SectionsAbout from './components/SectionsAbout.vue'
import SectionsTemplate from './components/SectionsTemplate.vue'
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'AppMobile',
  components: {
    SectionsSkills,
    SectionsContacts,
    SectionsAbout,
    SectionsTemplate,
    TheNavbar
  },
  mixins: [app]
}
</script>

<style lang="scss" scoped>
.m-app__navbar {
  position: fixed;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
}

.m-app__main {
  margin-bottom: $pd-1 * 2 + 28px;
  padding: ($main-pd-x - $main-br / 2) / 2 $main-pd-y - $main-br;
}
</style>

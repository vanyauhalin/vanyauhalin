<template>
  <div id="app">
    <aside class="app__navbar">
      <TheNavbar />
    </aside>
    <main class="app__main">
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
import sections from 'mixins/sections'

import SectionsSkills from 'default/sections/skills/index.vue'
import SectionsContacts from 'default/sections/SectionsContacts.vue'

import TheNavbar from './components/TheNavbar.vue'

import SectionsAbout from './components/sections/SectionsAbout.vue'
import SectionsTemplate from './components/sections/SectionsTemplate.vue'

export default {
  name: 'App',
  components: {
    SectionsSkills,
    SectionsContacts,
    SectionsAbout,
    SectionsTemplate,
    TheNavbar
  },
  mixins: [sections]
}
</script>

<style lang="scss" scoped>
.app__main {
  padding: ($main-pd-x - $main-br / 2) / 2 $main-pd-y - $main-br;
  margin-bottom: $pd-1 * 2 + 28px;
}
</style>

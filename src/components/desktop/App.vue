<template>
  <div id="app">
    <div class="app__inner">
      <div class="app__content">
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
    </div>
  </div>
</template>

<script>
import sections from 'mixins/sections'

import SectionsSkills from 'default/sections/skills/index.vue'
import SectionsContacts from 'default/sections/SectionsContacts.vue'

import SectionsAbout from './components/sections/SectionsAbout.vue'
import SectionsTemplate from './components/sections/SectionsTemplate.vue'
import TheNavbar from './components/TheNavbar.vue'

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
.app__inner {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: linear-gradient(to right, var(--cl-neutral-01) 50%, var(--cl-neutral-06) 0%);
}

.app__content {
  $content-pd-percent: 100 * 100 / 1080;
  $content-hg: (100 - $content-pd-percent * 2) * 1%;

  position: relative;

  display: flex;

  height: $content-hg;
  padding: 100% - $content-hg 0;

  background-color: var(--cl-neutral-01);

  &::before {
    position: absolute;
    z-index: -1;
    top: 0;
    right: - $content-pd;
    bottom: 0;
    left: - $content-pd;

    display: flex;
    overflow: hidden;

    content: '';

    background-color: var(--cl-neutral-01);
  }
}

.app__navbar {
  width: $content-pd;
}

.app__main {
  box-sizing: border-box;
  width: $main-wd;
  padding: $main-pd-y - $main-br $main-pd-x - $main-br / 2;

  border: $main-br solid var(--cl-neutral-06);
  border-left: none;
}
</style>

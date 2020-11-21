<template>
  <div id="app">
    <div class="app__inner">
      <div class="app__content">
        <aside class="app__navbar">
          <AppNavbar />
        </aside>
        <main class="app__main">
          <SectionAbout />
          <hr class="line line_gap_minified">
          <SectionSkills />
          <hr class="line">
          <SectionProjects />
          <hr class="line">
          <SectionExperience />
          <hr class="line">
          <SectionContacts />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import SectionAbout from './components/sections/SectionAbout.vue'
import SectionContacts from './components/sections/SectionContacts.vue'
import SectionExperience from './components/sections/SectionExperience.vue'
import SectionProjects from './components/sections/SectionProjects.vue'
import SectionSkills from './components/sections/SectionSkills.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    SectionAbout,
    SectionContacts,
    SectionExperience,
    SectionProjects,
    SectionSkills
  }
}
</script>

<style lang="scss" scoped>
$content-pd: 100px;

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

  display: flex;
  overflow: hidden;

  height: (100 - $content-pd-percent * 2) * 1%;
  padding: $content-pd;

  background-color: var(--cl-neutral-01);
}

.app__navbar {
  width: $content-pd;
}

.app__main {
  overflow-x: hidden;
  overflow-y: overlay;

  box-sizing: border-box;
  width: $main-wd;
  padding: $main-pd-y - $main-br $main-pd-x - $main-br / 2;

  border: $main-br solid var(--cl-neutral-06);
  border-left: none;
  background-color: var(--cl-neutral-01);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    outline: $main-br solid var(--cl-neutral-03);
    background-color: var(--cl-neutral-03);
  }
}
</style>

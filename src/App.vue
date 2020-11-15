<template>
  <div id="app">
    <div class="app__inner">
      <div class="app__content">
        <aside class="app__navbar">
          <AppNavbar />
        </aside>
        <main class="app__main">
          <SectionAbout />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from 'components/AppNavbar.vue'
import SectionAbout from 'components/sections/SectionAbout.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    SectionAbout
  }
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

  background-image: linear-gradient(to right, var(--cl-neutral-01) 50%, var(--cl-neutral-04) 0%);
}

.app__content {
  display: flex;
  overflow: hidden;

  height: (100 - 100 * 100 / 1080 * 2) * 1%;
  padding: 100px;

  background-color: var(--cl-neutral-01);
}

.app__navbar {
  width: 100px;
}

.app__main {
  overflow-x: hidden;
  overflow-y: auto;

  box-sizing: border-box;
  width: 856px;
  padding: 35px - 4px 40px - 4px;

  border: 4px solid var(--cl-neutral-04);
  border-left: none;
  background-color: var(--cl-neutral-01);
}
</style>

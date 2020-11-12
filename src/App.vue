<template>
  <div id="app">
    <div class="app__inner">
      <aside class="app__navbar">
        <AppNavbar />
      </aside>
    </div>
  </div>
</template>

<script>
import AppNavbar from 'components/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    AppNavbar
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
}
</style>

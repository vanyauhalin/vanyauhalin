<template>
  <div id="app">
    <div class="app_inner">
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
.app_inner {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .a,
  + .t {
    color: blue;
  }

  &.test {
    color: red;
  }
}
</style>

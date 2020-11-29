<template>
  <nav class="navbar">
    <ul class="navbar__nav">
      <li
        class="navbar__item"
        v-for="item in nav"
        :key="item.name"
      >
        <a
          class="navbar__link"
          :class="setClassLink(item.active)"
          href="#"
          v-scroll-to="item.scroll"
        >
          <div class="navbar__icon">
            <JamIcons
              :name="item.icon"
              width="28"
              height="28"
            />
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import navbar from 'mixins/navbar'

export default {
  name: 'TheNavbar',
  mixins: [navbar],
  data() {
    return {
      scrollable: {
        el: document.getElementsByTagName('body')[0]
      }
    }
  },
  mounted() {
    this.setItems()
    this.setItemsHg()
    this.setItemsLink()
    this.setScrollOptions()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;

  .navbar__nav {
    display: flex;
    justify-content: space-between;

    padding: $pd-1;
  }
}
</style>

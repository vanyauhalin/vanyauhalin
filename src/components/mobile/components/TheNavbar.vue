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
          :aria-label="item.name"
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
import { padding, line } from 'scripts/variables'

import navbar from 'mixins/navbar'

export default {
  name: 'TheNavbar',
  mixins: [navbar],
  data() {
    return {
      offset: [{
        top: padding.m,
        bottom: line.minified
      }, {
        bottom: padding.m
      }]
    }
  },
  mounted() {
    this.setItems()
    this.setItemsOffset()
    this.setItemsHg()
    this.setItemsActive()
    this.setScrollOptions()
  }
}
</script>

<style lang="scss" scoped>
.navbar__nav {
  display: flex;
  justify-content: space-between;

  padding: $pd-1;
}
</style>

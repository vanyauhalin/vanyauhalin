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
              width="36"
              height="36"
            />
          </div>
          <p class="pr pr_l_2 navbar__pr">
            {{ item.name }}
          </p>
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
      border: true,
      offset: [{
        top: padding.d,
        bottom: line.minified
      }, {
        bottom: padding.d
      }],
      scrollable: {
        class: 'app__main'
      }
    }
  },
  mounted() {
    this.setScrollable()
    this.setItems()
    this.setItemsOffset()
    this.setItemsHg()
    this.setItemsActive()
    this.setScrollOptions()
  },
  methods: {
    setScrollable() {
      this.scrollable = {
        ...JSON.parse(JSON.stringify(this.scrollable)),
        el: document.getElementsByClassName(this.scrollable.class)[0],
        container: `.${this.scrollable.class}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;

  .navbar__nav {
    padding: $main-pd-y $pd-1;
  }

  .navbar__item {
    margin-bottom: $main-pd-y - $main-br;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .navbar__link {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .navbar__icon {
    margin-bottom: $mg-3;
  }
}
</style>

<template>
  <nav class="navbar">
    <ul class="navbar__nav">
      <li
        class="navbar__item"
        v-for="(item, index) in nav"
        :key="item.name"
      >
        <a
          class="navbar__link"
          :class="setClassLink(item.active)"
          href="#"
          v-scroll-to="scrollOptions({ anchor: item.anchor, offset: item.offset, index })"
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
import {
  duration, border, padding, line
} from 'scripts/variables'

export default {
  name: 'AppNavbar',
  data() {
    return {
      nav: [{
        icon: 'user-square',
        name: 'About',
        anchor: 'about',
        offset: {
          top: padding - border,
          bottom: line.minified
        }
      }, {
        icon: 'keyboard',
        name: 'Skills',
        anchor: 'skills'
      }, {
        icon: 'merge',
        name: 'Projects',
        anchor: 'projects'
      }, {
        icon: 'universe',
        name: 'Experience',
        anchor: 'experience'
      }, {
        icon: 'envelope',
        name: 'Contacts',
        anchor: 'contacts',
        offset: {
          bottom: padding - border
        },
        line: false
      }],
      main: {
        class: 'app__main'
      },
      link: {
        class: 'navbar__link_active_true'
      }
    }
  },
  mounted() {
    this.setMain()
    this.setItems()
    this.setItemsHg()
    this.setItemsLink()
  },
  methods: {

    /**
     * Set data about main container
     * -------------------------------------------------------------------------
     */

    setMain() {
      this.main = {
        ...JSON.parse(JSON.stringify(this.main)),
        el: document.getElementsByClassName(this.main.class)[0]
      }
    },

    /**
     * Set data about nav
     * -------------------------------------------------------------------------
     */

    setNav(key, value) {
      const nav = []

      this.nav.forEach((item, index) => {
        nav.push({
          ...this.nav[index],
          [key]: value(item, index)
        })
      })

      this.nav = nav
    },

    /**
     * Set data about items
     * -------------------------------------------------------------------------
     */

    setItems() {
      this.setNav('el', (item) => document.getElementById(item.anchor))
    },
    setItemsHg() {
      const key = 'hg'

      this.setNav(key, (item) => this.setItemsOffset(item) + item.el.clientHeight)
      this.setItemsEvent(key, (item) => this.setItemsOffset(item) + item.el.clientHeight)
    },
    setItemsLink() {
      const key = 'active'

      this.setNav(key, (item, index) => this.setItemsActive(index))
      this.setItemsEvent(key, (item, index) => this.setItemsActive(index))
    },
    setItemsEvent(key, value) {
      this.nav.forEach((item, index) => {
        this.main.el.addEventListener('scroll', () => {
          this.nav[index][key] = value(item, index)
        })
      })
    },
    setItemsOffset(item) {
      let offset = 0

      if (typeof item.offset === 'undefined') {
        offset = line.bottom + line.top
      } else {
        typeof item.offset.top === 'undefined'
          ? offset += line.bottom
          : offset += item.offset.top
        typeof item.offset.bottom === 'undefined'
          ? offset += line.top
          : offset += item.offset.bottom
      }

      return offset
    },
    setItemsActive(index) {
      const { el } = this.main
      const { hg } = this.nav[index]

      let active = false

      if (typeof this.nav[index - 1] === 'undefined') {
        active = el.scrollTop < hg || el.scrollTop === hg
      } else {
        let fullHg = 0

        for (let n = 0; n < index; n += 1) fullHg += this.nav[n].hg

        active = el.scrollTop > fullHg && (el.scrollTop < fullHg + hg || el.scrollTop === fullHg)
      }

      return active
    },

    /**
     * Scroll options
     * -------------------------------------------------------------------------
     */

    setClassLink(active) {
      return active ? this.link.class : ''
    },
    scrollOptions({ anchor, offset = {}, index }) {
      let off = 0

      typeof offset.top === 'undefined'
        ? off = -line.bottom
        : off = -offset.top

      if (index === 0) off -= border

      return {
        el: `#${anchor}`,
        container: `.${this.main.class}`,
        duration: (duration / 2) * 1000,
        lazy: false,
        offset: off
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;

  background-color: var(--cl-neutral-06);

  .navbar__nav {
    padding: $main-pd-y 15px;
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

    text-decoration: none;

    &:hover,
    &:focus {
      > .navbar__icon,
      > .navbar__pr {
        color: var(--cl-neutral-01);
      }
    }
  }

  .navbar__link_active_true {
    > .navbar__icon,
    > .navbar__pr {
      color: var(--cl-neutral-01);
    }
  }

  .navbar__icon {
    display: flex;

    margin-bottom: $mg-2;
  }

  .navbar__icon,
  .navbar__pr {
    transition: color $sec-1 ease-in-out;

    color: var(--cl-neutral-04);
  }
}
</style>

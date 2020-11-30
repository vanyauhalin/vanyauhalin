import {
  duration, border, padding, line
} from 'scripts/variables'

export default {
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
      scrollable: {
        class: 'app__main'
      },
      link: {
        class: 'navbar__link_active_true'
      }
    }
  },
  mounted() {
    this.setScrollable()
    this.setItems()
    this.setItemsHg()
    this.setItemsLink()
    this.setScrollOptions()
  },
  methods: {

    /**
     * Set data about scrollable container
     * -------------------------------------------------------------------------
     */

    setScrollable() {
      this.scrollable = {
        ...JSON.parse(JSON.stringify(this.scrollable)),
        el: document.getElementsByClassName(this.scrollable.class)[0]
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
        this.scrollable.el.addEventListener('scroll', () => {
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
      const { el } = this.scrollable
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

    setScrollOptions() {
      const key = 'scroll'

      this.setNav(key, (item, index) => {
        let off = 0

        item.offset === 'undefined' && typeof item.offset.top === 'undefined'
          ? off = -item.offset.top
          : off = -line.bottom

        if (index === 0) off -= border

        return {
          el: `#${item.anchor}`,
          container: `.${this.scrollable.class}`,
          duration: (duration / 2) * 1000,
          lazy: false,
          offset: off
        }
      })
    },
    setClassLink(active) {
      return active ? this.link.class : ''
    }
  }
}

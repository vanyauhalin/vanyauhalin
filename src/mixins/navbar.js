import {
  duration, border, line
} from 'scripts/variables'

export default {
  data() {
    return {
      nav: [{
        icon: 'user-square',
        name: 'About',
        anchor: 'about'
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
        line: false
      }],
      link: {
        class: 'navbar__link_active_true'
      }
    }
  },
  methods: {

    /**
     * Set data about nav
     * -------------------------------------------------------------------------
     */

    setNav(key, value) {
      const nav = []

      this.nav.forEach((item, index) => {
        nav.push({
          ...item,
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
    setItemsOffset() {
      const key = 'offset'
      const nav = []

      this.nav.forEach((item, index) => {
        switch (index) {
          case 0: {
            nav.push({
              ...item,
              [key]: this.offset[0]
            })

            break
          }
          case this.nav.length - 1: {
            nav.push({
              ...item,
              [key]: this.offset[1]
            })

            break
          }
          default: {
            nav.push({
              ...item
            })

            break
          }
        }
      })

      this.nav = nav
    },
    setItemsHg() {
      const key = 'hg'

      this.setNav(key, (item) => this.calcItemsOffset(item) + item.el.clientHeight)
      this.setItemsEvent(key, (item) => this.calcItemsOffset(item) + item.el.clientHeight)
    },
    setItemsActive() {
      const key = 'active'

      this.setNav(key, (item, index) => this.getItemsStatus(index))
      this.setItemsEvent(key, (item, index) => this.getItemsStatus(index))
    },
    setItemsEvent(key, value) {
      this.nav.forEach((item, index) => {
        const el = typeof this.scrollable === 'undefined'
          ? document
          : this.scrollable.el

        el.addEventListener('scroll', () => {
          this.nav[index][key] = value(item, index)
        })
      })
    },

    /**
     * Other
     * -------------------------------------------------------------------------
     */

    calcItemsOffset(item) {
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
    getItemsStatus(index) {
      const { hg } = this.nav[index]
      const scroll = typeof this.scrollable === 'undefined'
        ? window.scrollY
        : this.scrollable.el.scrollTop

      let active = false

      if (typeof this.nav[index - 1] === 'undefined') {
        active = scroll < hg || scroll === hg
      } else {
        let fullHg = 0

        for (let n = 0; n < index; n += 1) fullHg += this.nav[n].hg

        active = scroll > fullHg && (scroll < fullHg + hg || scroll === fullHg)
      }

      return active
    },

    /**
     * Scroll options
     * -------------------------------------------------------------------------
     */

    setScrollOptions() {
      const key = 'scroll'

      this.setNav(key, (item) => {
        let off = 0

        if (typeof item.offset === 'undefined') {
          off = line.bottom
        } else {
          typeof item.offset.top === 'undefined'
            ? off = line.bottom
            : off = item.offset.top
        }

        if (this.border) off += border

        return {
          container: typeof this.scrollable === 'undefined'
            ? 'body'
            : this.scrollable.container,
          el: `#${item.anchor}`,
          duration: (duration / 2) * 1000,
          lazy: false,
          offset: -off
        }
      })
    },
    setClassLink(active) {
      return active ? this.link.class : ''
    }
  }
}

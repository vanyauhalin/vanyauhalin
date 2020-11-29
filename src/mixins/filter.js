import { gsap } from 'gsap'
import { duration } from 'scripts/variables'
import { mapGetters, mapMutations } from 'vuex'

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 10))
}

export default {
  data() {
    return {
      isMounted: false,
      warning: {
        status: false,
        class: 'section__warning'
      },
      ctx: {
        class: 'section__list'
      },
      container: {
        status: false,
        class: 'filter__container'
      },
      list: {
        class: 'filter__list',
        items: [],
        selected: false
      },
      hg: {},
      toggle: {
        class: 'filter__button',
        width: 18,
        height: 18,
        icon: {
          filter: 'filter',
          clear: 'close'
        }
      },
      selected: []
    }
  },
  computed: {
    ...mapGetters({
      tag: 'GET_TAG'
    })
  },
  mounted() {
    this.setWarning()
    this.setCtx()
    this.setContainer()
    this.setList()
  },
  methods: {
    ...mapMutations({
      filtering: 'FILTERING_CTX'
    }),

    /**
     * Set data
     * -------------------------------------------------------------------------
     */

    setWarning() {
      this.warning = {
        ...JSON.parse(JSON.stringify(this.warning)),
        el: this.$parent.$el.getElementsByClassName(this.warning.class)[0]
      }
    },
    setCtx() {
      const el = this.$parent.$el.getElementsByClassName(this.ctx.class)[0]

      delay().then(() => {
        this.ctx = {
          ...JSON.parse(JSON.stringify(this.ctx)),
          el,
          hg: el.offsetHeight
        }
      })
    },
    setContainer() {
      this.container = {
        ...JSON.parse(JSON.stringify(this.container)),
        el: this.$el.getElementsByClassName(this.container.class)[0]
      }
    },
    setList() {
      this.list = {
        ...JSON.parse(JSON.stringify(this.list)),
        el: this.$el.getElementsByClassName(this.list.class)[0],
        items: this.tag(this.name)
      }
    },
    setListHg() {
      this.showContainer()

      this.list = {
        ...JSON.parse(JSON.stringify(this.list)),
        hg: this.list.el.offsetHeight
      }

      this.isMounted = true
    },

    /**
     * Show
     * -------------------------------------------------------------------------
     */

    showCtx() {
      this.ctx.el.setAttribute('style', '')
    },
    showContainer() {
      this.container.el.setAttribute('style', 'display: block', 'opacity: 0')
    },

    /**
     * Transitions
     * -------------------------------------------------------------------------
     */

    ctxTransition({ reset = false } = {}) {
      const { ctx, container, list } = this

      if (reset) {
        gsap.fromTo(ctx.el, {
          height: ctx.el.offsetHeight
        }, {
          duration,
          height: ctx.hg
        }).then(() => this.showCtx())
      } else {
        const from = {
          duration,
          minHeight: ctx.el.offsetHeight
        }
        const to = {
          duration,
          minHeight: list.hg
        }

        container.status
          ? gsap.fromTo(ctx.el, to, from)
          : gsap.fromTo(ctx.el, from, to)
      }
    },
    listTransition() {
      const { container } = this

      const from = {
        display: 'none',
        opacity: 0,
        x: '10%',
        duration: duration / 2
      }
      const to = {
        display: 'block',
        opacity: 1,
        x: '0%',
        duration: duration / 2
      }

      container.status
        ? gsap.fromTo(container.el, to, from)
        : gsap.fromTo(container.el, from, to)
    },
    jointTransition({ reset = false } = {}) {
      const { ctx, container, list } = this

      if (reset) {
        this.ctxTransition({ reset })
      } else {
        this.showCtx()

        if (list.hg > ctx.el.offsetHeight) this.ctxTransition()
      }
      if (reset && !container.status) return

      this.listTransition()

      this.container.status = !container.status
    },

    /**
     * Other
     * -------------------------------------------------------------------------
     */

    changeListDisplay() {
      if (!this.isMounted) this.setListHg()

      this.jointTransition()
    },
    resetFilter() {
      // Открывается список, когда нажимаешь на закрыть при закрытом списке

      this.selected = []

      this.jointTransition({ reset: true })
      this.filtering({ name: this.name, selected: this.selected })
    }
  },
  watch: {
    selected() {
      this.list.selected = this.selected.length > 0

      this.showWarning()
    }
  }
}

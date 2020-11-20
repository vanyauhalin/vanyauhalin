<template>
  <button
    class="toggle"
    v-if="toggle.status"
    @click="changeContainerHeight"
  >
    <JamIcons
      :name="toggle.icon.current"
      width="19"
      height="19"
    />
  </button>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'DropdownToggle',
  data() {
    return {
      container: {},
      toggle: {
        status: true,
        icon: {
          current: 'chevron-down',
          close: 'close'
        }
      },
      duration: 0.9
    }
  },
  props: {
    eclipse: {
      type: [String, Boolean],
      default: false
    },
    lengthMin: {
      type: [String, Number],
      default: 1
    },
    lengthMax: {
      type: [String, Number],
      required: true
    }
  },
  mounted() {
    this.container = {
      length: {
        min: Number(this.lengthMin),
        max: Number(this.lengthMax)
      }
    }
    const { container } = this

    if (container.length.max > container.length.min) {
      this.setContainer()
      this.setToggle()
      this.changeContainerHeight({ firstMount: true })
    } else {
      this.toggle.status = false
    }
  },
  methods: {
    setContainer() {
      const parent = this.$el.parentElement
      const ctx = { selector: 'data-num' }
      const { container } = this

      ctx.el = parent.querySelector(`[${ctx.selector}="${container.length.min}"]`)
      ctx.rect = ctx.el.getBoundingClientRect()
      container.el = ctx.el.parentElement
      container.rect = container.el.getBoundingClientRect()

      this.container = {
        el: container.el,
        reverse: true,
        height: {
          min: container.rect.height - (container.rect.bottom - ctx.rect.bottom),
          max: 'auto'
        },
        length: {
          ...JSON.parse(JSON.stringify(container.length))
        }
      }
    },
    setToggle() {
      const { toggle } = this
      this.toggle = {
        ...JSON.parse(JSON.stringify(toggle)),
        icon: {
          ...JSON.parse(JSON.stringify(toggle.icon)),
          open: toggle.icon.current
        }
      }
    },

    childrenTransition({ reverse = false } = {}) {
      const { container } = this
      const children = container.el.children[container.length.min - 1]

      reverse
        ? children.setAttribute('style', 'overflow: hidden; white-space: no-wrap')
        : children.setAttribute('style', 'overflow: visible; white-space: normal')
    },
    containerTransition({ animation = true } = {}) {
      const { container } = this
      const to = {
        height: container.reverse ? container.height.min : container.height.max,
        duration: this.duration
      }

      if (animation) {
        if (this.eclipse === 'true') {
          if (container.reverse) {
            gsap.to(container.el, to).then(() => {
              this.childrenTransition({ reverse: !container.reverse })
            })
          } else {
            this.childrenTransition()
            gsap.to(container.el, to)
          }
        } else {
          gsap.to(container.el, to)
        }
      } else {
        this.container.el.setAttribute('style', `height: ${to.height}px`)
      }
    },
    toggleTransition() {
      const options = {
        icon: this.$el.children[0].children[0],
        opacity: {
          enter: 1,
          leave: 0
        },
        y: {
          enter: 0,
          leave: this.container.reverse ? -3 : 3
        },
        duration: this.duration / 2
      }
      const from = {
        opacity: options.opacity.enter,
        y: options.y.enter
      }

      gsap.fromTo(options.icon, from, {
        opacity: options.opacity.leave,
        y: options.y.leave,
        duration: options.duration
      }).then(() => this.changeIcons()).then(() => {
        gsap.fromTo(options.icon, {
          opacity: options.opacity.leave,
          y: -options.y.leave
        }, {
          ...from,
          duration: options.duration
        })
      })
    },
    jointTransition() {
      this.containerTransition()
      this.toggleTransition()
    },

    changeIcons() {
      const { toggle } = this

      this.container.reverse
        ? this.toggle.icon.current = toggle.icon.close
        : this.toggle.icon.current = toggle.icon.open
    },
    changeContainerHeight({ firstMount = false } = {}) {
      firstMount
        ? this.containerTransition({ animation: false })
        : this.jointTransition()

      this.container.reverse = !this.container.reverse
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  display: flex;

  padding: 0;

  transition: transform $sec-1 ease-in-out;

  color: var(--cl-neutral-04);
  background-color: transparent;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
}
</style>

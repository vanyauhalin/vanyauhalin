<template>
  <button
    class="toggle"
    v-if="toggleOptions.status"
    @click="changeContainerHeight"
  >
    <JamIcons
      :name="toggleOptions.icon.current"
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
      containerOptions: {},
      toggleOptions: {
        status: true,
        icon: {
          current: 'chevron-down',
          close: 'close'
        }
      },
      transitionDuration: 0.9
    }
  },
  props: {
    ctx: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) => typeof item === 'string')
      }
    },
    container: {
      type: Object,
      validator(value) {
        return typeof value.length.min === 'number'
      },
      default() {
        return {
          length: {
            min: 1
          }
        }
      }
    }
  },
  mounted() {
    if (this.ctx.length > this.container.length.min) {
      this.setContainerOptions()
      this.setToggleOptions()
      this.changeContainerHeight({ animation: false, firstMount: true })
    } else {
      this.toggleOptions.status = false
    }
  },
  methods: {
    setContainerOptions() {
      const section = this.$parent.$el.id
      const container = {
        selector: 'data-container-num',
        length: {
          min: this.container.length.min
        }
      }
      const ctx = {
        selector: 'data-num'
      }

      container.num = Number(this.$el.getAttribute(container.selector))
      container.alone = container.num === 0

      if (container.alone) {
        ctx.el = document.querySelector(`#${section} [${ctx.selector}="${container.length.min}"]`)
      } else {
        const els = document.querySelectorAll(`#${section} [${container.selector}="${container.num}"]`)
        ctx.el = Array.prototype.slice.call(els).find(
          (el) => Number(el.getAttribute(ctx.selector)) === container.length.min
        )
      }

      ctx.rect = ctx.el.getBoundingClientRect()
      container.el = ctx.el.parentElement
      container.rect = container.el.getBoundingClientRect()

      this.containerOptions = {
        el: container.el,
        alone: container.alone,
        reverse: false,
        height: {
          min: container.rect.height - (container.rect.bottom - ctx.rect.bottom),
          max: 'auto'
        },
        length: {
          current: container.length.min,
          min: container.length.min,
          max: this.ctx.length
        }
      }
    },
    setToggleOptions() {
      const options = this.toggleOptions
      this.toggleOptions = {
        ...JSON.parse(JSON.stringify(options)),
        icon: {
          ...JSON.parse(JSON.stringify(options.icon)),
          open: options.icon.current
        }
      }
    },

    containerTransition(height) {
      gsap.to(this.containerOptions.el, {
        height,
        duration: this.transitionDuration
      })
    },
    toggleTransition(reverse) {
      const options = {
        icon: this.$el.children[0].children[0],
        opacity: {
          enter: 1,
          leave: 0
        },
        y: {
          enter: 0,
          leave: reverse ? -3 : 3
        },
        duration: this.transitionDuration / 2
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
    jointTransition(reverse, height) {
      this.containerTransition(height)
      this.toggleTransition(reverse)
    },

    changeIcons() {
      const options = this.toggleOptions

      this.toggleOptions.icon.current === options.icon.close
        ? this.toggleOptions.icon.current = options.icon.open
        : this.toggleOptions.icon.current = options.icon.close
    },
    changeContainerHeight({ animation = true, firstMount = false } = {}) {
      const options = this.containerOptions
      this.containerOptions.reverse = !options.reverse
      const height = options.reverse ? options.height.min : options.height.max
      const length = options.reverse ? options.length.min : options.length.max

      if (!options.alone && !firstMount) {
        const children = options.el.children[options.length.min - 1]
        const duration = this.transitionDuration * 1000

        options.length.current === options.length.min
          ? children.setAttribute('style', 'overflow: visible; white-space: normal')
          : setTimeout(() => children.setAttribute('style', 'overflow: hidden; white-space: no-wrap'), duration)
      }

      animation
        ? this.jointTransition(options.reverse, height)
        : options.el.setAttribute('style', `height: ${height}px`)

      this.containerOptions.length.current = length
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

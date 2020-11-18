<template>
  <section
    id="about"
    class="about"
  >
    <div class="about__main">
      <h1 class="hd hd_l_1">
        {{ title }}
      </h1>
      <div :class="ctx.modification">
        <p
          class="pr pr_l_1"
          v-for="(item, index) in ctxData"
          :key="item"
          :data-pr-index="index + 1"
        >
          {{ item }}
        </p>
      </div>
      <button
        class="about__toggle"
        v-if="toggle.status"
        @click="changeCtx"
      >
        <JamIcons
          :id="`${toggle.modification}_${toggle.icon.current}`"
          :name="toggle.icon.current"
          width="19"
          height="19"
        />
      </button>
    </div>
    <div>
      <div class="about__image">
        <img
          :src="require(`images/avatar.jpg`)"
          alt="Avatar"
          width="140"
          height="140"
        >
      </div>
      <button class="btn">
        Download
      </button>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { mapGetters } from 'vuex'

export default {
  name: 'SectionAbout',
  data() {
    return {
      ctx: {
        modification: 'about__ctx',
        length: {
          min: 2
        }
      },
      toggle: {
        status: true,
        modification: 'about__toggle_icon',
        icon: {
          current: 'chevron-down',
          close: 'close'
        }
      },
      transitionDuration: 0.9
    }
  },
  computed: {
    ...mapGetters({
      title: 'GET_ABOUT_TITLE',
      ctxData: 'GET_ABOUT_CTX'
    })
  },
  mounted() {
    this.setCtx()
    this.setToggle()

    this.ctx.length.max > this.ctx.length.min
      ? this.closeCtx({ animation: false })
      : this.toggle.status = false
  },
  methods: {
    setCtx() {
      const child = document.querySelector(`[data-pr-index="${this.ctx.length.min}"]`)
      const childRect = child.getBoundingClientRect()
      const el = document.getElementsByClassName(this.ctx.modification)[0]
      const elRect = el.getBoundingClientRect()
      const elHeightMin = elRect.height - (elRect.bottom - childRect.bottom)

      this.ctx = {
        ...JSON.parse(JSON.stringify(this.ctx)),
        length: {
          ...JSON.parse(JSON.stringify(this.ctx.length)),
          max: this.ctxData.length,
          current: this.ctx.length.min
        },
        el,
        height: {
          min: elHeightMin,
          max: 'auto'
        }
      }
    },
    setToggle() {
      this.toggle = {
        ...JSON.parse(JSON.stringify(this.toggle)),
        icon: {
          ...JSON.parse(JSON.stringify(this.toggle.icon)),
          open: this.toggle.icon.current
        }
      }
    },
    ctxTransition({ reverse = false } = {}) {
      gsap.to(this.ctx.el, {
        height: () => (reverse ? this.ctx.height.min : this.ctx.height.max),
        duration: this.transitionDuration
      })
    },
    toggleTransition({ reverse = false } = {}) {
      const targets = {}

      if (reverse) {
        targets.first = `${this.toggle.modification}_${this.toggle.icon.close}`
        targets.second = `${this.toggle.modification}_${this.toggle.icon.open}`
      } else {
        targets.first = `${this.toggle.modification}_${this.toggle.icon.open}`
        targets.second = `${this.toggle.modification}_${this.toggle.icon.close}`
      }

      const options = {
        opacity: {
          enter: 1,
          leave: 0
        },
        y: {
          enter: 0
        },
        duration: this.transitionDuration / Object.keys(targets).length
      }

      reverse ? options.y.leave = -3 : options.y.leave = 3

      gsap.fromTo(document.getElementById(targets.first), {
        opacity: options.opacity.enter,
        y: options.y.enter
      }, {
        opacity: options.opacity.leave,
        y: options.y.leave,
        duration: options.duration
      }).then(() => {
        reverse
          ? this.toggle.icon.current = this.toggle.icon.open
          : this.toggle.icon.current = this.toggle.icon.close
      }).then(() => {
        gsap.fromTo(document.getElementById(targets.second), {
          opacity: options.opacity.leave,
          y: -options.y.leave
        }, {
          opacity: options.opacity.enter,
          y: options.y.enter,
          duration: options.duration
        })
      })
    },
    openCtx() {
      this.ctxTransition()
      this.toggleTransition()

      this.ctx.length.current = this.ctx.length.max
    },
    closeCtx({ animation = true } = {}) {
      if (animation) {
        this.ctxTransition({ reverse: true })
        this.toggleTransition({ reverse: true })
      } else {
        this.ctx.el.setAttribute('style', `height: ${this.ctx.height.min}px`)

        this.toggle.icon.current = this.toggle.icon.open
      }

      this.ctx.length.current = this.ctx.length.min
    },
    changeCtx() {
      this.ctx.length.current === this.ctx.length.min
        ? this.openCtx()
        : this.closeCtx()
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;

  .about__main {
    width: 564px;
    margin-right: auto;
  }

  .about__ctx {
    overflow: hidden;

    > .pr {
      margin-bottom: $mg-1;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .about__toggle {
    display: flex;

    margin: 8.5px auto 0 auto;
    padding: 0;

    transition: transform $sec-1 ease-in-out;

    color: var(--cl-neutral-04);
    background-color: transparent;

    &:hover,
    &:focus {
      transform: scale(1.1);
    }
  }

  .about__image {
    margin-bottom: $mg-1;
  }
}
</style>

<template>
  <section class="about">
    <div class="about__content">
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
    </div>
    <hr class="line">
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
          min: elHeightMin
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
        height: () => (reverse ? this.ctx.height.min : 'auto'),
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
  .about__content {
    display: flex;

    margin-bottom: 18.5px;
  }

  .about__main {
    width: 564px;
    margin-right: auto;

    > .hd {
      margin-bottom: 22px;
    }
  }

  .about__ctx {
    overflow: hidden;

    > .pr {
      margin-bottom: 10px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  .about__toggle {
    display: flex;

    margin: 8.5px auto 0 auto;
    padding: 0;

    color: var(--cl-neutral-light-04);
    background-color: transparent;

    .about__toggle_sweep-enter-active {
      animation: sweep 1s ease-in-out;
    }

    .about__toggle_sweep-leave-active {
      animation: sweep 1s ease-in-out reverse;
    }

    @keyframes sweep {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  .about__image {
    margin-bottom: 10px;
    height: 140px;
  }
}
</style>

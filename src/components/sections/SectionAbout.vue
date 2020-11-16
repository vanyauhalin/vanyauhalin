<template>
  <section class="about">
    <div class="about__content">
      <div class="about__main">
        <h1 class="hd hd_l_1">
          {{ title }}
        </h1>
        <div class="about__ctx">
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
            :id="`about__toggle_icon_${toggle.icon.current}`"
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

const icon = {
  open: 'chevron-down',
  close: 'close'
}

export default {
  name: 'SectionAbout',
  data() {
    return {
      ctx: {},
      toggle: {
        status: true,
        icon: {
          current: icon.open,
          open: icon.open,
          close: icon.close
        }
      }
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
  },
  methods: {
    setCtx() {
      const lengthMin = 2
      const child = document.querySelector(`[data-pr-index="${lengthMin}"]`)
      const childRect = child.getBoundingClientRect()
      const el = document.getElementsByClassName('about__ctx')[0]
      const elRect = el.getBoundingClientRect()
      const elHeightMin = elRect.height - (elRect.bottom - childRect.bottom)

      this.ctx = {
        el,
        height: {
          min: elHeightMin
        },
        length: {
          current: lengthMin,
          min: lengthMin,
          max: this.ctxData.length
        }
      }

      this.ctx.length.max > this.ctx.length.min
        ? this.closeCtx({
          animation: false
        })
        : this.toggle.status = false
    },
    openCtx() {
      gsap.fromTo(this.ctx.el, {
        height: this.ctx.height.min
      }, {
        height: 'auto',
        duration: 0.9
      })

      const icon2 = document.getElementById('about__toggle_icon_chevron-down')

      gsap.fromTo(icon2, {
        opacity: 1
      }, {
        opacity: 0,
        duration: 0.9
      }).then(() => {
        this.toggle.icon.current = this.toggle.icon.close
      }).then(() => {
        const icon3 = document.getElementById('about__toggle_icon_close')

        console.log(icon3)

        gsap.fromTo(icon3, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 0.9
        })
      })

      this.ctx.length.current = this.ctx.length.max
    },
    closeCtx(options) {
      if (options.animation) {
        gsap.fromTo(this.ctx.el, {
          height: 'auto'
        }, {
          height: this.ctx.height.min,
          duration: 0.9
        })
      } else {
        this.ctx.el.setAttribute('style', `height: ${this.ctx.height.min}px`)
      }

      this.toggle.icon.current = this.toggle.icon.open
      this.ctx.length.current = this.ctx.length.min
    },
    changeCtx() {
      this.ctx.length.current === this.ctx.length.min
        ? this.openCtx()
        : this.closeCtx({
          animation: true
        })
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

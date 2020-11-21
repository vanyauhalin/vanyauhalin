<template>
  <div class="tag">
    <JamIcons
      class="tag__icon"
      :name="current.icon"
      width="15"
      height="15"
    />
    <a
      class="pr pr_l_2"
      v-if="current.link"
      :href="ctx"
      target="_blank"
    >
      {{ current.ctx }}
    </a>
    <span
      class="pr pr_l_2"
      v-else
    >
      {{ current.ctx }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ItemTag',
  data() {
    return {
      current: {
        name: 'Date',
        icon: 'calendar'
      },
      default: {
        date: {
          icon: 'calendar'
        },
        code: {
          icon: 'merge',
          link: true
        },
        stack: {
          icon: 'terminal'
        },
        experience: {
          icon: 'universe'
        }
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return ['date', 'code', 'stack', 'experience'].indexOf(value) !== -1
      }
    },
    ctx: {
      type: [String, Array, Object],
      required: true
    }
  },
  mounted() {
    const key = Object.keys(this.default).find((item) => this.name === item)
    let ctx = ''

    if (Array.isArray(this.ctx)) {
      this.ctx.forEach((item, index) => {
        index === 0
          ? ctx = item
          : ctx += `, ${item}`
      })
    } else if (key === 'date' && typeof this.ctx === 'object') {
      ctx = `${this.ctx.start}-${this.ctx.end} гг.`
    } else if (key === 'date') {
      ctx = `${this.ctx} г.`
    } else if (key === 'experience') {
      ctx = this.ctx
    } else {
      ctx = `${key.charAt(0).toUpperCase()}${key.slice(1)}`
    }

    this.current = {
      ...this.default[key],
      ctx
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;

  margin-right: $mg-1 * 2;

  &:last-of-type {
    margin-right: 0;
  }

  .tag__icon {
    margin-right: $mg-2 * 2;

    color: var(--cl-neutral-04);
  }
}
</style>

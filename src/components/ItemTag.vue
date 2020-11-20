<template>
  <div class="tag">
    <JamIcons
      class="tag__icon"
      :name="current.icon"
      :width="current.width"
      :height="current.height"
    />
    <a
      class="pr pr_l_2 tag__link"
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
  name: 'TagDate',
  data() {
    return {
      current: {
        name: 'Date',
        icon: 'calendar',
        width: 12,
        height: 12
      },
      default: {
        date: {
          icon: 'calendar',
          width: 13.34,
          height: 13.34
        },
        code: {
          icon: 'merge',
          width: 12,
          height: 12,
          link: true
        },
        stack: {
          icon: 'terminal',
          width: 17.65,
          height: 17.65
        },
        experience: {
          icon: 'universe',
          width: 13.34,
          height: 13.34
        }
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return ['date', 'view', 'mockup', 'stack'].indexOf(value) !== -1
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

  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }

  .tag__icon {
    margin-right: 8px;

    color: var(--cl-neutral-04);
  }

  .tag__link {
    text-decoration: underline;
  }
}
</style>

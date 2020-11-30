<template>
  <div>
    <div class="filter__header">
      <transition name="filter__header-item_tr_fade">
        <button
          :class="toggle.class"
          v-if="list.selected"
          @click="resetFilter"
          :aria-label="toggle.label.clear"
        >
          <JamIcons
            :name="toggle.icon.clear"
            :width="toggle.width"
            :height="toggle.height"
          />
        </button>
      </transition>
      <transition name="filter__header-item_tr_fade">
        <span
          class="pr pr_l_1 filter__separator"
          v-if="list.selected"
        >
          /
        </span>
      </transition>
      <button
        :class="toggle.class"
        :disabled="warning.status"
        @click="changeListDisplay"
        :aria-label="toggle.label.filter"
      >
        <JamIcons
          :name="toggle.icon.filter"
          :width="toggle.width"
          :height="toggle.height"
        />
      </button>
    </div>
    <div :class="container.class">
      <ul :class="list.class">
        <li
          class="filter__list-item"
          v-for="item in list.items"
          :key="item"
        >
          <label
            class="filter__label"
            :for="item"
          >
            <input
              class="filter__checkbox"
              type="checkbox"
              :id="item"
              :name="item"
              :value="item"
              v-model="selected"
              @change="filtering({ name, selected })"
            >
            <span class="filter__indicator" />
            <span
              class="pr pr_l_1 filter__pr"
              :aria-label="item"
            >
              {{ item }}
            </span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { duration } from 'scripts/variables'

import filter from 'mixins/filter'

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 10))
}

export default {
  name: 'TheFilter',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  mixins: [filter],
  methods: {

    /**
     * Show
     * -------------------------------------------------------------------------
     */

    showWarning() {
      const { ctx, warning, list } = this
      const hgBefore = ctx.el.offsetHeight

      ctx.el.setAttribute('style', `min-height: ${hgBefore}px`)

      delay().then(() => {
        const statusBefore = this.warning.status

        this.warning.status = ctx.el.childElementCount === 0

        if (warning.status) {
          gsap.fromTo(ctx.el, {
            minHeight: hgBefore
          }, {
            duration,
            minHeight: list.hg
          })

          if (!statusBefore) this.warningTransition()
        } else {
          statusBefore
            ? this.warningTransition({ reverse: true })
            : warning.el.setAttribute('style', 'display: none')
        }
      })
    },

    /**
     * Transitions
     * -------------------------------------------------------------------------
     */

    warningTransition({ reverse = false } = {}) {
      const { warning } = this

      const from = {
        duration,
        display: 'none',
        y: '-100%'
      }
      const to = {
        duration,
        display: 'block',
        y: '0%'
      }

      reverse
        ? gsap.fromTo(warning.el, to, from)
        : gsap.fromTo(warning.el, from, to)
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * List
 * -----------------------------------------------------------------------------
 */

.filter__container {
  width: 100%;
}

.filter__list {
  display: grid;
}
</style>

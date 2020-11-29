<template>
  <div>
    <div class="filter__header">
      <transition name="filter__header-item_tr_fade">
        <transition-group
          class="filter__selected"
          name="filter__selected-item_tr_fade"
          tag="ul"
          v-if="list.selected"
        >
          <li
            class="pr pr_l_1 pr_theme_highlighted filter__selected-item"
            v-for="item in selected"
            :key="item"
          >
            {{ item }}
          </li>
        </transition-group>
      </transition>
      <transition name="filter__header-item_tr_fade">
        <span
          class="pr pr_l_1 filter__separator filter__separator_gap-minified"
          v-if="list.selected"
        >
          /
        </span>
      </transition>
      <transition name="filter__header-item_tr_fade">
        <button
          :class="toggle.class"
          v-if="list.selected"
          @click="resetFilter"
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
        this.warning.status = ctx.el.childElementCount === 0

        if (warning.status) {
          gsap.fromTo(ctx.el, {
            minHeight: hgBefore
          }, {
            duration,
            minHeight: list.hg
          })

          warning.el.setAttribute('style', 'display: block')
        } else {
          warning.el.setAttribute('style', 'display: none')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/**
 * Header
 * -----------------------------------------------------------------------------
 */

.filter__selected {
  position: relative;

  display: flex;
  align-items: center;
}

.filter__selected-item {
  padding: 0 $mg-2 / 2;

  transition: all $sec-1;

  &:last-of-type {
    margin-right: 0;
  }
}

.filter__selected-item_tr_fade-enter,
.filter__selected-item_tr_fade-leave-to {
  opacity: 0;
}

.filter__selected-item_tr_fade-enter {
  transform: translateX($mg-2);
}

.filter__selected-item_tr_fade-leave-active {
  position: absolute;
  right: - $mg-2;
}

/**
 * List
 * -----------------------------------------------------------------------------
 */

.filter__container {
  box-sizing: border-box;
  width: 40%;
  padding: 0 $main-pd-x;

  border-left: 1px solid var(--cl-neutral-03);
}

.filter__list {
  padding: $mg-2 0;
}
</style>

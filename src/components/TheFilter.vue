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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TheFilter',
  data: () => ({
    isMounted: false,
    container: {
      status: false,
      class: 'filter__container'
    },
    ctx: {},
    list: {
      class: 'filter__list',
      items: [],
      selected: false
    },
    toggle: {
      class: 'filter__button',
      width: 18,
      height: 18,
      icon: {
        filter: 'filter',
        clear: 'close'
      }
    },
    selected: [],
    duration: 0.9
  }),
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      tag: 'GET_TAG'
    })
  },
  mounted() {
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

    setContainer() {
      this.container = {
        ...JSON.parse(JSON.stringify(this.container)),
        el: this.$el.getElementsByClassName(this.container.class)[0]
      }
    },
    setCtx() {
      this.containerTransition()

      const el = this.$parent.$el.children[1]
      this.ctx = {
        el,
        hg: el.offsetHeight
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
      this.list = {
        ...JSON.parse(JSON.stringify(this.list)),
        hg: this.list.el.offsetHeight
      }
    },

    /**
     * Transitions
     * -------------------------------------------------------------------------
     */

    containerTransition() {
      this.container.el.setAttribute('style', 'display: block', 'opacity: 0')
    },
    ctxTransition() {
      if (this.list.hg > this.ctx.hg) {
        const from = {
          minHeight: this.ctx.hg
        }
        const to = {
          minHeight: this.list.hg,
          duration: this.duration
        }

        this.container.status
          ? gsap.fromTo(this.ctx.el, to, from)
          : gsap.fromTo(this.ctx.el, from, to)
      }
    },
    listTransition() {
      const from = {
        display: 'none',
        opacity: 0,
        x: '10%',
        duration: this.duration / 2
      }
      const to = {
        display: 'block',
        opacity: 1,
        x: '0%',
        duration: this.duration / 2
      }

      this.container.status
        ? gsap.fromTo(this.container.el, to, from)
        : gsap.fromTo(this.container.el, from, to)
    },

    /**
     * Other
     * -------------------------------------------------------------------------
     */

    changeListDisplay() {
      if (!this.isMounted) {
        this.setCtx()
        this.setListHg()

        this.isMounted = !this.isMounted
      }

      this.ctxTransition()
      this.listTransition()

      this.container.status = !this.container.status
    },
    resetFilter() {
      this.selected = []

      this.filtering({ name: this.name, selected: this.selected })
    }
  },
  watch: {
    selected() {
      this.list.selected = this.selected.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
$indicator-wd: 10px;
$indicator-br: 2px;

/**
 * Header
 * -----------------------------------------------------------------------------
 */

.filter__header {
  display: flex;
  align-items: center;
}

.filter__header-item_tr_fade-enter-active {
  animation: fade $sec-1 ease-in-out;
}

.filter__header-item_tr_fade-leave-active {
  animation: fade $sec-1 ease-in-out reverse;
}

.filter__selected {
  position: relative;

  display: flex;
  align-items: center;
}

.filter__selected-item {
  padding: 0 $mg-1 / 2;

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
  transform: translateX($mg-1);
}

.filter__selected-item_tr_fade-leave-active {
  position: absolute;
  right: - $mg-1;
}

.filter__separator {
  margin: 0 $mg-1;
}

.filter__separator_gap-minified {
  margin-left: $mg-1 / 2;
}

.filter__button {
  display: flex;

  padding: 0;

  transition: transform $sec-1 ease-in-out;

  color: var(--cl-neutral-07);
  background-color: transparent;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
}

/**
 * List
 * -----------------------------------------------------------------------------
 */

.filter__container {
  position: absolute;
  z-index: 1;
  top: $lh-2 + $mg-1 * 2;
  right: 0;
  bottom: 0;

  display: none;
  overflow: hidden;

  box-sizing: border-box;
  width: 40%;
  padding: 0 $main-pd-x;

  border-left: 1px solid var(--cl-neutral-03);
  background-color: var(--cl-neutral-01);
}

.filter__list {
  display: grid;

  padding: $mg-1 0;

  row-gap: $mg-2;
  grid-template-columns: repeat(2, 50%);
}

.filter__list-item {
  display: flex;

  padding-left: $list-pd;
}

/**
 * Label
 * -----------------------------------------------------------------------------
 */

.filter__label {
  display: flex;
  overflow: hidden;
  align-items: center;

  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover > .filter__indicator::before {
    background-color: var(--cl-neutral-04);
  }
}

.filter__checkbox {
  position: absolute;
  z-index: -1;

  width: $indicator-wd - $indicator-br;
  height: $indicator-wd - $indicator-br;
  margin: $indicator-br / 2;

  &:checked + .filter__indicator::after {
    display: block;
  }
}

.filter__indicator {
  position: relative;

  min-width: $indicator-wd;
  height: $indicator-wd;
  margin-right: $mg-1;

  background-color: var(--cl-neutral-04);

  &::before {
    background-color: var(--cl-neutral-01);
  }

  &::after {
    display: none;

    background-color: var(--cl-neutral-04);
  }

  &::before,
  &::after {
    position: absolute;
    top: $indicator-br;
    left: $indicator-br;

    width: $indicator-wd - $indicator-br * 2;
    height: $indicator-wd - $indicator-br * 2;

    content: '';
  }
}

.filter__pr {
  overflow: hidden;

  text-overflow: ellipsis;
}
</style>

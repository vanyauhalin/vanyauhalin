<template>
  <li class="item">
    <header class="item__header">
      <span class="marker item__marker" />
      <a
        class="pr pr_l_1 pr_theme_highlighted"
        v-if="item.tags.view"
        :href="item.tags.view"
        target="_blank"
      >
        {{ item.name }}
      </a>
      <p
        class="pr pr_l_1 pr_theme_highlighted"
        v-else
      >
        {{ item.name }}
      </p>
    </header>
    <div class="item__main">
      <div class="item__ctx">
        <p
          class="pr pr_l_1 item__pr"
          v-for="(pr, index) in item.description"
          :key="pr"
          :data-num="index + 1"
        >
          {{ pr }}
        </p>
      </div>
      <Toggle
        class="item__toggle"
        :length-max="item.description.length"
      />
    </div>
    <footer class="item__footer">
      <ListItemTag
        v-if="item.tags.date"
        name="date"
        :ctx="item.tags.date"
      />
      <ListItemTag
        v-if="item.tags.code"
        name="code"
        :ctx="item.tags.code"
      />
      <ListItemTag
        v-if="item.tags.stack"
        name="stack"
        :ctx="item.tags.stack"
      />
      <ListItemTag
        v-if="item.tags.experience"
        name="experience"
        :ctx="item.tags.experience"
      />
    </footer>
  </li>
</template>

<script>
import Toggle from '../../Toggle.vue'

import ListItemTag from './ListItemTag.vue'

export default {
  name: 'SectionsTemplateListItem',
  components: {
    Toggle,
    ListItemTag
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-bottom: $mg-2 + $mg-3;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }

  /**
   * Header
   * ---------------------------------------------------------------------------
   */

  .item__header {
    display: flex;
    align-items: flex-start;

    margin-bottom: $mg-2;
  }

  .item__marker {
    margin-top: ($lh-4 - $marker-wd) / 2;

    background-color: var(--cl-neutral-05);
  }

  /**
   * Main
   * ---------------------------------------------------------------------------
   */

  .item__main {
    position: relative;

    margin-bottom: $mg-2 - $mg-3;
    padding-left: $marker-wd + $marker-mg;
  }

  .item__ctx {
    @include for-desktop-only {
      margin: 0;
    }

    overflow: hidden;

    margin-bottom: $mg-2;
  }

  .item__pr {
    margin-bottom: $mg-2;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .item__toggle {
    @include for-desktop-only {
      position: absolute;
      top: 0;
      right: -34.75px;

      margin: 0;
    }

    margin: 0 auto $mg-2 auto;
  }

  /**
   * Footer
   * ---------------------------------------------------------------------------
   */

  .item__footer {
    display: flex;
    flex-wrap: wrap;

    padding-left: $marker-wd + $marker-mg;
  }
}
</style>

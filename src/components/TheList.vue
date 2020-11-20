<template>
  <ul>
    <li
      class="item"
      v-for="item in ctx"
      :key="item.name"
    >
      <header class="item__header">
        <span class="marker" />
        <a
          class="pr pr_l_1 item__name"
          v-if="item.view"
          :href="item.view"
          target="_blank"
        >
          {{ item.name }}
        </a>
        <p
          class="pr pr_l_1 item__name"
          v-else
        >
          {{ item.name }}
        </p>
      </header>
      <div class="item__main">
        <DropdownToggle
          class="item__toggle"
          eclipse="true"
          :length-max="item.description.length"
        />
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
      </div>
      <footer class="item__footer">
        <ItemTag
          v-if="item.date"
          name="date"
          :ctx="item.date"
        />
        <ItemTag
          v-if="item.code"
          name="code"
          :ctx="item.code"
        />
        <ItemTag
          v-if="item.stack"
          name="stack"
          :ctx="item.stack"
        />
        <ItemTag
          v-if="item.experience"
          name="experience"
          :ctx="item.experience"
        />
      </footer>
    </li>
  </ul>
</template>

<script>
import ItemTag from './ItemTag.vue'
import DropdownToggle from './DropdownToggle.vue'

export default {
  name: 'TheList',
  components: {
    ItemTag,
    DropdownToggle
  },
  props: {
    ctx: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  width: 65%;
  margin-bottom: $mg-1 + $mg-2;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }

  .item__header {
    display: flex;
    align-items: center;

    margin-bottom: $mg-1;
  }

  a.item__name {
    text-decoration: underline;
  }

  .item__name {
    color: var(--cl-neutral-05);
  }

  .item__main {
    position: relative;

    margin-bottom: $mg-1;
    padding-left: $marker-wd + $marker-mg;
  }

  .item__ctx {
    overflow: hidden;
  }

  .item__pr {
    margin-bottom: $mg-1;

    &:first-of-type {
      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .item__toggle {
    position: absolute;
    top: 0;
    right: -34.75px;
  }

  .item__footer {
    display: flex;
    // flex-wrap: wrap;

    padding-left: $marker-wd + $marker-mg;
  }
}
</style>

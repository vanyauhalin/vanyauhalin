<template>
  <div>
    <div class="item__header">
      <span class="marker" />
      <a
        class="pr pr_l_1 item__name"
        v-if="item.src"
        :href="item.src"
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
    </div>
    <div class="item__description">
      <DropdownToggle
        class="item__toggle"
        :ctx="ctx"
        :data-container-num="containerIndex + 1"
      />
      <div class="item__ctx">
        <p
          class="pr pr_l_1 item__pr"
          v-for="(pr, index) in item.description"
          :key="pr"
          :data-container-num="containerIndex + 1"
          :data-num="index + 1"
        >
          {{ pr }}
        </p>
      </div>
    </div>
    <div class="item__footer">
      <!-- <TheListItemTag /> -->
    </div>
  </div>
</template>

<script>
import DropdownToggle from '../DropdownToggle.vue'

// import TheListItemTag from './TheListItemTag.vue'

export default {
  name: 'TheList',
  components: {
    DropdownToggle
    // TheListItemTag
  },
  props: {
    item: Object,
    ctx: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) => typeof item === 'string')
      }
    },
    container: Object,
    containerIndex: Number
  }
}
</script>

<style lang="scss" scoped>
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

.item__description {
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
</style>

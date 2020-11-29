<template>
  <ul class="section__list">
    <ListItem
      v-for="item in ctx"
      :key="item.name"
      :item="item"
    />
  </ul>
</template>

<script>
import ListItem from './ListItem.vue'

export default {
  name: 'SectionsTemplateList',
  components: {
    ListItem
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
.section__list {
  overflow: hidden;

  @include for-desktop-only {
    width: 65%;
    padding-right: 35%;
  }
}
</style>

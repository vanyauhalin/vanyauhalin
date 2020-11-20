<template>
  <ul>
    <li
      class="list__item"
      v-for="(item, index) in ctx"
      :key="item.name"
    >
      <TheListItem
        :item="item"
        :ctx="ctx[index].description"
        :container="container"
        :container-index="index"
      />
    </li>
  </ul>
</template>

<script>
import TheListItem from './TheListItem.vue'

export default {
  name: 'TheList',
  components: {
    TheListItem
  },
  props: {
    ctx: Array,
    container: {
      type: Object,
      validator(value) {
        return typeof value.length.min === 'number'
      },
      default() {
        return {
          length: {
            min: 1
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list__item {
  width: 65%;
  margin-bottom: $mg-1 + $mg-2;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>

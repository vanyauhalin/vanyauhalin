<template>
  <div>
    <section
      :id="name"
      class="section"
    >
      <div class="section__header">
        <Title
          :name="name"
          level="2"
          minified="true"
        />
        <TheFilter
          v-if="filter"
          :name="name"
        />
      </div>
      <Warning class="section__warning d-section__warning" />
      <List :ctx="ctx(name)" />
    </section>
    <hr
      v-if="line"
      class="line"
    >
  </div>
</template>

<script>
import sections from 'mixins/sections'

import List from 'default/sections/template/List.vue'
import Warning from 'default/sections/template/Warning.vue'
import Title from 'default/sections/Title.vue'

import TheFilter from './TheFilter.vue'

export default {
  name: 'SectionsTemplate',
  components: {
    List,
    Warning,
    Title,
    TheFilter
  },
  mixins: [sections]
}
</script>

<style lang="scss" scoped>
.d-section__warning {
  position: absolute;
  top: $lh-2 + $mg-2 * 2;
  left: 0;
}
</style>

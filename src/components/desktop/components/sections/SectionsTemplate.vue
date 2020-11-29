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
      <Warning class="section__warning" />
      <List :ctx="ctx(name)" />
    </section>
    <hr
      v-if="line"
      class="line"
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import List from 'default/sections/template/List.vue'
import Warning from 'default/sections/template/Warning.vue'
import Title from 'default/sections/Title.vue'

import TheFilter from '../TheFilter.vue'

export default {
  name: 'SectionsTemplate',
  components: {
    List,
    Warning,
    Title,
    TheFilter
  },
  props: {
    name: {
      type: String,
      required: true
    },
    filter: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      ctx: 'GET_CTX'
    })
  }
}
</script>

<style lang="scss" scoped>
.section {
  position: relative;
}

.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: $mg-2 * 2;
}

.section__warning {
  position: absolute;
  top: $lh-2 + $mg-2 * 2;
  left: 0;

  display: none;
}
</style>

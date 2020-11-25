<template>
  <div>
    <section
      :id="name"
      class="section"
    >
      <div class="section__header">
        <h2 class="hd hd_l_2 hd_gap_minified">
          {{ title }}
        </h2>
        <TheFilter
          v-if="filter"
          :name="name"
        />
      </div>
      <div class="section__warning">
        <p class="pr pr_l_1">
          Упс...
        </p>
      </div>
      <TheList :ctx="ctx" />
    </section>
    <hr
      v-if="line"
      class="line"
    >
  </div>
</template>

<script>
import TheFilter from '../TheFilter.vue'
import TheList from '../TheList.vue'

export default {
  name: 'SectionTemplate',
  components: {
    TheFilter,
    TheList
  },
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ctx: {
      type: Array,
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

  margin-bottom: $mg-1 * 2;
}

.section__hd {
  margin: 0;
}

.section__warning {
  position: absolute;
  top: $lh-2 + $mg-1 * 2;
  left: 0;

  display: none;
}
</style>

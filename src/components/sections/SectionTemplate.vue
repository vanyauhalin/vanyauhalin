<template>
  <section
    :id="name"
    class="section"
  >
    <div class="section__header">
      <h2 class="hd hd_l_2 hd_gap_minified">
        {{ title }}
      </h2>
      <TheFilter :name="name" />
    </div>
    <TheList :ctx="ctx" />
  </section>
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
</style>

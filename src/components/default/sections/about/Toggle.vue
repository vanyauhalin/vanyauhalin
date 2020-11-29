<template>
  <Toggle
    class="about__toggle"
    length-min="2"
    :length-max="length"
  />
</template>

<script>
import Toggle from '../../Toggle.vue'

export default {
  name: 'SectionsAboutToggle',
  components: {
    Toggle
  },
  props: {
    length: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.about__toggle {
  margin: 8.5px auto 0 auto;
}
</style>

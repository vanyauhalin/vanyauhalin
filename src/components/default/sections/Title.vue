<template>
  <component
    :class="[setClassLevel, setClassMinified]"
    :is="setTag"
  >
    {{ title(name) }}
  </component>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionsTitle',
  props: {
    name: {
      type: String,
      required: true
    },
    level: {
      type: [String, Number],
      default: 1
    },
    minified: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    ...mapGetters({
      title: 'GET_TITLE'
    }),
    setTag() {
      switch (Number(this.level)) {
        case 1: return 'h1'
        case 2: return 'h2'
        default: return ''
      }
    },
    setClassLevel() {
      switch (Number(this.level)) {
        case 1: return 'hd hd_l_1'
        case 2: return 'hd hd_l_2'
        default: return ''
      }
    },
    setClassMinified() {
      if (this.minified === 'true') return 'hd_gap_minified'

      return ''
    }
  }
}
</script>

<template>
  <section id="experience">
    <h2 class="hd hd_l_2">
      {{ title }}
    </h2>
    <TheList :ctx="ctx" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import TheList from '../TheList.vue'

export default {
  name: 'SectionExperience',
  components: {
    TheList
  },
  computed: {
    ...mapGetters({
      title: 'GET_EXPERIENCE_TITLE',
      ctx: 'GET_EXPERIENCE_CTX'
    })
  }
}
</script>

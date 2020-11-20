<template>
  <section id="projects">
    <h2 class="hd hd_l_2">
      {{ title }}
    </h2>
    <TheList :ctx="ctx" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import TheList from '../list/TheList.vue'

export default {
  name: 'SectionProjects',
  components: {
    TheList
  },
  computed: {
    ...mapGetters({
      title: 'GET_PROJECTS_TITLE',
      ctx: 'GET_PROJECTS_CTX'
    })
  }
}
</script>

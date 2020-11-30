<template>
  <section
    id="about"
    class="about"
  >
    <div class="about__main">
      <Title :name="name" />
      <Ctx :ctx="ctx" />
      <Toggle :length="ctx.length" />
    </div>
    <div>
      <div class="about__image">
        <Avatar />
      </div>
      <Download />
    </div>
  </section>
</template>

<script>
import about from 'mixins/about'

import Avatar from 'default/sections/about/Avatar.vue'
import Ctx from 'default/sections/about/Ctx.vue'
import Toggle from 'default/sections/about/Toggle.vue'
import Download from 'default/sections/about/Download.vue'
import Title from 'default/sections/Title.vue'

export default {
  name: 'SectionsAbout',
  components: {
    Avatar,
    Ctx,
    Toggle,
    Download,
    Title
  },
  mixins: [about]
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  justify-content: space-between;

  .about__main {
    width: 564px;
  }

  .about__image {
    margin-bottom: $mg-2;
  }
}
</style>

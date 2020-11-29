<template>
  <section
    id="about"
  >
    <div class="about__header">
      <div class="about__image">
        <Avatar />
      </div>
      <div class="about__container">
        <Title :name="name" />
        <Download />
      </div>
    </div>
    <div>
      <Ctx :ctx="ctx" />
      <Toggle :length="ctx.length" />
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
.about__header {
  display: flex;
  justify-content: center;
  margin-bottom: $mg-1;
}

.about__image {
  margin-right: $mg-2 * 2;
}

.about__container {
  max-width: 185px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

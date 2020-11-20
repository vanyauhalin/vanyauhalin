<template>
  <section
    id="about"
    class="about"
  >
    <div class="about__main">
      <h1 class="hd hd_l_1">
        {{ title }}
      </h1>
      <div class="about__ctx">
        <p
          class="pr pr_l_1 about__pr"
          v-for="(pr, index) in ctx"
          :key="pr"
          :data-num="index + 1"
        >
          {{ pr }}
        </p>
      </div>
      <DropdownToggle
        class="about__toggle"
        length-min="2"
        :length-max="ctx.length"
      />
    </div>
    <div>
      <div class="about__image">
        <img
          :src="require(`images/avatar.jpg`)"
          alt="Avatar"
          width="140"
          height="140"
        >
      </div>
      <button class="btn">
        Download
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import DropdownToggle from '../DropdownToggle.vue'

export default {
  name: 'SectionAbout',
  components: {
    DropdownToggle
  },
  computed: {
    ...mapGetters({
      title: 'GET_ABOUT_TITLE',
      ctx: 'GET_ABOUT_CTX'
    })
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;

  .about__main {
    width: 564px;
    margin-right: auto;
  }

  .about__ctx {
    overflow: hidden;
  }

  .about__pr {
    margin-bottom: $mg-1;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .about__toggle {
    margin: 8.5px auto 0 auto;
  }

  .about__image {
    margin-bottom: $mg-1;
  }
}
</style>

<template>
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
</template>

<script>
export default {
  name: 'SectionsAboutCtx',
  props: {
    ctx: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.about__ctx {
  overflow: hidden;
}

.about__pr {
  margin-bottom: $mg-2;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>

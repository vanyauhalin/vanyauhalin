<template>
  <section id="skills">
    <Title
      :name="name"
      level="2"
    />
    <ul class="skills__groups">
      <Group
        v-for="group in ctx(name)"
        :key="group.name"
        :group="group"
      />
    </ul>
  </section>
</template>

<script>
import skills from 'mixins/skills'

import Group from 'default/sections/skills/Group.vue'
import Title from 'default/sections/Title.vue'

export default {
  name: 'SectionSkills',
  components: {
    Group,
    Title
  },
  mixins: [skills]
}
</script>

<style lang="scss" scoped>
.skills__groups {
  display: grid;

  grid-row-gap: $mg-2;

  @include for-desktop-only {
    $groups-col: 3;
    $groups-gap-col: 34px;
    $groups-wd: calc((100% - #{$groups-gap-col} * #{$groups-col - 1}) / #{$groups-col});

    grid-column-gap: $groups-gap-col;
    grid-template-columns: repeat($groups-col, $groups-wd);
  }
}
</style>

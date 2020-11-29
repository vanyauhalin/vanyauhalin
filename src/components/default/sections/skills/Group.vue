<template>
  <li>
    <h3 class="hd hd_l_3">
      {{ group.name }}:
    </h3>
    <ul>
      <li
        class="skills__tool"
        v-for="tool in group.tools"
        :key="tool.name"
      >
        <span class="marker" />
        <p class="pr pr_l_1 skills_pr">
          {{ tool.name }}
        </p>
        <progress
          class="skills__progressbar"
          max="100"
          :value="tool.progress"
        />
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SectionsSkillsGroup',
  props: {
    group: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.skills__tool {
  display: flex;
  align-items: center;

  margin-bottom: $mg-3;
  padding-left: $list-pd;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.skills_pr {
  $pr-mg: 20px;

  overflow: hidden;

  margin-right: auto;
  padding-right: $pr-mg;

  white-space: nowrap;
  text-overflow: ellipsis;
}

.skills__progressbar {
  $progressbar-wd: 100px;

  width: $progressbar-wd;
  min-width: $progressbar-wd;
  height: $marker-wd;

  background-color: var(--cl-neutral-02);

  &::-webkit-progress-value {
    background-color: var(--cl-neutral-04);
  }
}
</style>

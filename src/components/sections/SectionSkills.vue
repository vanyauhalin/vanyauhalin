<template>
  <section
    id="skills"
    class="skills"
  >
    <h2 class="hd hd_l_2">
      {{ title }}
    </h2>
    <ul class="skills__groups">
      <li
        v-for="group in ctx"
        :key="group.name"
      >
        <h3 class="hd hd_l_3">
          {{ group.name }}:
        </h3>
        <ul>
          <li
            class="skills__tool"
            v-for="tool in group.tools"
            :key="tool.name"
          >
            <span class="skills__marker" />
            <span class="pr pr_l_5">{{ tool.name }}</span>
            <progress
              class="skills__progressbar"
              max="100"
              :value="tool.progress"
            />
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionSkills',
  computed: {
    ...mapGetters({
      title: 'GET_SKILLS_TITLE',
      ctx: 'GET_SKILLS_CTX'
    })
  }
}
</script>

<style lang="scss" scoped>
.skills {
  $skills-wd: $main-wd - $main-pd-x * 2;
  $groups-col: 3;
  $groups-gap-col: 34px;
  $groups-wd: ($skills-wd - $groups-gap-col * ($groups-col - 1)) / $groups-col;
  $marker-wd: 5px;
  $marker-mg: 10px;
  $progressbar-wd: 100px;

  .skills__groups {
    display: grid;

    grid-template: repeat(2, auto) / repeat($groups-col, 1fr);
    gap: $mg-1 $groups-gap-col;
  }

  .skills__tool {
    $tool-pd-start: 17px;

    display: flex;
    align-items: center;

    margin-bottom: $mg-2;

    padding-inline-start: $tool-pd-start;

    > .pr {
      $pr-mg: 20px;

      overflow: hidden;

      width: 100%;
      max-width: $groups-wd - ($tool-pd-start + $marker-wd + $marker-mg + $pr-mg + $progressbar-wd);
      margin-right: $pr-mg;

      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .skills__marker {
    width: $marker-wd;
    height: $marker-wd;
    margin-right: $marker-mg;

    background-color: var(--cl-neutral-04);
  }

  .skills__progressbar {
    width: $progressbar-wd;
    height: $marker-wd;

    background-color: var(--cl-neutral-02);

    &::-webkit-progress-value {
      background-color: var(--cl-neutral-04);
    }
  }
}
</style>

<template>
  <section
    id="projects"
    class="projects"
  >
    <h2 class="hd hd_l_2">
      {{ title }}
    </h2>
    <ul>
      <li
        class="projects__item"
        v-for="(item, containerIndex) in ctx"
        :key="item.name"
      >
        <div class="projects__header">
          <span class="marker" />
          <a
            class="pr pr_l_1 projects__name"
            v-if="item.src"
            :href="item.src"
            target="_blank"
          >
            {{ item.name }}
          </a>
          <p
            class="pr pr_l_1 projects__name"
            v-else
          >
            {{ item.name }}
          </p>
        </div>
        <div class="projects__description">
          <DropdownToggle
            class="projects__toggle"
            :ctx="ctx[containerIndex].description"
            :data-container-num="containerIndex + 1"
          />
          <div class="projects__ctx">
            <p
              class="pr pr_l_1 projects__pr"
              v-for="(pr, index) in item.description"
              :key="pr"
              :data-container-num="containerIndex + 1"
              :data-num="index + 1"
            >
              {{ pr }}
            </p>
          </div>
        </div>
        <div class="projects__footer">
          <div class="projects__tag">
            <JamIcons
              class="projects__icon"
              name="calendar"
              width="12"
              height="12"
            />
            <span class="pr pr_l_2">
              {{ item.date }}
            </span>
          </div>
          <div class="projects__tag">
            <JamIcons
              class="projects__icon"
              name="picture"
              width="13.5"
              height="13.5"
            />
            <a
              class="pr pr_l_2"
              :href="item.view"
              target="_blank"
            >
              View
            </a>
          </div>
          <!-- <div class="projects__tag">
            <JamIcons
              class="projects__icon"
              name="arrachment"
              width="12"
              height="12"
            />
            <span class="pr pr_l_2">
              {{ item.mockup }}
            </span>
          </div> -->
          <div class="projects__tag">
            <JamIcons
              class="projects__icon"
              name="terminal"
              width="16"
              height="16"
            />
            <span class="pr pr_l_2">
              {{ item.stack }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import DropdownToggle from '../DropdownToggle.vue'

export default {
  name: 'SectionProjects',
  components: {
    DropdownToggle
  },
  computed: {
    ...mapGetters({
      title: 'GET_PROJECTS_TITLE',
      ctx: 'GET_PROJECTS_CTX'
    })
  }
}
</script>

<style lang="scss" scoped>
.projects {
  .projects__item {
    width: 65%;
    margin-bottom: $mg-1 + $mg-2;
    padding-left: $list-pd;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .projects__header {
    display: flex;
    align-items: center;

    margin-bottom: $mg-1;
  }

  a.projects__name {
    text-decoration: underline;
  }

  .projects__name {
    color: var(--cl-neutral-05);
  }

  .projects__description {
    position: relative;

    margin-bottom: $mg-1;
    padding-left: $marker-wd + $marker-mg;
  }

  .projects__ctx {
    overflow: hidden;
  }

  .projects__pr {
    margin-bottom: $mg-1;

    &:first-of-type {
      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .projects__toggle {
    position: absolute;
    top: 0;
    right: -34.75px;
  }

  .projects__footer {
    display: flex;
    // flex-wrap: wrap;

    padding-left: $marker-wd + $marker-mg;
  }

  .projects__icon {
    margin-right: 8px;

    color: var(--cl-neutral-04);
  }

  .projects__tag {
    display: flex;
    align-items: center;

    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>

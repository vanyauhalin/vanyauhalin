<template>
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
</template>

<script>
export default {
  name: 'TheList'
}
</script>

<style lang="scss" scoped>

</style>

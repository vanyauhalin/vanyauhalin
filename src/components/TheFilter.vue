<template>
  <div class="filter">
    <button>
      <JamIcons
        name="filter"
        width="18"
        height="18"
      />
    </button>
    <ul class="filter__list">
      <li
        v-for="item in tagItems"
        :key="item"
      >
        <label
          class="tag-container"
          :for="item"
        >
          <!-- :aria-label="'Инструмент '+item.tag+'. Количество упоминаний в проектах ='" -->
          <span
            class="tag-name"
          >
            {{ item }}
          </span>
          <input
            class="tag-checkbox"
            track-by="$index"
            type="checkbox"
            :id="item"
            :name="item"
            :value="item"
            v-model="selected"
            @change="filtering({ name, selected })"
          >
          <span class="tag-indicator" />
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TheFilter',
  data: () => ({
    tagItems: [],
    selected: []
  }),
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      tag: 'GET_TAG'
    })
  },
  mounted() {
    this.tag(this.name).forEach((item) => this.tagItems.push(item))
  },
  methods: {
    ...mapMutations({
      filtering: 'FILTERING_CTX'
    })
  }
}
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
}

.filter__list {
  position: absolute;
  top: 18px + $mg-1 * 2;
  right: 0;
}

</style>

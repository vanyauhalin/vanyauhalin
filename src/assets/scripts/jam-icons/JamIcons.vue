<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="width"
    :height="height"
    preserveAspectRatio="xMinYMin"
    role="presentation"
  >
    <g
      :fill="fill"
      v-html="icon"
    />
  </svg>
</template>

<script>
export default {
  name: 'JamIcons',
  props: {
    name: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  },
  lib: [],
  add(icons) {
    Array.isArray(icons)
      ? this.lib = icons
      : this.lib.push(icons)
  },
  computed: {
    icon() {
      return this.getIcon().path
    },
    viewBox() {
      return this.getIcon().viewBox
    }
  },
  methods: {
    getIcon() {
      const icon = this.$options.lib.find((i) => i.name === this.name)

      if (icon) return icon

      throw new Error('Name of the icon is not correct.')
    }
  }
}
</script>

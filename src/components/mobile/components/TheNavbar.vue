<template>
  <nav class="navbar">
    <ul class="navbar__nav">
      <li
        class="navbar__item"
        v-for="item in nav"
        :key="item.name"
      >
        <a
          class="navbar__link"
          :class="setClassLink(item.active)"
          href="#"
          v-scroll-to="item.scroll"
        >
          <div class="navbar__icon">
            <JamIcons
              :name="item.icon"
              width="28"
              height="28"
            />
          </div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import navbar from 'mixins/navbar'

export default {
  name: 'TheNavbar',
  mixins: [navbar]
}
</script>

<style lang="scss" scoped>
.navbar__nav {
  display: flex;
  justify-content: space-between;

  padding: $pd-1;
}
</style>

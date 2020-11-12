<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <ul class="navbar__nav">
        <li class="navbar__item" v-for="item in nav" :key="item.name">
          <a href="" class="navbar__content">
            <div class="navbar__icon">
              <JamIcons :name="item.icon" width="36" height="36" />
            </div>
            <p>{{ item.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'AppNavbar',
  data() {
    return {
      nav: [
        {
          icon: 'user-square',
          name: 'About'
        },
        {
          icon: 'keyboard',
          name: 'Skills'
        },
        {
          icon: 'merge',
          name: 'Projects'
        },
        {
          icon: 'dna',
          name: 'Experience'
        },
        {
          icon: 'envelope',
          name: 'Contacts'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: var(--cl-neutral-04);

  .navbar__inner {
    padding: 35px 15px;
  }

  // .navbar__nav {

  // }

  // .navbar__item {

  // }

  // .navbar__content {

  // }

  // .navbar__icon {

  // }
}
</style>

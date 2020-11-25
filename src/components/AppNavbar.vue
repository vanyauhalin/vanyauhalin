<template>
  <nav class="navbar">
    <ul class="navbar__nav">
      <li
        class="navbar__item"
        v-for="item in nav"
        :key="item.name"
      >
        <a
          class="navbar__ctx"
          href="#"
          v-scroll-to="scrollOptions({ anchor: item.anchor, offset: item.offset })"
        >
          <div class="navbar__icon">
            <JamIcons
              :name="item.icon"
              width="36"
              height="36"
            />
          </div>
          <p class="pr pr_l_2 navbar__pr">
            {{ item.name }}
          </p>
        </a>
      </li>
    </ul>
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
          name: 'About',
          anchor: 'about',
          offset: -35
        },
        {
          icon: 'keyboard',
          name: 'Skills',
          anchor: 'skills'
        },
        {
          icon: 'merge',
          name: 'Projects',
          anchor: 'projects'
        },
        {
          icon: 'universe',
          name: 'Experience',
          anchor: 'experience'
        },
        {
          icon: 'envelope',
          name: 'Contacts',
          anchor: 'contacts'
        }
      ]
    }
  },
  methods: {
    scrollOptions({ anchor, offset = -28 } = {}) {
      return {
        offset,
        el: `#${anchor}`,
        container: '.app__main',
        duration: 450,
        lazy: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;

  background-color: var(--cl-neutral-06);

  .navbar__nav {
    padding: $main-pd-y 15px;
  }

  .navbar__item {
    margin-bottom: $main-pd-y - $main-br;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .navbar__ctx {
    display: flex;
    align-items: center;
    flex-direction: column;

    text-decoration: none;

    &:hover,
    &:focus {
      > .navbar__icon,
      > .navbar__pr {
        color: var(--cl-neutral-01);
      }
    }
  }

  .navbar__icon {
    display: flex;

    margin-bottom: $mg-2;
  }

  .navbar__icon,
  .navbar__pr {
    transition: color $sec-1 ease-in-out;

    color: var(--cl-neutral-04);
  }
}
</style>

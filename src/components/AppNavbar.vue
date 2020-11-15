<template>
  <nav class="navbar">
    <ul class="navbar__nav">
      <li
        class="navbar__item"
        v-for="item in nav"
        :key="item.name"
      >
        <a
          class="navbar__content"
          :href="`#${item.anchor}`"
        >
          <div class="navbar__icon">
            <JamIcons
              :name="item.icon"
              width="36"
              height="36"
            />
          </div>
          <p class="pr pr_l_2">{{ item.name }}</p>
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
          anchor: 'about'
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
          icon: 'dna',
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
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;

  background-color: var(--cl-neutral-04);

  .navbar__nav {
    padding: 35px 15px;
  }

  .navbar__item {
    margin-bottom: 35px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .navbar__icon {
    display: flex;

    margin-bottom: 4px;

    color: var(--cl-neutral-light-04);
  }

  .navbar__icon,
  .pr {
    transition: color 0.3s ease-in-out;
  }

  .navbar__content {
    display: flex;
    align-items: center;
    flex-direction: column;

    &:hover,
    &:focus {
      > .navbar__icon,
      > .pr {
        color: var(--cl-neutral-01);
      }
    }
  }
}
</style>

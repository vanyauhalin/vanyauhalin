<template>
  <img
    :src="require('images/avatar-400.jpg')"
    :srcset="`${require('images/avatar-400.jpg')} 1x,
              ${require('images/avatar-600.jpg')} 2x,
              ${require('images/avatar-800.jpg')} 3x`"
    alt="Avatar"
    width="140"
    height="140"
  >
</template>

<script>
export default {
  name: 'SectionsAboutAvatar'
}
</script>

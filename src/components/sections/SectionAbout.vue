<template>
  <section class="sem-section">
    <div>
      <div style="width: 564px">
        <h1 class="hd hd_l_1">
          1
        </h1>
        <p class="pr pr_l_1">
          par
        </p>
      </div>
      <div>
        <div>
          <img
            src=""
            alt="tyt"
          >
        </div>
        <button>Download</button>
      </div>
    </div>
    <hr class="line">
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionAbout',
  computed: {
    ...mapGetters({
      about: 'GET_ABOUT'
    })
  },
  mounted() {
    console.log(this.about.state)
  }
}
</script>

<style lang="scss" scoped>
.hd {
  margin-bottom: 22px;
}

.pr {
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: 'about'
    }
  },
  computed: {
    ...mapGetters({
      ctx: 'GET_ABOUT_CTX'
    })
  }
}

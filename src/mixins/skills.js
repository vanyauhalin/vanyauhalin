import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: 'skills'
    }
  },
  computed: {
    ...mapGetters({
      ctx: 'GET_CTX'
    })
  }
}

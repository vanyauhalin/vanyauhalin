import { mapGetters } from 'vuex'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    filter: {
      type: Boolean,
      default: false
    },
    line: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      ctx: 'GET_CTX'
    })
  }
}

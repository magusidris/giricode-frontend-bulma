<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <nuxt-img :src="`/storage/users/`+authUser.image" :alt="authUser.username" />
      </p>
    </figure>
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea class="textarea" @input="handleInput($event, parentId)" :ref='"reply_"+parentId' placeholder="Add a comment..."></textarea>
          <!-- <input class="input is-primary" @input="handleInput($event, parentId)" :ref='"reply_"+parentId' type="text" placeholder="Primary input"> -->
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button" @click.prevent="postReply" :disabled="!canReply">Balas komentar</button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    parentId: {
      type: Number,
      default: 0
    },
    comment: String
  },
  computed: {
    ...mapState({
      canReply: ({web}) => web.post.canReply
    }),
    ...mapGetters([
      'authUser'
    ])
  },
  mounted() {
    this.$nextTick(() => this.$refs["reply_" + this.parentId].focus())
  },
  methods: {
    handleInput(event, parentId) {
      const {value} = event.target
      this.$emit('valueUpdated', {value, parentId})
    },
    postReply() {
      this.$store.dispatch('web/post/storeReply')
        .then(_ => {
          // this.comment = ''
          this.$nextTick(() => {
            this.$refs["reply_" + this.parentId].focus()
            this.$refs["reply_" + this.parentId].value=null
          })
        })
    }

  }

}
</script>

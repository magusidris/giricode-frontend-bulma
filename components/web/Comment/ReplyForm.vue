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
          <textarea class="textarea" :value="comment" @input="handleInput($event, parentId)" placeholder="Add a comment..."></textarea>
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
      'isAuthenticated', 'authUser', 'isProgrammer', 'isAdmin', 'isOperator'
    ])
  },
  methods: {
    handleInput(event, parentId) {
      const {value} = event.target
      this.$emit('valueUpdated', {value, parentId})
      // store.dispatch('web/post/storeComment', params.slug)
      // console.log('Body of comment: ', {value, parentId})
    },
    async postReply(e) {
      await this.$store.dispatch('web/post/storeReply')
      this.comment = ''
    }
  }

}
</script>

<template>
  <article class="media">
    <figure class="media-left">
      <p v-if="authUser.image !== null" class="image is-64x64">
        <nuxt-img :src="`/storage/users/`+authUser.image" :alt="authUser.username" />
      </p>
      <p v-else class="image is-64x64">
        <img src="https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg">
      </p>
    </figure>
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea
              class="textarea"
              @input="handleInput($event)"
              ref="comment"
              placeholder="Add a comment...">
          </textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button" @click.prevent="postComment" :disabled="!canComment">Post comment</button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    value: [Object],
    comment: String
  },
  data() {
    return {
      saving: false
    }
  },
  computed: {
    ...mapState({
      canComment: ({web}) => web.post.canComment
    }),
    ...mapGetters([
      'isAuthenticated', 'authUser', 'isProgrammer', 'isAdmin', 'isOperator'
    ])
  },
  methods: {
    handleInput(event) {
      const { value } = event.target
      this.$emit('valueUpdated', {value})
    },
    async postComment() {
      await this.$store.dispatch('web/post/storeComment')
        .then(_ =>
          this.$refs.comment.value=null
      )
    }
  }

}
</script>

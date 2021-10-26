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
          <textarea class="textarea" @input="emitComment($event)" placeholder="Add a comment..."></textarea>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button" @click.prevent="postComment">Balas komentar</button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isAuthenticated', 'authUser', 'isProgrammer', 'isAdmin', 'isOperator'
    ]),
  },
  methods: {
    emitComment(event) {
      const {value} = event.target
      // store.dispatch('web/post/storeComment', params.slug)
      console.log('Body of comment: ', value)
    }
  }

}
</script>

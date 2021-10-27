<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title title is-5">
        Komentar
      </p>
    </header>
    <div class="card-content">
      <form>
        <!-- Comment Post -->
        <web-comment-form
          :comment="comment"
          @valueUpdated="updateComment($event)" />

        <article class="media" v-for="data in comments" :key="data.id">
          <figure class="media-left">
            <p class="image is-64x64">
              <nuxt-img :src="`/storage/users/`+data.user.image" :alt="data.user.name" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ data.user.name }}</strong>
                <br>
                {{ data.comment }}
                <br>
                <small><a @click.prevent="replyBox(data.id)">Reply</a> · {{ data.created_at }}</small>
              </p>
            </div>

            <article class="media" v-for="reply in data.replies" :key="reply.id">
              <figure class="media-left">
                <p class="image is-48x48">
                  <nuxt-img :src="`/storage/users/`+reply.user.image" :alt="reply.user.name" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ reply.user.name }}</strong>
                    <br>
                    {{ reply.comment }}
                    <br>
                    <small><a @click.prevent="replyBox(data.id)">Reply</a> · {{ reply.created_at }}</small>
                  </p>
                </div>
              </div>
            </article>
            <div v-if="replyBoxs === data.id">
              <web-comment-reply-form
                @valueUpdated="updateReply($event, 'reply')"
                :parentId="data.id" />
            </div>
          </div>
        </article>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      replyBoxs: [],
      show: [],
      comment: ''
    }
  },
  props: {
    /**
     * Whether to show comment replies
     */
    showReplies: Boolean,

    /**
     * The ID of the comment to which the user is currently replying
     */
    activeReply: {
      type: [String, Number, Boolean],
      default: false
    },
    comments: {
      type: Array,
      default: false
    }
  },
  methods: {
    replyBox(index) {
      this.replyBoxs = index
      // console.log('Reply to : ', this.replyBoxs)
      this.$store.commit('web/post/setCanComment', false)
      this.comment = ''
      // this.$store.dispatch('web/post/updateCommentId', {comment: index})
    },
    updateComment({value}) {
      this.replyBoxs = 0
      // console.log('value of comment : ', {comment: value})
      this.$store.dispatch('web/post/updateComment', {comment: value})
    },
    updateReply({value, parentId}) {
      // console.log('value of reply : ', {comment: value, 'parentId': parentId})
      this.$store.dispatch('web/post/updateReply', {comment: value, 'parentId': parentId})
      // this.$store.dispatch('web/post/updateComment', {comment: value})
    }
  }
}
</script>

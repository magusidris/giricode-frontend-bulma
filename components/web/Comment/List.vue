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
        <web-comment-form />

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
            <div>
              <web-comment-reply-form />
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
      show: []
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
    },
    slug: {
      type: String
    }
  },
  methods: {
    replyBox(index) {
      if (this.replyBoxs[index]) {
        console.log('Reply line of index: ', index)
        return this.replyBoxs[index]
      } else {
        console.log('Reply line of index: ', 0)
        return this.replyBoxs[index]
      }
    }
  }
}
</script>

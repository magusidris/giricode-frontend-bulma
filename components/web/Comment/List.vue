<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title title is-5">
        Komentar
      </p>
    </header>
    <div class="card-content pt-2">
      <form>
        <!-- Comment Post -->
        <div v-if="isAuthenticated">
          <keep-alive>
            <comment-form
              @valueUpdated="updateComment($event)" />
          </keep-alive>
        </div>
        <template v-if="comments.length < 1">
          <div class="has-text-centered">
            Belum ada komentar
          </div>
        </template>

        <article class="media" v-for="data in comments" :key="data.id">
          <figure class="media-left">
            <p v-if="data.user.image !== null" class="image is-64x64">
              <nuxt-img :src="`/storage/users/`+data.user.image" :alt="data.user.name" />
            </p>
            <p v-else class="image is-64x64">
              <img src="https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg">
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

            <div v-if="replyBoxs === data.id">
              <reply-form
                @valueUpdated="updateReply($event, 'reply')"
                :parentId="data.id" />
            </div>

            <article class="media reply" v-for="reply in data.replies" :key="reply.id">
              <figure class="media-left">
                <p v-if="reply.user.image !== null" class="image is-48x48">
                  <nuxt-img :src="`/storage/users/`+reply.user.image" :alt="reply.user.name" />
                </p>
                <p v-else class="image is-48x48">
                  <img src="https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg">
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
          </div>
        </article>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentForm from '@/components/web/Comment/CommentForm'
import ReplyForm from '@/components/web/Comment/ReplyForm'
export default {
  components: {
    CommentForm,
    ReplyForm
  },
  data() {
    return {
      replyBoxs: [],
      show: [],
      comment: ''
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
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
      if(this.isAuthenticated) {
        this.replyBoxs = index
        this.comment = "comment"
        // console.log('Reply to : ', this.replyBoxs)
        this.$store.commit('web/post/setCanComment', false)
        this.$store.commit('web/post/setCanReply', false)
      } else {
        // redirect
        this.$router.push({
          name: 'login'
        })
      }
    },
    updateComment({value}) {
      this.replyBoxs = 0
      this.$store.dispatch('web/post/updateComment', {comment: value})
    },
    updateReply({value, parentId}) {
      // console.log('value of reply : ', {comment: value, 'parentId': parentId})
      this.$store.dispatch('web/post/updateReply', {'comment': value, parentId})
    }
  }
}
</script>
<style lang="scss">
  article .media {
    border-left: 3px lightgray;
  }
</style>

<style lang="scss" scoped>
.card .media:not(:last-child) {
    padding-top: 1.5rem;
    margin-bottom: 0;
}
</style>

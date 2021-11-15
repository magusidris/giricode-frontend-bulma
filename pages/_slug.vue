<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="columns is-multiline">
              <div class="column is-12">
                <show-post-card
                  :post="post" />
              </div>
              <div class="column is-12">
                <comment-list
                  :comments="post.comments" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-12">
                <category-card />
              </div>
              <div class="column is-12">
                <tag-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ShowPostCard from '@/components/web/ShowPostCard'
import CommentList from '@/components/web/Comment/List'
import CategoryCard from '@/components/web/CategoryCard'
import TagCard from '@/components/web/TagCard'
export default {
  components: {
    ShowPostCard,
    CommentList,
    CategoryCard,
    TagCard
  },
  computed: {
    post() {
      return this.$store.state.web.post.post
    }
  },
  async fetch({store, params}) {
    await store.dispatch('web/post/getDetailPost', params.slug)
    await store.dispatch('web/post/storeVisitor', params.slug)
  },
  async asyncData({store, params}) {
    await store.dispatch('web/post/updateSlug', {slug: params.slug})
  },
  head() {
      return {
        title: this.post.title +" - Giricode",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.post.description
          }
        ]
      }
    }
}
</script>

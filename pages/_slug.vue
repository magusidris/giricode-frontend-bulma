<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="columns is-multiline">
              <div class="column is-12">
                <web-show-post-card
                  :post="post" />
              </div>
              <div class="column is-12">
                <web-comment-list
                  :comments="post.comments" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-12">
                <web-category-card />
              </div>
              <div class="column is-12">
                <web-tag-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    post() {
      return this.$store.state.web.post.post
    }
  },
  async fetch({store, params}) {
    await store.dispatch('web/post/getDetailPost', params.slug)
  },
  async asyncData({store, params}) {
    await store.dispatch('web/post/storeVisitor', params.slug)
    await store.dispatch('web/post/updateSlug', {slug: params.slug})
  },
}
</script>

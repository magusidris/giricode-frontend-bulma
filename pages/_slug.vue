<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns">
          <div class="column is-three-quarters">
            <web-show-post-card
              :image="post.image"
              :title="post.title"
              :content="post.content"
              :description="post.description"
              :created_at="post.created_at"
              :category="post.category.name"
              :tags="post.tags"
              :user="post.user.name" />
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
  }
}
</script>

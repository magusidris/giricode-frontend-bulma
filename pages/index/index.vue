<template>
  <section class="section pt-12">
    <div class="container is-max-widescreen">
      <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
        <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in posts.data" :key="post.id">
          <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
            <post-card class="post" :post="post" dir="posts" />
          </nuxt-link>
        </div>
      </div>
      <div class="columns mt-4">
        <div class="column has-text-centered">
          <nuxt-link :to="{name: 'post', query: {page: 1}}" class="is-dark-green btn-more">Load more</nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/web/PostCard'
export default {
  components: {
    PostCard
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts
    })
  },
  async fetch({ store, query }) {
    // fetching slider on Rest API
    await store.commit('web/post/setPage', query.page)

    await store.dispatch('web/post/getPostsData')
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 56vh;
}
</style>

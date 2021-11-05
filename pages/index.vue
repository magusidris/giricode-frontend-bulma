<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <carousel />
      </div>
    </section>
    <section class="section pt-0">
      <div class="container is-max-widescreen">
        <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
          <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in posts.data" :key="post.id">
            <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
              <post-card class="post" :post="post" />
            </nuxt-link>
          </div>
        </div>
        <div class="columns mt-4">
          <div class="column has-text-centered">
            <nuxt-link :to="{name: 'post', query: {page: 1}}" class="is-dark-green btn-more">LIHAT LEBIH BANYAK</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/web/Carousel'
import PostCard from '@/components/web/PostCard'
import CategoryCard from '@/components/web/CategoryCard'
import TagCard from '@/components/web/TagCard'
export default {
  components: {
    Carousel,
    PostCard,
    CategoryCard,
    TagCard
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts,
      currentPage: state => state.web.post.posts.current_page,
      statePage: state => state.web.post.page
    })
  },
  async fetch({ store, query }) {
    // fetching slider on Rest API
    await store.commit('web/post/setPage', query.page)

    await store.dispatch('web/post/getPostsData')
  }
}
</script>

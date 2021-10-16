<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <web-carousel />
      </div>
    </section>
    <section class="section pt-0">
      <div class="container is-max-widescreen">
        <div class="columns is-multiline is-mobile">
          <div class="column is-full-mobile is-full-tablet is-three-quarters-desktop">
            <div class="columns is-multiline is-mobile">
              <div class="column is-half-mobile is-one-third-desktop is-half-tablet" v-for="post in posts.data" :key="post.id">
                <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
                  <web-post-card :post="post" />
                </nuxt-link>
              </div>
            </div>
            <div class="columns mt-4">
              <div class="column has-text-centered">
                <nuxt-link :to="{name: 'post', query: {page: 1}}" class="button is-dark-green">LIHAT LEBIH BANYAK</nuxt-link>
              </div>
            </div>
          </div>
          <div class="column is-3-desktop is-full-tablet">
            <div class="columns is-multiline is-mobile">
              <div class="column is-full">
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
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      posts: state => state.web.post.posts.all
    })
  },
  async fetch() {
    // fetching slider on Rest API
    await this.$store.dispatch('web/post/getPostsData')
  }
}
</script>

<style lang="scss" scoped>
  .border-column {
    border: 2px solid black;
  }
</style>


<template>
  <div>
    <section class="section">
      <div class="container">
        <web-carousel />
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-4" v-for="post in posts.data" :key="post.id">
                <web-post-card :post="post" />
              </div>
            </div>
            <div class="columns mt-4">
              <div class="column has-text-centered">
                <nuxt-link :to="{name: 'post'}" class="button is-info">LIHAT LEBIH BANYAK</nuxt-link>
              </div>
            </div>
          </div>
          <div class="column is-3">
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

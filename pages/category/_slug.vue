<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title">
        Category : {{ category.name }}
      </h1>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in category.posts" :key="post.id">
          <nuxt-link :to="{ name: 'slug', params: {slug: post.slug} }">
            <web-post-card :post="post" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {

  // computed
  computed: {

    ...mapState({
      // category
      category: state => state.web.category.category
    })
  },

  // hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/category/getDetailCategory', route.params.slug)
  }
}
</script>

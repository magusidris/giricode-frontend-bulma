<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title">
        Category : <span class="has-text-dark-green">{{ category.name }}</span>
      </h1>
      <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
        <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in category.posts" :key="post.id">
          <nuxt-link :to="{ name: 'slug', params: {slug: post.slug} }">
            <category-card :post="post" />
            <!-- {{ viewCount }} -->
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CategoryCard from '@/components/web/PostCardCategory'
export default {
  components: {
    CategoryCard
  },
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

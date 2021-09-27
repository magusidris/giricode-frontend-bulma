<template>
  <section class="section">
    <div class="container">
      <h1 class="title mx-6">
        Category : {{ category.name }}
      </h1>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in category.posts" :key="post.id">
          <web-post-card :post="post" />
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

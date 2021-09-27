<template>
  <div class="tile is-vertical">
    <article class="tile is-child notification is-grey" v-for="category in categories" :key="category.id">
      <nuxt-link :to="{ name: 'category-slug', params: {slug: category.slug} }">
        <div class="media">
          <div class="media-left">
            <figure class="image is-32x32">
              <img :src="category.image">
            </figure>
          </div>
          <div class="media-content my-auto">
            <p class="title is-5">
              {{ category.name }}
            </p>
          </div>
      </div>
      </nuxt-link>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  // computed
  computed: {
    ...mapState({
      categories: state => state.web.category.categories
    })
  },

  // hook "fetch"
  async fetch() {

    // fetching categories on Rest API
    await this.$store.dispatch('web/category/getCategoriesData')
  }
}
</script>

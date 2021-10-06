<template>
  <div class="tile is-vertical">
    <article class="tile categoryContainer is-child notification is-grey" v-for="category in categories" :key="category.id">
      <nuxt-link :to="{ name: 'category-slug', params: {slug: category.slug} }">
        <div class="media">
          <div class="media-center">
            <figure class="image is-32x32">
              <!-- <img :src="`https://backend.giricode.com/storage/categories/`+category.image"> -->
              <nuxt-img
                :src="`/storage/categories/`+category.image"
                alt="post.title"
                preset="web"
                sizes="sm:32px md:32px lg:32px" />
            </figure>
          </div>
          <div class="media-content ml-3 my-auto">
            <p class="title is-6">
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

<style lang="scss" scoped>
  .notification {
      padding: .7rem 2.5rem .7rem 1.5rem;
  }
  .tile.is-vertical > .tile.is-child:not(:last-child) {
      margin-bottom: 1rem !important;
  }
</style>

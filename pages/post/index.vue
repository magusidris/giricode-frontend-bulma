<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in posts.data" :key="post.id">
          <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
            <web-post-card :post="post" />
          </nuxt-link>
        </div>
      </div>
      <div class="columns mt-4">
        <div class="column has-text-centered">
          <b-pagination
            v-model="currentPage"
            @change="changePage"
            :total="posts.total"
            :perPage="posts.per_page">
        </b-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts,
      currentPage: state => state.web.post.posts.current_page,
      statePage: state => state.web.post.page
    }),
  },
  async fetch({ store, query }) {

    // this.$store.commit('admin/category/setPage', page)
    await store.commit('web/post/setPage', query.page)
    await store.dispatch('web/post/getPostsData')
  },
  methods: {
    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('web/post/setPage', page)
        this.$router.push({
          name: 'admin-categories',
          query: {
            page: this.statePage
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/category/getCategoriesData', this.search)
    },
  }
}
</script>

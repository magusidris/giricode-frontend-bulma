<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
        <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in posts.data" :key="post.id">
          <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
            <post-card :post="post" />
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
import PostCard from '@/components/web/PostCardSecond'
export default {
  components: {
    PostCard
  },
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

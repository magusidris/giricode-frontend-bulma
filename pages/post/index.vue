<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in posts.data" :key="post.id">
          <web-post-card :post="post" />
        </div>
      </div>
      <div class="columns mt-4">
        <div class="column has-text-centered">
          <b-pagination
            v-model="currentPage"
            @change="fetchPosts"
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
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcoon: 'chevron-right'
    }
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts.all,
      pagination: state => state.web.post.pagination
    }),
    currentPage: {
      get() {
        return this.$store.state.web.post.pagination.page
      },
      set(value) {
        this.$store.commit('web/post/setPage', value)
      }
    }
  },
  async fetch({store, query}) {
    // try to get values from query
    const filter = {}
    const {page} = query

    if (page) {
      filter.page = parseInt(page, 10)

      store.commit('web/post/setPage', filter.page)
    } else {
      // Todo: meybe getters
      filter.page = store.state.web.post.pagination.page
    }

    // fetching slider on Rest API
    await store.dispatch('web/post/getPostsData', filter)
  },
  methods: {
    setQueryPaginationParams() {
      const {page} = this.pagination

      this.$router.push({query: {page}})
    },
    fetchPosts() {
      const filter = {}
      filter.page = this.pagination.page

      // here store the query params !
      this.$store.dispatch('web/post/getPostsData', filter)
        .then(_ => this.setQueryPaginationParams())
    }
  }
}
</script>

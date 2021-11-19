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
  head() {
    return {
      title: `All Post page ${this.statePage} - Giricode`,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          // content: `${process.env.BASE_URL}/${query.page}` || `'http://localhost:2021/'${query.page}`
          content: `${process.env.baseUrl}/post?page=${this.statePage}`
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `All Post page ${this.statePage} - Giricode`
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg'
        }
      ]
    }
  },
  components: {
    PostCard
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
          name: 'post',
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

<template>
  <div>
    <section class="hero hero-large bg-primary300">
      <div class="hero-body">
        <div class="container is-max-widescreen h-100">
          <div class="columns h-100 is-vcentered">
            <div class="column">
              <p class="title is-size-4 is-size-5-mobile has-text-white pb-3">
                Kami Menyiapkan Tutorial Secara Terstruktur untuk Mempermudah Kamu Belajar Secara Efisien.
              </p>
              <p class="subtitle is-size-6-mobile has-text-white">
                Pada halaman ini kamu akan melihat semua tutorial yang disesuaikan secara terstruktur mulai persiapan hingga selesai untuk memudahkan kamu dalam belajar pemrograman yang lebih powerful.
              </p>
              <p>

              </p>
            </div>
            <div class="column is-5 has-text-centered">
              <nuxt-img
                src="/img/code-amico.svg"
                alt="post title"
                preset="web"
                sizes="sm:180px md:280px lg:380px" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
          <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in series.data" :key="post.id">
            <nuxt-link :to="{name: 'series-slug', params: {slug: post.slug}}">
              <post-card :post="post" dir="postseries" />
            </nuxt-link>
          </div>
        </div>
        <div class="columns mt-4">
          <div class="column has-text-centered">
            <b-pagination
              v-model="currentPage"
              @change="changePage"
              :total="series.total"
              :perPage="series.per_page">
          </b-pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/web/PostCard'
export default {
  head() {
    return {
      title: `Tutorial Series page ${this.statePage} - Giricode`,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          // content: `${process.env.BASE_URL}/${query.page}` || `'http://localhost:2021/'${query.page}`
          content: `${process.env.baseUrl}/series?page=${this.statePage}`
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Tutorial Series page ${this.statePage} - Giricode`
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
      series: state => state.web.series.series,
      currentPage: state => state.web.series.series.current_page,
      statePage: state => state.web.series.page
    }),
  },
  async fetch({ store, query }) {

    // this.$store.commit('admin/category/setPage', page)
    await store.commit('web/series/setPage', query.page)
    await store.dispatch('web/series/getSeriesData')
  },
  methods: {
    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('web/series/setPage', page)
        this.$router.push({
          name: 'series',
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

<style lang="scss" scoped>
.section {
  min-height: 56vh;
}
</style>

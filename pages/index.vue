<template>
  <div>
    <section class="hero hero-large bg-primary300">
      <div class="hero-body">
        <div class="container is-max-widescreen h-100">
          <div class="columns h-100 is-vcentered">
            <div class="column">
              <p class="title is-size-3 is-size-4-mobile has-text-white pb-3">
                Belajar koding bahasa Indonesia mulai dasar hingga expert.
              </p>
              <p class="subtitle is-size-5-mobile has-text-white">
                Dapatkan tutorial yang anda butuhkan untuk meningkatkan kemampuan anda ketingkat yang lebih tinggi, kami menyiapkan apa saja berdasarkan kategori lengkap dengan langkah maupun source codenya.
              </p>
              <p>

              </p>
            </div>
            <div class="column is-5 has-text-centered">
              <nuxt-img
                src="/img/opensource.svg"
                alt="post title"
                preset="web"
                sizes="sm:180px md:280px lg:380px" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <nuxt-child />
    <section class="section pt-12">
      <div class="container is-max-widescreen">
        <div class="columns is-centered is-mobile pb-4">
          <div class="column is-6-mobile is-3-tablet is-3-desktop">
            <div class="is-size-3-desktop is-size-4-tablet is-size-5-mobile has-text-weight-bold">Tutorial Series</div>
            <div class="divider-custom"></div>
          </div>
        </div>
        <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
          <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in series.data" :key="post.id">
            <nuxt-link :to="{name: 'series-slug', params: {slug: post.slug}}">
              <post-card class="post" :post="post" dir="postseries" />
            </nuxt-link>
          </div>
        </div>
        <div class="columns mt-4">
          <div class="column has-text-centered">
            <nuxt-link :to="{name: 'series', query: {page: 1}}" class="is-dark-green btn-more">Load more</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/web/Carousel'
import PostCard from '@/components/web/PostCard'
import CategoryCard from '@/components/web/CategoryCard'
import TagCard from '@/components/web/TagCard'
export default {
  head() {
    return {
      title: 'Giricode - Solusi Tutorial Pemrograman Lengkap',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.baseUrl
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'en_ID'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Giricode - Solusi Tutorial Pemrograman Lengkap'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Giricode'
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
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Giricode - Solusi Tutorial Pemrograman Lengkap'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@Giricode'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg'
        }
      ]
    }
  },
  components: {
    Carousel,
    PostCard,
    CategoryCard,
    TagCard
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts,
      series: state => state.web.series.series,
    })
  },
  async fetch({ store, query }) {
    // fetching slider on Rest API
    await store.commit('web/post/setPage', query.page)

    await store.dispatch('web/post/getPostsData')

    await store.dispatch('web/series/getSeriesData')
  }
}
</script>
